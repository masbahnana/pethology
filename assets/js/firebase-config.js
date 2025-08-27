// assets/js/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth, OAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// SUBSTITUIR PELO SEU CONFIG DO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDYq8xnfL9KPiKYHHvDG1zHDvjd4WAOO3o",
  authDomain: "pethology-7e9d7.firebaseapp.com",
  projectId: "pethology-7e9d7",
  storageBucket: "pethology-7e9d7.firebasestorage.app",
  messagingSenderId: "485201789422",
  appId: "1:485201789422:web:309a54ceb82588973f0eff"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Configurar Microsoft provider
const microsoftProvider = new OAuthProvider('microsoft.com');
microsoftProvider.setCustomParameters({
  // Forçar seleção de conta
  prompt: 'select_account'
});

// Classe para gerenciar autenticação
class PethologyFirebaseAuth {
  static async signInWithMicrosoft() {
    try {
      const result = await signInWithPopup(auth, microsoftProvider);
      const user = result.user;
      
      console.log('Login successful:', user);
      
      // Criar sessão do usuário
      const userSession = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        role: this.determineUserRole(user.email),
        photo: user.photoURL,
        loginTime: new Date().toISOString()
      };
      
      // Salvar na sessão
      sessionStorage.setItem('pethologyUser', JSON.stringify(userSession));
      
      return userSession;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
  
  static async signOut() {
    try {
      await signOut(auth);
      sessionStorage.removeItem('pethologyUser');
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }
  
  static determineUserRole(email) {
    if (!email) return 'Student';
    
    const emailLower = email.toLowerCase();
    
    // Verificar indicadores de professor/staff
    if (emailLower.includes('staff') || 
        emailLower.includes('teacher') || 
        emailLower.includes('admin') ||
        emailLower.includes('instructor')) {
      return 'Teacher';
    }
    
    // Padrão: estudante
    return 'Student';
  }
  
  static getCurrentUser() {
    const userSession = sessionStorage.getItem('pethologyUser');
    return userSession ? JSON.parse(userSession) : null;
  }
  
  static async requireAuth() {
    const user = this.getCurrentUser();
    if (!user) {
      window.location.href = '/firebase-login.html';
      return null;
    }
    return user;
  }
  
  static async requireRole(requiredRole) {
    const user = await this.requireAuth();
    if (!user) return false;
    
    if (user.role !== requiredRole) {
      alert(`Access denied. This page requires ${requiredRole} privileges.`);
      window.location.href = user.role === 'Teacher' ? '/teacher-dashboard.html' : '/student-dashboard.html';
      return false;
    }
    
    return true;
  }
}

// Monitorar mudanças de autenticação
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('User is signed in:', user.email);
  } else {
    console.log('User is signed out');
    // Limpar sessão se não estiver logado
    sessionStorage.removeItem('pethologyUser');
  }
});

// Exportar para uso global
window.PethologyFirebaseAuth = PethologyFirebaseAuth;
window.firebaseAuth = auth;
window.firebaseDb = db;

export { PethologyFirebaseAuth, auth, db };