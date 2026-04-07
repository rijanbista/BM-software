'use client';

import { useState } from 'react';
import { addInspection } from '@/app/actions';
import { Plus } from 'lucide-react';
import './Forms.css';

export default function AddInspectionForm() {
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    await addInspection(formData);
    setIsOpen(false);
  }

  return (
    <>
      <button className="primary-btn" onClick={() => setIsOpen(true)}>
        <Plus size={18} /> New Inspection
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel form-modal">
            <div className="modal-header">
              <h3>Log New Inspection</h3>
              <button className="close-btn" onClick={() => setIsOpen(false)}>&times;</button>
            </div>
            <form action={handleSubmit} className="standard-form">
              <div className="form-group">
                <label>Area / Location</label>
                <input type="text" name="area" required placeholder="e.g. Gym, Roof, Lobby" />
              </div>

              <div className="form-group">
                <label>Condition</label>
                <select name="condition" required>
                  <option value="GOOD">Good (No action needed)</option>
                  <option value="FAIR">Fair (Monitor)</option>
                  <option value="POOR">Poor (Maintenance required)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Notes (Optional)</label>
                <textarea name="notes" rows={3} placeholder="Any specific findings..."></textarea>
              </div>

              <div className="form-actions">
                <button type="button" className="ghost-btn" onClick={() => setIsOpen(false)}>Cancel</button>
                <button type="submit" className="primary-btn">Save Log</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
