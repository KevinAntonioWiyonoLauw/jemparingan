"use client";

import React, { useState } from 'react';
import localFont from 'next/font/local';
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";

const wenhei = localFont({ 
  src: './HYWenHei.ttf', 
  display: 'swap', 
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
});

const jakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
});

const dataPengawas = [
    { bandul: "A", namaPengawas: "Bambang"},
    { bandul: "B", namaPengawas: "Harianto"},
    { bandul: "C", namaPengawas: "Windah"},
    { bandul: "D", namaPengawas: "Zakir"},
    { bandul: "E", namaPengawas: "Chelsea"},
];

const panah = <button>
                <img src="\Next-Button.svg" className="w-[21px] h-[22px]"/>
            </button>

export default function RekapitulasiScore() {
    const [inputValue, setInputValue] = useState(""); 
    
    const [searchTerm, setSearchTerm] = useState(""); 

    const filteredData = dataPengawas.filter((item) => 
        item.namaPengawas.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.bandul.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = () => {
        setSearchTerm(inputValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
    <div className="min-h-screen max-w-md bg-[#C3CDA3] pb-20">


        {/* Header */}
        <div>
            <header className="w-full h-25 relative">
                <img className="absolute w-[249.3px] h-[68px] top-6 left-[21px]" 
                src="/titleBackground.svg"/>
                <img className="absolute w-[242.37px] h-[59.5px] top-[28.25px] left-[24.46px]" 
                src="/titleBackground2.svg"/>
                <img className="absolute w-[52px] h-[52px] top-[11px] left-1.5"
                src="\bunga2.svg"/>
                <img className="absolute w-[65px] h-[64.85px] top-[22.69px] right-5 rotate-10.34" 
                src="\x.svg"/>
                <div className={`${wenhei.className} relative w-52 h-[49px] top-[33px] left-14`}>
                    <h1> Rekapitulasi <br/> Score Sementara </h1>
                </div>
            </header>

            {/* Search Bar */}
            <div className="relative z-30 pb-2">
                <div className="bg-[#EBC797] relative mx-auto h-[53px] w-[95%] rounded-xl border-[#FFDDB1] border-dashed border z-100">
                    <div className={`${montserrat.className} flex gap-4 p-4 items-start -mt-1.5`}>
                        <input
                            type="text"
                            placeholder="🔍︎   Search..."
                            className="bg-white h-8 rounded-lg border-[#9E9E9E] border px-3 text-[12px] focus:outline-none font-medium grow" 
                        
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-[#C09759] w-[83px] h-8 rounded-lg text-white text-[12px] font-bold shrink-0">
                            Cari
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* main */}
        <div className="flex flex-col w-[95%] max-w-4xl mx-auto drop-shadow-xl filter">
            <div className="relative">
                <img src="/table-top.svg" 
                    alt="" 
                    className="w-full object-cover block relative"/>
            </div>

            <div className="w-full bg-repeat-y px-8 -mt-1 relative z-0"
                style={{ 
                    backgroundImage: "url('/table-body.svg')",
                    backgroundSize: "100% auto"
                }}>
                    <table className="w-full text-[12px] -mt-12 border-separate border-spacing-y-3">
                    <thead className="top-0">
                        <tr className={`${wenhei.className} font-normal text-left`}>
                            <th className="py-2 border-b border-[#565948]">Bandul</th>
                            <th className="py-2 border-b border-[#565948]">Nama Pengawas</th>
                            <th className="py-2 border-b border-[#565948]"></th>
                        </tr>
                    </thead>
                    <tbody className={`${jakartaSans.className} text-[#343840]`}>
                        {filteredData.map((pengawas, index) => (
                            <tr key={pengawas.bandul}
                            className="font-medium"
                            style={{
                                background: index % 2 === 0
                                ? 'linear-gradient(90deg, rgba(157, 167, 117, 1) 0%, rgba(149, 158, 110, 1) 40%, rgba(141, 150, 104, 1) 70%, rgba(136, 144, 99, 0) 100%)' 
                                : 'linear-gradient(90deg, rgba(157, 167, 117, 1) 0%, rgba(160, 154, 106, 1) 60%, rgba(170, 155, 106, 0) 100%'
                            }}
                            >
                                <td className="py-3 pl-4 font-bold text-[14px]">{pengawas.bandul}</td>
                                <td className="py-3 font-semibold">{pengawas.namaPengawas}</td>
                                <td>{panah}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
            </div>
            <img src="/table-bottom.svg" 
                alt="" 
                className="w-full object-cover block -mt-1 relative z-10"/>
        </div>
        


        {/* footer */}
        <footer className="w-full max-w-md h-auto bg-[#6F7456] rounded-t-[9px] bottom-0 fixed pb-1 z-100">
            <div className={`${wenhei.className} text-white text-[12px] w-full h-full flex justify-between pt-1.5 px-10`}>
                <button className="flex flex-col items-center">
                    <div className="w-[63px] h-[49px] flex justify-center items-center shadow-xs">
                        <img className="w-[45px] h-[45px]" src="/exploreIcon.svg"/>
                    </div>
                    Explore
                </button>
    
                <button className="flex flex-col items-center">
                    <div className="w-[63px] h-[50px] flex justify-center items-center"> 
                        <img className="w-[45px] h-[45px]" src="/historyIcon.svg"/> 
                    </div>
                    History
                </button>
    
                <button className="flex flex-col items-center">
                    <div className="w-[63px] h-[50px] flex justify-center items-center"> 
                        <img className="w-[45px] h-[45px]" src="/historyIcon.svg"/> 
                    </div>
                    Updates
                </button>
            </div>
        </footer>
        {/*<img className="absolute w-[510px] h-[600px] rotate-0 top-[265px] z-10"
        src="\pohon.svg" />*/}
    </div>
  );
}