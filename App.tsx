
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import BlurText from './components/BlurText';
import Aurora from './components/Aurora';
import GradientText from './components/GradientText';

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
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
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
    { id: 'products', icon: <Icons.Products />, title: "Escala Infinita", desc: "Infraestrutura resiliente pronta para suportar milhares de vendas simultâneas.", highlights: ["Sem Taxas Ocultas", "Dashboard Realtime", "Suporte 24h"] }
  ];

  // Auto-scroll feature activation
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setActiveFeature(index);
          }
        });
      },
      { threshold: 0.6, rootMargin: '-20% 0px -20% 0px' }
    );

    const cards = featuresRef.current?.querySelectorAll('[data-index]');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

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
      <nav className="fixed top-0 left-0 w-full z-50 px-10 py-6 flex justify-between items-center backdrop-blur-2xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center font-black italic shadow-[0_0_30px_rgba(168,85,247,0.5)]">S</div>
          <span className="text-xl font-bold tracking-tighter uppercase italic">Super Checkout <span className="text-purple-500">.app</span></span>
        </div>
        <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">
          <a href="#features" className="hover:text-white transition-all">Tecnologia</a>
          <a href="#plans" className="hover:text-white transition-all">Planos</a>
          <button className="px-10 py-3 bg-white text-black rounded-full text-[9px] font-black hover:bg-purple-600 hover:text-white transition-all shadow-xl">LOGAR</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32">
        <div className="text-center z-10 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.6em] mb-12">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]"></span>
              SISTEMA DE ALTA PERFORMANCE
            </div>
            <h1 className="text-[11vw] md:text-[9vw] font-black leading-[0.8] tracking-tighter mb-16 uppercase italic">
              VENDA + <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)" }}>E ESCALE</span> <br />
              <GradientText
                isBackground
                colors={["#a855f7", "#ffffff", "#22c55e"]}
                animationSpeed={0.1}
                className="inline-block text-white px-2"
              >
                SEM LIMITES!
              </GradientText>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-14 mt-6">
              <p className="text-gray-500 max-w-sm text-[13px] font-bold uppercase tracking-tight leading-loose text-left border-l-4 border-purple-600 pl-10">
                Um sistema que não trava seu crescimento.<br />
                Seu checkout. Suas regras. Seu dinheiro.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(168,85,247,0.4)" }}
                className="px-20 py-10 bg-purple-600 text-white rounded-[50px] font-black text-2xl uppercase italic tracking-tighter shadow-2xl transition-all"
              >
                Ativar Agora →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS COUNTER - REAL-TIME METRICS */}
      <section className="py-20 px-6 relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '25+', label: 'Integrações Nativas', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
              { value: '99.9%', label: 'Uptime Garantido', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
              { value: '∞', label: 'Produtos Ilimitados', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
              { value: '<0.8s', label: 'Tempo de Carga', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.4)' }}
                className="p-8 bg-white/[0.02] border border-white/10 rounded-[32px] text-center group hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden"
              >
                {/* Strong Glow Effect - Bottom Left */}
                <div
                  className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    background: i === 0
                      ? 'radial-gradient(circle, rgba(146, 50, 234, 0.8) 0%, rgba(168, 85, 247, 0.4) 40%, transparent 70%)'
                      : i === 1
                        ? 'radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(192, 132, 252, 0.4) 40%, transparent 70%)'
                        : i === 2
                          ? 'radial-gradient(circle, rgba(124, 58, 237, 0.8) 0%, rgba(146, 50, 234, 0.4) 40%, transparent 70%)'
                          : 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(168, 85, 247, 0.4) 40%, transparent 70%)'
                  }}
                />

                {/* Subtle top-right accent */}
                <div
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-20"
                  style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 60%)'
                  }}
                />

                <div className="relative z-10">
                  <div className="text-purple-500 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-500">
                    {stat.icon}
                  </div>
                  <div className="text-5xl font-black mb-2 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD SECTION - SMOOTH & FLUID */}
      <section className="py-16 px-6 relative z-10 overflow-visible">
        <div className="max-w-[900px] mx-auto relative group">

          {/* Luz Atmosférica Dinâmica em volta do card */}
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute -inset-10 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"
          />

          <motion.div
            style={{
              scale: dashScale,
              opacity: dashOpacity,
              y: dashY
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
            className="relative w-full aspect-[16/9] bg-[#050508] rounded-[24px] border border-white/10 shadow-[0_60px_120px_rgba(0,0,0,0.95)] overflow-hidden"
          >
            {/* Inner Content */}
            <div className="w-full h-full relative">
              {/* Aurora Background Animation */}
              <div className="absolute inset-0 z-0 opacity-30">
                <Aurora
                  color1="#9232ea"
                  colorStops={['#9232ea', '#a855f7', '#9232ea']}
                  amplitude={1.2}
                  blend={0.6}
                  speed={0.8}
                />
              </div>

              {/* Efeito de Vidro (Reflexos) */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/20 z-20 pointer-events-none" />

              {/* Overlay de Gradiente Suave para Profundidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-15 pointer-events-none" />

              {/* A IMAGEM ATUALIZADA */}
              <div className="w-full h-full p-3 md:p-6 flex items-center justify-center relative z-10">
                <motion.img
                  src="/assets/dashboard.png"
                  alt="Super Checkout .app Dashboard"
                  className="w-full h-full object-contain"
                  initial={{ filter: "grayscale(10%)" }}
                  whileHover={{ filter: "grayscale(0%)", transition: { duration: 0.6 } }}
                />
              </div>

              {/* Linha de Scan Laser Animada */}
              <motion.div
                animate={{ y: ["-100%", "300%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute top-0 left-0 w-full h-[15%] bg-gradient-to-b from-transparent via-purple-500/15 to-transparent z-30 pointer-events-none blur-sm"
              />
            </div>

            {/* Borda Neon Refinada */}
            <div className="absolute inset-0 border-2 border-purple-500/20 rounded-[24px] pointer-events-none z-40 group-hover:border-purple-500/40 transition-colors duration-500" />
            <div className="absolute inset-0 border border-white/5 rounded-[24px] pointer-events-none z-40" />
          </motion.div>

          {/* Elementos Flutuantes Interativos (Widgets) */}
          <motion.div
            style={{ y: yParallax }}
            className="absolute -right-6 top-1/4 p-4 bg-[#0a0a0f]/80 backdrop-blur-3xl border border-purple-500/30 rounded-[20px] shadow-[0_20px_60px_rgba(168,85,247,0.15)] hidden lg:block z-40"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm font-bold shadow-[0_0_20px_rgba(34,197,94,0.2)]">✓</div>
              <div>
                <p className="text-[7px] font-black text-gray-500 uppercase tracking-widest">Status da Engine</p>
                <p className="text-sm font-bold text-white tracking-tight italic uppercase">Alta Performance</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 bottom-[10%] p-4 bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[20px] shadow-2xl hidden lg:block z-40"
          >
            <p className="text-[7px] font-black text-purple-400 uppercase tracking-widest mb-1">Conversão Ativa</p>
            <p className="text-lg font-black text-white italic">+94.0%</p>
          </motion.div>
        </div>
      </section>

      {/* PERFORMANCE METRICS */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-[7vw] font-black italic tracking-tighter uppercase mb-6 leading-[0.85]">
              Performance <br /> <span className="text-purple-500">Brutal.</span>
            </h2>
          </div>

          <div className="space-y-8">
            {[
              { label: 'Velocidade de Carga', value: 98, color: 'from-purple-600 to-purple-400' },
              { label: 'Taxa de Conversão', value: 94, color: 'from-green-600 to-green-400' },
              { label: 'Uptime & Estabilidade', value: 99, color: 'from-blue-600 to-blue-400' },
              { label: 'Segurança & LGPD', value: 100, color: 'from-orange-600 to-orange-400' }
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-black uppercase tracking-wider">{metric.label}</span>
                  <span className="text-2xl font-black text-purple-400">{metric.value}%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.value}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${metric.color} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE SECTION - BACKGROUND TEXT EFFECT */}
      <section className="py-40 px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Large Background Text */}
          <div className="relative">
            <div className="absolute top-0 left-0 text-[15vw] font-black uppercase tracking-tighter opacity-5 pointer-events-none whitespace-nowrap overflow-hidden">
              INFRAESTRUTURA
            </div>

            {/* Main Title */}
            <div className="relative z-10 mb-20">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                A engenharia por <br />
                <span className="text-purple-500">trás do sucesso.</span>
              </h2>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            {/* Card 1 - Núcleo Reativo (Large) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2 p-10 bg-gradient-to-br from-purple-950/20 to-transparent border border-purple-500/20 rounded-[32px] relative overflow-hidden group hover:border-purple-500/40 transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-purple-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600/30 transition-all">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <h3 className="text-2xl font-black mb-4">Núcleo Reativo</h3>
              <p className="text-gray-400 text-sm mb-8 max-w-2xl">
                Processamos dados em milissegundos usando arquitetura serverless de última geração. Nada de espera, apenas resultados.
              </p>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-wider text-purple-400">LOAD SPEED</span>
                  <span className="text-sm font-black text-white">120ms</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "95%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Omni-Channel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="p-8 bg-white/[0.02] border border-white/10 rounded-[24px] hover:bg-white/[0.04] hover:border-purple-500/20 transition-all duration-500"
            >
              <h4 className="text-sm font-black uppercase mb-3 tracking-wider">OMNI-CHANNEL</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Integração nativa com 40+ gateways e CRM de alta performance.
              </p>
            </motion.div>

            {/* Card 3 - AI Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="p-8 bg-white/[0.02] border border-white/10 rounded-[24px] hover:bg-white/[0.04] hover:border-purple-500/20 transition-all duration-500"
            >
              <h4 className="text-sm font-black uppercase mb-3 tracking-wider">AI SECURITY</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Proteção contra fraudes em tempo real usando modelos preditivos.
              </p>
            </motion.div>

            {/* Card 4 - One-Click Buy (Large with Icon) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="md:col-span-2 p-10 bg-gradient-to-br from-purple-900/10 to-transparent border border-purple-500/20 rounded-[32px] relative overflow-hidden group hover:border-purple-500/40 transition-all duration-500 flex items-center justify-between"
            >
              <div>
                <h3 className="text-xl font-black mb-3">One-Click Buy</h3>
                <p className="text-gray-400 text-sm max-w-md">
                  Armazenamento seguro de tokens para compras instantâneas em toda a rede.
                </p>
              </div>

              {/* Icon Circle */}
              <div className="hidden md:flex w-24 h-24 bg-purple-600/10 rounded-full items-center justify-center group-hover:bg-purple-600/20 transition-all">
                <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* SECTION: EXPERIENCE SHOWCASE - MODELO NOVO ULTRA MINIMALISTA */}
      <section id="features" className="py-40 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-32 flex flex-col md:flex-row justify-between items-end gap-10">
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

          <div className="flex flex-col lg:flex-row gap-10 items-stretch h-[700px]">
            {/* Navegação Vertical */}
            <div ref={featuresRef} className="lg:w-[400px] flex flex-col gap-4">
              {showcaseFeatures.map((f, i) => (
                <div
                  key={f.id}
                  data-index={i}
                  onMouseEnter={() => setActiveFeature(i)}
                  className={`p-10 rounded-[48px] cursor-pointer transition-all duration-700 relative flex items-center gap-8 ${activeFeature === i ? 'bg-[#0a0a0f] border-2 border-purple-500/40 shadow-2xl scale-[1.03]' : 'bg-transparent border border-white/5 opacity-40 grayscale hover:opacity-60'
                    }`}
                >
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all ${activeFeature === i ? 'bg-purple-600 text-white shadow-[0_0_30px_#a855f7]' : 'bg-white/5 text-gray-500'}`}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-black italic uppercase tracking-[0.2em]">{f.title}</h3>
                    {activeFeature === i && <motion.div layoutId="bar" className="h-0.5 w-12 bg-purple-500 mt-3" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Stage de Visualização */}
            <div className="flex-1 bg-[#0a0a0f] border border-white/5 rounded-[70px] relative overflow-hidden flex flex-col lg:flex-row shadow-inner">
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
      </section>

      {/* SECTION 2: CHECKOUT QUE VENDE */}
      <section className="py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Alta Conversão', desc: 'Design otimizado para maximizar vendas', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
              { title: 'Mobile First', desc: 'Experiência perfeita em smartphones', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
              { title: 'Order Bump & Upsell', desc: 'Aumente o ticket médio automaticamente', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              { title: 'Recuperação de Carrinho', desc: 'Não perca nenhuma venda', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
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
      </section>

      {/* SECTION 3: PAGAMENTOS SEM FRICÇÃO */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Gateways Integrados', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> },
              { title: 'Aprovação Instantânea', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
              { title: 'Pagamento Seguro', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
              { title: 'Pix, Cartão, Boleto', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg> }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[32px] text-center group hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-500 group-hover:bg-purple-600/30 group-hover:scale-110 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-black italic uppercase tracking-wider">{feature.title}</h3>
              </motion.div>
            ))}
          </div>
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
      </section>

      {/* SECTION 5: ÁREA DE MEMBROS PROFISSIONAL */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-6xl md:text-[7vw] font-black italic tracking-tighter uppercase mb-6 leading-[0.85]">
                Área de Membros <br /> <span className="text-purple-500">Profissional.</span>
              </h2>
              <p className="text-gray-500 text-sm font-medium max-w-2xl mx-auto mt-8">
                Uma experiência digna de streaming para seus clientes
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Vitrine de Produtos', desc: 'Layout tipo Netflix para seus cursos', span: 'md:col-span-2', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
              { title: 'Acesso Centralizado', desc: 'Todos os produtos em um só lugar', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
              { title: 'Branding Próprio', desc: 'Sua marca em destaque', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg> },
              { title: 'Experiência Premium', desc: 'Interface moderna e intuitiva', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, borderColor: 'rgba(168, 85, 247, 0.4)' }}
                className={`${feature.span || ''} p-10 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[32px] group hover:bg-white/[0.05] transition-all duration-500`}
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
      </section>

      {/* SECTION 6: AUTOMAÇÃO - TUDO CONECTADO */}
      <section className="py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent">
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
              <div className="h-1.5 w-32 bg-purple-600 rounded-full mx-auto mt-8" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Webhooks Nativos', desc: 'Integre com qualquer sistema em tempo real', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
              { title: 'Automações com n8n', desc: 'Workflows poderosos sem código', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
              { title: 'Fluxos Personalizados', desc: 'Crie automações sob medida', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg> },
              { title: 'Eventos em Tempo Real', desc: 'Notificações instantâneas de vendas', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, borderColor: 'rgba(168, 85, 247, 0.4)' }}
                className="p-10 bg-white/[0.02] border border-white/10 rounded-[32px] group hover:bg-white/[0.05] transition-all duration-500"
              >
                <div className="text-purple-500 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black italic uppercase mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: TRÁFEGO & DADOS */}
      <section className="py-32 px-6 relative z-10">
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
                whileHover={{ scale: 1.05 }}
                className="relative p-8 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[32px] text-center group hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-500 overflow-hidden"
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: feature.color
                }}
              >
                {/* Glow Effect from Left */}
                <div className={`absolute inset-y-0 left-0 w-[100px] bg-gradient-to-r ${feature.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-2xl flex items-center justify-center mb-6 text-purple-500 group-hover:bg-purple-600/30 group-hover:scale-110 transition-all">
                    {feature.icon}
                  </div>
                  <h3 className="text-xs font-black italic uppercase tracking-wider leading-tight text-white">{feature.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: GESTÃO - CONTROLE TOTAL */}
      <section className="py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent">
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
      </section>

      {/* SECTION 9: MARCA - SUA MARCA EM PRIMEIRO LUGAR */}
      <section className="py-32 px-6 relative z-10">
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
              <div className="h-1.5 w-32 bg-purple-600 rounded-full mx-auto mt-8" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Domínios Personalizados', desc: 'Use seu próprio domínio profissional', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg> },
              { title: 'Marca Própria', desc: 'Logo, cores e identidade visual', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg> },
              { title: 'Experiência White-Label', desc: 'Sem marcas de terceiros', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> },
              { title: 'Autoridade Visual', desc: 'Fortaleça sua presença no mercado', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
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
      </section>

      {/* SECTION 10: INFRA & SEGURANÇA - ENHANCED */}
      <section className="py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Infraestrutura Cloud', desc: 'Servidores de alta performance globais', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg> },
              { title: 'Alta Performance', desc: 'Velocidade máxima em qualquer escala', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
              { title: 'Segurança e LGPD', desc: 'Proteção total dos dados dos clientes', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
              { title: 'Estabilidade Garantida', desc: '99.9% de uptime SLA', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
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
      </section>

      {/* SECTION 11: CTA INTERMEDIÁRIO - COMECE AGORA */}
      <section className="py-40 px-6 relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-7xl md:text-[8vw] font-black leading-none tracking-tighter mb-12 uppercase italic">
              Comece <br /> <span className="text-purple-500">Agora.</span>
            </h2>
            <p className="text-gray-400 text-lg font-medium mb-16 max-w-2xl mx-auto">
              Cadastro gratuito • Sem cartão • Ativação instantânea
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(168,85,247,0.4)" }}
                className="px-16 py-8 bg-purple-600 text-white rounded-full font-black text-xl uppercase italic tracking-tighter shadow-2xl transition-all"
              >
                Criar Conta Grátis →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-16 py-8 bg-transparent border-2 border-white/20 text-white rounded-full font-black text-xl uppercase italic tracking-tighter transition-all hover:border-purple-500/50"
              >
                Ver Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.15)_0%,_transparent_70%)] opacity-30" />
      </section>

      {/* PLANOS - HIGH CONTRAST */}
      <section id="plans" className="py-40 px-6 bg-white text-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-40">
            <h2 className="text-8xl md:text-[9vw] font-black italic tracking-tighter uppercase leading-[0.75] mb-10">Escala de <br /> <span className="text-purple-600">Verdade.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Free */}
            <div className="p-16 border-4 border-black rounded-[70px] hover:bg-black hover:text-white transition-all duration-700 group flex flex-col justify-between h-[650px] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icons.Checkout />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-8 block">Bootstrap Level</span>
                <h3 className="text-6xl font-black mb-6 italic">GRÁTIS</h3>
                <div className="text-7xl font-black mb-14 tracking-tighter">R$ 0<span className="text-2xl opacity-40">/mês</span></div>
                <ul className="space-y-5 mb-16">
                  {['✓ Checkout Mobile-First', '✓ Produtos Ilimitados', '✓ Branding Próprio', '✓ Taxas Transparentes'].map(item => (
                    <li key={item} className="text-xs font-black uppercase tracking-widest">{item}</li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-10 border-2 border-black group-hover:border-white rounded-full font-black text-xs uppercase tracking-[0.3em] transition-all">Começar Agora</button>
            </div>

            {/* Pro */}
            <div className="p-16 bg-black text-white rounded-[70px] relative overflow-hidden shadow-[0_40px_100px_rgba(168,85,247,0.3)] border-2 border-purple-600 flex flex-col justify-between h-[650px]">
              <div className="absolute top-12 right-12 bg-purple-600 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Recomendado</div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-8 block">Massive Volume</span>
                <h3 className="text-6xl font-black mb-6 italic">PRO</h3>
                <div className="text-7xl font-black mb-14 tracking-tighter">R$ 297<span className="text-2xl opacity-40">/mês</span></div>
                <ul className="space-y-5 mb-16">
                  {['✓ Tudo do Grátis', '✓ Webhooks Full API', '✓ Suporte VIP 24/7', '✓ Infraestrutura de Elite'].map(item => (
                    <li key={item} className="text-xs font-black uppercase tracking-widest">{item}</li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-10 bg-purple-600 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all">Escalar Império</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-64 px-6 text-center relative overflow-hidden bg-black">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-[12vw] md:text-[9vw] font-black leading-none tracking-tighter mb-20 uppercase italic">
            Ative seu <br /> <span className="text-purple-500">Poder.</span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: -3 }}
            className="px-32 py-14 bg-white text-black rounded-full font-black text-5xl uppercase italic tracking-tighter shadow-2xl transition-all hover:bg-purple-600 hover:text-white"
          >
            Cadastrar Grátis
          </motion.button>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.15)_0%,_transparent_70%)] opacity-30" />
      </section>

      <footer className="py-32 px-12 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16 text-[10px] font-black uppercase tracking-[0.6em] text-gray-800">
          <div className="text-left">
            <h2 className="text-5xl font-black italic text-white mb-8 uppercase tracking-tighter">SUPER<span className="text-purple-500">CHECKOUT</span></h2>
            <p className="max-w-sm leading-loose">A plataforma definitiva para produtos digitais de alta escala. Built for the 1%.</p>
          </div>
          <p className="max-w-sm md:text-right leading-loose">© 2026 SUPER CHECKOUT .APP — BRUTAL PERFORMANCE ENGINE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
