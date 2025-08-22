// assets/js/auth.js
// Sistema de Autenticação Centralizado - Pethology

class PethologyAuth {
  static msalInstance = null;
  static isInitialized = false;

  // Configuração do MSAL
  static msalConfig = {
    auth: {
      clientId: "YOUR_CLIENT_ID", // Substituir pelo Client ID do Azure
      authority: "https://login.microsoftonline.com/common",
      redirectUri: window.location.origin + "/login.html"
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: false
    }
  };

  static loginRequest = {
    scopes: ["User.Read", "profile", "openid", "email"]
  };

  // Inicializar MSAL
  static async initialize() {
    if (this.isInitialized) return;
    
    this.msalInstance = new msal.PublicClientApplication(this.msalConfig);
    await this.msalInstance.initialize();
    this.isInitialized = true;
    
    console.log("MSAL initialized successfully");
  }

  // Verificar se usuário está logado
  static async checkAuthStatus() {
    await this.initialize();
    
    const accounts = this.msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      return accounts[0];
    }
    
    // Verificar sessionStorage também
    const userSession = sessionStorage.getItem('pethologyUser');
    return userSession ? JSON.parse(userSession) : null;
  }

  // Login do usuário
  static async signIn() {
    await this.initialize();
    
    try {
      const loginResponse = await this.msalInstance.loginPopup(this.loginRequest);
      console.log("Login successful:", loginResponse);
      
      const userProfile = await this.getUserProfile(loginResponse.account);
      return userProfile;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  // Logout do usuário
  static async signOut() {
    await this.initialize();
    
    try {
      await this.msalInstance.logoutPopup();
      sessionStorage.removeItem('pethologyUser');
      localStorage.removeItem('learningStreak');
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
      // Forçar logout local mesmo se falhar
      sessionStorage.removeItem('pethologyUser');
      window.location.href = '/login.html';
    }
  }

  // Obter perfil do usuário
  static async getUserProfile(account) {
    try {
      const tokenRequest = {
        scopes: this.loginRequest.scopes,
        account: account
      };
      
      const tokenResponse = await this.msalInstance.acquireTokenSilent(tokenRequest);
      
      // Buscar dados do Microsoft Graph
      const userProfile = await this.fetchFromGraph('https://graph.microsoft.com/v1.0/me', tokenResponse.accessToken);
      
      // Determinar role do usuário
      const userRole = this.determineUserRole(userProfile);
      
      // Buscar foto do usuário
      const userPhoto = await this.getUserPhoto(tokenResponse.accessToken);
      
      // Criar sessão do usuário
      const userSession = {
        id: userProfile.id,
        name: userProfile.displayName,
        email: userProfile.mail || userProfile.userPrincipalName,
        role: userRole,
        photo: userPhoto,
        loginTime: new Date().toISOString(),
        department: userProfile.department || null,
        jobTitle: userProfile.jobTitle || null
      };
      
      // Salvar na sessão
      sessionStorage.setItem('pethologyUser', JSON.stringify(userSession));
      
      return userSession;
    } catch (error) {
      console.error("Error getting user profile:", error);
      throw error;
    }
  }

  // Buscar dados do Microsoft Graph
  static async fetchFromGraph(url, accessToken) {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Graph API request failed: ${response.status}`);
    }
    
    return await response.json();
  }

  // Obter foto do usuário
  static async getUserPhoto(accessToken) {
    try {
      const response = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if (response.ok) {
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      }
    } catch (error) {
      console.log("No user photo available");
    }
    
    // Avatar padrão SVG
    return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="%23ccc"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
  }

  // Determinar role do usuário
  static determineUserRole(userProfile) {
    const email = userProfile.mail || userProfile.userPrincipalName;
    const jobTitle = (userProfile.jobTitle || '').toLowerCase();
    const department = (userProfile.department || '').toLowerCase();
    
    // Verificar indicadores de professor/staff
    const teacherIndicators = [
      'teacher', 'instructor', 'lecturer', 'professor', 'staff', 
      'faculty', 'educator', 'trainer', 'tutor'
    ];
    
    const isTeacher = 
      teacherIndicators.some(indicator => jobTitle.includes(indicator)) ||
      teacherIndicators.some(indicator => department.includes(indicator)) ||
      email.includes('staff.') || 
      email.includes('teacher.') ||
      email.includes('faculty.');
    
    return isTeacher ? 'Teacher' : 'Student';
  }

  // Verificar se usuário tem role específica
  static async requireRole(requiredRole) {
    const user = await this.checkAuthStatus();
    
    if (!user) {
      window.location.href = '/login.html';
      return false;
    }
    
    if (user.role !== requiredRole) {
      alert(`Access denied. This page requires ${requiredRole} privileges.`);
      window.location.href = user.role === 'Teacher' ? '/teacher-dashboard.html' : '/student-dashboard.html';
      return false;
    }
    
    return true;
  }

  // Verificar se usuário está autenticado
  static async requireAuth() {
    const user = await this.checkAuthStatus();
    
    if (!user) {
      window.location.href = '/login.html';
      return null;
    }
    
    return user;
  }

  // Obter usuário atual
  static getCurrentUser() {
    const userSession = sessionStorage.getItem('pethologyUser');
    return userSession ? JSON.parse(userSession) : null;
  }

  // Atualizar dados do usuário
  static updateUserSession(updates) {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      sessionStorage.setItem('pethologyUser', JSON.stringify(updatedUser));
      return updatedUser;
    }
    return null;
  }

  // Verificar se token ainda é válido
  static async validateToken() {
    await this.initialize();
    
    try {
      const accounts = this.msalInstance.getAllAccounts();
      if (accounts.length === 0) return false;
      
      const tokenRequest = {
        scopes: this.loginRequest.scopes,
        account: accounts[0]
      };
      
      await this.msalInstance.acquireTokenSilent(tokenRequest);
      return true;
    } catch (error) {
      console.log("Token validation failed:", error);
      return false;
    }
  }

  // Renovar token automaticamente
  static async refreshToken() {
    await this.initialize();
    
    try {
      const accounts = this.msalInstance.getAllAccounts();
      if (accounts.length === 0) throw new Error("No accounts found");
      
      const tokenRequest = {
        scopes: this.loginRequest.scopes,
        account: accounts[0]
      };
      
      const tokenResponse = await this.msalInstance.acquireTokenSilent(tokenRequest);
      console.log("Token refreshed successfully");
      return tokenResponse.accessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      // Se falhar, redirecionar para login
      this.signOut();
      throw error;
    }
  }
}

// Classe para gerenciar progresso do estudante
class StudentProgress {
  constructor(userId) {
    this.userId = userId;
    this.storageKey = `progress_${userId}`;
    this.progress = this.loadProgress();
  }

  loadProgress() {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : {
      modules: {},
      quizzes: {},
      achievements: [],
      streak: 0,
      totalXP: 0,
      lastActivity: null
    };
  }

  saveProgress() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
  }

  updateModuleProgress(moduleId, completion) {
    this.progress.modules[moduleId] = {
      completion: Math.max(0, Math.min(100, completion)),
      lastAccessed: new Date().toISOString()
    };
    this.saveProgress();
  }

  updateQuizScore(moduleId, score, timeSpent = 0) {
    if (!this.progress.quizzes[moduleId]) {
      this.progress.quizzes[moduleId] = { attempts: 0, bestScore: 0, scores: [] };
    }
    
    const quiz = this.progress.quizzes[moduleId];
    quiz.attempts++;
    quiz.scores.push({ score, timeSpent, date: new Date().toISOString() });
    quiz.bestScore = Math.max(quiz.bestScore, score);
    quiz.lastAttempt = new Date().toISOString();
    
    this.addXP('quiz_complete', score);
    this.updateActivity();
    this.checkAchievements();
    this.saveProgress();
  }

  addXP(action, score = 0) {
    const xpValues = {
      'quiz_complete': 50 + (score * 0.5),
      'module_read': 25,
      'perfect_quiz': 100,
      'daily_goal': 30,
      'streak_bonus': 10
    };
    
    const xp = xpValues[action] || 0;
    this.progress.totalXP += xp;
    
    // Bonus para perfeita pontuação
    if (action === 'quiz_complete' && score >= 100) {
      this.progress.totalXP += xpValues['perfect_quiz'];
      this.unlockAchievement('perfect-score');
    }
  }

  updateActivity() {
    const today = new Date().toDateString();
    const lastActivity = this.progress.lastActivity ? new Date(this.progress.lastActivity).toDateString() : null;
    
    this.progress.lastActivity = new Date().toISOString();
    
    // Atualizar streak
    if (lastActivity === today) {
      // Mesma data, não alterar streak
      return;
    } else if (lastActivity === new Date(Date.now() - 86400000).toDateString()) {
      // Dia consecutivo
      this.progress.streak++;
      this.addXP('streak_bonus');
    } else {
      // Quebrou o streak
      this.progress.streak = 1;
    }
    
    // Verificar achievements de streak
    if (this.progress.streak === 7) {
      this.unlockAchievement('week-warrior');
    } else if (this.progress.streak === 30) {
      this.unlockAchievement('month-master');
    }
  }

  unlockAchievement(achievementId) {
    if (!this.progress.achievements.includes(achievementId)) {
      this.progress.achievements.push(achievementId);
      console.log(`Achievement unlocked: ${achievementId}`);
      
      // Mostrar notificação (se implementado)
      this.showAchievementNotification(achievementId);
    }
  }

  showAchievementNotification(achievementId) {
    const achievements = {
      'quiz-master': { icon: '🌟', title: 'Quiz Master', description: 'Complete 10 quizzes' },
      'perfect-score': { icon: '🎯', title: 'Perfect Score', description: 'Get 100% on a quiz' },
      'week-warrior': { icon: '🔥', title: 'Week Warrior', description: '7 day learning streak' },
      'month-master': { icon: '👑', title: 'Month Master', description: '30 day learning streak' },
      'bookworm': { icon: '📚', title: 'Bookworm', description: 'Read 20 modules' }
    };
    
    const achievement = achievements[achievementId];
    if (achievement) {
      // Criar notificação visual (implementar conforme necessário)
      if (typeof showToast === 'function') {
        showToast(`${achievement.icon} ${achievement.title} unlocked!`, 'success');
      } else {
        console.log(`🏆 Achievement: ${achievement.title} - ${achievement.description}`);
      }
    }
  }

  checkAchievements() {
    const totalQuizzes = Object.keys(this.progress.quizzes).length;
    const totalModules = Object.keys(this.progress.modules).length;
    
    if (totalQuizzes >= 10) {
      this.unlockAchievement('quiz-master');
    }
    
    if (totalModules >= 20) {
      this.unlockAchievement('bookworm');
    }
  }

  getOverallProgress() {
    const modules = Object.values(this.progress.modules);
    if (modules.length === 0) return 0;
    
    const totalCompletion = modules.reduce((sum, module) => sum + (module.completion || 0), 0);
    return Math.round(totalCompletion / modules.length);
  }

  getLevel() {
    return Math.floor(this.progress.totalXP / 500) + 1;
  }

  getQuizAverage() {
    const quizzes = Object.values(this.progress.quizzes);
    if (quizzes.length === 0) return 0;
    
    const totalScore = quizzes.reduce((sum, quiz) => sum + (quiz.bestScore || 0), 0);
    return Math.round(totalScore / quizzes.length);
  }
}

// Utilitários de autenticação
const AuthUtils = {
  // Proteger página (usar no início de páginas que precisam de auth)
  protectPage: async function(requiredRole = null) {
    const user = await PethologyAuth.requireAuth();
    if (!user) return;
    
    if (requiredRole && !(await PethologyAuth.requireRole(requiredRole))) {
      return;
    }
    
    return user;
  },

  // Redirecionar baseado no role
  redirectByRole: function(user) {
    if (user.role === 'Teacher') {
      window.location.href = '/teacher-dashboard.html';
    } else {
      window.location.href = '/student-dashboard.html';
    }
  },

  // Formattar nome para exibição
  formatDisplayName: function(fullName) {
    return fullName.split(' ')[0]; // Primeiro nome apenas
  },

  // Verificar se é ambiente de desenvolvimento
  isDevelopment: function() {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  }
};

// Auto-inicializar quando o script carregar
if (typeof window !== 'undefined') {
  window.PethologyAuth = PethologyAuth;
  window.StudentProgress = StudentProgress;
  window.AuthUtils = AuthUtils;
  
  console.log("Pethology Auth system loaded");
}