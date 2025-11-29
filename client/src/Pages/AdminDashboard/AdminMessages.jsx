import React, { useEffect, useState } from 'react';
import axiosInstance from '../../lib/axiosInstance';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get('/api/admin/contact');
        // server returns array
        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load messages');
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      const res = await axiosInstance.patch(`/api/admin/contact/${id}/read`);
      setMessages((prev) => prev.map((m) => (m._id === id ? res.data : m)));
    } catch (err) {
      alert('Failed to mark as read: ' + (err.message || 'error'));
    }
  };

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="min-h-screen p-5">
      <h1 className="mb-6 text-3xl font-bold text-primary">Contact Messages</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table className="min-w-full text-sm table-auto">
          <thead>
            <tr className="text-left text-primary">
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Email</th>
              <th className="px-4 py-2 font-medium">Subject</th>
              <th className="px-4 py-2 font-medium">Message</th>
              <th className="px-4 py-2 font-medium">Date</th>
              <th className="px-4 py-2 font-medium">Read</th>
              <th className="px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m._id} className="border-t">
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.email}</td>
                <td className="p-3">{m.subject}</td>
                <td className="p-3 max-w-xl truncate">{m.message}</td>
                <td className="p-3">{m.createdAt ? new Date(m.createdAt).toLocaleString() : '-'}</td>
                <td className="p-3">{m.isRead ? 'Yes' : 'No'}</td>
                <td className="p-3">
                  {!m.isRead && (
                    <button onClick={() => handleMarkRead(m._id)} className="px-3 py-1 bg-primary text-white rounded">Mark as Read</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
