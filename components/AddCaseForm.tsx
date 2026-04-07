'use client';

import { useState } from 'react';
import { addCase } from '@/app/actions';
import { Plus, X } from 'lucide-react';
import './Forms.css';

export default function AddCaseForm({ residents }: { residents: { id: string, name: string, unit: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button className="btn-primary flex-btn" onClick={() => setIsOpen(true)}>
        <Plus size={18} /> New Case
      </button>
    );
  }

  return (
    <div className="form-overlay">
      <div className="glass-panel form-panel">
        <div className="form-header">
          <h2>Create New Case</h2>
          <button className="close-btn" onClick={() => setIsOpen(false)}><X size={20} /></button>
        </div>
        <form action={async (formData) => {
          await addCase(formData);
          setIsOpen(false);
        }} className="data-form">
          <div className="form-group">
            <label>Case Title</label>
            <input type="text" name="title" required placeholder="Ex: A/C unit not working" />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select name="priority" required>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            <div className="form-group">
              <label>Link Resident (Optional)</label>
              <select name="residentId">
                <option value="">General Building Issue</option>
                {residents.map((r) => (
                  <option key={r.id} value={r.id}>{r.unit} - {r.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" required placeholder="Describe the issue in detail..."></textarea>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setIsOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Create Case</button>
          </div>
        </form>
      </div>
    </div>
  );
}
