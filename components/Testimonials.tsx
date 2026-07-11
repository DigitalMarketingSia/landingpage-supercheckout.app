import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      name: "João Silva",
      role: "Infoprodutor de Alta Escala",
      result: "R$ 1M+ Processados",
      quote: "Depois que migrei para o Super Checkout, a taxa de aprovação aumentou absurdamente. Sem falar na liberdade de não pagar taxas ocultas.",
      initials: "JS",
      color: "from-blue-500 to-purple-500"
    },
    {
      name: "Mariana Costa",
      role: "Especialista em Lançamentos",
      result: "+35% de Conversão",
      quote: "A velocidade do checkout no mobile é incomparável. Os clientes compram sem nenhum atrito. O whitelabel fez minha marca subir de nível.",
      initials: "MC",
      color: "from-emerald-500 to-teal-500"
    },
    {
      name: "Pedro Alves",
      role: "Dono de Comunidade",
      result: "5.000+ Membros Ativos",
      quote: "A área de membros tem qualidade de Netflix. Meus alunos amam e o engajamento dobrou. A melhor decisão para o meu negócio.",
      initials: "PA",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-32 px-6 relative z-10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 text-white leading-none"
          >
            A Elite <span className="text-purple-500">Aprova.</span>
          </motion.h2>
          <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
            Resultados reais de quem já opera com a nossa infraestrutura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 bg-[#050508] border border-white/5 rounded-3xl relative overflow-hidden group hover:border-purple-500/30 transition-colors"
            >
              {/* Decorative Quote Mark */}
              <div className="absolute -top-4 -right-4 text-8xl text-white/[0.02] font-serif font-black pointer-events-none">
                "
              </div>
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.color} p-[2px]`}>
                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center font-black italic text-lg text-white">
                    {t.initials}
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold italic uppercase tracking-wider">{t.name}</h4>
                  <p className="text-purple-400 text-xs font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
              
              <p className="text-gray-300 font-medium leading-relaxed mb-8 relative z-10">
                "{t.quote}"
              </p>

              <div className="inline-block px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-black uppercase tracking-widest text-emerald-400 relative z-10">
                {t.result}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
