'use client';

import Image from 'next/image'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { BrokenGlass } from './BrokenGlass';

interface Props {
    isFixed?: boolean;
}


const TEXT_FRAGMENTS = [
    { text: 'I have multiple Full Stack projects ', x: -14, y: -10, rotation: -12, blur: 2 },
    { text: 'in my GitHub as personal practical projects ', x: 20, y: 8, rotation: 7, blur: 1.5 },
    { text: 'that describe my skills in Full Stack ', x: -8, y: 12, rotation: -5, blur: 2.5 },
    { text: 'with Next.js · React.js · Node.js · Prisma · Supabase · MongoDB.', x: 12, y: -6, rotation: 9, blur: 1 },
];

const TEXT_FRAGMENTS_2 = [
    { text: 'Handled 70% of the graduation project ', x: 16, y: -9, rotation: 10, blur: 2 },
    { text: 'in (DEPI 6 months scholarship). ', x: -18, y: 7, rotation: -8, blur: 1.5 },
    { text: 'While I focus on Front-end and leading the team, I have a solid grasp of Node.js and CRUD operations, ', x: 10, y: 13, rotation: 6, blur: 2.5 },
    { text: 'ensuring seamless integration with APIs.', x: -12, y: -6, rotation: -11, blur: 1 },
];

const LeftSection = ({ isFixed = false }: Props) => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        if (isFixed) {
            gsap.killTweensOf([
                '.broken-part',
                '.left-container', '.text-fragment', '.text-fragment-2',
            ]);

            gsap.to('.left-container', {
                rotation: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
            });

            gsap.to('.broken-part', {
                x: 0, y: 0, scale: 1,
                duration: 0.6,
                ease: 'back.out(1.7)',
            });

            // Snap fragments back — both paragraphs, staggered together
            gsap.to('.text-fragment', {
                x: 0,
                y: 0,
                rotation: 0,
                filter: 'blur(0px)',
                opacity: 1,
                color: 'inherit',
                duration: 0.65,
                stagger: 0.1,
                ease: 'back.out(2)',
            });

            gsap.to('.text-fragment-2x', {
                x: 0,
                y: 0,
                rotation: 0,
                filter: 'blur(0px)',
                opacity: 1,
                color: 'inherit',
                duration: 0.65,
                stagger: 0.1,
                delay: 0.45,
                ease: 'back.out(2)',
            });

            gsap.to('.tech-orbit', { rotation: 360, duration: 8, repeat: -1, ease: 'none' });
            gsap.to('.orbit-icon-inner', { rotation: -360, duration: 8, repeat: -1, ease: 'none' });

        } else {
            gsap.killTweensOf(['.tech-orbit', '.orbit-icon-inner']);

            gsap.set('.left-container', { rotation: -10 });
            gsap.set('.broken-part', { x: -10 });
            gsap.set('.orbit-icon-box', { rotation: 45, scale: 0.75 });

            // Scatter first paragraph fragments
            TEXT_FRAGMENTS.forEach((frag, i) => {
                gsap.set(`.text-fragment-${i}`, {
                    x: frag.x,
                    y: frag.y,
                    rotation: frag.rotation,
                    filter: `blur(${frag.blur}px)`,
                    opacity: 0.55,
                });
            });

            // Scatter second paragraph fragments
            TEXT_FRAGMENTS_2.forEach((frag, i) => {
                gsap.set(`.text-fragment-2x-${i}`, {
                    x: frag.x,
                    y: frag.y,
                    rotation: frag.rotation,
                    filter: `blur(${frag.blur}px)`,
                    opacity: 0.55,
                });
            });


        }

    }, { scope: container, dependencies: [isFixed] });

    return (
        <div ref={container} className="h-full">
            <div
                className={`left-container p-4 rounded-xl backdrop-blur-md bg-brand-secondary/50 flex flex-col items-start transition-colors duration-700 h-full
                    ${!isFixed ? 'border-dashed border-2 border-brand-error/30' : 'border-none'}`}
            >
                {/* Avatar + name */}
                <div className="flex items-center lg:flex-row flex-col gap-4 mb-8 w-full broken-part">
                    <div className="relative">
                        <Image
                            src="/images/youssef.png"
                            className={`rounded-full object-contain transition-all duration-700 ${!isFixed ? 'grayscale contrast-125' : ''}`}
                            alt="Hero"
                            width={180}
                            height={180}
                        />
                        {!isFixed && (
                            <div className="absolute inset-0 bg-brand-error/20 rounded-full animate-pulse blur-xl -z-10" />
                        )}
                    </div>

                    <h2
                        className={`lg:text-2xl text-xl bg-brand-secondary/50 p-4 rounded-2xl w-full font-bold transition-all duration-700
                            ${!isFixed ? 'text-brand-error line-through opacity-60' : 'text-primary border border-brand-border/30'}`}
                    >
                        Hello, I am Youssef Mahmoud
                    </h2>
                </div>

                {/* ── Fragmented paragraph ───────────────────────────────── */}
                {/*
                    Key insight: all spans live inside a single <p> in NORMAL FLOW.
                    GSAP pushes them off with x/y/rotation transforms (they stay
                    in flow — only visually displaced). On fix, x:0 y:0 rotation:0
                    brings them straight back to their natural inline positions,
                    so the sentence reads correctly without any layout change.
                */}
                <div className="relative w-full rounded-xl overflow-visible">
                    <p className={`text-lg leading-relaxed font-medium transition-colors duration-500
                        ${isFixed ? 'text-white/70' : 'text-brand-error/80'}`}
                    >
                        {TEXT_FRAGMENTS.map((frag, i) => (
                            <span
                                key={i}
                                className={`text-fragment text-fragment-${i} inline`}
                                style={{ display: 'inline-block' }}
                            >
                                {frag.text}
                            </span>
                        ))}
                    </p>

                    {!isFixed && <BrokenGlass isFixed={isFixed} />}
                </div>

                {/* ── Second fragmented paragraph ────────────────────────── */}
                <div className="relative w-full rounded-xl overflow-visible mt-4">
                    <p className={`text-lg leading-relaxed font-medium transition-colors duration-500
                        ${isFixed ? 'text-white/70' : 'text-brand-error/80'}`}
                    >
                        {TEXT_FRAGMENTS_2.map((frag, i) => (
                            <span
                                key={i}
                                className={`text-fragment-2x text-fragment-2x-${i} inline`}
                                style={{ display: 'inline-block' }}
                            >
                                {frag.text}
                            </span>
                        ))}
                    </p>

                    {!isFixed && <BrokenGlass isFixed={isFixed} />}
                </div>
            </div>
        </div>
    );
};

export default LeftSection;