import { signIn, signOut, useSession } from "next-auth/react";

function RegisterButton() {
  const { data: sessionData } = useSession();


  return (
      <button
        className="rounded-[26px] blue-degrade text-base-100 w-[320px] h-[48px] font-[500] shadow-md"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >Registrate
      </button>
  );
}


export default RegisterButton