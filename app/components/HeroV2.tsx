'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Aurora from './Aurora';
import GradientText from './GradientText';

const HeroV2: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <Aurora
                    colorStops={['#9232ea', '#a855f7', '#9232ea']}
                    amplitude={1.2}
                    blend={0.6}
                    speed={0.4}
                />
            </div>

            <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 px-8 md:px-16 lg:px-24">

                {/* Left Column: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-start gap-8"
                >
                    {/* Badge */}
                    <GradientText
                        isBackground
                        colors={["#a855f7", "#86efac"]}
                        animationSpeed={0.1}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-black font-black uppercase tracking-wider backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                    >
                        <div className="flex items-center gap-2 mix-blend-multiply italic">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[10px] md:text-[11px]">ZERO TAXAS POR VENDA • Pague Uma Vez, Use Para Sempre</span>
                        </div>
                    </GradientText>

                    {/* Headline */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter uppercase italic text-white">
                            SEU PRÓPRIO <br />
                            <span className="text-purple-500">SISTEMA</span> DE VENDAS
                        </h1>
                        <p className="text-xl md:text-2xl font-medium text-gray-400 leading-tight">
                            A Infraestrutura Completa que Plataformas Não Oferecem.
                        </p>
                    </div>

                    {/* Sub-headline / Description */}
                    <div className="max-w-2xl space-y-8">
                        {/* Positive Points Row */}
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-white text-sm md:text-base font-medium">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <strong className="text-white">Sistema Robusto</strong>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <strong className="text-white">100% sob seu controle</strong>
                            </div>
                        </div>
                    </div>

                    {/* CTA & Proof */}
                    <div className="flex flex-col gap-4 w-full md:w-auto">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(168,85,247,0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            className="px-10 py-5 bg-purple-600 text-white rounded-2xl font-black text-lg uppercase italic tracking-tighter shadow-[0_20px_50px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-3 group"
                        >
                            🚀 CRIAR MINHA INFRAESTRUTURA AGORA
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </motion.button>
                        <p className="text-gray-500 text-[10px] md:text-[11px] font-medium leading-relaxed max-w-sm text-center md:text-left">
                            A escolha de quem está cansado de pagar taxas abusivas e quer construir verdadeiramente um negócio próprio.
                        </p>
                    </div>
                </motion.div>

                {/* Right Column: Visual Excellence */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="relative perspective-1000"
                >
                    {/* Main Dashboard Card */}
                    <div className="relative aspect-[16/10] bg-[#050508] rounded-[24px] md:rounded-[32px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden group scale-[1.2] md:scale-100 mb-12 md:mb-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-50" />

                        {/* Dashboard Image */}
                        <div className="w-full h-full p-4 flex items-center justify-center relative z-10 pb-12">
                            <img
                                src="/assets/dashboard.png"
                                alt="Infrastructure Dashboard"
                                className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-700"
                            />
                        </div>

                        {/* Animated Ticker Overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-10 bg-black/60 backdrop-blur-md border-t border-white/5 flex items-center overflow-hidden z-30">
                            <motion.div
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="flex items-center gap-12 px-6 whitespace-nowrap whitespace-nowrap"
                            >
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex items-center gap-12">
                                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
                                            <svg className="w-3 h-3 text-red-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Não é plugin instável
                                        </div>
                                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
                                            <svg className="w-3 h-3 text-red-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Não é script improvisado
                                        </div>
                                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
                                            <svg className="w-3 h-3 text-red-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Não é "sisteminha" PHP
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
                    </div>

                    {/* Floating Widget: Conversion Rate */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -right-32 md:right-0 top-[5%] md:top-[-25%] p-3 md:p-6 bg-[#0a0a0f]/90 backdrop-blur-2xl border border-purple-500/30 rounded-[20px] md:rounded-[24px] shadow-[0_20px_50px_rgba(168,85,247,0.2)] z-30 scale-[0.7] md:scale-110"
                    >
                        <div className="flex flex-col gap-1">
                            <p className="text-[8px] md:text-[10px] font-black text-purple-400 uppercase tracking-[0.2em]">Taxa de Conversão</p>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl md:text-3xl font-black text-white italic">94%</span>
                                <span className="text-green-400 text-[10px] font-bold mb-1 flex items-center gap-0.5">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                    </svg>
                                    +12.4%
                                </span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "94%" }}
                                    transition={{ duration: 1.5, delay: 1 }}
                                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Widget: Zero Taxas */}
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute -left-32 md:-left-4 bottom-[8%] md:bottom-[70%] p-3 md:p-4 bg-green-500/5 backdrop-blur-xl border border-green-500/20 rounded-[20px] md:rounded-[24px] shadow-[0_20px_50px_rgba(34,197,94,0.15)] z-20 scale-[0.7] md:scale-105"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-black text-xl shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                                $
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Compromisso</p>
                                <p className="text-lg md:text-xl font-black text-white italic leading-none tracking-tighter">ZERO TAXAS</p>
                                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">POR VENDA</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Background Glow */}
                    <div className="absolute -inset-20 bg-purple-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
                </motion.div>

            </div>
        </section>
    );
};

export default HeroV2;
