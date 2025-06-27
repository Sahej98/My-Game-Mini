import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Market from './components/Market';
import Inventory from './components/Inventory';
import axios from 'axios';
import { setToken, getToken } from './auth';

export default function App() {
  const [token, setAuthToken] = useState(getToken());

  const handleLogin = async (isSignup) => {
    const username = prompt('Username');
    const password = prompt('Password');
    const endpoint = isSignup ? 'signup' : 'login';
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/auth/${endpoint}`,
        {
          username,
          password,
        }
      );
      if (res.data.token) {
        setToken(res.data.token);
        setAuthToken(res.data.token);
      } else {
        alert(res.data.msg);
      }
    } catch (err) {
      alert('Auth failed');
    }
  };

  if (!token)
    return (
      <div style={{ padding: 40 }}>
        <h1>Item Trader</h1>
        <button onClick={() => handleLogin(false)}>Login</button>
        <button onClick={() => handleLogin(true)}>Signup</button>
      </div>
    );

  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <nav style={{ marginBottom: 20 }}>
          <Link to='/'>Dashboard</Link> | <Link to='/market'>Market</Link> |{' '}
          <Link to='/inventory'>Inventory</Link> |{' '}
          <button
            onClick={() => {
              setToken('');
              setAuthToken('');
            }}>
            Logout
          </button>
        </nav>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/market' element={<Market />} />
          <Route path='/inventory' element={<Inventory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
