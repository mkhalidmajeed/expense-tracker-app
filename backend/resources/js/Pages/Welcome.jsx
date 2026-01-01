import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome() {
    const features = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            title: 'Real-time Analytics',
            description: 'Track your spending patterns with beautiful, interactive charts and insights.',
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Smart Categorization',
            description: 'Automatically organize expenses with intelligent category suggestions.',
            gradient: 'from-cyan-500 to-blue-500',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: 'Budget Management',
            description: 'Set budgets and get alerts when you\'re approaching your limits.',
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Mobile Ready',
            description: 'Access your expenses anywhere with our responsive design and mobile app.',
            gradient: 'from-orange-500 to-red-500',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: 'Secure & Private',
            description: 'Your financial data is encrypted and stored securely with top-tier protection.',
            gradient: 'from-indigo-500 to-purple-500',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
            ),
            title: 'Export Reports',
            description: 'Generate detailed reports and export your data in multiple formats.',
            gradient: 'from-pink-500 to-rose-500',
        },
    ];

    const stats = [
        { number: '10K+', label: 'Active Users' },
        { number: '$2M+', label: 'Tracked Spending' },
        { number: '50K+', label: 'Expenses Logged' },
        { number: '4.9', label: 'User Rating' },
    ];

    return (
        <GuestLayout>
            <Head title="Welcome" />

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[hsl(262,83%,58%)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute top-20 right-1/4 w-96 h-96 bg-[hsl(189,94%,43%)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-40">
                    <div className="text-center page-enter">
                        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-7xl mb-6">
                            <span className="gradient-text">Track Expenses,</span>
                            <br />
                            <span className="text-white">Build Wealth</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                            The modern way to manage your money. Beautiful, powerful, and ridiculously easy to use.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/register"
                                className="px-8 py-4 bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-xl font-bold text-lg text-white hover-glow ripple-effect shadow-2xl"
                            >
                                Start Tracking for Free
                            </Link>
                            <Link
                                href="/how-it-works"
                                className="px-8 py-4 glass-strong rounded-xl font-semibold text-lg text-white hover-glow"
                            >
                                See How It Works
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
                            {stats.map((stat, index) => (
                                <div key={index} className="glass rounded-2xl p-6 hover-glow">
                                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-[hsl(240,9%,9%)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">
                            <span className="gradient-text">Everything You Need</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Powerful features designed to help you take control of your finances
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="glass-strong rounded-2xl p-8 hover-glow group cursor-pointer"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 smooth-transition`}>
                                    <div className="text-white">{feature.icon}</div>
                                </div>
                                <h3 className="font-display font-bold text-xl text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass-strong rounded-3xl p-8 md:p-16 text-center hover-glow">
                        <h2 className="font-display font-bold text-3xl md:text-5xl mb-6">
                            <span className="gradient-text">Ready to Get Started?</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of users who have already taken control of their finances with ExpenseTracker.
                        </p>
                        <Link
                            href="/register"
                            className="inline-block px-10 py-5 bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-xl font-bold text-xl text-white hover-glow ripple-effect shadow-2xl"
                        >
                            Create Free Account
                        </Link>
                        <p className="text-sm text-gray-400 mt-6">
                            No credit card required • Free forever • Cancel anytime
                        </p>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
