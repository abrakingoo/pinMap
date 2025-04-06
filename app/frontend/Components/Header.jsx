import React from 'react'
import { Inertia } from '@inertiajs/inertia' // For handling the logout action
import { InertiaLink } from '@inertiajs/inertia-react' // Import InertiaLink for navigation

export default function Header() {
    const handleLogout = () => {
        Inertia.post('/logout', {}, {
            onSuccess: () => {
                localStorage.clear();
                alert("You’ve been logged out.");
                window.location.href = '/';
              }
        });
      }
      
  const data = JSON.parse(localStorage.getItem("flash_user"))
  return (
    <header style={{ padding: '1rem 2rem', background: '#f5f5f5', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
  <InertiaLink href="/" style={{ width: '100%', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>
    🗺️ PinMap
  </InertiaLink>

  <div style={{ width: '100%', display: 'flex', flexWrap:'wrap', alignItems: 'center', gap: '2rem' }}>
    {data && data.email ? (
      <>
        <div style={{width: '100%', display: 'flex', flexWrap:'wrap', alignItems: 'center', gap: '2rem'}}>
          <div style={{fontWeight: 'bold', marginBottom: '0.5rem', marginLeft: 'auto' }}>Welcome, {data.username}</div>

          <form
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}
            onSubmit={(e) => {
                e.preventDefault();
                const latitude = e.target.lat.value;
                const longitude = e.target.lng.value;

                if (!latitude || !longitude) {
                alert("Please enter both latitude and longitude.");
                return;
                }

                Inertia.post('/pin_location', { latitude, longitude }, {
                onSuccess: () => {
                    alert("Location pinned successfully!");
                    e.target.reset();
                },
                onError: () => {
                    alert("Something went wrong. Try again.");
                }
                });
            }}
            >
            <input
                type="text"
                name="lat"
                placeholder="Latitude"
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
                type="text"
                name="lng"
                placeholder="Longitude"
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button
                type="button"
                onClick={() => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                    (position) => {
                        document.querySelector('input[name="lat"]').value = position.coords.latitude;
                        document.querySelector('input[name="lng"]').value = position.coords.longitude;
                    },
                    () => {
                        alert("Could not retrieve your location.");
                    }
                    );
                } else {
                    alert("Geolocation is not supported by this browser.");
                }
                }}
                style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
                }}
            >
                Get My Location
            </button>

            <button
                type="submit"
                style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#2c7be5',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
                }}
            >
                Pin Me
            </button>
            </form>

        <button
          onClick={handleLogout}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Logout
        </button>

        </div>

      </>
    ) : (
      <>
        <InertiaLink href="/login" style={{ marginLeft: 'auto', color: '#2c7be5', textDecoration: 'none' }}>Login</InertiaLink>
        <InertiaLink href="/signup" style={{ color: '#2c7be5', textDecoration: 'none' }}>Register</InertiaLink>
      </>
    )}
  </div>
</header>

  )
}
