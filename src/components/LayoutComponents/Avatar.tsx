import { useSession } from "next-auth/react";

const Avatar = (props) => {

  const { data: sessionData } = useSession();

  return (
      <img src={sessionData?.user.image} className={`${props.h} rounded-full`} />
  )
}

export default Avatar