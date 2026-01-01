import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ auth, expense, categories }) {
    const { data, setData, put, processing, errors } = useForm({
        title: expense.title,
        amount: expense.amount,
        date: expense.date,
        category_id: expense.category_id,
        description: expense.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/expenses/${expense.id}`);
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Edit Expense">
            <Head title="Edit Expense" />

            <div className="max-w-2xl mx-auto">
                <div className="glass-strong rounded-2xl p-8 md:p-10">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Category
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[hsl(262,83%,58%)] transition-colors appearance-none"
                            >
                                <option value="" className="bg-[hsl(240,10%,6%)]">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id} className="bg-[hsl(240,10%,6%)]">
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && <p className="mt-2 text-sm text-red-400">{errors.category_id}</p>}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Expense Title
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(262,83%,58%)] transition-colors"
                                placeholder="e.g. Grocery Shopping"
                            />
                            {errors.title && <p className="mt-2 text-sm text-red-400">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Amount */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">
                                    Amount ({auth.user.currency || 'USD'})
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(262,83%,58%)] transition-colors"
                                    placeholder="0.00"
                                />
                                {errors.amount && <p className="mt-2 text-sm text-red-400">{errors.amount}</p>}
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(262,83%,58%)] transition-colors [color-scheme:dark]"
                                />
                                {errors.date && <p className="mt-2 text-sm text-red-400">{errors.date}</p>}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Description (Optional)
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(262,83%,58%)] transition-colors resize-none"
                                rows="3"
                                placeholder="Add any additional details..."
                            />
                            {errors.description && <p className="mt-2 text-sm text-red-400">{errors.description}</p>}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-4">
                            <Link
                                href="/expenses"
                                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-8 py-3 bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-xl font-bold text-white hover-glow ripple-effect disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Update Expense'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
