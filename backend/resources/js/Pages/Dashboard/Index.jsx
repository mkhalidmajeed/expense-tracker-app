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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Income */}
                <div className="glass-strong rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-gray-400 font-medium mb-1 text-sm">Total Income</h3>
                    <div className="text-2xl font-bold text-white mb-1">{formatCurrency(stats.income)}</div>
                    <div className="text-xs text-green-400">This Month</div>
                </div>

                {/* Total Expenses */}
                <div className="glass-strong rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-16 h-16 text-[hsl(262,83%,58%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <h3 className="text-gray-400 font-medium mb-1 text-sm">Total Expenses</h3>
                    <div className="text-2xl font-bold text-white mb-1">{formatCurrency(stats.expense)}</div>
                    <div className="text-xs">
                         {stats.expenseChange > 0 ? (
                            <span className="text-red-400">+{stats.expenseChange}% vs last month</span>
                        ) : (
                            <span className="text-green-400">{stats.expenseChange}% vs last month</span>
                        )}
                    </div>
                </div>

                {/* Balance */}
                <div className="glass-strong rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                    </div>
                    <h3 className="text-gray-400 font-medium mb-1 text-sm">Balance</h3>
                    <div className={`text-2xl font-bold mb-1 ${stats.balance >= 0 ? 'text-white' : 'text-red-400'}`}>{formatCurrency(stats.balance)}</div>
                    <div className="text-xs text-blue-400">Remaining</div>
                </div>

                {/* Savings */}
                <div className="glass-strong rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-16 h-16 text-[hsl(189,94%,43%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-gray-400 font-medium mb-1 text-sm">Savings</h3>
                    <div className="text-2xl font-bold text-white mb-1">{formatCurrency(stats.savings)}</div>
                    <div className="text-xs text-[hsl(189,94%,43%)]">Actully Saved</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Area (2 cols) */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Income vs Expense Chart */}
                    <div className="glass rounded-2xl p-6">
                         <h2 className="text-lg font-bold text-white mb-6">Income vs Expense Trend</h2>
                         <div className="flex items-end justify-between h-48 space-x-4">
                            {chartData.map((data, idx) => {
                                const max = Math.max(...chartData.map(d => Math.max(Number(d.income), Number(d.expense)))) || 1;
                                const incomeHeight = Math.max(4, (Number(data.income) / max) * 100);
                                const expenseHeight = Math.max(4, (Number(data.expense) / max) * 100);

                                return (
                                    <div key={idx} className="flex flex-col items-center flex-1 group gap-1">
                                        <div className="flex gap-1 w-full justify-center h-full items-end">
                                            {/* Income Bar */}
                                            <div className="relative group/bar w-3 md:w-4">
                                                 <div 
                                                    className="w-full rounded-t-sm bg-green-500/50 hover:bg-green-500 transition-all"
                                                    style={{ height: `${incomeHeight}%` }}
                                                ></div>
                                                {/* Tooltip */}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover/bar:opacity-100 bg-black/80 text-white text-[10px] px-1 rounded pointer-events-none whitespace-nowrap">
                                                    +{formatCurrency(data.income)}
                                                </div>
                                            </div>

                                            {/* Expense Bar */}
                                            <div className="relative group/bar w-3 md:w-4">
                                                <div 
                                                    className="w-full rounded-t-sm bg-red-500/50 hover:bg-red-500 transition-all"
                                                    style={{ height: `${expenseHeight}%` }}
                                                ></div>
                                                {/* Tooltip */}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover/bar:opacity-100 bg-black/80 text-white text-[10px] px-1 rounded pointer-events-none whitespace-nowrap">
                                                    -{formatCurrency(data.expense)}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-gray-500 mt-2 font-medium uppercase">{data.month}</span>
                                    </div>
                                );
                            })}
                         </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="glass-strong rounded-2xl p-6">
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
                                                {expense.category_icon === 'help-circle' ? '🧾' : '🏷️'}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium group-hover:text-[hsl(262,83%,58%)] transition-colors">{expense.title}</h4>
                                                <p className="text-xs text-gray-400">{expense.category_name} • {expense.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-bold ${expense.type === 'income' ? 'text-green-400' : 'text-white'}`}>
                                                {expense.type === 'income' ? '+' : ''}{formatCurrency(expense.amount)}
                                            </p>
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

                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="glass rounded-2xl p-6 flex flex-col justify-center gap-3">
                        <h3 className="text-gray-400 font-medium mb-2">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Link
                                href="/expenses/create?type=income"
                                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-green-500/20 hover:border-green-500 border border-white/10 transition-all group"
                            >
                                <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">💰</span>
                                <span className="text-xs font-medium text-gray-300 group-hover:text-white">Add Income</span>
                            </Link>
                            <Link
                                href="/expenses/create?type=expense"
                                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-[hsl(262,83%,58%)]/20 hover:border-[hsl(262,83%,58%)] border border-white/10 transition-all group"
                            >
                                <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">💸</span>
                                <span className="text-xs font-medium text-gray-300 group-hover:text-white">Add Expense</span>
                            </Link>
                            <Link
                                href="/categories"
                                className="col-span-2 flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-[hsl(189,94%,43%)]/20 hover:border-[hsl(189,94%,43%)] border border-white/10 transition-all group"
                            >
                                <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🏷️</span>
                                <span className="text-xs font-medium text-gray-300 group-hover:text-white">Categories</span>
                            </Link>
                        </div>
                    </div>

                    {/* Monthly Budget (Placeholder - Needs Backend Integration in Phase 3) */}
                     <div className="glass rounded-2xl p-6">
                        <h3 className="text-gray-400 font-medium mb-4">Monthly Budget</h3>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-400 bg-white/5">
                                        Setup Pending
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-gray-300">
                                        N/A
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white/10">
                                <div style={{ width: "0%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-500"></div>
                            </div>
                            <p className="text-xs text-gray-400">Budget setup coming soon.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
