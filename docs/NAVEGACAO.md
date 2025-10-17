# 🧭 Guia de Navegação - Pethology

## Fluxo Completo de Navegação

```
┌─────────────────┐
│  auth0-login    │  Login do usuário
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ student-        │  Dashboard principal
│ dashboard.html  │  - Ver progresso
│                 │  - Ver estatísticas
│                 │  - Ver achievements
└────────┬────────┘
         │
         ├─→ Sidebar: Clicar em módulo (ex: Biology)
         │   └─→ quiz.html?module=biology
         │
         ├─→ Botão "Continue Biology"
         │   └─→ quiz.html?module=biology
         │
         └─→ Botão "Start Quiz"
             └─→ quiz.html (menu de seleção)
```

---

## 📍 Pontos de Navegação no Dashboard

### 1. **Sidebar - Módulos** (Clique direto)
```html
🧬 Biology           → quiz.html?module=biology
🐾 Animal Welfare    → quiz.html?module=animal-welfare
🦴 Anatomy           → quiz.html?module=animal-anatomy
🏠 Husbandry         → quiz.html?module=grooming
✂️ Grooming          → quiz.html?module=grooming
🐹 Small Animals     → quiz.html?module=small-animals
```

### 2. **Progress Section**
```html
"Continue Biology" → quiz.html?module=biology
```
Este botão muda dinamicamente baseado no módulo com menor progresso.

### 3. **Feature Cards**
```html
Smart Review    → Em desenvolvimento
Adaptive Quiz   → quiz.html (menu)
Exam Mode       → Em desenvolvimento
```

### 4. **Tools Sidebar**
```html
📖 Glossary     → Scroll para glossary section
📚 Flashcards   → Em desenvolvimento
📝 Notes        → Em desenvolvimento
🎯 Goals        → Em desenvolvimento
```

---

## 🎮 Quiz Navigation

### Entrada no Quiz

**Método 1: URL com parâmetro**
```
quiz.html?module=biology
```
- Auto-carrega o quiz de Biology
- Pula o menu de seleção
- Começa imediatamente

**Método 2: Menu de seleção**
```
quiz.html
```
- Mostra todos os quizzes disponíveis
- Usuário escolhe qual fazer
- Clica no botão do módulo

### Durante o Quiz

```
Pergunta 1
  └─→ Responder correta ✅
      └─→ Botão "Next" aparece
          └─→ Pergunta 2

Pergunta X (última)
  └─→ Responder correta ✅
      └─→ "Congrats! 🎉"
          └─→ Salva no Firebase
              └─→ Botão "Back to beginning"
                  └─→ quiz.html (menu)
```

### Após Completar Quiz

```
Quiz Completed
  ├─→ Botão "Back to beginning" → quiz.html (menu)
  └─→ Voltar manualmente → student-dashboard.html
      └─→ Ver estatísticas atualizadas!
```

---

## 🔄 URLs e Parâmetros

### Quiz URLs
```bash
# Menu de seleção
quiz.html

# Biology direto
quiz.html?module=biology

# Animal Welfare direto
quiz.html?module=animal-welfare

# Anatomy direto
quiz.html?module=animal-anatomy

# Grooming direto
quiz.html?module=grooming

# Small Animals direto
quiz.html?module=small-animals

# Animal Behaviour direto
quiz.html?module=animal-behaviour

# Vet Assistant direto
quiz.html?module=vet-assistant

# Word Processing direto
quiz.html?module=word-processing
```

---

## 🎯 Casos de Uso

### Caso 1: Usuário novo faz primeiro quiz
```
1. Login → auth0-login.html
2. Redireciona → student-dashboard.html
3. Vê tudo em 0%
4. Clica "Continue Biology" ou 🧬 na sidebar
5. Redireciona → quiz.html?module=biology
6. Faz o quiz
7. Completa → Salva no Firebase
8. Volta → student-dashboard.html
9. Vê: Biology 10%, 1 quiz, score médio
```

### Caso 2: Usuário quer fazer quiz específico
```
1. No dashboard
2. Clica na sidebar: 🐾 Animal Welfare
3. Vai direto → quiz.html?module=animal-welfare
4. Faz o quiz
5. Volta ao dashboard
6. Animal Welfare agora tem progresso
```

### Caso 3: Usuário quer explorar todos os quizzes
```
1. No dashboard
2. Clica "Start Quiz" (feature card)
3. Vai para → quiz.html (sem parâmetro)
4. Vê menu com todos os 8 quizzes
5. Escolhe qual fazer
6. Clica no botão
7. Quiz começa
```

---

## 🔧 Como Funciona Tecnicamente

### Auto-load de Quiz
```javascript
// quiz.js detecta parâmetro na URL
const urlParams = new URLSearchParams(window.location.search);
const module = urlParams.get('module');

if (module === 'biology') {
  loadQuiz('biology.js', 'Biology');
}
```

### Mapeamento de Módulos
```javascript
const moduleMap = {
  'biology': { file: 'biology.js', name: 'Biology' },
  'animal-welfare': { file: 'animal-welfare.js', name: 'Animal Welfare' },
  'animal-anatomy': { file: 'animal-anatomy.js', name: 'Animal Anatomy and Physiology' },
  // ... outros módulos
};
```

---

## 📱 Navegação Mobile

Em mobile, o comportamento é o mesmo:
- Sidebar colapsa mas funciona igual
- Botões ficam maiores
- Layout responsivo mantém funcionalidade

---

## 🐛 Troubleshooting

### "Quiz não carrega quando clico no módulo"
✅ Verifique se o `data-module-link` está correto
✅ Abra o Console e veja erros
✅ Verifique se o arquivo do quiz existe (ex: biology.js)

### "Botão 'Back' não funciona"
✅ Verifique se a função `goBackToMenu()` está definida
✅ Limpe o cache do navegador

### "Dashboard não mostra progresso atualizado"
✅ Recarregue a página (F5)
✅ Verifique se o quiz foi salvo (Console: "✅ Quiz result saved")
✅ Verifique Firebase Console → student_progress

---

## ✅ Checklist de Navegação

Teste todos esses fluxos:

- [ ] Login → Dashboard (redireciona corretamente)
- [ ] Clicar "Continue Biology" → Abre quiz de Biology
- [ ] Clicar sidebar "🧬 Biology" → Abre quiz de Biology
- [ ] Clicar sidebar "🐾 Animal Welfare" → Abre quiz de Animal Welfare
- [ ] Clicar "Start Quiz" → Abre menu de seleção
- [ ] No menu, clicar "Biology" → Abre quiz
- [ ] Completar quiz → Mostra "Congrats"
- [ ] Clicar "Back to beginning" → Volta ao menu
- [ ] Voltar ao dashboard → Progresso atualizado
- [ ] Logout → Volta ao login

---

## 🚀 Próximas Melhorias

Navegações que podem ser adicionadas:

1. **Breadcrumbs**: Mostrar caminho atual
2. **Back button**: Botão de voltar no quiz
3. **Progress indicator**: Quantas perguntas faltam
4. **Module completion**: Redirecionar automaticamente ao próximo módulo
5. **Recommendations**: Sugerir próximo quiz baseado em performance

---

**Agora a navegação está completa e intuitiva! 🎉**
