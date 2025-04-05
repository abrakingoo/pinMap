// app/javascript/components/Header.jsx
import React from 'react'
import { Inertia } from '@inertiajs/inertia'

export default function Header({ auth }) {
  const handleLogout = () => Inertia.post('/logout')

  return (
    <header style={{ padding: '1rem', background: '#f5f5f5' }}>
      <strong>🗺️ PinMap</strong>
      <div style={{ float: 'right' }}>
        {auth?.user ? (
          <>
            <span>Welcome, {auth.user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <a href="/users/sign_in">Login</a> | <a href="/users/sign_up">Register</a>
          </>
        )}
      </div>
    </header>
  )
}
