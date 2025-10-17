# 🎮 Guia do Quiz - Como Usar

## 🎯 Novo Sistema de Quiz com Progresso

Agora você **NÃO precisa** completar todas as 50 perguntas de uma vez!

---

## 📊 O Que Você Vai Ver

### 1. **Barra de Progresso** (No topo)
```
Question 5 of 50                      10% Complete
██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

Mostra:
- Qual pergunta você está (5 of 50)
- Porcentagem completa (10%)
- Barra visual colorida

---

## 🎮 Botões Disponíveis Durante o Quiz

### 1. **← Back to Menu** (Cinza)
- Volta ao menu de quizzes
- ⚠️ **PERDE O PROGRESSO** se não salvar antes

### 2. **💾 Save Progress & Exit** (Laranja)
- **SALVA** seu progresso atual
- Sai do quiz
- Pode continuar depois
- ✅ **Recomendado**: Use este para pausar!

### 3. **✓ Finish Quiz Now** (Verde)
- Finaliza o quiz **agora**
- Salva como "completo"
- Útil se você quer parar mas contar como feito

---

## 📱 Como Usar - Passo a Passo

### Cenário 1: Fazer Quiz Completo (50 perguntas)
```
1. Entrar no quiz de Biology
2. Responder pergunta 1 → Next
3. Responder pergunta 2 → Next
4. ...
5. Responder pergunta 50 → Concluído! 🎉
6. Salva automaticamente no Firebase
```

### Cenário 2: Fazer Quiz Parcial (Salvar e Continuar Depois)
```
1. Entrar no quiz de Biology
2. Responder perguntas 1-10 (20 minutos)
3. Ver: "Question 10 of 50 - 20% Complete"
4. Clicar: 💾 Save Progress & Exit
5. ✅ Aparece: "Progress saved! 8 correct answers, Time: 20m 15s"
6. Volta ao menu
7. Seu progresso está salvo no Firebase!
```

### Cenário 3: Finalizar Quiz Antecipadamente
```
1. Entrar no quiz de Biology
2. Responder perguntas 1-15 (10 corretas)
3. Ver: "Question 15 of 50 - 30% Complete"
4. Clicar: ✓ Finish Quiz Now
5. Confirmar: "Finish quiz now? 10 out of 15 correct"
6. ✅ Quiz salvo como completo
7. Dashboard atualizado com progresso!
```

---

## 🔍 Console do Navegador (F12)

Agora você vai ver logs em tempo real:

### Ao Iniciar Quiz
```
🎯 Loading quiz: Biology
✅ Quiz loaded! 50 questions available
💡 TIP: You can save progress anytime using "Save Progress & Exit" button
```

### Durante o Quiz
```
✅ Correct! Score: 1/1
✅ Correct! Score: 2/2
❌ Wrong answer. Score: 2/3
✅ Correct! Score: 3/4
```

### Ao Salvar Progresso
```
💾 Saving partial progress...
💾 Saving quiz result to Firebase...
✅ Quiz result saved with ID: xyz123
📊 Updating student progress...
✅ Progress updated successfully!
```

---

## 🎯 Exemplos Práticos

### Exemplo 1: Estudante com Pouco Tempo
```
Tenho 10 minutos para estudar hoje.

1. Abrir quiz de Biology
2. Responder 5 perguntas (5 min)
3. Ver progresso: "Question 5 of 50 - 10% Complete"
4. Clicar: 💾 Save Progress & Exit
5. Amanhã: Continuar de onde parou!
```

### Exemplo 2: Testar o Sistema
```
Quero ver se está funcionando.

1. Abrir quiz de Biology
2. Responder 3 perguntas corretamente
3. Abrir Console (F12)
4. Ver: "✅ Correct! Score: 3/3"
5. Clicar: ✓ Finish Quiz Now
6. Voltar ao dashboard
7. Ver: Biology 10% completo, 1 quiz, 100% score!
```

### Exemplo 3: Fazer Quiz Completo Rápido
```
Quero responder muitas perguntas.

1. Abrir quiz de Biology
2. Responder 20 perguntas (20 min)
3. Ver: "Question 20 of 50 - 40% Complete"
4. Clicar: ✓ Finish Quiz Now
5. Confirmar finalização
6. ✅ Quiz salvo!
7. Dashboard mostra progresso atualizado
```

---

## 📈 O Que É Salvo no Firebase

### Quiz Completo (Finish Quiz Now)
```json
{
  "quizId": "Biology",
  "totalQuestions": 15,
  "correctAnswers": 10,
  "score": 0.67,
  "timeSpent": 900,
  "isPartial": false
}
```

### Quiz Parcial (Save Progress)
```json
{
  "quizId": "Biology",
  "totalQuestions": 5,
  "correctAnswers": 4,
  "score": 0.8,
  "timeSpent": 300,
  "isPartial": true
}
```

Ambos atualizam seu progresso no dashboard!

---

## 🏆 Impacto no Dashboard

### Após Salvar Progresso Parcial
```
Your Statistics
┌─────────────────┬───────────────┬──────────┬────────────┐
│ Quizzes         │ Average Score │ Streak   │ Total Time │
│      1          │      80%      │    1     │   5 min    │
└─────────────────┴───────────────┴──────────┴────────────┘

Progress Overview
Biology:     10% ████░░░░░░░░░░░░░░░░░░░░░░
```

### Após Finish Quiz Now (15/50 perguntas)
```
Your Statistics
┌─────────────────┬───────────────┬──────────┬────────────┐
│ Quizzes         │ Average Score │ Streak   │ Total Time │
│      1          │      67%      │    1     │  15 min    │
└─────────────────┴───────────────┴──────────┴────────────┘

Progress Overview
Biology:     10% ████░░░░░░░░░░░░░░░░░░░░░░
```

---

## ❓ Perguntas Frequentes

### Posso pausar o quiz e voltar depois?
✅ **SIM!** Use "💾 Save Progress & Exit"

### Tenho que responder todas as 50 perguntas?
❌ **NÃO!** Use "✓ Finish Quiz Now" para finalizar cedo

### O que acontece se eu fechar o navegador sem salvar?
⚠️ Você perde o progresso. Sempre use "Save Progress & Exit"!

### Como vejo meu progresso durante o quiz?
✅ Olhe no topo: "Question 5 of 50 - 10% Complete"
✅ Abra o Console (F12) e veja o score: "Score: 4/5"

### Save Progress & Exit salva no Firebase?
✅ **SIM!** Tudo é salvo automaticamente

### Posso fazer o mesmo quiz várias vezes?
✅ **SIM!** Cada tentativa conta e melhora sua média

---

## 🎨 Visual dos Botões

```
┌─────────────────────────────────────────┐
│  Question 5 of 50        10% Complete   │
│  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │
├─────────────────────────────────────────┤
│                                         │
│  Sua pergunta aqui...                   │
│                                         │
│  □ Opção A                              │
│  □ Opção B                              │
│  □ Opção C                              │
│  □ Opção D                              │
│                                         │
├─────────────────────────────────────────┤
│ ← Back to Menu  │ 💾 Save & Exit  │ ✓ Finish │
│    (Cinza)      │   (Laranja)    │  (Verde) │
└─────────────────────────────────────────┘
```

---

## 🚀 Teste Agora!

### Teste Rápido (2 minutos)
1. Vá para: `quiz.html?module=biology`
2. Responda 3 perguntas
3. Abra Console (F12)
4. Veja os logs de score
5. Clique "✓ Finish Quiz Now"
6. Volte ao dashboard
7. Veja progresso atualizado!

### Teste de Save Progress (5 minutos)
1. Vá para: `quiz.html?module=biology`
2. Responda 5 perguntas
3. Clique "💾 Save Progress & Exit"
4. Veja mensagem de confirmação
5. Volte ao dashboard
6. Veja que seu progresso foi salvo!
7. Abra Firebase Console
8. Veja o documento em `quiz_results`

---

## ✅ Checklist de Funcionalidades

Teste todas essas features:

- [ ] Barra de progresso aparece no topo
- [ ] Mostra "Question X of Y"
- [ ] Mostra "X% Complete"
- [ ] Botão "Save Progress & Exit" funciona
- [ ] Botão "Finish Quiz Now" funciona
- [ ] Console mostra logs de score
- [ ] Quiz salva no Firebase
- [ ] Dashboard atualiza após salvar
- [ ] Pode voltar e ver progresso
- [ ] Achievements desbloqueiam (após 10 quizzes)

---

**Agora você tem controle total sobre seus quizzes! 🎉**

Não precisa mais fazer 50 perguntas de uma vez - faça no seu ritmo! 📚✨
