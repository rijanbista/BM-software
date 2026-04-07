'use client';

import { useActionState, useState } from 'react';
import { login } from '@/app/actions';
import { Building2 } from 'lucide-react';
import './Login.css';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError('');
    
    // Call server action directly since we don't need complex useFormState here for simple error handling
    const result = await login(formData);
    
    if (result && result.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-background"></div>
      
      <div className="login-panel glass-panel">
        <div className="login-header">
          <div className="login-logo">
             <div className="logo-shape">
                <Building2 size={24} color="white" />
             </div>
             <h2>NPbos</h2>
          </div>
          <p>Login to your operator dashboard</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form action={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              placeholder="admin@npbos.com"
              defaultValue="admin@npbos.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              placeholder="••••••••"
              defaultValue="password123"
            />
          </div>

          <button type="submit" className="btn-primary login-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Secure Building Operations Management</p>
        </div>
      </div>
    </div>
  );
}
