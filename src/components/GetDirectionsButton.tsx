"use client";

import React from "react";

type GetDirectionsButtonProps = {
  lat: number;
  lng: number;
  placeId?: string;
  label?: string;
};

const GetDirectionsButton: React.FC<GetDirectionsButtonProps> = ({
  lat,
  lng,
  placeId,
  label = "Get Directions",
}) => {
  const handleClick = () => {
    const isIOS = typeof window !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
    let url = "";

    if (isIOS) {
      // Apple Maps
      url = `https://maps.apple.com/?q=${encodeURIComponent(label)}&ll=${lat},${lng}`;
    } else {
      // Google Maps
      if (placeId) {
        url = `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(placeId)}`;
      } else {
        url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      }
    }

    window.open(url, '_blank');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full bg-skyline-yellow px-4 py-2 text-skyline-blue font-bold hover:bg-skyline-yellow/90 transition"
    >
      {label}
    </button>
  );
};

export default GetDirectionsButton; 