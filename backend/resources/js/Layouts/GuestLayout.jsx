import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function GuestLayout({ children }) {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '/features' },
        { name: 'How it Works', href: '/how-it-works' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <div className="min-h-screen bg-[hsl(240,10%,6%)]">
            {/* Navigation */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong shadow-lg' : ''
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center space-x-2 group"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <span className="font-display font-bold text-xl text-white hidden sm:block">
                                ExpenseTracker
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`font-medium transition-colors ${url === link.href
                                            ? 'text-[hsl(262,83%,58%)]'
                                            : 'text-gray-300 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link
                                href="/login"
                                className="px-5 py-2.5 text-gray-300 hover:text-white font-medium transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="px-6 py-2.5 bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-lg font-semibold text-white hover-glow ripple-effect"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-white p-2"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {mobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden glass-strong border-t border-white/10">
                        <div className="px-4 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block px-4 py-2 rounded-lg transition-colors ${url === link.href
                                            ? 'bg-[hsl(262,83%,58%)] text-white'
                                            : 'text-gray-300 hover:bg-white/5'
                                        }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-3 space-y-2">
                                <Link
                                    href="/login"
                                    className="block w-full px-4 py-2.5 text-center text-gray-300 hover:bg-white/5 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="block w-full px-4 py-2.5 text-center bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-lg font-semibold text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="pt-16 md:pt-20">{children}</main>

            {/* Footer */}
            <footer className="bg-[hsl(240,9%,9%)] border-t border-white/10 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <span className="font-display font-bold text-xl text-white">
                                    ExpenseTracker
                                </span>
                            </div>
                            <p className="text-gray-400 max-w-md">
                                The modern way to track your expenses and manage your budget. Simple, powerful, and beautiful.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="font-semibold text-white mb-4">
                                Product
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/features"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/how-it-works"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        How it Works
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="font-semibold text-white mb-4">
                                Company
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
                        <p>
                            &copy; {new Date().getFullYear()}{' '}
                            ExpenseTracker. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
