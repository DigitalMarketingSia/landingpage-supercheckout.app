import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    { num: "01", title: "Cadastre-se", desc: "Acesso instantâneo à plataforma sem aprovações demoradas ou burocracia." },
    { num: "02", title: "Configure seu Produto", desc: "Checkout, área de membros e estrutura whitelabel prontos em minutos." },
    { num: "03", title: "Comece a Vender", desc: "Escale de forma bruta com infraestrutura de ponta e taxas justas." }
  ];

  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 text-white leading-none"
          >
            Como <span className="text-purple-500">Funciona</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg font-medium max-w-2xl mx-auto"
          >
            Do zero a primeira venda em menos tempo do que você imagina.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -5 }}
              className="relative p-10 bg-[#050508] border border-white/5 rounded-[32px] overflow-hidden group hover:bg-white/[0.03] transition-all duration-500 hover:border-purple-500/30 shadow-[0_0_0_rgba(168,85,247,0)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="text-8xl font-black italic text-white/[0.03] mb-6 absolute -top-4 -right-4 group-hover:text-purple-600/10 transition-colors duration-500 pointer-events-none select-none">
                {step.num}
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 bg-purple-600/10 rounded-2xl border border-purple-500/20 flex items-center justify-center mb-8 group-hover:bg-purple-600/20 transition-colors">
                  <span className="text-purple-400 font-black italic text-xl">{step.num}</span>
                </div>
                <h3 className="text-2xl font-black italic uppercase text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
