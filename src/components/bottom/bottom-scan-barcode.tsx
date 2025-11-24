import { useRouter } from "next/navigation";

export default function Bottom(){
  const router = useRouter();

    return(
        <div className="shrink-0 bg-avocado-700 text-white rounded-t-[3vh]">
        <div className="max-w-[428px] mx-auto px-[2vh] pt-[1.5vh] pb-[1.5vh]">
          <p className="text-center text-[1.8vh] font-semibold">
            Gagal input ID anak panah?
          </p>
        </div>

        <div className="bg-avocado-600 rounded-t-[3vh]">
          <div className="max-w-[428px] mx-auto px-[3vh] py-[3vh]">
            <button
              onClick={() => router.push('/scan-barcode')}
              className="w-full bg-white/5 border border-white/25 text-white py-[2.2vh] rounded-[2vh] flex flex-col items-center gap-[1.2vh] font-semibold hover:bg-white/10 transition-colors"
            >
              Klik untuk pindah ke Scan Barcode
            </button>
          </div>
        </div>
      </div>
    );
}