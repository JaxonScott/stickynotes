"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

type User = {
  image: string;
};

export default function Logged({ image }: User) {
  return (
    <li className="flex gap-8 items-center">
      <button
        onClick={() => signOut()}
        className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-md p-2 px-6"
      >
        Sign out
      </button>
      <Link href={"/dashboard"}>
        <Image
          width={64}
          height={64}
          alt="avatar"
          className="rounded-full"
          src={image}
        />
      </Link>
    </li>
  );
}
