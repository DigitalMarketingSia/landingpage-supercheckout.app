# MASTER DESIGN SYSTEM: Super Checkout .app

Este é o **Guia de Referência Global (Source of Truth)** para o design e UX do projeto **Super Checkout .app**. Ele foi gerado e estruturado seguindo as diretrizes profissionais de inteligência de design do **UI/UX Pro Max Skill**.

---

## 1. Visão Geral do Tema

*   **Estilo Principal**: **Futuristic Cyberpunk (Sleek Dark Mode)**
*   **Paleta de Sensações**: Alta performance, segurança, inovação, exclusividade, robustez.
*   **Tom de Marca**: Premium, direto ao ponto, tecnológico mas extremamente simples de usar.

---

## 2. Tokens de Design (Fórmula de Cores HSL & Hex)

Para garantir harmonia visual absoluta e contraste perfeito (compatível com **WCAG AA / 4.5:1**), usamos uma paleta escura baseada em tons frios de roxo e esmeralda.

| Nome Token | Cor Hex | Uso Principal | HSL |
| :--- | :--- | :--- | :--- |
| `--bg-main` | `#020205` | Fundo principal da página | `240° 43% 1%` |
| `--bg-card` | `#050508` | Fundo de cards, widgets e dashboards | `240° 23% 3%` |
| `--bg-widget` | `#0a0a0f` | Widgets flutuantes e modais premium | `240° 23% 5%` |
| `--color-primary` | `#a855f7` | Roxo neon da marca (Destaques, Ações) | `270° 91% 65%` |
| `--color-secondary`| `#86efac` | Verde esmeralda pastel (Taxa de conversão, Conversão ativa) | `142° 70% 73%` |
| `--color-accent` | `#3b82f6` | Azul estabilidade (Uptime, Performance) | `217° 91% 60%` |
| `--color-success` | `#22c55e` | Verde aprovação (Status Engine, Pix ativo) | `142° 76% 45%` |
| `--text-primary` | `#ffffff` | Títulos e textos de alta legibilidade | `0° 0% 100%` |
| `--text-secondary`| `#9ca3af` | Descrições e parágrafos de apoio | `218° 11% 65%` |
| `--text-muted` | `#6b7280` | Legendas, tickers e metadados secundários | `220° 9% 46%` |

---

## 3. Tipografia

*   **Heading Font**: `Outfit` (Itálico & Extra-Negrito para títulos de impacto / Headlines).
*   **Body Font**: `Sans-serif` / `Inter` / `Outfit` (Light & Medium para fácil leitura de descrições e formulários).
*   **Monospace Font**: `SFMono-Regular`, `Consolas` (Para domínios, timers e taxas tabulares).

### Escala de Tamanho e Peso:
*   **Hero Titles (H1)**: `4xl` a `7xl` (`font-black`, `uppercase`, `italic`, `tracking-tighter`).
*   **Section Headers (H2)**: `6xl` / `7vw` (`font-black`, `italic`, `uppercase`, `tracking-tighter`).
*   **Sub-headlines**: `xl` / `2xl` (`font-light`, `tracking-wide`).
*   **Body Text**: `base` (`16px`) / `sm` (`14px`) (`font-light`, `leading-relaxed`).
*   **Labels / Badges**: `text-[10px]` / `text-[11px]` (`font-black`, `uppercase`, `tracking-[0.2em]`).

---

## 4. Padrões de Animação (Motion Standards)

Todas as animações de interface devem ser suaves, com significado e com tempo de resposta excelente.

### Parâmetros para Framer Motion:

1.  **Entradas (Fade In + Slide Up)**:
    *   `initial={{ opacity: 0, y: 30 }}`
    *   `animate={{ opacity: 1, y: 0 }}`
    *   `transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}` (Curva suave de desaceleração).

2.  **Entradas de Esquerda/Direita (Parallax Columns)**:
    *   `initial={{ opacity: 0, x: -50 }}`
    *   `animate={{ opacity: 1, x: 0 }}`
    *   `transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}`

3.  **Botões e Cards Interativos (Hover & Tap)**:
    *   `whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}`
    *   `whileTap={{ scale: 0.98 }}`
    *   **Anti-padrão**: Evitar saltos abruptos de layout ou tempos maiores que `500ms` para micro-interações.

4.  **Efeitos de Scan / Laser Glow**:
    *   Linhas de varredura ou flares dinâmicos devem ter animações repetitivas lineares lentas (`duration: 6` a `8` segundos) para evitar distração cognitiva.

---

## 5. Checklist de Controle de Qualidade (QC) & Acessibilidade

Para garantir uma interface que atenda aos padrões **WCAG AA** de usabilidade global:

-   [ ] **Alvo de Toque (Touch Targets)**: Garantir que todos os botões e áreas clicáveis tenham tamanho mínimo de `44x44px` (ou `48x48px` em dispositivos móveis).
-   [ ] **Feedback de Carregamento**: Botões de CTA que executam chamadas de API ou abrem pop-ups devem ter estado de loading visual claro (ex: desabilitar clique + indicador giratório/shimmer).
-   [ ] **Prevenção de CLS (Cumulative Layout Shift)**: Declarar larguras e alturas explícitas para imagens (como `/assets/dashboard.png` ou `/logo.png`) para evitar que a página "pule" ao carregar.
-   [ ] **Aria-Labels**: Todos os botões contendo apenas ícones (ex: botões de fechar, redes sociais) devem conter o atributo `aria-label="Descrição do Botão"`.
-   [ ] **Preferencia de Redução de Movimento**: Garantir que as animações respeitem `prefers-reduced-motion` para usuários sensíveis a movimento rápido.
-   [ ] **Sem Textos Invisíveis**: Garantir que fontes externas usem `font-display: swap` para renderizar imediatamente o texto legível.
