import { BookOpen, Briefcase, Terminal, Dumbbell, Zap, GraduationCap, MoveUpRight } from 'lucide-react';
import Image from 'next/image';

const MyJourney = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-200 py-20 px-6 md:px-12 font-sans">
            <div className="max-w-[90%] w-full mx-auto">
                {/* Header Section */}
                <div className="mb-20 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-l from-brand to-white bg-clip-text text-transparent">
                        Youssef Mahmoud
                    </h1>
                    <p className="text-xl text-muted uppercase tracking-[0.3em] font-bold">The Warrior&apos;s Journey</p>
                </div>

                <div className="space-y-24">

                    {/* Section 1: The Athlete */}
                    <section className="relative lg:flex gap-4">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <Dumbbell className="text-brand w-8 h-8" />
                                <h2 className="text-3xl font-bold italic">The Natural Athlete</h2>
                            </div>
                            <p className="text-xl leading-11 text-gray-300 first-letter:text-5xl first-letter:font-bold first-letter:text-brand first-letter:mr-3 first-letter:float-left">
                                Since I was young, I was an athlete. I started with **Gymnastics** and was a naturally talented boy.
                                Then I moved to **Karate** and earned my Yellow Belt. After that, I transitioned to **Kung Fu Sanda**,
                                competing in multiple local championships winning every single one of them, the first one I faced 2 boys 2 matches, one was fit for me and the other was taller and more experienced than me, but I won, I fighted like I do not have a choice, I derived my self like a bullet toward the taller one.
                                <br />
                                The last championship was the best one, it was after I trained well, I was training in 2 gyms, one for Kung Fu and one for MMA, I was training hard.
                                Alongside Kung Fu, I was practicing **MMA (Mixed Martial Arts)**. I was remarkably talented;
                                whenever I walked into any gym, everyone was amazed by my speed and power.
                                I was fast, I was strong I was a beast.
                            </p>
                        </div>

                        <Image
                            src="/me/tikondo-image.jpeg"
                            alt="Youssef Mahmoud"
                            width={500}
                            height={500}
                            className="rounded-xl object-contain"
                        />
                    </section>


                    <section>
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/zgp6ttgDHdE?autoplay=1&mute=1&loop=1&playlist=zgp6ttgDHdE"
                                title="Parkour Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </section>

                    <section className="relative grid lg:grid-cols-2 gap-4">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                                        <path d="M17 10l-3-3m0 0l-3 3m3-3v12" />
                                        <circle cx="12" cy="5" r="1" />
                                        <path d="M7 20h10" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold italic">Parkour Man</h2>
                            </div>
                            <p className="text-xl leading-11 text-gray-300 first-letter:text-5xl first-letter:font-bold first-letter:text-brand first-letter:mr-3 first-letter:float-left">
                                I was intersted in Parkour, I loved it and started watching videos to learn, I was practicing it alone and with friends, I was jumping from walls and I let my self go further and further.
                            </p>
                        </div>
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/Nyj8WpyNZxI?autoplay=1&mute=1&loop=1&playlist=Nyj8WpyNZxI"
                                title="Parkour Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </section>
                    <section>
                        <h1 className="text-2xl font-bold">I love Quran</h1>
                        <p className="text-xl leading-11 text-gray-300 first-letter:text-5xl first-letter:font-bold first-letter:text-brand first-letter:mr-3 first-letter:float-left">
                            I love Quran and I try to read it every day, I love to listen to Quran so much, I learned how to read and prounce Quran
                        </p>
                        <p className="text-xl leading-11 text-gray-300 first-letter:text-5xl first-letter:font-bold first-letter:text-brand first-letter:mr-3 first-letter:float-left">
                            I started to be Emam in the mosque when I was 25 years old, I was praying in a mosque that the Emam not show regular to pray, so I said to one of the mosque workers that I can pray for people, and they liked it, so I started to be Emam in the mosque.
                        </p>
                        <p className="text-xl leading-11 text-gray-300 first-letter:text-5xl first-letter:font-bold first-letter:text-brand first-letter:mr-3 first-letter:float-left">
                            Then Every Ramadan I was praying Tarawih for people.
                        </p>
                        <div>
                            {/* sound of quran */}
                            <audio controls>
                                <source src="/record/youssef.mp3" type="audio/mpeg" />
                            </audio>
                        </div>
                    </section>
                    {/* Section 2: Discipline & Mindset */}
                    <section className="grid md:grid-cols-2 gap-12 items-center bg-zinc-900/50 p-8 rounded-3xl border border-white/5">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <BookOpen className="text-brand w-6 h-6" />
                                <h3 className="text-2xl font-bold">Shaping the Mind</h3>
                            </div>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Parallel to sports, I was a voracious reader. I dove deep into **self-development, religion, and novels**.
                                I consumed countless motivational videos about studying and work. This fueled my **discipline mode** I learned English,
                                and continuously shaped both my body and my mind.
                            </p>
                        </div>
                        <div className="border-l-2 border-brand/20 pl-8">
                            <div className="flex items-center gap-4 mb-4">
                                <GraduationCap className="text-brand w-6 h-6" />
                                <h3 className="text-2xl font-bold">The Academic Grind</h3>
                            </div>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                To be honest, I didn&apos;t like traditional studying at all; I hated it so much.
                                However, I pushed through, graduated, and finally earned my Bachelor&apos;s Degree in Social Work.
                            </p>
                        </div>
                    </section>

                    {/* Section 3: The Hustle */}
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <Briefcase className="text-brand w-8 h-8" />
                            <h2 className="text-3xl font-bold">The Real-World Hustle</h2>
                        </div>
                        <div className="bg-brand/5 p-6 rounded-2xl border-l-4 border-brand italic text-gray-300 mb-6 text-xl">
                            I worked in a Coca Cola Factory, Best, a Wedding hall, an English teacher secretary, a Mobile shop, 3 libraries, 3 Medical stores, and 3 Pharmacies...
                        </div>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Working across these multiple fields taught me the value of the grind. Each role was a lesson in
                            resilience, but I knew I was destined for something more.
                        </p>
                    </section>

                    {/* Section 4: The Pivot */}
                    <section className="relative p-8 bg-gradient-to-br from-zinc-900 to-black rounded-3xl border border-brand/20 shadow-2xl">
                        <div className="absolute -top-6 -right-6">
                            <Zap className="w-12 h-12 text-brand fill-brand animate-pulse" />
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <Terminal className="text-brand w-8 h-8" />
                            <h2 className="text-3xl font-bold">The Starting Point</h2>
                        </div>
                        <p className="text-xl leading-relaxed text-gray-300">
                            The last Medical store I worked in was the true starting point of my programming journey. <br />
                            I can&apos;t pinpoint exactly what drove me to start; I just remember that I needed to **change my life**.
                            <br />I felt lost, with no real goals, despite the reading and the workouts. It wasn&apos;t enough.
                        </p>
                        <div className="mt-8 text-xl space-y-4 text-gray-300">
                            <p>
                                In that store, there was a PC we used for stock management. I was managing the store alone, I organized my life and fixed my mindset
                                to be more disciplined. Every day at work, I would sit at that PC and watch YouTube videos about programming.
                                When a customer came in, I&apos;d serve them, then immediately go back to learning.
                            </p>
                            <p className="bg-white/5 p-4 rounded-xl font-mono text-sm border border-white/10">
                                Started with HTML & CSS with Osama ElZero &rarr; JavaScript &rarr; Bootstrap.
                            </p>
                        </div>
                    </section>

                    {/* Section 5: LinkedIn & The First Dollar */}
                    <section className="pb-20">
                        <div className="flex items-center gap-4 mb-6">
                            <Zap className="text-brand w-8 h-8" />
                            <h2 className="text-3xl font-bold">The Indian Connection</h2>
                        </div>
                        <p className="text-xl leading-relaxed text-gray-300">
                            LinkedIn was my gateway. While building my first projects and portfolio, I found a post by an Indian guy.
                            He needed someone with HTML, CSS, JS, and Bootstrap exactly what I had mastered.
                            I reached out, we had a meeting, and I was terrified. &quot;Is this real? Working with Indians? Salary in Dollars?&quot; can I apply what I learned?
                            I couldn&apos;t believe it until the first payment arrived. It was low, but it was the start.
                            I even had to ask a friend to receive it on his visa because I didn&apos;t have one yet!
                        </p>

                        <p className="mt-6 text-xl text-gray-300">
                            After 3 months, I knew it was time for more. white I was working in the medical store and also with the Indian guy I kept building, kept applying, when I back to home I learn and work, and forged a new mindset:
                            **&quot;Go to the interview to hear &apos;No&apos;, not &apos;Yes&apos;. It&apos;s okay. Just go, try, and never mind the outcome.&quot;**
                        </p>

                        <p className="mt-6 text-xl text-gray-300">
                            I got my first interview on a freelance platfrom, but I was not fit for the job yet, the second one what on site,I got a call from one of the the company, he said: you have applied in Front end posistion at our company, I said when ? what company ? he said the information about him and his company and i Just said yes of course, I realy forgot that I applied to this company hahaha, then when it comes the interview day, I closed the Medical store, I went to the interview, I with a mindset of: just go to see what is that company, what is it look like, just do not panic, just be calm
                        </p>

                        <p className="mt-6 text-xl text-gray-300">
                            Before I go I studed a little to refresh my mind, and I went to the interview, and I can not believe that It was so so easy, a back end developer did the interview with me, he was know a little about what he asking, but he just wanted to know that I understand the code, concepts, logic, then he told me: we will call you .
                        </p>

                        <p className="mt-6 text-xl text-gray-300">
                            after about 1 week, I got my call to go to a 3 months training with a basic salary as starting, to insure that I am ready for the job and the annual contract, I was so happy, I left the medical store, and I started my journey as a front end developer with React.js .
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default MyJourney;