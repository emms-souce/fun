"use client"
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen ">
      {/* <motion.h1 
        className="text-4xl md:text-5xl font-bold text-center py-8 bg-gradient-to-r from-[#09ed68] via-[#00d0ff] to-[#d71e09] text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Quel de tes dragueurs peut faire ça ?
        <motion.span 
          className="block text-2xl md:text-3xl mt-2 bg-gradient-to-r from-[#09ed68] via-[#5f8992] to-[#d07098] text-transparent bg-clip-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Je suis d&apos;abord bon ma coucoue!!!
        </motion.span>
      </motion.h1> */}
      <Hero />
      <Timeline />
      <Gallery />
    </div>
  );
}
