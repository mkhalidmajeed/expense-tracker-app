import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'expense',
        color: '#8b5cf6', // Default purple
        icon: '🏷️',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/categories');
    };

    const colors = [
        '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981',
        '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef',
        '#f43f5e', '#64748b'
    ];

    return (
        <AuthenticatedLayout user={auth.user} title="Add Category">
            <Head title="Add Category" />

            <div className="max-w-2xl mx-auto">
                <div className="glass-strong rounded-2xl p-8 md:p-10">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Category Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(262,83%,58%)] transition-colors"
                                placeholder="e.g. Travel"
                                autoFocus
                            />
                            {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Type
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="expense"
                                        checked={data.type === 'expense'}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="text-[hsl(262,83%,58%)] focus:ring-[hsl(262,83%,58%)] bg-white/10 border-white/20"
                                    />
                                    <span className="text-white">Expense</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="income"
                                        checked={data.type === 'income'}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="text-[hsl(262,83%,58%)] focus:ring-[hsl(262,83%,58%)] bg-white/10 border-white/20"
                                    />
                                    <span className="text-white">Income</span>
                                </label>
                            </div>
                            {errors.type && <p className="mt-2 text-sm text-red-400">{errors.type}</p>}
                        </div>

                        {/* Color Picker Grid */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Color
                            </label>
                            <div className="grid grid-cols-6 gap-3">
                                {colors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setData('color', color)}
                                        className={`w-10 h-10 rounded-lg transition-transform hover:scale-110 focus:outline-none ring-2 ring-offset-2 ring-offset-[hsl(240,10%,6%)] ${data.color === color ? 'ring-white scale-110' : 'ring-transparent'
                                            }`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                            {errors.color && <p className="mt-2 text-sm text-red-400">{errors.color}</p>}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-4">
                            <Link
                                href="/categories"
                                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-8 py-3 bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-xl font-bold text-white hover-glow ripple-effect disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Create Category'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
