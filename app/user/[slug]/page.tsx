"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "@/app/types/User";
import Notes from "../../components/Notes";

type URL = {
  params: {
    slug: string;
  };
};

const fetchProfile = async (slug: string) => {
  const response = await axios.get(`/api/user/${slug}`);
  return response.data;
};

export default function Profile(url: URL) {
  const { data, isLoading } = useQuery<UserType>({
    queryFn: () => fetchProfile(url.params.slug),
    queryKey: ["profile"],
  });
  if (isLoading) return <h1>Loading...</h1>;
  console.log(data);
  return (
    <div>
      {data?.notes.map((i) => (
        <Notes
          avatar={data.image}
          name={data.name}
          noteTitle={i.title}
          id={i.id}
          userId={data.id}
        />
      ))}
    </div>
  );
}
