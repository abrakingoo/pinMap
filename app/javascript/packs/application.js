import React from 'react'
import ReactDOM from 'react-dom'
import { InertiaApp } from '@inertiajs/inertia-react'
import Header from '../components/Header' // Adjust path as necessary

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')  // The div in your HTML layout
  const pageProps = JSON.parse(app.dataset.page)  // Get the page props passed from the Rails controller
  const auth = JSON.parse(app.dataset.auth)  // Get the auth object passed from the Rails controller

  ReactDOM.render(
    <>
      <Header auth={auth} />  {/* This renders the Header */}
      <InertiaApp
        initialPage={pageProps}
        resolveComponent={(name) => require(`./Pages/${name}`).default}
      />
    </>,
    app
  )
})
