"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function BottomNavButtons() {
  const pathname = usePathname();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/60 backdrop-blur-xl border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto flex justify-around py-4">
        <Link
          href="/"
          className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors ${
            pathname === "/" ? "text-red-600" : "text-gray-600 hover:text-red-600"
          }`}
        >
          <Image
            src="/images/computer-tower-bold-1.svg"
            alt="Menu"
            width={24}
            height={24}
            className="w-6 h-6 mb-1"
          />
          <span className="text-xs font-medium font-['Irish_Grover',cursive]">Menu</span>
        </Link>
        
        <Link
          href="/location-search"
          className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors ${
            pathname === "/location-search" ? "text-red-600" : "text-gray-600 hover:text-red-600"
          }`}
        >
          <Image
            src="/images/map-pin-area-bold.svg"
            alt="Location"
            width={24}
            height={24}
            className="w-6 h-6 mb-1"
          />
          <span className="text-xs font-medium font-['Irish_Grover',cursive]">Location</span>
        </Link>
        
        <Link
          href="https://www.clover.com/online-ordering/cowpigcoop"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-3 bg-red-500 rounded-full px-4 py-2"
        >
          <Image
            src="/images/fork-knife-bold.svg"
            alt="Order"
            width={24}
            height={24}
            className="w-6 h-6 mb-1"
          />
          <span className="text-xs font-semibold text-white font-['Irish_Grover',cursive]">Order</span>
        </Link>
        
        <Link
          href="/about"
          className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors ${
            pathname === "/about" ? "text-red-600" : "text-gray-600 hover:text-red-600"
          }`}
        >
          <Image
            src="/images/users-three-bold.svg"
            alt="About"
            width={24}
            height={24}
            className="w-6 h-6 mb-1"
          />
          <span className="text-xs font-medium font-['Irish_Grover',cursive]">About</span>
        </Link>
        
        <Link
          href="/contact"
          className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors ${
            pathname === "/contact" ? "text-red-600" : "text-gray-600 hover:text-red-600"
          }`}
        >
          <Image
            src="/images/mailbox-bold.svg"
            alt="Contact"
            width={24}
            height={24}
            className="w-6 h-6 mb-1"
          />
          <span className="text-xs font-medium font-['Irish_Grover',cursive]">Contact</span>
        </Link>
      </div>
    </div>
  );
} 