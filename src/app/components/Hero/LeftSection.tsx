'use client';

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

interface Props {
    isFixed?: boolean;
}

const LeftSection = ({ isFixed = false }: Props) => {
    const techStack = [
        { src: '/images/icone-html-orange.png', alt: 'HTML' },
        { src: '/images/nextjs-original.png', alt: 'Next.js' },
        { src: '/images/nodejs.png', alt: 'Node.js' },
        { src: '/images/React-icon.svg.png', alt: 'React' }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const container = useRef(null);

    // تبديل الأيقونات كل 3 ثواني
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentIndex((prev) => (prev + 1) % techStack.length);
    //     }, 3000);
    //     return () => clearInterval(interval);
    // }, [techStack.length]);

    // جوه LeftSection.tsx
    useEffect(() => {
        // لو السيستم اتصلح، متعملش Interval أصلاً
        if (isFixed) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % techStack.length);
        }, 1400);

        return () => clearInterval(interval);
    }, [isFixed, techStack.length]); // ضفنا isFixed هنا عشان الـ Effect يحس بالتغيير

    useGSAP(() => {
        if (isFixed) {
            // دوران المدار (Orbit)
            gsap.to(".tech-orbit", {
                rotate: 360,
                duration: 8,
                repeat: -1,
                ease: "none"
            });
            // دوران عكسي للأيقونة عشان تفضل عدلة (Counter-rotate)
            gsap.to(".orbit-icon-inner", {
                rotate: -360,
                duration: 8,
                repeat: -1,
                ease: "none"
            });
        } else {
            // حالة الـ Broken: اهتزاز عشوائي
            gsap.to(".broken-part", {
                x: "random(-2, 2)",
                y: "random(-2, 2)",
                duration: 0.1,
                repeat: -1,
                yoyo: true
            });
        }
    }, { scope: container, dependencies: [isFixed] });

    return (
        <div ref={container} className={`p-4 rounded-xl backdrop-blur-md bg-brand-secondary/50 flex flex-col items-start transition-all duration-700 h-full
            ${!isFixed ? 'border-dashed border-2 border-brand-error/30 -rotate-20' : 'border-none'}`}>

            {/* الجزء العلوي: الصورة والاسم (رجعوا مكانهم) */}
            <div className={`flex items-center lg:flex-row flex-col gap-4 mb-8 transition-all duration-1000 w-full broken-part
                ${!isFixed ? 'translate-x-[-10px] -skew-y-2' : 'translate-x-0 skew-y-0'}`}>

                <div className={`relative transition-transform duration-700 ${!isFixed ? 'rotate-[10deg] scale-90' : 'rotate-0 scale-100'}`}>
                    <Image
                        src="/images/youssef.png"
                        className={`rounded-full object-contain transition-all ${!isFixed ? 'grayscale contrast-125' : ''}`}
                        alt="Hero"
                        width={180}
                        height={180}
                    />
                    {!isFixed && <div className="absolute inset-0 bg-brand-error/20 rounded-full animate-pulse blur-xl -z-10"></div>}
                </div>

                <h2 className={`lg:text-2xl text-xl bg-brand-secondary/50 p-4 rounded-2xl w-full font-bold transition-all duration-700
                    ${!isFixed ? 'text-brand-error line-through opacity-60' : 'text-primary border border-brand-border/30'}`}>
                    Hello, I am Youssef Mahmoud
                </h2>
            </div>

            {/* سيكشن المهارات الجديد (The Orbit) */}
            <div className="relative mt-10 flex flex-col items-center justify-center w-full min-h-[280px]">

                {/* النواة: Skills */}
                <div className="relative z-20">
                    <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center font-black transition-all duration-500 broken-part
                        ${isFixed ? 'border-brand-primary bg-brand-bg shadow-[0_0_25px_rgba(59,130,246,0.2)]' : 'border-brand-error text-brand-error'}`}>
                        {isFixed ? 'SKILLS' : 'ERR_404'}
                    </div>
                </div>

                {/* المدار (Orbit) */}
                <div className={`absolute w-56 h-56 tech-orbit flex items-center justify-center transition-opacity duration-500 ${!isFixed ? 'opacity-40' : 'opacity-100'}`}>

                    {/* الدائرة الوهمية للمدار */}
                    <div className={`absolute inset-0 border rounded-full transition-colors ${isFixed ? 'border-brand-primary/20 border-dashed' : 'border-brand-error/20'}`}></div>

                    {/* الأيقونة اللي بتلف */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 orbit-icon-inner">
                        <div className={`w-14 h-14 p-2 rounded-xl bg-brand-bg border transition-all duration-500 flex items-center justify-center shadow-xl
                            ${isFixed ? 'border-brand-primary/50' : 'sepia invert scale-75 rotate-45 border-brand-error'}`}>
                            <Image
                                key={currentIndex}
                                src={techStack[currentIndex].src}
                                alt="tech"
                                width={35} height={35}
                                className="object-contain animate-in fade-in zoom-in duration-500"
                            />
                        </div>
                    </div>
                </div>

                {/* تيار البرق/الكهرباء (Optional Glow) */}
                {isFixed && (
                    <div className="absolute w-1 h-20 bg-gradient-to-t from-brand-primary/0 via-brand-primary/40 to-brand-primary/0 animate-pulse"></div>
                )}
            </div>
        </div>
    )
}

export default LeftSection;