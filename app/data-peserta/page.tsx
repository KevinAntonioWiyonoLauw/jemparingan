export default function DataPesertaPage() {
  return (
    <div className="min-h-screen bg-[#f5efe8] flex justify-center items-start py-10">
      <div className="w-full max-w-md bg-[#faf5f1] rounded-3xl shadow-md border border-[#f1e3da]">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 pt-6 pb-3">
          <h1 className="text-2xl font-extrabold text-[#161018]">
            Data Peserta
          </h1>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-[#fbd1dc] flex items-center justify-center text-[#161018] font-bold"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

