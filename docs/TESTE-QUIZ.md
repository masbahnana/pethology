# 🧪 Guia de Teste - Sistema de Quiz + Firebase

## Pré-requisitos
- [ ] Firebase está configurado (firebase-service.js existe)
- [ ] Você tem um usuário de teste criado
- [ ] Navegador com DevTools (Chrome, Firefox, Safari)

---

## Método 1: Teste Rápido com Script (5 minutos)

### 1. Fazer Login
1. Abra: `https://pethology.netlify.app/auth0-login.html`
2. Faça login com suas credenciais
3. Você será redirecionado para o dashboard

### 2. Abrir o Console do Navegador
- **Chrome/Edge**: `Cmd + Option + I` (Mac) ou `F12` (Windows)
- **Firefox**: `Cmd + Option + K` (Mac) ou `F12` (Windows)
- **Safari**: `Cmd + Option + C` (Mac)

### 3. Rodar o Script de Teste
1. Abra o arquivo: `test-quiz-firebase.js`
2. Copie TODO o conteúdo
3. Cole no Console do navegador
4. Pressione Enter

### 4. Verificar Resultados
Você deverá ver:
```
🧪 INICIANDO TESTE DO QUIZ + FIREBASE
=====================================
✅ Usuário logado: Seu Nome
✅ Firebase Service carregado!
✅ Progresso carregado
✅ Resultado salvo com ID: xyz123
✅ TESTE COMPLETO! Sistema funcionando! 🎉
```

---

## Método 2: Teste Manual Completo (10 minutos)

### PASSO 1: Login
1. Vá para: `auth0-login.html`
2. Faça login
3. Será redirecionado para `student-dashboard.html`

### PASSO 2: Ver Dashboard Inicial
1. Abra o Console (F12)
2. Você deverá ver:
   ```
   🚀 Student Dashboard loading...
   🔄 Loading student data from Firebase...
   ✅ Student data loaded successfully!
   ```
3. Veja as estatísticas iniciais:
   - Total Quizzes: 0
   - Average Score: 0%
   - Streak: 0
   - Total Time: 0 min

### PASSO 3: Fazer um Quiz
1. Clique em "Start Quiz" ou vá para `quiz.html`
2. Clique no botão **"Biology"** 🧬
3. Responda 5-10 perguntas (não precisa fazer todas!)
4. Para cada resposta:
   - Se correta: ✅ + explicação
   - Se errada: ❌ tente novamente

### PASSO 4: Completar o Quiz
1. Continue até ver: "Congrats, you completed our quiz! 🎉"
2. Você verá:
   ```
   Score: 8 / 10
   Time: 2m 30s
   ```
3. No Console, verifique:
   ```
   💾 Saving quiz result to Firebase...
   ✅ Quiz result saved with ID: xyz123
   📊 Updating student progress...
   ✅ Progress updated successfully!
   ```

### PASSO 5: Verificar Firebase Console
1. Vá para: https://console.firebase.google.com/
2. Selecione projeto: **pethology**
3. Firestore Database → Collections:
   - **quiz_results**: Deve ter 1 novo documento
   - **student_progress**: Deve estar atualizado

### PASSO 6: Voltar ao Dashboard
1. Vá para `student-dashboard.html`
2. Recarregue a página (F5)
3. Verifique as estatísticas atualizadas:
   - ✅ Total Quizzes: 1
   - ✅ Average Score: 80% (ou o que você tirou)
   - ✅ Círculo de Biology: 10% completo
   - ✅ Total Time: 2 min

### PASSO 7: Achievements (Opcional)
Para desbloquear achievements:
- **Quiz Master** 🌟: Complete 10 quizzes
- **Perfect Score** 🎯: Tire 100% em um quiz

---

## 📊 O Que Verificar no Firebase Console

### Collection: `quiz_results`
```json
{
  "userId": "seu-id",
  "quizId": "Biology",
  "type": "normal",
  "score": 0.8,
  "totalQuestions": 10,
  "correctAnswers": 8,
  "timeSpent": 150,
  "completedAt": "2025-01-15T10:30:00Z",
  "answers": [...]
}
```

### Collection: `student_progress` → Seu User ID
```json
{
  "overallStats": {
    "totalQuizzes": 1,
    "averageScore": 0.8,
    "streak": 1,
    "totalTimeSpent": 150,
    "lastActivity": "2025-01-15T10:30:00Z"
  },
  "moduleProgress": {
    "biology": {
      "completion": 10,
      "averageScore": 0.8,
      "timeSpent": 150
    }
  },
  "achievements": []
}
```

---

## ❓ Problemas Comuns

### "No user session found"
- **Solução**: Faça login novamente em `auth0-login.html`

### "Firebase Service not found"
- **Solução**: Verifique se `assets/js/firebase-service.js` existe
- Verifique se o Firebase está configurado corretamente

### Stats não atualizam
- **Solução**:
  1. Abra o Console e veja se há erros
  2. Verifique se o quiz foi salvo (mensagem "✅ Quiz result saved")
  3. Recarregue a página

### Círculos de progresso em 0%
- **Solução**:
  1. Complete pelo menos 1 quiz
  2. Volte ao dashboard
  3. Se ainda estiver em 0%, verifique o Console por erros

---

## ✅ Checklist Final

Após completar os testes:

- [ ] Login funciona e redireciona para dashboard
- [ ] Dashboard carrega dados do Firebase
- [ ] Quiz salva resultados no Firebase
- [ ] Stats atualizam após completar quiz
- [ ] Círculos de progresso mostram porcentagem
- [ ] Achievements funcionam (se aplicável)
- [ ] Console não mostra erros críticos

---

## 🎉 Próximos Passos

Após verificar que tudo funciona:

1. **Adicione mais quizzes** para testar diferentes módulos
2. **Teste achievements** completando 10 quizzes
3. **Teste em diferentes navegadores** (Chrome, Firefox, Safari)
4. **Teste em mobile** (responsividade)

---

## 💬 Dúvidas?

Se algo não funcionar:
1. Abra o Console (F12)
2. Copie os erros em vermelho
3. Verifique o Firebase Console
4. Verifique se todas as collections existem
