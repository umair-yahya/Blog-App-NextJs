import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="max-sm max-md p-5 bg-slate-700 text-emerald-500 font-bold text-xl">
      <div className="flex justify-between">
        <div className="w-2/5">
          <Link href="/">Blog App</Link>
        </div>
        <div className="flex justify-evenly w-2/5 ">
          {session ? (
            <>
              <div>
                <h1>{session.user.email.slice(0, 5)}</h1>
              </div>
              <div>
                <button onClick={signOut}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link href="/login">Login</Link>
              </div>
              <div>
                <Link href="/signup">Sign-up</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
