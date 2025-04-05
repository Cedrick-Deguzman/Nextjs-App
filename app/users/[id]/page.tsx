'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  city: string;
  barangay: string;
  group: string;
  category: string;
};

export default function UserDetailPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [updatedUser, setUpdatedUser] = useState<User | null>(null); // Store updated user info
  const router = useRouter();

  const { id } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (typeof id !== 'string') return; // Ensure id is a string

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        setError('User not found');
        setLoading(false);
        return;
      }

      setUser(data);
      setUpdatedUser(data); // Initialize updatedUser with the fetched data
      setLoading(false);
    };

    fetchUserDetails();
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev); // Toggle edit mode
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!updatedUser) return;
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    if (!updatedUser) return;

    const { error } = await supabase
      .from('users')
      .update({
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        number: updatedUser.number,
        city: updatedUser.city,
        barangay: updatedUser.barangay,
        group: updatedUser.group,
        category: updatedUser.category,
      })
      .eq('id', updatedUser.id);

    if (error) {
      setError('Error updating user');
      return;
    }

    // After successful update, redirect to user list
    router.push('/');
  };

  const handleDelete = async () => {
    if (!user) return;

    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
      const { error } = await supabase.from('users').delete().eq('id', user.id);

      if (error) {
        setError('Error deleting user');
        return;
      }

      // Redirect to the root page after successful deletion
      router.push('/');
    }
  };  

  const handleGoBack = () => {
    router.push('/'); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>User Details</h1>

      {isEditing ? (
        <div>
          <h2>Edit User</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px' }}>First Name:</label>
              <input
                type="text"
                name="first_name"
                value={updatedUser?.first_name || ''}
                onChange={handleInputChange}
                style={{
                  padding: '8px',
                  border: '2px solid #ccc',
                  borderRadius: '4px',
                  width: '100%',
                  marginBottom: '10px',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px' }}>Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={updatedUser?.last_name || ''}
                onChange={handleInputChange}
                style={{
                  padding: '8px',
                  border: '2px solid #ccc',
                  borderRadius: '4px',
                  width: '100%',
                  marginBottom: '10px',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px' }}>Email:</label>
              <input
                type="email"
                name="email"
                value={updatedUser?.email || ''}
                onChange={handleInputChange}
                style={{
                  padding: '8px',
                  border: '2px solid #ccc',
                  borderRadius: '4px',
                  width: '100%',
                  marginBottom: '10px',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px' }}>Phone:</label>
              <input
                type="text"
                name="number"
                value={updatedUser?.number || ''}
                onChange={handleInputChange}
                style={{
                  padding: '8px',
                  border: '2px solid #ccc',
                  borderRadius: '4px',
                  width: '100%',
                  marginBottom: '10px',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px' }}>City:</label>
              <input
                type="text"
                name="location"
                value={updatedUser?.city || ''}
                onChange={handleInputChange}
                style={{
                  padding: '8px',
                  border: '2px solid #ccc',
                  borderRadius: '4px',
                  width: '100%',
                  marginBottom: '10px',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px' }}>Barangay:</label>
              <input
                type="text"
                name="location"
                value={updatedUser?.barangay || ''}
                onChange={handleInputChange}
                style={{
                  padding: '8px',
                  border: '2px solid #ccc',
                  borderRadius: '4px',
                  width: '100%',
                  marginBottom: '10px',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px' }}>Category:</label>
              <input
                type="text"
                name="location"
                value={updatedUser?.category || ''}
                onChange={handleInputChange}
                style={{
                  padding: '8px',
                  border: '2px solid #ccc',
                  borderRadius: '4px',
                  width: '100%',
                  marginBottom: '10px',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px' }}>Group:</label>
              <select
                name="group"
                value={updatedUser?.group || ''}
                onChange={handleInputChange}
                style={{
                  padding: '8px',
                  border: '2px solid #ccc',
                  borderRadius: '4px',
                  width: '100%',
                  marginBottom: '10px',
                }}
              >
                <option value="" disabled>
                  Select Group
                </option>
                {[1, 2, 3, 4, 5].map((group) => (
                  <option key={group} value={group}>
                    Group {group}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Field</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>First Name</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user?.first_name}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Last Name</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user?.last_name}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Email</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user?.email || "N/A"}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Phone</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user?.number || "N/A"} </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>City</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user?.city || "N/A"}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Barangay</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user?.barangay || "N/A"}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Group</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user?.group || "N/A"}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Category</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user?.category || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      )}

<div style={{ marginTop: '20px' }}>
        {isEditing ? (
          <>
            <button
              onClick={handleUpdate}
              style={{
                padding: '10px 20px',
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Save
            </button>
            <button
              onClick={handleEditToggle}
              style={{
                padding: '10px 20px',
                backgroundColor: 'gray',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEditToggle}
              style={{
                padding: '10px 20px',
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              style={{
                padding: '10px 20px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            >
              Delete
            </button>
          </>
        )}

        {!isEditing && (
          <button
            onClick={handleGoBack}
            style={{
              padding: '10px 20px',
              backgroundColor: 'gray',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginLeft: '10px',
            }}
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
}
