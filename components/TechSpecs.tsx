import React from 'react';
import { motion } from 'framer-motion';

const TechSpecs = () => {
  const specs = [
    { title: "Edge Computing", desc: "Rotas globais e servidores na borda para carregamento < 100ms." },
    { title: "Escalabilidade AWS", desc: "Infraestrutura elástica pronta para picos de lançamento." },
    { title: "Proteção Anti-DDoS", desc: "Blindagem nível enterprise contra ataques e fraudes." },
    { title: "Pixels Nativos (CAPI)", desc: "Integração zero-delay com Meta, Google, TikTok via API." },
    { title: "Webhooks Livres", desc: "Conecte sua automação sem limitações ou atrasos." },
    { title: "Banco de Dados Isolado", desc: "Seus dados não se misturam com o mercado. Você é o dono." }
  ];

  return (
    <section className="py-32 px-6 relative z-10 bg-[#020205]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 text-white leading-none"
          >
            Motor <span className="text-purple-500">V8.</span>
          </motion.h2>
          <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
            A infraestrutura técnica desenhada para quem não pode falhar no carrinho aberto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((spec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] transition-colors"
            >
              <h4 className="text-white font-black italic uppercase tracking-widest text-lg mb-3">
                {spec.title}
              </h4>
              <p className="text-gray-400 font-medium leading-relaxed text-sm">
                {spec.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSpecs;
