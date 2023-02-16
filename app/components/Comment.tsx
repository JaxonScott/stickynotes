import Link from "next/link";
import Image from "next/image";

type CommentProps = {
  comment: string;
  id: string;
  name: string;
  date: string;
  avatar: string;
};

export default function Comment({
  comment,
  id,
  name,
  date,
  avatar,
}: CommentProps) {
  return (
    <div className="flex flex-col rounded-md bg-white p-8 mt-4">
      <Link href={"/"} className="flex gap-2">
        <Image
          src={avatar}
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <h2 className="text-md font-semibold transition hover:underline decoration-2 text-lg">
          {name}
        </h2>
      </Link>
      <div className="pt-4">
        <p className="text-lg">{comment}</p>
      </div>
      <div>
        <p className="pt-4 text-sm">{new Date(date).toDateString()}</p>
      </div>
    </div>
  );
}
