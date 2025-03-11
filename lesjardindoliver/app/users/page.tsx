// app/users/page.tsx
import Link from "next/link";
import React from "react";
import { Layout } from "../components/layout";

const UsersPage : React.FC = () => {
  // Simulate fetching user data
  const users = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
  ];

  return (
    <Layout>
      <div>
        <h1>Users</h1>
        <ul className="text-black">
          {users.map((user) => (
            <li key={user.id}>
              <Link href={`/users/${user.id}`}>{user.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default UsersPage;
