"use client";

import Navbar from "../app/components/navbar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-24 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.img
          src="/profile.jpg"
          alt="Ammar"
          className="w-44 h-44 mx-auto rounded-full shadow-[0_0_40px_rgba(59,130,246,0.7)] border-4 border-blue-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.h1
          className="text-5xl font-extrabold mt-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ammar Younis
        </motion.h1>
        <motion.p
          className="text-gray-300 mt-2 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          🚀 BSCS Graduate • 3 Years Experience • AI & Web Enthusiast
        </motion.p>
      </section>

      {/* About */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <motion.h2
          className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="text-lg text-gray-300 leading-relaxed bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          I am a BSCS graduate with 3 years of development experience.  
          I Have build multiple projects related to AI,Ml, Fullstack web and app.  
          Passionate about **AI, futuristic design!**
        </motion.p>
      </section>

      {/* Projects */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              img: "/project1.png",
              title: "InternshipLog",
              desc: "A futuristic platform for managing university internships.",
            },
            {
              img: "/project2.png",
              title: "Portfolio Website",
              desc: "This AI-powered personal website with chat integration.",
            },
          ].map((project, i) => (
            <motion.div
              key={i}
              className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-5 border border-white/10 hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={project.img}
                alt={project.title}
                className="rounded-xl shadow-lg border border-white/10"
              />
              <h3 className="text-xl font-semibold mt-4 text-white">{project.title}</h3>
              <p className="text-gray-300">{project.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <motion.h2
          className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Contact
        </motion.h2>
        <motion.div
          className="space-y-2 text-lg text-gray-300 bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p>
            📧 Email:{" "}
            <span className="font-medium text-white">ammary9290111@gmail.com</span>
          </p>
          <p>📍 Location: Islamabad, Pakistan</p>
        </motion.div>
      </section>
    </div>
  );
}
