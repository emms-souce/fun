'use client';

import { useState } from 'react';
import coupleData from '@/data/couple.json';
import { AnimatePresence, motion } from 'framer-motion';

const Gallery = () => {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);
  const { relationship } = coupleData.couple;
  
  // Mock images for the memories
  const memoryImages = [
    '/images/memory1.jpg',
    '/images/memory2.jpg',
    '/images/memory3.jpg'
  ];

  return (
    <section className="py-12 sm:py-16 px-4 md:px-8 ">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Nos Moments Préférés
        </motion.h2>
        
        <motion.p 
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 text-gray-700 dark:text-gray-300 text-sm sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Chaque instant passé ensemble crée un souvenir précieux. Voici nos moments préférés.
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 place-items-center">
          {relationship.favoriteMemories.map((memory, index) => (
            <motion.div 
              key={index}
              className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 touch-manipulation w-full bg-gradient-to-r p-[2px] from-[#2ecc71] via-[#ffd700] to-[#e74c3c]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMemory(index)}
            >
              <div className="aspect-w-16 aspect-h-9 bg-white dark:bg-gray-800 rounded-lg h-full">
                <div className="w-full h-40 sm:h-48 relative flex items-center justify-center">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 rounded-lg"
                    style={{ 
                      backgroundImage: `url(${memoryImages[index] || '/images/placeholder.jpg'})`,
                      backgroundColor: index % 2 === 0 ? '#2ecc7150' : '#e74c3c50'
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center p-4 rounded-lg">
                    <h3 className="text-white text-lg sm:text-xl font-semibold text-center drop-shadow-lg">{memory}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {selectedMemory !== null && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e :any) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">{relationship.favoriteMemories[selectedMemory]}</h3>
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 mb-4 rounded-lg overflow-hidden">
                <div className="w-full h-64 relative">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${memoryImages[selectedMemory] || '/images/placeholder.jpg'})`,
                      backgroundColor: selectedMemory % 2 === 0 ? '#2ecc7150' : '#e74c3c50'
                    }}
                  />
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                C'est un souvenir spécial que nous chérissons. Chaque moment passé ensemble enrichit notre belle histoire.
              </p>
              <div className="flex justify-end">
                <motion.button 
                  className="px-4 py-2 bg-gradient-to-r from-[#2ecc71] via-[#ffd700] to-[#e74c3c] text-white rounded-lg shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMemory(null)}
                >
                  Fermer
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;