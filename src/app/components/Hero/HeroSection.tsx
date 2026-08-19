import { myInfo } from '@/constants/infoData'
import LeftSection from './LeftSection'

const HeroSection = () => {
    return (
        <section className="relative grid lg:grid-cols-2 gap-4 min-h-[85vh]">
            <LeftSection />

            <div className="bg-brand-secondary/30 backdrop-blur-md p-3 md:p-4 rounded-2xl flex flex-col justify-between gap-4 border border-brand-border/50">
                <InfoCard>
                    <h2 className="text-lg md:text-xl font-bold leading-relaxed">
                        <span className="text-brand-primary">Front-End Developer</span> with 4+ years of
                        hands-on experience building web applications using React &amp; Next.js.
                    </h2>
                </InfoCard>

                <InfoCard>
                    <h2 className="text-lg md:text-xl font-bold leading-relaxed">
                        I&apos;ve led teams and delivered complex UI solutions.
                        <span className="text-brand-warning"> Always learning</span>,
                        always coding.
                    </h2>
                </InfoCard>

                <InfoCard>
                    <h2 className="text-lg md:text-xl font-bold leading-relaxed">
                        I am looking to join innovative teams where I can solve real-world problems.
                    </h2>
                </InfoCard>

                <div className="flex items-center gap-3 justify-between">
                    {myInfo.map((info, id) => (
                        <a
                            key={id}
                            href={info.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-brand-bg hover:bg-brand-primary hover:text-white p-4 rounded-xl flex items-center justify-center shadow-md border border-brand-border w-full"
                        >
                            <span className="text-2xl">
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

interface InfoCardProps {
    children: React.ReactNode
}

const InfoCard = ({ children }: InfoCardProps) => (
    <div className="bg-brand-bg p-5 rounded-xl shadow-lg border border-brand-border">
        {children}
    </div>
)
