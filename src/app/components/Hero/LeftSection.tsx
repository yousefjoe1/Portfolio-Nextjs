'use client';

import Image from 'next/image'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

interface Props {
    isFixed?: boolean;
}

const techStack = [
    { src: '/images/icone-html-orange.png', alt: 'HTML' },
    { src: '/images/nextjs-original.png', alt: 'Next.js' },
    { src: '/images/nodejs.png', alt: 'Node.js' },
    { src: '/images/React-icon.svg.png', alt: 'React' },
];

function getOrbitPosition(index: number, total: number, radiusPx: number) {
    const angleDeg = (360 / total) * index - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
        x: Math.cos(angleRad) * radiusPx,
        y: Math.sin(angleRad) * radiusPx,
    };
}

const ORBIT_RADIUS = 112;

const LeftSection = ({ isFixed = false }: Props) => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        if (isFixed) {
            // ── Stop all broken tweens ─────────────────────────────────────
            gsap.killTweensOf(['.broken-part', '.orbit-icon-box', '.left-container']);

            // ── Restore outer container rotation ──────────────────────────
            gsap.to('.left-container', {
                rotation: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
            });

            // ── Restore broken-part positions ─────────────────────────────
            gsap.to('.broken-part', {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.7)',
            });

            // ── Restore icon boxes ────────────────────────────────────────
            gsap.to('.orbit-icon-box', {
                rotation: 0,
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.7)',
            });

            // ── Start orbit spin ──────────────────────────────────────────
            gsap.to('.tech-orbit', {
                rotation: 360,
                duration: 8,
                repeat: -1,
                ease: 'none',
            });

            // ── Counter-rotate icon wrappers to keep icons upright ────────
            gsap.to('.orbit-icon-inner', {
                rotation: -360,
                duration: 8,
                repeat: -1,
                ease: 'none',
            });

        } else {
            // ── Stop orbit tweens ─────────────────────────────────────────
            gsap.killTweensOf(['.tech-orbit', '.orbit-icon-inner']);

            // ── Tilt the outer container ──────────────────────────────────
            gsap.set('.left-container', { rotation: -30 });

            // ── Offset the top row ────────────────────────────────────────
            gsap.set('.broken-part', { x: -10 });

            // ── Tilt & shrink icon boxes ──────────────────────────────────
            gsap.set('.orbit-icon-box', { rotation: 45, scale: 0.75 });

            // ── Shake broken elements ─────────────────────────────────────
            // gsap.to('.broken-part', {
            //     x: 'random(-2, 2)',
            //     y: 'random(-2, 2)',
            //     duration: 1.1,
            //     repeat: -1,
            //     yoyo: true,
            // });
        }

    }, { scope: container, dependencies: [isFixed] });

    return (
        // ✅ Outer ref wrapper — neutral, no transforms on it
        <div ref={container} className="h-full">

            {/*
              .left-container — GSAP owns rotation (-3deg broken / 0deg fixed)
              ✅ Removed: -rotate-20 (Tailwind)
            */}
            <div className={`left-container p-4 rounded-xl backdrop-blur-md bg-brand-secondary/50 flex flex-col items-start transition-colors transition-border duration-700 h-full
                ${!isFixed
                    ? 'border-dashed border-2 border-brand-error/30'
                    : 'border-none'
                }`}
            >
                {/*
                  .broken-part — GSAP owns x/y (x:-10 broken / x:0 fixed)
                  ✅ Removed: translate-x-[-10px], translate-x-0 (Tailwind)
                */}
                <div className="flex items-center lg:flex-row flex-col gap-4 mb-8 w-full broken-part">

                    <div className="relative">
                        <Image
                            src="/images/youssef.png"
                            className={`rounded-full object-contain transition-all duration-700
                                ${!isFixed ? 'grayscale contrast-125' : ''}`}
                            alt="Hero"
                            width={180}
                            height={180}
                        />
                        {!isFixed && (
                            <div className="absolute inset-0 bg-brand-error/20 rounded-full animate-pulse blur-xl -z-10" />
                        )}
                    </div>

                    <h2 className={`lg:text-2xl text-xl bg-brand-secondary/50 p-4 rounded-2xl w-full font-bold transition-all duration-700
                        ${!isFixed
                            ? 'text-brand-error line-through opacity-60'
                            : 'text-primary border border-brand-border/30'
                        }`}
                    >
                        Hello, I am Youssef Mahmoud
                    </h2>
                </div>

                {/* Skills orbit */}
                <div className="relative mt-10 flex flex-col items-center justify-center w-full min-h-[280px]">

                    {/* Center nucleus — broken-part so GSAP shakes it */}
                    <div className="relative z-20">
                        <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center font-black transition-all duration-500 broken-part
                            ${isFixed
                                ? 'border-brand-primary bg-brand-bg shadow-[0_0_25px_rgba(59,130,246,0.2)]'
                                : 'border-brand-error text-brand-error'
                            }`}
                        >
                            {isFixed ? 'SKILLS' : 'ERR_404'}
                        </div>
                    </div>

                    {/* Orbit ring — GSAP rotates via .tech-orbit */}
                    <div className={`absolute w-56 h-56 tech-orbit transition-opacity duration-500
                        ${!isFixed ? 'opacity-40' : 'opacity-100'}`}
                    >
                        {/* Dashed ring border */}
                        <div className={`absolute inset-0 border rounded-full transition-colors
                            ${isFixed ? 'border-brand-primary/20 border-dashed' : 'border-brand-error/20'}`}
                        />

                        {/* Icons distributed around the circle */}
                        {techStack.map((tech, index) => {
                            const { x, y } = getOrbitPosition(index, techStack.length, ORBIT_RADIUS);
                            return (
                                <div
                                    key={tech.alt}
                                    style={{
                                        position: 'absolute',
                                        left: `calc(50% + ${x}px - 28px)`,
                                        top: `calc(50% + ${y}px - 28px)`,
                                    }}
                                    // GSAP counter-rotates this to keep icon upright
                                    className="orbit-icon-inner"
                                >
                                    {/*
                                      .orbit-icon-box — GSAP owns rotation + scale
                                      ✅ Removed: scale-75 rotate-45 (Tailwind)
                                    */}
                                    <div className={`orbit-icon-box w-14 h-14 p-2 rounded-xl bg-brand-bg border transition-colors duration-500 flex items-center justify-center shadow-xl
                                        ${isFixed
                                            ? 'border-brand-primary/50'
                                            : 'sepia invert border-brand-error'
                                        }`}
                                    >
                                        <Image
                                            src={tech.src}
                                            alt={tech.alt}
                                            width={35}
                                            height={35}
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {isFixed && (
                        <div className="absolute w-1 h-20 bg-gradient-to-t from-brand-primary/0 via-brand-primary/40 to-brand-primary/0 animate-pulse" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeftSection;