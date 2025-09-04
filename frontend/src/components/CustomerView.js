import React, { useState } from 'react';
import { updateCustomer, deleteCustomer } from '../api/customers';

export default function CustomerView({ customer, onBack, token }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: customer.name, email: customer.email || '', phone: customer.phone || '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!form.name) return setError('Name is required');
    setLoading(true);
    try {
      await updateCustomer(customer.id, form, token);
      setEditMode(false);
      setError('');
      onBack('refresh');
    } catch (e) {
      setError('Failed to update customer');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    setLoading(true);
    try {
      await deleteCustomer(customer.id, token);
      setError('');
      onBack('refresh');
    } catch (e) {
      setError('Failed to delete customer');
    }
    setLoading(false);
  };

  if (!customer) return null;
  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded shadow">
      <button className="mb-4 text-blue-500 hover:underline" onClick={() => onBack('refresh')}>&larr; Back to Customers</button>
      <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
      {editMode ? (
        <form onSubmit={handleEdit}>
          <input
            className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Name*"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            type="email"
          />
          <input
            className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Phone"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            type="tel"
          />
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="flex gap-2">
            <button type="button" className="py-2 px-4 bg-gray-200 rounded" onClick={() => setEditMode(false)}>Cancel</button>
            <button type="submit" className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      ) : (
        <>
          <div className="mb-2"><b>Name:</b> {customer.name}</div>
          <div className="mb-2"><b>Email:</b> {customer.email || '-'}</div>
          <div className="mb-2"><b>Phone:</b> {customer.phone || '-'}</div>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="flex gap-2 mt-4">
            <button className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded" onClick={() => setEditMode(true)}>Edit</button>
            <button className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded" onClick={handleDelete} disabled={loading}>{loading ? 'Deleting...' : 'Delete'}</button>
          </div>
        </>
      )}
    </div>
  );
}
