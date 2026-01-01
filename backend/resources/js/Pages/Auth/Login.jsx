import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import { useState } from 'react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Login" />
            <AuthLayout
                title="Welcome Back"
                subtitle="Sign in to continue to your account"
            >
                {status && (
                    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-300 mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(262,83%,58%)] focus:ring-2 focus:ring-[hsl(262,83%,58%)]/20 transition-all"
                            placeholder="you@example.com"
                            autoFocus
                            autoComplete="username"
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-300 mb-2"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(262,83%,58%)] focus:ring-2 focus:ring-[hsl(262,83%,58%)]/20 transition-all pr-12"
                                placeholder="••••••••"
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                {showPassword ? (
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                                className="w-4 h-4 bg-white/5 border-white/10 rounded text-[hsl(262,83%,58%)] focus:ring-[hsl(262,83%,58%)]"
                            />
                            <span className="ml-2 text-sm text-gray-300 group-hover:text-white transition-colors">
                                Remember me
                            </span>
                        </label>

                        <Link
                            href="/forgot-password"
                            className="text-sm text-[hsl(262,83%,58%)] hover:text-[hsl(262,92%,68%)] transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full px-6 py-3.5 bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-xl font-bold text-white hover-glow ripple-effect disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {processing ? 'Signing in...' : 'Sign In'}
                    </button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-[hsl(240,9%,9%)] text-gray-400">
                                Don't have an account?
                            </span>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <Link
                        href="/register"
                        className="block w-full px-6 py-3.5 glass border border-white/20 rounded-xl font-semibold text-white text-center hover-glow transition-all"
                    >
                        Create Account
                    </Link>
                </form>
            </AuthLayout>
        </>
    );
}
