import React, { useEffect } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";

interface LoginLockoutProps {
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
}

export default function LoginLockout({
  seconds,
  setSeconds,
}: LoginLockoutProps) {
  const totalSeconds = 60;

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((previous) => {
        if (previous <= 1) return 0;
        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, setSeconds]);

  if (seconds <= 0) return null;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const progress = Math.max(0, Math.min(100, (seconds / totalSeconds) * 100));

  return (
    <div className="w-full flex flex-col items-center text-center px-1 sm:px-2 py-1 sm:py-2">
      {/* ICÔNE */}
      <div className="relative mb-4 sm:mb-4">
        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-red-500/20
            blur-lg
            scale-110
            animate-pulse
          "
        />

        <div
          className="
            relative
            w-16
            h-16
            sm:w-[70px]
            sm:h-[70px]
            rounded-full
            bg-gradient-to-br
            from-red-500
            to-rose-600
            flex
            items-center
            justify-center
            shadow-lg
            shadow-red-500/25
            ring-4
            ring-red-50
          "
        >
          <LockKeyhole
            size={28}
            strokeWidth={1.8}
            className="text-white sm:w-8 sm:h-8"
          />
        </div>
      </div>

      {/* TITRE */}
      <h2
        className="
          text-lg
          sm:text-xl
          font-bold
          tracking-tight
          text-slate-800
        "
      >
        Connexion temporairement bloquée
      </h2>

      <div
        className="
          mt-2
          w-8
          h-1
          rounded-full
          bg-gradient-to-r
          from-red-500
          to-rose-500
        "
      />

      {/* MESSAGE */}
      <p
        className="
          mt-3
          text-xs
          sm:text-sm
          leading-5
          sm:leading-6
          text-slate-500
          max-w-xs
        "
      >
        Trop de tentatives de connexion ont été détectées. Veuillez patienter
        avant de réessayer.
      </p>

      {/* COMPTEUR */}
      <div
        className="
          w-full
          max-w-[235px]
          sm:max-w-[245px]
          mt-5
          sm:mt-6
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          px-6
          py-4
          sm:px-7
          sm:py-5
          shadow-sm
        "
      >
        <div
          className="
            text-[34px]
            sm:text-[38px]
            font-bold
            tracking-[0.12em]
            text-slate-800
            tabular-nums
            leading-none
          "
        >
          {String(minutes).padStart(2, "0")}:
          {String(remainingSeconds).padStart(2, "0")}
        </div>

        <p
          className="
            mt-2
            text-[9px]
            sm:text-[10px]
            uppercase
            tracking-[0.18em]
            font-medium
            text-slate-400
          "
        >
          Temps restant
        </p>
      </div>

      {/* PROGRESSION */}
      <div className="w-full max-w-xs mt-5 sm:mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] sm:text-[11px] text-slate-400">
            Blocage en cours
          </span>

          <span className="text-[10px] sm:text-[11px] font-semibold text-red-500">
            {Math.ceil(progress)}%
          </span>
        </div>

        <div
          className="
            h-1.5
            w-full
            rounded-full
            bg-slate-100
            overflow-hidden
          "
        >
          <div
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-red-500
              to-rose-500
              transition-all
              duration-1000
              ease-linear
            "
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* PROTECTION */}
      <div
        className="
          mt-5
          sm:mt-5
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-slate-200
          bg-slate-50
          px-3
          py-1.5
          text-[10px]
          sm:text-[11px]
          font-medium
          text-slate-500
        "
      >
        <ShieldCheck size={14} strokeWidth={2} className="text-red-500" />

        <span>Protection de sécurité active</span>

        <span
          className="
            w-1.5
            h-1.5
            rounded-full
            bg-red-500
            animate-pulse
          "
        />
      </div>
    </div>
  );
}
