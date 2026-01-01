import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function About() {
    const values = [
        {
            title: 'User-First Design',
            description: 'Every feature is designed with you in mind. We believe financial tools should be beautiful and intuitive.',
            emoji: '🎨',
        },
        {
            title: 'Privacy Matters',
            description: 'Your financial data belongs to you. We use bank-level encryption and never share your information.',
            emoji: '🔒',
        },
        {
            title: 'Continuous Innovation',
            description: 'We\'re constantly improving and adding new features based on your feedback and needs.',
            emoji: '🚀',
        },
    ];

    const team = [
        { role: 'Founded', year: '2024', description: 'Started with a vision to make expense tracking beautiful' },
        { role: 'Users', year: '10K+', description: 'People trust us with their financial tracking' },
        { role: 'Countries', year: '25+', description: 'Helping users worldwide manage their money' },
    ];

    return (
        <GuestLayout>
            <Head title="About Us" />

            {/* Hero */}
            <section className="relative overflow-hidden py-20 md:py-32">
                <div className="absolute top-20 right-1/4 w-96 h-96 bg-[hsl(262,83%,58%)] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display font-extrabold text-4xl md:text-6xl mb-6">
                        <span className="gradient-text">Our Mission</span>
                    </h1>
                    <p className="text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                        We're building the most beautiful and powerful expense tracker to help everyone take control of their financial future.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="py-20 bg-[hsl(240,9%,9%)]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass-strong rounded-3xl p-8 md:p-12">
                        <h2 className="font-display font-bold text-3xl gradient-text mb-6">Our Story</h2>
                        <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                            <p>
                                ExpenseTracker was born from a simple frustration: existing expense trackers were either too complicated or too ugly to use daily. We believed there had to be a better way.
                            </p>
                            <p>
                                We spent months talking to people about their financial tracking habits, their pain points, and their dreams. What we learned shaped everything we built.
                            </p>
                            <p>
                                Today, ExpenseTracker helps thousands of people understand where their money goes, make smarter financial decisions, and reach their goals faster - all while looking beautiful.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                            <span className="gradient-text">What We Believe</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, idx) => (
                            <div key={idx} className="glass-strong rounded-2xl p-8 hover-glow text-center">
                                <div className="text-6xl mb-6">{value.emoji}</div>
                                <h3 className="font-display font-bold text-xl text-white mb-4">
                                    {value.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-[hsl(240,9%,9%)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((stat, idx) => (
                            <div key={idx} className="glass-strong rounded-2xl p-8 text-center hover-glow">
                                <div className="text-sm font-semibold text-[hsl(262,83%,58%)] mb-2">
                                    {stat.role}
                                </div>
                                <div className="text-5xl font-display font-black gradient-text mb-4">
                                    {stat.year}
                                </div>
                                <p className="text-gray-400">{stat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
