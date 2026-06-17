'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Aurora from './Aurora';
import GradientText from './GradientText';
import BlurText from './BlurText';

const CTAComponent = ({ onOpenVideo }: { onOpenVideo: () => void }) => (
    <div className="flex flex-col gap-4 w-full md:w-auto items-center md:items-start mt-4">
        <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(168,85,247,0.5)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={onOpenVideo}
            className="relative px-8 py-3.5 text-white rounded-2xl font-black text-base uppercase italic tracking-tighter shadow-[0_20px_50px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2 group overflow-hidden w-full md:w-auto"
        >
            {/* Animated Gradient Background */}
            <motion.div
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-[#a855f7] via-[#86efac] to-[#a855f7] bg-[length:200%_100%]"
            />
            <span className="relative z-10 flex items-center gap-2" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
                <svg className="w-8 h-8 md:w-6 md:h-6 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
                </svg>
                VER DEMONSTRAÇÃO
                <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-2xl md:text-base"
                >
                    →
                </motion.span>
            </span>
        </motion.button>
        <p className="text-gray-400 text-[10px] md:text-[11px] font-light tracking-wide leading-relaxed max-w-sm text-center md:text-left font-sans">
            Assista a apresentação da nossa infraestrutura de vendas e checkout de alta conversão.
        </p>
    </div>
);

interface CheckoutDashboardSectionProps {
    showBackground?: boolean;
}

const CheckoutDashboardSection: React.FC<CheckoutDashboardSectionProps> = ({ showBackground = true }) => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [isDashLoaded, setIsDashLoaded] = useState(false);

    // 3D Parallax Tilt Effect for the dashboard mockup
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), { stiffness: 100, damping: 20 });
    const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), { stiffness: 100, damping: 20 });

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        x.set(mouseX / width);
        y.set(mouseY / height);
    };

    const handleMouseLeave = () => {
        x.set(0.5);
        y.set(0.5);
    };

    return (
        <section className="relative pt-0 pb-16 w-full flex items-center justify-center px-6 overflow-hidden bg-transparent">
            {showBackground && (
                <>
                    {/* Top Mask to fuse sections (soft transition) */}
                    <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#020205] via-[#020205]/95 to-transparent z-10 pointer-events-none" />
                    
                    {/* Bottom Mask to fuse sections (soft transition) */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020205] via-[#020205]/95 to-transparent z-10 pointer-events-none" />

                    {/* Dynamic WebGL Aurora Shifter */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
                        <Aurora colorStops={['#a855f7', '#22c55e', '#a855f7']} amplitude={1.0} blend={0.5} speed={0.4} />
                    </div>

                    {/* Ambient Background Gradient Glows */}
                    <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-gradient-to-tr from-emerald-500/10 via-transparent to-purple-500/10" />
                </>
            )}

            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 px-4 sm:px-8 md:px-16">

                {/* Left Column: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-6 text-center md:text-left items-center md:items-start"
                >
                    {/* Badge */}
                    <GradientText
                        isBackground
                        colors={["#a855f7", "#86efac"]}
                        animationSpeed={0.1}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-black font-black uppercase tracking-wider backdrop-blur-sm border border-white/15 shadow-[0_0_30px_rgba(168,85,247,0.25)]"
                    >
                        <div className="flex items-center gap-2 mix-blend-multiply italic">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[10px] md:text-[11px] hidden md:inline">INFRAESTRUTURA DE VENDAS COMPLETA</span>
                            <span className="text-[10px] md:text-[11px] md:hidden whitespace-nowrap">INFRAESTRUTURA COMPLETA</span>
                        </div>
                    </GradientText>

                    {/* Headline */}
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tighter uppercase italic text-white flex flex-col items-center md:items-start select-none">
                            <BlurText
                                text="DASHBOARD E"
                                animateBy="words"
                                delay={30}
                                className="text-white font-black"
                            />
                            <div className="flex gap-2 md:gap-4 flex-wrap justify-center md:justify-start">
                                <BlurText
                                    text="INFRA DE"
                                    animateBy="words"
                                    delay={30}
                                    className="text-purple-500 font-black"
                                />
                                <BlurText
                                    text="CHECKOUT"
                                    animateBy="words"
                                    delay={30}
                                    className="text-white font-black"
                                />
                            </div>
                        </h2>
                        <p className="text-lg md:text-xl font-light text-gray-300 leading-tight tracking-wide font-sans mt-4">
                            Tenha um painel administrativo robusto para gerenciar suas vendas, produtos, afiliados e taxas em tempo real.
                        </p>
                    </div>

                    {/* Sub-headline / Description */}
                    <div className="max-w-2xl space-y-6 flex flex-col items-center md:items-start font-sans">
                        
                        {/* Positive Points Row */}
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-white text-[10px] md:text-xs font-light tracking-wide">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                                    ✓
                                </div>
                                <span className="text-white font-semibold uppercase tracking-wider text-[9px] md:text-[10px]">Painel Administrativo Completo</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                                    ✓
                                </div>
                                <span className="text-white font-semibold uppercase tracking-wider text-[9px] md:text-[10px]">Acompanhamento em Tempo Real</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA & Proof - DESKTOP ONLY */}
                    <div className="hidden lg:block w-full">
                        <CTAComponent onOpenVideo={() => setIsVideoOpen(true)} />
                    </div>

                </motion.div>

                {/* Right Column: Visual Excellence */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateY: 5 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative perspective-1000 w-full"
                >
                    {/* Main Dashboard Card */}
                    <motion.div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: 'preserve-3d',
                            perspective: 1000
                        }}
                        className="relative aspect-[16/10] bg-[#050508] rounded-[24px] md:rounded-[32px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden group w-full"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />

                        {/* Skeleton Shimmer Screen */}
                        {!isDashLoaded && (
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/15 via-[#050508] to-purple-900/15 animate-pulse z-20 flex items-center justify-center">
                                <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
                            </div>
                        )}

                        {/* Dashboard Image */}
                        <div className="w-full h-full p-4 flex items-center justify-center relative z-10 pb-12">
                            <img
                                src="/assets/dashboard.png"
                                alt="Infrastructure Dashboard"
                                loading="lazy"
                                decoding="async"
                                width={1600}
                                height={1000}
                                onLoad={() => setIsDashLoaded(true)}
                                className={`w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-700 ${
                                    isDashLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                                }`}
                            />
                        </div>

                        {/* Animated Ticker Overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-10 bg-black/80 backdrop-blur-md border-t border-white/5 flex items-center overflow-hidden z-30">
                            <motion.div
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="flex items-center gap-12 px-6 whitespace-nowrap"
                            >
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex items-center gap-12">
                                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
                                            <span className="text-red-500/60">✕</span> Não é plugin instável
                                        </div>
                                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
                                            <span className="text-red-500/60">✕</span> Não é script improvisado
                                        </div>
                                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
                                            <span className="text-red-500/60">✕</span> Não é "sisteminha" PHP
                                        </div>
                                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-purple-400">
                                            <span className="text-green-500">✓</span>Whitelabel Completo
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Scan animation */}
                        <motion.div
                            animate={{ y: ["-100%", "300%"] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-transparent via-purple-500/10 to-transparent z-20 pointer-events-none blur-md"
                        />
                    </motion.div>

                    {/* Floating Widget: Conversion Rate */}
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -right-6 md:-right-10 top-[-10%] p-3 md:p-5 bg-[#0a0a0f]/95 backdrop-blur-2xl border border-purple-500/40 rounded-[20px] md:rounded-[24px] shadow-[0_20px_50px_rgba(168,85,247,0.25)] z-30 scale-[0.8] md:scale-100"
                    >
                        <div className="flex flex-col gap-1 w-28 md:w-36 font-sans">
                            <p className="text-[8px] md:text-[9px] font-black text-purple-400 uppercase tracking-[0.2em]">Taxa de Conversão</p>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl md:text-3xl font-black text-white italic">94%</span>
                                <span className="text-green-400 text-[10px] font-bold mb-1 flex items-center gap-0.5">
                                    ↑ +12.4%
                                </span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "94%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Widget: Zero Taxas */}
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute -left-6 md:-left-12 bottom-[-10%] p-3 md:p-4 bg-green-500/[0.07] backdrop-blur-xl border border-green-500/35 rounded-[20px] md:rounded-[24px] shadow-[0_20px_50px_rgba(34,197,94,0.22)] z-30 scale-[0.8] md:scale-100"
                    >
                        <div className="flex items-center gap-3 font-sans">
                            <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-black text-lg shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                                $
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Compromisso</p>
                                <p className="text-base md:text-lg font-black text-white italic leading-none tracking-tighter">ZERO TAXAS</p>
                                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">POR VENDA</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Background Glow */}
                    <div className="absolute -inset-10 bg-purple-600/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
                </motion.div>

                {/* CTA & Proof - MOBILE ONLY */}
                <div className="lg:hidden w-full flex justify-center mt-6">
                    <CTAComponent onOpenVideo={() => setIsVideoOpen(true)} />
                </div>

            </div>

            {/* Modal de Vídeo/Reels (Smartphone Mockup) */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-10 bg-black/85 backdrop-blur-xl"
                    >
                        {/* Backdrop click to close */}
                        <div className="absolute inset-0 cursor-pointer" onClick={() => setIsVideoOpen(false)} />

                        <div className="relative flex flex-col items-center">
                            {/* Close Button above Smartphone */}
                            <button
                                onClick={() => setIsVideoOpen(false)}
                                className="absolute -top-14 right-2 text-white/70 hover:text-white bg-black/60 hover:bg-black/80 hover:scale-110 p-2.5 rounded-full border border-white/10 transition-all flex items-center justify-center z-50 shadow-lg"
                                aria-label="Fechar"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Smartphone frame container */}
                            <motion.div
                                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                                className="relative w-[340px] h-[600px] md:w-[380px] md:h-[680px] bg-[#020205] border-[8px] border-zinc-900 rounded-[48px] overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.35)] z-10"
                            >
                                {/* Dynamic Island Notch */}
                                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center border border-white/5">
                                    <div className="w-2 h-2 bg-zinc-900 rounded-full absolute left-4 border border-white/5" />
                                    <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full absolute right-6 border border-white/5" />
                                </div>

                                <iframe
                                    className="w-full h-full border-none"
                                    src="/site_showcase_reels.html"
                                    title="Super Checkout Cinematic Demo"
                                    allow="autoplay"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default CheckoutDashboardSection;
