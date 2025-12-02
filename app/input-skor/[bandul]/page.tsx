"use client";

import React from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/navbar/navbarA";
import BottomNav from "@/components/ui/BottomNav";
import type { Bandul } from "@/modules/scoring/types";
import TreeBackground from "@/components/tree/tree-background";

const submitOptions = [
  {
    key: "molo",
    title: "Molo Submit Option",
    icon: "/input-skor/bandul/options-red.webp",
    status: "/input-skor/bandul/check-green.webp",
    href: "/scan-barcode?type=molo",
  },
  {
    key: "awak",
    title: "Awak Submit Option",
    icon: "/input-skor/bandul/options-white.webp",
    status: "/input-skor/bandul/check-green.webp",
    href: "/scan-barcode?type=awak",
  },
] as const;

export default function BandulDetailPage() {
  const router = useRouter();
  const params = useParams();

  const rawBandul = (params?.bandul as string) || "";
  const bandul = rawBandul.trim().charAt(0).toUpperCase() as Bandul;

  if (!["A", "B", "C", "D"].includes(bandul)) {
    return (
      <div className="min-h-screen bg-avocado-100 flex items-center justify-center text-center">
        <div>
          <h1 className="text-[3vh] font-bold mb-[2vh]">Bandul Tidak Ditemukan</h1>
          <button
            onClick={() => router.push("/input-skor")}
            className="px-[3vh] py-[1.5vh] bg-twine-400 text-white rounded-[1vh]"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-avocado-200 pb-[12vh] overflow-hidden">
      <TreeBackground />

      <div className="relative z-10">
        <Navbar title={`Input Bandul ${bandul}`} />

        <main className="max-w-[428px] mx-auto px-[2vh] pt-[2vh] space-y-[2vh]">
          {submitOptions.map(({ key, title, icon, status, href }) => (
            <button
              key={key}
              onClick={() => router.push(`${href}&bandul=${bandul}`)}
              className="relative w-full flex items-center justify-between py-[2.4vh] pl-[7vh] pr-[3vh] mt-[2vh] text-left font-abhaya text-[2.1vh] font-semibold text-[#3D2B1F]"
              style={{
                backgroundImage: "url('/input-skor/bandul/submit-option.webp')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            >
              <span className="absolute left-[3vh] top-1/2 -translate-y-1/2 w-[4.8vh] h-[4.8vh] flex items-center justify-center">
                <div className="w-[3vh] h-[3vh] relative">
                  <Image src={icon} alt={`${title} icon`} fill className="object-contain" priority />
                </div>
              </span>

              <div className="ml-[1vh] flex-1">
                <span>{title}</span>
              </div>

              <span className="w-[3vh] h-[3vh] flex items-center justify-center mr-[2vh]">
                <div className="w-full h-full relative">
                  <Image src={status} alt="Completed" fill className="object-contain" />
                </div>
              </span>
            </button>
          ))}
        </main>
      </div>

      <div className="relative z-10">
        <BottomNav activeTab="explore" />
      </div>
    </div>
  );
}