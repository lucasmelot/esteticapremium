# LUMÉA — Estética Facial (versão otimizada)

Projeto demonstrativo em HTML, CSS e JavaScript puro, pronto para GitHub Pages.

## O que foi ajustado

- responsividade recalibrada em desktop, notebook, tablet e mobile;
- escala tipográfica mais fluida, sem saltos bruscos abaixo de 390 px;
- hero mais compacto sem alterar a direção visual;
- imagens do Unsplash com `srcset`/`sizes` para baixar arquivos proporcionais à viewport;
- imagem de fundo do CTA final convertida em `<img loading="lazy">`, evitando download antecipado;
- imagem principal priorizada com preload + `fetchpriority="high"`;
- imagens abaixo da dobra com lazy loading, decoding assíncrono e prioridade baixa;
- `content-visibility: auto` nas seções abaixo da dobra para reduzir trabalho inicial de layout/pintura;
- marquee pausado quando está fora da viewport;
- listener de scroll do header limitado a um update por frame;
- listener de resize trocado por `matchMedia`, executando apenas na mudança real de breakpoint;
- `backdrop-filter` removido do header em telas menores, reduzindo custo de composição durante o scroll;
- hover de zoom desativado em dispositivos touch;
- CSS minificado usado em produção; JavaScript permanece pequeno e legível, com execução adiada via `defer`.

## Arquivos

- `index.html`
- `css/styles.css` — fonte legível
- `css/styles.min.css` — arquivo carregado pela página
- `js/script.js` — fonte legível

## Importante

A marca LUMÉA, profissional, contatos, relatos e demais informações comerciais são fictícios e existem apenas para demonstração. O número do WhatsApp está centralizado em `js/script.js`; altere-o antes de uso real.

As imagens continuam hospedadas no Unsplash para preservar a facilidade de deploy. Para produção de um cliente real, o próximo ganho relevante de performance é usar imagens autorizadas locais em AVIF/WebP, servidas por CDN.
