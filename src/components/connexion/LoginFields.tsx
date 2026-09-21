import React from "react";
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";

interface LoginFieldsProps {
  email: string;
  password: string;
  loading: boolean;
  showPassword: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
}

export default function LoginFields({
  email,
  password,
  loading,
  showPassword,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
}: LoginFieldsProps) {
  const inputClass = `
    w-full
    h-[52px]
    rounded-xl
    border
    border-slate-200
    bg-slate-50
    text-[15px]
    text-slate-800
    outline-none
    transition-all
    duration-200
    placeholder:text-slate-400
    hover:border-blue-300
    focus:border-blue-500
    focus:bg-white
    focus:ring-4
    focus:ring-blue-500/10
    disabled:cursor-not-allowed
    disabled:opacity-60
  `;

  return (
    <>
      {/* EMAIL */}
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-semibold text-slate-700"
        >
          Adresse email
        </label>

        <div className="relative">
          <Mail
            size={19}
            strokeWidth={1.8}
            className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-slate-400
              pointer-events-none
            "
          />

          <input
            id="email"
            type="email"
            placeholder="exemple@email.com"
            value={email}
            onChange={onEmailChange}
            disabled={loading}
            autoComplete="email"
            required
            className={`${inputClass} pl-12 pr-4`}
          />
        </div>
      </div>

      {/* MOT DE PASSE */}
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-semibold text-slate-700"
        >
          Mot de passe
        </label>

        <div className="relative">
          <LockKeyhole
            size={19}
            strokeWidth={1.8}
            className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-slate-400
              pointer-events-none
            "
          />

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            disabled={loading}
            autoComplete="current-password"
            required
            className={`${inputClass} pl-12 pr-14`} // ← padding ajusté à droite
          />

          <button
            type="button"
            onClick={onTogglePassword}
            disabled={loading}
            aria-label={
              showPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
            }
            className="
              absolute right-2 top-1/2
              -translate-y-1/2
              w-9 h-9
              flex items-center justify-center
              rounded-lg
              text-slate-400
              hover:text-blue-600
              hover:bg-blue-50
              transition
            "
          >
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </div>
      </div>
    </>
  );
}
