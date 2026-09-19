'use client';

import ProjectCard from './ProjectCard';

const links = ['https://digitalgym.in/v1/app/pages/dashboards/default.html'];

const myProjects = [
    { cat: 'Real world', name: 'Ibtikar Store', image: '/images/ibtikar.png', details: 'WooCommerce store for Ibtikar, a Saudi computer hardware retailer. Product catalogs, cart and checkout, installment payments, and category browsing in Arabic.', tech: ['WordPress', 'WooCommerce', 'PHP'], link: 'https://ibtikarstore.sa/' },
    { cat: 'Real world', name: 'MAS Al-Sharq', image: '/images/mass.png', details: 'WordPress website for MAS Al-Sharq Industries, a Saudi B2B manufacturer of plastic products and industrial detergents. Product catalogs, quote requests, company profile, and contact flows in Arabic.', tech: ['WordPress', 'PHP', 'Elementor'], link: 'https://lavender-chicken-689152.hostingersite.com/' },
    { cat: 'Real world', name: 'SustainGRC', image: '/images/sustainegrc.png', details: 'SustainGRC is a London-based AI platform transforming corporate carbon emissions, ESG risk management and assurance.', tech: ['React.js', 'Next.js', 'Tailwind CSS', 'Shadcn-ui'], link: 'https://www.sustaingrc.com/' },
    { cat: 'Real world', name: 'Eskan El Mansoura', image: '/images/eskan.png', details: 'A real estate website with various properties, filters by price/unit/block, and an admin dashboard.', tech: ['SASS', 'React.js', 'Redux.js', 'Tailwind CSS', 'Chakra-UI'], link: 'https://mansoura-eco-build.com/' },
    { cat: 'Real world', name: 'Abo Taleb', image: '/images/abo-taleb.png', details: 'Online English courses platform for Military Bases Students with payment integration and admin dashboard.', tech: ['React.js', 'Redux.js', 'Tailwind CSS'], link: 'https://www.sirtz.com/' },
    { cat: 'Real world', name: 'Mansoura Outlet', image: '/images/outlet.png', details: 'E-commerce directory of clothing stores structured by city streets.', tech: ['React.js', 'Redux.js', 'Tailwind CSS'], link: 'https://abc-mansoura.com/' },
    // { cat: 'Real world', name: 'DGym', image: '/images/first-work-freelance.png', details: 'Gym management platform — memberships, payments, member feedback, reports, accessible from any device.', tech: ['React.js', 'Redux.js', 'Tailwind CSS'], links },
    { cat: 'Scholarship', name: 'Shop', image: '/images/depi-project.png', details: 'E-commerce for clothes with Node.js backend.', tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'], link: 'https://vite-react-chi-jet.vercel.app/' },
    { cat: 'Personal', name: 'Dr. Nermeen Clinic', image: '/images/dr-nermeen.png', details: 'Arabic gynecology clinic dashboard for Dr. Nermeen. Search patients by name or phone, track pregnancy status, open patient details and scans, and manage users.', tech: ['Next.js', 'Tailwind CSS', 'TypeScript'], link: 'https://drnermeen.vercel.app/' },
    { cat: 'Personal', name: 'Payment Tracker', image: '/images/p-t-app.png', details: 'Personal finance dashboard with Arabic and English. Track budget, expenses, and remaining balance, add categorized payments, and compare spending. Installable as a PWA.', tech: ['Next.js', 'Tailwind CSS', 'TypeScript'], link: 'https://personal-payment-tracker-iota.vercel.app/' },
    { cat: 'Personal', name: 'Productivity', image: '/images/productivity-app.png', details: 'Weekly Tasks feature — mark tasks to the current or desired day, resets every week.', tech: ['Next.js', 'Tailwind CSS', 'SupaBase'], link: 'https://my-tasks-inky.vercel.app/' },
    { cat: 'Personal', name: 'Questions Game', image: '/images/questions.png', details: 'Interactive quiz application with real-time features.', tech: ['HTML', 'CSS', 'JAVASCRIPT', 'React.js', 'MATERIAL-UI', 'FIREBASE', 'REDUX'], link: 'https://questions-game-cd095.web.app/' },
    { cat: 'Personal', name: 'Crypto App', image: '/images/crypto_project.png', details: 'Cryptocurrency tracker and data visualization app.', tech: ['HTML', 'CSS', 'JAVASCRIPT', 'React.js', 'Ant Design'], link: 'https://yousefjoe1.github.io/crypto-project/' },
    { cat: 'Personal', name: 'Memory Game', image: '/images/mem-game.png', details: 'Card matching game to test cognitive skills.', tech: ['React.js', 'TypeScript', 'Tailwind CSS'], link: 'https://yousefjoe1.github.io/Memory-Game/' },
    { cat: 'Personal', name: 'Travel Advisor', image: '/images/Travel_advisor_project.png', details: 'Location-based app to find restaurants and hotels.', tech: ['React.js', 'Google Maps', 'Material-UI'], link: 'https://yousefjoe1.github.io/simple-React.js-travel-advisor-app/' },
    { cat: 'Personal', name: 'Amazon Clone', image: '/images/amazontemp.png', details: 'E-commerce interface clone featuring product listings.', tech: ['HTML', 'CSS', 'JAVASCRIPT', 'React.js'], link: 'https://yousefjoe1.github.io/amazone1/' },
    { cat: 'Personal', name: 'Weather App', image: '/images/weatherapp.png', details: 'Real-time weather forecasting using API data.', tech: ['HTML', 'CSS', 'JAVASCRIPT'], link: 'https://yousefjoe1.github.io/simple-weather-app-js/' },
    { cat: 'Personal', name: 'LinkedIn Clone', image: '/images/linkedin.png', details: 'Social media UI clone focusing on professional networking.', tech: ['React.js', 'Bootstrap'], link: 'https://yousefjoe1.github.io/linkedIn-clone-2022/' },
    { cat: 'Personal', name: 'Discord Clone', image: '/images/discord.png', details: 'Real-time communication platform interface.', tech: ['React.js', 'Bootstrap'], link: 'https://yousefjoe1.github.io/discord-clone/#/' },
    { cat: 'Personal', name: 'Calculator', image: '/images/calc.png', details: 'Clean, functional web calculator.', tech: ['React.js', 'TypeScript', 'Tailwind CSS'], link: 'https://yousefjoe1.github.io/Simple-Calculator/' },
    { cat: 'Personal', name: 'Words Game', image: '/images/wordgame.png', details: 'Word-based puzzle game.', tech: ['React.js', 'TypeScript', 'Tailwind CSS'], link: 'https://yousefjoe1.github.io/Words-Game/' },
];

const SectionHeader = ({ label }: { label: string }) => (
    <div className="bg-brand-bg border border-brand-border rounded-2xl px-6 py-3 mx-auto w-fit max-w-[90%] mt-12 mb-6 shadow-sm">
        <h3 className="text-brand-text text-2xl md:text-3xl text-center font-semibold">
            {label}
        </h3>
    </div>
);

const Projects = () => {
    const realWorld = myProjects.filter(p => p.cat === 'Real world');
    const scholarship = myProjects.filter(p => p.cat === 'Scholarship');
    const personal = myProjects.filter(p => p.cat === 'Personal');

    return (
        <section className="py-12 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col justify-center items-center text-center gap-4 mb-2">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    My{' '}
                    <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                        Projects
                    </span>
                </h2>
            </div>

            <SectionHeader label="Real World Projects" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {realWorld.map(p => (
                    <ProjectCard key={p.name} project={p} />
                ))}
            </div>

            <SectionHeader label="DEPI Scholarship Project" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scholarship.map(p => (
                    <ProjectCard key={p.name} project={p} />
                ))}
            </div>

            <SectionHeader label="Personal & Practical Projects" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {personal.map(p => (
                    <ProjectCard key={p.name} project={p} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
