import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import Header from '../Components/Header';

const pages = import.meta.glob('../Pages/**/*.jsx', { eager: true });

createInertiaApp({
  resolve: name => pages[`../Pages/${name}.jsx`],
  setup({ el, App, props }) {
    createRoot(el).render(
      <div>
        <Header />
        <App {...props} />
      </div>
    );
  },
});
