
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function HelpCenter() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const sections = [
        {
            key: 'dashboard',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 13l3-3 3 4 4-6" />
                </svg>
            ),
            link: '/dashboard'
        },
        {
            key: 'links',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 0 1 7.07 0l1.42 1.42a5 5 0 0 1-7.07 7.07l-1.42-1.42" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 11a5 5 0 0 1-7.07 0L5.5 9.57a5 5 0 0 1 7.07-7.07L14 3.93" />
                </svg>
            ),
            link: '/links'
        },
        {
            key: 'conversions',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9l-5 5-3-3-4 4" />
                    <circle cx="18" cy="9" r="2" fill="currentColor" />
                </svg>
            ),
            link: '/conversions'
        },
        {
            key: 'integrations',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h5a2 2 0 0 1 0 4H9V7h6" />
                </svg>
            ),
            link: '/clickbank'
        },
        {
            key: 'reports',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 4 6v6c0 4.7 3.1 8.7 8 9 4.9-.3 8-4.3 8-9V6l-8-3z" />
                </svg>
            ),
            link: '/admin-reports'
        }
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-gray-900">{t('helpPage.title')}</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    {t('helpPage.subtitle')}
                </p>
            </div>

            {/* Main Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sections.map((section) => (
                    <div
                        key={section.key}
                        onClick={() => section.link && navigate(section.link)}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-8 border border-gray-100 cursor-pointer group"
                    >
                        <div className="bg-gray-50 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            {section.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {t(`helpPage.sections.${section.key}.title`)}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            {t(`helpPage.sections.${section.key}.content`)}
                        </p>
                    </div>
                ))}
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('helpPage.faq.title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className="space-y-3">
                            <h3 className="font-semibold text-lg text-gray-900">
                                {t(`helpPage.faq.q${num}`)}
                            </h3>
                            <p className="text-gray-600">
                                {t(`helpPage.faq.a${num}`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Banner */}
            <div className="bg-blue-600 rounded-2xl p-8 text-white text-center md:flex md:items-center md:justify-between md:text-left">
                <div className="space-y-2 mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold">{t('helpPage.contact.title')}</h2>
                    <p className="text-blue-100">{t('helpPage.contact.text')}</p>
                </div>
                <button
                    onClick={() => window.location.href = 'mailto:support@rhonat.com'}
                    className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
                >
                    {t('helpPage.contact.button')}
                </button>
            </div>
        </div>
    );
}
