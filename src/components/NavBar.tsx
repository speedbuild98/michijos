import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="w-full bg-neutral px-[20px]">
      <nav className="navbar">
        <div className="flex-1">
          <Link href="/" className="btn-ghost btn text-xl normal-case">🐾 MichiAPP</Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input-bordered input w-24 md:w-auto"
            />
          </div>
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <img src={sessionData?.user.image} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <Link href="/" className="justify-between">
                  See all pets
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link href="/newpet">Add new pets</Link>
              </li>
              <li>
                <Link href="/admin">My Pets</Link>
              </li>
              <li>
                <button
                  onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                  }
                >
                  {sessionData ? "Sign out" : "Sign in"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
