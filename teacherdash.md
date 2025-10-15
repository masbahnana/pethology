## 🎯 **FUNCIONALIDADES:**

1. ✅ Ver todos os estudantes e seus progressos
2. ✅ Analytics da turma (médias, totais, gráficos)
3. ✅ Publicar conteúdo para Extra Readings
4. ✅ Ver resultados de quizzes por estudante
5. ✅ Filtrar por módulo

---
OBS: Eu nao tenho login de teacher para testar

## 📋 **PARTE 1: Atualizar Firebase Service (30 min)**

### **Arquivo: `assets/js/firebase-service.js`**

Adicione estas novas funções para professores:

```javascript
// === TEACHER FUNCTIONS ===

// Buscar TODOS os estudantes
static async getAllStudents() {
  try {
    console.log('👥 Fetching all students...');
    
    const q = query(
      collection(db, 'users'),
      where('role', '==', 'Student')
    );
    
    const querySnapshot = await getDocs(q);
    const students = querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    
    console.log(`✅ Found ${students.length} students`);
    return students;
    
  } catch (error) {
    console.error('❌ Error fetching students:', error);
    return [];
  }
}

// Buscar progresso de todos os estudantes
static async getAllStudentsProgress() {
  try {
    console.log('📊 Fetching all students progress...');
    
    const querySnapshot = await getDocs(collection(db, 'student_progress'));
    const progressData = {};
    
    querySnapshot.docs.forEach(doc => {
      progressData[doc.id] = doc.data();
    });
    
    console.log(`✅ Loaded progress for ${Object.keys(progressData).length} students`);
    return progressData;
    
  } catch (error) {
    console.error('❌ Error fetching students progress:', error);
    return {};
  }
}

// Buscar todos os resultados de quizzes
static async getAllQuizResults(limitCount = 100) {
  try {
    console.log('🎯 Fetching all quiz results...');
    
    const q = query(
      collection(db, 'quiz_results'),
      orderBy('completedAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    
    console.log(`✅ Loaded ${results.length} quiz results`);
    return results;
    
  } catch (error) {
    console.error('❌ Error fetching quiz results:', error);
    return [];
  }
}

// Analytics consolidados para professores
static async getTeacherAnalytics() {
  try {
    console.log('📈 Calculating teacher analytics...');
    
    const [students, progressData, quizResults] = await Promise.all([
      this.getAllStudents(),
      this.getAllStudentsProgress(),
      this.getAllQuizResults()
    ]);
    
    // Calcular estatísticas
    const totalStudents = students.length;
    const totalQuizzes = quizResults.length;
    
    // Calcular média geral
    const averageScore = quizResults.length > 0
      ? quizResults.reduce((sum, r) => sum + (r.score || 0), 0) / quizResults.length
      : 0;
    
    // Calcular tempo médio
    const averageTime = quizResults.length > 0
      ? quizResults.reduce((sum, r) => sum + (r.timeSpent || 0), 0) / quizResults.length
      : 0;
    
    // Agrupar por módulo
    const moduleStats = {};
    quizResults.forEach(result => {
      const module = result.quizId || 'unknown';
      if (!moduleStats[module]) {
        moduleStats[module] = {
          totalAttempts: 0,
          averageScore: 0,
          scores: []
        };
      }
      moduleStats[module].totalAttempts++;
      moduleStats[module].scores.push(result.score);
    });
    
    // Calcular médias por módulo
    Object.keys(moduleStats).forEach(module => {
      const scores = moduleStats[module].scores;
      moduleStats[module].averageScore = 
        scores.reduce((sum, s) => sum + s, 0) / scores.length;
    });
    
    // Combinar dados de estudantes com progresso
    const studentsWithProgress = students.map(student => {
      const progress = progressData[student.id] || this.createDefaultProgress(student.id);
      return {
        ...student,
        progress: progress,
        overallCompletion: this.calculateOverallCompletion(progress.moduleProgress),
        lastActivity: progress.overallStats?.lastActivity || null
      };
    });
    
    const analytics = {
      totalStudents,
      totalQuizzes,
      averageScore: Math.round(averageScore * 100),
      averageTime: Math.round(averageTime),
      moduleStats,
      students: studentsWithProgress,
      recentActivity: quizResults.slice(0, 10),
      lastUpdated: new Date()
    };
    
    console.log('✅ Analytics calculated:', analytics);
    return analytics;
    
  } catch (error) {
    console.error('❌ Error calculating analytics:', error);
    return this.getDefaultTeacherAnalytics();
  }
}

// Calcular completion geral
static calculateOverallCompletion(moduleProgress) {
  const modules = Object.values(moduleProgress || {});
  if (modules.length === 0) return 0;
  
  const totalCompletion = modules.reduce((sum, m) => sum + (m.completion || 0), 0);
  return Math.round(totalCompletion / modules.length);
}

// Analytics padrão (vazio)
static getDefaultTeacherAnalytics() {
  return {
    totalStudents: 0,
    totalQuizzes: 0,
    averageScore: 0,
    averageTime: 0,
    moduleStats: {},
    students: [],
    recentActivity: [],
    lastUpdated: new Date()
  };
}

// === CONTENT MANAGEMENT (para professores) ===

// Publicar novo conteúdo
static async publishContent(contentData) {
  try {
    console.log('📝 Publishing new content...');
    
    const contentRef = collection(db, 'content');
    const docRef = await addDoc(contentRef, {
      ...contentData,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublished: true
    });
    
    console.log('✅ Content published with ID:', docRef.id);
    return docRef.id;
    
  } catch (error) {
    console.error('❌ Error publishing content:', error);
    throw error;
  }
}

// Buscar todo o conteúdo publicado
static async getAllContent(moduleFilter = null) {
  try {
    console.log('📚 Fetching content...');
    
    let q = query(
      collection(db, 'content'),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    if (moduleFilter) {
      q = query(q, where('module', '==', moduleFilter));
    }
    
    const querySnapshot = await getDocs(q);
    const content = querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    
    console.log(`✅ Loaded ${content.length} content items`);
    return content;
    
  } catch (error) {
    console.error('❌ Error fetching content:', error);
    return [];
  }
}

// Atualizar conteúdo existente
static async updateContent(contentId, updates) {
  try {
    console.log('✏️ Updating content:', contentId);
    
    const contentRef = doc(db, 'content', contentId);
    await updateDoc(contentRef, {
      ...updates,
      updatedAt: new Date()
    });
    
    console.log('✅ Content updated');
    
  } catch (error) {
    console.error('❌ Error updating content:', error);
    throw error;
  }
}

// Deletar conteúdo
static async deleteContent(contentId) {
  try {
    console.log('🗑️ Deleting content:', contentId);
    
    const contentRef = doc(db, 'content', contentId);
    await deleteDoc(contentRef);
    
    console.log('✅ Content deleted');
    
  } catch (error) {
    console.error('❌ Error deleting content:', error);
    throw error;
  }
}
```

**Não esqueça de adicionar os imports no topo:**

```javascript
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  deleteDoc,  // ← ADICIONAR
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  limit
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
```

---

## 📋 **PARTE 2: Teacher Dashboard HTML (1 hora)**

### **Arquivo: `teacher-dashboard.html`**

Adicione este script no final (antes de `</body>`):

```html
<script type="module">
  import { PethologyFirebaseService } from './assets/js/firebase-service.js';

  // Verificar se é professor
  async function checkTeacherAuth() {
    const userSession = sessionStorage.getItem('pethologyUser');
    
    if (!userSession) {
      window.location.href = 'auth0-login.html';
      return null;
    }

    const user = JSON.parse(userSession);
    
    if (user.role !== 'Teacher') {
      alert('Access denied. This page is for teachers only.');
      window.location.href = 'student-dashboard.html';
      return null;
    }

    return user;
  }

  // Carregar analytics do professor
  async function loadTeacherDashboard() {
    try {
      console.log('📊 Loading teacher dashboard...');
      
      const teacher = await checkTeacherAuth();
      if (!teacher) return;

      // Atualizar nome do professor
      updateTeacherProfile(teacher);

      // Mostrar loading
      showLoading(true);

      // Carregar analytics
      const analytics = await PethologyFirebaseService.getTeacherAnalytics();
      
      // Atualizar dashboard
      updateDashboardStats(analytics);
      updateStudentsTable(analytics.students);
      updateRecentActivity(analytics.recentActivity);
      updateModuleStats(analytics.moduleStats);

      // Esconder loading
      showLoading(false);

      console.log('✅ Teacher dashboard loaded!');

    } catch (error) {
      console.error('❌ Error loading teacher dashboard:', error);
      showError('Error loading dashboard. Please refresh the page.');
      showLoading(false);
    }
  }

  // Atualizar perfil do professor
  function updateTeacherProfile(teacher) {
    const firstName = teacher.name.split(' ')[0];
    
    const nameElements = document.querySelectorAll('.teacher-name, #teacherName');
    nameElements.forEach(el => {
      if (el) el.textContent = firstName;
    });

    const avatarElements = document.querySelectorAll('.teacher-avatar, #teacherAvatar');
    avatarElements.forEach(el => {
      if (el && teacher.photo) el.src = teacher.photo;
    });
  }

  // Atualizar estatísticas principais
  function updateDashboardStats(analytics) {
    console.log('📊 Updating dashboard stats...');

    // Total de estudantes
    const totalStudentsEl = document.querySelector('[data-stat="totalStudents"]');
    if (totalStudentsEl) {
      totalStudentsEl.textContent = analytics.totalStudents;
    }

    // Média da turma
    const avgScoreEl = document.querySelector('[data-stat="averageScore"]');
    if (avgScoreEl) {
      avgScoreEl.textContent = `${analytics.averageScore}%`;
    }

    // Total de quizzes completados
    const totalQuizzesEl = document.querySelector('[data-stat="totalQuizzes"]');
    if (totalQuizzesEl) {
      totalQuizzesEl.textContent = analytics.totalQuizzes;
    }

    // Tempo médio
    const avgTimeEl = document.querySelector('[data-stat="averageTime"]');
    if (avgTimeEl) {
      const minutes = Math.round(analytics.averageTime / 60);
      avgTimeEl.textContent = `${minutes} min`;
    }

    console.log('✅ Stats updated');
  }

  // Atualizar tabela de estudantes
  function updateStudentsTable(students) {
    console.log('👥 Updating students table...');

    const tableBody = document.querySelector('#studentsTableBody, [data-students-table]');
    
    if (!tableBody) {
      console.warn('⚠️ Students table not found');
      return;
    }

    if (students.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 40px; color: #999;">
            No students found. Students will appear here when they start using the platform.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = students.map(student => {
      const lastActivity = student.lastActivity 
        ? new Date(student.lastActivity.seconds * 1000).toLocaleDateString()
        : 'Never';
      
      const avgScore = Math.round((student.progress?.overallStats?.averageScore || 0) * 100);
      const totalQuizzes = student.progress?.overallStats?.totalQuizzes || 0;

      return `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="${student.photo || getDefaultAvatar()}" 
                   alt="${student.name}" 
                   style="width: 32px; height: 32px; border-radius: 50%;">
              <div>
                <strong>${student.name}</strong>
                <br>
                <small style="color: #666;">${student.email}</small>
              </div>
            </div>
          </td>
          <td>${lastActivity}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="flex: 1; background: #f0f0f0; border-radius: 8px; height: 8px;">
                <div style="width: ${student.overallCompletion}%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); height: 100%; border-radius: 8px;"></div>
              </div>
              <span>${student.overallCompletion}%</span>
            </div>
          </td>
          <td>
            <span style="font-weight: 600; color: ${avgScore >= 70 ? '#2ecc71' : avgScore >= 50 ? '#f39c12' : '#e74c3c'};">
              ${avgScore}%
            </span>
            <br>
            <small style="color: #999;">${totalQuizzes} quizzes</small>
          </td>
          <td>
            <button onclick="viewStudentDetails('${student.id}')" 
                    style="padding: 6px 12px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer;">
              View Details
            </button>
          </td>
        </tr>
      `;
    }).join('');

    console.log(`✅ Table updated with ${students.length} students`);
  }

  // Atualizar atividade recente
  function updateRecentActivity(activity) {
    console.log('📈 Updating recent activity...');

    const activityContainer = document.querySelector('[data-recent-activity]');
    
    if (!activityContainer) return;

    if (activity.length === 0) {
      activityContainer.innerHTML = '<p style="color: #999;">No recent activity</p>';
      return;
    }

    activityContainer.innerHTML = activity.map(item => {
      const date = new Date(item.completedAt.seconds * 1000);
      const score = Math.round(item.score * 100);
      
      return `
        <div style="padding: 12px; background: #f8f9fa; border-radius: 8px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong>${item.quizId || 'Quiz'}</strong>
              <br>
              <small style="color: #666;">Score: ${score}%</small>
            </div>
            <small style="color: #999;">${date.toLocaleDateString()}</small>
          </div>
        </div>
      `;
    }).join('');

    console.log('✅ Recent activity updated');
  }

  // Atualizar stats por módulo
  function updateModuleStats(moduleStats) {
    console.log('📚 Updating module stats...');

    const moduleContainer = document.querySelector('[data-module-stats]');
    
    if (!moduleContainer) return;

    const moduleNames = {
      'biology': 'Biology',
      'animal-welfare': 'Animal Welfare',
      'grooming': 'Grooming',
      'animal-anatomy': 'Animal Anatomy'
    };

    moduleContainer.innerHTML = Object.entries(moduleStats).map(([moduleId, stats]) => {
      const avgScore = Math.round(stats.averageScore * 100);
      
      return `
        <div style="padding: 16px; background: white; border: 1px solid #e5e5e5; border-radius: 12px;">
          <h4 style="margin: 0 0 8px 0;">${moduleNames[moduleId] || moduleId}</h4>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Attempts:</span>
            <strong>${stats.totalAttempts}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Avg Score:</span>
            <strong style="color: ${avgScore >= 70 ? '#2ecc71' : '#f39c12'};">${avgScore}%</strong>
          </div>
        </div>
      `;
    }).join('');

    console.log('✅ Module stats updated');
  }

  // Ver detalhes do estudante
  window.viewStudentDetails = function(studentId) {
    // TODO: Implementar modal com detalhes do estudante
    console.log('View details for student:', studentId);
    alert(`Student details coming soon!\nStudent ID: ${studentId}`);
  };

  // Avatar padrão
  function getDefaultAvatar() {
    return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%23999"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
  }

  // Loading
  function showLoading(show) {
    const loader = document.querySelector('[data-loading]');
    if (loader) {
      loader.style.display = show ? 'flex' : 'none';
    }
  }

  // Error
  function showError(message) {
    alert(message);
  }

  // Carregar dashboard quando página carregar
  window.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Teacher dashboard initializing...');
    loadTeacherDashboard();
  });

  // Refresh button
  window.refreshDashboard = function() {
    loadTeacherDashboard();
  };
</script>
```

---

## 📋 **PARTE 3: Publicação de Conteúdo (1.5 horas)**

### **Criar novo arquivo: `teacher-content-manager.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Content Manager - Pethology</title>
  <link rel="stylesheet" href="assets/css/style.css">
  <style>
    .content-form {
      max-width: 800px;
      margin: 40px auto;
      padding: 30px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
    }

    .form-group textarea {
      min-height: 300px;
      font-family: 'Monaco', 'Courier New', monospace;
    }

    .submit-btn {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .submit-btn:hover {
      transform: translateY(-2px);
    }

    .success-message {
      padding: 15px;
      background: #d4edda;
      border: 1px solid #c3e6cb;
      color: #155724;
      border-radius: 8px;
      margin-bottom: 20px;
      display: none;
    }
  </style>
</head>
<body>
  <header>
    <div class="logo">Pethology</div>
    <nav>
      <ul>
        <li><a href="teacher-dashboard.html">Dashboard</a></li>
        <li><a href="teacher-content-manager.html">Manage Content</a></li>
        <li><a href="#" onclick="logout()">Logout</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <div class="content-form">
      <h1>📝 Publish Extra Reading Content</h1>
      
      <div id="successMessage" class="success-message">
        ✅ Content published successfully!
      </div>

      <form id="contentForm" onsubmit="publishContent(event)">
        <div class="form-group">
          <label for="title">Title *</label>
          <input type="text" id="title" required placeholder="e.g., Understanding Dog Behavior">
        </div>

        <div class="form-group">
          <label for="module">Module *</label>
          <select id="module" required>
            <option value="">Select module...</option>
            <option value="biology">Biology</option>
            <option value="animal-welfare">Animal Welfare</option>
            <option value="grooming">Grooming</option>
            <option value="animal-anatomy">Animal Anatomy</option>
            <option value="general">General</option>
          </select>
        </div>

        <div class="form-group">
          <label for="contentType">Type *</label>
          <select id="contentType" required>
            <option value="markdown">Markdown</option>
            <option value="text">Plain Text</option>
            <option value="link">External Link</option>
          </select>
        </div>

        <div class="form-group" id="contentGroup">
          <label for="content">Content * (Markdown supported)</label>
          <textarea id="content" required placeholder="Write your content here...

Example:
# Understanding Dog Behavior

Dogs communicate through:
- Body language
- Vocalizations  
- Facial expressions

## Key Points
..."></textarea>
        </div>

        <div class="form-group" id="linkGroup" style="display: none;">
          <label for="link">External Link URL</label>
          <input type="url" id="link" placeholder="https://...">
        </div>

        <div class="form-group">
          <label for="tags">Tags (comma-separated)</label>
          <input type="text" id="tags" placeholder="behavior, training, basics">
        </div>

        <button type="submit" class="submit-btn">
          📤 Publish Content
        </button>
      </form>
    </div>
  </main>

  <script type="module">
    import { PethologyFirebaseService } from './assets/js/firebase-service.js';

    // Toggle entre content e link
    document.getElementById('contentType').addEventListener('change', (e) => {
      const contentGroup = document.getElementById('contentGroup');
      const linkGroup = document.getElementById('linkGroup');
      
      if (e.target.value === 'link') {
        contentGroup.style.display = 'none';
        linkGroup.style.display = 'block';
        document.getElementById('content').required = false;
        document.getElementById('link').required = true;
      } else {
        contentGroup.style.display = 'block';
        linkGroup.style.display = 'none';
        document.getElementById('content').required = true;
        document.getElementById('link').required = false;
      }
    });

    // Publicar conteúdo
    window.publishContent = async function(event) {
      event.preventDefault();

      try {
        const teacher = JSON.parse(sessionStorage.getItem('pethologyUser'));
        
        if (!teacher || teacher.role !== 'Teacher') {
          alert('Only teachers can publish content');
          return;
        }

        const contentType = document.getElementById('contentType').value;
        
        const contentData = {
          title: document.getElementById('title').value,
          module: document.getElementById('module').value,
          type: contentType,
          content: contentType === 'link' 
            ? document.getElementById('link').value 
            : document.getElementById('content').value,
          tags: document.getElementById('tags').value.split(',').map(t => t.trim()).filter(t => t),
          author: {
            id: teacher.id,
            name: teacher.name,
            email: teacher.email
          }
        };

        console.log('Publishing content:', contentData);

        const contentId = await PethologyFirebaseService.publishContent(contentData);
        
        console.log('✅ Content published with ID:', contentId);

        // Mostrar sucesso
        document.getElementById('successMessage').style.display = 'block';
        
        // Limpar formulário
        document.getElementById('contentForm').reset();

        // Esconder mensagem após 5 segundos
        setTimeout(() => {
          document.getElementById('successMessage').style.display = 'none';
        }, 5000);

      } catch (error) {
        console.error('❌ Error publishing content:', error);
        alert('Error publishing content. Please try again.');
      }
    };

    // Logout
    window.logout = function() {
      sessionStorage.clear();
      window.location.href = 'auth0-login.html';
    };
  </script>
</body>
</html>
```

---

## 📋 **PARTE 4: Atualizar Content.html para mostrar Extra Readings (30 min)**

### **Arquivo: `content.html`**

Adicione no final, antes de `</body>`:

```html
<script type="module">
  import { PethologyFirebaseService } from './assets/js/firebase-service.js';

  // Carregar conteúdo extra
  async function loadExtraReadings() {
    try {
      console.log('📚 Loading extra readings...');

      const content = await PethologyFirebaseService.getAllContent();
      
      displayContent(content);

    } catch (error) {
      console.error('❌ Error loading content:', error);
    }
  }

  // Exibir conteúdo
  function displayContent(contentList) {
    const container = document.querySelector('[data-extra-content]');
    
    if (!container) {
      console.warn('⚠️ Extra content container not found');
      return;
    }

    if (contentList.length === 0) {
      container.innerHTML = '<p style="color: #999;">No extra content available yet.</p>';
      return;
    }

    // Agrupar por módulo
    const byModule = {};
    contentList.forEach(item => {
      const module = item.module || 'general';
      if (!byModule[module]) byModule[module] = [];
      byModule[module].push(item);
    });