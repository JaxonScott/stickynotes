"use client";

import AddNote from "./components/AddNote";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NoteType } from "./types/Note";
import Notes from "./components/Notes";

const allNotes = async () => {
  const response = await axios.get("/api/notes/getNotes");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<NoteType[]>({
    queryFn: allNotes,
    queryKey: ["notes"],
  });
  if (error) {
    return error;
  }
  if (isLoading) return <h1>loading...</h1>;
  console.log(data);
  return (
    <main>
      <AddNote />
      {data?.map((i) => (
        <Notes
          avatar={i.user.image}
          name={i.user.name}
          noteTitle={i.title}
          id={i.id}
          userId={i.user.id}
        />
      ))}
    </main>
  );
}
