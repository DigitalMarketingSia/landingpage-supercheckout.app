'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GradientText from './GradientText';
import BlurText from './BlurText';

interface HeroMembersProps {
    scrollYProgress?: any;
    isDesktop?: boolean;
}

const CTAComponent = () => (
    <div className="flex flex-col gap-4 w-full items-center lg:items-start">
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center lg:justify-start">
            <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168,85,247,0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                    const plansSec = document.getElementById('plans');
                    if (plansSec) {
                        plansSec.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
                className="relative px-10 py-5 text-white rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 group overflow-hidden w-full sm:w-auto shadow-[0_10px_30px_rgba(168,85,247,0.2)]"
            >
                {/* Animated Gradient Background */}
                <motion.div
                    animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 bg-[length:200%_100%] z-0"
                />
                <span className="relative z-10 flex items-center gap-2">
                    CADASTRAR GRÁTIS
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
            </motion.button>
        </div>
        <p className="text-gray-400 text-[10px] md:text-[11px] font-light tracking-wide leading-relaxed max-w-md text-center lg:text-left font-sans">
            Sem cartão de crédito necessário. Comece em menos de 1 minuto.
        </p>
    </div>
);

const HeroMembers: React.FC<HeroMembersProps> = ({ scrollYProgress, isDesktop }) => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);

    return (
        <section className="relative w-full flex flex-col justify-start pt-28 pb-12 lg:pt-40 lg:pb-24 px-6 overflow-visible bg-transparent">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
            <div className="absolute top-[-10%] left-[20%] w-[50vw] h-[50vw] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

            {/* Mobile-only Headline (rendered above grid on mobile, hidden on desktop) */}
            <div className="block lg:hidden w-full text-center mb-6 max-w-xl mx-auto relative z-20">
                <h1 className="text-4xl sm:text-5xl font-black leading-[1.1] tracking-tighter uppercase italic text-white flex flex-col items-center select-none w-full">
                    <BlurText
                        text="EXPERIMENTE"
                        animateBy="words"
                        delay={40}
                        className="text-white font-black justify-center w-full"
                    />
                    <BlurText
                        text="GRÁTIS"
                        animateBy="words"
                        delay={40}
                        className="text-purple-500 font-black justify-center w-full"
                    />
                </h1>
            </div>

            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center relative z-10 px-4 sm:px-8 md:px-16">
                
                {/* Left Column: Text & Content */}
                <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 lg:gap-6 order-2 lg:order-1 relative z-20">
                    {/* Headline aligned correctly - desktop only */}
                    <div className="hidden lg:block space-y-4 max-w-xl w-full">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter uppercase italic text-white flex flex-col items-start select-none w-full">
                            <BlurText
                                text="EXPERIMENTE"
                                animateBy="words"
                                delay={40}
                                className="text-white font-black justify-start w-full"
                            />
                            <BlurText
                                text="GRÁTIS"
                                animateBy="words"
                                delay={40}
                                className="text-purple-500 font-black justify-start w-full"
                            />
                        </h1>
                    </div>
                    <p className="text-lg sm:text-xl font-light text-purple-200/80 leading-relaxed tracking-wide font-sans max-w-xl">
                        Monte sua área de membros premium hoje. Whitelabel total, alta velocidade e zero taxas de transação.
                    </p>
                    
                    {/* Checkpoints centered row on mobile, left-aligned on desktop */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-white text-[10px] md:text-xs font-light tracking-wide font-sans">
                        {[
                            'Ativação Imediata',
                            'Whitelabel Total',
                            'Sem Cartão de Crédito',
                            'Zero Taxas por Venda'
                        ].map((point, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)] text-[10px]">
                                    ✓
                                </div>
                                <span className="text-white/95 font-bold uppercase tracking-wider text-[9px] md:text-[10px]">{point}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="w-full mt-0">
                        <CTAComponent />
                    </div>
                </div>

                {/* Right Column: Premium Video Player Mockup with vertical light beam glow */}
                <div className="lg:col-span-7 relative flex justify-center items-center w-full min-h-[220px] sm:min-h-[300px] lg:min-h-[500px] order-1 lg:order-2 z-10">
                    
                    {/* Facho de Luz Vertical Lilás/Roxo (Estilo Chama da Imagem de Referência) */}
                    <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[120px] md:w-[260px] h-[100vh] md:h-[160vh] pointer-events-none z-0 overflow-visible opacity-40 md:opacity-90 mix-blend-screen">
                        {/* Aura Difusa Roxa Externa */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-600/40 to-purple-400/80 blur-[60px] md:blur-[120px] rounded-full" />
                        {/* Facho Lilás Vibrante Intermediário */}
                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[60px] md:w-[130px] h-full bg-gradient-to-t from-transparent via-[#a855f7]/60 to-[#c084fc]/90 blur-[20px] md:blur-[45px] rounded-full" />
                        {/* Núcleo Brilhante Branco/Lilás */}
                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[16px] md:w-[36px] h-full bg-gradient-to-t from-purple-500/10 via-white/80 to-white/95 blur-[6px] md:blur-[12px] rounded-full" />
                    </div>
                    
                    <motion.div
                        onClick={() => setIsVideoOpen(true)}
                        style={{
                            transform: 'perspective(1000px) rotateX(3deg) rotateY(-6deg)',
                            transformStyle: 'preserve-3d'
                        }}
                        className="relative w-full max-w-xl aspect-video group rounded-[24px] md:rounded-[32px] bg-[#050508] border border-purple-500/20 shadow-[0_30px_80px_rgba(0,0,0,0.9),_0_0_40px_rgba(168,85,247,0.15)] overflow-hidden cursor-pointer z-10 transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_40px_100px_rgba(0,0,0,0.95),_0_0_60px_rgba(168,85,247,0.25)]"
                    >
                        {/* Skeleton Shimmer Screen */}
                        {!isPlayerLoaded && (
                            <div className="absolute inset-0 bg-[#050508] z-20 flex items-center justify-center">
                                <div className="w-8 h-8 border-3 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
                            </div>
                        )}

                        {/* Large Video Vitrine Image */}
                        <div className="w-full h-full flex items-center justify-center relative z-10 bg-[#020205] overflow-hidden">
                            <img
                                src="/members-area-showcase.png"
                                alt="Netflix style Members Area Player"
                                loading="eager"
                                decoding="async"
                                onLoad={() => setIsPlayerLoaded(true)}
                                className={`w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.8] transition-all duration-700 ${
                                    isPlayerLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                                }`}
                            />
                            
                            {/* Inner Video Shadows & Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20 pointer-events-none" />

                            {/* Giant Pulsing Play Button overlay */}
                            <div className="absolute inset-0 flex items-center justify-center z-25">
                                <div className="relative flex items-center justify-center">
                                    <span className="absolute w-20 h-20 rounded-full bg-red-600/20 border border-red-500/35 animate-[ping_2.5s_infinite] pointer-events-none" />
                                    <span className="absolute w-28 h-28 rounded-full bg-red-600/10 border border-red-500/15 animate-[ping_3.5s_infinite] pointer-events-none" />
                                    <motion.div 
                                        whileHover={{ scale: 1.05 }}
                                        className="w-20 h-14 bg-red-600 group-hover:bg-red-500 rounded-[20px] flex items-center justify-center text-white shadow-[0_10px_35px_rgba(239,68,68,0.4)] transition-all duration-300"
                                    >
                                        <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Simulated Video Progress Bar (YouTube Style) */}
                            <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white/20 z-30 pointer-events-none">
                                <div className="w-[35%] h-full bg-purple-600 rounded-r-full shadow-[0_0_10px_#a855f7]" />
                            </div>

                            {/* Simulated Duration Pill */}
                            <div className="absolute bottom-4 right-4 px-2 py-0.5 bg-black/70 backdrop-blur-sm text-white text-[9px] font-bold rounded font-sans tracking-wide z-30 pointer-events-none border border-white/5">
                                2:15
                            </div>

                            {/* Video Title Indicator (Top Left) */}
                            <div className="absolute top-4 left-4 flex items-center gap-2 z-30 pointer-events-none font-sans">
                                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/5">
                                    Apresentação da Plataforma
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* YouTube 16:9 Video Modal */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-xl"
                    >
                        <div className="absolute inset-0 cursor-pointer" onClick={() => setIsVideoOpen(false)} />

                        <div className="relative w-full max-w-4xl flex flex-col items-center">
                            <button
                                onClick={() => setIsVideoOpen(false)}
                                className="absolute -top-14 right-2 text-white/70 hover:text-white bg-black/60 hover:bg-black/80 hover:scale-110 p-2.5 rounded-full border border-white/10 transition-all flex items-center justify-center z-50 shadow-lg"
                                aria-label="Fechar"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* YouTube 16:9 Aspect Ratio Frame Container */}
                            <motion.div
                                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="relative w-full aspect-video bg-black border border-white/10 rounded-[20px] md:rounded-[28px] overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.35)] z-10"
                            >
                                {/* YouTube Embed iframe - Replace video ID here (EngW7tLk6R8 is an elegant tech demo placeholder) */}
                                <iframe
                                    className="w-full h-full border-none"
                                    src="https://www.youtube.com/embed/EngW7tLk6R8?autoplay=1"
                                    title="Super Checkout Cinematic Demo"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default HeroMembers;
