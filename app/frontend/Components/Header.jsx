import React, { useState, useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { InertiaLink } from '@inertiajs/inertia-react'
import Toast from './Toast'
import ConfirmModal from './ConfirmModal'

export default function Header({props}) {
    const [toast, setToast] = useState(null);
    const [hasPinned, setHasPinned] = useState(false);
    const [userPinId, setUserPinId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("flash_user"));
      console.log('User data from localStorage:', data);
      setUserData(data);
      if (data?.id) {
        console.log('Calling checkUserPin with id:', data.id);
        checkUserPin(data.id);
      } else {
        console.log('No user id found in localStorage');
      }
    }, []);

    const checkUserPin = (userId) => {
      console.log('Checking pin for user:', userId);
      fetch(`/api/user_pin/${userId}`)
        .then(res => {
          console.log('Response status:', res.status);
          if (!res.ok) throw new Error('Failed to fetch');
          return res.json();
        })
        .then(result => {
          console.log('Pin check result:', result);
          if (result.has_pin) {
            setHasPinned(true);
            setUserPinId(result.pin_id);
          } else {
            setHasPinned(false);
            setUserPinId(null);
          }
        })
        .catch(err => {
          console.error('Error checking pin:', err);
        });
    };

    const handleLogout = () => {
        Inertia.post('/logout', {}, {
            onSuccess: () => {
                localStorage.clear();
                setToast({ message: "You've been logged out.", type: 'success' });
                setTimeout(() => window.location.href = '/', 1000);
              }
        });
      }

    const handleUnpin = async () => {
      setShowConfirm(false);
      const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      console.log('Attempting to delete pin:', userPinId);
      try {
        const res = await fetch(`/pins/${userPinId}`, {
          method: 'DELETE',
          headers: { 'X-CSRF-Token': token }
        });
        console.log('Delete response status:', res.status);
        const data = await res.json();
        console.log('Delete response data:', data);
        if (res.ok) {
          setToast({ message: 'Pin removed successfully', type: 'success' });
          setHasPinned(false);
          setUserPinId(null);
          setTimeout(() => window.location.reload(), 1500);
        } else {
          setToast({ message: data.error || 'Failed to remove pin', type: 'error' });
        }
      } catch (error) {
        console.error('Delete error:', error);
        setToast({ message: 'Error: ' + error.message, type: 'error' });
      }
    }
      
  const data = JSON.parse(localStorage.getItem("flash_user"))
  return (
    <>
    <header style={{ 
      padding: '1rem 2rem', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      display: 'flex', 
      flexWrap: 'wrap', 
      justifyContent: 'space-between', 
      alignItems: 'center' 
    }}>
  <InertiaLink href="/" style={{ 
    width: '100%', 
    fontSize: '1.8rem', 
    fontWeight: 'bold', 
    textDecoration: 'none', 
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
    marginBottom: '0.5rem'
  }}>
    🗺️ PinMap
  </InertiaLink>

  <div style={{ width: '100%', display: 'flex', flexWrap:'wrap', alignItems: 'center', gap: '2rem' }}>
    {data && data.email ? (
      <>
        {data.admin ? (
          <>
              <button
                onClick={() => Inertia.visit('/admin')}
                style={{
                  padding: '0.6rem 1.2rem',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  border: '2px solid rgba(255,255,255,0.4)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginLeft: 'auto',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s'
                  }}
              >
                  ⚙️ Dashboard
              </button>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '0.6rem 1.2rem', 
                    backgroundColor: 'rgba(239, 68, 68, 0.9)', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '6px', 
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s'
                  }}
                >
                  🚪 Logout
                </button>
            </>
        ) : (
          <div style={{width: '100%', display: 'flex', flexWrap:'wrap', alignItems: 'center', gap: '2rem'}}>
          <div style={{
            fontWeight: '600', 
            marginBottom: '0.5rem', 
            marginLeft: 'auto',
            color: '#fff',
            fontSize: '1rem'
          }}>
            Welcome, {data.username} {hasPinned && '📍'}
          </div>

          <form
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}
            onSubmit={ async (e) => {
                e.preventDefault();
                const latitude = e.target.lat.value;
                const longitude = e.target.lng.value;

                if (!latitude || !longitude) {
                setToast({ message: 'Please enter both latitude and longitude.', type: 'error' });
                return;
                }

                const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
                try {
                  const res = await fetch('/pin_location', {
                    method: "POST",
                    headers: {
                      "Content-Type" : "application/json",
                      "X-CSRF-Token": token
                    },
                    body: JSON.stringify({latitude, longitude})
                  });
                  const responseData = await res.json();
                  if (res.ok) {
                    setToast({ message: responseData.message, type: 'success' });
                    setHasPinned(true);
                    setUserPinId(responseData.pin_id);
                    e.target.reset();
                    setTimeout(() => window.location.reload(), 1000);
                  } else {
                    setToast({ message: responseData.error || 'Failed to pin location', type: 'error' });
                  }
                } catch (error) {
                  setToast({ message: 'Error: ' + error.message, type: 'error' });
                }
            }}
            >
            <input
                type="text"
                name="lat"
                placeholder="Latitude"
                style={{ 
                  padding: '0.6rem', 
                  borderRadius: '6px', 
                  border: '2px solid rgba(255,255,255,0.3)',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
            />
            <input
                type="text"
                name="lng"
                placeholder="Longitude"
                style={{ 
                  padding: '0.6rem', 
                  borderRadius: '6px', 
                  border: '2px solid rgba(255,255,255,0.3)',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
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
                        setToast({ message: 'Could not retrieve your location.', type: 'error' });
                    }
                    );
                } else {
                    setToast({ message: 'Geolocation is not supported by this browser.', type: 'error' });
                }
                }}
                style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#fff',
                border: '2px solid rgba(255,255,255,0.4)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.3s',
                backdropFilter: 'blur(10px)'
                }}
            >
                📍 Get My Location
            </button>

            {!hasPinned ? (
              <button
                  type="submit"
                  style={{
                  padding: '0.6rem 1.2rem',
                  backgroundColor: '#10b981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s'
                  }}
              >
                  📌 Pin Me
              </button>
            ) : (
              <button
                  type="button"
                  onClick={() => setShowConfirm(true)}
                  style={{
                  padding: '0.6rem 1.2rem',
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s'
                  }}
              >
                  ❌ Unpin Me
              </button>
            )}
            </form>

        <button
          onClick={handleLogout}
          style={{ 
            padding: '0.6rem 1.2rem', 
            backgroundColor: 'rgba(239, 68, 68, 0.9)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            transition: 'all 0.3s'
          }}
        >
          🚪 Logout
        </button>
        </div>
        )}     
      </>
    ) : (
      <>
        <InertiaLink href="/login" style={{ 
          marginLeft: 'auto', 
          color: '#fff', 
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          transition: 'all 0.3s'
        }}>Login</InertiaLink>
        <InertiaLink href="/signup" style={{ 
          color: '#fff', 
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          transition: 'all 0.3s'
        }}>Register</InertiaLink>
      </>
    )}
  </div>
</header>
{toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
{showConfirm && (
  <ConfirmModal
    message="Are you sure you want to remove your pin from the map?"
    onConfirm={handleUnpin}
    onCancel={() => setShowConfirm(false)}
  />
)}
</>
  )
}
