import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import Header from '../Components/Header'; // Import your Header component

const pages = import.meta.glob('../Pages/**/*.jsx', { eager: true });

createInertiaApp({
  resolve: name => pages[`../Pages/${name}.jsx`],
  setup({ el, App, props }) {
    // You can pass auth data here if necessary
    const auth = window.authData;

    createRoot(el).render(
      <div>
        <Header auth={auth} /> {/* Render the Header component here */}
        <App {...props} />
      </div>
    );
  },
});
