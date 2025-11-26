import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 h-full flex items-center justify-center">
        {children}
      </div>
      <div className="hidden md:flex w-1/2 h-full relative">
        <Image
          src="/img/sentra-background.webp"
          alt="SENTRA Digital Health System"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 w-full h-full bg-black/40 z-10 flex flex-col items-center justify-center">
          <h1 className="text-3xl 2xl:text-5xl font-bold text-white">SENTRA</h1>
          <p className="text-blue-300 text-base">
            Platform Manajemen Kesehatan Terpadu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
