# DIRETRIZES DE DESIGN: Home Page (`App.tsx` & `HeroV2.tsx`)

Este documento especifica os refinamentos e as regras de interface específicas da página principal (Home Page) do **Super Checkout .app**, em conformidade com o `design-system/MASTER.md`.

---

## 1. Estrutura de Camadas e Z-Index

Para evitar conflitos visuais e garantir que os elementos flutuantes modernos não fiquem sobrepostos aos textos principais ou menu de navegação, seguimos esta escala rígida de `z-index`:

| Camada / Elemento | Classe CSS (Tailwind) | Nível Z | Objetivo |
| :--- | :--- | :--- | :--- |
| **Glows de Fundo / Grid**| `absolute z-0` | `0` / Negativo | Ambientação atmosférica sem interferência |
| **Dashboard Principal**  | `relative z-10` | `10` | Imagem/mockup central da infraestrutura |
| **Widgets Flutuantes**   | `absolute z-20` / `z-30`| `20` / `30` | Elementos de prova social que orbitam o dashboard |
| **Menu de Navegação**    | `fixed z-50` | `50` | Navbar fixa com desfoque de vidro (`backdrop-blur-2xl`) |
| **Modal de Vídeo/Reels** | `fixed z-[99999]` | `99999` | Elemento sobreposto de exibição do smartphone mockup |

---

## 2. Refinamentos da Seção Hero (`HeroV2.tsx`)

O Hero da página principal deve seguir os padrões de **Acessibilidade e Usabilidade** descritos no `MASTER.md`:

### A. Botão de CTA ("VER SISTEMA")
- **Legibilidade do Texto**: Garantir que o texto em negrito "VER SISTEMA" mantenha uma sombra discreta (`style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}`) para garantir legibilidade de 100% sobre o gradiente animado de fundo.
- **Acessibilidade**: Adicionar uma descrição clara de leitor de tela se necessário. O ícone de raio (SVG) deve ser acompanhado de texto real para evitar botões apenas iconográficos.

### B. Elementos Flutuantes (Widgets)
- **Taxa de Conversão (+94%)**: O gradiente da barra de progresso do widget deve utilizar a transição horizontal suave de roxo a azul índigo, e carregar apenas após a animação de entrada da seção (atraso de `1s` na animação) para criar um efeito de preenchimento dinâmico muito premium.
- **Compromisso Zero Taxas**: O ícone do cifrão (`$`) deve utilizar um círculo de verde esmeralda pastel de alta visibilidade com fundo translúcido para simbolizar sucesso e liquidez imediatamente.

---

## 3. Diretrizes para a Seção de Bento Grid (Fricção Zero)

A grade de grade bento (`SECTION 3: PAGAMENTOS SEM FRICÇÃO` em `App.tsx`) deve manter a integridade visual:
- **Borda Neon Refinada**: A borda dos cards de Bento Grid deve iniciar com opacidade baixa (`border-purple-500/20`) e realizar uma transição suave para `border-purple-500/40` com duração de `500ms` ao pairar o mouse (`hover`).
- **SVG Single-Tone**: Usar sempre ícones baseados em traços (`strokeWidth="1.5"` ou `"2"`) em roxo/verde para complementar a atmosfera minimalista. **Nunca** misturar ícones planos com emojis coloridos ou ícones 3D extravagantes.

---

## 4. Otimização de Imagens (Prevenção de CLS)

- O arquivo `dashboard.png` localizado em `/assets/dashboard.png` deve ser carregado com `loading="lazy"` e `decoding="async"` para acelerar o First Contentful Paint (FCP).
- O logotipo da marca no topo deve conter `fetchPriority="high"` para que seja exibido imediatamente ao carregar, mantendo a identidade visual sem atrasos perceptíveis.
