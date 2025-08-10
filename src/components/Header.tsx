// ─────────────────────────────────────────────────────────────
// src/components/Navbar.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname                = usePathname();
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ─── lock body scroll while the drawer is open ─── */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  /* ─── cream bar after 80 px scroll ─── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  /* pages that start transparent */
  const transparentRoutes = ["/", "/location-search"];
  const needBg =
    !transparentRoutes.includes(pathname) || scrolled;

  const nav = [
    { label: "Our Menu", href: "/menu" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* ───────── HEADER BAR ───────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          needBg
            ? "bg-skyline-cream text-skyline-dark shadow-md"
            : "bg-transparent text-white"
        }`}
      >
        <div className="relative container mx-auto flex items-center justify-between px-6 py-4">
          {/* ── desktop nav ── */}
          <nav className="hidden gap-x-10 md:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm font-medium hover:text-skyline-yellow"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* ── desktop CTAs ── */}
          <div className="hidden items-center gap-x-3 md:flex">
            <Link
              href="/pickup"
              className="rounded border border-current px-4 py-2 text-sm hover:bg-current hover:text-skyline-white"
            >
              Order Pickup
            </Link>
            <Link
              href="/delivery"
              className="rounded bg-current px-4 py-2 text-sm text-skyline-white hover:opacity-80"
            >
              Order Delivery
            </Link>
          </div>

          {/* ── mobile hamburger ── */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={`md:hidden ${open && "invisible"}`}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* ── centered logo (acts as HOME link) ── */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
            aria-label="Go to homepage"
          >
            <Image
              src="/images/cooplogo.png"
              alt="Coop Logo"
              width={120}
              height={40}
              priority
              className="w-auto h-10"
            />
          </Link>
        </div>
      </header>

      {/* ───────── MOBILE DRAWER ───────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />

            {/* sliding panel */}
            <motion.aside
              key="drawer"
              className="fixed inset-y-0 right-0 z-50 w-64 bg-skyline-cream shadow-xl md:hidden"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0,       opacity: 1 }}
              exit={{    x: "100%",  opacity: 0 }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.7 }}
            >
              {/* close row */}
              <div className="flex items-center justify-end px-6 py-4">
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded p-1 transition-colors hover:bg-skyline-yellow/20"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* nav links */}
              <nav className="mt-6 flex flex-col gap-y-4 px-6">
                {nav.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium hover:text-skyline-blue"
                  >
                    {n.label}
                  </Link>
                ))}

                <Link
                  href="/pickup"
                  onClick={() => setOpen(false)}
                  className="mt-6 rounded border border-skyline-blue px-4 py-2 text-center text-sm text-skyline-blue hover:bg-skyline-blue hover:text-skyline-white"
                >
                  Order Pickup
                </Link>
                <Link
                  href="/delivery"
                  onClick={() => setOpen(false)}
                  className="rounded bg-skyline-dark px-4 py-2 text-center text-sm text-skyline-white hover:bg-skyline-red"
                >
                  Order Delivery
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}