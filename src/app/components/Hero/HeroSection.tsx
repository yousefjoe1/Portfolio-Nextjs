'use client'

import { myInfo } from '@/constants/infoData'
import { SplitText } from 'gsap/SplitText'
import { gsap } from 'gsap'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import LeftSection from './LeftSection'
import { BrokenGlass } from './BrokenGlass'


gsap.registerPlugin(SplitText)


interface SocialLinkStyleProps {
    id: number
    isFixed: boolean
}


function getSocialLinkStyle({ id, isFixed }: SocialLinkStyleProps): React.CSSProperties {
    if (isFixed) {
        return { transform: 'translate(0,0) rotate(0deg) scale(1)', zIndex: 10, opacity: 1 }
    }

    const tx = id % 2 === 0 ? id * 10 : id * -12
    const ty = id % 2 === 0 ? 15 : -10
    const rot = id * 15 - 30
    const sc = 0.9 + id * 0.05

    return {
        transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${sc})`,
        zIndex: id,
        opacity: 0.8,
    }
}


const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const splitInstancesRef = useRef<SplitText[]>([])
    const [isFixed, setIsFixed] = useState(false)

    const { contextSafe } = useGSAP(
        () => {
            // ── Scatter characters ──────────────────────────────────────────────
            const elements = gsap.utils.toArray<HTMLElement>('.split')

            splitInstancesRef.current = elements.map((el) => {
                const split = new SplitText(el, { type: 'chars' })

                gsap.set(split.chars, {
                    x: () => (Math.random() - 0.5) * 40,
                    y: () => (Math.random() - 0.5) * 25,
                    rotation: () => (Math.random() - 0.5) * 30,
                    opacity: 0.8,
                    filter: 'blur(0.5px)',
                })

                return split
            })
        },
        { scope: containerRef },
    )

    // ── Fix handler ─────────────────────────────────────────────────────────────
    // eslint-disable-next-line react-hooks/refs
    const handleFix = contextSafe(() => {
        setIsFixed(true)

        // Stop shake & reset broken cards
        gsap.killTweensOf('.broken-card')


        // Reassemble scattered characters
        const allChars = containerRef.current?.querySelectorAll<HTMLElement>('.split div')
        if (allChars?.length) {
            gsap.to(allChars, {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 2,
                stagger: { amount: 0.5, from: 'random' },
                ease: 'elastic.out(1, 0.75)',
            })
        }
    })

    // ── Render ──────────────────────────────────────────────────────────────────
    return (
        <section
            ref={containerRef}
            className="relative grid lg:grid-cols-2 gap-4 min-h-[85vh]"
        >
            {/* Fix button – hidden once system is fixed */}
            {!isFixed && (
                <button
                    onClick={handleFix}
                    aria-label="Fix broken system"
                    className="absolute -bottom-10 right-8 z-[100] bg-brand-error text-white px-8 py-4 rounded-full font-black uppercase tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:scale-110 active:scale-95 transition-transform animate-bounce"
                >
                    Fix System
                </button>
            )}

            <LeftSection isFixed={isFixed} />


            {/* Right column – info cards */}
            <div className="bg-brand-secondary/30 backdrop-blur-md p-3 md:p-4 rounded-2xl flex flex-col justify-between gap-4 border border-brand-border/50">

                {/* Experience card */}
                <div className={`relative overflow-hidden broken-card`}>
                    <InfoCard isFixed={isFixed} skewClass={!isFixed ? 'skew-x-2' : ''}>
                        <h2 className={`text-lg md:text-xl font-bold split leading-relaxed ${!isFixed ? 'glitch-text' : ''}`}>
                            <span className="text-brand-primary">Front-End Developer</span> with 4+ years of
                            hands-on experience building web applications using React &amp; Next.js.
                        </h2>
                    </InfoCard>
                    <BrokenGlass isFixed={isFixed} />
                </div>

                {/* Philosophy card */}
                <InfoCard isFixed={isFixed} skewClass={!isFixed ? 'rotate-1' : ''}>
                    <h2 className="text-lg md:text-xl font-bold split leading-relaxed">
                        I&apos;ve led teams and delivered complex UI solutions.
                        <span className="text-brand-warning"> Always learning</span>,
                        always coding.
                    </h2>
                </InfoCard>

                {/* Goal card */}
                <InfoCard isFixed={isFixed} skewClass={!isFixed ? 'translate-x-2' : ''}>
                    <h2 className="text-lg md:text-xl font-bold split leading-relaxed">
                        I am looking to join innovative teams where I can solve real-world problems.
                    </h2>
                </InfoCard>

                {/* Social links */}
                <div className="relative flex items-center gap-3 justify-between min-h-[80px]">
                    {myInfo.map((info, id) => (
                        <a
                            key={id}
                            href={!isFixed ? "#" : info.link}
                            target={!isFixed ? "_self" : "_blank"}
                            rel="noopener noreferrer"
                            style={getSocialLinkStyle({ id, isFixed })}
                            className={`broken-card bg-brand-bg hover:bg-brand-primary hover:text-white transition-all duration-700 p-4 rounded-xl flex items-center justify-center shadow-md border border-brand-border w-full ${!isFixed ? 'blur-[1.5px] grayscale-[0.5] cursor-not-allowed' : 'blur-0 grayscale-0'
                                }`}
                        >
                            <span
                                className={`text-2xl transition-transform duration-500 ${!isFixed ? 'scale-75' : 'scale-100'
                                    }`}
                            >
                                {info.icons}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSection

// ─── Sub-component ────────────────────────────────────────────────────────────
/**
 * Reusable card wrapper so the repeated broken-card pattern isn't copy-pasted.
 */
interface InfoCardProps {
    isFixed: boolean
    skewClass?: string
    children: React.ReactNode
}

const InfoCard = ({ isFixed, skewClass = '', children }: InfoCardProps) => (
    <div
        className={`broken-card bg-brand-bg p-5 rounded-xl shadow-lg border border-brand-border ${!isFixed ? skewClass : ''
            }`}
    >
        {children}
    </div>
)