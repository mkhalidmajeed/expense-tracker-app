import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Privacy() {
    return (
        <GuestLayout>
            <Head title="Privacy Policy" />

            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass-strong rounded-3xl p-8 md:p-12">
                        <h1 className="font-display font-bold text-4xl mb-6">
                            <span className="gradient-text">Privacy Policy</span>
                        </h1>

                        <div className="space-y-6 text-gray-300">
                            <p className="text-sm text-gray-400">Last updated: January 1, 2026</p>

                            <section>
                                <h2 className="font-display font-bold text-2xl text-white mb-3">1. Information We Collect</h2>
                                <p className="leading-relaxed mb-3">
                                    We collect information that you provide directly to us, including:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Account information (name, email, password)</li>
                                    <li>Expense data (amounts, categories, descriptions, dates)</li>
                                    <li>Category preferences and customizations</li>
                                    <li>Usage data and analytics</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-2xl text-white mb-3">2. How We Use Your Information</h2>
                                <p className="leading-relaxed mb-3">
                                    We use the information we collect to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Provide, maintain, and improve our services</li>
                                    <li>Process and complete transactions</li>
                                    <li>Send you technical notices and support messages</li>
                                    <li>Generate analytics and insights for your expense tracking</li>
                                    <li>Protect against fraudulent or illegal activity</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-2xl text-white mb-3">3. Data Security</h2>
                                <p className="leading-relaxed">
                                    We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. Your data is encrypted using industry-standard 256-bit encryption both in transit and at rest.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-2xl text-white mb-3">4. Data Sharing</h2>
                                <p className="leading-relaxed">
                                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                                    <li>With your explicit consent</li>
                                    <li>To comply with legal obligations</li>
                                    <li>To protect our rights and prevent fraud</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-2xl text-white mb-3">5. Your Rights</h2>
                                <p className="leading-relaxed mb-3">
                                    You have the right to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Access your personal data</li>
                                    <li>Correct inaccurate data</li>
                                    <li>Delete your account and data</li>
                                    <li>Export your data</li>
                                    <li>Opt-out of communications</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-2xl text-white mb-3">6. Cookies</h2>
                                <p className="leading-relaxed">
                                    We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-2xl text-white mb-3">7. Children's Privacy</h2>
                                <p className="leading-relaxed">
                                    Our service is not intended for children under the age of 13. We do not knowingly collect personally identifiable information from children under 13.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-2xl text-white mb-3">8. Changes to This Policy</h2>
                                <p className="leading-relaxed">
                                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-2xl text-white mb-3">9. Contact Us</h2>
                                <p className="leading-relaxed">
                                    If you have any questions about this Privacy Policy, please{' '}
                                    <Link href="/contact" className="text-[hsl(262,83%,58%)] hover:text-[hsl(262,92%,68%)]">
                                        contact us
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
