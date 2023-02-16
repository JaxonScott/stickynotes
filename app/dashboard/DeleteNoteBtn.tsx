"use client";

import axios, { AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AuthNotes } from "../types/AuthNotes";
import { toast } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

export default function DeleteNoteBtn({ noteId }: { noteId: string }) {
  let id = noteId;
  let toastNoteId: string;
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/notes/deleteNote", { data: { id } }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          console.log(error);
          toast.error(error.response?.data.message, { id: toastNoteId });
        }
      },
      onSuccess: (data) => {
        console.log(data);
        toast.success("Your note was deleted", { id: toastNoteId });
      },
    }
  );

  const deleteNote = async () => {
    toastNoteId = toast.loading("deleting note.");
    mutate(id);
    // console.log(id);
  };
  return (
    <button
      onClick={() => deleteNote()}
      className="rounded-md  transition hover:bg-opacity-25 hover:bg-gray-300 p-1"
    >
      <FaTrashAlt />
    </button>
  );
}
