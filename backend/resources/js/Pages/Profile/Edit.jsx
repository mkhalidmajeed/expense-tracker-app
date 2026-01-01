import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ auth, mustVerifyEmail, status, currency }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        currency: auth.user.currency || 'USD',
    });

    const { flash } = usePage().props;

    const submit = (e) => {
        e.preventDefault();
        patch('/profile');
    };

    const currencies = [
        { code: 'USD', symbol: '$', name: 'US Dollar' },
        { code: 'EUR', symbol: '€', name: 'Euro' },
        { code: 'GBP', symbol: '£', name: 'British Pound' },
        { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
        { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
        { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
        { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
        { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
        { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
        { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
        { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
        { code: 'THB', symbol: '฿', name: 'Thai Baht' },
        { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
        { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
        { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
        { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
        { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
        { code: 'TWD', symbol: 'NT$', name: 'New Taiwan Dollar' },
        { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
        { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
        { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
        { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
        { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
        { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
        { code: 'AED', symbol: 'dh', name: 'UAE Dirham' },
        { code: 'SAR', symbol: 'SR', name: 'Saudi Riyal' },
        { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
        { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },
        { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
        { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
        { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
        { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
        { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
        { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
        { code: 'COP', symbol: '$', name: 'Colombian Peso' },
        { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' },
        { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee' },
        { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
        { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee' },
        { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
        { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
        { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
        { code: 'MAD', symbol: 'dh', name: 'Moroccan Dirham' },
        { code: 'DZD', symbol: 'DA', name: 'Algerian Dinar' },
        { code: 'TND', symbol: 'DT', name: 'Tunisian Dinar' },
        { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' },
        { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
        { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
        { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },
        { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
        { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna' },
        { code: 'ISK', symbol: 'kr', name: 'Icelandic Króna' },
        { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge' },
        { code: 'QAR', symbol: 'QR', name: 'Qatari Riyal' },
        { code: 'KWD', symbol: 'KD', name: 'Kuwaiti Dinar' },
        { code: 'BHD', symbol: 'BD', name: 'Bahraini Dinar' },
        { code: 'OMR', symbol: 'RO', name: 'Omani Rial' },
        { code: 'JOD', symbol: 'JD', name: 'Jordanian Dinar' },
        { code: 'LBP', symbol: 'L£', name: 'Lebanese Pound' },
        { code: 'IQD', symbol: 'IQD', name: 'Iraqi Dinar' },
        { code: 'VEF', symbol: 'Bs', name: 'Venezuelan Bolívar' },
        { code: 'CRC', symbol: '₡', name: 'Costa Rican Colón' },
        { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso' },
        { code: 'PYG', symbol: 'Gs', name: 'Paraguayan Guaraní' },
        { code: 'BOB', symbol: 'Bs.', name: 'Bolivian Boliviano' },
        { code: 'DOP', symbol: 'RD$', name: 'Dominican Peso' },
        { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal' },
        { code: 'HNL', symbol: 'L', name: 'Honduran Lempira' },
        { code: 'NIO', symbol: 'C$', name: 'Nicaraguan Córdoba' },
        { code: 'PAB', symbol: 'B/.', name: 'Panamanian Balboa' },
        { code: 'CUP', symbol: '$', name: 'Cuban Peso' },
        { code: 'JMD', symbol: 'J$', name: 'Jamaican Dollar' },
        { code: 'TTD', symbol: 'TT$', name: 'Trinidad and Tobago Dollar' },
        { code: 'XCD', symbol: '$', name: 'East Caribbean Dollar' },
        { code: 'BBD', symbol: '$', name: 'Barbadian Dollar' },
        { code: 'BSD', symbol: '$', name: 'Bahamian Dollar' },
        { code: 'HTG', symbol: 'G', name: 'Haitian Gourde' },
        { code: 'AFN', symbol: '؋', name: 'Afghan Afghani' },
        { code: 'ALL', symbol: 'L', name: 'Albanian Lek' },
        { code: 'AMD', symbol: '֏', name: 'Armenian Dram' },
        { code: 'AOA', symbol: 'Kz', name: 'Angolan Kwanza' },
        { code: 'AZN', symbol: '₼', name: 'Azerbaijani Manat' },
        { code: 'BAM', symbol: 'KM', name: 'Bosnia-Herzegovina Convertible Mark' },
        { code: 'BWP', symbol: 'P', name: 'Botswana Pula' },
        { code: 'BYN', symbol: 'Br', name: 'Belarusian Ruble' },
        { code: 'CDF', symbol: 'FC', name: 'Congolese Franc' },
        { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr' },
        { code: 'GEL', symbol: '₾', name: 'Georgian Lari' },
        { code: 'MZN', symbol: 'MT', name: 'Mozambican Metical' },
        { code: 'NAD', symbol: '$', name: 'Namibian Dollar' },
        { code: 'NPR', symbol: 'Rs', name: 'Nepalese Rupee' },
        { code: 'RSD', symbol: 'дин', name: 'Serbian Dinar' },
        { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling' },
        { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling' },
        { code: 'UZS', symbol: 'soʻm', name: 'Uzbekistani Soʻm' },
        { code: 'YER', symbol: '﷼', name: 'Yemeni Rial' },
        { code: 'ZMW', symbol: 'ZK', name: 'Zambian Kwacha' },
    ].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <AuthenticatedLayout user={auth.user} title="Settings">
            <Head title="Settings" />

            {flash.success && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400">
                    {flash.success}
                </div>
            )}

            <div className="max-w-2xl mx-auto">
                <div className="glass-strong rounded-2xl p-8 md:p-10 mb-8">
                    <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(262,83%,58%)] transition-colors"
                            />
                            {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[hsl(262,83%,58%)] transition-colors"
                            />
                            {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
                        </div>

                        {/* Currency Setting */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Default Currency
                            </label>
                            <div className="relative">
                                <select
                                    value={data.currency}
                                    onChange={(e) => setData('currency', e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[hsl(262,83%,58%)] transition-colors appearance-none"
                                >
                                    {currencies.map((curr) => (
                                        <option key={curr.code} value={curr.code} className="bg-[hsl(240,10%,6%)]">
                                            {curr.symbol} - {curr.name} ({curr.code})
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.currency && <p className="mt-2 text-sm text-red-400">{errors.currency}</p>}
                            <p className="mt-2 text-xs text-gray-500">This currency will be used to display all your expense amounts.</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-8 py-3 bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(189,94%,43%)] rounded-xl font-bold text-white hover-glow ripple-effect disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>

                            {recentlySuccessful && (
                                <p className="text-sm text-green-400">Saved.</p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
