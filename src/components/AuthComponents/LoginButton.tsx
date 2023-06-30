import { signIn, signOut, useSession } from "next-auth/react";

function LoginButton() {
  const { data: sessionData } = useSession();

    return (
        <button
          className="rounded-[26px] bg-base-100 border text-neutral w-[320px] h-[48px] font-[500] mt-3 shadow-md"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >Inicia Sesión
        </button>
    );
  }

export default LoginButton