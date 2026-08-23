import { FileQuestionMark, Github, Sunrise } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

interface Project {
    name: string;
    image: string;
    details: string;
    tech: string[];
    link?: string;
    links?: string[];
    repo?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
    const detailsModal = useRef<HTMLDialogElement>(null)


    return (
        <>
            <div className='card-div bg-brand-bg text-brand-text group relative rounded-lg shadow-md overflow-hidden min-h-[480px] border border-brand-border transition-all duration-300 hover:shadow-xl'>

                <div className='bg-black/10 absolute opacity-0 group-hover:opacity-100 inset-0 z-10 group-hover:z-0 w-3 h-3 rounded-full group-hover:w-full group-hover:rounded-none group-hover:h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300' />

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

                    <div className="flex justify-between items-start gap-2">
                        <h3 className='text-xl font-semibold mb-2 text-brand-text'>{project.name}</h3>
                        <button
                            onClick={() => detailsModal.current?.showModal()}
                            className='w-fit bg-brand-primary text-white px-3 py-2 rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105'
                            aria-label={`Details about ${project.name}`}
                        >
                            <FileQuestionMark size={20} />
                        </button>
                    </div>


                    <div className='flex items-center flex-wrap gap-2'>
                        {project.tech.map((tech, index) => (
                            <span
                                key={index}
                                className='bg-brand-primary/15 text-brand-text border border-brand-primary/30 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-brand-primary hover:text-white hover:border-brand-primary'
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className='flex items-center flex-wrap gap-2 mt-2'>
                        <a
                            href={project.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='bg-brand-primary text-white px-3 py-2 rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 flex items-center'
                            aria-label={`Visit ${project.name}`}
                        >
                            <Sunrise size={20} />
                        </a>
                        {project.links &&
                            <>
                                {
                                    project.links.map((l, index) => (
                                        <a
                                            key={index}
                                            href={l}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='bg-brand-primary text-white px-3 py-2 rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 flex items-center'
                                            aria-label={`Visit ${project.name} link ${index + 1}`}
                                        >
                                            <Sunrise size={20} />
                                        </a>
                                    ))
                                }
                            </>
                        }
                        {project.repo && (
                            <a
                                href={project.repo}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='ml-3 bg-brand-primary text-white px-3 py-2 rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105'
                                aria-label={`${project.name} GitHub repository`}
                            >
                                <Github size={20} />
                            </a>
                        )}
                    </div>

                </div>
            </div>

            <dialog ref={detailsModal} className='fixed lg:text-2xl md:text-xl sm:text-base top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-bg text-brand-text border border-brand-border p-4 rounded-lg transition-all duration-800 ease-in-out z-10 shadow-xl'>
                <div className='bg-brand-bg text-brand-text p-4 rounded-lg transform transition-all duration-800 ease-in-out z-10'>
                    {project.details}
                </div>

                <button onClick={() => detailsModal.current?.close()} className='bg-brand-primary text-white px-4 py-2 rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105'>
                    Close
                </button>
            </dialog>


        </>
    )
}

export default ProjectCard