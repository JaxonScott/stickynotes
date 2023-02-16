"use client";

import React, { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { NotesType } from "../types/Notes";

type Comment = {
  comment: string;
  noteId: string;
};

type NoteProps = {
  id: string;
};

export default function AddComment({ id }: NoteProps) {
  const [comment, setComment] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (data: Comment) => {
      return axios.post("/api/notes/addComment", { data });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["note-details"]);
        setComment("");
        setIsDisabled(false);
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
        setIsDisabled(false);
        console.log(comment, id);
        if (error instanceof AxiosError) {
          console.log(error);
        }
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate({ comment, noteId: id });
  };
  return (
    <form className="bg-white rounded-md my-8 p-8 " onSubmit={submitComment}>
      <div className="flex flex-col my-4">
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="comment..."
          className="p-4 rounded-md text-lg my-2 bg-gray-200   text-gray-800"
        />
      </div>

      <button
        className="bg-cyan-500 text-white rounded-md transition hover:bg-cyan-600 p-2 px-6"
        type="submit"
        disabled={isDisabled}
      >
        Add Comment
      </button>
    </form>
  );
}
