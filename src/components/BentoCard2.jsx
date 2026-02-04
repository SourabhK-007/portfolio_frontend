import { ChevronUp, ChevronDown } from "lucide-react";
import { useRef } from "react";
import { Github, Link } from 'lucide-react';

export const BentoCard2 = ({ src, title, description,type }) => {
  const contentRef = useRef(null);

  const SCROLL_AMOUNT = 140; // strong, noticeable movement

  const scrollUp = () => {
    if (!contentRef.current) return;
    contentRef.current.scrollBy({
      top: -SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  const scrollDown = () => {
    if (!contentRef.current) return;
    contentRef.current.scrollBy({
      top: SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  const renderDescription = () => {
    // Case 1: description is a string
    if (typeof description === "string") {
      return (
        <p className=" max-w-[500px] text-[6px] md:text-base">
          {description}
        </p>
      );
    }

    // Case 2: description is an array
    if (Array.isArray(description)) {
      return (
        //max-w-[500px] text-xs md:text-base space-y-3
        //"grid grid-cols-1 md:grid-cols-2 gap-4 h-full"
        <div className={`${type==='projects' ||  type==='skills' ? 'grid grid-cols-1 gap-5 md:grid-cols-2' : 'max-w-[500px] text-xs md:text-base space-y-3'} `}>
          {description
            .filter(Boolean)
            .map((item, index) => (
              <div key={index} className="flex flex-col justify-between ">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <h5 className="text-blue-300">{item.subtitle}</h5>
                  <p className="text-[12px] text-rose-400">{item.tools}</p>
                  <p className="text-[12px]  text-gray-400">{item.duration}</p>
                  <p className="text-[15px] font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>


                {
                  item.url && item.github && (
                    <div className="flex gap-2">
                      <div className="border-4 border-blue-500 rounded-3xl w-fit hover:bg-black ease-in-out">
                        <a href={item.github}><Github className="w-6 h-6 p-1 text-blue-500" /></a>
                      </div>
                      <div className="border-4 border-rose-500 rounded-3xl w-fit  hover:bg-black ease-in-out">
                        <a href={item.url}><Link className="w-6 h-6 p-1 text-rose-500" /></a>
                      </div>
                    </div>


                  )
                }


              </div>
            ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative h-full border-hsla rounded-lg overflow-hidden mb-4" id="experience">
      {/* 🎥 Background Video */}
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute inset-0 h-full w-full object-cover z-0 "
      />

      {/* 🌫️ Overlay */}
      <div className="absolute left-0 top-0 size-full bg-gray-900 bg-opacity-65 z-10 " />


      {/* 🧱 Foreground */}
      <div className="absolute z-20 flex size-full flex-col items-start justify-between  text-blue-50 ">
        {/* Title */}
        <h1 className="bento-title special-font p-4">{title}</h1>


        <div className="flex flex-col  h-full items-center justify-start  ">
          <button
            onClick={scrollUp}
            className=" rounded-full bg-black/40 p-1 hover:bg-black/60 transition"
            aria-label="Scroll up"
          >
            <ChevronUp size={18} />
          </button>

          {/* 📜 Fixed-height scroll window */}
          <div
            ref={contentRef}
            className="
            h-[70%]
            w-full
            max-w-[90%]
            overflow-y-auto
            px-1
            no-scrollbar
          "
          >
            {renderDescription()}
          </div>

          {/* ⬇️ Bottom Arrow */}
          <button
            onClick={scrollDown}
            className="mt-2 rounded-full bg-black/40 p-1 hover:bg-black/60 transition"
            aria-label="Scroll down"
          >
            <ChevronDown size={18} />
          </button>
        </div>
        {/* ⬆️ Top Arrow */}

      </div>
    </div>
  );
};
