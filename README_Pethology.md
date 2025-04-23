# Pethology Roadmap Técnico

## 📌 Visão Geral
Pethology é uma plataforma educacional para estudantes de Animal Care com foco em quizzes, conteúdo modular, blog e suporte. A inspiração vem de sites como SimplyStudy.ie e Duolingo, buscando manter uma abordagem minimalista, intuitiva e interativa.

---

## 🔧 Stack Recomendada

### Frontend
- **HTML/CSS Vanilla**: já em uso, ótimo para prototipagem rápida e sem dependência.
- **JS Vanilla + Fetch API**: suficiente para interatividade básica como carregar conteúdo em Markdown.
- **TailwindCSS (opcional)**: para estilização mais rápida e consistente (pode substituir parte do CSS atual).
- **Markdown.js / Showdown.js**: para renderização de conteúdos .md.

### Backend (futuramente)
- **Firebase Auth (Microsoft 365)**: integração de login simples com Azure AD via OAuth.
- **Firebase Firestore ou Supabase**: banco de dados leve para armazenar progresso de usuário, perfis, resultados de quizzes.
- **Node.js (opcional)**: caso queira escalar e tenha APIs próprias.

---

## 🧭 Roadmap por Fase

### 🔹 Fase 1 – MVP (Já em andamento)
- [x] Homepage minimalista
- [x] Navegação entre páginas principais
- [x] Sistema de quiz em HTML/JS com perguntas divididas por módulo
- [x] Página de conteúdo com carregamento dinâmico de Markdown
- [x] Blog com posts simples + redirecionamento para arquivos .md
- [x] Responsividade básica

### 🔸 Fase 2 – Blog e Conteúdo Expandido
- [ ] Organização de posts em diretórios por ano/mês
- [ ] Renderização do markdown diretamente na página (sem sair do site)
- [ ] Categorias e filtros por tag (JS)
- [ ] Menu lateral fixo com tópicos e progresso (estilo Notion)

### 🔹 Fase 3 – Módulo de Login
- [ ] Integração com Microsoft 365 (Azure AD)
- [ ] Identificação do tipo de usuário (professor/aluno) via domínio ou perfil
- [ ] Sessão de usuário com nome, foto, progresso salvo

### 🔸 Fase 4 – Diferenciais Pethology
- [ ] Gamificação leve (XP por quiz, troféus, barra de progresso)
- [ ] Cards ilustrados de anatomia animal
- [ ] Modo escuro/tema personalizável
- [ ] Notas compartilháveis entre alunos e professores
- [ ] Versão offline/PWA

---

## 🆚 Comparação com SimplyStudy.ie

| Recurso                         | SimplyStudy.ie | Pethology (Proposta)       |
|-------------------------------|----------------|-----------------------------|
| Login com Microsoft           | ✅             | ✅                          |
| Quizzes com tracking          | ✅             | ✅ (futuramente com XP)     |
| Gamificação visual            | ✅             | ⚡ Em planejamento           |
| Foco em Animal Care           | ❌             | ✅                          |
| Leitura e conteúdo em Markdown| ❌             | ✅                          |
| Blog educativo                | ❌             | ✅                          |
| PWA/offline                   | ❌             | ✅                          |
| Plataforma aberta e leve      | ❌             | ✅ (HTML/JS sem dependências)|

---

## 🔄 Possíveis Integrações Futuras

- API de veterinária (ex: dados de raças, doenças)
- Sistema de flashcards
- Editor visual de quizzes para professores

---

## ✨ Conclusão

A proposta do Pethology é manter uma stack simples e eficiente para acelerar o desenvolvimento, com foco em design minimalista e usabilidade mobile-first. Ao invés de copiar o SimplyStudy, será uma plataforma única para quem estuda e trabalha com animais.

---

📅 Última atualização: 2025-04-17
