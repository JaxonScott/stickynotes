import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Link from "next/link";
import LoginBtn from "./LoginBtn";
import Logged from "./Logged";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <nav className="flex justify-between items-center py-4">
      <Link href={"/"} className="text-lg font-bold ">
        Stickynotes
      </Link>
      <ul className="flex items-center gap-6">
        {!session?.user && <LoginBtn />}
        {session?.user && <Logged image={session?.user.image || ""} />}
      </ul>
    </nav>
  );
}
