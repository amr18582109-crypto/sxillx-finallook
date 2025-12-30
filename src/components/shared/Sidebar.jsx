import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Home,
    Map,
    Briefcase,
    Users,
    MessageSquare,
    Trophy,
    User,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import './Sidebar.css';

const STORAGE_KEY = 'sidebar-collapsed';

const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: Home },
    { label: 'Roadmap', path: '/roadmap', icon: Map },
    { label: 'Jobs', path: '/jobs', icon: Briefcase },
    { label: 'Community', path: '/community', icon: Users },
    { label: 'Messages', path: '/messages', icon: MessageSquare, badgeKey: 'messages' },
    { label: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
];

const NavItem = ({ item, active, collapsed, onNavigate, unreadCount }) => {
    const Icon = item.icon;
    return (
        <li>
            <div
                role="link"
                tabIndex={0}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
                onKeyDown={(e) => { if (e.key === 'Enter') onNavigate(item.path); }}
                onClick={() => onNavigate(item.path)}
                className="nav-item"
                data-active={active}
            >
                <div style={{ position: 'relative' }}>
                    <Icon className="icon" aria-hidden />
                    {item.badgeKey === 'messages' && unreadCount > 0 && (
                        <span className="badge-unread" aria-hidden>{unreadCount}</span>
                    )}
                </div>
                <span className="nav-label">{item.label}</span>
            </div>
        </li>
    );
};

const Sidebar = ({ user = {}, onLogout = () => { }, className = '' }) => {
    const [collapsed, setCollapsed] = useState(() => {
        try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false }
    });
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const sidebarRef = useRef(null);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, collapsed ? 'true' : 'false');
        // notify other parts of app about collapse state
        window.dispatchEvent(new CustomEvent('sidebarToggle', { detail: { collapsed } }));
    }, [collapsed]);

    useEffect(() => {
        const handler = () => setMobileOpen((s) => !s);
        window.addEventListener('toggleSidebar', handler);
        return () => window.removeEventListener('toggleSidebar', handler);
    }, []);

    // close on outside click (mobile)
    useEffect(() => {
        const onClick = (e) => {
            if (!mobileOpen) return;
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) setMobileOpen(false);
        };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, [mobileOpen]);

    const toggleCollapse = () => setCollapsed((c) => !c);

    const handleNavigate = (path) => {
        navigate(path);
        setMobileOpen(false);
    };

    const unreadMessages = user.unreadMessages || 0;

    return (
        <>
            {mobileOpen && <div className="sidebar-backdrop" aria-hidden onClick={() => setMobileOpen(false)} />}

            <aside
                ref={sidebarRef}
                className={`sidebar ${className} ${mobileOpen ? 'sidebar--mobile' : ''}`}
                data-collapsed={collapsed}
                data-mobile-open={mobileOpen}
                aria-label="Primary navigation"
            >
                <div style={{ position: 'relative' }}>
                    <div className="sidebar__header">
                        <div className="sidebar__profile">
                            <div className="profile-pic" aria-hidden>
                                <img src={user.profilePicture || '/default-avatar.png'} alt={`${user.name || 'User'} avatar`} />
                            </div>
                            <div className="profile-meta">
                                <div className="profile-name">{user.name || 'Guest'}</div>
                                <div className="profile-role">{user.type ? user.type.charAt(0).toUpperCase() + user.type.slice(1) : 'Student'}</div>
                            </div>
                        </div>
                    </div>

                    <button
                        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        title={collapsed ? 'Expand' : 'Collapse'}
                        onClick={toggleCollapse}
                        className="collapse-btn"
                        type="button"
                    >
                        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>

                <nav className="sidebar-nav" aria-label="Main navigation">
                    <ul>
                        {menuItems.map((it) => (
                            <NavItem
                                key={it.path}
                                item={it}
                                active={location.pathname === it.path || location.pathname.startsWith(it.path)}
                                collapsed={collapsed}
                                unreadCount={it.badgeKey === 'messages' ? unreadMessages : 0}
                                onNavigate={handleNavigate}
                            />
                        ))}
                    </ul>
                </nav>

                <div className="sidebar__footer">
                    <div className="logout">
                        <div
                            role="button"
                            tabIndex={0}
                            aria-label="Logout"
                            onKeyDown={(e) => { if (e.key === 'Enter') onLogout(); }}
                            onClick={onLogout}
                            className="nav-item"
                        >
                            <LogOut className="icon" />
                            <span className="nav-label">Logout</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
