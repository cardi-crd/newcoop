// ──────────────────────────────────────────────
// src/app/location-search/page.tsx
// ──────────────────────────────────────────────
"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import stores from "@/lib/stores.json";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

export default function LocationSearchPage() {
  const [q, setQ] = useState("");
  const [focusedStoreId, setFocusedStoreId] = useState<string | undefined>(undefined);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return stores;
    return stores.filter((s) =>
      `${s.name} ${s.address}`.toLowerCase().includes(term)
    );
  }, [q]);

  const handleLocationClick = (storeId: string) => {
    setFocusedStoreId(storeId);
  };

  return (
    <main className="min-h-screen bg-[#46bafc] pb-24 pt-8">
      {/* Header */}
      <div className="container mx-auto px-6 mb-8">
        <div className="text-center pt-2 pb-4">
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
          <h1 className="font-margarine text-3xl text-white mb-2 mt-2">Find Us!</h1>
        </div>
      </div>

      {/* MAP */}
      <div className="container mx-auto px-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <LeafletMap stores={stores} focusedStoreId={focusedStoreId} />
        </div>
      </div>

      {/* STORE CARDS */}
      <div className="container mx-auto px-6 space-y-6 max-w-2xl">
        {filtered.map((s) => (
          <article
            key={s.id}
            className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:bg-white transition-all duration-200 cursor-pointer ${
              focusedStoreId === s.id ? 'ring-2 ring-red-500 bg-white' : ''
            }`}
            onClick={() => handleLocationClick(s.id)}
          >
            <h2 className="font-margarine text-xl text-gray-800 mb-2">{s.name}</h2>
            <p className="text-gray-600 mb-2">{s.address}</p>
            <p className="text-sm text-blue-600 mb-4 font-semibold">Come check out our new outside patio!</p>
            
            {/* Hours */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Hours:</h3>
              <div className="space-y-1">
                {Object.entries(s.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-gray-600">{day}:</span>
                    <span className="text-gray-800 font-medium">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                Get Directions
              </Link>
              <Link
                href={`tel:${s.phone}`}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                Call
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}