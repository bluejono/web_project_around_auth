# Around the U.S. — Projeto com Autenticação

## Descrição

Around the U.S. é uma rede social interativa onde usuários podem compartilhar fotos de lugares que visitaram nos Estados Unidos. O projeto inclui autenticação completa com registro e login via JWT, proteção de rotas e integração com uma API REST.

## Funcionalidades

- Registro e login de usuários com autenticação JWT
- Rotas protegidas — apenas usuários autenticados acessam o conteúdo principal
- Visualização de cards com fotos de lugares
- Curtir e descurtir cards
- Adicionar novos cards com nome e link de imagem
- Editar nome e descrição do perfil
- Editar foto de avatar
- Excluir cards próprios
- Exibição de feedback visual (InfoTooltip) em sucesso e erro
- Layout responsivo para mobile e desktop

## Tecnologias e Técnicas

- **React** — biblioteca de interface com componentes funcionais e hooks
- **Vite** — bundler e servidor de desenvolvimento
- **React Router DOM** — navegação entre páginas (SPA)
- **JWT (JSON Web Token)** — autenticação stateless via localStorage
- **Fetch API** — comunicação com a API REST da TripleTen
- **BEM** — metodologia de nomenclatura de classes CSS
- **CSS responsivo** — media queries para mobile (≤768px) e desktop (≥769px)
- **Context API** — compartilhamento do usuário atual entre componentes

## Como executar localmente

```bash
npm install
npm run dev
```

## Link GitHub Pages

[Around the U.S.](https://github.com/bluejono/web_project_around_auth)

## Demonstração

> Acesse o link acima para visualizar o projeto em produção.
