'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Briefcase, Wrench, LogOut, ClipboardCheck, Building2, ChevronDown } from 'lucide-react';
import { logout } from '@/app/actions';
import './Sidebar.css';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Residents', href: '/residents', icon: Users },
  { name: 'Cases', href: '/cases', icon: Briefcase },
  { name: 'Maintenance', href: '/maintenance', icon: Wrench },
  { name: 'Inspections', href: '/inspections', icon: ClipboardCheck },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <button 
        className="mobile-menu-btn"  
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle Menu"
      >
        <div className="hamburger"></div>
      </button>

      {isMobileOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-box">
            <div className="logo-shape"></div>
            <h2>NPbos</h2>
          </div>
        </div>
        
        {/* Building Switcher */}
        <div className="building-switcher">
          <div className="building-switcher-inner">
            <Building2 size={16} className="building-icon" />
            <div className="building-info">
              <span className="building-label">Current Property</span>
              <span className="building-name">The Grand Horizon</span>
            </div>
            <ChevronDown size={14} className="chevron-icon" />
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <item.icon className="nav-icon" size={20} />
                    <span>{item.name}</span>
                    {isActive && <div className="active-indicator" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile mb-auto">
            <div className="avatar">AD</div>
            <div className="user-info">
              <span className="name">System Admin</span>
              <span className="role">SUPERADMIN</span>
            </div>
          </div>
          
          <form action={logout} style={{ width: '100%', marginTop: '0.75rem' }}>
            <button type="submit" className="nav-link sign-out-btn" style={{ background: 'transparent', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left', color: '#ef4444' }}>
              <LogOut size={18} /> Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
