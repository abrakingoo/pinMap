import React, { useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia';

export default function AdminDashboard({ users, flash_user }) {
  useEffect(() => {
    if (flash_user) {
      localStorage.setItem("flash_user", JSON.stringify(flash_user));
    }
  }, [flash_user]);
  
  // console.log('Logged in user:', localStorage.getItem("flash_user"));
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      Inertia.delete(`/admin/users/${id}`, {
        onSuccess: () => {
          Inertia.visit("/admin");
        },
      });
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
        Admin Dashboard
      </h1>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            minWidth: '100%',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>
              <th style={{ padding: '8px 16px', borderBottom: '1px solid #e5e7eb' }}>ID</th>
              <th style={{ padding: '8px 16px', borderBottom: '1px solid #e5e7eb' }}>Username</th>
              <th style={{ padding: '8px 16px', borderBottom: '1px solid #e5e7eb' }}>Email</th>
              <th style={{ padding: '8px 16px', borderBottom: '1px solid #e5e7eb' }}>Created At</th>
              <th style={{ padding: '8px 16px', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ cursor: 'pointer', backgroundColor: '#fff', ':hover': { backgroundColor: '#f9fafb' } }}>
                <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e7eb' }}>{user.id}</td>
                <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e7eb' }}>{user.username}</td>
                <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e7eb' }}>{user.email}</td>
                <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e7eb' }}>
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td style={{ padding: '8px 16px', borderBottom: '1px solid #e5e7eb' }}>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{
                      color: '#e11d48',
                      fontWeight: '600',
                      cursor: 'pointer',
                      background: 'transparent',
                      border: 'none',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
