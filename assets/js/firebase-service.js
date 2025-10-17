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
      // Remove undefined values from resultData
      const cleanData = {};
      Object.keys(resultData).forEach(key => {
        if (resultData[key] !== undefined) {
          cleanData[key] = resultData[key];
        }
      });

      const resultsRef = collection(db, 'quiz_results');
      const docRef = await addDoc(resultsRef, {
        ...cleanData,
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

  // 👨‍🏫 TEACHER FUNCTIONS

  // Get all students (users with role: 'Student')
  static async getAllStudents() {
    try {
      console.log('📋 Fetching all students...');
      const q = query(
        collection(db, 'users'),
        where('role', '==', 'Student'),
        orderBy('lastLogin', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const students = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log(`✅ Loaded ${students.length} students`);
      return students;
    } catch (error) {
      console.error('❌ Error getting students:', error);
      return [];
    }
  }

  // Get all students with their progress
  static async getAllStudentsProgress() {
    try {
      console.log('📊 Fetching all students progress...');

      // First get all students
      const students = await this.getAllStudents();

      // Then get progress for each student
      const progressPromises = students.map(async (student) => {
        const progress = await this.getStudentProgress(student.id);
        return {
          ...student,
          progress
        };
      });

      const studentsWithProgress = await Promise.all(progressPromises);
      console.log(`✅ Loaded progress for ${studentsWithProgress.length} students`);
      return studentsWithProgress;
    } catch (error) {
      console.error('❌ Error getting students progress:', error);
      return [];
    }
  }

  // Get all quiz results (for teacher analytics)
  static async getAllQuizResults(limitCount = 100) {
    try {
      console.log('📝 Fetching all quiz results...');
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
      console.error('❌ Error getting quiz results:', error);
      return [];
    }
  }

  // Get teacher analytics dashboard data
  static async getTeacherAnalytics() {
    try {
      console.log('📈 Generating teacher analytics...');

      const [students, quizResults] = await Promise.all([
        this.getAllStudents(),
        this.getAllQuizResults(200)
      ]);

      // Calculate statistics
      const totalStudents = students.length;
      const activeStudents = students.filter(s => {
        const lastLogin = s.lastLogin?.toDate ? s.lastLogin.toDate() : new Date(s.lastLogin);
        const daysSinceLogin = (Date.now() - lastLogin.getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceLogin <= 7; // Active in last 7 days
      }).length;

      const totalQuizzes = quizResults.length;
      const averageScore = totalQuizzes > 0
        ? quizResults.reduce((sum, r) => sum + (r.score || 0), 0) / totalQuizzes
        : 0;

      const averageTime = totalQuizzes > 0
        ? quizResults.reduce((sum, r) => sum + (r.timeSpent || 0), 0) / totalQuizzes
        : 0;

      // Module performance
      const moduleStats = {};
      quizResults.forEach(result => {
        const module = result.quizId || 'Unknown';
        if (!moduleStats[module]) {
          moduleStats[module] = {
            attempts: 0,
            totalScore: 0,
            totalTime: 0
          };
        }
        moduleStats[module].attempts++;
        moduleStats[module].totalScore += result.score || 0;
        moduleStats[module].totalTime += result.timeSpent || 0;
      });

      const modulePerformance = Object.entries(moduleStats).map(([module, stats]) => ({
        module,
        attempts: stats.attempts,
        averageScore: stats.totalScore / stats.attempts,
        averageTime: Math.round(stats.totalTime / stats.attempts)
      }));

      // Recent activity (last 10 quiz attempts)
      const recentActivity = quizResults.slice(0, 10).map(result => ({
        studentId: result.userId,
        quizId: result.quizId,
        score: result.score,
        completedAt: result.completedAt
      }));

      const analytics = {
        overview: {
          totalStudents,
          activeStudents,
          totalQuizzes,
          averageScore: Math.round(averageScore * 100),
          averageTime: Math.round(averageTime)
        },
        modulePerformance,
        recentActivity,
        lastUpdated: new Date()
      };

      console.log('✅ Teacher analytics generated:', analytics);
      return analytics;
    } catch (error) {
      console.error('❌ Error generating teacher analytics:', error);
      return {
        overview: {
          totalStudents: 0,
          activeStudents: 0,
          totalQuizzes: 0,
          averageScore: 0,
          averageTime: 0
        },
        modulePerformance: [],
        recentActivity: [],
        lastUpdated: new Date()
      };
    }
  }

  // 📚 CONTENT MANAGEMENT (for teachers to publish readings)

  // Publish extra reading content
  static async publishContent(contentData) {
    try {
      console.log('📤 Publishing content...');
      const contentRef = collection(db, 'extra_content');
      const docRef = await addDoc(contentRef, {
        ...contentData,
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true
      });
      console.log('✅ Content published with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('❌ Error publishing content:', error);
      throw error;
    }
  }

  // Get all published content
  static async getAllContent(moduleFilter = null) {
    try {
      console.log('📚 Fetching content...');
      let q;

      if (moduleFilter) {
        q = query(
          collection(db, 'extra_content'),
          where('module', '==', moduleFilter),
          where('published', '==', true),
          orderBy('createdAt', 'desc')
        );
      } else {
        q = query(
          collection(db, 'extra_content'),
          where('published', '==', true),
          orderBy('createdAt', 'desc')
        );
      }

      const querySnapshot = await getDocs(q);
      const content = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log(`✅ Loaded ${content.length} content items`);
      return content;
    } catch (error) {
      console.error('❌ Error getting content:', error);
      return [];
    }
  }

  // Update existing content
  static async updateContent(contentId, updates) {
    try {
      console.log('✏️ Updating content:', contentId);
      const contentRef = doc(db, 'extra_content', contentId);
      await updateDoc(contentRef, {
        ...updates,
        updatedAt: new Date()
      });
      console.log('✅ Content updated successfully');
    } catch (error) {
      console.error('❌ Error updating content:', error);
      throw error;
    }
  }

  // Delete content
  static async deleteContent(contentId) {
    try {
      console.log('🗑️ Deleting content:', contentId);
      const contentRef = doc(db, 'extra_content', contentId);
      await updateDoc(contentRef, {
        published: false,
        deletedAt: new Date()
      });
      console.log('✅ Content deleted (soft delete)');
    } catch (error) {
      console.error('❌ Error deleting content:', error);
      throw error;
    }
  }

  // 🏆 ACHIEVEMENT SYSTEM

  /**
   * Update student achievements
   * @param {string} userId - Student ID
   * @param {Array} newAchievements - Array of achievement objects to add
   */
  static async updateStudentAchievements(userId, newAchievements) {
    try {
      console.log('🏆 Updating achievements for user:', userId);

      const progressRef = doc(db, 'student_progress', userId);
      const progressSnap = await getDoc(progressRef);

      let currentAchievements = [];
      if (progressSnap.exists()) {
        currentAchievements = progressSnap.data().achievements || [];
      }

      // Add new achievement IDs (avoid duplicates)
      const newAchievementIds = newAchievements.map(a => a.id);
      const updatedAchievements = [...new Set([...currentAchievements, ...newAchievementIds])];

      await updateDoc(progressRef, {
        achievements: updatedAchievements,
        lastAchievementUnlocked: new Date()
      });

      console.log('✅ Achievements updated:', updatedAchievements);
      return updatedAchievements;
    } catch (error) {
      console.error('❌ Error updating achievements:', error);
      throw error;
    }
  }

  /**
   * Save quiz result and check for new achievements
   * @param {Object} resultData - Quiz result data
   */
  static async saveQuizResultWithAchievements(resultData) {
    try {
      console.log('🏆 Starting achievement check for user:', resultData.userId);

      // Save quiz result first
      await this.saveQuizResult(resultData);
      console.log('✅ Quiz result saved');

      // Import achievements module dynamically
      const { checkAchievements, calculateStudentStats, showAchievementToast } =
        await import('./achievements.js');
      console.log('✅ Achievement module imported');

      // Get updated progress
      const progress = await this.getStudentProgress(resultData.userId);
      console.log('📊 Current progress:', progress);

      // Get all quiz results for stats calculation
      const quizResults = await this.getStudentQuizHistory(resultData.userId);
      console.log('📝 Quiz history count:', quizResults.length);

      // Calculate comprehensive stats
      const stats = calculateStudentStats(quizResults, progress.moduleProgress);
      stats.achievements = progress.achievements || [];
      console.log('📈 Calculated stats:', stats);

      // Check for new achievements
      const newAchievements = checkAchievements(resultData.userId, stats);
      console.log('🔍 New achievements found:', newAchievements.length, newAchievements);

      if (newAchievements.length > 0) {
        console.log('🎉 New achievements unlocked:', newAchievements);

        // Save new achievements to Firebase
        await this.updateStudentAchievements(resultData.userId, newAchievements);

        // Show toast notifications for each new achievement
        newAchievements.forEach((achievement, index) => {
          setTimeout(() => {
            showAchievementToast(achievement);
          }, index * 500); // Stagger notifications by 500ms
        });

        return { success: true, newAchievements };
      } else {
        console.log('ℹ️ No new achievements unlocked this time');
      }

      return { success: true, newAchievements: [] };
    } catch (error) {
      console.error('❌ Error saving quiz result with achievements:', error);
      console.error('Error stack:', error.stack);
      throw error;
    }
  }

  /**
   * Get student quiz history for stats calculation
   * @param {string} userId - Student ID
   * @returns {Array} Array of quiz results
   */
  static async getStudentQuizHistory(userId) {
    try {
      // Try with orderBy first (requires index)
      try {
        const resultsQuery = query(
          collection(db, 'quiz_results'),
          where('userId', '==', userId),
          orderBy('completedAt', 'desc')
        );

        const querySnapshot = await getDocs(resultsQuery);
        const results = [];

        querySnapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data()
          });
        });

        return results;
      } catch (indexError) {
        // If index doesn't exist, fallback to simple query without orderBy
        console.warn('⚠️ Firebase index missing, using fallback query. Create index for better performance:', indexError.message);

        const simpleQuery = query(
          collection(db, 'quiz_results'),
          where('userId', '==', userId)
        );

        const querySnapshot = await getDocs(simpleQuery);
        const results = [];

        querySnapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data()
          });
        });

        // Sort manually in JavaScript
        results.sort((a, b) => {
          const dateA = a.completedAt?.toDate ? a.completedAt.toDate() : new Date(a.completedAt);
          const dateB = b.completedAt?.toDate ? b.completedAt.toDate() : new Date(b.completedAt);
          return dateB - dateA;
        });

        console.log(`✅ Retrieved ${results.length} quiz results using fallback method`);
        return results;
      }
    } catch (error) {
      console.error('❌ Error getting quiz history:', error);
      return [];
    }
  }

  /**
   * Initialize student progress with default achievements array
   * @param {string} userId - Student ID
   */
  static async initializeStudentProgress(userId) {
    try {
      const progressRef = doc(db, 'student_progress', userId);
      const progressSnap = await getDoc(progressRef);

      if (!progressSnap.exists()) {
        await setDoc(progressRef, {
          userId,
          achievements: [],
          overallStats: {
            totalQuizzes: 0,
            averageScore: 0,
            currentStreak: 0
          },
          moduleProgress: {},
          createdAt: new Date(),
          updatedAt: new Date()
        });
        console.log('✅ Student progress initialized with achievements');
      }
    } catch (error) {
      console.error('❌ Error initializing student progress:', error);
      throw error;
    }
  }

  // Get current logged in user from session
  static async getCurrentUser() {
    try {
      const userSession = sessionStorage.getItem('pethologyUser');
      if (!userSession) {
        return null;
      }

      const userData = JSON.parse(userSession);
      return userData;
    } catch (error) {
      console.error('❌ Error getting current user:', error);
      return null;
    }
  }

  // Logout user
  static async logout() {
    try {
      sessionStorage.removeItem('pethologyUser');
      console.log('✅ User logged out successfully');
      return true;
    } catch (error) {
      console.error('❌ Error logging out:', error);
      throw error;
    }
  }
}

export { PethologyFirebaseService, db };