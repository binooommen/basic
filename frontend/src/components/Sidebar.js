import React from 'react';

export default function Sidebar({ current, setCurrent }) {
  return (
    <nav className="h-full bg-gray-100 w-48 flex flex-col py-8 px-4 border-r">
      <button className={`mb-4 text-left px-2 py-2 rounded ${current==='dashboard' ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'}`} onClick={() => setCurrent('dashboard')}>Dashboard</button>
      <button className={`mb-4 text-left px-2 py-2 rounded ${current==='customers' ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'}`} onClick={() => setCurrent('customers')}>Customers</button>
      <button className={`text-left px-2 py-2 rounded ${current==='settings' ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'}`} onClick={() => setCurrent('settings')}>Settings</button>
    </nav>
  );
}
