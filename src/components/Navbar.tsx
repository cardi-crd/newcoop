"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { useTheme } from "./ThemeContext";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScroll] = useState(false);

  /* lock body scroll while drawer open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* translucent bg after scrollY>60 */
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkCls = "px-5 py-2 text-sm font-medium transition hover:text-yellow-300";

  const { theme, toggleTheme } = useTheme();
  const menuIconColor = theme === 'pizza' ? '#fff' : '#fff';
  const findUsClass =
    (theme === 'pizza'
      ? 'text-white hover:text-yellow-300'
      : 'text-white hover:text-yellow-300') +
    " px-5 py-2 text-sm font-medium transition font-['Irish_Grover',cursive] text-lg md:text-2xl px-7 py-3";

  const drawerBg = theme === 'pizza' ? 'bg-[#303030]' : 'bg-[#46bafc]';
  const drawerText = theme === 'pizza' ? 'text-white' : 'text-white';
  const menuButtonClass = 'text-2xl font-bold transition text-left' + (theme === 'pizza' ? ' text-white hover:text-yellow-300' : ' text-white hover:text-yellow-300');
  const viewMenuBtnClass = 'mt-8 rounded-full bg-white px-8 py-4 text-center text-2xl font-bold text-black hover:bg-yellow-300 transition shadow font-[\'Irish_Grover\',cursive]';

  /* logo click: scroll‐to‐top if already on "/" */
  function handleLogoClick(e: React.MouseEvent) {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Irish+Grover&display=swap" rel="stylesheet" />
      </Head>
      <header
        className={
          "fixed inset-x-0 top-0 z-50 flex h-20 items-center " +
          "px-6 md:px-10 transition-colors duration-300 " +
          (scrolled ? "bg-black/20 backdrop-blur-sm" : "bg-transparent")
        }
      >
        {/* — left: Find Us! — */}
        <Link href="/location-search" className={findUsClass}>
          Find Us!
        </Link>

        {/* — centre: Coop logo — */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="absolute left-1/2 -translate-x-1/2 select-none"
          aria-label="Go to home"
        >
          <Image
            src="/Coop logo no background.png"
            alt="Coop x Cow Pig"
            width={120}
            height={120}
            className="w-[80px] md:w-[100px] h-auto"
            priority
          />
        </Link>

        {/* — right: menu button and theme toggle — */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Theme Toggle Button with emoji, shows text on hover */}
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="group relative flex items-center justify-center rounded-full border-2 border-white bg-transparent text-white font-bold transition-all duration-300 overflow-hidden w-12 h-12 hover:min-w-[200px] hover:px-6 hover:py-2 hover:w-auto hover:h-auto hover:bg-yellow-300 hover:text-black px-0 py-0"
            style={{ fontFamily: 'inherit' }}
          >
            <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-0 ease-in-out opacity-0 group-hover:opacity-100 text-sm">
              Switch to {theme === 'bagel' ? 'Pizza' : 'Bagel'} Mode
            </span>
            <span className="flex items-center justify-center w-12 h-12 transition-opacity duration-75 ease-in-out group-hover:opacity-0 text-xl">
              {theme === 'bagel' ? '🍩' : '🍕'}
            </span>
          </button>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="rounded-full p-3 hover:bg-white/20 transition-colors"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[100] bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />

            {/* drawer */}
            <motion.aside
              key="drawer"
              className={`fixed right-0 top-0 z-[200] h-full w-[420px] max-w-full min-w-[320px] ${drawerBg} ${drawerText} shadow-2xl flex flex-col font-['Irish_Grover',cursive]`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.35 }}
            >
              {/* Logo centered at the top */}
              <div className="flex flex-col items-center pt-8 pb-2">
                <Image
                  src="/Coop logo no background.png"
                  alt="Coop x Cow Pig"
                  width={120}
                  height={120}
                  className="mb-4 w-24 h-24"
                  priority
                />
                <div className="flex items-center justify-end w-full pr-8">
                  <button
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className="text-3xl font-bold text-white hover:text-yellow-300 focus:outline-none transition-colors"
                  >
                    <X className="h-8 w-8" />
                  </button>
                </div>
              </div>

              <nav className="px-10 pt-4 pb-8 flex flex-col flex-1">
                <div className="flex flex-col justify-between h-64">
                  <button
                    className={menuButtonClass}
                    style={{ fontFamily: 'inherit' }}
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => {
                        if (pathname === "/") {
                          const menuSection = document.getElementById("menu");
                          if (menuSection) {
                            menuSection.scrollIntoView({ behavior: "smooth" });
                          }
                        } else {
                          window.location.href = "/#menu";
                        }
                      }, 0);
                    }}
                  >
                    Our Menu
                  </button>
                  <Link
                    href="/about"
                    onClick={() => setOpen(false)}
                    className="text-2xl font-bold text-white hover:text-yellow-300 transition"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="text-2xl font-bold text-white hover:text-yellow-300 transition"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/merch"
                    onClick={() => setOpen(false)}
                    className={menuButtonClass}
                    style={{ fontFamily: 'inherit' }}
                  >
                    Merch
                  </Link>
                </div>
                <button
                  className="text-2xl font-bold text-white hover:text-yellow-300 transition text-left rounded-full mt-14"
                  style={{ fontFamily: 'inherit' }}
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => {
                      window.location.href = '/reheating';
                    }, 0);
                  }}
                >
                  Reheating Instructions
                </button>
              </nav>

              <div className="mt-auto flex flex-col gap-6 px-10 pb-10">
                <Link
                  href="/pickup"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-white px-8 py-4 text-center text-2xl font-bold text-black hover:bg-yellow-300 transition shadow"
                >
                  Order Pickup
                </Link>
                <Link
                  href="/delivery"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-white px-8 py-4 text-center text-2xl font-bold text-black hover:bg-yellow-300 transition shadow"
                >
                  Order Delivery
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}