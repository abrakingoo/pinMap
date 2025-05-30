import React, { useState } from 'react'
import { Inertia } from '@inertiajs/inertia'

export default function Register({ auth, error}) {
  const [username, setUsername] = useState('')  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  let [err, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
  
    Inertia.post('/register', { user: {username, email, password, password_confirmation: password } }, {
        onSuccess: () => {
            console.log("Registration Success! Login to Continue")
        },
        onError : (errors) => {
            console.error("Registration error:", errors);
            setError('Registration failed: ' + (errors.message || 'Unknown error'));
        }
    })
  }
  

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Create an Account</h2>
        {error && <div style={styles.error}>{error}</div>}
        {err && <div style={styles.error}>{err}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
              placeholder='John Doe'
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder='example@email.com'
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={styles.footerText}>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f9',
  },
  formContainer: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
  },
  input: {
    padding: '0.8rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  footerText: {
    textAlign: 'center',
    marginTop: '1rem',
  },
}
