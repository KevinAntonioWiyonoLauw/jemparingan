import React from 'react';
import localFont from 'next/font/local';
import { Montserrat } from "next/font/google";

const wenhei = localFont({ 
  src: './HYWenHei.ttf', 
  display: 'swap', 
});

const fontGoogle = Montserrat({ 
  subsets: ['latin'],
});

const dataPengawas = [
    { bandul: "A", namaPengawas: "Bambang"},
    { bandul: "B", namaPengawas: "Harianto"},
    { bandul: "C", namaPengawas: "Windah"},
    { bandul: "D", namaPengawas: "Zakir"},
];

const panah = <button>
                <img src="\Next-Button.svg"/>
            </button>

export default function RekapitulasiScore() {
    return (
    <div className="min-h-screen bg-[#C3CDA3] pb-20">
        {/* <img className="absolute w-[510px] h-[600px] rotate-0 top-[265px] z-10"
        src="\pohon.svg" /> */}

        {/* Header */}
        <div>
            <div>
                <img className="absolute w-[249.3px] h-[68px] top-6 left-[21px]" 
                src="/titleBackground.svg"/>
                <img className="absolute w-[242.37px] h-[59.5px] top-[28.25px] left-[24.46px]" 
                src="/titleBackground2.svg"/>
                <img className="absolute w-[52px] h-[52px] top-[11px] left-1.5"
                src="\bunga2.svg"/>
                <img className="absolute w-[65px] h-[64.85px] top-[22.69px] left-[303.71px] rotate-10.34" 
                src="\bunga1.svg"/>
                <div className={`${wenhei.className} relative w-52 h-[49px] top-[33px] left-14`}>
                    <h1> Rekapitulasi <br/> Score Sementara </h1>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-[#EBC797] absolute h-[53px] top-[106px] left-[21px] right-[21px] rounded-xl border-[#FFDDB1] border-dashed border">
                <div className={`${fontGoogle.className} flex gap-4 p-4 items-start -mt-1.5`}>
                    <input
                        type="text"
                        placeholder="🔍︎   Search..."
                        className="bg-white h-8 rounded-lg border-[#9E9E9E] border px-3 text-[12px] focus:outline-none font-medium grow" 
                    />
                    <button
                        className="bg-[#C09759] w-[83px] h-8 rounded-lg text-white text-[12px] font-bold shrink-0">
                        Cari
                    </button>
                </div>
            </div>
        </div>

        {/* main */}
        <div className="w-[95%] mx-auto z-20"> 
            <img 
                className="w-full mt-[120px] h-auto" 
                src="/tableBg.svg"
            />
    
            <div className={`${fontGoogle.className} bg-[#D6D9D833] rounded-[14px] w-[350px] h-[374px] shadow-lg p-4 -mt-100 ml-4 text-[14px]`}> 
                <table className="w-full"> 
                <thead>
                    <tr className="font-bold">
                        <th className="py-2">↕ Bandul</th>
                        <th className="py-2">Nama Pengawas ↕</th> 
                    </tr>
                </thead>
                <tbody>
                    {dataPengawas.map((pengawas, index) => (
                        <tr key={pengawas.bandul} className="font-medium">
                            <td className="py-3 font-medium">{pengawas.bandul}</td> 
                            <td className="py-3 font-medium">{pengawas.namaPengawas}</td>
                            <td>{panah}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>

        {/* footer */}
        <footer className="w-full h-[78px] bg-[#B18746] rounded-t-[9px] bottom-0 fixed">
            <div className={`${wenhei.className} text-white text-[12px] w-full h-full flex justify-between pt-1.5 px-10`}>
                <button className="flex flex-col items-center">
                    <div className="w-[63px] h-[49px] rounded-[20px] bg-[#7D6336] flex justify-center items-center shadow-xs">
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
    </div>
  );
}