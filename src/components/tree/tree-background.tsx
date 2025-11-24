"use client";

import Image from "next/image";
import React from "react";

export default function TreeBackground({
  className = "",
  width = 1100,
  height = 900,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className={`pointer-events-none select-none absolute inset-x-0 bottom-[-18vh] z-0 flex justify-center ${className}`}>
      <Image
        src="/tree.webp"
        alt="Tree background"
        width={width}
        height={height}
        priority
        className="w-[200%] max-w-none h-auto ml-[-8vh] object-contain"
      />
    </div>
  );
}