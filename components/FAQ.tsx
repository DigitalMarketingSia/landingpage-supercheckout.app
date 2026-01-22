import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            q: 'Preciso saber programar?',
            a: 'Não. O Super Checkout foi desenvolvido para ser usado por qualquer pessoa. A interface é intuitiva e o processo de instalação é explicado passo a passo em aulas dentro da área de membros.'
        },
        {
            q: 'Vou precisar criar contas técnicas?',
            a: 'Sim, mas sem complicação. Você cria suas próprias contas nos serviços necessários (ex: gateway de pagamento), mantendo total controle sobre dados, dinheiro e operação. Todo o processo é explicado de forma simples durante a instalação. Isso garante independência total e evita qualquer tipo de dependência da nossa infraestrutura.'
        },
        {
            q: 'O pagamento é mensal?',
            a: 'Não. O Super Checkout é vendido em pagamento único, sem mensalidades obrigatórias e sem taxas recorrentes.'
        },
        {
            q: 'O sistema cobra taxas por venda?',
            a: 'Não. Você fatura 100% do valor das suas vendas. O Super Checkout não cobra comissão, taxa por transação ou percentual oculto.'
        },
        {
            q: 'Como recebo o dinheiro das vendas?',
            a: 'O valor das vendas cai diretamente na sua conta no gateway de pagamento escolhido (Mercado Pago, Stripe, entre outros). O sistema não intermedia, não retém e não movimenta seu dinheiro.'
        },
        {
            q: 'A instalação é feita por vocês?',
            a: 'Não. A instalação é feita por você, seguindo aulas completas e organizadas na área de membros. Se preferir, você pode contratar o serviço de instalação separadamente como um serviço opcional, fora do plano.'
        },
        {
            q: 'O sistema é completo desde qual plano?',
            a: 'Desde o Plano Profissional, você tem acesso ao sistema 100% completo, sem bloqueios de funcionalidades. O que muda entre os planos é o direito de uso, número de instalações e modelo de licenciamento.'
        },
        {
            q: 'O que significa “licença” e “instalações”?',
            a: 'Licença: é o seu direito de uso do sistema. Instalações: quantas vezes você pode instalar o sistema em ambientes diferentes. Exemplo: Um plano pode ter 1 licença com múltiplas instalações para uso próprio ou para clientes, conforme o plano contratado.'
        },
        {
            q: 'Posso usar meu próprio domínio?',
            a: 'Sim. Você pode usar domínios personalizados para seus checkouts e áreas de membros, reforçando sua marca e autoridade profissional.'
        },
        {
            q: 'O sistema é white-label?',
            a: 'Sim, para seus produtos e operação. O checkout, a área de membros e a experiência do cliente não exibem marcas de terceiros. O sistema em si não é revendido como software com outra marca, e sim usado como base para o seu negócio.'
        },
        {
            q: 'Por quanto tempo recebo atualizações?',
            a: 'Você recebe 12 meses de atualizações incluídas no plano. Após esse período, a renovação é opcional.'
        },
        {
            q: 'Existe contrato de fidelidade?',
            a: 'Não. O pagamento é único, sem contratos, sem mensalidades e sem obrigações futuras.'
        }
    ];

    return (
        <section className="py-32 px-6 relative z-10 bg-[#030303]/50">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-6">
                        Dúvidas <span className="text-purple-600">Frequentes.</span>
                    </h2>
                    <p className="text-gray-500 text-lg">Tudo o que você precisa saber para começar agora.</p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="group"
                        >
                            <button
                                onClick={() => toggleIndex(i)}
                                className={`w-full text-left p-8 rounded-[32px] border transition-all duration-500 ${activeIndex === i
                                        ? 'bg-[#0a0a0f] border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.15)]'
                                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                                    }`}
                            >
                                <div className="flex justify-between items-center gap-6">
                                    <h3 className={`text-lg md:text-xl font-black italic uppercase tracking-wide transition-colors ${activeIndex === i ? 'text-purple-400' : 'text-gray-200 group-hover:text-white'
                                        }`}>
                                        {faq.q}
                                    </h3>
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${activeIndex === i
                                            ? 'bg-purple-600 border-purple-500 rotate-180'
                                            : 'border-white/20 group-hover:border-white/40'
                                        }`}>
                                        <svg
                                            className={`w-4 h-4 transition-colors ${activeIndex === i ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2.5}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {activeIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-6 mt-6 border-t border-white/5">
                                                <p className="text-gray-400 leading-relaxed font-medium whitespace-pre-line text-sm md:text-base">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
