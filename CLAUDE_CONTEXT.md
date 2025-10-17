# 🤖 Claude Context - Pethology Development

**Última atualização:** 17 Outubro 2025
**Sessões:** 2-3 sessões de desenvolvimento

---

## 📝 **RESUMO DO PROJETO:**

**Pethology** é uma plataforma educacional (LMS) especializada em **Animal Care & Veterinary Studies** para estudantes de PLC (Post Leaving Certificate) na Irlanda.

**Objetivo:** Competir com Moodle e Microsoft Teams, oferecendo:
- Sistema de quiz inteligente (adaptive AI)
- Gamificação (achievements, streaks, XP)
- UI moderna e intuitiva
- Foco em nicho específico (Animal Care)

---

## 🎯 **SESSÃO ATUAL (17 OUT 2025):**

### **✅ O que foi implementado:**

1. **Achievement System (19 conquistas)**
   - Arquivo: `assets/js/achievements.js` (538 linhas)
   - 4 categorias: Learning, Consistency, Specialized, Special
   - Toast notifications com som
   - Locked/unlocked states visuais
   - Integração com Firebase
   - Automatic checking após quiz completion

2. **User Indicator no Header**
   - Círculo com iniciais do usuário
   - Dropdown com Dashboard link e Logout
   - Aparece automaticamente quando logado
   - Firebase methods: `getCurrentUser()`, `logout()`

3. **Progress Circles Dinâmicos**
   - Mostram 4 módulos mais recentes
   - Ordenação por data real de quiz completion
   - Cores para todos os 11 módulos
   - Auto-criação de module progress

4. **Import Students Page**
   - Arquivo: `import-students.html` (nova página)
   - CSV upload com drag & drop
   - Manual entry form (firstName, lastName, email)
   - Validação @plc.ie
   - Preview antes de salvar
   - Firebase methods: `addPreRegisteredStudent()`, `checkPreRegistered()`, `markAsRegistered()`, `getPreRegisteredStudents()`

5. **UI Improvements**
   - Centralized quiz answer buttons
   - Module name normalization fix
   - Back to Menu navigation fix
   - All 11 module colors defined

6. **Documentation**
   - `MOODLE_TEAMS_COMPARISON.md` - Análise completa de features necessárias
   - `TODO.md` atualizado com novas prioridades
   - Class Management System especificado
   - Announcements & Calendar planejados

---

## 🔥 **PRÓXIMAS PRIORIDADES (em ordem):**

### **1. WHITELIST SIGNUP SYSTEM (2-3h) - PRÓXIMO PASSO**
**Status:** Parcialmente implementado (import pronto)

**O que falta:**
- Modificar `auth0-callback.html` - adicionar whitelist check
- Bloquear signup se email não está na whitelist
- Mostrar mensagem: "You need an invitation from your teacher"
- Auto-assign aluno à turma após signup aprovado
- Testar fluxo completo

**Arquivos críticos:**
- `auth0-callback.html` - Adicionar lógica de verificação

---

### **2. ANNOUNCEMENTS SYSTEM (3-4h)**
**Teacher:**
- Botão "📢 New Announcement"
- Form: title, message, pin to top, send email
- Lista com edit/delete

**Student:**
- Banner no topo do dashboard
- Badge com número de não lidos
- Mark as read

**Firebase:**
```javascript
/announcements/{id}
{
  classId, createdBy, title, message,
  isPinned, createdAt, readBy: []
}
```

---

### **3. CALENDAR + ASSIGNMENT REMINDERS (3-4h)**
- Calendar widget visual
- Lista "Upcoming Deadlines" (7 dias)
- Color coding (quiz, assignment, exam, announcement)
- Overdue warnings
- Click → vai para item

**Firebase:**
```javascript
/events/{id}
{
  classId, type, title, date, dueDate, relatedId
}
```

---

## 📊 **ESTADO ATUAL DO CÓDIGO:**

### **Arquivos Principais:**

**Frontend:**
- `student-dashboard.html` - Dashboard com achievements, progress circles
- `teacher-dashboard.html` - Teacher analytics + Import Students button
- `import-students.html` - CSV/manual student import (NOVO)
- `quiz.html` - Quiz system com user indicator

**JavaScript:**
- `assets/js/achievements.js` - Achievement system completo (NOVO)
- `assets/js/firebase-service.js` - Firebase methods + class management
- `assets/js/quiz/quiz.js` - Quiz logic + normalization fixes

**Documentation:**
- `TODO.md` - Roadmap completo
- `MOODLE_TEAMS_COMPARISON.md` - Feature analysis (NOVO)
- `ACHIEVEMENTS_README.md` - Achievement system docs
- `CLAUDE_CONTEXT.md` - Este arquivo (NOVO)

---

## 🗂️ **FIREBASE COLLECTIONS:**

### **Existentes:**
```
/users/{userId}
  - id, name, email, role, photo, lastLogin

/student_progress/{userId}
  - overallStats, moduleProgress, achievements

/quiz_results/{resultId}
  - userId, quizId, score, answers, completedAt
```

### **Novas (implementadas):**
```
/pre_registered_students/{email}
  - email, firstName, lastName, classId, addedBy, registered
```

### **Planejadas:**
```
/classes/{classId}
  - name, code, teachers[], students{registered[], pending[]}

/announcements/{id}
  - classId, title, message, isPinned, readBy[]

/events/{id}
  - classId, type, title, date, dueDate

/quizzes/{quizId}  (custom quizzes)
  - isPublic, classId, createdBy, questions[]
```

---

## 🔐 **SECURITY RULES (para implementar):**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Pre-registered students (whitelist)
    match /pre_registered_students/{email} {
      allow read: if request.auth != null;
      allow create, update, delete: if isTeacher();
    }

    // Quizzes - PUBLIC vs CUSTOM
    match /quizzes/{quizId} {
      allow read: if resource.data.isPublic == true
                  || (request.auth != null
                      && isStudentInClass(resource.data.classId));
      allow create, update, delete: if isTeacher();
    }

    // Classes
    match /classes/{classId} {
      allow read: if request.auth != null
                  && (isTeacher() || isStudentInClass(classId));
      allow create, update, delete: if isTeacher();
    }
  }
}
```

---

## 💡 **DECISÕES DE DESIGN:**

### **1. Sistema Fechado (Whitelist)**
**Decisão:** Apenas emails pré-registrados pelo professor podem criar conta.

**Razão:**
- Controle total do professor
- Zero spam/cadastros aleatórios
- Segurança para custom quizzes
- Rastreabilidade completa

**Como funciona:**
1. Professor adiciona emails na whitelist (CSV ou manual)
2. Aluno tenta fazer signup
3. Sistema verifica se email está na whitelist
4. Se SIM → permite signup + auto-assign à turma
5. Se NÃO → bloqueia com mensagem "You need an invitation"

---

### **2. Public vs Custom Quizzes**
**Decisão:** Dois tipos de quiz no sistema.

**Public Quizzes:**
- 10 módulos fixos (Biology, Animal Welfare, etc.)
- Visível para TODOS (logado ou não)
- Visitantes podem fazer 30% das questões

**Custom Quizzes:**
- Criados/importados pelo professor
- Visível APENAS para alunos da turma
- Não aparecem para visitantes
- Professor pode importar de Microsoft Forms

**Razão:**
- Public modules = marketing/demo do sistema
- Custom quizzes = conteúdo exclusivo/sensível da turma
- Flexibilidade para professor

---

### **3. Announcements vs Real-time Chat**
**Decisão:** Announcements assíncronos, SEM chat em tempo real.

**Razão:**
- Chat tem muita complexidade (WebSocket, message history, typing indicators)
- Alunos já usam WhatsApp/Discord para chat
- Announcements resolvem 80% das necessidades de comunicação
- Professor precisa enviar avisos, não conversar 24/7

---

### **4. Calendar sem Assignment System (por enquanto)**
**Decisão:** Implementar calendar com deadlines, mas sem assignment upload full-featured.

**Razão:**
- Assignment system completo = 6-8 horas
- Calendar = 3-4 horas
- Calendar sozinho já é muito útil (visibilidade de deadlines)
- Assignments podem vir depois

---

## 🐛 **BUGS CONHECIDOS:**

1. ✅ **RESOLVIDO:** Quiz answer buttons não centralizados → Adicionado CSS `display: block !important`
2. ✅ **RESOLVIDO:** Module names inconsistentes → Aplicado `normalizeModuleName()` no save
3. ✅ **RESOLVIDO:** Module progress não auto-criado → Adicionado check e criação automática
4. ✅ **RESOLVIDO:** Back to Menu quebrado → Revertido para comportamento simples
5. ✅ **RESOLVIDO:** Firebase composite index missing → Implementado fallback query com sort manual

**Pendentes:**
- Nenhum conhecido no momento

---

## 📈 **MÉTRICAS DE PROGRESSO:**

### **Commits Recentes:**
- **Commit 923f5b2** (17 Out 2025): Achievement system + user indicator + class management spec
  - +2,325 linhas adicionadas
  - 7 arquivos modificados
  - 2 arquivos novos criados

### **Total de Features:**
- ✅ 19 Achievements implementados
- ✅ 200 questões de quiz (10 módulos)
- ✅ Firebase + Auth0 setup
- ✅ Student & Teacher dashboards
- ✅ Import students (CSV + manual)
- ✅ User indicator com dropdown
- ✅ Progress tracking dinâmico

---

## 🔍 **CONTEXTO PARA PRÓXIMA SESSÃO:**

### **Onde paramos:**
- Acabamos de fazer commit de achievement system + import students
- TODO.md atualizado com Announcements e Calendar planejados
- Próximo passo: **WHITELIST SIGNUP** (modificar auth0-callback.html)

### **O que você precisa saber:**
1. **Whitelist é CRÍTICO** - sem isso, qualquer pessoa pode criar conta
2. **auth0-callback.html** é o arquivo que processa signup/login do Auth0
3. Precisamos adicionar check de `checkPreRegistered(email)` antes de criar conta
4. Se email não está na whitelist, mostrar erro e fazer logout

### **Quick Start para próxima sessão:**
```
Olá Claude! Vamos continuar o Pethology.

Status atual:
✅ Achievement system implementado
✅ Import students page pronta
✅ Firebase methods de whitelist prontos

Próximo objetivo: WHITELIST SIGNUP BLOCKING

Preciso:
1. Modificar auth0-callback.html
2. Adicionar check de email na whitelist
3. Bloquear signup se não estiver pré-registrado
4. Mostrar mensagem de erro clara
5. Auto-assign à turma se aprovado

Arquivo crítico: auth0-callback.html

Pode me ajudar a implementar?
```

---

## 🎨 **TECH STACK:**

**Frontend:**
- Vanilla HTML/CSS/JS (ES6 Modules)
- No frameworks (deliberado para simplicidade)
- Firebase SDK 10.7.1
- Auth0 for authentication

**Backend:**
- Firebase Firestore (database)
- Firebase Authentication (via Auth0)
- Netlify (hosting)
- GitHub (version control)

**Tools:**
- Fisher-Yates Shuffle (quiz randomization)
- Web Audio API (achievement sounds)
- Drag & Drop API (CSV upload)

---

## 🌐 **DEPLOYMENT:**

**Production:**
- URL: https://pethology.netlify.app
- Auto-deploy from GitHub main branch
- Environment: Production

**Firebase:**
- Project ID: pethology-7e9d7
- Region: europe-west1
- Rules: Currently open (needs tightening)

**Auth0:**
- Domain: pethology.eu.auth0.com
- Connections: Microsoft, Google, Email/Password
- Callbacks configured for Netlify

---

## 📚 **DOCUMENTAÇÃO ADICIONAL:**

- Ver `MOODLE_TEAMS_COMPARISON.md` para análise de features
- Ver `ACHIEVEMENTS_README.md` para detalhes do sistema de conquistas
- Ver `TODO.md` para roadmap completo
- Ver `TODO.md` seção "Class Management System" para spec completa do sistema de turmas

---

## 💬 **NOTAS DA CONVERSA:**

### **User Preferences:**
- Prefere fazer commit frequentemente antes de grandes mudanças
- Gosta de organização clara (TODO.md, CLAUDE_CONTEXT.md)
- Foco em features práticas (não precisa de tudo que Moodle tem)
- Prioriza: Announcements + Calendar (não precisa chat em tempo real)

### **Design Philosophy:**
- Simples > Complexo
- Visual > Texto
- Gamificação para engajamento
- Especialização no nicho (Animal Care)

---

**Fim do contexto. Próxima sessão: WHITELIST SIGNUP BLOCKING! 🚀**
