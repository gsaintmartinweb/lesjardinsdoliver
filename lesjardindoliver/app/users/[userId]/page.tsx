// app/users/[userId]/page.tsx

import React from 'react';
import { useRouter } from 'next/router';

const UserProfile: React.FC = () => {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <div>
      <h1>User Profile</h1>
      <p>This is the profile page for user: {userId}</p>
    </div>
  );
};

export default UserProfile;
