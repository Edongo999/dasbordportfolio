import React from "react";
import { ArrowRight } from "lucide-react";

interface LoginButtonProps {
  loading: boolean;
}

export default function LoginButton({ loading }: LoginButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="
        group
        w-full
        h-[52px]
        rounded-xl
        flex
        items-center
        justify-center
        gap-2
        bg-indigo-600
        hover:bg-indigo-700
        active:bg-indigo-800
        text-white
        font-semibold
        text-[15px]
        shadow-lg
        shadow-indigo-600/20
        transition-all
        duration-200
        hover:-translate-y-[1px]
        disabled:bg-indigo-400
        disabled:cursor-not-allowed
        disabled:hover:translate-y-0
      "
    >
      {loading ? (
        <>
          <span
            className="
              w-5 h-5
              rounded-full
              border-2
              border-white/30
              border-t-white
              animate-spin
            "
          />

          <span>Connexion...</span>
        </>
      ) : (
        <>
          <span>Se connecter</span>

          <ArrowRight
            size={19}
            className="
              transition-transform
              duration-200
              group-hover:translate-x-1
            "
          />
        </>
      )}
    </button>
  );
}
