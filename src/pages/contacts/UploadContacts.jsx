// src/pages/contacts/UploadContacts.jsx
import React, { useState, useRef } from 'react';
import { useAuth } from '../auth/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function UploadContacts({ onSuccess }) {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const [file, setFile]         = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult]     = useState(null);
  const [error, setError]       = useState('');
  const fileRef = useRef();

  const canUpload = ['SUPER_ADMIN','BUSINESS_ADMIN','MARKETING_MANAGER'].includes(user?.role);

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && f.name.endsWith('.csv')) setFile(f);
    else setError('Please upload a CSV file');
  }

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setError('');
    setResult(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${API}/upload/csv`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.data || data);
        setFile(null);
        if (onSuccess) onSuccess();
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (e) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  if (!canUpload) return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-700">
      You don't have permission to upload contacts.
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${dragging ? 'border-indigo-400 bg-indigo-50' : 'border-slate-300 hover:border-indigo-300 hover:bg-slate-50'}`}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={e => {
            const f = e.target.files[0];
            if (f) { setFile(f); setError(''); }
          }}
        />
        <div className="text-4xl mb-3">{file ? '📄' : '📤'}</div>
        {file ? (
          <div>
            <p className="font-medium text-slate-700">{file.name}</p>
            <p className="text-sm text-slate-400 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
        ) : (
          <div>
            <p className="font-medium text-slate-700">Drop your CSV file here</p>
            <p className="text-sm text-slate-400 mt-1">or click to browse</p>
          </div>
        )}
      </div>

      {/* CSV Format Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm font-medium text-blue-800 mb-1">📋 CSV Format</p>
        <p className="text-xs text-blue-600">Required columns: <code className="bg-blue-100 px-1 rounded">email</code></p>
        <p className="text-xs text-blue-600 mt-0.5">Optional: <code className="bg-blue-100 px-1 rounded">name</code>, <code className="bg-blue-100 px-1 rounded">phone</code>, <code className="bg-blue-100 px-1 rounded">tags</code></p>
      </div>

      {/* Error */}
      {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">{error}</div>}

      {/* Success Result */}
      {result && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm font-medium text-green-800">✅ Upload Successful!</p>
          <div className="flex gap-4 mt-2 text-sm text-green-700">
            {result.imported !== undefined && <span>Imported: <strong>{result.imported}</strong></span>}
            {result.skipped !== undefined && <span>Skipped: <strong>{result.skipped}</strong></span>}
            {result.errors !== undefined && <span>Errors: <strong>{result.errors}</strong></span>}
          </div>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
      >
        {uploading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Uploading…
          </span>
        ) : '📤 Upload Contacts'}
      </button>
    </div>
  );
}
