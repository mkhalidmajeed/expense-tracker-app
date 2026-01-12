import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function Index({ auth, categories }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('expense');

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(`/categories/${id}`);
        }
    };

    const filteredCategories = categories.filter(category => category.type === activeTab);

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
        <AuthenticatedLayout user={auth.user} title="Categories">
            <Head title="Categories" />

            {flash.success && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400">
                    {flash.success}
                </div>
            )}

            {flash.error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                    {flash.error}
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                     <h2 className="text-2xl font-bold text-white">Manage Categories</h2>
                     <p className="text-gray-400">Customize your tracking labels.</p>
                </div>
                <Link
                    href={`/categories/create?type=${activeTab}`}
                    className={`px-6 py-3 rounded-xl font-bold text-white hover-glow ripple-effect flex items-center gap-2 ${
                        activeTab === 'expense' 
                        ? 'bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(262,83%,58%)]/80' 
                        : 'bg-gradient-to-r from-green-600 to-green-500'
                    }`}
                >
                    <span>➕</span>
                    <span>Add {activeTab === 'expense' ? 'Expense' : 'Income'} Category</span>
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-white/5 rounded-xl mb-6 max-w-md">
                <button 
                    onClick={() => setActiveTab('expense')}
                    className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                        activeTab === 'expense' 
                        ? 'bg-[hsl(262,83%,58%)] text-white shadow-lg' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                >
                    Expense Categories
                </button>
                <button 
                    onClick={() => setActiveTab('income')}
                    className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                        activeTab === 'income' 
                        ? 'bg-green-600 text-white shadow-lg' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                >
                    Income Categories
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <div key={category.id} className="glass rounded-xl p-6 group hover:bg-white/5 transition-colors relative overflow-hidden">
                             {/* Color strip */}
                            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: category.color }}></div>
                            
                            <div className="flex justify-between items-start pl-2">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                                        style={{
                                            backgroundColor: `${category.color}20`,
                                            color: category.color
                                        }}
                                    >
                                        {/* Default icon if none provided */}
                                        {getIcon(category.icon)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{category.name}</h3>
                                        <span className={`text-xs uppercase tracking-wider font-semibold ${category.type === 'income' ? 'text-green-400' : 'text-gray-500'}`}>{category.type}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                {category.user_id === auth.user.id && (
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/categories/${category.id}/edit`}
                                            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                                        >
                                            ✎
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-gray-500 glass rounded-xl">
                        No {activeTab} categories found. <br/>
                        <Link href={`/categories/create?type=${activeTab}`} className="text-[hsl(262,83%,58%)] hover:underline mt-2 inline-block">Create one now</Link>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
