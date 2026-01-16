'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

const GlowCard: React.FC<GlowCardProps> = ({ children, className = '', delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className={`glass-card p-8 glow-border group ${className}`}
        >
            {/* Animated corner light */}
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-500/10 blur-[60px] rounded-full group-hover:bg-purple-500/20 transition-colors" />

            <div className="relative z-10">
                {children}
            </div>

            {/* Subtle border shine effect */}
            <motion.div
                className="absolute inset-0 rounded-[inherit] border border-white/5 group-hover:border-purple-500/30 transition-colors"
            />
        </motion.div>
    );
};

export default GlowCard;
