import React from 'react';
import { motion } from 'framer-motion';

const Comparison = () => {
  const points = [
    { label: "Taxa sobre Venda", gen: "9.9% + R$ 1,00", sc: "ZERO TAXAS OCULTAS" },
    { label: "Domínio", gen: "Subdomínio deles", sc: "Seu domínio próprio" },
    { label: "Checkout", gen: "Padrão e Lento", sc: "Alta Conversão (100ms)" },
    { label: "Área de Membros", gen: "Pasta de Arquivos", sc: "Experiência Netflix" },
    { label: "Controle de Dados", gen: "Limitado", sc: "100% Seu" },
    { label: "Identidade Visual", gen: "Marca Deles", sc: "Whitelabel Total" },
  ];

  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 text-white leading-none"
          >
            A <span className="text-purple-500">Diferença</span>
          </motion.h2>
          <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
            Por que as maiores operações estão migrando.
          </p>
        </div>

        <div className="bg-[#050508] border border-white/5 rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-white/10 p-6 md:p-10 bg-black/50 items-center">
            <div className="col-span-1">
              <span className="text-gray-500 font-bold uppercase tracking-widest text-xs md:text-sm">Recurso</span>
            </div>
            <div className="col-span-1 text-center border-r border-white/5 pr-2 md:pr-0">
              <span className="text-red-400/80 font-black italic uppercase tracking-tighter text-[10px] md:text-2xl opacity-70">Plataformas Genéricas</span>
            </div>
            <div className="col-span-1 text-center pl-2 md:pl-0">
              <span className="text-purple-500 font-black italic uppercase tracking-tighter text-sm md:text-3xl">SUPER.APP</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col">
            {points.map((pt, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`grid grid-cols-3 p-6 md:p-8 items-center ${i !== points.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/[0.02] transition-colors`}
              >
                <div className="col-span-1">
                  <span className="text-white font-medium text-xs md:text-lg">{pt.label}</span>
                </div>
                <div className="col-span-1 text-center border-r border-white/5 pr-2 md:pr-0 flex justify-center items-center">
                  <span className="text-gray-500 font-medium text-[10px] md:text-lg">{pt.gen}</span>
                </div>
                <div className="col-span-1 text-center pl-2 md:pl-0 flex justify-center items-center">
                  <div className="px-2 py-1 md:px-4 md:py-2 bg-purple-500/10 rounded-full border border-purple-500/30 text-purple-400 font-bold italic tracking-wide text-[9px] md:text-sm shadow-[0_0_15px_rgba(168,85,247,0.15)] whitespace-nowrap">
                    {pt.sc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
