import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { TiLocationArrow } from 'react-icons/ti';

const BentoTilt = ({ children, className = '' }) => {
    const [transformStyle, setTransformStyle] = useState('');
    const itemRef = useRef();

    const handleMouseMove = (event) => {
        if (!itemRef.current) return;
        const { left, top, width, height } = itemRef.current.getBoundingClientRect();
        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 8;
        const tiltY = (relativeX - 0.5) * -8;
        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95,0.95,0.95)`
        setTransformStyle(newTransform)



    }
    const handleMouseLeave = () => {
        setTransformStyle('')
    }



    return (
        <div className={className} ref={itemRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transform: transformStyle }}>
            {children}
        </div>
    )
}

export const BentoCard = ({ src, title, description }) => {
    const renderDescription = () => {
        // Case 1: description is a string
        if (typeof description === 'string') {
            return <p className="mt-3 max-w-[500px] text-[6px] md:text-base">{description}</p>;
        }

        // Case 2: description is an array of { heading, desc } objects
        if (Array.isArray(description)) {
            return (
                <div className="mt-3 max-w-[500px] text-xs md:text-base space-y-2 ">
                    {description
                        .filter(item => item) // Filter out null/undefined (like that trailing comma in your example)
                        .map((item, index) => (
                            <div key={index}>
                                <h3 className="font-semibold">{item.heading}</h3>
                                <p className='text-[15px] font-sans'>{item.desc}</p>
                            </div>
                        ))}
                </div>
            );
        }

        return null;
    };

    return (
        <div className="relative size-full border-hsla rounded-lg overflow-hidden">
            {/* Background Video */}
            <video
                src={src}
                loop
                muted
                autoPlay
                className="absolute left-0 top-0 size-full object-cover object-center z-0"
            />

            {/* Grey Overlay */}
            <div className="absolute left-0 top-0 size-full bg-gray-900 bg-opacity-65 z-10"></div>

            {/* Foreground Content */}
            <div className="absolute z-20 flex size-full flex-col justify-between p-5 text-blue-50">
                <h1 className="bento-title special-font">{title}</h1>
                {renderDescription()}
            </div>
        </div>
    );
};

const About = () => {
    return (
        <section id='about' className='bg-black pb-52'>
            <div className='container mx-auto px-3 md:px-10'>
                <div className='px-5 py-32'>
                    <p className='font-circular-web text-lg text-blue-50'>
                        About Me
                    </p>
                    <p className='font-circular-web text-lg text-blue-50  opacity-50'>
                        Passionate Software Developer with a keen interest in enhancing user experiences and developing innovative features to improve application functionality. An aspiring full-stack developer who loves exploring technologies across the stack — from frontend interactions to backend systems. Eager to contribute to a dynamic team environment, leveraging strong problem-solving skills and a proactive mindset to drive innovation, deliver high-impact solutions, and consistently exceed project goals.
                    </p>
                </div>
                <BentoTilt className='border-hsla mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh] '>
                    <BentoCard
                        src='videos/skills.mp4'
                        title={
                            <>s<b>k</b><b>i</b>lls</>
                        }
                        description={[
                            {
                                'heading': 'Frontend',
                                'desc': 'React, Next JS, HTML, CSS'
                            },
                            {
                                'heading': 'Backend Development & Architecture',
                                'desc': 'Java(Spring Boot, Hibernate), js(node), Supabase(edge functions), flutter-android app dev'
                            },
                            ,
                            {
                                'heading': 'Databases',
                                'desc': 'PostgreSQL(PgAdmin,Supabase,NeonDB), MySQL,MongoDB'
                            },

                            ,
                            {
                                'heading': 'DevOps & Version Control ',
                                'desc': 'GitHub,Docker'
                            },
                            {
                                'heading': 'UI/UX & Frontend Design ',
                                'desc': ' Proficient in developing responsive, user-friendly screens ,Experience in designing intuitive user interfaces and enhancing user experienc'
                            }
                        ]}

                    />
                </BentoTilt>
                <div className='grid h-[135vh] w-full grid-cols-1 md:grid-cols-2 grid-rows-2 mb-2 gap-7'>
                    <BentoTilt className='bento-titlt_1 row-span-1 md:col-span-1 md:row-span-2'>
                        <BentoCard
                            src="videos/night.mp4"
                            title={<>Exp<b>e</b>rie<b>n</b>ce</>}
                            description={[
                                {
                                    'heading': 'HITHA AGRI FINTECH (Apr 2024-currently working)',
                                    'desc': '-Developed Hitha, a Flutter-based mobile app that helps farmers track farm activities, manage finances, and improve financial literacy, while enabling the organization to strengthen relationships and de-risk transactions. '
                                },
                                {

                                    'desc': '-Developed and deployed the company’s(Hitha) official website using React, ensuring responsiveness'
                                },
                                {
                                    'desc': '- Built a flutter app to digitize the farmer KYC onboarding journey, enabling field supervisors to collect farmer dataand onboard them for fintech and agritech services through an intuitive, offline-first mobile interface'
                                },

                                {
                                    'desc': 'Hitha Admin is a modern admin dashboard built with Next.js, ShadCN UI, and Tailwind CSS, designed to streamline CRUD operations for managing farmer data under Hitha, a growing NBFC focused on agritech and fintech services'
                                },
                                {
                                    'heading': 'Contributions to Partner Company – Niti Ai',
                                    'desc': 'Built customer-specific apps and workflows using the platform’s visual builder and backend logic configurator'
                                },
                                {

                                    'desc': 'Developed a data migrator tool to seamlessly move product flows across SIT, UAT, and production environments.Engineered modular React components, integrated databases, and wrote custom queries to power dynamic UI/UX journeys'
                                },
                                {
                                    'desc': 'HDFC Life Portal: Worked on a React-based insurance platform that enabled corporate users to managepolicy-related actions such as overview, downloads, and requests. The system supported multi-level workflows involving verification and approval by different user roles. Integrated secure APIs, OTP verification, and backend operations using SQL'
                                }

                            ]}
                        />
                    </BentoTilt>

                    <BentoTilt className='bento-title_1 row-span-1 me-14 md:col-span-1 md:me-0'>
                        <BentoCard
                            src="videos/ironman.mp4"
                            title={<>Education And certifications</>}
                            description={
                                [
                                    {
                                        'heading': 'Education',
                                        'desc': 'KLS Gogte Institute of Technology Bachelors of Engineering (Civil July 2018-Nov 2022)'
                                    },
                                    {
                                        'heading': 'Certifications',
                                        'desc': 'LLMs & LangChain and Workflow Design by SimpliLearn'
                                    },
                                    {
                                        'desc': 'Introduction to Ethical Hacking (CEH) by great learning.'
                                    },
                                    {
                                        'desc': 'Complete cyber security course (Udemy).'
                                    },

                                    {
                                        'desc': 'Full-Stack Developer by Jspiders Basavangudi'
                                    }
                                ]
                            }
                        />
                    </BentoTilt>
                    <BentoTilt className='bento-title_1 row-span-1 ms-32 md:col-span-1 md:ms-0'>
                        <BentoCard
                            src="videos/formula.mp4"
                            title={<>Beyond Tech</>}
                            description={[
                                {
                                    'desc': 'Painting'
                                },
                                {
                                    'desc': 'Exploring good music'
                                },
                                {
                                    'desc': '3d Modelling'
                                },
                                , {
                                    'desc': 'Gardening'
                                },
                            ]}
                        />
                    </BentoTilt>
                    {/* <BentoTilt className='bento-title_2'>
                        <div className='flex size-full flex-col justify-between bg-violet-300 p-5'>
                            <h1 className='bento-title special-font max-w-64 text-black'>m<b>o</b>re co<b>m</b>ing s<b>o</b>on!</h1>
                            <TiLocationArrow className="m-5 scale-[5] self-end" />
                        </div>
                    </BentoTilt>
                    <BentoTilt className="bento-tilt_2">
                        <video
                            src="videos/feature-5.mp4"
                            loop
                            muted
                            autoPlay
                            className="size-full object-cover object-center"
                        />
                    </BentoTilt> */}

                </div>
                <div id='Projects'></div>
                <BentoTilt className='border-hsla  h-96 w-full overflow-hidden rounded-md md:h-[65vh] '>
                    <BentoCard
                        src='videos/mission_impossible.mp4'
                        title={
                            <>my <b>p</b>r<b>o</b>jects</>
                        }
                        description={[
                            {
                                'heading': 'Socially',
                                'desc': '◦ Socially is a modern, lightweight social media platform built with React and NeonDB. It lets users share posts,comment, and connect in a clean, responsive interface.[tools:react+Next.js as full-framework, tailwind-css,neon(postgres db), clerk(auth provider), prisma(orm tool), upload(remote storage), vercel(deployment) '
                            },
                            {
                                'heading': 'Art-Adda (In Progress)',
                                'desc': 'An e-commerce platform for showcasing and selling artwork using Spring, Hibernate, and MySQL. Artists(admins) can upload and manage their work, while users can explore and purchase art through a seamless marketplace experience'
                            },

                        ]}

                    />
                </BentoTilt>
            </div>
        </section>
    )
}

export default About