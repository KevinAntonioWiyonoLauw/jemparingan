"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

interface NavbarProps {
  title: string
  onTitleChange?: (title: string) => void
  bgColor?: string
}

export default function Navbar({
  title,
}: NavbarProps) {
      const router = useRouter()

  return (
    <div className="w-full bg-avocado-200 overflow-x-hidden">
      {/* Container untuk ukuran mobile */}
      <div className="w-full max-w-[428px] mx-auto relative overflow-hidden">
        {/* SVG Banner Shape dengan aspect ratio */}
        <svg 
          className="w-full h-auto" 
          viewBox="0 0 428 100" 
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >

        </svg>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-between px-[1vh]">
          <div className="flex flex-col items-center justify-center flex-shrink-0 z-10">
            <div className="relative" style={{ width: "35vh" }}>
              <Image
                src="/page-name.webp"
                alt="Page Name"
                width={700}
                height={700}
                priority
                className="object-contain"
                style={{ width: "35vh", height: "auto" }}
              />
              <span className="absolute inset-0 flex items-center justify-center mt-[2vh] text-[3vh] font-abhaya font-bold text-black">
                  {title}
                </span>
            </div>
          </div>

          
          {/* Right - Cancel Button */}
          <button
            onClick={() => router.back()}
            className="flex-shrink-0 w-[8vh] aspect-square relative hover:opacity-80 transition-opacity z-10 mt-[1vh]"
            aria-label="Cancel"
          >
            <Image
              src="/cancel.webp"
              alt="Cancel"
              fill
              className="object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  )
}