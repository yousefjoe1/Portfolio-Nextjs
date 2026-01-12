'use client';

const links = ["https://digitalgym.in/v1/app/pages/dashboards/default.html", "https://digitalgym.in/v1/app/pages/authentication/signin/cover.html", "https://digitalgym.in/v1/app/pages/authentication/signup/cover.html", "https://digitalgym.in/v1/app/pages/ecommerce/referral.html", "https://digitalgym.in/v1/app/pages/applications/wizard.html", "https://digitalgym.in/v1/app/pages/applications/analytics.html", "https://digitalgym.in/v1/app/pages/ecommerce/overview.html", "https://digitalgym.in/v1/app/pages/ecommerce/attendee.html", "https://digitalgym.in/v1/app/pages/ecommerce/employeelist.html", "https://digitalgym.in/v1/app/pages/ecommerce/memberlist.html"]

const myProjects = [
    {
        name: 'SustainGRC', image: '/images/sustainegrc.png', details: `SustainGRC is a London-based AI platform transforming corporate carbon emissions, ESG risk management and assurance. We empower organisations with AI-driven solutions that turn sustainability and data challenges into strategic value, fostering environmental stewardship and business success.`,
        tech: ["React.js", "Next.js", "Tailwind CSS", "Shadcn-ui"], link: 'https://www.sustaingrc.com/'
    },
    {
        name: 'Eskan El Mansoura', image: '/images/eskan.png', details: 'A real estate website that offers various properties. You can visit a project to choose what suits you from shops or apartments, also there are filters by price or unit number or block location or meter price and much more of complex data handling, and various features. The project has a dashboard for admin to control the 90% of the data.',
        tech: ["SASS", "React.js", "Redux.js", "Tailwind CSS", "Chakra-UI", "Swiper"], link: 'https://mansoura-eco-build.com/'
    },
    {
        name: 'Abo Taleb', image: '/images/abo-taleb.png', details: 'Abo Taleb is a sophisticated online platform that offers comprehensive English courses tailored specifically for Military Bases Students. Admin dashboard and analyze the users enrolled and transactions on courses. Handle user registration and login. Integrate payment with the backend. Built user friendly responsive pages with easy to navigate between pages. Handle user comments and admin posts.',
        tech: ["React.js", "Redux.js", "Tailwind CSS"], link: 'https://www.sirtz.com/'
    },
    {
        name: 'Mansoura Outlet', image: '/images/outlet.png', details: `An e-commerce platform that offers a comprehensive directory of clothing stores in the city of Mansoura. The website is structured based on the city's streets, with each street featuring a curated selection of clothing boutiques`,
        tech: ["React.js", "Redux.js", "Tailwind CSS"], link: 'https://abc-mansoura.com/'
    },
    {
        name: 'DGym', image: '/images/first-work-freelance.png', details: `gym's platform is ideal for sports facilities, fitness centres, gyms, personal trainers, and anyone who wants to streamline their business management processes. Dgym's reports provide valuable insights into business performance, enabling you to make data-driven decisions to maximize profits It simplifies registration, memberships, member feedback, online payments. Accessible from any device.`,
        tech: ["React.js", "Redux.js", "Tailwind CSS"], links: links
    }
]

const ScholarshipProjects = [{
    name: 'Shop', image: '/images/depi-project.png', details: 'E commerce for clothes.',
    tech: ["React.js", "Tailwind CSS", 'Node.js', 'Express.js', 'MongoDB'], link: 'https://vite-React.js-chi-jet.vercel.app/'
}
]


const personalProjects = [
    {
        name: 'Fruits',
        image: '/images/fruit.png',
        details: 'Interactive quiz application with real-time features.',
        tech: ["Next.js", "React.js", "TAILWIND CSS", "NODE JS", "MONGOOS", "MONGO_DB"],
        link: 'https://food-menu-bice.vercel.app/'
    },

    {
        name: 'Questions Game',
        image: '/images/questions.png',
        details: 'Interactive quiz application with real-time features.',
        tech: ["HTML", "CSS", "JAVASCRIPT", "React.js", "MATERIAL-UI", "FIREBASE", "REDUX"],
        link: 'https://questions-game-cd095.web.app/'
    },
    {
        name: 'Crypto App',
        image: '/images/crypto_project.png',
        details: 'Cryptocurrency tracker and data visualization app.',
        tech: ["HTML", "CSS", "JAVASCRIPT", "React.js", "Anti Design"],
        link: 'https://yousefjoe1.github.io/crypto-project/'
    },
    {
        name: 'Memory Game',
        image: '/images/mem-game.png',
        details: 'Card matching game to test cognitive skills.',
        tech: ["HTML", "CSS", "JAVASCRIPT", "React.js", "React.js-TYPESCRIPT", "TAILWIND_CSS"],
        link: 'https://yousefjoe1.github.io/Memory-Game/'
    },
    {
        name: 'Travel Advisor',
        image: '/images/Travel_advisor_project.png',
        details: 'Location-based app to find restaurants and hotels.',
        tech: ["HTML", "CSS", "JAVASCRIPT", "React.js", "GOOGLE MAPS", "MATERIAL-UI"],
        link: 'https://yousefjoe1.github.io/simple-React.js-travel-advisor-app/'
    },
    {
        name: 'Amazon Clone',
        image: '/images/amazontemp.png',
        details: 'E-commerce interface clone featuring product listings.',
        tech: ["HTML", "CSS", "JAVASCRIPT", "React.js"],
        link: 'https://yousefjoe1.github.io/amazone1/'
    },

    {
        name: 'Product Landing page',
        image: '/images/product-landingpage.png',
        details: 'High-conversion landing page for digital or physical products.',
        tech: ["HTML", "CSS", "JAVASCRIPT", "React.js", "React.js-TYPESCRIPT", "TAILWIND_CSS"],
        link: 'https://yousefjoe1.github.io/Simple-Product-Landing-Page/'
    },
    {
        name: 'Calculator',
        image: '/images/calc.png',
        details: 'A clean, functional web calculator.',
        tech: ["HTML", "CSS", "JAVASCRIPT", "React.js", "TYPESCRIPT", "TAILWIND CSS"],
        link: 'https://yousefjoe1.github.io/Simple-Calculator/'
    },
    {
        name: 'LinkedIn Clone',
        image: '/images/linkedin.png',
        details: 'Social media UI clone focusing on professional networking.',
        tech: ["HTML", "CSS", "JAVASCRIPT", "React.js", "React.js_BOOTSTRAP", "BOOTSTRAP"],
        link: 'https://yousefjoe1.github.io/linkedIn-clone-2022/'
    },
    {
        name: 'Discord Clone',
        image: '/images/discord.png',
        details: 'Real-time communication platform interface.',
        tech: ["HTML", "CSS", "JAVASCRIPT", "React.js", "React.js_BOOTSTRAP", "BOOTSTRAP"],
        link: 'https://yousefjoe1.github.io/discord-clone/#/'
    },
    {
        name: 'Food Shopping Cart',
        image: '/images/shoppingcart.png',
        details: 'Shopping cart functionality for food ordering.',
        tech: ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP", "React.js"],
        link: 'https://yousefjoe1.github.io/my-shopping-cart/#/shopping-cart'
    },

    {
        name: 'Words Game',
        image: '/images/wordgame.png',
        details: 'Word-based puzzle game.',
        tech: ["HTML", "CSS", "JAVASCRIPT", "React.js", "TYPESCRIPT", "TAILWIND CSS"],
        link: 'https://yousefjoe1.github.io/Words-Game/'
    },
    {
        name: 'Vegetables Shopping Cart',
        image: '/images/veg-cart.png',
        details: 'E-commerce cart specifically for grocery shopping.',
        tech: ["HTML", "CSS", "JAVASCRIPT", "React.js", "REDUX/TOOLKIT"],
        link: 'https://yousefjoe1.github.io/vegetables-shopping-cart/'
    },
    {
        name: 'Weather App',
        image: '/images/weatherapp.png',
        details: 'Real-time weather forecasting using API data.',
        tech: ["HTML", "CSS", "JAVASCRIPT"],
        link: 'https://yousefjoe1.github.io/simple-weather-app-js/'
    },
    {
        name: 'Landing page',
        image: '/images/temp1.png',
        details: 'Bootstrap-powered responsive landing page.',
        tech: ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP", "React.js"],
        link: 'https://yousefjoe1.github.io/temp-2n/#/'
    },
    {
        name: 'Advice Generator',
        image: '/images/advice-generator.png',
        details: 'App that fetches and displays random pieces of advice.',
        tech: ["HTML", "CSS", "JAVASCRIPT", "React.js"],
        link: 'https://yousefjoe1.github.io/advice-generator-app/'
    }
];

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from "./ProjectCard";

// Register ScrollTrigger plugin
gsap.registerPlugin(useGSAP, ScrollTrigger);

const Projects = () => {
    const container = useRef(null);

    useGSAP(() => {
        // Target all elements with the class 'project-card' inside our container
        gsap.from(".project-card", {
            y: 100,            // Start 100px below original position
            opacity: 0,        // Start invisible
            duration: 1.2,     // Animation length
            stagger: 0.2,      // Delay between each card (0.2s)
            delay: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: container.current,
                start: "top 100%", // Starts when the top of the container hits 80% of viewport height
                toggleActions: "play none none none", // Plays once
            }
        });
    }, { scope: container });

    return (
        <section className="py-12 px-4 max-w-7xl mx-auto overflow-hidden">
            <div className="flex flex-col justify-center items-center text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                    My <span className="bg-linear-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                        Projects
                    </span>
                </h2>

            </div>

            <div className="bg-brand-secondary rounded-2xl p-2 mx-auto w-1/2 mt-8">
                <h3 className='bg-linear-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent text-3xl text-center font-semibold'>
                    Real World Projects
                </h3>
            </div>

            {/* Added 'project-card' class to the map for GSAP targeting */}
            <div ref={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {myProjects.map((project, index) => (
                    <div key={index} className="project-card">
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>

            <div className="bg-brand-secondary rounded-2xl p-2 mx-auto w-1/2 mt-12">

                <h3 className='bg-linear-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent text-3xl text-center font-semibold'>
                    DEPI Scholarship Project
                </h3>
            </div>

            <div ref={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {ScholarshipProjects.map((project, index) => (
                    <div key={index} className="project-card">
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>




            <div className="bg-brand-secondary rounded-2xl p-2 mx-auto w-1/2 mt-12">

                <h3 className='bg-linear-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent text-3xl text-center font-semibold'>
                    Personal & Practical Project
                </h3>
            </div>

            {/* Added 'project-card' class to the map for GSAP targeting */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {personalProjects.map((project, index) => (
                    <div key={index} className="project-card">
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Projects;