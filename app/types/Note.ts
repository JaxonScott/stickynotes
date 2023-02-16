export type NoteType = {
  title: string;
  id: string;
  message?: string;
  createdAt: string;
  user: {
    name: string;
    image: string;
    id: string;
  };
};
