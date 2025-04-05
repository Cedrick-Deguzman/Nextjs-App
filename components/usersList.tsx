'use client'; // Marks the file as a client-side component

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;
  // Calculate the total number of pages
  const totalPages = Math.ceil(users.length / usersPerPage);

   // Get the users for the current page
   const indexOfLastUser = currentPage * usersPerPage;
   const indexOfFirstUser = indexOfLastUser - usersPerPage;
   const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
 
   // Handle page change
   const handlePageChange = (pageNumber: number) => {
     setCurrentPage(pageNumber);
   };
 
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        setError('Error fetching users');
        setLoading(false);
        return;
      }
      setUsers(data || []);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
    <div>
      <h1>Users List</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>First Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Last Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}
            style={{ cursor: 'pointer' }} // Change cursor to pointer on hover
            onClick={() => router.push(`/users/${user.id}`)}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.first_name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.last_name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button
                  onClick={() => router.push(`/users/${user.id}`)}
                  style={{ padding: '5px 10px', backgroundColor: 'blue', color: 'white', cursor: 'pointer' }}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ padding: '5px 10px', margin: '0 5px' }}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ padding: '5px 10px', margin: '0 5px' }}
        >
          Next
        </button>
      </div>
    </div>
    </>
  );
}
