import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';

export default function Create({ auth, categories, type: initialType }) {
    const [type, setType] = useState(initialType || 'expense');
    
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category_id: '',
        description: '',
        payment_method: 'cash',
    });

    // Filter categories based on selected type
    const filteredCategories = categories.filter(category => category.type === type);

    // Reset category when type changes
    useEffect(() => {
        setData('category_id', '');
    }, [type]);

    const submit = (e) => {
        e.preventDefault();
        post('/expenses');
    };

    // Icon mapping
    const iconMap = {
        'home': '🏠',
        'cart': '🛒',
        'car': '🚗',
        'shield': '🛡️',
        'medical-bag': '💊',
        'food': '🍽️',
        'shopping': '🛍️',
        'movie': '🎬',
        'face-man': '💇',
        'bank': '🏦',
        'chart-line': '📈',
        'credit-card': '💳',
        'alert': '🚨',
        'airplane': '✈️',
        'gift': '🎁',
        'school': '🎓',
        'format-paint': '🎨',
        'paw': '🐾',
        'refresh': '🔄',
        'dots-horizontal': '🔹',
        'cash': '💵',
        'briefcase': '💼',
        'trending-up': '📈',
    };

    const getIcon = (icon) => {
        return iconMap[icon] || icon || '🏷️';
    };

    return (
        <AuthenticatedLayout user={auth.user} title={type === 'income' ? "Add Income" : "Add Expense"}>
            <Head title={type === 'income' ? "Add Income" : "Add Expense"} />

            <div className="max-w-2xl mx-auto">
                <div className="glass-strong rounded-2xl p-8 md:p-10">
                    <form onSubmit={submit} className="space-y-6">
                        
                        {/* Transaction Type Toggle */}
                        <div className="flex p-1 bg-white/5 rounded-xl mb-6">
                            <button 
                                type="button" 
                                onClick={() => setType('expense')}
                                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${type === 'expense' ? 'bg-red-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Expense 💸
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setType('income')}
                                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${type === 'income' ? 'bg-green-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Income 💰
                            </button>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                {type === 'income' ? 'Income Source' : 'Expense Category'}
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[hsl(262,83%,58%)] transition-colors appearance-none"
                            >
                                <option value="" className="bg-[hsl(240,10%,6%)]">Select a category</option>
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((category) => (
                                        <option key={category.id} value={category.id} className="bg-[hsl(240,10%,6%)]">
                                            {getIcon(category.icon)} {category.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled className="bg-[hsl(240,10%,6%)]">No categories found for {type}</option>
                                )}
                            </select>
                            {errors.category_id && <p className="mt-2 text-sm text-red-400">{errors.category_id}</p>}
                            {filteredCategories.length === 0 && (
                                <Link href={`/categories/create?type=${type}`} className="text-xs text-[hsl(262,83%,58%)] mt-2 inline-block hover:underline">
                                    + Create new {type} category
                                </Link>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Title / Note
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(262,83%,58%)] transition-colors"
                                placeholder={type === 'expense' ? "e.g. Grocery Shopping" : "e.g. Salary, Freelance"}
                                autoFocus
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

                        {/* Payment Method / Deposit To */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                {type === 'income' ? 'Deposit To' : 'Payment Method'}
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                    { id: 'cash', label: 'Cash', icon: '💵' },
                                    { id: 'bank', label: 'Bank', icon: '🏦' },
                                    { id: 'wallet', label: 'Wallet', icon: '📱' },
                                    // Only show card for Expense, or assuming we only care about "Account" type logic
                                    ...(type === 'expense' ? [{ id: 'card', label: 'Card', icon: '💳' }] : [])
                                ].map((method) => (
                                    <div
                                        key={method.id}
                                        onClick={() => setData('payment_method', method.id)}
                                        className={`cursor-pointer border rounded-xl p-3 flex flex-col items-center justify-center gap-1 transition-all ${
                                            data.payment_method === method.id 
                                                ? 'bg-white/10 border-[hsl(262,83%,58%)] text-white scale-105' 
                                                : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                                        }`}
                                    >
                                        <span className="text-2xl">{method.icon}</span>
                                        <span className="text-xs font-medium">{method.label}</span>
                                    </div>
                                ))}
                            </div>
                            {errors.payment_method && <p className="mt-2 text-sm text-red-400">{errors.payment_method}</p>}
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
                                {processing ? 'Saving...' : 'Save Transaction'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
