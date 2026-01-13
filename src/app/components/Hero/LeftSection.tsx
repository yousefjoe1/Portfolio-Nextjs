'use client';

import Image from 'next/image'
import { useState, useEffect } from 'react'

const LeftSection = () => {
    const techStack = [
        { src: '/images/icone-html-orange.png', alt: 'HTML' },
        // { src: '/images/javascript.png', alt: 'JavaScript' },
        { src: '/images/nextjs-original.png', alt: 'Next.js' },
        { src: '/images/nodejs.png', alt: 'Node.js' },
        { src: '/images/React-icon.svg.png', alt: 'React' }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // setIsAnimating(true);

            setCurrentIndex((prev) => (prev + 1) % techStack.length);
            // setTimeout(() => {
            //     setIsAnimating(false);
            // }, 2200);

        }, 1400);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='p-4 rounded-xl lg:col-span-2 md:col-span-2 bg-brand-secondary/50 flex flex-col items-start'>
            <div className='flex items-center lg:flex-row flex-col gap-4 mb-8'>
                <Image
                    src="/images/youssef.png"
                    className='rounded-full object-contain'
                    alt="Hero"
                    width={200}
                    height={200}
                />
                <h2 className='lg:text-3xl text-xl bg-brand-secondary/50 p-3 rounded-2xl w-full font-bold'>Hello, I am Youssef Mahmoud</h2>
            </div>

            {/* Animated Tech Stack */}
            <div className="relative mt-2 flex flex-col items-center w-full">
                {/* First Circle (Always visible) */}
                <div className="relative z-10">
                    <div className="w-32 h-32 rounded-full border-2 shadow-lg flex items-center justify-center font-semibold text-lg">
                        Skills
                    </div>
                </div>


                <div className="absolute top-16 left-1/2 -translate-x-1/2 h-32">
                    <svg
                        className="w-8 h-32 animate-lightning"
                        viewBox="0 0 40 120"
                        style={{
                            animation: 'lightning 1.5s infinite',
                            opacity: 0,
                            filter: 'drop-shadow(0 0 8px #60a5fa)' // Adds the electric glow
                        }}
                    >
                        {/* The Jagged Thunder Path */}
                        <path
                            d="M 20 0 L 10 30 L 25 25 L 5 60 L 30 55 L 10 100"
                            stroke="url(#lightning-gradient)"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <defs>
                            <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                                <stop offset="20%" stopColor="#bae6fd" stopOpacity="1" />
                                <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                                <stop offset="80%" stopColor="#bae6fd" stopOpacity="1" />
                                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>


                {/* Second Circle (Animated) */}
                <div className="relative z-10 top-9">
                    <div
                        className={`w-32 h-32 rounded-full border-4 bg-white shadow-lg flex items-center justify-center transition-all duration-300`}
                    >
                        <div
                            key={currentIndex}
                            className="animate-techImage"
                        >
                            <Image
                                src={techStack[currentIndex].src}
                                className='object-contain'
                                alt={techStack[currentIndex].alt}
                                width={60}
                                height={60}
                            />
                        </div>
                    </div>
                </div>
            </div>


            <style jsx>{`
    @keyframes lightning {
        0% {
            opacity: 0;
            transform: scaleY(0) skewX(0deg);
            transform-origin: top;
        }
        /* The "Strike" - fast and bright */
        5% {
            opacity: 1;
            transform: scaleY(1.2) skewX(-5deg);
        }
        7% {
            opacity: 0.2;
            transform: scaleY(1) skewX(5deg);
        }
        9% {
            opacity: 1;
            transform: scaleY(1) skewX(0deg);
        }
        /* Fade out phase */
        25% {
            opacity: 0;
            transform: scaleY(1);
        }
        100% {
            opacity: 0;
        }
    }

    .animate-lightning {
        /* Faster timing for a more "shocking" feel */
        animation: lightning 1.5s ease-out infinite;
    }
`}</style>

        </div>
    )
}

export default LeftSection