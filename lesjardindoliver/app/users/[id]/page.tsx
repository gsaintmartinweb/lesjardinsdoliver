// app/users/[id]/page.tsx
import { notFound } from "next/navigation";

interface UserPageProps {
  params: {
    id: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const { id } = params;

  // Simulate fetching user data
  const users = [
    { id: "1", name: "Alice", email: "alice@example.com" },
    { id: "2", name: "Bob", email: "bob@example.com" },
    { id: "3", name: "Charlie", email: "charlie@example.com" },
  ];

  const user = users.find((user) => user.id === id);

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserPage;