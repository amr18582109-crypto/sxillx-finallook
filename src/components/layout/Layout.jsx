import React, { useEffect, useState } from 'react';
import Sidebar from '../shared/Sidebar';
import '../shared/Sidebar.css';

const STORAGE_KEY = 'sidebar-collapsed';

const Layout = ({ children, user, onLogout }) => {
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false }
  });

  useEffect(() => {
    const handler = (e) => setCollapsed(Boolean(e.detail?.collapsed));
    window.addEventListener('sidebarToggle', handler);
    return () => window.removeEventListener('sidebarToggle', handler);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar user={user} onLogout={onLogout} />
      <main className="main-content" data-sidebar-collapsed={collapsed}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
