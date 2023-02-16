export type NotesType = {
  title: string;
  id: string;
  createdAt: string;
  comments?: {
    createdAt: string;
    id: string;
    noteId: string;
    userId: string;
  }[];
  user: {
    name: string;
    image: string;
  };
};
