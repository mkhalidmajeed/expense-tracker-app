import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, categoryBreakdown, monthlySpending, currentMonth }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: auth.user.currency || 'USD',
        }).format(amount);
    };

    const maxMonthly = Math.max(...monthlySpending.map(m => Number(m.total))) || 1;
    const totalThisMonth = categoryBreakdown.reduce((sum, item) => sum + Number(item.total), 0);

    return (
        <AuthenticatedLayout user={auth.user} title="Reports">
            <Head title="Reports" />

            <div className="space-y-8">
                {/* Monthly Spending Trend */}
                <div className="glass-strong rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl font-bold text-white mb-6">Annual Spending Trend</h2>
                    <div className="h-64 flex items-end space-x-2 md:space-x-4">
                        {monthlySpending.map((data, idx) => {
                            const height = Math.max(5, (Number(data.total) / maxMonthly) * 100);
                            return (
                                <div key={idx} className="flex-1 flex flex-col items-center group">
                                    <div className="relative w-full flex justify-center">
                                        <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs py-1 px-2 rounded mb-1 whitespace-nowrap z-10">
                                            {formatCurrency(data.total)}
                                        </div>
                                        <div
                                            className="w-full md:w-8 rounded-t-lg bg-gradient-to-t from-[hsl(262,83%,58%)]/50 to-[hsl(189,94%,43%)]/50 group-hover:from-[hsl(262,83%,58%)] group-hover:to-[hsl(189,94%,43%)] transition-all"
                                            style={{ height: `${height}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-[10px] md:text-xs text-gray-500 mt-2 truncate w-full text-center">
                                        {data.month.split(' ')[0]}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="glass rounded-2xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-6">Spending by Category ({currentMonth})</h2>
                        {categoryBreakdown.length > 0 ? (
                            <div className="space-y-4">
                                {categoryBreakdown.map((item, idx) => {
                                    const percentage = ((Number(item.total) / totalThisMonth) * 100).toFixed(1);
                                    return (
                                        <div key={idx}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-200 font-medium">{item.name}</span>
                                                <div className="text-right">
                                                    <span className="font-bold text-white block">{formatCurrency(item.total)}</span>
                                                    <span className="text-xs text-gray-400">{percentage}%</span>
                                                </div>
                                            </div>
                                            <div className="w-full bg-white/5 rounded-full h-2">
                                                <div
                                                    className="h-2 rounded-full"
                                                    style={{
                                                        width: `${percentage}%`,
                                                        backgroundColor: item.color
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="pt-4 border-t border-white/10 mt-4 flex justify-between">
                                    <span className="text-gray-400">Total</span>
                                    <span className="text-xl font-bold text-white">{formatCurrency(totalThisMonth)}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-10 text-gray-500">
                                No expenses recorded this month.
                            </div>
                        )}
                    </div>

                    <div className="glass rounded-2xl p-6 md:p-8 flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-white mb-6">Insights</h2>
                            <p className="text-gray-400 mb-6">
                                Detailed AI-powered insights about your spending habits are coming soon in the next update!
                            </p>
                            <div className="text-6xl animate-pulse">💡</div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
