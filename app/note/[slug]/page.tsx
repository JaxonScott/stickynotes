"use client";

import { useQuery } from "@tanstack/react-query";
import { NotesTypes } from "../../types/Notes";
import axios from "axios";
import Notes from "../../components/Notes";
import AddComment from "../../components/AddComment";
import Comment from "../../components/Comment";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/note/${slug}`);
  return response.data;
};

export default function NoteDetails(url: URL) {
  const { data, isLoading } = useQuery<NotesTypes>({
    queryFn: () => fetchDetails(url.params.slug),
    queryKey: ["note-details"],
  });
  if (isLoading) return <h1>Loading...</h1>;
  console.log(data);
  return (
    <div>
      <Notes
        avatar={data?.user.image}
        name={data?.user.name}
        noteTitle={data?.title}
        id={data?.id}
        userId={data?.user.id}
      />
      <AddComment id={data?.id || ""} />
      <div>
        <h1>{data?.comments.length} Comment's</h1>
        <div>
          {data?.comments.map((i) => (
            <Comment
              comment={i.comment}
              id={i.id}
              name={i.user.name}
              avatar={i.user.image}
              date={i.createdAt || ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
