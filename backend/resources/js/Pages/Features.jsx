import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Features() {
    const featuresList = [
        {
            category: 'Analytics & Insights',
            items: [
                {
                    name: 'Visual Dashboard',
                    description: 'See your financial health at a glance with beautiful charts and graphs',
                    icon: '📊',
                },
                {
                    name: 'Spending Trends',
                    description: 'Track how your spending changes over time with detailed trend analysis',
                    icon: '📈',
                },
                {
                    name: 'Category Breakdown',
                    description: 'Understand where your money goes with detailed category insights',
                    icon: '🎯',
                },
            ],
        },
        {
            category: 'Expense Management',
            items: [
                {
                    name: 'Quick Entry',
                    description: 'Add expenses in seconds with our streamlined input system',
                    icon: '⚡',
                },
                {
                    name: 'Custom Categories',
                    description: 'Create and manage categories that match your lifestyle',
                    icon: '🏷️',
                },
                {
                    name: 'Bulk Operations',
                    description: 'Edit, delete, or categorize multiple expenses at once',
                    icon: '⚙️',
                },
            ],
        },
        {
            category: 'Budget & Planning',
            items: [
                {
                    name: 'Smart Budgets',
                    description: 'Set monthly budgets and track your progress in real-time',
                    icon: '💰',
                },
                {
                    name: 'Alerts & Notifications',
                    description: 'Get notified when you\'re approaching your spending limits',
                    icon: '🔔',
                },
                {
                    name: 'Savings Goals',
                    description: 'Set financial goals and track your progress automatically',
                    icon: '🎯',
                },
            ],
        },
        {
            category: 'Data & Security',
            items: [
                {
                    name: 'Bank-level Encryption',
                    description: 'Your data is protected with industry-standard 256-bit encryption',
                    icon: '🔒',
                },
                {
                    name: 'Automatic Backups',
                    description: 'Never lose your data with automatic cloud backups',
                    icon: '☁️',
                },
                {
                    name: 'Export Anywhere',
                    description: 'Export your data in CSV, PDF, or Excel format anytime',
                    icon: '📥',
                },
            ],
        },
    ];

    return (
        <GuestLayout>
            <Head title="Features" />

            {/* Hero */}
            <section className="relative overflow-hidden py-20 md:py-32">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(262,83%,58%)] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display font-extrabold text-4xl md:text-6xl mb-6">
                        <span className="gradient-text">Powerful Features</span>
                        <br />
                        <span className="text-white">for Modern Finance</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Everything you need to manage your money effectively, all in one beautiful platform
                    </p>
                </div>
            </section>

            {/* Features List */}
            <section className="pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-20">
                        {featuresList.map((category, idx) => (
                            <div key={idx}>
                                <h2 className="font-display font-bold text-3xl mb-8">
                                    <span className="gradient-text">{category.category}</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {category.items.map((item, itemIdx) => (
                                        <div
                                            key={itemIdx}
                                            className="glass-strong rounded-2xl p-8 hover-glow group"
                                        >
                                            <div className="text-5xl mb-4 group-hover:scale-110 smooth-transition inline-block">
                                                {item.icon}
                                            </div>
                                            <h3 className="font-display font-bold text-xl text-white mb-3">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
