"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthNotes } from "../types/AuthNotes";
import DashboardNote from "./DashboardNote";

const fetchAuthNotes = async () => {
  const response = await axios.get("/api/notes/authNotes");
  return response.data;
};

export default function DashBoardNotes() {
  const { data, isLoading } = useQuery<AuthNotes>({
    queryFn: fetchAuthNotes,
    queryKey: ["auth-notes"],
  });
  if (isLoading) return <h1>loading...</h1>;
  console.log(data);
  return (
    <div>
      {data?.notes.map((i) => (
        <DashboardNote
          avatar={data.image}
          noteTitle={i.title}
          date={new Date(i.createdAt).toDateString()}
          name={data.name}
          id={i.id}
        />
      ))}
    </div>
  );
}
