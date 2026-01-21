
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import BlurText from './components/BlurText';
import Aurora from './components/Aurora';
import GradientText from './components/GradientText';
import HeroV2 from './components/HeroV2';

// Ícones Minimalistas Premium (SVG Single-Tone)
const Icons = {
  Checkout: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Members: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Domains: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
    </svg>
  ),
  Products: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )
};

const FeatureVisual: React.FC<{ type: string }> = ({ type }) => {
  const animations = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  };

  switch (type) {
    case 'checkout':
      return (
        <motion.div {...animations} className="w-full h-full flex items-center justify-center p-8">
          <div className="w-full max-w-[260px] bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[40px] p-8 shadow-2xl relative">
            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <Icons.Checkout />
            </div>
            <div className="space-y-4">
              <div className="h-2 w-full bg-white/10 rounded-full" />
              <div className="h-2 w-2/3 bg-white/10 rounded-full" />
              <div className="h-12 w-full bg-purple-600 rounded-xl mt-8 flex items-center justify-center font-bold text-[10px] tracking-widest uppercase">Ativar Fluxo</div>
            </div>
          </div>
        </motion.div>
      );
    case 'members':
      return (
        <motion.div {...animations} className="w-full h-full flex items-center justify-center p-8">
          <div className="grid grid-cols-2 gap-3 w-full">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-video bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-2 left-2 w-1/2 h-1 bg-purple-500/40 rounded-full" />
              </div>
            ))}
          </div>
        </motion.div>
      );
    case 'domains':
      return (
        <motion.div {...animations} className="w-full h-full flex items-center justify-center p-8">
          <div className="w-full max-w-sm bg-white/[0.02] border border-purple-500/20 rounded-3xl p-8 text-center shadow-inner">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <p className="text-[11px] font-mono text-purple-400">checkout.seunegocio.com.br</p>
            </div>
            <div className="h-1.5 bg-white/5 w-full rounded-full overflow-hidden">
              <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-1/3 h-full bg-purple-500" />
            </div>
          </div>
        </motion.div>
      );
    case 'products':
      return (
        <motion.div {...animations} className="w-full h-full flex items-center justify-center relative">
          {[1, 2, 3].map(i => (
            <div key={i} className="absolute w-32 h-44 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl shadow-2xl backdrop-blur-sm" style={{ left: `${20 + i * 15}%`, top: `${15 + i * 5}%`, zIndex: 10 - i }} />
          ))}
        </motion.div>
      );
    default: return null;
  }
};

const App: React.FC = () => {
  const containerRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const featuresRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll-based animations
  const dashScale = useSpring(useTransform(scrollYProgress, [0, 0.3], [0.85, 1]), { stiffness: 100, damping: 30 });
  const dashOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const dashY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 0.4]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const showcaseFeatures = [
    { id: 'checkout', icon: <Icons.Checkout />, title: "Checkout Brutal", desc: "Aumente sua conversão com a tecnologia de carregamento mais rápida do mercado.", highlights: ["Conversão Imediata", "Order Bump 1-Click", "Mobile First"] },
    { id: 'members', icon: <Icons.Members />, title: "Área de Membros Pro", desc: "Seus alunos merecem uma experiência de streaming, não uma pasta de arquivos.", highlights: ["Layout Netflix", "Hospedagem Inclusa", "Engajamento Real"] },
    { id: 'domains', icon: <Icons.Domains />, title: "Brand Experience", desc: "Whitelabel total para você usar seu domínio e fortalecer sua autoridade.", highlights: ["SSL Ilimitado", "Setup Instantâneo", "Marca Própria"] },
    { id: 'products', icon: <Icons.Products />, title: "Escala Infinita", desc: "Infraestrutura preparada para escalar no seu ritmo.", highlights: ["Escala sob demanda", "Sem limite artificial de vendas", "Sem taxas ocultas"] }
  ];

  // Scroll-based card navigation for vertical carousel
  React.useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('features');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Check if section is in view
      if (rect.top <= 0 && rect.bottom >= viewportHeight) {
        // Calculate progress through the section (0 to 1)
        const scrollProgress = Math.abs(rect.top) / (sectionHeight - viewportHeight);

        // Map progress to card index with reduced sensitivity
        const totalCards = showcaseFeatures.length;
        const scrollMultiplier = 1.8;
        const cardIndex = Math.min(
          Math.floor((scrollProgress * totalCards) / scrollMultiplier),
          totalCards - 1
        );

        setActiveFeature(Math.max(0, cardIndex));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showcaseFeatures.length]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#030303] text-white selection:bg-purple-600/30 overflow-x-hidden font-['Plus_Jakarta_Sans']">

      {/* Full Page Aurora Background - Fixed */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <Aurora
          colorStops={['#9232ea', '#a855f7', '#9232ea']}
          amplitude={1.5}
          blend={0.7}
          speed={0.3}
        />
      </div>

      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-900/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-900/10 blur-[180px] rounded-full" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 py-6 backdrop-blur-2xl border-b border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center font-black italic shadow-[0_0_30px_rgba(168,85,247,0.5)] text-sm md:text-base">S</div>
            <span className="text-lg md:text-xl font-bold tracking-tighter uppercase italic">Super Checkout <span className="text-purple-500">.app</span></span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">
            <a href="#features" className="hover:text-white transition-all">Tecnologia</a>
            <a href="#plans" className="hover:text-white transition-all">Planos</a>
            <button className="px-8 py-2.5 bg-white text-black rounded-full text-[9px] font-black hover:bg-purple-600 hover:text-white transition-all shadow-xl">LOGAR</button>
          </div>
        </div>
      </nav>

      {/* New Hero Section */}
      <HeroV2 />

      {/* SECTION: ÁREA DE MEMBROS PROFISSIONAL */}
      < section className="py-12 md:py-24 px-6 relative z-10" >
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
                      whileHover={{
                        style: { filter: "contrast(1) saturate(1.3)" }
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
                Interface moderna tipo streaming para seus produtos digitais
              </p>
              <div className="space-y-6">
                {[
                  'Vitrine de Produtos',
                  'Acesso Centralizado',
                  'Branding Próprio',
                  'Experiência Premium'
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-600 shadow-[0_0_10px_#a855f7] group-hover:scale-150 transition-transform" />
                    <span className="text-lg font-black uppercase tracking-wide">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* NEW CARD: Member Area Dashboard Style */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-12 relative group md:max-w-lg mx-auto"
          >
            {/* Ambient Glow */}
            <div className="absolute -inset-10 bg-purple-600/20 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative w-full aspect-video bg-[#050508] rounded-[24px] border border-white/10 shadow-2xl overflow-hidden">
              {/* Inner Content */}
              <div className="w-full h-full relative">
                {/* Aurora Background Animation */}
                <div className="absolute inset-0 z-0 opacity-30">
                  <Aurora
                    color1="#9232ea"
                    colorStops={['#9232ea', '#a855f7', '#9232ea']}
                    amplitude={1.0}
                    blend={0.5}
                    speed={0.5}
                  />
                </div>

                {/* Glass Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/20 z-20 pointer-events-none" />

                {/* Image */}
                <div className="w-full h-full flex items-center justify-center relative z-30 p-4 md:p-6">
                  <img
                    src="/assets/nova-aula.png"
                    alt="Nova Aula Dashboard"
                    loading="lazy"
                    className="w-full h-full object-contain rounded-[12px]"
                  />
                </div>

                {/* Scan Line Effect */}
                <motion.div
                  animate={{ y: ["-100%", "300%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                  className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-transparent via-purple-500/10 to-transparent z-30 pointer-events-none blur-sm"
                />
              </div>

              {/* Neon Borders */}
              <div className="absolute inset-0 border-2 border-purple-500/20 rounded-[24px] pointer-events-none z-40 group-hover:border-purple-500/50 transition-colors duration-500" />
              <div className="absolute inset-0 border border-white/5 rounded-[24px] pointer-events-none z-40" />
            </div>
          </motion.div>
        </div>
      </section >

      {/* SECTION: INDEPENDENT INSTALLATION & SERVERLESS INFRA */}
      <section className="py-24 px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Deep Info & Interactive Visual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                Arquitetura de Isolamento Total
              </div>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-8 leading-[0.9]">
                Instalação completa <br /> <span className="text-purple-500">e independente.</span>
              </h2>
              <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-xl mb-10">
                Cada instalação é <span className="text-white">100% isolada</span>, com sua própria estrutura, dados e controle total. Ideal tanto para uso próprio quanto para atender clientes com autoridade máxima.
              </p>

              {/* Static Isolation Nodes Visual */}
              <div className="relative h-48 w-full hidden md:block mt-8">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute p-4 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl flex items-center gap-3 transition-transform hover:translate-y-[-4px]"
                    style={{
                      left: `${15 + i * 28}%`,
                      top: `${10 + i * 12}%`,
                      zIndex: 10 - i,
                      opacity: 1 - (i * 0.15)
                    }}
                  >
                    <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Instância #{i + 1}</div>
                      <div className="text-[10px] font-bold text-white italic">Ambiente Isolado</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Cloud Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              {/* Dynamic Aura Glow */}
              <div className="absolute -inset-10 bg-purple-600/10 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              <div className="relative bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl overflow-hidden group-hover:border-purple-500/30 transition-all duration-700">
                {/* Cloud Header */}
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center text-purple-400 border border-purple-500/30">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white leading-tight">Infraestrutura própria</h3>
                    <div className="text-purple-400 text-[10px] font-black uppercase tracking-[0.2em]">Zero Custos de Servidor</div>
                  </div>
                </div>

                <div className="space-y-8">
                  <p className="text-gray-400 font-medium leading-relaxed">
                    O sistema roda em infraestrutura moderna <span className="text-white font-bold">serverless</span>. Você usa sua própria conta, mas sem precisar contratar ou gerenciar servidores físicos.
                  </p>

                  {/* Feature Checklist Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Sem VPS",
                      "Sem servidor",
                      "Sem mensalidades",
                      "Sem manutenção"
                    ].map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 bg-white/[0.03] rounded-2xl border border-purple-500/20 group/feat hover:bg-white/[0.06] transition-colors"
                      >
                        <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-white/80 whitespace-nowrap">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Label - Top Centered */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-2 bg-purple-600 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] z-20 border border-purple-400/30">
                <p className="text-[10px] font-black italic text-white uppercase tracking-[0.2em] whitespace-nowrap">Tecnologia Serverless</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION: AUTOMATED BUSINESS & METRICS */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* Left Column: Text & Metrics */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500 mb-2">Automated Business</div>
                <div className="h-1 w-12 bg-purple-600 rounded-full" />
              </div>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 leading-[0.9] text-white">
                Você foca em vender. <br />
                <span className="text-purple-500">A tecnologia cuida do resto.</span>
              </h2>

              <div className="space-y-6 mt-12">
                {[
                  "Tempo de carga médio < 0.8s",
                  "Uptime garantido 99.9%",
                  "Escala automática conforme o uso"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base font-black uppercase tracking-tight text-gray-300 group-hover/item:text-white transition-colors">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Standalone Animated Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                {/* Background Glow for Graphic */}
                <div className="absolute inset-0 bg-purple-600/5 blur-[100px] rounded-full" />

                <div className="relative z-10 flex items-end gap-3 h-32">
                  {[0.4, 0.7, 0.5, 0.9, 0.6, 1, 0.8, 0.5, 0.7].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: [`${h * 20}%`, `${h * 100}%`, `${h * 20}%`],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 1.5 + (i * 0.1),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.1
                      }}
                      className="w-4 bg-gradient-to-t from-purple-600 via-purple-400 to-white rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* Existing Hero */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 pt-12">
        <div className="text-center z-10 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-4 max-w-xs md:max-w-none">
              <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></span>
              Um sistema que não trava seu crescimento.
            </div>
            <h1 className="text-[10vw] md:text-[8vw] font-black leading-[0.95] tracking-tighter mb-10 uppercase italic text-white">
              VENDA MAIS <br />
              <GradientText
                isBackground
                colors={["#a855f7", "#86efac"]}
                animationSpeed={0.1}
                className="inline-block px-6 mb-2"
              >
                <span className="text-black mix-blend-multiply selection:bg-purple-500/30">E ESCALE&nbsp;</span>
              </GradientText> <br />
              SEM LIMITES!&nbsp;
            </h1>
            <div className="flex flex-col items-center justify-center gap-6 mt-4">
              <p className="text-gray-500 text-[12px] font-bold uppercase tracking-tight leading-relaxed text-center max-w-[400px] flex flex-row flex-wrap justify-center gap-x-8 gap-y-2 mb-4">
                <span className="flex items-center">
                  <svg className="inline-block w-3.5 h-3.5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Seu checkout.
                </span>
                <span className="flex items-center">
                  <svg className="inline-block w-3.5 h-3.5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  Suas regras.
                </span>
                <span className="flex items-center">
                  <svg className="inline-block w-3.5 h-3.5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Seu dinheiro.
                </span>
              </p>
              <div className="flex flex-col items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(168,85,247,0.4)" }}
                  onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-14 py-7 bg-purple-600 text-white rounded-[40px] font-black text-xl uppercase italic tracking-tighter shadow-2xl transition-all"
                >
                  Criar Sistema →
                </motion.button>

                {/* Social Proof */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex -space-x-3">
                    <img src="/assets/avatar1.png" alt="User" className="w-8 h-8 rounded-full border-2 border-[#030303] object-cover" />
                    <img src="/assets/avatar2.png" alt="User" className="w-8 h-8 rounded-full border-2 border-[#030303] object-cover" />
                    <img src="/assets/avatar3.png" alt="User" className="w-8 h-8 rounded-full border-2 border-[#030303] object-cover" />
                  </div>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wide flex items-center gap-2">
                    Faça parte
                    <svg className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DASHBOARD SECTION - SMOOTH & FLUID - TEMPORARILY HIDDEN */}
      {/* 
      <section className="py-16 px-6 relative z-10 overflow-visible">
        <div className="max-w-[900px] mx-auto relative group">

          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute -inset-10 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"
          />

          <motion.div
            style={{
              scale: dashScale,
              opacity: useTransform(scrollYProgress, [0, 0.15], [0.2, 1]),
              y: dashY
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-[#050508] rounded-[24px] border border-white/20 shadow-[0_60px_120px_rgba(0,0,0,0.95)] overflow-hidden"
          >
            <div className="w-full h-full relative">
              <div className="absolute inset-0 z-0 opacity-30">
                <Aurora
                  color1="#9232ea"
                  colorStops={['#9232ea', '#a855f7', '#9232ea']}
                  amplitude={1.2}
                  blend={0.6}
                  speed={0.8}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/20 z-20 pointer-events-none" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-15 pointer-events-none" />

              <div className="w-full h-full p-3 md:p-6 flex items-center justify-center relative z-10">
                <motion.img
                  src="/assets/dashboard.png"
                  alt="Super Checkout .app Dashboard"
                  className="w-full h-full object-contain"
                  initial={{ filter: "grayscale(0%)" }}
                  whileHover={{ filter: "brightness(1.1)", transition: { duration: 0.6 } }}
                />
              </div>

              <motion.div
                animate={{ y: ["-100%", "300%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute top-0 left-0 w-full h-[15%] bg-gradient-to-b from-transparent via-purple-500/15 to-transparent z-30 pointer-events-none blur-sm"
              />
            </div>

            <div className="absolute inset-0 border-2 border-purple-500/20 rounded-[24px] pointer-events-none z-40 group-hover:border-purple-500/40 transition-colors duration-500" />
            <div className="absolute inset-0 border border-white/5 rounded-[24px] pointer-events-none z-40" />
          </motion.div>

          <motion.div
            style={{ y: yParallax }}
            className="absolute -right-2 md:-right-6 top-1/4 p-3 md:p-4 bg-[#0a0a0f]/80 backdrop-blur-3xl border border-purple-500/30 rounded-[16px] md:rounded-[20px] shadow-[0_20px_60px_rgba(168,85,247,0.15)] block z-40 scale-75 md:scale-100"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs md:text-sm font-bold shadow-[0_0_20px_rgba(34,197,94,0.2)]">✓</div>
              <div>
                <p className="text-[6px] md:text-[7px] font-black text-gray-500 uppercase tracking-widest">Status da Engine</p>
                <p className="text-xs md:text-sm font-bold text-white tracking-tight italic uppercase">Alta Performance</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-2 md:-left-6 bottom-[10%] p-3 md:p-4 bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[16px] md:rounded-[20px] shadow-2xl block z-40 scale-75 md:scale-100"
          >
            <p className="text-[6px] md:text-[7px] font-black text-purple-400 uppercase tracking-widest mb-1">Conversão Ativa</p>
            <p className="text-base md:text-lg font-black text-white italic">+94.0%</p>
          </motion.div>
        </div>
      </section>
      */}

      {/* PERFORMANCE METRICS */}
      <section className="pt-32 pb-8 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-[7vw] font-black italic tracking-tighter uppercase mb-6 leading-[0.85]">
              Performance <br /> <span className="text-purple-500">Brutal.</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-16">
            {[
              { label: 'Velocidade de Carga', value: 98, color: '#a855f7', path: "M0,80 Q50,75 100,30 T200,40 T300,10" },
              { label: 'Taxa de Conversão', value: 94, color: '#22c55e', path: "M0,80 Q75,40 150,70 T300,20" },
              { label: 'Uptime & Estabilidade', value: 99, color: '#3b82f6', path: "M0,70 Q150,65 300,68" },
              { label: 'Segurança & LGPD', value: 100, color: '#f97316', path: "M0,85 Q50,30 100,50 T200,20 T300,5" }
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="relative group"
              >
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-2 block">{metric.label}</span>
                    <div className="h-1 w-12 bg-white/10 rounded-full" />
                  </div>
                  <span className="text-4xl font-black italic text-white flex items-end gap-1">
                    {metric.value}<span className="text-lg opacity-30 mt-1">%</span>
                  </span>
                </div>

                <div className="h-40 w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`grad-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={metric.color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={metric.color} stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Reference Grid */}
                    <line x1="0" y1="100" x2="300" y2="100" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />

                    {/* Area Fill */}
                    <motion.path
                      d={`${metric.path} L300,100 L0,100 Z`}
                      fill={`url(#grad-${i})`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                    />

                    {/* Main Stroke */}
                    <motion.path
                      d={metric.path}
                      fill="none"
                      stroke={metric.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                    />

                    {/* Laser Pulse Effect */}
                    <motion.path
                      d={metric.path}
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0.1, pathOffset: 0, opacity: 0 }}
                      animate={{
                        pathOffset: [0, 1.2],
                        opacity: [0, 1, 1, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1.5 + (i * 0.4)
                      }}
                      style={{ filter: `drop-shadow(0 0 8px white)` }}
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* New Card: Núcleo Reativo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 p-12 bg-gradient-to-br from-purple-950/40 via-purple-900/10 to-transparent border border-purple-500/30 rounded-[48px] relative overflow-hidden group hover:border-purple-500/50 transition-all duration-700 shadow-[0_0_50px_rgba(168,85,247,0.1)]"
          >
            {/* Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(168,85,247,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="w-20 h-20 bg-purple-600/20 rounded-3xl flex items-center justify-center text-purple-500 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 shadow-xl">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-black mb-4 italic uppercase tracking-tight">Núcleo Reativo</h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                  Processamos dados em milissegundos usando arquitetura serverless de última geração. <span className="text-purple-400 font-bold">Nada de espera, apenas resultados.</span>
                </p>
              </div>

              <div className="px-8 py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-500 mb-1">LOAD SPEED</div>
                <div className="text-3xl font-black italic">120ms</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>




      {/* SECTION: EXPERIENCE SHOWCASE - VERTICAL SCROLL CAROUSEL */}
      <section id="features" className="relative z-10 mt-12 md:mt-48">
        <div className="py-32 lg:h-screen lg:sticky lg:top-0 flex items-center justify-center px-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-10">
              <div>
                <h2 className="text-6xl md:text-[7vw] font-black italic tracking-tighter uppercase mb-6 leading-[0.85]">
                  Experiência <br /> <span className="text-purple-500">Sem Atrito.</span>
                </h2>
                <div className="h-1.5 w-32 bg-purple-600 rounded-full" />
              </div>
              <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.6em] max-w-xs text-right leading-relaxed">
                Design minimalista. <br />Engenharia máxima.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-center h-auto lg:h-[600px]">

              {/* MOBILE: Simple Stacked Cards */}
              <div className="lg:hidden w-full space-y-4">
                {showcaseFeatures.map((f, i) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    onClick={() => setActiveFeature(i)}
                    className={`p-6 rounded-[32px] cursor-pointer transition-all duration-500 ${activeFeature === i
                      ? 'bg-[#0a0a0f] border-2 border-purple-500/40 shadow-[0_0_20px_#a855f7]'
                      : 'bg-[#0a0a0f]/50 border border-white/10'
                      }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeFeature === i ? 'bg-purple-600 text-white shadow-[0_0_15px_#a855f7]' : 'bg-white/5 text-gray-500'
                        }`}>
                        {f.icon}
                      </div>
                      <h3 className="text-base font-black italic uppercase tracking-wide">{f.title}</h3>
                    </div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {activeFeature === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-white/10">
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">{f.desc}</p>
                            <div className="space-y-3">
                              {f.highlights.map(h => (
                                <div key={h} className="flex items-center gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
                                  <span className="text-xs font-bold uppercase tracking-wider text-white/70">{h}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* DESKTOP: Vertical Card Carousel */}
              <div className="hidden lg:flex lg:w-[400px] relative h-full flex-col justify-center">
                <div className="relative h-[500px] flex flex-col items-center justify-center">
                  {showcaseFeatures.map((f, i) => {
                    const offset = i - activeFeature;
                    const isActive = i === activeFeature;
                    const isPrev = offset === -1;
                    const isNext = offset === 1;
                    const isVisible = Math.abs(offset) <= 1;

                    return (
                      <motion.div
                        key={f.id}
                        animate={{
                          y: offset * 140,
                          scale: isActive ? 1 : 0.85,
                          opacity: isActive ? 1 : isPrev || isNext ? 0.3 : 0,
                          filter: isActive ? 'blur(0px)' : 'blur(2px)'
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`absolute w-full p-8 rounded-[48px] cursor-pointer flex items-center gap-6 ${isActive
                          ? 'bg-[#0a0a0f] border-2 border-purple-500/40 shadow-[0_0_30px_#a855f7] z-20'
                          : 'bg-[#0a0a0f]/50 border border-white/5 z-10'
                          }`}
                        style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
                        onClick={() => setActiveFeature(i)}
                      >
                        <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all ${isActive ? 'bg-purple-600 text-white shadow-[0_0_20px_#a855f7]' : 'bg-white/5 text-gray-500'
                          }`}>
                          {f.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-black italic uppercase tracking-[0.15em]">{f.title}</h3>
                          {isActive && <motion.div layoutId="bar" className="h-0.5 w-12 bg-purple-500 mt-2" />}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Scroll Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                  {showcaseFeatures.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveFeature(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === activeFeature ? 'bg-purple-500 w-8' : 'bg-white/20'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* DESKTOP: Content Display */}
              <div className="hidden lg:flex flex-1 bg-[#0a0a0f] border border-white/5 rounded-[70px] relative overflow-hidden flex-col lg:flex-row shadow-inner h-full">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(168,85,247,0.04)_0%,_transparent_50%)]" />

                <div className="flex-1 relative min-h-[400px]">
                  <AnimatePresence mode="wait">
                    <FeatureVisual key={showcaseFeatures[activeFeature].id} type={showcaseFeatures[activeFeature].id} />
                  </AnimatePresence>
                </div>

                <div className="lg:w-[350px] p-16 flex flex-col justify-center border-l border-white/5 relative z-10 backdrop-blur-sm">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeFeature} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.5 }}>
                      <h4 className="text-2xl font-black italic uppercase mb-6 text-purple-400 tracking-tighter">Specs</h4>
                      <p className="text-gray-400 text-[13px] font-medium leading-loose mb-12">{showcaseFeatures[activeFeature].desc}</p>
                      <div className="space-y-5">
                        {showcaseFeatures[activeFeature].highlights.map(h => (
                          <div key={h} className="flex items-center gap-4 group">
                            <div className="w-2 h-2 rounded-full bg-purple-600 shadow-[0_0_10px_#a855f7]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80 group-hover:text-white transition-colors">{h}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Spacer for scroll-jacking - creates space for scrolling through all cards (desktop only) */}
        <div className="hidden lg:block" style={{ height: `${showcaseFeatures.length * 25}vh` }} />
      </section >

      {/* SECTION 2: CHECKOUT QUE VENDE */}
      < section className="py-0 px-6 relative z-10 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-6xl md:text-[7vw] font-black italic tracking-tighter uppercase mb-6 leading-[0.85]">
                Checkout que <br /> <span className="text-purple-500">Vende.</span>
              </h2>
              <p className="text-gray-500 text-sm font-medium max-w-2xl mx-auto mt-8">
                Otimizado para conversão máxima em qualquer dispositivo
              </p>
            </motion.div>
          </div>

          {/* Grid Layout: Checkout Mockup + Feature Bullets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Virtual Checkout Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[40px] p-8 overflow-hidden group order-2 lg:order-1"
            >
              {/* Radial Gradient Background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(168,85,247,0.1)_0%,_transparent_70%)]" />

              {/* Virtual Checkout Elements */}
              <div className="relative z-10 space-y-6">

                {/* Product Header with Image Placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl"
                >
                  <div className="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="h-3 w-3/4 bg-white/10 rounded-full mb-2" />
                    <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                  </div>
                </motion.div>

                {/* Form Fields (Email & Name) */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="space-y-3"
                >
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="h-2 w-1/4 bg-white/10 rounded-full mb-3" />
                    <div className="h-3 w-full bg-white/5 rounded-full" />
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="h-2 w-1/3 bg-white/10 rounded-full mb-3" />
                    <div className="h-3 w-full bg-white/5 rounded-full" />
                  </div>
                </motion.div>

                {/* Payment Methods (Pix & Card) */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex gap-3"
                >
                  <div className="flex-1 p-4 bg-purple-600/10 border border-purple-500/20 rounded-2xl flex items-center justify-center gap-2">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="h-2 w-12 bg-purple-400/30 rounded-full" />
                  </div>
                  <div className="flex-1 p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center gap-2">
                    <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <div className="h-2 w-12 bg-white/10 rounded-full" />
                  </div>
                </motion.div>

                {/* Order Bump */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="p-4 bg-green-600/5 border border-green-500/20 rounded-2xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-green-500/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-sm bg-green-500" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2 w-2/3 bg-green-400/20 rounded-full" />
                      <div className="h-2 w-full bg-white/5 rounded-full" />
                      <div className="h-2 w-4/5 bg-white/5 rounded-full" />
                    </div>
                  </div>
                </motion.div>

                {/* Payment Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="pt-4"
                >
                  <div className="w-full p-5 bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-shadow">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div className="h-3 w-32 bg-white/90 rounded-full" />
                  </div>
                </motion.div>

              </div>
            </motion.div>

            {/* Modern Bullet Points List */}
            <div className="space-y-8 order-1 lg:order-2">
              {[
                {
                  title: 'Alta Conversão',
                  desc: 'Design otimizado para maximizar vendas com UX testada',
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                },
                {
                  title: 'Mobile First',
                  desc: 'Experiência perfeita em smartphones e tablets',
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                },
                {
                  title: 'Order Bump & Upsell',
                  desc: 'Aumente o ticket médio automaticamente com ofertas inteligentes',
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                },
                {
                  title: 'Recuperação de Carrinho',
                  desc: 'Não perca nenhuma venda com automação inteligente',
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                },
                {
                  title: 'Checkout Seguro',
                  desc: 'SSL e criptografia de ponta a ponta para proteção total',
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                },
                {
                  title: 'Carregamento Instantâneo',
                  desc: 'Menos de 0.8s para garantir que nenhum cliente desista',
                  icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-500 group-hover:bg-purple-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300">
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-black uppercase tracking-tight mb-1 group-hover:text-purple-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section >

      {/* SECTION 3: PAGAMENTOS SEM FRICÇÃO */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-6xl md:text-[7vw] font-black italic tracking-tighter uppercase mb-6 leading-[0.85]">
                Pagamentos sem <br /> <span className="text-purple-500">Fricção.</span>
              </h2>
              <div className="h-1.5 w-32 bg-purple-600 rounded-full mx-auto mt-8" />
            </motion.div>
          </div>

          {/* BENTO GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-auto md:auto-rows-[240px]">
            {/* Main Feature: Gateways Integrados (Large) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 group relative p-6 md:p-10 bg-[#0a0a0f] border-2 border-purple-500/20 rounded-[48px] overflow-hidden hover:border-purple-500/40 transition-all duration-500 shadow-2xl"
            >
              {/* Background Glow Flare */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[80px] rounded-full group-hover:bg-purple-600/10 transition-all" />

              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent pointer-events-none" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tight mb-4">Gateways <br /> Integrados</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs">Conexão nativa com os principais processadores do mundo para garantir que cada venda passe sem obstáculos.</p>
                </div>

                {/* Visual Accent */}
                <div className="flex gap-2 mt-8 opacity-20 group-hover:opacity-40 transition-opacity">
                  <div className="h-2 w-20 bg-white rounded-full" />
                  <div className="h-2 w-10 bg-purple-500 rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Feature 2: Aprovação Instantânea (Tall) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 md:row-span-1 group relative p-8 bg-white/[0.02] border border-white/10 rounded-[40px] overflow-hidden hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="flex items-center gap-6 h-full">
                <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center text-purple-500 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-black italic uppercase tracking-tight mb-2">Aprovação Instantânea</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-black">Zero abandono. Alta velocidade.</p>
                </div>
              </div>
            </motion.div>

            {/* Feature 3: Pix, Cartão, Boleto (Wide) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 md:row-span-1 group relative p-8 bg-white/[0.02] border border-white/10 rounded-[40px] overflow-hidden hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className="flex flex-col justify-center h-full">
                <div className="flex gap-4 mb-4">
                  <div className="text-purple-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <h3 className="text-xl font-black italic uppercase tracking-tight">Multi-Pagamentos</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['PIX', 'CARTÃO DE CRÉDITO', 'BOLETO'].map(tag => (
                    <span key={tag} className="text-[8px] font-black px-3 py-1 bg-purple-600/10 border border-purple-500/20 text-purple-400 rounded-full tracking-[0.2em]">{tag}</span>
                  ))}
                  <span className="text-[8px] font-black px-3 py-1 bg-purple-600/10 border border-purple-500/20 text-purple-400 rounded-full tracking-[0.2em]">
                    CRIPTO <span className="text-white/40 ml-1">( breve )</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* TRULY FULL-WIDTH INFINITE SCROLL GATEWAY BAND (Refined) */}
        <div className="mt-16 border-y border-white/5 py-10 relative overflow-hidden bg-white/[0.01] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#030303] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#030303] to-transparent z-10" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex items-center gap-16 whitespace-nowrap"
          >
            {[
              { name: 'Mercado Pago', status: 'Ativado' },
              { name: 'Stripe', status: 'em breve' },
              { name: 'PagSeguro', status: 'em breve' },
              { name: 'Asaas', status: 'em breve' },
              { name: 'Pagar.me', status: 'em breve' },
              { name: 'PayPal', status: 'em breve' },
              // Repeated for seamless cycle
              { name: 'Mercado Pago', status: 'Ativado' },
              { name: 'Stripe', status: 'em breve' },
              { name: 'PagSeguro', status: 'em breve' },
              { name: 'Asaas', status: 'em breve' },
              { name: 'Pagar.me', status: 'em breve' },
              { name: 'PayPal', status: 'em breve' }
            ].map((gw, i) => (
              <div key={i} className="flex flex-col items-center group min-w-[200px]">
                <span className={`text-4xl font-black italic uppercase tracking-tighter transition-colors ${gw.status === 'Ativado' ? 'text-white' : 'text-white/20'}`}>
                  {gw.name}
                </span>
                <span className={`text-[7px] font-black uppercase tracking-[0.5em] mt-2 ${gw.status === 'Ativado' ? 'text-purple-500' : 'text-white/5'}`}>
                  {gw.status}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: PRODUTOS DIGITAIS */}
      <section className="py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl md:text-[7vw] font-black italic tracking-tighter uppercase mb-8 leading-[0.85]">
                Venda qualquer <br /> <span className="text-purple-500">Produto Digital.</span>
              </h2>
              <p className="text-gray-400 text-base font-medium leading-relaxed mb-12">
                Gerencie todos os seus produtos em um único lugar com total flexibilidade
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Produtos Ilimitados', desc: 'Crie quantos produtos quiser sem restrições' },
                  { title: 'Multi-Checkouts', desc: 'Checkouts personalizados para cada produto' },
                  { title: 'Liberação Automática', desc: 'Acesso instantâneo após a compra' },
                  { title: 'Gestão Centralizada', desc: 'Controle total em um dashboard único' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 shadow-[0_0_10px_#a855f7] group-hover:scale-150 transition-transform" />
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-wide mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {[1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.6 }}
                    whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
                    className="absolute w-64 h-80 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-[40px] shadow-2xl backdrop-blur-sm p-8"
                    style={{
                      left: `${10 + i * 20}%`,
                      top: `${10 + i * 10}%`,
                      zIndex: 10 - i
                    }}
                  >
                    <div className="w-12 h-12 bg-purple-600 rounded-2xl mb-6" />
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-white/10 rounded-full" />
                      <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                      <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section >


      {/* SECTION 6: AUTOMAÇÃO - TUDO CONECTADO */}
      < section className="py-16 md:py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-6xl md:text-[7vw] font-black italic tracking-tighter uppercase mb-6 leading-[0.85]">
                Tudo <br /> <span className="text-purple-500">Conectado.</span>
              </h2>
              <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto uppercase tracking-widest">
                Arquitetura aberta para automações reais
              </p>
              <div className="h-1.5 w-32 bg-purple-600 rounded-full mx-auto mt-8" />
            </motion.div>
          </div>

          <div className="relative min-h-[900px] md:min-h-[600px] flex flex-col lg:flex-row items-center justify-center py-12 md:py-20">
            {/* SVG Connections Layer (Background) - Desktop Only */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" viewBox="0 0 1200 600" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(168, 85, 247, 0.1)" />
                  <stop offset="50%" stopColor="rgba(168, 85, 247, 0.4)" />
                  <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
                </linearGradient>
              </defs>

              {/* Central to Feature Paths */}
              {[
                { x: 300, y: 150 }, // Top Left
                { x: 900, y: 150 }, // Top Right
                { x: 300, y: 450 }, // Bottom Left
                { x: 900, y: 450 }  // Bottom Right
              ].map((pos, i) => (
                <g key={i}>
                  <motion.path
                    d={`M 600 300 L ${pos.x} ${pos.y}`}
                    stroke="rgba(168, 85, 247, 0.2)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                  />
                  <motion.circle
                    r="3"
                    fill="#a855f7"
                    initial={{ offset: 0 }}
                    animate={{
                      cx: [600, pos.x],
                      cy: [300, pos.y]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.5
                    }}
                  />
                </g>
              ))}
            </svg>

            {/* Mobile Layout: Vertical Stack */}
            <div className="flex flex-col items-center gap-8 lg:hidden w-full px-6">
              {/* Central Node (Core Engine) - Top on Mobile */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="relative z-20 group"
              >
                <div className="w-40 h-40 bg-purple-600 rounded-full flex items-center justify-center p-1 relative">
                  <div className="absolute inset-0 border-2 border-dashed border-purple-400/30 rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-2 border-2 border-purple-400/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                  <div className="w-full h-full bg-[#030303] rounded-full flex flex-col items-center justify-center border border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.4)]">
                    <div className="text-3xl font-black italic text-white flex items-center justify-center">S</div>
                    <div className="text-[8px] font-black uppercase tracking-[0.2em] text-purple-400 mt-1">CORE</div>
                  </div>
                </div>
                <div className="absolute -inset-10 bg-purple-600/20 blur-[60px] rounded-full pointer-events-none group-hover:bg-purple-600/30 transition-all duration-500" />
              </motion.div>

              {/* Vertical Line Connector */}
              <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500/50 to-purple-500/20" />

              {/* Feature Cards - Vertical Stack on Mobile */}
              <div className="flex flex-col gap-8 w-full max-w-[320px]">
                {[
                  { title: 'Webhooks Nativos', desc: 'Eventos de venda e pagamento em tempo real.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
                  { title: 'Eventos Realtime', desc: 'Dados instantâneos a cada ação do sistema.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
                  { title: 'Arquitetura Aberta', desc: 'Compatível com n8n, Zapier, Make e sistemas próprios.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg> },
                  { title: 'Automação Livre', desc: 'Você define a lógica. O sistema entrega os dados.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> }
                ].map((feature, i) => (
                  <div key={i} className="relative">
                    {/* Connector Line */}
                    {i < 3 && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-0.5 h-8 bg-gradient-to-b from-purple-500/20 to-purple-500/10" />
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className="group w-full"
                    >
                      <div className="p-6 bg-[#0a0a0f]/80 backdrop-blur-2xl border border-purple-500/30 rounded-[32px] transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.5)] md:hover:border-white/5 md:hover:shadow-none">
                        <div className="w-12 h-12 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-500 mb-6 group-hover:bg-purple-600/20 group-hover:scale-110 transition-all duration-500">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-black italic uppercase tracking-tight mb-2 group-hover:text-purple-400 transition-colors">{feature.title}</h3>
                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed group-hover:text-gray-400 transition-colors uppercase tracking-wider">{feature.desc}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout: Original Absolute Positioning */}
            <div className="hidden lg:block absolute inset-0">
              {/* Central Node Wrapper - Uses Flexbox for absolute center matching SVG */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="relative group pointer-events-auto"
                >
                  <div className="w-40 h-40 bg-purple-600 rounded-full flex items-center justify-center p-1 relative">
                    <div className="absolute inset-0 border-2 border-dashed border-purple-400/30 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-2 border-2 border-purple-400/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                    <div className="w-full h-full bg-[#030303] rounded-full flex flex-col items-center justify-center border border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.4)]">
                      <div className="text-3xl font-black italic text-white flex items-center justify-center">S</div>
                      <div className="text-[8px] font-black uppercase tracking-[0.2em] text-purple-400 mt-1">CORE</div>
                    </div>
                  </div>
                  <div className="absolute -inset-10 bg-purple-600/20 blur-[60px] rounded-full pointer-events-none group-hover:bg-purple-600/30 transition-all duration-500" />
                </motion.div>
              </div>


              {/* Feature Nodes Grid */}
              <div className="absolute inset-0 grid grid-cols-2 gap-y-20 gap-x-[400px] pointer-events-none">
                {[
                  { title: 'Webhooks Nativos', desc: 'Eventos de venda e pagamento em tempo real.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>, align: 'justify-end' },
                  { title: 'Eventos Realtime', desc: 'Dados instantâneos a cada ação do sistema.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>, align: 'justify-start' },
                  { title: 'Arquitetura Aberta', desc: 'Compatível com n8n, Zapier, Make e sistemas próprios.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>, align: 'justify-end' },
                  { title: 'Automação Livre', desc: 'Você define a lógica. O sistema entrega os dados.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, align: 'justify-start' }
                ].map((feature, i) => (
                  <div key={i} className={`flex items-center ${feature.align}`}>
                    <motion.div
                      initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                      className="pointer-events-auto group w-full max-w-[280px]"
                    >
                      <div className="p-6 bg-[#0a0a0f]/80 backdrop-blur-2xl border border-purple-500/50 rounded-[32px] transition-all duration-300 shadow-[0_0_50px_rgba(168,85,247,0.4)] group-hover:border-purple-500/20 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-purple-600/5 opacity-100 group-hover:opacity-50 transition-opacity duration-300" />
                        <div className="w-12 h-12 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-500 mb-6 group-hover:bg-purple-600/20 group-hover:scale-110 transition-all duration-500">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-black italic uppercase tracking-tight mb-2 group-hover:text-purple-400 transition-colors">{feature.title}</h3>
                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed group-hover:text-gray-400 transition-colors uppercase tracking-wider">{feature.desc}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* SECTION 7: TRÁFEGO & DADOS */}
      < section className="py-32 px-6 relative z-10" >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-6xl md:text-[7vw] font-black italic tracking-tighter uppercase mb-6 leading-[0.85]">
                Dados que <br /> <span className="text-purple-500">Importam.</span>
              </h2>
              <p className="text-gray-500 text-sm font-medium max-w-2xl mx-auto mt-8">
                Rastreamento completo para otimizar suas campanhas
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Pixel Meta / Google / TikTok', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>, color: '#a855f7', glow: 'from-purple-500/20' },
              { title: 'Conversão por Checkout', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, color: '#22c55e', glow: 'from-green-500/20' },
              { title: 'Rastreamento Completo', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>, color: '#3b82f6', glow: 'from-blue-500/20' },
              { title: 'Performance Real', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, color: '#f97316', glow: 'from-orange-500/20' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: feature.color + '1a',
                  borderColor: feature.color + '4d'
                }}
                className="relative p-8 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[32px] text-center group transition-all duration-500 overflow-hidden"
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: feature.color
                }}
              >
                {/* Glow Effect from Left */}
                <div className={`absolute inset-y-0 left-0 w-[100px] bg-gradient-to-r ${feature.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all"
                    style={{
                      backgroundColor: feature.color + '33',
                      color: feature.color
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xs font-black italic uppercase tracking-wider leading-tight text-white">{feature.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* SECTION 8: GESTÃO - CONTROLE TOTAL */}
      < section className="py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[40px] p-8 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(168,85,247,0.1)_0%,_transparent_70%)]" />
              <div className="relative z-10 space-y-6">
                {[1, 2, 3, 4].map(i => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl"
                  >
                    <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 w-full bg-white/10 rounded-full mb-2" />
                      <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl md:text-[7vw] font-black italic tracking-tighter uppercase mb-8 leading-[0.85]">
                Controle <br /> <span className="text-purple-500">Total.</span>
              </h2>
              <p className="text-gray-400 text-base font-medium leading-relaxed mb-12">
                Dashboard completo com todas as métricas que você precisa
              </p>
              <div className="space-y-6">
                {[
                  'Relatórios em Tempo Real',
                  'Gestão de Clientes',
                  'Histórico de Vendas',
                  'Visão Clara do Negócio'
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-600 shadow-[0_0_10px_#a855f7] group-hover:scale-150 transition-transform" />
                    <span className="text-lg font-black uppercase tracking-wide">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section >

      {/* SECTION 9: MARCA - SUA MARCA EM PRIMEIRO LUGAR */}
      < section className="py-32 px-6 relative z-10" >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-6xl md:text-[7vw] font-black italic tracking-tighter uppercase mb-6 leading-[0.85]">
                Sua Marca em <br /> <span className="text-purple-500">Primeiro Lugar.</span>
              </h2>
              <p className="text-gray-400 text-lg font-medium mt-8 max-w-2xl mx-auto">
                A experiência é do seu produto. O sistema apenas opera nos bastidores.
              </p>
              <div className="h-1.5 w-32 bg-purple-600 rounded-full mx-auto mt-8" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Domínios Personalizados', desc: 'Checkout e área de membros no domínio do seu produto', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg> },
              { title: 'Identidade do Produto', desc: 'Logo, cores e visual aplicados à experiência do cliente final', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg> },
              { title: 'Experiência Sem Ruído', desc: 'Nada de marcas de marketplace or plataformas genéricas', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> },
              { title: 'Autoridade Visual', desc: 'Seu cliente vê um produto profissional, não uma ferramenta', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ y: -5, borderColor: 'rgba(168, 85, 247, 0.4)' }}
                className="p-10 bg-white/[0.02] border border-white/10 rounded-[32px] group hover:bg-white/[0.05] transition-all duration-500"
              >
                <div className="text-purple-500 mb-6 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black italic uppercase mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* SECTION 10: INFRA & SEGURANÇA - ENHANCED */}
      < section className="py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-6xl md:text-[7vw] font-black italic tracking-tighter uppercase mb-6 leading-[0.85]">
                Pronto para <br /> <span className="text-purple-500">Escalar.</span>
              </h2>
              <p className="text-gray-500 text-sm font-medium max-w-2xl mx-auto mt-8">
                Infraestrutura de nível empresarial para seu negócio
              </p>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* Linha Lateral Conectora */}
            <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-purple-600/50 via-purple-600/20 to-transparent mb-10" />

            <div className="space-y-16">
              {[
                { title: 'Infraestrutura Cloud', desc: 'Servidores de alta performance globais com latência reduzida.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg> },
                { title: 'Alta Performance', desc: 'Velocidade máxima em qualquer escala, suportando milhares de acessos simultâneos.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
                { title: 'Segurança e LGPD', desc: 'Proteção total dos dados dos clientes com criptografia de ponta a ponta.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
                { title: 'Estabilidade Garantida', desc: '99.9% de uptime SLA para que sua operação nunca pare.', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="relative pl-24 group"
                >
                  {/* Ícone com Círculo */}
                  <div className="absolute left-0 top-0 w-14 h-14 bg-[#030303] flex items-center justify-center rounded-2xl border border-white/10 group-hover:border-purple-500/50 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-500 z-10">
                    <div className="text-purple-500 group-hover:scale-110 transition-transform duration-500">
                      {feature.icon}
                    </div>
                  </div>

                  {/* Texto */}
                  <div className="flex flex-col pt-1">
                    <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight transition-colors duration-500 group-hover:text-purple-500">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium mt-2 max-w-xl group-hover:text-gray-400 transition-colors duration-500">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section >



      {/* PLANOS - HIGH CONTRAST */}
      < section id="plans" className="py-40 bg-white text-black relative z-10 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]" >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-40">
            <h2 className="text-8xl md:text-[9vw] font-black italic tracking-tighter uppercase leading-[0.75] mb-10 text-black">Comece <br /> <span className="text-purple-600">Agora.</span></h2>

            {/* Header Objection Killer */}
            <div className="mt-12">
              <div className="hidden md:flex flex-col items-center text-center space-y-4">
                <div className="flex items-center gap-3 text-2xl font-black italic uppercase tracking-tighter text-black">
                  <span className="text-3xl">🔒</span>
                  O sistema roda em infraestrutura moderna serverless.
                </div>
                <p className="text-gray-500/60 font-medium italic">
                  Sem VPS, sem servidor, sem mensalidades obrigatórias e sem complicação técnica.
                </p>
              </div>

              <div className="md:hidden flex flex-col items-center text-center space-y-2 px-6">
                <div className="flex items-center gap-2 text-xl font-black italic uppercase tracking-tighter text-black">
                  <span className="text-2xl">⚡</span>
                  Sem VPS. Sem servidor.
                </div>
                <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em] opacity-40">
                  Sem custo fixo obrigatório.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* PROFISSIONAL (formerly STARTER) */}
            <div className="p-12 border-4 border-black rounded-[60px] group flex flex-col justify-between min-h-[850px] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icons.Checkout />
              </div>
              <div className="relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-8 block">Sistema completo para uso próprio</span>
                <h3 className="text-3xl lg:text-5xl font-black mb-6 italic">PROFISSIONAL</h3>
                <div className="mb-8">
                  <div className="text-6xl font-black tracking-tighter">R$ 167</div>
                  <div className="border-y border-black/5 py-4 my-8">
                    <p className="text-sm font-bold opacity-40 leading-relaxed italic">
                      Ideal para quem quer vender seus próprios produtos com tecnologia de nível profissional, sem taxas e sem limitações.
                    </p>
                  </div>
                </div>
                <ul className="space-y-4 mb-16">
                  {[
                    '✓ 1 licença de uso',
                    '✓ Sistema 100% completo',
                    '✓ Produtos ilimitados',
                    '✓ Clientes ilimitados',
                    '✓ Instalação passo a passo (aulas completas)',
                    '✓ Branding próprio',
                    '✓ ZERO taxas por venda',
                    '✓ Infraestrutura própria (sem VPS, sem servidor)',
                    '✓ Segurança nível enterprise',
                    '✓ Atualizações gratuitas por 12 meses'
                  ].map(item => (
                    <li key={item} className={`text-[10px] font-black uppercase tracking-widest leading-tight ${item.includes('ZERO taxas') ? 'bg-purple-600/10 text-purple-600 px-2 py-1 rounded-md -ml-2 w-fit' : ''}`}>{item}</li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-8 border-2 border-black text-black hover:bg-black hover:text-white rounded-full font-black text-xs uppercase tracking-[0.3em] transition-all">COMEÇAR AGORA</button>
            </div>

            {/* AGÊNCIA (formerly AGENCY) */}
            <div className="p-12 bg-blue-950 text-white rounded-[60px] relative overflow-hidden shadow-[0_40px_100px_rgba(59,130,246,0.2)] border-2 border-blue-600 flex flex-col justify-between min-h-[850px]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-blue-600 px-6 py-3 rounded-b-2xl text-[9px] font-black uppercase tracking-[0.3em] animate-pulse shadow-[0_10px_20px_rgba(37,99,235,0.3)]">Recomendado</div>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,_rgba(59,130,246,0.1)_0%,_transparent_70%)]" />
              <div className="relative z-10 pt-8">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-8 block">Para quem quer vender o sistema para clientes</span>
                <h3 className="text-5xl font-black mb-6 italic text-blue-500">AGÊNCIA</h3>
                <div className="mb-8">
                  <div className="text-6xl font-black tracking-tighter">R$ 697</div>
                  <div className="border-y border-white/10 py-4 my-8">
                    <p className="text-sm font-bold opacity-60 leading-relaxed italic">
                      <span className="text-blue-500 font-black not-italic uppercase tracking-[0.2em] text-[10px] block mb-2">Tudo do plano Profissional +</span>
                      Crie uma nova fonte de renda vendendo o sistema para seus próprios clientes.
                    </p>
                  </div>
                </div>

                <ul className="space-y-4 mb-16">
                  {[
                    '✓ 1 licença comercial',
                    '✓ Até 10 ativações independentes',
                    '✓ Direito de revenda para clientes',
                    '✓ Cada cliente com ambiente próprio',
                    '✓ Cobrança livre por instalação ou projeto',
                    '✓ Licenciamento individual por cliente',
                    '✓ Controle total das ativações',
                    '✓ Infraestrutura própria (sem VPS, sem servidor)',
                    '✓ Segurança nível enterprise',
                    '✓ Atualizações gratuitas por 12 meses'
                  ].map(item => (
                    <li key={item} className={`text-[10px] font-black uppercase tracking-widest leading-tight ${item.includes('Direito de revenda') ? 'bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md -ml-2 w-fit' : ''}`}>{item}</li>
                  ))}
                </ul>
              </div>
              <button className="relative z-10 w-full py-8 bg-blue-600 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all">COMEÇAR A VENDER</button>
            </div>

            {/* EMPRESA (formerly MASTER) */}
            <div className="p-12 bg-[#050505] text-white rounded-[60px] relative overflow-hidden shadow-[0_40px_100px_rgba(168,85,247,0.3)] border-2 border-purple-600 flex flex-col justify-between min-h-[850px]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-purple-600 px-6 py-3 rounded-b-2xl text-[9px] font-black uppercase tracking-[0.3em] shadow-[0_10px_20px_rgba(168,85,247,0.3)]">Escala Total</div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-transparent" />
              <div className="relative z-10 pt-8">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-8 block">Para escalar a revenda como negócio profissional e lucrativo</span>
                <h3 className="text-5xl font-black mb-6 italic text-purple-500">MASTER</h3>
                <div className="mb-8">
                  <div className="text-6xl font-black tracking-tighter">R$ 1.497</div>
                  <div className="border-y border-white/10 py-4 my-8">
                    <p className="text-sm font-bold opacity-60 leading-relaxed italic">
                      <span className="text-purple-500 font-black not-italic uppercase tracking-[0.2em] text-[10px] block mb-2">Tudo do plano Agência +</span>
                      Máxima escala e margem para transformar o Super Checkout em um negócio de revenda profissional.
                    </p>
                  </div>
                </div>

                <ul className="space-y-4 mb-16">
                  {[
                    '✓ 1 licença comercial avançada',
                    '✓ Até 50 ativações independentes',
                    '✓ Revenda em escala profissional',
                    '✓ Custo reduzido por ativação',
                    '✓ Margem máxima de lucro',
                    '✓ Licenciamento avançado',
                    '✓ Prioridade em suporte',
                    '✓ Controle total da operação',
                    '✓ Infraestrutura própria (sem VPS, sem servidor)',
                    '✓ Segurança nível enterprise',
                    '✓ Atualizações gratuitas por 12 meses'
                  ].map(item => (
                    <li key={item} className={`text-[10px] font-black uppercase tracking-widest leading-tight ${item.includes('Revenda em escala') ? 'bg-purple-500/20 text-purple-400 px-2 py-1 rounded-md -ml-2 w-fit' : ''}`}>{item}</li>
                  ))}
                </ul>
              </div>
              <button className="relative z-10 w-full py-8 bg-purple-600 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all">ESCALAR NEGÓCIO</button>
            </div>
          </div>


        </div>
      </section >



      <footer className="py-32 bg-black border-t border-white/5 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="max-w-7xl mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-gray-800">
          <div className="text-left">
            <h2 className="text-5xl font-black italic text-white mb-8 uppercase tracking-tighter">SUPER<span className="text-purple-500">CHECKOUT</span></h2>
            <p className="max-w-sm leading-loose">A plataforma definitiva para produtos digitais de alta escala. Built for the 1%.</p>
          </div>
          <p className="max-w-sm md:text-right leading-loose">© 2026 SUPER CHECKOUT .APP — BRUTAL PERFORMANCE ENGINE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div >
  );
};

export default App;
