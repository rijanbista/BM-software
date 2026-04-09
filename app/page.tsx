'use client';

import { Users, Briefcase, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="page-container dashboard-layout">
      {/* Hero Section with travel-website vibe */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1>Welcome to NPbos</h1>
          <p>Streamlined building operations, intuitively managed.</p>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          {/* Card 1 */}
          <Link href="/residents" className="stat-card glass-panel group">
            <div className="stat-icon-wrapper blue">
              <Users size={24} />
            </div>
            <div className="stat-info">
              <h3>240</h3>
              <p>Total Residents</p>
            </div>
            <ArrowRight className="card-arrow" size={20} />
          </Link>

          {/* Card 2 */}
          <Link href="/cases" className="stat-card glass-panel group">
            <div className="stat-icon-wrapper teal">
              <Briefcase size={24} />
            </div>
            <div className="stat-info">
              <h3>12</h3>
              <p>Active Cases</p>
            </div>
            <ArrowRight className="card-arrow" size={20} />
          </Link>

          {/* Card 3 */}
          <Link href="/shift-log" className="stat-card glass-panel group">
            <div className="stat-icon-wrapper purple">
              <Clock size={24} />
            </div>
            <div className="stat-info">
              <h3>2</h3>
              <p>Logs Today</p>
            </div>
            <ArrowRight className="card-arrow" size={20} />
          </Link>

          {/* Card 4 */}
          <div className="stat-card glass-panel group">
            <div className="stat-icon-wrapper green">
              <ShieldCheck size={24} />
            </div>
            <div className="stat-info">
              <h3>Secure</h3>
              <p>System Status</p>
            </div>
          </div>
        </div>
      </section>

      <section className="recent-activity-section">
        <div className="glass-panel activity-panel">
          <div className="panel-header">
            <h2>Recent Activity</h2>
            <Link href="/cases" className="btn-primary">View All Cases</Link>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon warning"><Briefcase size={16} /></div>
              <div className="activity-details">
                <h4>Leaky Faucet in Unit 101</h4>
                <p>Reported by John Doe 2 hrs ago</p>
              </div>
              <span className="status-badge open">Open</span>
            </div>
            <div className="activity-item">
              <div className="activity-icon"><Clock size={16} /></div>
              <div className="activity-details">
                <h4>Jane Smith started shifted</h4>
                <p>Day Shift - 3 hrs ago</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
