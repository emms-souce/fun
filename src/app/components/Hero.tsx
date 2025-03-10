'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import coupleData from '@/data/couple.json';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [partner1Clicks, setPartner1Clicks] = useState(0);
  const [showPartner1Score, setShowPartner1Score] = useState(false);
  const [showPartner2Score, setShowPartner2Score] = useState(false);
  const [showPartner1Facts, setShowPartner1Facts] = useState(false);
  const [showPartner2Facts, setShowPartner2Facts] = useState(false);
  const [partner1Score] = useState(20);
  const [partner2Score] = useState(9);
  const { partner1, partner2, relationship } = coupleData.couple;

  useEffect(() => {
    setIsClient(true);
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 3,
        staggerChildren: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 2 }
    }
  };

  const gradientStyle = isClient ? {
    background: `linear-gradient(135deg, 
      ${partner1.favoriteColor}40,
      ${partner2.favoriteColor}40,
      #ffd70050,
      #00000020)`,
    backdropFilter: 'blur(4px)'
  } : {};

  const partner1Style = isClient ? {
    borderColor: partner1.favoriteColor,
    boxShadow: `0 0 35px ${partner1.favoriteColor}80`
  } : {};

  const partner2Style = isClient ? {
    borderColor: partner2.favoriteColor,
    boxShadow: `0 0 35px ${partner2.favoriteColor}80`
  } : {};

  const hobbyStyle = (color: string) => isClient ? {
    backgroundColor: `${color}40`,
    backdropFilter: 'blur(8px)'
  } : {};

  return (
    <motion.section
      className="flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 overflow-x-hidden space-y-8 glass-effect"
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={containerVariants}
      style={gradientStyle}
    >
      <motion.div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 lg:gap-20 max-w-7xl w-full px-4 md:px-8 lg:px-12">
        <motion.div
          className="flex-1 text-center md:text-left w-full md:w-auto"
          variants={itemVariants}
        >
          <div 
            className="relative w-48 h-48 md:w-64 md:h-64 mx-auto md:mx-0 mb-6 rounded-full overflow-hidden border-4 shadow-lg hover-lift transition-all duration-500 bg-gradient-to-r p-[3px] from-[var(--primary)] via-[var(--accent)] to-[var(--secondary)]"
            style={partner1Style}
            onClick={() => setShowPartner1Facts(!showPartner1Facts)}
          >
            <div className="absolute inset-[3px] rounded-full overflow-hidden">
              <Image
                src={partner1.avatar}
                alt={partner1.name}
                fill
                className="object-cover"
              />
            </div>
            {showPartner1Facts && (
              <motion.div 
                className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4 text-white text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-bold mb-2">Fun Facts:</p>
                {partner1.funFacts.map((fact, index) => (
                  <p key={index} className="mb-1 text-xs">{fact}</p>
                ))}
                <p className="mt-2 text-xs font-semibold">Talent Secret: {partner1.secretTalent}</p>
              </motion.div>
            )}
          </div>
          <motion.button
            className="px-6 py-3 rounded-full text-white font-semibold mb-4 shadow-lg hover:shadow-xl transition-all duration-500 gradient-text bg-white/10 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const newClicks = partner1Clicks + 1;
              setPartner1Clicks(newClicks);
              if (newClicks === 2) {
                setShowPartner1Score(true);
                setPartner1Clicks(0);
              }
            }}
          >
            {showPartner1Score ? `${partner1Score}/20` : 'Voir la note'}
          </motion.button>
          {showPartner1Score && partner1Score < 10 && (
            <motion.div
              className="text-red-500 text-sm font-semibold mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Attention: Note insuffisante! Il faut s&apos;améliorer...
            </motion.div>
          )}
          <h2 className="text-xl md:text-2xl font-bold mb-2 gradient-text">{partner1.name}</h2>
          <p className="text-base md:text-lg mb-2">{partner1.occupation}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {partner1.hobbies.map((hobby, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm transform transition-transform hover:scale-105 active:scale-95"
                style={hobbyStyle(partner1.favoriteColor)}
              >
                {hobby}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center py-8"
          variants={itemVariants}
        >
          <p className="text-lg font-medium mb-4 glass-effect p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">{relationship.meetingStory}</p>
        </motion.div>

        <motion.div
          className="flex-1 text-center md:text-right"
          variants={itemVariants}
        >
          <div 
            className="relative w-48 h-48 md:w-64 md:h-64 mx-auto md:mx-0 md:ml-auto mb-6 rounded-full overflow-hidden border-4 shadow-lg animate-pulse animate-infinite hover:animate-none transition-all duration-500 bg-gradient-to-r p-[3px] from-[#2ecc71] via-[#ffd700] to-[#e74c3c]"
            style={partner2Style}
            onClick={() => setShowPartner2Facts(!showPartner2Facts)}
          >
            <div className="absolute inset-[3px] rounded-full overflow-hidden">
              <Image
                src={partner2.avatar}
                alt={partner2.name}
                fill
                className="object-cover"
              />
            </div>
            {showPartner2Facts && (
              <motion.div 
                className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4 text-white text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-bold mb-2">Fun Facts:</p>
                {partner2.funFacts.map((fact, index) => (
                  <p key={index} className="mb-1 text-xs">{fact}</p>
                ))}
                <p className="mt-2 text-xs font-semibold">Talent Secret: {partner2.secretTalent}</p>
              </motion.div>
            )}
          </div>
          <motion.button
            className="px-6 py-3 rounded-full text-white font-semibold mb-4 shadow-lg hover:shadow-xl transition-all duration-500 gradient-text bg-white/10 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowPartner2Score(!showPartner2Score);
            }}
          >
            {showPartner2Score ? `${partner2Score}/20` : 'Voir la note'}
          </motion.button>
          {showPartner2Score && partner2Score < 12 && (
            <motion.div
              className="text-red-500 text-sm font-semibold mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Attention: Note insuffisante! Il faut s&apos;améliorer...
            </motion.div>
          )}
          <h2 className="text-2xl font-bold mb-2">{partner2.name}</h2>
          <p className="text-lg mb-2">{partner2.occupation}</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            {partner2.hobbies.map((hobby, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm"
                style={hobbyStyle(partner2.favoriteColor)}
              >
                {hobby}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
