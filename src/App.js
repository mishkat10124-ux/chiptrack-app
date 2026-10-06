import React, { useState, useEffect } from 'react';

export default function SupplyChainTracker() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const [form, setForm] = useState({
    tracking_number: '',
    component_name: '',
    origin: '',
    destination: '',
    status: 'In Transit'
  });

  const API_URL = 'http://localhost:5000/api/shipments';

  // Load all shipments when the page loads
  useEffect(() => {
    loadShipments();
  }, []);

  const loadShipments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setShipments(data);
    } catch (err) {
      setError('Could not connect to backend. Make sure server.js is running.');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.tracking_number || !form.component_name) {
      setError('Tracking number and component name are required.');
      return;
    }
    setError('');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error('Failed to save');

      setForm({
        tracking_number: '',
        component_name: '',
        origin: '',
        destination: '',
        status: 'In Transit'
      });
      loadShipments();
    } catch (err) {
      setError('Could not save shipment. Make sure server.js is running.');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    background: '#0f172a',
    border: '1px solid #334155',
    color: '#e2e8f0',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '12px'
  };

  const labelStyle = {
    fontSize: '12px',
    color: '#94a3b8',
    marginBottom: '4px',
    display: 'block',
    textTransform: 'uppercase'
  };

return (
<div style={{ background: '#0f172a', color: '#e2e8f0', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
<div style={{ borderBottom: '1px solid #1e293b', padding: '24px' }}>
<div style={{ maxWidth: '1000px', margin: '0 auto' }}>
<div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
<div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #0ea5e9 0%, #f97316 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
📦
</div>
<h1 style={{ fontSize: '28px', fontWeight: '700', margin: 0 }}>ChipTrack</h1>
</div>
<p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>Real shipment tracking, saved to your database</p>
</div>
</div>

<div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>

{error && (
<div style={{ background: '#7c2d12', border: '1px solid #ea580c', borderRadius: '8px', padding: '12px 16px', marginBottom: '24px', color: '#fecaca', fontSize: '14px' }}>
{error}
</div>
)}

{/* Add Shipment Form */}
<div style={{ background: '#1e293b', borderRadius: '8px', border: '1px solid #334155', padding: '24px', marginBottom: '32px' }}>
<h2 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 20px 0' }}>Add New Shipment</h2>
<form onSubmit={handleSubmit}>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
<div>
<label style={labelStyle}>Tracking Number *</label>
<input
type="text"
name="tracking_number"
value={form.tracking_number}
onChange={handleChange}
placeholder="e.g. CHIP-2024-001"
style={inputStyle}
/>
</div>
<div>
<label style={labelStyle}>Component Name *</label>
<input
type="text"
name="component_name"
value={form.component_name}
onChange={handleChange}
placeholder="e.g. Semiconductor Chip A7"
style={inputStyle}
/>
</div>
<div>
<label style={labelStyle}>Origin</label>
<input
type="text"
name="origin"
value={form.origin}
onChange={handleChange}
placeholder="e.g. Taiwan"
style={inputStyle}
/>
</div>
<div>
<label style={labelStyle}>Destination</label>
<input
type="text"
name="destination"
value={form.destination}
onChange={handleChange}
placeholder="e.g. USA"
style={inputStyle}
/>
</div>
<div>
<label style={labelStyle}>Status</label>
<select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
<option>In Transit</option>
<option>Delivered</option>
<option>Delayed</option>
<option>Customs Hold</option>
</select>
</div>
</div>
<button
type="submit"
style={{ marginTop: '8px', padding: '12px 24px', background: 'linear-gradient(135deg, #0ea5e9 0%, #f97316 100%)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
>
Save Shipment
</button>
</form>
</div>

{/* Shipments List */}
<div style={{ background: '#1e293b', borderRadius: '8px', border: '1px solid #334155', padding: '24px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
<h2 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Saved Shipments ({shipments.length})</h2>
<button onClick={loadShipments} style={{ padding: '8px 16px', background: '#334155', color: '#e2e8f0', border: '1px solid #475569', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
↻ Refresh
</button>
</div>

{loading && <p style={{ color: '#94a3b8' }}>Loading...</p>}

{!loading && shipments.length === 0 && (
<p style={{ color: '#94a3b8', fontSize: '14px' }}>No shipments yet. Add one above.</p>
)}

{!loading && shipments.map((s) => (
<div key={s.id} style={{ borderTop: '1px solid #334155', padding: '16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', alignItems: 'center' }}>
<div>
<p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 2px 0' }}>Tracking</p>
<p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>{s.tracking_number}</p>
</div>
<div>
<p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 2px 0' }}>Component</p>
<p style={{ fontSize: '14px', margin: 0 }}>{s.component_name}</p>
</div>
<div>
<p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 2px 0' }}>Route</p>
<p style={{ fontSize: '14px', margin: 0 }}>{s.origin || '?'} → {s.destination || '?'}</p>
</div>
<div>
<p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 2px 0' }}>Status</p>
<p style={{ fontSize: '14px', margin: 0, color: '#f97316', fontWeight: '600' }}>{s.status}</p>
</div>
</div>
))}
</div>
</div>
</div>
);
}