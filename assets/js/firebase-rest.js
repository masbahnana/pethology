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

    // Extract ID from document name if available, otherwise use userId field
    const data = {};
    if (doc.name) {
      data.id = doc.name.split('/').pop();
    }

    for (const [key, value] of Object.entries(doc.fields)) {
      if (value.stringValue !== undefined) data[key] = value.stringValue;
      else if (value.integerValue !== undefined) data[key] = parseInt(value.integerValue);
      else if (value.doubleValue !== undefined) data[key] = parseFloat(value.doubleValue);
      else if (value.booleanValue !== undefined) data[key] = value.booleanValue;
      else if (value.timestampValue !== undefined) data[key] = new Date(value.timestampValue);
      else if (value.arrayValue !== undefined) data[key] = value.arrayValue.values || [];
      else if (value.mapValue !== undefined) data[key] = this.convertDocument({ fields: value.mapValue.fields });
    }

    // Fallback: use userId as id if no doc.name
    if (!data.id && data.userId) {
      data.id = data.userId;
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

      const response = await this.request('/student_progress');

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

  // Get student progress (alias for getUserProgress with default structure)
  static async getStudentProgress(userId) {
    try {
      console.log(`📊 Fetching student progress for: ${userId}`);

      const progress = await this.getUserProgress(userId);

      if (!progress) {
        // Return default empty progress structure
        console.log('⚠️ No progress found, returning empty structure');
        return {
          overallStats: {
            totalQuizzes: 0,
            averageScore: 0,
            streak: 0
          },
          moduleProgress: {},
          achievements: []
        };
      }

      console.log('✅ Student progress loaded');
      return progress;
    } catch (error) {
      console.error('❌ Error getting student progress:', error);
      return {
        overallStats: { totalQuizzes: 0, averageScore: 0, streak: 0 },
        moduleProgress: {},
        achievements: []
      };
    }
  }

  // Get student quiz history
  static async getStudentQuizHistory(userId) {
    try {
      console.log(`📝 Fetching quiz history for: ${userId}`);

      const allResults = await this.getAllQuizResults();

      // Filter results for this user
      const userResults = allResults.filter(result => result.userId === userId);

      // Sort by date (most recent first)
      userResults.sort((a, b) => {
        const dateA = a.completedAt || new Date(0);
        const dateB = b.completedAt || new Date(0);
        return dateB - dateA;
      });

      console.log(`✅ Loaded ${userResults.length} quiz results for student`);
      return userResults;
    } catch (error) {
      console.error('❌ Error getting student quiz history:', error);
      return [];
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

  // ============================================
  // ANNOUNCEMENTS METHODS
  // ============================================

  // Get all announcements
  static async getAnnouncements() {
    try {
      console.log('📢 Fetching announcements (REST API)...');

      const response = await this.request('/announcements');

      if (!response.documents) {
        console.log('✅ No announcements found');
        return [];
      }

      const announcements = response.documents
        .map(doc => this.convertDocument(doc))
        .sort((a, b) => {
          // Pinned first, then by date
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;

          const dateA = a.createdAt || new Date(0);
          const dateB = b.createdAt || new Date(0);
          return dateB - dateA;
        });

      console.log(`✅ Loaded ${announcements.length} announcements`);
      return announcements;
    } catch (error) {
      console.error('❌ Error getting announcements:', error);
      return [];
    }
  }

  // Create announcement
  static async createAnnouncement(announcementData) {
    try {
      console.log('📢 Creating announcement:', announcementData.title);

      const firestoreData = {
        fields: {
          title: { stringValue: announcementData.title },
          message: { stringValue: announcementData.message },
          isPinned: { booleanValue: announcementData.isPinned || false },
          createdBy: { stringValue: announcementData.createdBy },
          createdByName: { stringValue: announcementData.createdByName || 'Teacher' },
          createdAt: { timestampValue: new Date().toISOString() },
          readBy: { arrayValue: { values: [] } }
        }
      };

      const response = await this.request('/announcements', 'POST', firestoreData);
      console.log('✅ Announcement created successfully');
      return this.convertDocument(response);
    } catch (error) {
      console.error('❌ Error creating announcement:', error);
      throw error;
    }
  }

  // Update announcement
  static async updateAnnouncement(announcementId, updates) {
    try {
      console.log('📢 Updating announcement:', announcementId);

      const fields = {};
      const updateMask = [];

      if (updates.title !== undefined) {
        fields.title = { stringValue: updates.title };
        updateMask.push('title');
      }
      if (updates.message !== undefined) {
        fields.message = { stringValue: updates.message };
        updateMask.push('message');
      }
      if (updates.isPinned !== undefined) {
        fields.isPinned = { booleanValue: updates.isPinned };
        updateMask.push('isPinned');
      }

      const updateData = { fields };
      const maskQuery = updateMask.map(field => `updateMask.fieldPaths=${field}`).join('&');

      await this.request(
        `/announcements/${announcementId}?${maskQuery}`,
        'PATCH',
        updateData
      );

      console.log('✅ Announcement updated successfully');
      return true;
    } catch (error) {
      console.error('❌ Error updating announcement:', error);
      throw error;
    }
  }

  // Delete announcement
  static async deleteAnnouncement(announcementId) {
    try {
      console.log('📢 Deleting announcement:', announcementId);

      await this.request(`/announcements/${announcementId}`, 'DELETE');

      console.log('✅ Announcement deleted successfully');
      return true;
    } catch (error) {
      console.error('❌ Error deleting announcement:', error);
      throw error;
    }
  }

  // Mark announcement as read
  static async markAnnouncementAsRead(announcementId, userId) {
    try {
      console.log(`📢 Marking announcement as read: ${announcementId} by ${userId}`);

      // Get current announcement
      const response = await this.request(`/announcements/${announcementId}`);
      const announcement = this.convertDocument(response);

      // Add userId to readBy array if not already there
      const readBy = announcement.readBy || [];
      if (!readBy.includes(userId)) {
        readBy.push(userId);

        const updateData = {
          fields: {
            readBy: {
              arrayValue: {
                values: readBy.map(id => ({ stringValue: id }))
              }
            }
          }
        };

        await this.request(
          `/announcements/${announcementId}?updateMask.fieldPaths=readBy`,
          'PATCH',
          updateData
        );

        console.log('✅ Announcement marked as read');
      }

      return true;
    } catch (error) {
      console.error('❌ Error marking announcement as read:', error);
      throw error;
    }
  }

  // Create or update user
  static async createOrUpdateUser(userData) {
    try {
      console.log(`👤 Creating/updating user: ${userData.email}`);

      const userDoc = {
        fields: {
          id: { stringValue: userData.id },
          name: { stringValue: userData.name },
          email: { stringValue: userData.email },
          role: { stringValue: userData.role || 'Student' },
          createdAt: { timestampValue: userData.createdAt || new Date().toISOString() },
          lastLogin: { timestampValue: userData.lastLogin || new Date().toISOString() }
        }
      };

      await this.request(`/users/${userData.id}`, 'PATCH', userDoc);
      console.log('✅ User created/updated');
      return userData;
    } catch (error) {
      console.error('❌ Error creating user:', error);
      throw error;
    }
  }

  // Update student progress
  static async updateStudentProgress(userId, progressData) {
    try {
      console.log(`📊 Updating progress for: ${userId}`);

      // Convert moduleProgress to Firestore format
      const moduleProgressFields = {};
      for (const [moduleName, moduleData] of Object.entries(progressData.moduleProgress || {})) {
        moduleProgressFields[moduleName] = {
          mapValue: {
            fields: {
              quizzesCompleted: { integerValue: moduleData.quizzesCompleted || 0 },
              averageScore: { doubleValue: moduleData.averageScore || 0 },
              totalQuestions: { integerValue: moduleData.totalQuestions || 0 },
              correctAnswers: { integerValue: moduleData.correctAnswers || 0 }
            }
          }
        };
      }

      const progressDoc = {
        fields: {
          userId: { stringValue: userId },
          overallStats: {
            mapValue: {
              fields: {
                totalQuizzes: { integerValue: progressData.overallStats.totalQuizzes || 0 },
                averageScore: { doubleValue: progressData.overallStats.averageScore || 0 },
                totalQuestions: { integerValue: progressData.overallStats.totalQuestions || 0 },
                correctAnswers: { integerValue: progressData.overallStats.correctAnswers || 0 },
                lastActivity: { timestampValue: progressData.overallStats.lastActivity || new Date().toISOString() }
              }
            }
          },
          moduleProgress: {
            mapValue: {
              fields: moduleProgressFields
            }
          },
          achievements: {
            arrayValue: {
              values: (progressData.achievements || []).map(a => ({ stringValue: a }))
            }
          },
          createdAt: { timestampValue: progressData.createdAt || new Date().toISOString() },
          updatedAt: { timestampValue: progressData.updatedAt || new Date().toISOString() }
        }
      };

      await this.request(`/student_progress/${userId}`, 'PATCH', progressDoc);
      console.log('✅ Progress updated');
      return progressData;
    } catch (error) {
      console.error('❌ Error updating progress:', error);
      throw error;
    }
  }

  // Save quiz result
  static async saveQuizResult(quizResult) {
    try {
      console.log(`💾 Saving quiz result: ${quizResult.module}`);

      // Generate unique ID for quiz result
      const resultId = `${quizResult.userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const resultDoc = {
        fields: {
          userId: { stringValue: quizResult.userId },
          quizId: { stringValue: quizResult.quizId || quizResult.module },
          module: { stringValue: quizResult.module },
          score: { doubleValue: quizResult.score },
          totalQuestions: { integerValue: quizResult.totalQuestions },
          correctAnswers: { integerValue: quizResult.correctAnswers },
          timeSpent: { integerValue: Math.round(quizResult.timeSpent || 0) },
          completedAt: { timestampValue: quizResult.completedAt },
          answers: {
            arrayValue: {
              values: (quizResult.answers || []).map(a => ({ stringValue: JSON.stringify(a) }))
            }
          }
        }
      };

      await this.request(`/quiz_results/${resultId}`, 'PATCH', resultDoc);
      console.log('✅ Quiz result saved');
      return quizResult;
    } catch (error) {
      console.error('❌ Error saving quiz result:', error);
      throw error;
    }
  }
}

// Make it globally available
window.PethologyFirebaseREST = PethologyFirebaseREST;
