import React, { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#ffc107';

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: bgColor,
      color: '#fff',
      padding: '1rem 1.5rem',
      borderRadius: '4px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 9999,
      animation: 'slideIn 0.3s ease-out'
    }}>
      {message}
    </div>
  );
}
