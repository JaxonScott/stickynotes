import Image from "next/image";
import Link from "next/link";
import DeleteNoteBtn from "./DeleteNoteBtn";

export default function DashboardNote({ avatar, noteTitle, date, name, id }) {
  return (
    <div className="flex flex-col bg-white p-8 rounded-md mt-4">
      <div>
        <Link href={"/"} className="flex gap-2">
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
          <p className="text-lg font-normal pt-4">{noteTitle}</p>
        </div>
      </div>
      <div className="pt-4 flex justify-between">
        <p className="text-sm ">{date}</p>
        <div className="flex gap-2">
          <button className="rounded-md  transition hover:bg-opacity-25 hover:bg-gray-300 p-1">
            edit
          </button>
          <DeleteNoteBtn noteId={id} />
        </div>
      </div>
    </div>
  );
}
