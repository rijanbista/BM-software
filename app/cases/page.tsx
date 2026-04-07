import { prisma } from '@/lib/prisma';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import AddCaseForm from '@/components/AddCaseForm';
import './Cases.css';

export default async function CasesPage() {
  const cases = await prisma.case.findMany({
    orderBy: { createdAt: 'desc' },
    include: { resident: true }
  });

  const residents = await prisma.resident.findMany({
    select: { id: true, name: true, unit: true },
    orderBy: { unit: 'asc' }
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-info">
          <h1>Case Management</h1>
          <p>Track maintenance requests and building issues.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="/api/export/cases" className="ghost-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export CSV
          </a>
          <AddCaseForm residents={residents} />
        </div>
      </div>

      <div className="kanban-board">
        {/* OPEN Column */}
        <div className="kanban-col">
          <div className="col-header">
            <h3><AlertCircle size={18} className="text-warning" /> Open</h3>
            <span className="count-badge">{cases.filter((c: any) => c.status === 'OPEN').length}</span>
          </div>
          <div className="col-cards">
            {cases.filter((c: any) => c.status === 'OPEN').map((c: any) => (
              <div key={c.id} className="case-card glass-panel">
                <div className="card-top">
                  <span className={`priority-badge ${c.priority.toLowerCase()}`}>{c.priority}</span>
                  <span className="time">{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
                <h4>{c.title}</h4>
                <p>{c.description}</p>
                <div className="card-footer">
                  <span className="resident-name">{c.resident?.name || 'General Building'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IN PROGRESS Column */}
        <div className="kanban-col">
          <div className="col-header">
            <h3><Clock size={18} className="text-info" /> In Progress</h3>
            <span className="count-badge">{cases.filter((c: any) => c.status === 'IN_PROGRESS').length}</span>
          </div>
          <div className="col-cards">
            {cases.filter((c: any) => c.status === 'IN_PROGRESS').map((c: any) => (
              <div key={c.id} className="case-card glass-panel">
                <div className="card-top">
                  <span className={`priority-badge ${c.priority.toLowerCase()}`}>{c.priority}</span>
                  <span className="time">{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
                <h4>{c.title}</h4>
                <p>{c.description}</p>
                <div className="card-footer">
                  <span className="resident-name">{c.resident?.name || 'General Building'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RESOLVED Column */}
        <div className="kanban-col">
          <div className="col-header">
            <h3><CheckCircle size={18} className="text-success" /> Resolved</h3>
            <span className="count-badge">{cases.filter((c: any) => c.status === 'RESOLVED').length}</span>
          </div>
          <div className="col-cards">
            {cases.filter((c: any) => c.status === 'RESOLVED').map((c: any) => (
              <div key={c.id} className="case-card glass-panel resolved-card">
                <div className="card-top">
                  <span className={`priority-badge ${c.priority.toLowerCase()}`}>{c.priority}</span>
                  <span className="time">{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
                <h4>{c.title}</h4>
                <p>{c.description}</p>
                <div className="card-footer">
                  <span className="resident-name">{c.resident?.name || 'General Building'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
