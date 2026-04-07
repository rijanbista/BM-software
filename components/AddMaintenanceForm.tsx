'use client';

import { useState } from 'react';
import { addMaintenance } from '@/app/actions';
import { Plus, X, Calendar as CalendarIcon } from 'lucide-react';
import './Forms.css'; // Reuse form CSS

export default function AddMaintenanceForm() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button className="btn-primary flex-btn" onClick={() => setIsOpen(true)}>
        <CalendarIcon size={18} /> New Schedule
      </button>
    );
  }

  return (
    <div className="form-overlay">
      <div className="glass-panel form-panel">
        <div className="form-header">
          <h2>Add Maintenance Event</h2>
          <button className="close-btn" onClick={() => setIsOpen(false)}><X size={20} /></button>
        </div>
        <form action={async (formData) => {
          await addMaintenance(formData);
          setIsOpen(false);
        }} className="data-form">
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" required placeholder="Ex: Quarterly Pool Cleaning" />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Scheduled Date</label>
              <input type="date" name="scheduledDate" required />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" required placeholder="Details about this maintenance..."></textarea>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setIsOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Schedule Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}
