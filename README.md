# Royal Skin Website

Entrega estática e pronta para deploy da Royal Skin Agency, com duas entradas principais:

- `index.html`: landing page principal
- `desing_system.html`: guia visual do sistema de design

## Estrutura

```text
.
|-- assets/
|   |-- scripts/
|   |   `-- site.js
|   `-- styles/
|       |-- design-system.css
|       |-- site.css
|       `-- tokens.css
|-- docs/
|   |-- avaliacao-site.md
|   `-- internal/
|-- legacy/
|   |-- exports/
|   `-- react-prototype/
|-- desing_system.html
`-- index.html
```

## Visualização local

Você pode abrir `index.html` e `desing_system.html` diretamente no navegador.

Se preferir servir com Vite:

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

O conteúdo compilado será gerado em `dist/`.

## Deploy

O projeto agora funciona como site estático. Pode ser publicado em Vercel, Netlify, Cloudflare Pages, GitHub Pages ou qualquer servidor que entregue HTML/CSS/JS estáticos.

## Formulário

O formulário da landing page funciona em modo demonstração local quando `data-endpoint=""`.

Para produção, edite o formulário em `index.html` e preencha:

```html
<form data-contact-form data-endpoint="https://seu-endpoint-aqui">
```
