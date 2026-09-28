import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { AxiosError } from "axios";

import { useAuth } from "@/Hook/useAuth";

import axiosInstance from "@/components/utils/axiosInstance";

import LoginLockout from "@/components/connexion/Lockout";

import LoginHeader from "@/components/connexion/LoginHeader";

import LoginFields from "@/components/connexion/LoginFields";

import LoginButton from "@/components/connexion/LoginButton";

export default function LoginForm() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [userImage, setUserImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  const navigate = useNavigate();

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // =====================================================
  // NETTOYAGE DU DEBOUNCE
  // =====================================================

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // =====================================================
  // CHANGEMENT EMAIL
  // =====================================================

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setEmail(value);
    setError("");

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!value.trim()) {
      setUserImage("/images/default-avatar.webp");
      return;
    }

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!valid) return;

    debounceRef.current = setTimeout(async () => {
      try {
        // =================================================
        // PLUS DE CSRF
        // =================================================
        // Le token Bearer est automatiquement ajouté
        // par axiosInstance s'il existe.
        //
        // /user-by-email est une route publique.
        // =================================================

        const response = await axiosInstance.post("/user-by-email", {
          email: value,
        });

        setUserImage(
          response.data?.image_url || "/images/default-avatar2.webp",
        );
      } catch {
        setUserImage("/images/default-avatar2.webp");
      }
    }, 500);
  };

  // =====================================================
  // CONNEXION
  // =====================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading || lockoutSeconds > 0) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      // =================================================
      // LOGIN CENTRALISÉ
      // =================================================
      // useAuth.login doit :
      // 1. appeler POST /login
      // 2. récupérer response.data.token
      // 3. enregistrer le token dans localStorage
      // 4. mettre à jour l'utilisateur connecté
      // =================================================

      await login(email, password);

      navigate("/welcome", {
        replace: true,
      });
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;

      const status = error.response?.status;

      if (status === 401) {
        setError("Email ou mot de passe incorrect");
      } else if (status === 422) {
        setError("Veuillez vérifier les informations saisies.");
      } else if (status === 429) {
        const message = error.response?.data?.message || "";

        const match = message.match(/(\d+)\s*secondes?/i);

        setLockoutSeconds(match ? parseInt(match[1], 10) : 60);

        setError("");
      } else {
        setError("Impossible de contacter le serveur");
      }
    } finally {
      setLoading(false);
    }
  };

  const isLocked = lockoutSeconds > 0;

  // =====================================================
  // AFFICHAGE
  // =====================================================

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center px-4 py-8 overflow-x-hidden bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600">
      <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-2xl p-7 sm:p-9">
        {!isLocked && <LoginHeader userImage={userImage} />}

        {isLocked ? (
          <LoginLockout
            seconds={lockoutSeconds}
            setSeconds={setLockoutSeconds}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <LoginFields
              email={email}
              password={password}
              loading={loading}
              showPassword={showPassword}
              onEmailChange={handleEmailChange}
              onPasswordChange={setPassword}
              onTogglePassword={() => setShowPassword((prev) => !prev)}
            />

            <LoginButton loading={loading} />
          </form>
        )}
      </div>
    </div>
  );
}
