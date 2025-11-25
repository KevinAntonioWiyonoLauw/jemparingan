"use client";

import Image from "next/image";
import React from "react";

export default function TreeBackground({
  className = "",
  width = 2000,
  height = 2000,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div
      className={`pointer-events-none select-none absolute inset-x-0 bottom-[-20vh] ml-[-21vh] z-0 flex justify-start ${className}`}
    >
      <Image
        src="/tree.webp"
        alt="Tree background"
        width={width}
        height={height}
        priority
        className="max-w-none h-auto object-contain"
        style={{ width: `${width}px` }}
      />
    </div>
  );
}