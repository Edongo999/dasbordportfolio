import React from "react";

interface LoginHeaderProps {
  userImage: string | null;
}

export default function LoginHeader({ userImage }: LoginHeaderProps) {
  return (
    <div>
      <div className="flex justify-center mb-5">
        <div
          className="
            w-[92px]
            h-[92px]
            rounded-full
            p-[3px]
            bg-gradient-to-br
            from-indigo-600
            via-blue-500
            to-purple-600
            shadow-lg
          "
        >
          <div
            className="
              w-full
              h-full
              rounded-full
              overflow-hidden
              bg-white
              p-[3px]
            "
          >
            <img
              src={userImage || "/images/default-avatar2.webp"}
              alt="Photo utilisateur"
              className="
                w-full
                h-full
                object-cover
                rounded-full
              "
              onError={(e) => {
                e.currentTarget.src = "/images/default-avatar2.webp";
              }}
            />
          </div>
        </div>
      </div>

      <div className="text-center mb-7">
        <h2
          className="
            text-2xl
            sm:text-[26px]
            font-bold
            text-slate-800
            tracking-tight
          "
        >
          Connexion à mon espace
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Connectez-vous pour accéder à votre espace personnel.
        </p>
      </div>
    </div>
  );
}
