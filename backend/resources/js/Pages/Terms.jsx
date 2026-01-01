import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Terms() {
    return (
        <GuestLayout>
            <Head title="Terms of Service" />

            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass-strong rounded-3xl p-8 md:p-12">
                        <h1 className="font-display font-bold text-4xl mb-6">
                            <span className="gradient-text">Terms of Service</span>
                        </h1>

                        <div className="space-y-6 text-gray-300">
                            <p className="text-sm text-gray-400">Last updated: January 1, 2026</p>

                            <section>
                                <h2 className="font-display font-bold text-2xl text-white mb-3">1. Acceptance of Terms</h2>
                                <p className="leading-relaxed">
                                    By accessing and using ExpenseTracker, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-2xl text-white mb-3">2. Use License</h2>
                                <p className="leading-relaxed mb-3">
                                    Permission is granted to temporarily use ExpenseTracker for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Modify or copy the materials</li>
                                    <li>Use the materials for any commercial purpose</li>
                                    <li>Attempt to decompile or reverse engineer any software</li>
                                    <li>Remove any copyright or other proprietary notations</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-2xl text-white mb-3">3. User Accounts</h2>
                                <p className="leading-relaxed">
                                    You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-2xl text-white mb-3">4. Data Privacy</h2>
                                <p className="leading-relaxed">
                                    Your use of ExpenseTracker is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the site and informs users of our data collection practices.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-2xl text-white mb-3">5. Limitation of Liability</h2>
                                <p className="leading-relaxed">
                                    ExpenseTracker shall not be liable for any damages arising from the use or inability to use the service, even if ExpenseTracker has been notified of the possibility of such damages.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-2xl text-white mb-3">6. Changes to Terms</h2>
                                <p className="leading-relaxed">
                                    We reserve the right to update or modify these terms at any time without prior notice. Your use of ExpenseTracker following any such change constitutes your agreement to follow and be bound by the terms as changed.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-2xl text-white mb-3">7. Contact Information</h2>
                                <p className="leading-relaxed">
                                    If you have any questions about these Terms, please contact us at{' '}
                                    <Link href="/contact" className="text-[hsl(262,83%,58%)] hover:text-[hsl(262,92%,68%)]">
                                        our contact page
                                    </Link>.
                                </p>
                            </section>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10">
                            <Link
                                href="/register"
                                className="inline-block px-6 py-3 bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-xl font-bold text-white hover-glow"
                            >
                                Accept & Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
