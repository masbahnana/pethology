// Firebase Service for Pethology
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  limit
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Suas credenciais Firebase
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
const db = getFirestore(app);

class PethologyFirebaseService {
  
  // 👤 USER MANAGEMENT
  static async createOrUpdateUser(authUser) {
    try {
      const userRef = doc(db, 'users', authUser.id);
      const userData = {
        id: authUser.id,
        name: authUser.name,
        email: authUser.email,
        role: authUser.role || 'Student',
        photo: authUser.photo,
        provider: 'microsoft',
        lastLogin: new Date(),
        updatedAt: new Date()
      };
      
      await setDoc(userRef, userData, { merge: true });
      console.log('✅ User saved to Firebase:', userData);
      return userData;
    } catch (error) {
      console.error('❌ Error saving user:', error);
      throw error;
    }
  }

  static async getUser(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      return userDoc.exists() ? userDoc.data() : null;
    } catch (error) {
      console.error('❌ Error getting user:', error);
      return null;
    }
  }

  // 📊 STUDENT PROGRESS
  static async getStudentProgress(userId) {
    try {
      const progressDoc = await getDoc(doc(db, 'student_progress', userId));
      if (progressDoc.exists()) {
        console.log('✅ Progress loaded from Firebase');
        return progressDoc.data();
      } else {
        console.log('📝 Creating default progress for new user');
        return this.createDefaultProgress(userId);
      }
    } catch (error) {
      console.error('❌ Error getting student progress:', error);
      return this.createDefaultProgress(userId);
    }
  }

  static async updateStudentProgress(userId, progressData) {
    try {
      const progressRef = doc(db, 'student_progress', userId);
      await setDoc(progressRef, {
        userId,
        ...progressData,
        updatedAt: new Date()
      }, { merge: true });
      console.log('✅ Progress updated for user:', userId);
    } catch (error) {
      console.error('❌ Error updating progress:', error);
      throw error;
    }
  }

  static createDefaultProgress(userId) {
    return {
      userId,
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

  // 🎯 QUIZ RESULTS
  static async saveQuizResult(resultData) {
    try {
      const resultsRef = collection(db, 'quiz_results');
      const docRef = await addDoc(resultsRef, {
        ...resultData,
        createdAt: new Date()
      });
      console.log('✅ Quiz result saved with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('❌ Error saving quiz result:', error);
      throw error;
    }
  }

  static async getStudentQuizHistory(userId, limitCount = 10) {
    try {
      const q = query(
        collection(db, 'quiz_results'),
        where('userId', '==', userId),
        orderBy('completedAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(`✅ Loaded ${results.length} quiz results`);
      return results;
    } catch (error) {
      console.error('❌ Error getting quiz history:', error);
      return [];
    }
  }

  // 📈 ANALYTICS (para professores)
  static async getClassAnalytics() {
    try {
      const q = query(
        collection(db, 'quiz_results'),
        orderBy('createdAt', 'desc'),
        limit(100)
      );
      
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => doc.data());
      
      return this.processAnalytics(results);
    } catch (error) {
      console.error('❌ Error getting analytics:', error);
      return this.getDefaultAnalytics();
    }
  }

  static processAnalytics(results) {
    if (results.length === 0) return this.getDefaultAnalytics();

    const totalAttempts = results.length;
    const averageScore = results.reduce((sum, r) => sum + (r.score || 0), 0) / totalAttempts;
    const averageTime = results.reduce((sum, r) => sum + (r.timeSpent || 0), 0) / totalAttempts;
    
    const uniqueStudents = new Set(results.map(r => r.userId)).size;
    
    return {
      totalAttempts,
      averageScore: Math.round(averageScore * 100),
      averageTime: Math.round(averageTime),
      uniqueStudents,
      lastUpdated: new Date()
    };
  }

  static getDefaultAnalytics() {
    return {
      totalAttempts: 0,
      averageScore: 0,
      averageTime: 0,
      uniqueStudents: 0,
      lastUpdated: new Date()
    };
  }
}

export { PethologyFirebaseService, db };