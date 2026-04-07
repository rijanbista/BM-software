'use client';

import { useState } from 'react';
import { addResident } from '@/app/actions';
import { Plus, X } from 'lucide-react';
import './Forms.css';

export default function AddResidentForm() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button className="btn-primary flex-btn" onClick={() => setIsOpen(true)}>
        <Plus size={18} /> Add Resident
      </button>
    );
  }

  return (
    <div className="form-overlay">
      <div className="glass-panel form-panel">
        <div className="form-header">
          <h2>Add New Resident</h2>
          <button className="close-btn" onClick={() => setIsOpen(false)}><X size={20} /></button>
        </div>
        <form action={async (formData) => {
          await addResident(formData);
          setIsOpen(false);
        }} className="data-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" required placeholder="John Doe" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Unit/Apartment</label>
              <input type="text" name="unit" required placeholder="Ex: 501" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" name="phone" placeholder="Optional" />
            </div>
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" required placeholder="john@example.com" />
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setIsOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Save Resident</button>
          </div>
        </form>
      </div>
    </div>
  );
}
