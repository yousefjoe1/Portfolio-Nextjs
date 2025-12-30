import { ArrowRightIcon, FileQuestionMark, Github, Link2, LinkIcon, Sunrise } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface Project {
    name: string;
    image: string;
    details: string;
    tech: string[];
    link: string;
    repo?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
    const detailsModal = useRef<HTMLDialogElement>(null)


    return (
        <>
            <div className='card-div bg-brand-tertiary hover:bg-brand-tertiary/50 group relative rounded-lg shadow-md overflow-hidden min-h-[480px] cursor-pointer transition-all duration-300 hover:shadow-xl'>
                <div className='relative h-64 overflow-hidden'>
                    <Image
                        width={300}
                        height={300}
                        src={project.image}
                        alt={project.name}
                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                </div>

                <div className='p-4 flex flex-col gap-3 relative'>

                    <h3 className='text-lg font-semibold mb-2'>{project.name}</h3>


                    <div className='flex items-center flex-wrap gap-2'>
                        {project.tech.map((tech, index) => (
                            <span
                                key={index}
                                className='bg-brand-secondary text-white px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-105 hover:bg-brand-primary'
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className='flex items-center mt-2'>
                        <a
                            href={project.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='bg-brand-primary/20 text-white px-4 py-2 rounded-full hover:bg-brand-secondary transition-all duration-300 hover:scale-105 flex items-center group/link'
                        >
                            <Sunrise size={17} />
                        </a>
                        {project.repo && (
                            <a
                                href={project.repo}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='ml-3 bg-brand-primary/20 text-white px-4 py-2 rounded-full hover:bg-brand-secondary transition-all duration-300 hover:scale-105'
                            >
                                <Github size={17} />
                            </a>
                        )}
                        <button
                            onClick={() => detailsModal.current?.showModal()}
                            className='ml-3 bg-brand-primary/20 text-white px-4 py-2 rounded-full hover:bg-brand-secondary transition-all duration-300 hover:scale-105'
                        >

                            <FileQuestionMark size={17} />
                        </button>
                    </div>
                </div>
            </div>

            <dialog ref={detailsModal} className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-border-secondary text-gray-300 p-4 rounded-lg transition-all duration-800 ease-in-out z-10'>
                <div className='bg-brand-border-secondary text-gray-300 p-4 rounded-lg transform transition-all duration-800 ease-in-out z-10'>
                    {project.details}
                </div>

                <button onClick={() => detailsModal.current?.close()} className=' bg-brand-primary/20 text-white px-4 py-2 rounded-full hover:bg-brand-secondary transition-all duration-300 hover:scale-105'>
                    Close
                </button>
            </dialog>


        </>
    )
}

export default ProjectCard