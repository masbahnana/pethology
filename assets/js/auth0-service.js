// assets/js/auth0-service.js
// Auth0 Authentication + Firebase Integration for Pethology

import { PethologyFirebaseService } from './firebase-service.js';
import { PethologyFirebaseREST } from './firebase-rest.js';

class Auth0Service {
  static auth0Client = null;
  static isInitialized = false;

  // 🔑 Auth0 Configuration
  static auth0Config = {
    domain: 'dev-itl78pbpxq46x8gh.eu.auth0.com',  // Substituir pelo seu domain
    clientId: 'uKYMTC50M5fOy3LemUcRnzNYCSgigclj',        // Substituir pelo seu client ID
    authorizationParams: {
      redirect_uri: window.location.origin + '/auth0-callback.html',
      audience: 'https://dev-itl78pbpxq46x8gh.eu.auth0.com/api/v2/',
      scope: 'openid profile email'
    }
  };

  // Inicializar Auth0
  static async initialize() {
    if (this.isInitialized) return;

    try {
      this.auth0Client = await window.auth0.createAuth0Client(this.auth0Config);
      this.isInitialized = true;
      console.log('✅ Auth0 initialized successfully');
    } catch (error) {
      console.error('❌ Auth0 initialization failed:', error);
      throw error;
    }
  }

  // Login com Auth0
  static async login() {
    await this.initialize();

    try {
      await this.auth0Client.loginWithRedirect({
        authorizationParams: {
          redirect_uri: window.location.origin + '/auth0-callback.html'
        }
      });
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw error;
    }
  }

  // Processar callback após login
  static async handleCallback() {
    await this.initialize();

    try {
      // Processar o redirect
      const result = await this.auth0Client.handleRedirectCallback();
      console.log('✅ Login callback processed:', result);

      // Obter dados do usuário
      const user = await this.auth0Client.getUser();
      
      if (!user) {
        throw new Error('No user data received from Auth0');
      }

      // Criar sessão do usuário (AWAIT!)
      const userSession = await this.createUserSession(user);

      // 🔥 Salvar no Firebase
      try {
        await PethologyFirebaseService.createOrUpdateUser(userSession);
        console.log('✅ User saved to Firebase!');
      } catch (firebaseError) {
        console.error('⚠️ Firebase save failed (continuing with local session):', firebaseError);
      }

      // Salvar na sessão local
      sessionStorage.setItem('pethologyUser', JSON.stringify(userSession));

      // Verificar se precisa completar perfil
      const needsProfileCompletion = this.needsProfileCompletion(userSession);

      if (needsProfileCompletion) {
        console.log('📝 Profile needs completion, redirecting...');
        window.location.href = '/complete-profile.html';
      } else {
        // Redirecionar baseado no role
        this.redirectByRole(userSession);
      }

      return userSession;

    } catch (error) {
      console.error('❌ Callback handling failed:', error);
      // Redirecionar para login em caso de erro
      window.location.href = '/auth0-login.html';
      throw error;
    }
  }

  // Criar sessão do usuário a partir dos dados Auth0 (ASYNC now!)
  static async createUserSession(auth0User) {
    const email = auth0User.email || '';
    const role = await this.determineUserRole(email); // AWAIT agora!

    return {
      id: auth0User.sub,
      name: auth0User.name || auth0User.nickname || 'User',
      email: email,
      role: role,
      photo: auth0User.picture || this.getDefaultAvatar(),
      provider: 'auth0',
      loginTime: new Date().toISOString(),
      emailVerified: auth0User.email_verified || false,
      profileCompleted: false // Será atualizado em complete-profile.html
    };
  }

  // Verificar se usuário precisa completar perfil
  static needsProfileCompletion(userSession) {
    // Se já completou, não precisa
    if (userSession.profileCompleted) {
      return false;
    }

    // Se o nome parece ser um email ou é muito curto, precisa completar
    const name = userSession.name || '';

    // Verificar se é email
    if (name.includes('@')) {
      return true;
    }

    // Verificar se é muito curto (menos de 3 caracteres)
    if (name.length < 3) {
      return true;
    }

    // Verificar se parece ser o nickname do Auth0 (ex: "auth0|123456")
    if (name.includes('|') || name.startsWith('auth0')) {
      return true;
    }

    // Se passou todas verificações, não precisa completar
    return false;
  }

  // 🔐 Verificar se email está no teacher whitelist
  static async checkTeacherWhitelist(email) {
    try {
      const response = await PethologyFirebaseREST.request('/teacher_whitelist');

      if (!response.documents || response.documents.length === 0) {
        return false;
      }

      const whitelist = response.documents
        .map(doc => PethologyFirebaseREST.convertDocument(doc))
        .map(entry => entry.email.toLowerCase());

      return whitelist.includes(email.toLowerCase());
    } catch (error) {
      console.error('❌ Error checking teacher whitelist:', error);
      return false;
    }
  }

  // 🎓 Determinar role baseado no email (ASYNC agora!)
  static async determineUserRole(email) {
    const emailLower = email.toLowerCase();
    console.log('🔍 [DEBUG] Determining role for email:', email, '→ lowercase:', emailLower);

    // 🚨 EMERGENCY FIX: Hardcode Mary Deegan as Teacher (TEMPORARY!)
    // TODO: Remove this after fixing whitelist issue
    if (emailLower === 'mdeegan@stconlethcc365.ie') {
      console.log('🚨 [EMERGENCY FIX] Mary Deegan detected - forcing Teacher role');
      return 'Teacher';
    }

    // PRIORITY 1: Check teacher whitelist (REAL verification!)
    const isInWhitelist = await this.checkTeacherWhitelist(emailLower);
    console.log('🔍 [DEBUG] Whitelist check result:', isInWhitelist);

    if (isInWhitelist) {
      console.log('✅ Email found in teacher whitelist:', emailLower);
      console.log('👨‍🏫 [DEBUG] Returning role: Teacher');
      return 'Teacher';
    }

    // PRIORITY 2: Check if student (St Conleth's College rule)
    // Estudantes: email começa com "plc"
    if (emailLower.startsWith('plc')) {
      console.log('📚 [DEBUG] Email starts with "plc" - assigning Student role');
      return 'Student';
    }

    // PRIORITY 3: Verificar indicadores de professor (fallback)
    const teacherIndicators = [
      'teacher', 'staff', 'faculty', 'instructor', 'professor', 'educator'
    ];

    const hasTeacherIndicator = teacherIndicators.some(indicator =>
      emailLower.includes(indicator)
    );

    if (hasTeacherIndicator) {
      console.log('⚠️ Teacher detected by keyword, but NOT in whitelist:', emailLower);
      console.log('💡 Add this email to whitelist via admin-whitelist.html');
    }

    // Default to Student
    return 'Student';
  }

  // Verificar se usuário está autenticado
  static async isAuthenticated() {
    await this.initialize();

    try {
      const isAuth = await this.auth0Client.isAuthenticated();
      return isAuth;
    } catch (error) {
      console.error('❌ Authentication check failed:', error);
      return false;
    }
  }

  // Obter usuário atual
  static async getCurrentUser() {
    // Primeiro verificar sessionStorage (mais rápido)
    const userSession = sessionStorage.getItem('pethologyUser');
    if (userSession) {
      return JSON.parse(userSession);
    }

    // Se não tiver na sessão, verificar Auth0
    await this.initialize();

    try {
      const isAuth = await this.auth0Client.isAuthenticated();
      
      if (isAuth) {
        const auth0User = await this.auth0Client.getUser();
        const userSession = this.createUserSession(auth0User);
        
        // Salvar na sessão para próximas consultas
        sessionStorage.setItem('pethologyUser', JSON.stringify(userSession));
        
        return userSession;
      }
    } catch (error) {
      console.error('❌ Error getting current user:', error);
    }

    return null;
  }

  // Logout
  static async logout() {
    await this.initialize();

    try {
      // Limpar sessão local
      sessionStorage.removeItem('pethologyUser');
      localStorage.removeItem('learningStreak');

      // Logout do Auth0
      await this.auth0Client.logout({
        logoutParams: {
          returnTo: window.location.origin + '/auth0-login.html'
        }
      });

      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout failed:', error);
      // Forçar redirect mesmo se logout falhar
      window.location.href = '/auth0-login.html';
    }
  }

  // Proteger página (requer autenticação)
  static async requireAuth() {
    const user = await this.getCurrentUser();

    if (!user) {
      console.log('⚠️ No authentication found, redirecting to login');
      window.location.href = '/auth0-login.html';
      return null;
    }

    return user;
  }

  // Proteger página com role específica
  static async requireRole(requiredRole) {
    const user = await this.requireAuth();
    
    if (!user) return false;

    if (user.role !== requiredRole) {
      alert(`Access denied. This page requires ${requiredRole} privileges.`);
      this.redirectByRole(user);
      return false;
    }

    return true;
  }

  // Redirecionar baseado no role
  static redirectByRole(user) {
    console.log('🔍 [DEBUG] redirectByRole called with user:', user);
    console.log('🔍 [DEBUG] User role:', user.role);

    if (user.role === 'Teacher') {
      console.log('👨‍🏫 [DEBUG] Redirecting to teacher-dashboard.html');
      window.location.href = '/teacher-dashboard.html';
    } else {
      console.log('📚 [DEBUG] Redirecting to student-dashboard.html');
      window.location.href = '/student-dashboard.html';
    }
  }

  // Avatar padrão
  static getDefaultAvatar() {
    return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="%23ccc"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
  }

  // Atualizar dados do usuário na sessão
  static updateUserSession(updates) {
    const currentUser = sessionStorage.getItem('pethologyUser');
    
    if (currentUser) {
      const user = JSON.parse(currentUser);
      const updatedUser = { ...user, ...updates };
      sessionStorage.setItem('pethologyUser', JSON.stringify(updatedUser));
      return updatedUser;
    }
    
    return null;
  }

  // Formatar nome para exibição (primeiro nome apenas)
  static formatDisplayName(fullName) {
    return fullName.split(' ')[0];
  }
}

// 🔥 Student Progress com Firebase (versão simplificada para Auth0)
class StudentProgress {
  constructor(userId) {
    this.userId = userId;
    this.progress = null;
    this.isLoaded = false;
  }

  async loadProgress() {
    if (this.isLoaded) return this.progress;

    try {
      this.progress = await PethologyFirebaseService.getStudentProgress(this.userId);
      console.log('✅ Progress loaded from Firebase');
      this.isLoaded = true;
    } catch (error) {
      console.error('⚠️ Error loading progress:', error);
      this.progress = this.getDefaultProgress();
      this.isLoaded = true;
    }

    return this.progress;
  }

  getDefaultProgress() {
    return {
      userId: this.userId,
      overallStats: {
        totalQuizzes: 0,
        averageScore: 0,
        totalTimeSpent: 0,
        streak: 0,
        lastActivity: null
      },
      moduleProgress: {
        biology: { completion: 0, averageScore: 0, timeSpent: 0 },
        'animal-welfare': { completion: 0, averageScore: 0, timeSpent: 0 },
        grooming: { completion: 0, averageScore: 0, timeSpent: 0 },
        'animal-anatomy': { completion: 0, averageScore: 0, timeSpent: 0 }
      },
      achievements: [],
      adaptiveProfile: {
        confidence: 0.5,
        learningSpeed: 0.5,
        strongTopics: [],
        weakTopics: [],
        preferredDifficulty: 0.5
      }
    };
  }

  async saveProgress() {
    if (!this.progress) return;

    try {
      await PethologyFirebaseService.updateStudentProgress(this.userId, this.progress);
      console.log('✅ Progress saved to Firebase');
    } catch (error) {
      console.error('⚠️ Error saving progress:', error);
    }
  }

  async updateQuizScore(moduleId, score, timeSpent = 0) {
    await this.loadProgress();

    // Atualizar stats gerais
    this.progress.overallStats.totalQuizzes++;
    this.progress.overallStats.totalTimeSpent += timeSpent;
    this.progress.overallStats.lastActivity = new Date();

    // Calcular nova média
    const currentAvg = this.progress.overallStats.averageScore;
    const totalQuizzes = this.progress.overallStats.totalQuizzes;
    this.progress.overallStats.averageScore = 
      ((currentAvg * (totalQuizzes - 1)) + score) / totalQuizzes;

    // Atualizar progresso do módulo
    if (this.progress.moduleProgress[moduleId]) {
      this.progress.moduleProgress[moduleId].averageScore = score;
      this.progress.moduleProgress[moduleId].timeSpent += timeSpent;
      this.progress.moduleProgress[moduleId].completion = Math.min(
        100,
        this.progress.moduleProgress[moduleId].completion + 10
      );
    }

    await this.saveProgress();
  }

  async getOverallProgress() {
    await this.loadProgress();
    
    const modules = Object.values(this.progress.moduleProgress);
    if (modules.length === 0) return 0;

    const totalCompletion = modules.reduce((sum, m) => sum + (m.completion || 0), 0);
    return Math.round(totalCompletion / modules.length);
  }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.Auth0Service = Auth0Service;
  window.StudentProgress = StudentProgress;
  console.log('✅ Auth0 Service with Firebase integration loaded');
}

export { Auth0Service, StudentProgress };