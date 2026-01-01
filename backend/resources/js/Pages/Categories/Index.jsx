import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, categories }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(`/categories/${id}`);
        }
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

            <div className="flex justify-between items-center mb-6">
                <p className="text-gray-400">Manage your expense categories.</p>
                <Link
                    href="/categories/create"
                    className="px-6 py-3 bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-xl font-bold text-white hover-glow ripple-effect flex items-center gap-2"
                >
                    <span>➕</span>
                    <span>Add Category</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div key={category.id} className="glass rounded-xl p-6 group hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                                    style={{
                                        backgroundColor: category.color,
                                        boxShadow: `0 4px 20px ${category.color}40`
                                    }}
                                >
                                    {/* Default icon if none provided */}
                                    🏷️
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">{category.name}</h3>
                                    <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">{category.type}</span>
                                </div>
                            </div>

                            {/* Actions - Only show if it belongs to user (not default) or handle logic simply */}
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
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
