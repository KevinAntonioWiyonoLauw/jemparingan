'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [nik, setNik] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password tidak cocok');
      return;
    }
    router.push('/');
  };

  return (
    <div className="min-h-screen w-full flex flex-col overflow-hidden font-poppins">
      {/* HERO HIJAU */}
      <div className="relative w-full bg-avocado-200 px-6 pt-10 pb-28">
        <h1 className="text-[32px] ml-4 font-bold font-poppins text-twine-900">
          Register
        </h1>

        <Image
          src="/tree-2.webp"
          alt="Tree Illustration"
          width={300}
          height={300}
          priority
          className="absolute right-[-12vh] top-[-3vh] w-[35vh] h-auto pointer-events-none object-contain"
        />
      </div>

      {/* PANEL PUTIH FULL DARI SINI KE BAWAH */}
      <div className="flex-1 w-full bg-[#F8F6F2] rounded-t-[36px] -mt-8 relative z-10 px-10 pt-10 pb-10 font-poppins">
        <form onSubmit={handleSubmit} className="max-w-[400px] mx-auto space-y-5 font-poppins">
          {/* NAMA LENGKAP */}
          <div className="space-y-1">
            <label
              htmlFor="fullName"
              className="block text-[16px] font-poppins font-extrabold text-[#272727]"
            >
              Nama Lengkap
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-[#E5E5E5] bg-white px-4 py-3 text-[15px] text-[#3B3B3B] placeholder:text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-[#C49345]"
              required
            />
          </div>

          {/* NIK */}
          <div className="space-y-1">
            <label
              htmlFor="nik"
              className="block text-[16px] font-poppins font-extrabold text-[#272727]"
            >
              NIK
            </label>
            <input
              id="nik"
              type="text"
              placeholder="Masukkan NIK"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              className="w-full rounded-xl border border-[#E5E5E5] bg-white px-4 py-3 text-[15px] text-[#3B3B3B] placeholder:text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-[#C49345]"
              required
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-[16px] font-poppins font-extrabold text-[#272727]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#E5E5E5] bg-white px-4 py-3 text-[15px] text-[#3B3B3B] placeholder:text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-[#C49345]"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-[16px] font-poppins font-extrabold text-[#272727]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[#E5E5E5] bg-white px-4 py-3 text-[15px] text-[#3B3B3B] placeholder:text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-[#C49345]"
              required
            />
          </div>

          {/* KONFIRMASI PASSWORD */}
          <div className="space-y-1">
            <label
              htmlFor="confirmPassword"
              className="block text-[16px] font-poppins font-extrabold text-[#272727]"
            >
              Konfirmasi Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Konfirmasi ulang password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-[#E5E5E5] bg-white px-4 py-3 text-[15px] text-[#3B3B3B] placeholder:text-[#B4B4B4] focus:outline-none focus:ring-2 focus:ring-[#C49345]"
              required
            />
          </div>

          {/* TOMBOL REGISTER */}
          <button
            type="submit"
            className="w-full rounded-xl bg-[#B98133] py-3 text-[15px] font-poppins font-extrabold text-white shadow-md hover:bg-[#A36F28] transition-colors"
          >
            Register
          </button>
        </form>

        {/* LINK KE LOGIN */}
        <p className="mt-6 text-center text-[13px] text-[#8F8F8F]">
          Got an account?{' '}
          <Link
            href="/auth/login"
            className="text-[#B98133] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}