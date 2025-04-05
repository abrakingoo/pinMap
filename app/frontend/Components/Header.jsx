import React from 'react'
import { Inertia } from '@inertiajs/inertia' // For handling the logout action
import { InertiaLink } from '@inertiajs/inertia-react' // Import InertiaLink for navigation

export default function Header({ auth }) {
  const handleLogout = () => Inertia.post('/logout')

  return (
    <header style={{ padding: '1rem', background: '#f5f5f5' }}>
      {/* Wrap PinMap text in InertiaLink to navigate to home page */}
      <InertiaLink href="/" style={{ fontSize: '1rem', fontWeight: 'bold', textDecoration: 'none' }}>
        🗺️ PinMap
      </InertiaLink>
      
      <div style={{ float: 'right' }}>
        {auth?.user ? (
          <>
            <span>Welcome, {auth.user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <InertiaLink href="/users/sign_in">Login</InertiaLink> | 
            <InertiaLink href="/users/sign_up">Register</InertiaLink>
          </>
        )}
      </div>
    </header>
  )
}
