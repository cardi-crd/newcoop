"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../components/ThemeContext";

export default function AboutPage() {
  // Business information
  const store = {
    id: "about-location",
    name: "Coop by Cowpig",
    address: "429 N 4th Ave, Tucson, AZ 85713",
    hours: [
      "Friday: 11am - 10pm",
      "Saturday: 11am - 10pm",
      "Sunday: 11am - 5pm",
      "Monday: Closed",
      "Tuesday: 11am - 8pm",
      "Wednesday: 11am - 8pm",
      "Thursday: 11am - 8pm"
    ],
    phone: "+1 (520) 526-2385"
  };

  const { theme } = useTheme();
  const bgClass = theme === 'bagel' ? 'bg-[#46bafc]' : 'bg-black';
  const textClass = theme === 'bagel' ? 'text-black' : 'text-white';
  const cardBg = theme === 'bagel' ? 'bg-[#E7E4D4]' : 'bg-[#222]';
  
  return (
    <div className={`min-h-screen ${bgClass} flex flex-col items-center py-16 px-4 pb-32`}>
      
      {/* Coop Logo */}
      <div className="text-center pt-2 pb-6">
        <Link href="/" className="inline-block hover:scale-105 transition-transform duration-200 cursor-pointer">
          <Image
            src="/images/cooplogo.png"
            alt="Coop Logo - Click to go home"
            width={400}
            height={160}
            className="h-40 w-auto mx-auto"
            priority
          />
        </Link>
      </div>
      
      <h1 className={`text-5xl font-extrabold mb-6 font-['Irish_Grover',cursive] ${textClass}`}>About Us</h1>
      
      {/* Owners Photo */}
      <div className="mb-8">
        <Image
          src="/images/thomas-sarah.jpeg"
          alt="Thomas and Sarah - Owners of Coop by Cowpig"
          width={400}
          height={300}
          className="rounded-2xl shadow-lg mx-auto"
          priority
        />
      </div>
      
      {/* Who We Are Section */}
      <div className={`${cardBg} rounded-3xl shadow-lg p-8 max-w-2xl w-full space-y-6 font-josefin ${textClass}`}>
        <div>
          <h2 className="text-2xl font-bold font-['Irish_Grover',cursive] text-red-700 mb-2">Who We Are</h2>
          <p>Coop by Cowpig is Tucson's home for delicious chicken and comfort food, made fresh daily with local flavor and love.</p>
        </div>
        <div>
          <h3 className="font-bold font-['Irish_Grover',cursive] text-red-700">Address</h3>
          <p>{store.address}</p>
        </div>
        <div>
          <h3 className="font-bold font-['Irish_Grover',cursive] text-red-700">Hours</h3>
          <ul>
            {store.hours.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
        
        {/* Social Media */}
        <div>
          <h3 className="font-bold font-['Irish_Grover',cursive] text-red-700 mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.tiktok.com/@coopxcowpig"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              TikTok
            </a>
            <a
              href="https://www.instagram.com/coopxcowpig"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 