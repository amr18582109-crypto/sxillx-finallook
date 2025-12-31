import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bell, Settings, User, Menu, X } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useT } from '../../context/LanguageContext';
import Button from './Button';
import Notifications from './Notifications';

type NavItem = { name: string; href: string };

const Navbar: React.FC = () => {
    const { user, logout, isAuthenticated } = useUser();
    const { t } = useT();
    const navigate = useNavigate();
    const location = useLocation();
    const [showNotifications, setShowNotifications] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems: NavItem[] = [
        { name: t('dashboard'), href: '/dashboard' },
        { name: t('roadmap'), href: '/roadmap' },
        { name: t('jobs'), href: '/jobs' },
        { name: t('community'), href: '/community' },
        { name: t('messages'), href: '/messages' },
        { name: t('leaderboard'), href: '/leaderboard' },
    ];

    const isActive = (path: string) => {
        if (!path) return false;
        const current = location.pathname;
        return current === path || current.startsWith(path + '/') || current.startsWith(path);
    };

    const handleNavigate = (href: string) => {
        navigate(href);
        setIsMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-primary">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <Link to="/" className="text-2xl font-bold gradient-text">SkillX</Link>
                    </div>

                    {/* Layout: left logo, center nav, right icons */}
                    <div className="flex items-center w-full">
                        {/* center nav */}
                        <div className="hidden md:flex flex-1 justify-center items-center gap-6">
                            {isAuthenticated ? (
                                user.type === 'student' ? (
                                    navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            to={item.href}
                                            aria-current={isActive(item.href) ? 'page' : undefined}
                                            className={`nav-link px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                                                isActive(item.href) 
                                                    ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-semibold shadow-sm border border-primary/20' 
                                                    : 'text-gray-600 hover:text-primary hover:bg-primary/5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2'
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    ))
                                ) : (
                                    <>
                                        <Link 
                                            to="/company/dashboard" 
                                            className={`nav-link px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                                                isActive('/company/dashboard') 
                                                    ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-semibold shadow-sm border border-primary/20' 
                                                    : 'text-gray-600 hover:text-primary hover:bg-primary/5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2'
                                            }`}
                                        >
                                            {t('dashboard')}
                                        </Link>
                                        <Link 
                                            to="/company/post-job" 
                                            className={`nav-link px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                                                isActive('/company/post-job') 
                                                    ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-semibold shadow-sm border border-primary/20' 
                                                    : 'text-gray-600 hover:text-primary hover:bg-primary/5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2'
                                            }`}
                                        >
                                            {t('postJob')}
                                        </Link>
                                        <Link 
                                            to="/company/inbox" 
                                            className={`nav-link px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                                                isActive('/company/inbox') 
                                                    ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-semibold shadow-sm border border-primary/20' 
                                                    : 'text-gray-600 hover:text-primary hover:bg-primary/5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2'
                                            }`}
                                        >
                                            Applications
                                        </Link>
                                    </>
                                )
                            ) : (
                                <>
                                    <Link 
                                        to="/jobs" 
                                        className="nav-link px-4 py-2 rounded-lg transition-all duration-300 font-medium text-gray-600 hover:text-primary hover:bg-primary/5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                                    >
                                        {t('searchJobs')}
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* right icons */}
                        <div className="flex items-center gap-3 ml-auto">
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/profile"
                                        aria-current={isActive('/profile') ? 'page' : undefined}
                                        className={`nav-link p-2 rounded-xl transition-colors duration-300 group`}
                                    >
                                        <User className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
                                    </Link>
                                    <Link
                                        to="/settings"
                                        aria-current={isActive('/settings') ? 'page' : undefined}
                                        className={`nav-link p-2 rounded-xl transition-colors duration-300 group`}
                                    >
                                        <Settings className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
                                    </Link>
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowNotifications((s) => !s)}
                                            className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-300 group"
                                            aria-label="Notifications"
                                        >
                                            <Bell className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
                                            {user?.notifications && user.notifications.length > 0 && (
                                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{user.notifications.length}</span>
                                            )}
                                        </button>
                                        {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}
                                    </div>
                                </>
                            ) : (
                                <div className="hidden md:flex items-center gap-2">
                                    <Button onClick={() => navigate('/?login=true&postJob=true')} variant="primary">{t('postJob')}</Button>
                                    <Button onClick={() => navigate('/?login=true')} variant="outline">{t('login')}</Button>
                                </div>
                            )}

                            {/* mobile menu toggle */}
                            <div className="md:hidden">
                                <button className="p-2 rounded-xl hover:bg-gray-100" onClick={() => setIsMenuOpen((s) => !s)} aria-label="Toggle menu">
                                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>

                        {isMenuOpen && (
                                <div className="md:hidden w-full py-4 border-t border-gray-200 animate-fade-in">
                                    <div className="flex flex-col gap-2">
                                        {isAuthenticated ? (
                                            user.type === 'student' ? (
                                                navItems.map((item) => (
                                                    <button
                                                        key={item.href}
                                                        onClick={() => handleNavigate(item.href)}
                                                        className={`text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                                                            isActive(item.href) 
                                                                ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-semibold shadow-sm border border-primary/20' 
                                                                : 'text-gray-600 hover:text-primary hover:bg-primary/5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2'
                                                        }`}
                                                    >
                                                        {item.name}
                                                    </button>
                                                ))
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => handleNavigate('/company/dashboard')}
                                                        className={`text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                                                            isActive('/company/dashboard') 
                                                                ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-semibold shadow-sm border border-primary/20' 
                                                                : 'text-gray-600 hover:text-primary hover:bg-primary/5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2'
                                                        }`}
                                                    >
                                                        {t('dashboard')}
                                                    </button>
                                                    <button
                                                        onClick={() => handleNavigate('/company/post-job')}
                                                        className={`text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                                                            isActive('/company/post-job') 
                                                                ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-semibold shadow-sm border border-primary/20' 
                                                                : 'text-gray-600 hover:text-primary hover:bg-primary/5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2'
                                                        }`}
                                                    >
                                                        {t('postJob')}
                                                    </button>
                                                    <button
                                                        onClick={() => handleNavigate('/company/inbox')}
                                                        className={`text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                                                            isActive('/company/inbox') 
                                                                ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-semibold shadow-sm border border-primary/20' 
                                                                : 'text-gray-600 hover:text-primary hover:bg-primary/5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2'
                                                        }`}
                                                    >
                                                        Applications
                                                    </button>
                                                </>
                                            )
                                        ) : (
                                            <button
                                                onClick={() => handleNavigate('/jobs')}
                                                className="text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium text-gray-600 hover:text-primary hover:bg-primary/5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                                            >
                                                {t('searchJobs')}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
