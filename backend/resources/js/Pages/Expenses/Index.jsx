import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function Index({ auth, expenses, filters }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/expenses', { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this expense?')) {
            router.delete(`/expenses/${id}`);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: auth.user.currency || 'USD',
        }).format(amount);
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Expenses">
            <Head title="Expenses" />

            {flash.success && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400">
                    {flash.success}
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                {/* Search */}
                <form onSubmit={handleSearch} className="w-full md:w-96">
                    <div className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search expenses..."
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(262,83%,58%)] transition-colors"
                        />
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </form>

                <Link
                    href="/expenses/create"
                    className="px-6 py-3 bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-xl font-bold text-white hover-glow ripple-effect flex items-center gap-2"
                >
                    <span>➕</span>
                    <span>Add Expense</span>
                </Link>
            </div>

            {/* Expenses List */}
            <div className="glass-strong rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Title</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold text-right">Amount</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {expenses.data.length > 0 ? (
                                expenses.data.map((expense) => (
                                    <tr key={expense.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4 text-gray-300 whitespace-nowrap">
                                            {expense.date}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-white">
                                            {expense.title}
                                            {expense.description && (
                                                <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">{expense.description}</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {expense.category ? (
                                                <span
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                                    style={{
                                                        backgroundColor: `${expense.category.color}20`,
                                                        color: expense.category.color
                                                    }}
                                                >
                                                    {expense.category.name}
                                                </span>
                                            ) : (
                                                <span className="text-gray-500">Uncategorized</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right text-white font-bold">
                                            {formatCurrency(expense.amount)}
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-2">
                                                <Link
                                                    href={`/expenses/${expense.id}/edit`}
                                                    className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                                                >
                                                    ✎
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(expense.id)}
                                                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                                        No expenses found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {expenses.links && expenses.links.length > 3 && (
                <div className="mt-6 flex justify-center">
                    <div className="flex gap-1">
                        {expenses.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${link.active
                                    ? 'bg-[hsl(262,83%,58%)] text-white'
                                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                    } ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
