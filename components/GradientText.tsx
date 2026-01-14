import React, { useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';

interface GradientTextProps {
  children: React.ReactNode;
  colors?: string[];
  animationSpeed?: number; // Quanto MENOR, mais RÁPIDO (é um divisor). Ex: 3 = Rápido, 8 = Lento.
  className?: string; // Permitir classes extras
  isBackground?: boolean; // Se true, o gradiente é um background normal, se false (default), é aplicado ao texto
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors = ["#a855f7", "#ffffff", "#22c55e"],
  animationSpeed = 8,
  className = "",
  isBackground = false
}) => {
  const progress = useMotionValue(0);
  const lastTimeRef = useRef<number | null>(null);

  // useAnimationFrame cria um loop de 60fps+ para mover o gradiente
  useAnimationFrame((time) => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    // Atualiza o valor do progresso baseado no tempo decorrido
    // Lógica invertida para que "animationSpeed" funcione como velocidade (maior = mais rápido)
    // Se animationSpeed for divisor, 3 é rápido e 8 é lento.
    // Vamos manter a lógica original do usuário onde 3 era rápido.
    // delta / (speed * 100) -> 16ms / 300 = 0.05 step per frame.
    // delta / (speed * 100) -> 16ms / 800 = 0.02 step per frame.
    const nextValue = (progress.get() + (deltaTime / (animationSpeed * 100))) % 100;
    progress.set(nextValue);
  });

  // Mapeia o progresso (0-100) para a posição do background em CSS
  const backgroundPosition = useTransform(progress, p => `${p}% 50%`);

  const gradientColors = [...colors, colors[0]].join(', ');

  const textClipStyles = {
    WebkitBackgroundClip: 'text', // Faz o fundo aparecer apenas no texto
    WebkitTextFillColor: 'transparent', // Torna o corpo da letra invisível
    backgroundClip: 'text',
    color: 'transparent', // Fallback
  };

  return (
    <motion.span
      className={className}
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientColors})`,
        backgroundSize: '300% 100%',
        backgroundPosition, // O Framer Motion aplica isso diretamente
        display: 'inline-block',
        ...(isBackground ? {} : textClipStyles),
      }}
    >
      {children}
    </motion.span>
  );
};

export default GradientText;
