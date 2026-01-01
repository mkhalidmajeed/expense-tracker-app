import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ children, user, title }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { url } = usePage();

    const handleLogout = () => {
        router.post('/logout');
    };

    const navLinks = [
        { name: 'Dashboard', href: '/dashboard', icon: '📊' },
        { name: 'Expenses', href: '/expenses', icon: '💸' },
        { name: 'Categories', href: '/categories', icon: '🏷️' },
        { name: 'Reports', href: '/reports', icon: '📈' },
        { name: 'Settings', href: '/profile', icon: '⚙️' },
    ];

    return (
        <div className="min-h-screen bg-[hsl(240,10%,6%)] flex">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-64 glass-strong border-r border-white/10 fixed h-full z-20">
                <div className="p-6">
                    <Link href="/dashboard" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="font-display font-bold text-xl text-white">ExpenseTracker</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${url.startsWith(link.href)
                                    ? 'bg-[hsl(262,83%,58%)]/20 text-[hsl(262,83%,58%)] font-semibold border border-[hsl(262,83%,58%)]/30'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <span className="text-xl">{link.icon}</span>
                            <span>{link.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center space-x-3 px-4 py-3 text-gray-400">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                            <p className="text-xs truncate">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 glass-strong border-b border-white/10 z-30 flex items-center justify-between px-4">
                <Link href="/dashboard" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <span className="font-display font-bold text-lg text-white">ExpenseTracker</span>
                </Link>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-gray-300 hover:text-white p-2"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-20 bg-[hsl(240,10%,6%)] pt-16">
                    <nav className="p-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${url.startsWith(link.href)
                                        ? 'bg-[hsl(262,83%,58%)]/20 text-[hsl(262,83%,58%)] font-semibold border border-[hsl(262,83%,58%)]/30'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="text-xl">{link.icon}</span>
                                <span>{link.name}</span>
                            </Link>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors mt-6"
                        >
                            <span className="text-xl">🚪</span>
                            <span>Logout</span>
                        </button>
                    </nav>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen">
                <header className="hidden md:flex items-center justify-between h-20 px-8 border-b border-white/5">
                    <h1 className="text-2xl font-bold text-white font-display">{title}</h1>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Log Out
                        </button>
                    </div>
                </header>

                <div className="p-4 md:p-8">
                    {/* Mobile Title */}
                    <div className="md:hidden mb-6">
                        <h1 className="text-2xl font-bold text-white font-display">{title}</h1>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
}
