"use client ";

import Link from "next/link";
import Image from "next/image";

export default function Notes({ avatar, name, noteTitle, id, userId }) {
  return (
    <div className="flex flex-col bg-white p-8 rounded-md mt-4">
      <div>
        <Link href={`/note/${id}`} className="flex gap-2">
          <Image
            src={avatar}
            alt=""
            width={32}
            height={32}
            className="rounded-full"
          />
          <h2 className="text-lg font-semibold transition hover:underline decoration-2">
            {" "}
            {name}
          </h2>
        </Link>
        <div>
          <p className="text-lg font-normal ">{noteTitle}</p>
        </div>
      </div>
    </div>
  );
}
