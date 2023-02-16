export type AuthNotes = {
  email: string;
  id: string;
  name: string;
  image: string;
  notes: {
    id: string;
    title: string;
    createdAt: string;
  }[];
};
