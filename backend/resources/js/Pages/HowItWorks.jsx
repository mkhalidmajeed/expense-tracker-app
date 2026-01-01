import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function HowItWorks() {
    const steps = [
        {
            number: '01',
            title: 'Create Your Account',
            description: 'Sign up in seconds with just your email. No credit card required, completely free to start.',
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            ),
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            number: '02',
            title: 'Add Your Expenses',
            description: 'Log expenses as they happen with our quick and easy input system. Add amounts, categories, and notes in seconds.',
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            ),
            gradient: 'from-cyan-500 to-blue-500',
        },
        {
            number: '03',
            title: 'Track Your Spending',
            description: 'Watch your expenses flow into beautiful charts and insights. See where your money goes in real-time.',
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            number: '04',
            title: 'Make Smart Decisions',
            description: 'Use insights from your spending patterns to make better financial decisions and reach your goals faster.',
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            gradient: 'from-orange-500 to-red-500',
        },
    ];

    return (
        <GuestLayout>
            <Head title="How it Works" />

            {/* Hero */}
            <section className="relative overflow-hidden py-20 md:py-32">
                <div className="absolute top-10 left-1/3 w-96 h-96 bg-[hsl(189,94%,43%)] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display font-extrabold text-4xl md:text-6xl mb-6">
                        <span className="text-white">Getting Started is</span>
                        <br />
                        <span className="gradient-text">Simple & Easy</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Four simple steps to take complete control of your finances
                    </p>
                </div>
            </section>

            {/* Steps */}
            <section className="pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12">
                        {steps.map((step, idx) => (
                            <div
                                key={idx}
                                className="glass-strong rounded-3xl p-8 md:p-12 hover-glow"
                            >
                                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                                    {/* Step Number */}
                                    <div className="relative">
                                        <div className="text-7xl font-display font-black text-white/5">
                                            {step.number}
                                        </div>
                                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-white shadow-2xl`}>
                                            {step.icon}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
                                            {step.title}
                                        </h3>
                                        <p className="text-lg text-gray-300 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass-strong rounded-3xl p-8 md:p-16 text-center hover-glow">
                        <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
                            <span className="gradient-text">See It in Action</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Ready to transform the way you manage money?
                        </p>
                        <Link
                            href="/register"
                            className="inline-block px-10 py-5 bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-xl font-bold text-xl text-white hover-glow ripple-effect shadow-2xl"
                        >
                            Get Started Free
                        </Link>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
