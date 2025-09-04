import React, { useEffect, useState } from 'react';
import { getCustomers, getCustomer, createCustomer } from '../api/customers';

export default function CustomersTable({ token, onViewCustomer }) {
  const [customers, setCustomers] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers(token);
      setCustomers(res.data);
    } catch (e) {
      setError('Failed to fetch customers');
    }
  };

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name) return setError('Name is required');
    try {
      await createCustomer(form, token);
      setShowCreate(false);
      setForm({ name: '', email: '', phone: '' });
      setError('');
      fetchCustomers();
    } catch (e) {
      setError('Failed to create customer');
    }
  };

  const handleView = async (id) => {
    try {
      const res = await getCustomer(id, token);
      onViewCustomer(res.data);
    } catch (e) {
      setError('Failed to fetch customer');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Customers</h2>
        <button className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded" onClick={() => setShowCreate(true)}>Create</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} className="hover:bg-blue-50 cursor-pointer" onClick={() => handleView(c.id)}>
                <td className="px-4 py-2 border-b">{c.name}</td>
                <td className="px-4 py-2 border-b">{c.email || '-'}</td>
                <td className="px-4 py-2 border-b">{c.phone || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Create Customer</h3>
            <form onSubmit={handleCreate}>
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
              <div className="flex justify-end gap-2">
                <button type="button" className="py-2 px-4 bg-gray-200 rounded" onClick={() => { setShowCreate(false); setError(''); }}>Cancel</button>
                <button type="submit" className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
