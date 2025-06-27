import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/game/me').then((res) => setUser(res.data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Cash:</strong> ₹{user.cash}
      </p>
      <p>
        <strong>XP:</strong> {user.xp}
      </p>
      <p>
        <strong>Level:</strong> {user.level}
      </p>
    </div>
  );
}
