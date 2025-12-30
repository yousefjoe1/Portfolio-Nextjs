'use client'
import { myInfo } from '@/constants/infoData'
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image'
import { gsap } from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)

    useGSAP(
        () => {
            gsap.registerPlugin(SplitText)

            const elements = gsap.utils.toArray('.split', containerRef.current) as HTMLElement[]

            const splits = elements.map((el) =>
                SplitText.create(el, { type: 'words, chars' })
            )

            gsap.from(
                splits.flatMap((split) => split.chars),
                {
                    duration: 0.400,
                    y: 100,
                    autoAlpha: 0,
                    stagger: 0.05,
                }
            )
        },
        { scope: containerRef }
    )

    return (
        <section className='grid lg:grid-cols-3 gap-4'>
            {/* Left Column - Hero Image */}
            <div className='p-4 rounded-lg lg:col-span-2 md:col-span-2 hero-left'>
                {/* <Image
                    src="/images/hero-bg-v1.png"
                    className='rounded-xl w-[200px] object-contain'
                    alt="Hero"
                    width={500}
                    height={600}
                /> */}
            </div>

            {/* Right Column - Info Cards */}
            <div className='bg-brand-secondary/50 shadow-lg p-4 rounded-lg flex flex-col justify-between gap-4 '>

                {/* Experience Card */}
                <div ref={containerRef} className='bg-brand-bg p-4 rounded-lg flex items-center justify-between shadow-sm border border-brand-border'>
                    <h2 className='text-xl font-bold split'>
                        <span className='text-brand-primary'> Front-End Developer </span>
                        with 3+ years of hands-on experience building web applications using React.
                    </h2>
                </div>

                {/* Philosophy Card */}
                <div className='bg-brand-bg p-4 rounded-lg flex items-center justify-between shadow-sm border border-brand-border'>
                    <h2 className='text-xl font-bold split'>
                        I’ve led teams, delivered complex UI solutions, and collaborated with global startups.
                        <span className='text-brand-warning'> Always learning</span>, always coding.
                    </h2>
                </div>

                {/* Goal Card */}
                <div className='bg-brand-bg p-4 rounded-lg flex items-center justify-between shadow-sm border border-brand-border'>
                    <h2 className='text-xl font-bold split'>
                        I’m looking to join innovative teams where I can solve real-world problems and keep growing.
                    </h2>
                </div>

                {/* Social Links Row */}
                <div className="flex items-center gap-3 justify-between">
                    {myInfo.map((info, id) => (
                        <a
                            key={id}
                            target='_blank'
                            href={info.link}
                            rel="noopener noreferrer"
                            className='bg-brand-bg hover:bg-brand-secondary hover:text-white hover:scale-110 transition-all duration-300 p-4 rounded-lg flex items-center justify-center shadow-sm border border-brand-border w-full'
                        >
                            <span className='text-2xl font-bold'>{info.icons}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSection
