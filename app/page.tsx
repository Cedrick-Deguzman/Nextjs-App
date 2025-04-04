'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const usersPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: users, error } = await supabase
        .from('users')
        .select('*');
        console.log(users, error);
      if (error) {
        setError(error.message);
      } else {
        setData(users);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (data.length === 0) return <div>Loading...</div>;

  return (
    <div>
    <h1>Supabase Users</h1>
    <table cellPadding="10" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody style={{ border: '1px solid #ddd' }}>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td> 
            <td>{item.email}</td>
            <td>{item.number}</td>
            <td>{item.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default usersPage;
