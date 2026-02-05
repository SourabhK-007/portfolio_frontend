import { ChevronUp, ChevronDown } from "lucide-react";
import { useRef } from "react";
import { Github, Link } from 'lucide-react';

export const BentoCard2 = ({ src, title, description, type }) => {
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
        <p
          className="
            max-w-full sm:max-w-[420px] md:max-w-[500px]
            text-[10px] sm:text-xs md:text-base
            leading-relaxed
          "
        >
          {description}
        </p>
      );
    }

    // Case 2: description is an array
    if (Array.isArray(description)) {
      return (
        <div
          className={`${
            type === "projects" || type === "skills"
              ? `
                grid grid-cols-1
                gap-4 sm:gap-5
                md:grid-cols-2 md:gap-6
              `
              : `
                max-w-full sm:max-w-[420px] md:max-w-[500px]
                text-[11px] sm:text-xs md:text-base
                space-y-2 sm:space-y-3
              `
          }`}
        >
          {description
            .filter(Boolean)
            .map((item, index) => (
              <div
                key={index}
                className="
                  flex flex-col justify-between
                  gap-2 sm:gap-3
                  p-2 sm:p-3
                "
              >
                <div>
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg">
                    {item.title}
                  </h3>

                  <h5 className="text-blue-300 text-xs sm:text-sm">
                    {item.subtitle}
                  </h5>

                  <p className="text-[10px] sm:text-xs text-rose-400">
                    {item.tools}
                  </p>

                  <p className="text-[10px] sm:text-xs text-gray-400">
                    {item.duration}
                  </p>

                  <p
                    className="
                      text-[14px] sm:text-sm md:text-[15px]
                      font-sans leading-relaxed
                    "
                  >
                    {item.description}
                  </p>
                </div>

                {item.url && item.github && (
                  <div className="flex gap-2 sm:gap-3 mt-2">
                    <div
                      className="
                        border-2 sm:border-4 border-blue-500
                        rounded-full
                        transition-colors duration-700
                        hover:bg-white
                      "
                    >
                      <a href={item.github} target="_blank">
                        <Github className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 p-1 text-blue-500" />
                      </a>
                    </div>

                    <div
                      className="
                        border-2 sm:border-4 border-rose-500
                        rounded-full
                        transition-colors duration-700
                        hover:bg-white
                      "
                    >
                      <a href={item.url} target="_blank">
                        <Link className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 p-1 text-rose-500" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative h-full border-hsla rounded-lg overflow-hidden " id="experience">
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


        <div className="flex flex-col w-full   h-full items-center justify-start  ">
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
            {(description == undefined || description.length === 0) ?
              <div className="w-full h-full items-center justify-center flex flex-row  gap-2">
                <h1 className="bento-title">Loading</h1>
                <img src="img/loading.gif" alt="" className="h-[42px]"/>
              </div>
              : renderDescription()}
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
