import React, { useState, useEffect } from 'react';
import './index.css';
import MainLayout from './layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import CustomersPage from './pages/CustomersPage';
import SettingsPage from './pages/SettingsPage';
import { login as apiLogin, register as apiRegister, updateName as apiUpdateName, updatePassword as apiUpdatePassword } from './api/auth';
import { getCustomers } from './api/customers';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registerMode, setRegisterMode] = useState(false);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const [newName, setNewName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [page, setPage] = useState('dashboard');
  const [viewCustomer, setViewCustomer] = useState(null);
  const [customerCount, setCustomerCount] = useState(null);

  // Fetch customer count for dashboard
  useEffect(() => {
    if (token && page === 'dashboard') {
      getCustomers(token)
        .then(res => setCustomerCount(res.data.length))
        .catch(() => setCustomerCount(null));
    }
  }, [token, page]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await apiLogin(username, password);
      setToken(res.data.token);
      setUserName(res.data.name);
      setMessage('Login successful!');
    } catch (err) {
      setMessage('Login failed: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await apiRegister(username, password, name);
      setMessage('Registration successful! You can now log in.');
      setRegisterMode(false);
    } catch (err) {
      setMessage('Registration failed: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  const handleUpdateName = async (e) => {
    e.preventDefault();
    try {
      await apiUpdateName(newName, token);
      setUserName(newName);
      setMessage('Name updated!');
    } catch (err) {
      setMessage('Update failed: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await apiUpdatePassword(oldPassword, newPassword, token);
      setMessage('Password updated!');
    } catch (err) {
      setMessage('Update failed: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  if (token) {
    return (
      <MainLayout
        page={page}
        setPage={setPage}
        userName={userName}
        onSignOut={() => { setToken(''); setUserName(''); setMessage('Signed out!'); }}
      >
        {page === 'dashboard' && (
          <DashboardPage customerCount={customerCount} />
        )}
        {page === 'customers' && (
          <CustomersPage token={token} />
        )}
        {page === 'settings' && (
          <SettingsPage
            newName={newName}
            setNewName={setNewName}
            oldPassword={oldPassword}
            setOldPassword={setOldPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            handleUpdateName={handleUpdateName}
            handleUpdatePassword={handleUpdatePassword}
            message={message}
          />
        )}
      </MainLayout>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">{registerMode ? 'Register' : 'Login'}</h2>
      <form onSubmit={registerMode ? handleRegister : handleLogin}>
        {registerMode && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded transition">{registerMode ? 'Register' : 'Login'}</button>
      </form>
      <div className="mt-4">
        <button onClick={() => { setRegisterMode(!registerMode); setMessage(''); }} className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded transition">
          {registerMode ? 'Switch to Login' : 'Switch to Register'}
        </button>
      </div>
      {message && <div className="mt-6 text-center text-green-600">{message}</div>}
    </div>
  );
}

export default App;
