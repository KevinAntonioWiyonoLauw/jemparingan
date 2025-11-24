'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface NavbarBProps {
  title?: string;
}

export default function Navbar({
  title,
}: NavbarBProps) {
  const router = useRouter();

  return (
<div className="w-full bg-avocado-600">
      <div className="w-full max-w-[428px] mx-auto px-[1vh] py-[1.5vh] flex items-center gap-[1.5vh] shadow-lg">
        <div
          className="w-full flex items-center gap-[2vh] px-[1.5vh] py-[1.3vh]"

        >
          <button
            type="button"
            onClick={() => router.back()}
            className="w-[4vh] h-[4vh] relative flex-shrink-0"
            aria-label="Kembali"
          >
            <Image
              src="/Next-Button.webp"
              alt="Back"
              fill
              className="object-contain"
            />
          </button>

          <h1 className="text-[2.5vh] font-semibold font-poppins text-white tracking-wide">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}