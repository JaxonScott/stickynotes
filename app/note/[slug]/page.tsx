"use client";

import { useQuery } from "@tanstack/react-query";
import { NoteType } from "../../types/Note";
import axios from "axios";
import Notes from "../../components/Notes";
import AddComment from "../../components/AddComment";

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
  const { data, isLoading } = useQuery<NoteType>({
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
    </div>
  );
}
