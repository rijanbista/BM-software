import { prisma } from '@/lib/prisma';
import { Calendar, Wrench, CheckCircle, Clock } from 'lucide-react';
import AddMaintenanceForm from '../../components/AddMaintenanceForm';
import './Maintenance.css';

export default async function MaintenancePage() {
  const schedules = await prisma.maintenanceSchedule.findMany({
    orderBy: { scheduledDate: 'asc' },
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-info">
          <h1>Maintenance Schedule</h1>
          <p>Global building maintenance and recurring services.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="/api/export/maintenance" className="ghost-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export CSV
          </a>
          <AddMaintenanceForm />
        </div>
      </div>

      <div className="maintenance-grid">
        {schedules.length === 0 ? (
          <div className="glass-panel empty-state">
            <Calendar size={48} className="text-muted" />
            <h3>No upcoming maintenance</h3>
            <p>Your schedule is clear. Click "New Schedule" to add events.</p>
          </div>
        ) : (
          schedules.map((item: any) => {
            const isCompleted = item.status === 'COMPLETED';
            const date = new Date(item.scheduledDate);
            const isPast = date < new Date() && !isCompleted;
            
            return (
              <div key={item.id} className={`maintenance-card glass-panel ${isCompleted ? 'completed' : ''} ${isPast ? 'overdue' : ''}`}>
                <div className="card-top">
                  <div className="date-block">
                    <span className="month">{date.toLocaleString('default', { month: 'short' })}</span>
                    <span className="day">{date.getDate()}</span>
                  </div>
                  <div className="status-indicator">
                    {isCompleted ? (
                      <span className="status-badge resolved"><CheckCircle size={14}/> Completed</span>
                    ) : isPast ? (
                      <span className="status-badge open">Overdue</span>
                    ) : (
                      <span className="status-badge"><Clock size={14}/> Upcoming</span>
                    )}
                  </div>
                </div>
                <div className="card-body">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
                <div className="card-footer">
                   <span className="assignee"><Wrench size={14}/> {item.assignedTo || 'Unassigned'}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
