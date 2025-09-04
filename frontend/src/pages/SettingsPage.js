import React from 'react';

export default function SettingsPage({
  newName, setNewName, oldPassword, setOldPassword, newPassword, setNewPassword, handleUpdateName, handleUpdatePassword, message
}) {
  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleUpdateName} className="mb-6">
        <label className="block mb-2 font-medium">Change Name</label>
        <input
          type="text"
          placeholder="New Name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded transition">Update Name</button>
      </form>
      <form onSubmit={handleUpdatePassword}>
        <label className="block mb-2 font-medium">Change Password</label>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded transition">Update Password</button>
      </form>
      {message && <div className="mt-6 text-center text-green-600">{message}</div>}
    </div>
  );
}
