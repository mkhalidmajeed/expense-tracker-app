import { Link } from '@inertiajs/react';

export default function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen bg-[hsl(240,10%,6%)] flex flex-col">
            {/* Top Navigation */}
            <nav className="p-4 md:p-6">
                <Link href="/" className="flex items-center space-x-2 group w-fit">
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
                    <span className="font-display font-bold text-xl text-white">
                        ExpenseTracker
                    </span>
                </Link>
            </nav>

            {/* Background Gradient Orbs */}
            <div className="fixed top-20 left-1/4 w-96 h-96 bg-[hsl(262,83%,58%)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-[hsl(189,94%,43%)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="glass-strong rounded-3xl p-8 md:p-10 shadow-2xl relative z-10">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">
                                <span className="gradient-text">{title}</span>
                            </h1>
                            {subtitle && (
                                <p className="text-gray-400">{subtitle}</p>
                            )}
                        </div>

                        {/* Form Content */}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
