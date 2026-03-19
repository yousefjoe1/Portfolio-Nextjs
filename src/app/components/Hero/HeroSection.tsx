'use client'
import { myInfo } from '@/constants/infoData'
import { SplitText } from 'gsap/SplitText';
import { gsap } from 'gsap';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import LeftSection from './LeftSection';

const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isFixed, setIsFixed] = useState(false);
    const { contextSafe } = useGSAP({ scope: containerRef });

    // تفعيل الـ Plugin
    if (typeof window !== 'undefined') {
        gsap.registerPlugin(SplitText);
    }

    // الأنيميشن المبدئي (الحالة المكسورة)
    useGSAP(() => {
        const elements = gsap.utils.toArray('.split') as HTMLElement[];

        elements.forEach((el) => {
            const split = new SplitText(el, { type: 'chars' });

            // بعثرة الحروف بشكل عشوائي
            gsap.set(split.chars, {
                x: () => (Math.random() - 0.5) * 40,
                y: () => (Math.random() - 0.5) * 25,
                rotation: () => (Math.random() - 0.5) * 30,
                opacity: 0.8,
                filter: "blur(0.5px)"
            });
        });

        // حركة اهتزاز خفيفة للكروت وهي مكسورة
        gsap.to('.broken-card', {
            x: "random(-2, 2)",
            y: "random(-2, 2)",
            repeat: -1,
            yoyo: true,
            duration: 0.1,
            ease: "none"
        });
    }, { scope: containerRef });

    // Function التصليح
    // eslint-disable-next-line react-hooks/refs
    const handleFix = contextSafe(() => {
        setIsFixed(true);

        // 1. وقف اهتزاز الكروت ورجعها مكانها
        gsap.killTweensOf('.broken-card');
        gsap.to('.broken-card', {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)"
        });

        // 2. تجميع الحروف المكسورة
        const allChars = containerRef.current?.querySelectorAll('.split div');
        if (allChars) {
            gsap.to(allChars, {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                stagger: {
                    amount: 0.5,
                    from: "random"
                },
                ease: "elastic.out(1, 0.75)"
            });
        }
    });

    return (
        <section ref={containerRef} className='relative grid lg:grid-cols-2 gap-4 min-h-[85vh] p-4'>

            {/* زرار التصليح - يختفي بعد الضغط */}
            {!isFixed && (
                <button
                    onClick={handleFix}
                    className='absolute -bottom-10 right-8 z-[100] bg-brand-error text-white px-8 py-4 rounded-full font-black uppercase tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:scale-110 active:scale-95 transition-transform animate-bounce'
                >
                    Fix Section
                </button>
            )}

            {/* Left Column - Hero Image */}
            <div className={`broken-card transition-all duration-500 ${!isFixed ? 'rotate-[-2deg] scale-95' : ''}`}>
                <LeftSection isFixed={isFixed} />
            </div>

            {/* Right Column - Info Cards */}
            <div className='bg-brand-secondary/30 backdrop-blur-md p-3 md:p-4 rounded-2xl flex flex-col justify-between gap-4 border border-brand-border/50'>

                {/* Experience Card */}
                <div className={`broken-card bg-brand-bg p-5 rounded-xl shadow-lg border border-brand-border ${!isFixed ? '' : ''}`}>
                    <h2 className={`text-lg md:text-xl font-bold split leading-relaxed ${!isFixed ? 'glitch-text' : ''}`}>
                        <span className='text-brand-primary'>Front-End Developer</span> with 4+ years of hands-on experience building web applications using React & Next.js.
                    </h2>
                </div>

                {/* Philosophy Card */}
                <div className={`broken-card bg-brand-bg p-5 rounded-xl shadow-lg border border-brand-border ${!isFixed ? 'rotate-1' : ''}`}>
                    <h2 className='text-lg md:text-xl font-bold split leading-relaxed'>
                        I’ve led teams and delivered complex UI solutions.
                        <span className='text-brand-warning'> Always learning</span>, always coding.
                    </h2>
                </div>

                {/* Goal Card */}
                <div className={`broken-card bg-brand-bg p-5 rounded-xl shadow-lg border border-brand-border ${!isFixed ? 'translate-x-2' : ''}`}>
                    <h2 className='text-lg md:text-xl font-bold split leading-relaxed'>
                        I’m looking to join innovative teams where I can solve real-world problems.
                    </h2>
                </div>

                {/* Social Links Row */}
                <div className="relative flex items-center gap-3 justify-between min-h-[80px]">
                    {myInfo.map((info, id) => (
                        <a
                            key={id}
                            target='_blank'
                            href={info.link}
                            rel="noopener noreferrer"
                            // ضفنا inline style عشان الـ random values اللي Tailwind مش هيعرف يعملها dynamic
                            style={!isFixed ? {
                                transform: `
                    translate(${(id % 2 === 0 ? id * 10 : id * -12)}px, ${(id % 2 === 0 ? 15 : -10)}px) 
                    rotate(${(id * 15) - 30}deg)
                    scale(${0.9 + (id * 0.05)})
                `,
                                zIndex: id,
                                opacity: 0.8
                            } : {
                                transform: 'translate(0, 0) rotate(0) scale(1)',
                                zIndex: 10,
                                opacity: 1
                            }}
                            className={`broken-card bg-brand-bg hover:bg-brand-primary hover:text-white transition-all duration-700 p-4 rounded-xl flex items-center justify-center shadow-md border border-brand-border w-full
                ${!isFixed ? 'blur-[0.5px] grayscale-[0.5]' : 'blur-0 grayscale-0'}`}
                        >
                            <span className={`text-2xl transition-transform duration-500 ${!isFixed ? 'scale-75' : 'scale-100'}`}>
                                {info.icons}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSection;