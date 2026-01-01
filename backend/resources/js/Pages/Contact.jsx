import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Contact() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => {
                alert('Thank you for your message! We\'ll get back to you soon.');
            },
        });
    };

    const contactMethods = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Email Us',
            detail: 'support@expensetracker.com',
            description: 'We typically respond within 24 hours',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            title: 'Live Chat',
            detail: 'Available 9AM - 6PM EST',
            description: 'Get instant help from our team',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
            ),
            title: 'Help Center',
            detail: 'Browse FAQs & guides',
            description: 'Find answers to common questions',
        },
    ];

    return (
        <GuestLayout>
            <Head title="Contact Us" />

            {/* Hero */}
            <section className="relative overflow-hidden py-20 md:py-32">
                <div className="absolute top-10 left-1/4 w-96 h-96 bg-[hsl(189,94%,43%)] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-display font-extrabold text-4xl md:text-6xl mb-6">
                        <span className="gradient-text">Get in Touch</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Have a question or feedback? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {contactMethods.map((method, idx) => (
                            <div key={idx} className="glass-strong rounded-2xl p-8 text-center hover-glow">
                                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-2xl flex items-center justify-center mx-auto mb-5 text-white">
                                    {method.icon}
                                </div>
                                <h3 className="font-display font-bold text-xl text-white mb-2">
                                    {method.title}
                                </h3>
                                <p className="text-[hsl(262,83%,58%)] font-semibold mb-2">
                                    {method.detail}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {method.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="pb-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass-strong rounded-3xl p-8 md:p-12">
                        <h2 className="font-display font-bold text-3xl mb-8">
                            <span className="gradient-text">Send us a Message</span>
                        </h2>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(262,83%,58%)] transition-colors"
                                        placeholder="John Doe"
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(262,83%,58%)] transition-colors"
                                        placeholder="john@example.com"
                                        required
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(262,83%,58%)] transition-colors"
                                    placeholder="How can we help?"
                                    required
                                />
                                {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(262,83%,58%)] transition-colors resize-none"
                                    placeholder="Tell us more about your question or feedback..."
                                    required
                                />
                                {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full px-8 py-4 bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-xl font-bold text-lg text-white hover-glow ripple-effect disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
