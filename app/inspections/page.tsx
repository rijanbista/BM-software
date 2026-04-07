import { prisma } from '@/lib/prisma';
import { ClipboardCheck, ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';
import AddInspectionForm from '@/components/AddInspectionForm';
import './Inspections.css';

export const dynamic = 'force-dynamic';

export default async function InspectionsPage() {
  const inspections = await prisma.inspection.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-info">
          <h1>Facility Inspections</h1>
          <p>Log routine building inspections and condition reports.</p>
        </div>
        <AddInspectionForm />
      </div>

      <div className="inspections-grid">
        {inspections.length === 0 ? (
          <div className="glass-panel empty-state">
            <ClipboardCheck size={48} className="text-muted" />
            <h3>No inspections logged</h3>
            <p>Ready for a walk-around? Click "New Inspection".</p>
          </div>
        ) : (
          inspections.map((item: any) => {
            const isGood = item.condition === 'GOOD';
            const isFair = item.condition === 'FAIR';
            const isPoor = item.condition === 'POOR';

            return (
              <div key={item.id} className={`inspection-card glass-panel ${isGood ? 'good' : ''} ${isFair ? 'fair' : ''} ${isPoor ? 'poor' : ''}`}>
                <div className="card-top">
                  <div className="area-title">
                    <h4>{item.area}</h4>
                  </div>
                  <div className="condition-indicator">
                    {isGood ? (
                      <span className="condition-badge good"><ShieldCheck size={14}/> Good</span>
                    ) : isFair ? (
                      <span className="condition-badge fair"><AlertCircle size={14}/> Fair</span>
                    ) : (
                      <span className="condition-badge poor"><AlertTriangle size={14}/> Poor</span>
                    )}
                  </div>
                </div>
                <div className="card-body">
                  <p>{item.notes || 'No notes provided.'}</p>
                </div>
                <div className="card-footer">
                  <span className="inspector">By: {item.inspector}</span>
                  <span className="date">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
