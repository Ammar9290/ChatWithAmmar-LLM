"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Chatbox from "./ChatBox";

export default function Navbar() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
        className="fixed w-full z-50"
      >
        <div
          className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center 
          bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
          rounded-2xl shadow-lg border border-white/20 backdrop-blur-md"
        >
          {/* Logo */}
          <h1 className="text-2xl font-extrabold text-white tracking-wide drop-shadow-md">
            Ammar Younis
          </h1>

          {/* Nav Links */}
          <ul className="hidden md:flex space-x-8 text-white font-semibold">
            {["Home", "About", "Projects", "Services", "Contact"].map((item) => (
              <motion.li
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group cursor-pointer"
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="transition-colors duration-300"
                >
                  {item}
                </Link>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
              </motion.li>
            ))}
          </ul>

          {/* Chatbot Button */}
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255,255,255,0.7)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChatOpen(!chatOpen)}
            className="ml-4 px-5 py-2 rounded-xl font-bold 
            bg-white text-blue-600 shadow-md 
            hover:bg-blue-100 transition-all duration-300"
          >
            {chatOpen ? "❌ Close Chat" : "💬 Chat"}
          </motion.button>
        </div>
      </motion.nav>

      {/* Chatbox Popup */}
      <AnimatePresence>
        {chatOpen && (
          <Chatbox onClose={() => setChatOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
