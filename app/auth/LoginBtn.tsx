"use client";

import { signIn } from "next-auth/react";

export default function LoginBtn() {
  return (
    <li>
      <button
        onClick={() => signIn()}
        className="bg-cyan-500 text-sm text-white rounded-md p-2 px-6 transition hover:bg-cyan-600"
      >
        Login
      </button>
    </li>
  );
}
