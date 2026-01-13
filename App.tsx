
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import BlurText from './components/BlurText';
import Aurora from './components/Aurora';

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
              Venda em <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)" }}>Tempo Real.</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-14 mt-6">
              <p className="text-gray-500 max-w-sm text-[13px] font-bold uppercase tracking-tight leading-loose text-left border-l-4 border-purple-600 pl-10">
                A única plataforma brasileira desenhada para tráfego pesado e escala agressiva. Zero atrito, 100% conversão.
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
                className="p-8 bg-white/[0.02] border border-white/10 rounded-[32px] text-center group hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="text-purple-500 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-500">
                  {stat.icon}
                </div>
                <div className="text-5xl font-black mb-2 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES BENTO GRID */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-[7vw] font-black italic tracking-tighter uppercase mb-6 leading-[0.85]">
              Tudo que você <br /> <span className="text-purple-500">Precisa.</span>
            </h2>
            <div className="h-1.5 w-32 bg-purple-600 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
            {[
              { title: 'Checkout Otimizado', desc: 'Mobile-first, conversão máxima', span: 'md:col-span-2', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
              { title: 'Automação Total', desc: 'Webhooks, n8n, APIs', span: '', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
              { title: 'Pixel Tracking', desc: 'Meta, Google, TikTok', span: '', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> },
              { title: 'Upsell & Downsell', desc: 'Order bump 1-click', span: 'md:col-span-2', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
              { title: 'Área de Membros', desc: 'Liberação automática', span: '', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
              { title: 'Segurança LGPD', desc: 'Infraestrutura resiliente', span: 'md:col-span-2 md:row-span-2', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
              { title: 'Relatórios Real-Time', desc: 'Dashboard completo', span: '', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ y: -5, borderColor: 'rgba(168, 85, 247, 0.4)' }}
                className={`${feature.span} p-8 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[32px] flex flex-col justify-between group hover:bg-white/[0.05] transition-all duration-500 cursor-pointer`}
              >
                <div className="text-purple-500 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black italic uppercase mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-gray-500 font-medium">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATION ECOSYSTEM */}
      <section className="py-32 px-6 relative z-10 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-[7vw] font-black italic tracking-tighter uppercase mb-6 leading-[0.85]">
              Ecossistema <br /> <span className="text-purple-500">Completo.</span>
            </h2>
            <p className="text-gray-500 text-sm font-medium max-w-2xl mx-auto">
              Integre com as principais ferramentas do mercado sem esforço
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Stripe', category: 'Pagamento', icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> },
              { name: 'Meta Pixel', category: 'Marketing', icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> },
              { name: 'Google Ads', category: 'Marketing', icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> },
              { name: 'TikTok', category: 'Marketing', icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              { name: 'n8n', category: 'Automação', icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
              { name: 'Mailchimp', category: 'E-mail', icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
              { name: 'HubSpot', category: 'CRM', icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
              { name: 'Webhooks', category: 'API', icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> }
            ].map((integration, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-8 bg-white/[0.02] border border-white/10 rounded-[24px] text-center group hover:bg-white/[0.05] hover:border-purple-500/30 transition-all duration-500 cursor-pointer"
              >
                <div className="text-purple-500 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-500">
                  {integration.icon}
                </div>
                <h4 className="text-sm font-black uppercase mb-1">{integration.name}</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{integration.category}</p>
              </motion.div>
            ))}
          </div>
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
