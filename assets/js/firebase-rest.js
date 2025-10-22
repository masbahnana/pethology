// Firebase REST API Service - NO SDK, pure HTTP requests
// This avoids all WebChannel/listener issues completely

const FIREBASE_CONFIG = {
  projectId: "pethology-7e9d7",
  apiKey: "AIzaSyDYq8xnfL9KPiKYHHvDG1zHDvjd4WAOO3o",
  databaseURL: `https://firestore.googleapis.com/v1/projects/pethology-7e9d7/databases/(default)/documents`
};

console.log('🔥 Firebase REST API initialized (no SDK, no WebChannel) - v4.0');

export class PethologyFirebaseREST {

  // Helper to make REST requests
  static async request(path, method = 'GET', body = null) {
    const url = `${FIREBASE_CONFIG.databaseURL}${path}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`❌ REST request failed: ${method} ${path}`, error);
      throw error;
    }
  }

  // Convert Firestore document to our format
  static convertDocument(doc) {
    if (!doc.fields) return null;

    const data = { id: doc.name.split('/').pop() };

    for (const [key, value] of Object.entries(doc.fields)) {
      if (value.stringValue !== undefined) data[key] = value.stringValue;
      else if (value.integerValue !== undefined) data[key] = parseInt(value.integerValue);
      else if (value.doubleValue !== undefined) data[key] = parseFloat(value.doubleValue);
      else if (value.booleanValue !== undefined) data[key] = value.booleanValue;
      else if (value.timestampValue !== undefined) data[key] = new Date(value.timestampValue);
      else if (value.arrayValue !== undefined) data[key] = value.arrayValue.values || [];
      else if (value.mapValue !== undefined) data[key] = this.convertDocument({ fields: value.mapValue.fields });
    }

    return data;
  }

  // Get all students
  static async getAllStudents() {
    try {
      console.log('📋 Fetching all students (REST API)...');

      const response = await this.request('/users');

      if (!response.documents) {
        console.log('✅ Loaded 0 students');
        return [];
      }

      const students = response.documents
        .map(doc => this.convertDocument(doc))
        .filter(user => user && user.role === 'Student')
        .sort((a, b) => {
          const dateA = a.lastLogin || new Date(0);
          const dateB = b.lastLogin || new Date(0);
          return dateB - dateA;
        });

      console.log(`✅ Loaded ${students.length} students (REST API)`);
      return students;
    } catch (error) {
      console.error('❌ Error getting students:', error);
      return [];
    }
  }

  // Get all students progress
  static async getAllStudentsProgress() {
    try {
      console.log('📊 Fetching all students progress (REST API)...');

      const response = await this.request('/progress');

      if (!response.documents) {
        console.log('✅ Loaded progress for 0 students');
        return [];
      }

      const progress = response.documents.map(doc => this.convertDocument(doc));

      console.log(`✅ Loaded progress for ${progress.length} students (REST API)`);
      return progress;
    } catch (error) {
      console.error('❌ Error getting students progress:', error);
      return [];
    }
  }

  // Get all quiz results
  static async getAllQuizResults() {
    try {
      console.log('📝 Fetching all quiz results (REST API)...');

      const response = await this.request('/quiz_results');

      if (!response.documents) {
        console.log('✅ Loaded 0 quiz results');
        return [];
      }

      const results = response.documents.map(doc => this.convertDocument(doc));

      console.log(`✅ Loaded ${results.length} quiz results (REST API)`);
      return results;
    } catch (error) {
      console.error('❌ Error getting quiz results:', error);
      return [];
    }
  }

  // Get teacher analytics (same logic as before)
  static async getTeacherAnalytics() {
    try {
      console.log('📈 Generating teacher analytics (REST API)...');

      const [students, quizResults] = await Promise.all([
        this.getAllStudents(),
        this.getAllQuizResults()
      ]);

      // Calculate analytics
      const totalStudents = students.length;
      const activeStudents = students.filter(s => {
        if (!s.lastLogin) return false;
        const daysSinceLogin = (Date.now() - s.lastLogin.getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceLogin <= 7;
      }).length;

      const completedQuizzes = quizResults.filter(r => r.completed).length;
      const totalQuizzes = quizResults.length;
      const averageScore = totalQuizzes > 0
        ? Math.round(quizResults.reduce((sum, r) => sum + (r.score || 0), 0) / totalQuizzes)
        : 0;

      const analytics = {
        overview: {
          totalStudents,
          activeStudents,
          completedQuizzes,
          averageScore
        },
        modulePerformance: [],
        recentActivity: quizResults
          .sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0))
          .slice(0, 10),
        lastUpdated: new Date()
      };

      console.log('✅ Teacher analytics generated (REST API):', analytics);
      return analytics;
    } catch (error) {
      console.error('❌ Error generating analytics:', error);
      return {
        overview: { totalStudents: 0, activeStudents: 0, completedQuizzes: 0, averageScore: 0 },
        modulePerformance: [],
        recentActivity: [],
        lastUpdated: new Date()
      };
    }
  }

  // Get user progress
  static async getUserProgress(userId) {
    try {
      const response = await this.request(`/progress/${userId}`);
      return this.convertDocument(response);
    } catch (error) {
      console.error('❌ Error getting user progress:', error);
      return null;
    }
  }

  // ============================================
  // STUDENT WHITELIST METHODS
  // ============================================

  // Check if student email is pre-registered (whitelist check)
  static async checkStudentWhitelisted(email) {
    try {
      console.log(`🔍 Checking student whitelist for: ${email}`);

      const response = await this.request(`/pre_registered_students/${email}`);

      if (response && response.fields) {
        const studentData = this.convertDocument(response);
        console.log(`✅ Student is whitelisted:`, studentData);
        return studentData;
      }

      console.log(`❌ Student NOT in whitelist: ${email}`);
      return null;
    } catch (error) {
      // 404 means not found (not whitelisted)
      if (error.message.includes('404')) {
        console.log(`❌ Student NOT in whitelist: ${email}`);
        return null;
      }
      console.error('❌ Error checking student whitelist:', error);
      return null;
    }
  }

  // Mark student as registered (after signup)
  static async markStudentAsRegistered(email, userId) {
    try {
      console.log(`✅ Marking student as registered: ${email} → ${userId}`);

      const updateData = {
        fields: {
          registered: { booleanValue: true },
          userId: { stringValue: userId },
          registeredAt: { timestampValue: new Date().toISOString() }
        }
      };

      await this.request(
        `/pre_registered_students/${email}?updateMask.fieldPaths=registered&updateMask.fieldPaths=userId&updateMask.fieldPaths=registeredAt`,
        'PATCH',
        updateData
      );

      console.log(`✅ Student marked as registered: ${email}`);
      return true;
    } catch (error) {
      console.error('❌ Error marking student as registered:', error);
      return false;
    }
  }

  // Get all pre-registered students (for admin/teacher dashboard)
  static async getAllPreRegisteredStudents() {
    try {
      console.log('📋 Fetching all pre-registered students...');

      const response = await this.request('/pre_registered_students');

      if (!response.documents) {
        console.log('✅ No pre-registered students found');
        return [];
      }

      const students = response.documents
        .map(doc => this.convertDocument(doc))
        .sort((a, b) => {
          const dateA = a.addedAt || new Date(0);
          const dateB = b.addedAt || new Date(0);
          return dateB - dateA;
        });

      console.log(`✅ Loaded ${students.length} pre-registered students`);
      return students;
    } catch (error) {
      console.error('❌ Error getting pre-registered students:', error);
      return [];
    }
  }
}

// Make it globally available
window.PethologyFirebaseREST = PethologyFirebaseREST;
