import React from 'react';
import { motion } from 'framer-motion';

const SocialProof = () => {
  return (
    <section className="py-12 border-y border-white/5 bg-black overflow-hidden relative z-10 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <p className="text-center text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-8">
        Usado pelos top 1% dos criadores
      </p>
      <div className="flex whitespace-nowrap opacity-40">
        <motion.div 
          className="flex gap-16 md:gap-24 items-center"
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
        >
          {/* Duplicated for seamless loop. Using placeholders representing brand archetypes */}
          {[...Array(4)].map((_, groupIdx) => (
             <div key={groupIdx} className="flex gap-16 md:gap-24 items-center">
               {["INFOPRODUTOR", "SCALE", "MENTORIA VIP", "7 DÍGITOS", "ELITE CLUB", "HIGH TICKET"].map((logo, i) => (
                 <span key={i} className="text-2xl md:text-4xl font-black italic text-gray-400 tracking-tighter uppercase mix-blend-overlay">
                    {logo}
                 </span>
               ))}
             </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
