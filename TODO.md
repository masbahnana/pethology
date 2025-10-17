# 🎓 Pethology - TODO List & Roadmap Completo

**Última atualização:** 17 Outubro 2025
**Status atual:** Achievement System ✅ + Import Students ✅ + User Indicator ✅

---

## 🚀 **QUICK START - PRÓXIMA SESSÃO:**

**Objetivo Principal:** Implementar Achievement System com emojis 🏆

**Copy/Paste este prompt para começar:**

```
Olá! Vamos continuar o Pethology implementando o Achievement System.

Status atual:
- ✅ 200 questões de quiz prontas (10 módulos)
- ✅ Quiz randomization funcionando
- ✅ Firebase + Auth0 configurados

Próximo objetivo: Achievement System com emojis

Preciso:
1. Criar assets/js/achievements.js com 15+ conquistas
2. Adicionar seção de Achievements no student-dashboard.html
3. Implementar check de achievements após quiz
4. Toast notifications animados quando desbloquear achievement
5. Salvar achievements no Firebase

Referência: Ver TODO.md seção "🏆 1. ACHIEVEMENT SYSTEM" com todos os detalhes.

Pode me ajudar a implementar?
```

---

## ✅ **O QUE JÁ ESTÁ PRONTO:**

### **Autenticação & Backend:**
- [x] Auth0 configurado (Microsoft, Google, Email/Password)
- [x] Firebase Firestore setup completo
- [x] Usuários salvos automaticamente no Firebase
- [x] Lógica de role (Student/Teacher) baseada em email
- [x] `firebase-service.js` - serviço centralizado para dados
- [x] Login funcionando em produção (Netlify)
- [x] Callbacks configurados corretamente

### **Frontend Base:**
- [x] Homepage responsiva
- [x] About page com team
- [x] Student Dashboard (estrutura)
- [x] Teacher Dashboard (estrutura)
- [x] Quiz system básico funcionando
- [x] Blog page com posts
- [x] Design minimalista implementado

### **Quiz System:**
- [x] 10 módulos completos com 20 questões cada (200 questões total)
- [x] Randomização de questões usando Fisher-Yates algorithm
- [x] Randomização de opções de resposta (shuffle answers)
- [x] Perguntas + Respostas + Explicações
- [x] Interface funcionando com navegação
- [x] Módulos: Biology, Animal Welfare, Grooming, Anatomy, Parasitology, Nutrition, Animal Behaviour, Small Animals, Vet Assistant Skills, Communications, Work Experience

### **UI/UX Improvements:**
- [x] Logo Pethology adicionado em todas as páginas (40px height)
- [x] Header consistency: padding 30px 60px em todas páginas
- [x] Notion-style design implementado
- [x] Módulos collapsible no student dashboard (como Tools section)
- [x] Teacher content manager com Home e Logout buttons
- [x] Responsive design mantido

---

## 🔥 **PRIORIDADE ALTA - Fazer Agora:**

### **🏆 1. ACHIEVEMENT SYSTEM**

**Status:** ✅ IMPLEMENTADO! (17 Out 2025)

**Objetivo:** Sistema de conquistas gamificado para engajar estudantes

#### **Achievements Planejados (15+ conquistas):**

**📚 Conquistas de Aprendizado:**
- 🎓 **First Steps** - Complete seu primeiro quiz
- 📖 **Knowledge Seeker** - Complete 5 quizzes
- 🧠 **Brain Master** - Complete todos os 10 módulos
- 🔥 **Perfect Score** - Tire 100% em um quiz
- ⭐ **Excellence** - Tire 90%+ em 5 quizzes
- 💯 **Perfectionist** - Tire 100% em 3 quizzes diferentes

**⚡ Conquistas de Consistência:**
- 🌅 **Early Bird** - Complete 3 quizzes antes do meio-dia
- 🔄 **Streak Master** - 7 dias consecutivos completando quizzes
- 🚀 **Speed Demon** - Complete um quiz em menos de 5 minutos com 80%+
- 🎯 **Focused** - Complete 3 quizzes no mesmo dia

**🎯 Conquistas Especializadas:**
- 🐾 **Animal Lover** - Complete todos os módulos de animais (Small Animals, Animal Behaviour, Animal Welfare)
- ⚕️ **Vet Pro** - Complete todos os módulos clínicos (Vet Skills, Anatomy, Parasitology)
- 🥗 **Nutrition Expert** - Tire 90%+ no módulo de Nutrition
- ✂️ **Grooming Guru** - Tire 90%+ no módulo de Grooming
- 💬 **Communication Pro** - Tire 90%+ em Communications

#### **Implementação Técnica:**

**Arquivo:** `assets/js/achievements.js` (criar novo)

```javascript
export const ACHIEVEMENTS = {
  first_steps: {
    id: 'first_steps',
    name: 'First Steps',
    emoji: '🎓',
    description: 'Complete your first quiz',
    condition: (stats) => stats.totalQuizzes >= 1,
    rarity: 'common'
  },
  knowledge_seeker: {
    id: 'knowledge_seeker',
    name: 'Knowledge Seeker',
    emoji: '📖',
    description: 'Complete 5 quizzes',
    condition: (stats) => stats.totalQuizzes >= 5,
    rarity: 'common'
  },
  brain_master: {
    id: 'brain_master',
    name: 'Brain Master',
    emoji: '🧠',
    description: 'Complete all 10 modules',
    condition: (stats) => stats.completedModules >= 10,
    rarity: 'legendary'
  },
  perfect_score: {
    id: 'perfect_score',
    name: 'Perfect Score',
    emoji: '🔥',
    description: 'Score 100% on a quiz',
    condition: (stats) => stats.perfectScores >= 1,
    rarity: 'rare'
  },
  // ... mais achievements
};

export function checkAchievements(userId, stats) {
  const unlockedAchievements = [];

  for (const [key, achievement] of Object.entries(ACHIEVEMENTS)) {
    if (!stats.achievements.includes(key) && achievement.condition(stats)) {
      unlockedAchievements.push(achievement);
    }
  }

  return unlockedAchievements;
}

export function showAchievementToast(achievement) {
  // Toast notification com emoji e animação
  const toast = document.createElement('div');
  toast.className = 'achievement-toast';
  toast.innerHTML = `
    <div class="achievement-emoji">${achievement.emoji}</div>
    <div>
      <div class="achievement-title">Achievement Unlocked!</div>
      <div class="achievement-name">${achievement.name}</div>
    </div>
  `;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
```

**Student Dashboard Updates:**

```javascript
// Em student-dashboard.html
async function loadAchievements() {
  const user = JSON.parse(sessionStorage.getItem('pethologyUser'));
  const progress = await PethologyFirebaseService.getStudentProgress(user.id);

  const achievementContainer = document.getElementById('achievementsGrid');

  Object.values(ACHIEVEMENTS).forEach(achievement => {
    const isUnlocked = progress.achievements?.includes(achievement.id);
    const achievementCard = `
      <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
        <div class="achievement-emoji">${achievement.emoji}</div>
        <div class="achievement-name">${achievement.name}</div>
        <div class="achievement-description">${achievement.description}</div>
        ${isUnlocked ? '<div class="unlocked-badge">✓</div>' : ''}
      </div>
    `;
    achievementContainer.innerHTML += achievementCard;
  });
}
```

**CSS para Achievements:**

```css
.achievement-card {
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #e5e5e5;
  text-align: center;
  transition: all 0.3s ease;
}

.achievement-card.locked {
  opacity: 0.5;
  filter: grayscale(100%);
}

.achievement-card.unlocked {
  border-color: var(--accent);
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.achievement-emoji {
  font-size: 3rem;
  margin-bottom: 12px;
}

.achievement-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  gap: 16px;
  align-items: center;
  transform: translateX(400px);
  transition: transform 0.3s ease;
  z-index: 9999;
}

.achievement-toast.show {
  transform: translateX(0);
}
```

**Firebase Integration:**

```javascript
// Em firebase-service.js adicionar:
async saveQuizResult(resultData) {
  // ... código existente ...

  // Check achievements após salvar resultado
  const progress = await this.getStudentProgress(resultData.userId);
  const newAchievements = checkAchievements(resultData.userId, progress);

  if (newAchievements.length > 0) {
    // Salvar achievements no Firebase
    await this.updateStudentAchievements(resultData.userId, newAchievements);

    // Mostrar toast para cada achievement
    newAchievements.forEach(achievement => {
      showAchievementToast(achievement);
    });
  }
}
```

#### **Tarefas Detalhadas:**
- [x] Criar `assets/js/achievements.js` com sistema de conquistas
- [x] Definir todos os 19 achievements com emojis
- [x] Adicionar seção de Achievements no student dashboard
- [x] Implementar check de achievements após cada quiz
- [x] Criar toast notification animado
- [x] CSS para achievement cards (locked/unlocked states)
- [x] Salvar achievements no Firebase (student_progress)
- [x] User indicator no header com avatar e dropdown
- [x] Progress circles dinâmicos (4 mais recentes)

---

### **🔒 2. WHITELIST SIGNUP SYSTEM (PRÓXIMA PRIORIDADE - 2-3 horas)**

**Status:** 🔨 PARCIALMENTE IMPLEMENTADO (Import Students pronto)

**Objetivo:** Sistema fechado - apenas emails pré-registrados podem criar conta

#### **O que já está pronto:**
- [x] Página `import-students.html` (CSV + manual entry)
- [x] Firebase methods: `addPreRegisteredStudent()`, `checkPreRegistered()`, `markAsRegistered()`
- [x] Botão "Import Students" no teacher dashboard

#### **O que falta:**
- [ ] Modificar `auth0-callback.html` - adicionar whitelist check
- [ ] Bloquear signup se email não está na whitelist
- [ ] Mostrar mensagem: "You need an invitation from your teacher"
- [ ] Auto-assign aluno à turma após signup aprovado
- [ ] Testar fluxo: Add student → Signup blocked/allowed

**Arquivos a modificar:**
- `auth0-callback.html` - CRÍTICO (adicionar whitelist check)

**Tempo estimado:** 2-3 horas

---

### **📢 3. ANNOUNCEMENTS SYSTEM (3-4 horas)**

**Status:** 📋 PLANEJADO

**Objetivo:** Professor envia avisos para a turma, alunos veem no dashboard

#### **Teacher Side:**
- [ ] Botão "📢 New Announcement" no teacher dashboard
- [ ] Form para criar announcement:
  - Título
  - Mensagem
  - Pin to top? (checkbox)
  - Send email notification? (checkbox)
- [ ] Lista de announcements com edit/delete

#### **Student Side:**
- [ ] Banner no topo do student dashboard
- [ ] Badge com número de não lidos
- [ ] Lista de announcements com data
- [ ] Mark as read quando abrir

#### **Firebase Structure:**
```javascript
/announcements/{announcementId}
{
  id: "announcement_123",
  classId: "class_ac2526",
  createdBy: "teacher_id",
  title: "Quiz 5 Available This Friday!",
  message: "Don't forget to complete...",
  isPinned: true,
  createdAt: timestamp,
  readBy: ["student1_id", "student2_id"]
}
```

**Arquivos a criar:**
- `assets/js/announcements.js` - Lógica de announcements

**Arquivos a modificar:**
- `teacher-dashboard.html` - Adicionar seção de announcements
- `student-dashboard.html` - Mostrar announcements
- `firebase-service.js` - Métodos CRUD de announcements

**Tempo estimado:** 3-4 horas

---

### **📅 4. CALENDAR + ASSIGNMENT REMINDERS (3-4 horas)**

**Status:** 📋 PLANEJADO

**Objetivo:** Calendário visual com todas as deadlines e upcoming quizzes

#### **Features:**
- [ ] Calendar widget no student dashboard
- [ ] Lista de "Upcoming Deadlines" (próximos 7 dias)
- [ ] Color coding:
  - 🎯 Quizzes (blue)
  - 📝 Assignments (orange)
  - 📊 Exams (red)
  - 📢 Announcements (green)
- [ ] Overdue warnings (vermelho)
- [ ] Click no item → vai para página do quiz/assignment

#### **Calendar View:**
```
╔════════════════════════════════╗
║ OCTOBER 2025                   ║
║                                ║
║ 18  Today                      ║
║ 20  Quiz: Small Animals 🎯     ║
║ 22  Assignment: Essay Due 📝   ║
║ 25  Exam Mode: Midterm 📊      ║
║ 28  Quiz: Parasitology 🎯     ║
╚════════════════════════════════╝

Upcoming (next 7 days):
⚠️ Oct 22: Essay due (OVERDUE)
🎯 Oct 25: Midterm exam (in 3 days)
🎯 Oct 28: Quiz available
```

#### **Firebase Structure:**
```javascript
/events/{eventId}
{
  id: "event_123",
  classId: "class_ac2526",
  type: "quiz" | "assignment" | "exam" | "announcement",
  title: "Quiz: Small Animals",
  date: timestamp,
  dueDate: timestamp,
  relatedId: "quiz_small_animals"
}
```

**Libraries:**
- Consider using: FullCalendar.js or build custom

**Arquivos a criar:**
- `assets/js/calendar.js` - Lógica do calendário

**Arquivos a modificar:**
- `student-dashboard.html` - Adicionar calendar widget
- `firebase-service.js` - Métodos para buscar events

**Tempo estimado:** 3-4 horas

---

### **3. Student Dashboard - Dados Reais (2-3 horas)**

**Arquivo:** `student-dashboard.html`

**Tarefas:**
- [ ] Carregar progresso do Firebase (não localStorage)
- [ ] Mostrar stats reais (total quizzes, average score, streak)
- [ ] Progress circles com dados do Firebase
- [ ] Achievements baseados em progresso real
- [ ] Quiz history do Firebase

**Código necessário:**
```javascript
import { PethologyFirebaseService } from './assets/js/firebase-service.js';

async function loadStudentData() {
  const user = JSON.parse(sessionStorage.getItem('pethologyUser'));
  const progress = await PethologyFirebaseService.getStudentProgress(user.id);
  
  // Atualizar UI com dados reais
  updateProgressCircles(progress.moduleProgress);
  updateStats(progress.overallStats);
  updateAchievements(progress.achievements);
}
```

---

### **2. Quiz System - Salvar Resultados (2 horas)**

**Arquivo:** `assets/js/quiz/quiz.js`

**Tarefas:**
- [ ] Salvar resultado no Firebase após completar quiz
- [ ] Atualizar student_progress automaticamente
- [ ] Calcular e salvar tempo gasto
- [ ] Atualizar completion percentage do módulo

**Código necessário:**
```javascript
async function onQuizCompleted(quizData) {
  const user = JSON.parse(sessionStorage.getItem('pethologyUser'));
  
  const resultData = {
    userId: user.id,
    quizId: currentQuizModule,
    score: quizData.correctAnswers / quizData.totalQuestions,
    totalQuestions: quizData.totalQuestions,
    correctAnswers: quizData.correctAnswers,
    timeSpent: quizData.timeSpent,
    completedAt: new Date(),
    answers: quizData.answers
  };
  
  await PethologyFirebaseService.saveQuizResult(resultData);
  await updateStudentProgress(user.id, quizData);
}
```

---

### **3. Teacher Dashboard - Analytics Reais (3 horas)**

**Arquivo:** `teacher-dashboard.html`

**Tarefas:**
- [ ] Carregar dados reais de estudantes
- [ ] Mostrar lista de estudantes com progresso
- [ ] Stats da turma (média, total de quizzes, etc.)
- [ ] Gráficos com dados reais
- [ ] Filtros por módulo

**Código necessário:**
```javascript
async function loadTeacherAnalytics() {
  const analytics = await PethologyFirebaseService.getClassAnalytics();
  
  updateDashboardStats({
    totalStudents: analytics.uniqueStudents,
    averageScore: analytics.averageScore,
    totalQuizzes: analytics.totalAttempts
  });
  
  loadStudentTable(analytics.studentPerformance);
}
```

---

## ⚡ **PRIORIDADE MÉDIA - Próximas Semanas:**

### **4. Adaptive Quiz AI - Implementação (5-6 horas)**

**Status:** Algoritmo pronto, falta integrar

**Tarefas:**
- [ ] Integrar `adaptive-quiz-ai.js` com Firebase
- [ ] Carregar perfil adaptativo do estudante
- [ ] Selecionar questões baseadas em performance
- [ ] Salvar metadata de adaptação
- [ ] UI diferenciada para Adaptive Quiz

**Arquivo novo:** `assets/js/adaptive-quiz-integration.js`

---

### **5. Smart Review System (4 horas)**

**Tarefas:**
- [ ] Identificar tópicos fracos do estudante
- [ ] Gerar quiz personalizado de revisão
- [ ] Sistema de spaced repetition
- [ ] Notificações de quando revisar

---

### **6. Exam Mode (3 horas)**

**Tarefas:**
- [ ] Timer funcional
- [ ] Modo sem hints/explicações
- [ ] Randomização de questões
- [ ] Ambiente distraction-free
- [ ] Analytics pós-exame

---

### **7. Microsoft Forms Import (6-8 horas)**

**SUPER IMPORTANTE para professores!**

**Tarefas:**
- [ ] Integração com Microsoft Graph API
- [ ] Listar Forms do professor
- [ ] Converter formato Forms → Pethology
- [ ] Preview antes de importar
- [ ] Salvar quiz no Firebase

**Fluxo:**
```
Professor → Microsoft Forms (já usa) 
  ↓
Import para Pethology (1 clique)
  ↓
Sistema gera: Adaptive Quiz + Smart Review + Exam Mode automaticamente
```

---

## ✨ **NICE TO HAVE - Futuro:**

### **8. Gamificação Avançada**
- [ ] Sistema de XP e Levels
- [ ] Achievements visuais bonitos
- [ ] Leaderboards por turma
- [ ] Badges personalizados
- [ ] Streak rewards

### **9. Internship Journal**
- [ ] CRUD de journal entries
- [ ] Upload de fotos
- [ ] Timeline view
- [ ] Compartilhar com professores

### **10. Glossário Interativo**
- [ ] Search functionality
- [ ] Definições + imagens
- [ ] Audio pronunciation
- [ ] Favoritos

### **11. Flashcards System**
- [ ] Auto-geração de flashcards
- [ ] Spaced repetition
- [ ] Modo estudo
- [ ] Import/Export

### **12. PWA & Offline Mode**
- [ ] Service Worker
- [ ] Cache de conteúdo
- [ ] Sync quando online
- [ ] Install prompt

### **13. Mobile App**
- [ ] React Native ou Flutter
- [ ] Notificações push
- [ ] Sync com web

---

## 🔐 **SEGURANÇA - Antes de Lançar Público:**

### **Firestore Rules Seguras:**
- [ ] Implementar Firebase Authentication com Auth0
- [ ] Rules baseadas em user ID real
- [ ] Verificação de role (Student/Teacher)
- [ ] Rate limiting
- [ ] Data validation

### **Código:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
    
    match /student_progress/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    match /quiz_results/{resultId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## 🐛 **BUGS CONHECIDOS:**

- [ ] WebSocket error no Live Server (não afeta produção)
- [ ] CORS error em localhost (funciona em produção)
- [ ] Firestore rules abertas (temporário)
- [ ] Auth.js ainda existe (deletar se não usar MSAL)

---

## 📊 **MÉTRICAS DE SUCESSO:**

**Para saber que está pronto:**

### **MVP (Minimum Viable Product):**
- ✅ Login funcionando
- ✅ Dados salvos no Firebase
- [ ] Student vê progresso real
- [ ] Quiz salva resultados
- [ ] Teacher vê analytics básicos

### **V1.0 (Launch):**
- [ ] Adaptive Quiz funcionando
- [ ] Microsoft Forms import
- [ ] Mobile responsive perfeito
- [ ] Segurança implementada
- [ ] 100+ questões por módulo

### **V2.0 (Futuro):**
- [ ] Smart Review + Exam Mode
- [ ] Gamificação completa
- [ ] PWA/Offline
- [ ] Mobile app

---

## 🎯 **SESSÃO DE DESENVOLVIMENTO SUGERIDA:**

### **Próxima Sessão (2-3 horas):**
1. **Student Dashboard com dados reais** (1.5h)
2. **Quiz salvando resultados** (1h)
3. **Testar fluxo completo** (0.5h)

### **Sessão Seguinte (2-3 horas):**
1. **Teacher Dashboard analytics** (2h)
2. **Interface melhorias** (1h)

### **Sessão Futura (4-6 horas):**
1. **Adaptive Quiz integration** (3h)
2. **Microsoft Forms import** (3h)

---

## 📝 **NOTAS TÉCNICAS:**

### **Arquivos Principais:**
```
pethology/
├── auth0-login.html          # Login page (FUNCIONAL ✅)
├── student-dashboard.html    # Needs: Real data integration
├── teacher-dashboard.html    # Needs: Real analytics
├── assets/
│   └── js/
│       ├── firebase-service.js     # FUNCIONAL ✅
│       ├── quiz/
│       │   ├── quiz.js            # Needs: Save to Firebase
│       │   ├── biology.js         # FUNCIONAL ✅
│       │   ├── animal-welfare.js  # FUNCIONAL ✅
│       │   └── adaptive-quiz-ai.js # Needs: Integration
│       └── auth.js                # DELETE se não usar MSAL
```

### **Firebase Collections Estrutura:**
```
/users/{userId}
  - id, name, email, role, photo, lastLogin

/student_progress/{userId}
  - overallStats: { totalQuizzes, averageScore, streak }
  - moduleProgress: { biology: { completion, averageScore } }
  - achievements: []
  - adaptiveProfile: { confidence, strongTopics, weakTopics }

/quiz_results/{resultId}
  - userId, quizId, score, timeSpent, answers[], completedAt

/quizzes/{quizId}  (Future)
  - title, module, questions[], createdBy

/content/{contentId}  (Future)
  - title, body, module, type
```

### **Auth0 Connections Ativas:**
- ✅ Username-Password-Authentication (Database)
- ✅ google-oauth2 (Social)
- ⚠️ windowslive (Microsoft - needs Azure AD config)

### **Netlify Deploy:**
- URL: https://pethology.netlify.app
- Auto-deploy: GitHub main branch
- Environment: Production

---

## 🚀 **QUICK START para Próxima Sessão:**

### **Copy/Paste este prompt:**

```
Olá! Estou continuando o desenvolvimento do Pethology. 

Status atual:
- ✅ Backend Firebase funcionando
- ✅ Auth0 login funcionando  
- ✅ Usuários sendo salvos no Firebase

Próximo objetivo: Integrar Student Dashboard com dados reais do Firebase.

Preciso:
1. Carregar student_progress do Firebase
2. Atualizar UI com dados reais (progress circles, stats)
3. Mostrar quiz history

Arquivos relevantes:
- student-dashboard.html
- assets/js/firebase-service.js (já tem as funções)

Pode me ajudar a implementar isso?
```

---

## 📚 **RECURSOS ÚTEIS:**

### **Documentação:**
- [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)
- [Auth0 Docs](https://auth0.com/docs)
- [Microsoft Graph API](https://docs.microsoft.com/graph)

### **Design Inspiration:**
- SimplyStudy.ie (competitor)
- Duolingo (gamification)
- Notion (clean UI)

### **Tech Stack:**
- Frontend: Vanilla HTML/CSS/JS (ES6 Modules)
- Backend: Firebase Firestore
- Auth: Auth0
- Hosting: Netlify
- Algorithms: Fisher-Yates Shuffle para randomização
- Future: React/Vue for complex features?

### **Quiz Modules Structure (200 questões):**
```
assets/js/quiz/
├── quiz.js                    # Main quiz logic + randomization
├── biology.js                 # 20 questions ✅
├── animal-welfare.js          # 20 questions ✅
├── grooming.js                # 20 questions ✅
├── anatomy.js                 # 20 questions ✅
├── parasitology.js            # 20 questions ✅
├── nutrition.js               # 20 questions ✅
├── animal-behaviour.js        # 20 questions ✅
├── small-animals.js           # 20 questions ✅
├── vet-assistant-skills.js    # 20 questions ✅
├── communications.js          # 20 questions ✅
└── work-experience.js         # 20 questions ✅

Total: 10 modules × 20 questions = 200 questions
```

---

## ✅ **ANTES DE FINALIZAR SESSÃO:**

**Checklist:**
- [ ] Commit & Push to GitHub
- [ ] Deploy to Netlify
- [ ] Testar em produção
- [ ] Atualizar este TODO list
- [ ] Anotar bugs/ideias

---

## 💪 **MOTIVAÇÃO:**

**Você já tem:**
- Sistema de autenticação profissional ✅
- Backend escalável ✅  
- Base sólida para crescer ✅

**Próximo milestone:** Dashboard funcional com dados reais!

**Lembre-se:** Roma não foi construída em um dia. Cada sessão é um progresso! 🚀

---

**Fim do TODO List**

*Mantenha este documento atualizado a cada sessão!*

## 📋 **NOTAS DA ÚLTIMA SESSÃO (15 OUT 2025):**

**✅ Completado:**
- [x] Logo system implementado (todas as páginas)
- [x] Header consistency estabelecida (padding 30px 60px)
- [x] 5 novos módulos de quiz criados (100 novas questões)
- [x] Quiz randomization implementado (Fisher-Yates)
- [x] Módulos menu collapsible no student dashboard
- [x] Teacher content manager com Home/Logout buttons

**📊 Métricas da Sessão:**
- Arquivos modificados: 15+
- Novas questões criadas: 100
- Total questões no sistema: 200
- Módulos completos: 10/10
- Features implementados: Logo system, Randomização, Collapsible menus

**🎯 Próxima Sessão - FOCO:**
1. **Achievement System** (usar emojis inicialmente)
2. Depois: Adaptive Quiz, Smart Review, Test Mode, Import via Forms

**💡 Ideias Futuras Anotadas:** DONE
- Quiz sem login: adicionar aviso e reduzir questões
- Student dashboard: logout no content
- Login page: Student/Teacher login buttons (simplificar)
- For Students page: ajustar layout
- For Teachers page: ajustar layout

---

## 🎓 **CLASS MANAGEMENT SYSTEM + CUSTOM QUIZZES - IMPLEMENTAR FUTURO (8-10 horas)**

**Status:** Especificação completa, pronto para implementar após Achievement System

### **🔒 CONCEITO - Sistema Fechado com Convites:**
Sistema onde **APENAS alunos convidados podem criar conta**. Professor pré-registra alunos antes deles fazerem signup, com suporte para múltiplos professores por turma.

---

### **👥 FLUXO DO USUÁRIO:**

#### **👨‍🏫 PROFESSOR:**
1. Cria turma (ex: "AC25/26 - Pethology")
2. Adiciona alunos de duas formas:
   - **Manual:** Nome, Sobrenome, Email (@plc.ie)
   - **CSV Import:** Upload de arquivo com múltiplos alunos
3. Sistema marca emails como **whitelist/pré-aprovados**
4. Professor vê status: ✅ Registered / ⏳ Pending
5. Pode adicionar co-teachers (múltiplos professores)
6. **NOVO:** Pode criar/importar quizzes customizados para a turma

#### **🧑‍🎓 ALUNO (com convite):**
1. Recebe notificação: "You've been added to Pethology AC25/26"
2. Acessa site e faz signup com email pré-aprovado
3. ✅ Sistema **permite signup** porque email está na whitelist
4. **Automaticamente** entra na turma ao criar conta
5. Dashboard mostra:
   - 10 módulos públicos
   - Quizzes customizados da turma

#### **🚫 VISITANTE (sem convite):**
1. Tenta fazer signup no site
2. ❌ Sistema **bloqueia**: "You need an invitation to join. Contact your teacher."
3. Pode navegar no site publicamente
4. Pode ver os 10 módulos públicos na página quiz.html
5. Pode fazer quizzes em "modo visitante" (30% das questões)
6. Vê call-to-action: "Want full access? Ask your teacher for an invitation!"

---

### **📊 TIPOS DE QUIZ NO SISTEMA:**

#### **1. Public Quizzes (já existem):**
- 10 módulos padrão (Biology, Animal Welfare, Grooming, etc.)
- ✅ Visível para **todos** (logado ou não)
- ✅ Conteúdo fixo do Pethology
- ✅ Visitantes podem fazer 30% das questões
- ✅ Alunos logados podem fazer 100%

#### **2. Custom Quizzes (novo - APENAS alunos da turma):**
- Criados/importados pelo professor
- 🔒 **Apenas visível para alunos da turma**
- 🔒 **Não aparece para visitantes**
- 🔒 **Não aparece no quiz.html público**
- ✅ Aparecem no Student Dashboard em seção "Class Quizzes"

---

### **🔐 SIGNUP BLOQUEADO - Lógica de Whitelist:**

#### **Auth0 Callback Logic:**
```javascript
// Em auth0-callback.html - após Auth0 retornar
async function onAuth0Signup(authUser) {
  console.log('🔍 Checking if email is whitelisted:', authUser.email);

  // 1. Verificar se email está pré-registrado
  const preReg = await PethologyFirebaseService.checkPreRegistered(authUser.email);

  if (!preReg) {
    // ❌ EMAIL NÃO ESTÁ NA WHITELIST - BLOQUEAR
    console.log('❌ Email not whitelisted. Blocking signup.');

    // Mostrar mensagem de erro
    showErrorMessage(`
      <h2>🚫 Invitation Required</h2>
      <p>You need an invitation from your teacher to create an account.</p>
      <p>Please contact your teacher at your school to request access.</p>
      <p>Email not recognized: ${authUser.email}</p>
    `);

    // Deletar usuário do Auth0 (opcional, ou deixar mas sem acesso ao Firebase)
    await auth0.logout({ returnTo: window.location.origin });
    return;
  }

  // ✅ EMAIL ESTÁ NA WHITELIST - PERMITIR SIGNUP
  console.log('✅ Email whitelisted! Creating account and assigning to class:', preReg.classId);

  // 2. Criar usuário no Firebase
  const userData = {
    id: authUser.sub,
    name: `${preReg.firstName} ${preReg.lastName}`,
    email: authUser.email,
    role: 'Student',
    photo: authUser.picture,
    classes: [preReg.classId],
    primaryClass: preReg.classId
  };

  await PethologyFirebaseService.createOrUpdateUser(userData);

  // 3. Auto-assign à turma
  await PethologyFirebaseService.assignToClass(userData.id, preReg.classId);

  // 4. Atualizar status de pending → registered
  await PethologyFirebaseService.markAsRegistered(authUser.email, userData.id);

  // 5. Mover de pending para registered na classe
  await PethologyFirebaseService.updateClassStudents(preReg.classId, userData.id);

  // 6. Inicializar student progress
  await PethologyFirebaseService.initializeStudentProgress(userData.id);

  // 7. Redirecionar para dashboard
  sessionStorage.setItem('pethologyUser', JSON.stringify(userData));
  window.location.href = 'student-dashboard.html';
}
```

#### **Validação no Login (usuários existentes):**
```javascript
// Login de usuário já existente - sempre permitido
async function onAuth0Login(authUser) {
  // Usuário já existe no Firebase, permitir login normalmente
  const userData = await PethologyFirebaseService.getUser(authUser.sub);

  if (userData) {
    sessionStorage.setItem('pethologyUser', JSON.stringify(userData));

    if (userData.role === 'Teacher') {
      window.location.href = 'teacher-dashboard.html';
    } else {
      window.location.href = 'student-dashboard.html';
    }
  }
}
```

### **Firebase Collections:**

```javascript
// Collection: /classes/{classId}
{
  id: "class_ac2526",
  name: "AC25/26 - Pethology",
  code: "AC2526",
  teachers: ["teacher1_id", "teacher2_id"],  // Múltiplos professores
  createdBy: "teacher_userId",
  createdAt: timestamp,
  active: true,
  students: {
    registered: ["student1_id", "student2_id"],  // Já criaram conta
    pending: [
      {
        email: "john.doe@plc.ie",
        firstName: "John",
        lastName: "Doe",
        addedAt: timestamp,
        invitedBy: "teacher_id"
      }
    ]
  }
}

// Collection: /pre_registered_students/{email}
{
  email: "john.doe@plc.ie",
  firstName: "John",
  lastName: "Doe",
  classId: "class_ac2526",
  addedBy: "teacher_id",
  addedAt: timestamp,
  registered: false  // Muda para true quando criar conta
}

// Update: /users/{userId}
{
  // ... campos existentes ...
  classes: ["class_12345", "class_67890"],  // Array de turmas
  primaryClass: "class_12345"  // Turma principal (opcional)
}

// Collection: /quizzes/{quizId} - NOVO para Custom Quizzes
{
  id: "quiz_week3_nutrition",
  title: "Week 3 - Animal Nutrition Review",
  category: "Nutrition",
  isPublic: false,  // 🔑 FALSE = Custom quiz (só turma)
  visibility: "class_only",
  classId: "class_ac2526",  // Qual turma pode ver
  createdBy: "teacher_userId",
  createdAt: timestamp,
  dueDate: timestamp,  // Opcional - deadline do quiz
  questions: [
    {
      question: "What is the main nutrient in hay?",
      options: ["Fiber", "Protein", "Fat", "Sugar"],
      answer: 0,
      explanation: "Hay is primarily composed of fiber..."
    }
  ],
  metadata: {
    totalQuestions: 15,
    estimatedTime: 10,
    difficulty: "medium",
    importedFrom: "microsoft_forms"  // Se for importado
  }
}
```

---

### **🎨 UI DO STUDENT DASHBOARD - Custom Quizzes:**

```html
<!-- student-dashboard.html -->
<div class="dashboard-content">

  <!-- Módulos Públicos (sempre visível) -->
  <section class="modules-section">
    <h2>📚 Course Modules</h2>
    <div class="public-modules">
      <!-- 10 módulos padrão aqui -->
      <div class="module-card" onclick="startModule('biology')">
        <span class="module-icon">🧬</span>
        <span class="module-name">Biology</span>
      </div>
      <!-- ... outros 9 módulos -->
    </div>
  </section>

  <!-- Quizzes da Turma (só aparece se estiver em turma) -->
  <section class="class-quizzes-section" id="class-quizzes-section" style="display: none;">
    <h2>🎓 AC25/26 Class Quizzes</h2>
    <div class="class-quizzes-grid" id="class-quizzes-grid">
      <!-- Preenchido dinamicamente via JavaScript -->
    </div>
  </section>

</div>
```

```javascript
// JavaScript para carregar quizzes customizados
async function loadAvailableQuizzes() {
  const user = await PethologyFirebaseService.getCurrentUser();

  // 1. Sempre mostra módulos públicos
  displayPublicModules();

  if (user && user.classes && user.classes.length > 0) {
    // 2. Carregar quizzes customizados da turma
    const classQuizzes = await PethologyFirebaseService.getClassQuizzes(user.classes[0]);

    if (classQuizzes.length > 0) {
      // Mostrar seção de class quizzes
      document.getElementById('class-quizzes-section').style.display = 'block';
      displayClassQuizzes(classQuizzes);
    }
  }
}

function displayClassQuizzes(quizzes) {
  const container = document.getElementById('class-quizzes-grid');
  container.innerHTML = '';

  quizzes.forEach(quiz => {
    const dueDate = quiz.dueDate ? new Date(quiz.dueDate.seconds * 1000) : null;
    const isOverdue = dueDate && dueDate < new Date();

    const card = `
      <div class="quiz-card custom ${isOverdue ? 'overdue' : ''}">
        <div class="quiz-header">
          <span class="quiz-icon">📝</span>
          <span class="quiz-name">${quiz.title}</span>
          <span class="badge custom">Custom</span>
        </div>
        <div class="quiz-meta">
          <span>👨‍🏫 Created by teacher</span>
          <span>📊 ${quiz.metadata.totalQuestions} questions</span>
          <span>⏱️ ~${quiz.metadata.estimatedTime} min</span>
          ${dueDate ? `
            <span class="due-date ${isOverdue ? 'overdue' : ''}">
              ${isOverdue ? '⚠️ Overdue' : `📅 Due: ${formatDate(dueDate)}`}
            </span>
          ` : ''}
        </div>
        <button onclick="startClassQuiz('${quiz.id}')" class="btn-primary">
          Start Quiz
        </button>
      </div>
    `;
    container.innerHTML += card;
  });
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
```

```css
/* CSS para custom quiz cards */
.class-quizzes-section {
  margin-top: 40px;
  padding: 30px;
  background: #f9fafb;
  border-radius: 12px;
}

.class-quizzes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.quiz-card.custom {
  background: white;
  border: 2px solid #3b82f6;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.quiz-card.custom:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2);
}

.quiz-card.overdue {
  border-color: #ef4444;
}

.badge.custom {
  background: #3b82f6;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.due-date.overdue {
  color: #ef4444;
  font-weight: 600;
}
```

---

### **👨‍🏫 TEACHER DASHBOARD - Create/Import Custom Quizzes:**

```html
<!-- teacher-classes.html - Nova página -->
<div class="teacher-classes-page">

  <h1>My Classes</h1>

  <!-- Lista de turmas -->
  <div class="classes-grid" id="classes-grid">
    <!-- Preenchido dinamicamente -->
  </div>

  <!-- Detalhes da turma selecionada -->
  <div class="class-details" id="class-details" style="display: none;">

    <div class="class-header">
      <h2>📚 AC25/26 - Pethology</h2>
      <button onclick="editClass()">⚙️ Settings</button>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button class="tab active" onclick="showTab('students')">👥 Students</button>
      <button class="tab" onclick="showTab('quizzes')">📝 Quizzes</button>
      <button class="tab" onclick="showTab('analytics')">📊 Analytics</button>
    </div>

    <!-- Tab: Quizzes -->
    <div id="tab-quizzes" class="tab-content">
      <div class="quizzes-toolbar">
        <button onclick="createQuizManual()" class="btn-primary">
          ✏️ Create Quiz
        </button>
        <button onclick="importFromForms()" class="btn-secondary">
          📄 Import from Microsoft Forms
        </button>
      </div>

      <div class="quizzes-list" id="class-quizzes-list">
        <!-- Lista de quizzes customizados -->
      </div>
    </div>

  </div>

</div>
```

---

### **CSV Import Format:**
```csv
firstName,lastName,email
John,Doe,john.doe@plc.ie
Jane,Smith,jane.smith@plc.ie
Michael,Johnson,michael.johnson@plc.ie
```

### **✨ Features Principais:**
- ✅ **Signup bloqueado**: Apenas emails pré-registrados podem criar conta
- ✅ Professor cria turmas
- ✅ Add aluno manual (nome, sobrenome, email)
- ✅ Import CSV com múltiplos alunos
- ✅ Validação de email (domain @plc.ie)
- ✅ Auto-assignment ao fazer signup
- ✅ Suporte múltiplos professores por turma
- ✅ Aluno pode estar em múltiplas turmas
- ✅ Status tracking (registered/pending)
- ✅ Teacher analytics filtrados por turma
- ✅ **Custom Quizzes**: Professor cria/importa quizzes para a turma
- ✅ **Quiz visibility**: Custom quizzes só aparecem para alunos da turma
- ✅ **Public quizzes**: 10 módulos sempre visíveis para todos

---

### **🔐 FIREBASE SECURITY RULES:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper function para verificar se é teacher
    function isTeacher() {
      return request.auth != null &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'Teacher';
    }

    // Helper function para verificar se é aluno da turma
    function isStudentInClass(classId) {
      return request.auth != null &&
             request.auth.uid in get(/databases/$(database)/documents/classes/$(classId)).data.students.registered;
    }

    // Users collection
    match /users/{userId} {
      allow read: if request.auth.uid == userId || isTeacher();
      allow write: if request.auth.uid == userId;
    }

    // Pre-registered students (whitelist)
    match /pre_registered_students/{email} {
      allow read: if request.auth != null;
      allow create, update, delete: if isTeacher();
    }

    // Classes
    match /classes/{classId} {
      allow read: if request.auth != null &&
                  (isTeacher() || isStudentInClass(classId));
      allow create, update, delete: if isTeacher();
    }

    // Quizzes - PUBLIC vs CUSTOM
    match /quizzes/{quizId} {
      // Quizzes públicos - todos podem ler
      allow read: if resource.data.isPublic == true;

      // Quizzes customizados - só alunos da turma
      allow read: if resource.data.isPublic == false &&
                  request.auth != null &&
                  isStudentInClass(resource.data.classId);

      // Criar/editar - só professores
      allow create, update, delete: if isTeacher();
    }

    // Student Progress
    match /student_progress/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read: if isTeacher();
    }

    // Quiz Results
    match /quiz_results/{resultId} {
      allow read: if request.auth != null &&
                  (request.auth.uid == resource.data.userId || isTeacher());
      allow create: if request.auth != null &&
                    request.auth.uid == request.resource.data.userId;
    }
  }
}
```

---

### **📋 TAREFAS DE IMPLEMENTAÇÃO:**

#### **Phase 1: Class Management System (5-6 horas)**
- [ ] Criar `teacher-classes.html` - Página de gerenciamento de turmas
- [ ] Criar `assets/js/class-management.js` - Lógica de turmas
- [ ] Criar `assets/js/csv-import.js` - Parser e validação de CSV
- [ ] Adicionar métodos no `firebase-service.js`:
  - [ ] `createClass(classData)`
  - [ ] `addStudentToClass(classId, studentData)`
  - [ ] `importStudentsFromCSV(classId, csvData)`
  - [ ] `checkPreRegistered(email)`
  - [ ] `markAsRegistered(email, userId)`
- [ ] Modificar `auth0-callback.html` - Adicionar whitelist check no signup
- [ ] Atualizar Firebase Security Rules
- [ ] Testar fluxo completo: Create class → Add students → Signup blocked/allowed

#### **Phase 2: Custom Quizzes (4-5 horas)**
- [ ] Adicionar UI no `teacher-classes.html` para criar quiz manual
- [ ] Criar `assets/js/quiz-creator.js` - Form para criar questões
- [ ] Adicionar métodos no `firebase-service.js`:
  - [ ] `createCustomQuiz(quizData)`
  - [ ] `getClassQuizzes(classId)`
  - [ ] `updateCustomQuiz(quizId, quizData)`
  - [ ] `deleteCustomQuiz(quizId)`
- [ ] Modificar `student-dashboard.html`:
  - [ ] Adicionar seção "Class Quizzes"
  - [ ] Carregar quizzes customizados da turma
  - [ ] CSS para custom quiz cards
- [ ] Modificar `quiz.js` para suportar custom quizzes
- [ ] Testar: Create custom quiz → Student vê → Student completa → Results salvos

#### **Phase 3: Microsoft Forms Import (6-8 horas)**
- [ ] Setup Microsoft Graph API integration
- [ ] Criar `assets/js/forms-import.js`
- [ ] Autenticação Microsoft (OAuth)
- [ ] Listar Forms do professor
- [ ] Converter formato Forms → Pethology quiz format
- [ ] Preview das questões antes de importar
- [ ] Salvar quiz importado no Firebase
- [ ] Testar: Import form → Review → Save → Student vê

---

### **Arquivos a Criar:**
- [ ] `teacher-classes.html` - Página de gerenciamento de turmas
- [ ] `assets/js/class-management.js` - Lógica de turmas e CSV
- [ ] `assets/js/csv-import.js` - Parser e validação de CSV
- [ ] `assets/js/quiz-creator.js` - UI para criar quizzes manualmente
- [ ] `assets/js/forms-import.js` - Importar de Microsoft Forms

### **Arquivos a Modificar:**
- [ ] `firebase-service.js` - Adicionar métodos de classe e custom quizzes
- [ ] `auth0-callback.html` - **CRÍTICO**: Adicionar whitelist check no signup
- [ ] `teacher-dashboard.html` - Link para "My Classes"
- [ ] `student-dashboard.html` - Seção "Class Quizzes" + carregar custom quizzes
- [ ] `quiz.js` - Suportar custom quizzes além dos públicos

### **Validações Importantes:**
1. **CRÍTICO**: Signup bloqueado - verificar email na whitelist antes de criar conta
2. Email único por turma (não duplicar)
3. Email domain validation (@plc.ie)
4. CSV format validation
5. Limite de alunos por turma (ex: max 100)
6. Permissions: Só teachers podem adicionar alunos

---

### **🎯 RESUMO VISUAL DO FLUXO:**

```
┌─────────────────────────────────────────────────────────────┐
│                    PROFESSOR                                 │
│  1. Cria turma "AC25/26"                                    │
│  2. Adiciona emails dos alunos (CSV ou manual)              │
│  3. Emails salvos na WHITELIST do Firebase                  │
│  4. Cria/importa quizzes customizados para a turma          │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌───────────────┐         ┌──────────────────┐
│ ALUNO CONVIDADO│         │ VISITANTE (sem   │
│ (email na     │         │  convite)        │
│  whitelist)   │         │                  │
├───────────────┤         ├──────────────────┤
│ ✅ Signup OK  │         │ ❌ Signup BLOCKED│
│ ✅ Auto entra │         │ ✅ Pode navegar  │
│    na turma   │         │ ✅ Faz quiz 30%  │
│ ✅ Vê módulos │         │ ❌ Sem custom    │
│    públicos   │         │    quizzes       │
│ ✅ Vê quizzes │         │                  │
│    customizados│        │                  │
└───────────────┘         └──────────────────┘
```

**Resultado:**
- 🔒 Sistema 100% controlado pelo professor
- 🎯 Apenas alunos reais têm acesso
- 📚 Public modules para marketing/demo
- 🔐 Custom quizzes exclusivos para turma

---

### **Interface Teacher Classes Page:**
```
My Classes                                    [+ New Class]

╔═══════════════════════════════════════════════════════╗
║ 📚 AC25/26 - Pethology                                ║
║ Code: AC2526  |  Created: Oct 15, 2025                ║
║                                                        ║
║ Students: 23 registered / 5 pending                   ║
║ Teachers: Mrs. Smith, Mr. Johnson                     ║
║                                                        ║
║ [+ Add Student]  [📄 Import CSV]  [View Details]      ║
╚═══════════════════════════════════════════════════════╝

Student List:
✅ John Doe          john.doe@plc.ie           92% avg
✅ Jane Smith        jane.smith@plc.ie         87% avg
⏳ Michael Johnson   michael.j@plc.ie          (Pending signup)
⏳ Sarah Wilson      sarah.w@plc.ie            (Pending signup)
```

### **Auto-Assignment Logic:**
```javascript
// No auth0-callback.html após signup
async function onAuth0Signup(user) {
  // Check se email está pré-registrado
  const preReg = await PethologyFirebaseService.checkPreRegistered(user.email);

  if (preReg) {
    // Auto-assign à turma
    await PethologyFirebaseService.assignToClass(user.id, preReg.classId);
    // Atualizar status
    await PethologyFirebaseService.markAsRegistered(user.email);
    // Mover de pending para registered
    await PethologyFirebaseService.updateClassStudents(preReg.classId, user.id);
  }
}
```

---

- Font dos anouncements pode ser preta
- Nao esquecer de adicionar o content e as tool no menu a esquerda
- Adicionar (mesmo que zerado) os demais modulos, só pra ver como fica
- Nos achievements temos all, unlocked, locked. adicionar tambem os filtros rare, common e etc assim como no dashboard que ja temos
- Colocar pra ver como fica no demo o Smart Review, Adaptative quiz, Exam mode cards
- Criar uma pasta e colocar os arquivos .md / documentaçao juntos
- Nao comitar so demos hehehehehe

- TODO para um futuro distante:
 - Criar testes com cypress
 - Colocar ou nao o repositorio no privado? Porque as chaves tipo do firebase estao todas no meu repositório publico do github mas nao sei o quanto isso implica no netlify depois
 - Criar um roadmap bonito pra deixar no site
 - Modelos 3D para estudar anatomia animal