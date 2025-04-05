import React from 'react'
import { Inertia } from '@inertiajs/inertia' // For handling the logout action
import { InertiaLink } from '@inertiajs/inertia-react' // Import InertiaLink for navigation

export default function Header({ auth }) {
    const handleLogout = () => {
        Inertia.post('/logout', {}, {
            onSuccess: () => {
                localStorage.clear();
                alert("You’ve been logged out.");
                window.location.href = '/';
              }
        });
      }
      
  const data = JSON.parse(localStorage.getItem("user"))
  return (
    <header style={{ padding: '1rem', background: '#f5f5f5' }}>
      {/* Wrap PinMap text in InertiaLink to navigate to home page */}
      <InertiaLink href="/" style={{ fontSize: '1rem', fontWeight: 'bold', textDecoration: 'none' }}>
        🗺️ PinMap
      </InertiaLink>
      
      <div style={{ float: 'right' }}>
        {data && data.email ?  (
          <>
            <span>Welcome, {data.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <InertiaLink href="/login">Login</InertiaLink> | 
            <InertiaLink href="/signup">Register</InertiaLink>
          </>
        )}
      </div>
    </header>
  )
}
