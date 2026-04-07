import { prisma } from '@/lib/prisma';
import { Users, Search } from 'lucide-react';
import AddResidentForm from '@/components/AddResidentForm';
import './Residents.css';

// This is a Server Component, so we can fetch directly from Prisma
export default async function ResidentsPage() {
  const residents = await prisma.resident.findMany({
    orderBy: { unit: 'asc' },
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-info">
          <h1>Resident Directory</h1>
          <p>Manage and view all residents within the building.</p>
        </div>
        <AddResidentForm />
      </div>

      <div className="glass-panel table-panel">
        <div className="table-controls">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search by name, unit, or email..." className="search-input" />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Unit</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Added</th>
              </tr>
            </thead>
            <tbody>
              {residents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="empty-state">No residents found.</td>
                </tr>
              ) : (
                residents.map((resident: any) => (
                  <tr key={resident.id}>
                    <td><span className="unit-badge">{resident.unit}</span></td>
                    <td className="font-medium text-white">{resident.name}</td>
                    <td>{resident.email}</td>
                    <td>{resident.phone || '-'}</td>
                    <td>{new Date(resident.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
