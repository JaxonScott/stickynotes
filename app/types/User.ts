export type UserType = {
  id: string;
  name: string;
  image: string;
  notes: {
    id: string;
    title: string;
    createdAt: string;
  }[];
};
