import React from 'react';
import Sidebar from '../components/Sidebar';

export default function MainLayout({ page, setPage, userName, onSignOut, children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar current={page} setCurrent={setPage} />
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between bg-white shadow px-8 py-4">
          <h1 className="text-xl font-bold">{page.charAt(0).toUpperCase() + page.slice(1)}</h1>
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">{userName}</span>
            <button
              className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded transition"
              onClick={onSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
