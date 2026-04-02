// src/pages/segments/Segments.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const initialForm = { name: '', description: '' };

export default function Segments() {
  const { user } = useAuth();
  const token = localStorage.getItem('token');

  const [segments, setSegments] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState(initialForm);
  const [saving, setSaving]     = useState(false);
  const [search, setSearch]     = useState('');

  const canEdit = ['SUPER_ADMIN','BUSINESS_ADMIN','MARKETING_MANAGER'].includes(user?.role);
  const canDelete = ['SUPER_ADMIN','BUSINESS_ADMIN'].includes(user?.role);

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  async function fetchSegments() {
    try {
      setLoading(true);
      const res = await fetch(`${API}/segments`, { headers });
      const data = await res.json();
      setSegments(data.data || data || []);
    } catch (e) {
      setError('Failed to load segments');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchSegments(); }, []);

  function openCreate() {
    setEditing(null);
    setForm(initialForm);
    setShowModal(true);
  }

  function openEdit(seg) {
    setEditing(seg);
    setForm({ name: seg.name, description: seg.description || '' });
    setShowModal(true);
  }

  async function handleSave() {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const url    = editing ? `${API}/segments/${editing.id}` : `${API}/segments`;
      const method = editing ? 'PUT' : 'POST';
      const res    = await fetch(url, { method, headers, body: JSON.stringify(form) });
      if (res.ok) {
        setShowModal(false);
        fetchSegments();
      }
    } catch (e) {
      setError('Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this segment?')) return;
    await fetch(`${API}/segments/${id}`, { method: 'DELETE', headers });
    fetchSegments();
  }

  const filtered = segments.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800">Segments</h1>
          <p className="text-sm text-slate-500 mt-0.5">Group your contacts into targeted segments</p>
        </div>
        {canEdit && (
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
          >
            <span className="text-lg leading-none">+</span> New Segment
          </button>
        )}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search segments..."
          className="w-full sm:w-72 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>

      {/* Error */}
      {error && <div className="bg-red-50 text-red-600 rounded-xl p-3 text-sm">{error}</div>}

      {/* Segments Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="text-5xl mb-3">🗂️</div>
          <p className="text-slate-500 font-medium">No segments found</p>
          <p className="text-slate-400 text-sm mt-1">Create your first segment to group contacts</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(seg => (
            <div key={seg.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-xl shrink-0">🗂️</div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{seg.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {seg.contact_count ?? 0} contacts
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  {canEdit && (
                    <button onClick={() => openEdit(seg)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors text-sm">✏️</button>
                  )}
                  {canDelete && (
                    <button onClick={() => handleDelete(seg.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-400 transition-colors text-sm">🗑️</button>
                  )}
                </div>
              </div>
              {seg.description && (
                <p className="text-sm text-slate-500 mt-3 line-clamp-2">{seg.description}</p>
              )}
              <p className="text-xs text-slate-400 mt-3">
                Created {seg.created_at ? new Date(seg.created_at).toLocaleDateString() : '—'}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-800">
                {editing ? 'Edit Segment' : 'New Segment'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Segment Name *</label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Premium Subscribers"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Optional description..."
                  rows={3}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                />
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name.trim()}
                className="px-5 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-colors"
              >
                {saving ? 'Saving…' : (editing ? 'Update' : 'Create')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
