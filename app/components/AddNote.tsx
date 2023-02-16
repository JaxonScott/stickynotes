"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddNote() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  let toastNoteId: string;
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/notes/addNote", { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message, { id: toastNoteId });
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        setTitle("");
        setIsDisabled(false);
        toast.success("your post was created 🎉", { id: toastNoteId });
        console.log(data);
        queryClient.invalidateQueries(["notes"]);
      },
    }
  );

  const submitNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    toastNoteId = toast.loading("Creating your post!", { id: toastNoteId });
    mutate(title);
  };
  return (
    <form className="bg-white rounded-md my-8 p-8 " onSubmit={submitNote}>
      <div className="flex flex-col my-4">
        <textarea
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="whats going on?"
          className="p-4 rounded-md text-lg my-2 bg-gray-200   text-gray-800"
        />
      </div>

      <button
        className="bg-cyan-500 text-white rounded-md transition hover:bg-cyan-600 p-2 px-6"
        type="submit"
        disabled={isDisabled}
      >
        Add Note
      </button>
    </form>
  );
}
