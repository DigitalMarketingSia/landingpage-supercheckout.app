import React from 'react';
import { motion } from 'framer-motion';

interface MembrosSectionProps {
    glowOpacity: any;
    dashScale: any;
    dashY: any;
    yParallax: any;
}

const MembrosSection: React.FC<MembrosSectionProps> = ({ glowOpacity, dashScale, dashY, yParallax }) => {
    return (
        <section className="pt-0 pb-12 md:pb-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-[12vw] md:text-[7vw] font-black italic tracking-tighter uppercase mb-6 leading-[0.85]">
                            Área de Membros <br /> <span className="text-purple-500">Profissional.</span>
                        </h2>
                        <p className="text-gray-500 text-sm font-medium max-w-2xl mx-auto mt-8">
                            Uma experiência digna de streaming para seus clientes
                        </p>
                    </motion.div>
                </div>

                {/* Grid Layout: Card + Text */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Premium Showcase Card with Auto-Scroll */}
                    <div className="relative group">
                        {/* Atmospheric Glow */}
                        <motion.div
                            style={{ opacity: glowOpacity }}
                            className="absolute -inset-10 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"
                        />

                        <motion.div
                            style={{
                                scale: dashScale,
                                y: dashY
                            }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 100, damping: 30 }}
                            className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-[#1a1a24] rounded-[24px] border border-white/30 shadow-[0_60px_120px_rgba(0,0,0,0.95)] overflow-hidden"
                        >
                            {/* Inner Content Container */}
                            <div className="w-full h-full relative">
                                {/* Light overlay to lift blacks */}
                                <div className="absolute inset-0 bg-white/5 z-5 pointer-events-none" />

                                {/* Auto-Scrolling Image Container - 100% width */}
                                <div className="w-full h-full flex items-start justify-center relative z-10 overflow-hidden">
                                    <motion.img
                                        src="/members-area-showcase.png"
                                        alt="Área de Membros - Vitrine de Produtos"
                                        loading="lazy"
                                        width={1920}
                                        height={1080}
                                        className="w-full h-auto object-cover object-top mix-blend-lighten opacity-90"
                                        style={{
                                            filter: "contrast(0.95) saturate(1.2)",
                                            minHeight: "100%"
                                        }}
                                        animate={{
                                            y: ["0%", "-50%", "0%"]
                                        }}
                                        transition={{
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: "linear",
                                            repeatDelay: 2
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Neon Borders */}
                            <div className="absolute inset-0 border-2 border-purple-500/20 rounded-[24px] pointer-events-none z-40 group-hover:border-purple-500/40 transition-colors duration-500" />
                            <div className="absolute inset-0 border border-white/5 rounded-[24px] pointer-events-none z-40" />
                        </motion.div>

                        {/* Floating Feature Badges */}
                        <motion.div
                            style={{ y: yParallax }}
                            className="absolute -right-4 md:-right-6 top-1/4 p-3 md:p-4 bg-[#0a0a0f]/80 backdrop-blur-3xl border border-purple-500/30 rounded-[20px] shadow-[0_20px_60px_rgba(168,85,247,0.15)] z-40"
                        >
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs md:text-sm font-bold shadow-[0_0_20px_rgba(34,197,94,0.2)]">✓</div>
                                <div>
                                    <p className="text-[6px] md:text-[7px] font-black text-gray-500 uppercase tracking-widest">Layout Premium</p>
                                    <p className="text-xs md:text-sm font-bold text-white tracking-tight italic uppercase">Streaming</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -left-4 md:-left-6 bottom-[15%] p-3 md:p-4 bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[20px] shadow-2xl z-40"
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                                <div>
                                    <p className="text-[6px] md:text-[7px] font-black text-purple-400 uppercase tracking-widest mb-0">Design</p>
                                    <p className="text-base md:text-lg font-black text-white italic leading-tight">Moderno</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Text Content with Bullet Points */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase mb-8 leading-[0.85]">
                            Experiência <br /> <span className="text-purple-500">Premium.</span>
                        </h3>
                        <p className="text-gray-400 text-base font-medium leading-relaxed mb-12">
                            Feito para quem vende cursos, mentorias e packs digitais, sem parecer um sistema genérico de arquivos.
                        </p>
                        <div className="space-y-6">
                            {[
                                { title: 'Vitrine de Produtos', desc: 'seus produtos aparecem organizados, como numa loja' },
                                { title: 'Acesso Centralizado', desc: 'um login só, sem espalhar links soltos' },
                                { title: 'Branding Próprio', desc: 'seu logo, suas cores, sem menção ao Super Checkout' },
                                { title: 'Experiência Premium', desc: 'seu cliente sente que comprou algo de valor' }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05, duration: 0.4 }}
                                    className="flex items-start gap-4 group"
                                >
                                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 shadow-[0_0_10px_#a855f7] group-hover:scale-150 transition-transform" />
                                    <div>
                                        <span className="text-lg font-black uppercase tracking-wide block">{item.title}</span>
                                        <span className="text-sm text-gray-500 font-light">{item.desc}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="mt-12">
                            <a href="#features" className="text-purple-400 hover:text-purple-300 font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-2 group w-max">
                                Ver como fica na prática 
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default MembrosSection;
