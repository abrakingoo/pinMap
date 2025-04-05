// app/javascript/Layouts/AppLayout.jsx
import React from 'react'
import Header from '../../frontend/Components/Header.jsx'

// This component will be used to wrap the content of every page
export default function AppLayout({ auth, children }) {
  return (
    <div>
      <Header auth={auth} /> {/* Render the Header */}
      <div>{children}</div>  {/* This will render the content of the page */}
    </div>
  )
}
