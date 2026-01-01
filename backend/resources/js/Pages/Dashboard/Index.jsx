import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ auth, stats, recentExpenses, chartData }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: auth.user.currency || 'USD',
        }).format(amount);
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Dashboard">
            <Head title="Dashboard" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Balance / Spending */}
                <div className="glass-strong rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-24 h-24 text-[hsl(262,83%,58%)]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.15-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.63-.34-1.34-2.56-1.77-2.96-.5-4.02-1.55-4.02-3.46 0-2.01 1.66-3.11 3.29-3.4V4.05h2.66v1.9c1.65.36 2.89 1.43 2.97 3.24h-1.96c-.1-1.12-.9-1.58-2.65-1.58-1.97 0-2.28 1.03-2.28 1.52 0 .61.32 1.29 2.51 1.73 3 .6 4.07 1.65 4.07 3.49 0 2-1.6 3.14-3.5 3.51z" />
                        </svg>
                    </div>
                    <h3 className="text-gray-400 font-medium mb-2">Total Expense (Month)</h3>
                    <div className="flex items-end gap-2 text-white">
                        <span className="text-3xl font-display font-bold">{formatCurrency(stats.currentMonthTotal)}</span>
                    </div>
                    <div className="mt-2 text-sm">
                        {stats.percentageChange > 0 ? (
                            <span className="text-red-400">+{stats.percentageChange}% from last month</span>
                        ) : (
                            <span className="text-green-400">{stats.percentageChange}% from last month</span>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass rounded-2xl p-6 flex flex-col justify-center gap-3">
                    <h3 className="text-gray-400 font-medium mb-2">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            href="/expenses/create"
                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-[hsl(262,83%,58%)]/20 hover:border-[hsl(262,83%,58%)] border border-white/10 transition-all group"
                        >
                            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">➕</span>
                            <span className="text-xs font-medium text-gray-300 group-hover:text-white">Add Expense</span>
                        </Link>
                        <Link
                            href="/categories"
                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-[hsl(189,94%,43%)]/20 hover:border-[hsl(189,94%,43%)] border border-white/10 transition-all group"
                        >
                            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🏷️</span>
                            <span className="text-xs font-medium text-gray-300 group-hover:text-white">Categories</span>
                        </Link>
                    </div>
                </div>

                {/* Budget Status (Placeholder) */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-gray-400 font-medium mb-4">Monthly Budget</h3>
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[hsl(262,83%,58%)] bg-[hsl(262,83%,58%)]/20">
                                    In Progress
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-semibold inline-block text-gray-300">
                                    60%
                                </span>
                            </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white/10">
                            <div style={{ width: "60%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)]"></div>
                        </div>
                        <p className="text-xs text-gray-400">You have spent 60% of your montly budget.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Transactions */}
                <div className="lg:col-span-2 glass-strong rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-white">Recent Transactions</h2>
                        <Link href="/expenses" className="text-sm text-[hsl(262,83%,58%)] hover:text-white transition-colors">
                            View All
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {recentExpenses.length > 0 ? (
                            recentExpenses.map((expense) => (
                                <div key={expense.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center space-x-4">
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                                            style={{ backgroundColor: `${expense.category_color}20`, color: expense.category_color }}
                                        >
                                            {/* We'll assume icon name maps to emoji for now, or handle icons properly later */}
                                            🧾
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium group-hover:text-[hsl(262,83%,58%)] transition-colors">{expense.title}</h4>
                                            <p className="text-xs text-gray-400">{expense.category_name} • {expense.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-bold">{formatCurrency(expense.amount)}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-500">
                                No expenses recorded yet.
                            </div>
                        )}
                    </div>
                </div>

                {/* Monthly Spending Trend (Simple Bar Chart Visualization) */}
                <div className="glass rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Spending Trend</h2>
                    <div className="flex items-end justify-between h-48 space-x-2">
                        {chartData.map((data, idx) => {
                            // Calculate height percentage relative to max, default 10% min
                            const max = Math.max(...chartData.map(d => Number(d.total))) || 1;
                            const height = Math.max(10, (Number(data.total) / max) * 100);

                            return (
                                <div key={idx} className="flex flex-col items-center flex-1 group">
                                    <div className="relative w-full">
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                            {formatCurrency(data.total)}
                                        </div>
                                        {/* Bar */}
                                        <div
                                            className="w-full rounded-t-lg bg-gradient-to-t from-[hsl(262,83%,58%)]/50 to-[hsl(189,94%,43%)]/50 group-hover:from-[hsl(262,83%,58%)] group-hover:to-[hsl(189,94%,43%)] transition-all cursor-pointer"
                                            style={{ height: `${height}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-2 font-medium">{data.month}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
