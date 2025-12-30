'use client';

const myProjects = [
    {
        name: 'LevelUp ESG®', image: '/images/levelup.png', details: `LevelUp ESG® is a London-based AI platform transforming corporate carbon emissions, ESG risk management and assurance. We empower organisations with AI-driven solutions that turn sustainability and data challenges into strategic value, fostering environmental stewardship and business success.`,
        tech: ["React.js", "Next.js", "Tailwind CSS", "Shadcn-ui"], link: 'https://levelupesg.co/'
    },
    {
        name: 'Eskan El Mansoura', image: '/images/eskan.png', details: 'A real estate website that offers various properties. You can visit a project to choose what suits you from shops or apartments, also there are filters by price or unit number or block location or meter price and much more of complex data handling, and various features. The project has a dashboard for admin to control the 90% of the data.',
        tech: ["SASS", "React.js", "Redux.js", "Tailwind CSS", "Chakra-UI", "Swiper"], link: 'https://eskanmansoura.com/'
    },
    {
        name: 'Abo Taleb', image: '/images/abo-taleb.png', details: 'Abo Taleb is a sophisticated online platform that offers comprehensive English courses tailored specifically for Military Bases Students. Admin dashboard and analyze the users enrolled and transactions on courses. Handle user registration and login. Integrate payment with the backend. Built user friendly responsive pages with easy to navigate between pages. Handle user comments and admin posts.',
        tech: ["React.js", "Redux.js", "Tailwind CSS"], link: 'https://www.sirtz.com/'
    },
    {
        name: 'Mansoura Outlet', image: '/images/outlet.png', details: `An e-commerce platform that offers a comprehensive directory of clothing stores in the city of Mansoura. The website is structured based on the city's streets, with each street featuring a curated selection of clothing boutiques`,
        tech: ["React.js", "Redux.js", "Tailwind CSS"], link: 'https://www.sirtz.com/'
    },
    {
        name: 'DGym', image: '/images/first-work-freelance.png', details: `gym's platform is ideal for sports facilities, fitness centres, gyms, personal trainers, and anyone who wants to streamline their business management processes. Dgym's reports provide valuable insights into business performance, enabling you to make data-driven decisions to maximize profits It simplifies registration, memberships, member feedback, online payments. Accessible from any device.`,
        tech: ["React.js", "Redux.js", "Tailwind CSS"], link: 'https://www.sirtz.com/'
    }
]
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

                <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
                    Here are some of my recent projects. Each project showcases
                    different skills and technologies I&apos;ve worked with.
                </p>
            </div>

            <h3 className='bg-linear-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent text-3xl text-center mt-8 font-semibold'>
                Real World Projects
            </h3>

            {/* Added 'project-card' class to the map for GSAP targeting */}
            <div ref={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {myProjects.map((project, index) => (
                    <div key={index} className="project-card">
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;