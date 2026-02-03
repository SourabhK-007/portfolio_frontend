import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import Typewriter from 'typewriter-effect'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_VIDEOS = 4

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [hasClicked, setHasClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const nextVideoRef = useRef(null)

  const upcomingVideoIndex = (currentIndex % TOTAL_VIDEOS) + 1
  const getVideoSrc = (i) => `/videos/game-${i}.mp4`

  /* ✅ LOADER: ONLY WAIT FOR FIRST VIDEO */
  const handleInitialVideoLoad = () => {
    setIsLoading(false)
  }

  const handleMiniVdClick = () => {
    setHasClicked(true)
    setCurrentIndex(upcomingVideoIndex)
  }

  /* 🎬 VIDEO TRANSITION (unchanged logic) */
  useGSAP(
    () => {
      if (!hasClicked) return

      gsap.set('#next-video', { visibility: 'visible' })
      gsap.to('#next-video', {
        transformOrigin: 'center center',
        scale: 1,
        width: '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart: () => nextVideoRef.current?.play(),
      })

      gsap.from('#current-video', {
        transformOrigin: 'center center',
        scale: 0,
        duration: 1.5,
        ease: 'power1.inOut',
      })
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  )

  /* 🎞️ SCROLL ANIMATION (unchanged, just delayed until load) */
  useGSAP(() => {
    if (isLoading) return

    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0, 72% 0, 88% 90%, 0 95%)',
      borderRadius: '0% 0% 40% 10%',
    })

    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0% 0% 0% 0%',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    })
  }, [isLoading])

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* 🔄 LOADER */}
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          {/* 🎯 MINI PREVIEW */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                preload="none"
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
              />
              <div className="absolute left-0 top-0 size-full bg-gray-950 bg-opacity-40 z-10" />
            </div>
          </div>

          {/* 🔁 NEXT VIDEO (LAZY) */}
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            preload="none"
            id="next-video"
            className="absolute-center invisible absolute z-20 object-cover size-64 object-center"
          />

          {/* ▶️ MAIN VIDEO (ONLY ONE PRELOADS) */}
          <video
            src={getVideoSrc(
              currentIndex === TOTAL_VIDEOS - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            preload="metadata"
            onLoadedData={handleInitialVideoLoad}
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>

        {/* 🟦 TEXT — UNTOUCHED */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          LA<b>U</b>NCH
        </h1>

        <div className="absolute left-0 top-0 z-[30] size-full">
          <div className="mt-40 px-5 sm:px-10">
            <h1 className="font-tektur text-[32px] text-blue-100">
              Hello there, <br /> I'm Sourabh Karikatti
            </h1>

            <div className="text-white font-tektur flex flex-col sm:flex-row">
              <h1 className="mr-0 sm:mr-1 bg-gray-700 bg-opacity-35 text-[20px] sm:text-[26px] mb-1 sm:mb-0">
                I'm a developer
              </h1>

              <span
                className="text-blue-400 font-bold text-[20px] sm:text-[26px] bg-gray-700 bg-opacity-35"
                style={{
                  textShadow:
                    '1px 1px 0 black,-1px -1px 0 black',
                }}
              >
                <Typewriter
                  options={{
                    strings: [
                      'who still tests in production, but only on Fridays.',
                      'That means I turn coffee into code and bugs into features.',
                      'with 99 Chrome tabs open, all in the name of "debugging".',
                      'who totally didn’t just Google that solution five minutes ago',
                    ],
                    autoStart: true,
                    delay: 50,
                    loop: true,
                  }}
                />
              </span>
            </div>
          </div>

          <div className="w-full px-10">
            <p className="text-white text-[16px] font-tektur absolute m:text-[22px]">
              Yes, this looks flashy, but don’t let the animations deceive you
              <br /> — I’m just a regular dev.
            </p>
          </div>
        </div>
      </div>

      {/* 🔁 SECOND LAUNCH TEXT (UNCHANGED) */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        LA<b>U</b>NCH
      </h1>
    </div>
  )
}

export default Hero
