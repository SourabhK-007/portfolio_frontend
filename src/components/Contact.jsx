import React from 'react'
import Button from './Button'


import { FaEnvelope, FaPhone, FaLinkedin } from 'react-icons/fa';

const contactLinks = [
    {
        icon: <FaEnvelope className="text-white text-xl" />,
        label: 'sourabhkarikatti007@gmail.com',
        href: 'mailto:sourabhkarikatti007@gmail.com',
    },
    {
        icon: <FaPhone className="text-white text-xl" />,
        label: '+(91) 9611927500',
        href: 'tel:+919611927500',
    },
    {
        icon: <FaLinkedin className="text-white text-xl" />,
        label: 'Sourabh Karikatti',
        href: 'https://www.linkedin.com/in/sourabh-karikatti-322109235',
    },
];

const ImageClipBox = ({ src, clipClass }) => (
    <div className={clipClass}>
        <img src={src} alt="" />
    </div>
);

import toast, { Toaster } from 'react-hot-toast';

const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key",import.meta.env.VITE_W3_FORM);

    const json = JSON.stringify(Object.fromEntries(formData));

    const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: json
    }).then(res => res.json());


    if (res.success) {
        toast.success('Email sent!');
        event.target.reset();
    } else {
        toast.error('Failed to send email.');
    }
};


const Contact = () => {
   return (
        <div id="contact" className="my-20 min-h-96 w-full px-5 sm:px-10">
            <div className="relative flex flex-col lg:flex-row justify-center items-center rounded-lg bg-black py-16 md:py-24 text-blue-50 overflow-hidden">
                
                {/* LEFT CONTENT */}
                <div className="relative z-20 flex flex-col items-center text-center lg:items-start lg:text-left px-4 md:px-10 max-w-2xl">
                    <p className="font-general text-[12px] md:text-[14px] uppercase tracking-widest text-blue-300">
                        Contact Me
                    </p>

                    <p className="special-font mt-6 md:mt-10 w-full font-zentry leading-[1.1] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem]">
                        Open to n<b>e</b>w i<b>d</b>eas,<br />
                        ch<b>a</b>llen<b>g</b>es, and gre<b>a</b>t coffee.
                    </p>

                    {/* CONTACT LINKS */}
                    <div className="pt-8 flex flex-col gap-2 md:gap-3 items-center lg:items-start text-white">
                        {contactLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-300 text-sm md:text-base"
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </a>
                        ))}
                    </div>

                    {/* CONTACT FORM */}
                    <form
                        onSubmit={onSubmit}
                        className="mt-10 w-full max-w-md space-y-4 text-black"
                    >
                        <input
                            type="hidden"
                            name="access_key"
                            value="YOUR_W3FORMS_ACCESS_KEY"
                        />

                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            className="w-full rounded-md p-3 text-sm"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            required
                            className="w-full rounded-md p-3 text-sm"
                        />

                        <textarea
                            name="message"
                            placeholder="Your Message"
                            required
                            rows="5"
                            className="w-full rounded-md p-3 text-sm"
                        ></textarea>

                        <button
                            type="submit"
                            className="group relative w-full sm:w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black text-[14px] hover:bg-blue-400 transition-colors duration-300 ease-linear"
                        >
                            SEND EMAIL
                        </button>
                    </form>
                </div>

                {/* RIGHT IMAGE */}
                <div className="absolute lg:static bottom-0 right-0 w-[60%] sm:w-[40%] lg:w-[25%] mt-10 lg:mt-0 overflow-hidden">
                    <div className="relative z-10 hidden lg:block">
                        <ImageClipBox
                            src="img/contact_me.gif"
                            clipClass="sword-man-clip-path h-full w-full object-cover scale-110"
                        />
                    </div>
                    <div className="sword-man-clip-path absolute bottom-0 right-0 w-full h-1/3 lg:w-[120%] lg:h-[40%] bg-gradient-to-b from-blue-500 to-black opacity-80 lg:opacity-100"></div>
                </div>

                <Toaster position="bottom-center" reverseOrder={false} />
            </div>
        </div>
    );
}

export default Contact