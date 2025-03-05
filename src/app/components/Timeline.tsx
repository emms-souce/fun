'use client';

import { useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import coupleData from '@/data/couple.json';

const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { relationship } = coupleData.couple;
  const [selectedMoment, setSelectedMoment] = useState<number | null>(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 2 }
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 flex justify-center items-center">
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 md:mb-20 gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          Notre Histoire Ensemble
        </motion.h2>
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-secondary opacity-90 rounded-full shadow-special"></div>
          
          {/* Anniversary */}
          <TimelineItem 
            variants={itemVariants}
            title="Notre Anniversaire"
            date={new Date(relationship.anniversary).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            content="Le jour où nous sommes officiellement devenus tout sauf des inconnus."
            position="left"
          />
          
          {/* Shared Interests */}
          <TimelineItem 
            variants={itemVariants}
            title="Ce Que Nous Aimons Ensemble"
            content={
              <div className="flex flex-wrap gap-2 mt-2">
                {relationship.sharedInterests.map((interest, index) => (
                  <motion.span 
                    key={index} 
                    className="px-3 py-1 rounded-full text-sm bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            }
            position="right"
          />
          
          {/* Favorite Memories */}
          <TimelineItem 
            variants={itemVariants}
            title="Nos Souvenirs Préférés"
            content={
              <ul className="list-disc list-inside mt-2 space-y-1">
                {relationship.favoriteMemories.map((memory, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.4 }}
                    viewport={{ once: true }}
                    className="hover:text-primary cursor-pointer transition-colors duration-300"
                    onClick={() => setSelectedMoment(index)}
                  >
                    {memory}
                  </motion.li>
                ))}
              </ul>
            }
            position="left"
          />
          
          {/* Funny Moments */}
          <TimelineItem 
            variants={itemVariants}
            title="Nos Moments Drôles"
            content={
              <div className="space-y-3">
                {relationship.funnyMoments.map((moment, index) => (
                  <motion.div
                    key={index}
                    className="p-3 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {moment}
                  </motion.div>
                ))}
              </div>
            }
            position="right"
          />
        </motion.div>

        {/* Selected Memory Modal */}
        {selectedMoment !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMoment(null)}
          >
            <motion.div
              className="bg-white/90 dark:bg-gray-800/90 p-6 rounded-lg max-w-lg w-full shadow-xl backdrop-blur-md"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                {relationship.favoriteMemories[selectedMoment]}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Un moment magique qui restera gravé dans nos mémoires pour toujours.
              </p>
              <motion.button
                className="px-4 py-2 bg-gradient-to-r from-primary via-accent to-secondary text-white rounded-lg shadow-md hover:shadow-lg w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMoment(null)}
              >
                Fermer
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

interface TimelineItemProps {
  title: string;
  date?: string;
  content: React.ReactNode;
  position: 'left' | 'right';
  variants?: Variants;
}

const TimelineItem = ({ title, date, content, position, variants }: TimelineItemProps) => {
  return (
    <motion.div 
      variants={variants}
      className={`flex flex-col md:flex-row items-center md:items-start justify-between mb-8 md:mb-12 relative ${position === 'right' ? 'md:flex-row-reverse' : ''}`}
    >
      <div className={`w-full md:w-5/12 ${position === 'right' ? 'md:text-left' : 'md:text-right'} text-center mb-4 md:mb-0`}>
        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-md border border-white/20"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-bold text-lg md:text-xl mb-1 gradient-text">{title}</h3>
          {date && <p className="text-sm text-gray-500 mb-2">{date}</p>}
          <div className="text-gray-700 dark:text-gray-300 text-sm md:text-base">{content}</div>
        </motion.div>
      </div>
      
      <div className="w-6 h-6 rounded-full bg-white border-4 border-[#ffd700] z-10 my-4 md:my-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 animate-pulse shadow-lg shadow-[#ffd70060] transition-all duration-300 hover:scale-110 hover:border-[#2ecc71] hover:shadow-[#2ecc7160]"></div>
      
      <div className="w-full md:w-5/12"></div>
    </motion.div>
  );
};

export default Timeline;
