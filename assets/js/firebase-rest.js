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
    // Add API key for authentication
    const separator = path.includes('?') ? '&' : '?';
    const url = `${FIREBASE_CONFIG.databaseURL}${path}${separator}key=${FIREBASE_CONFIG.apiKey}`;

    console.log(`🔥 REST ${method}: ${path}`);

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
      console.log(`🔥 Request body:`, body);
    }

    try {
      const response = await fetch(url, options);
      const responseText = await response.text();

      console.log(`🔥 Response status: ${response.status}`);

      // For GET requests, return null for 404 (document not found) instead of throwing
      if (response.status === 404 && method === 'GET') {
        console.log(`🔥 Document not found (404), returning null`);
        return null;
      }

      if (!response.ok) {
        console.error(`🔥 Response body:`, responseText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return responseText ? JSON.parse(responseText) : {};
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
      else if (value.arrayValue !== undefined) {
        // Recursively convert map objects inside arrays
        data[key] = (value.arrayValue.values || []).map(item => {
          if (item.mapValue) {
            return this.convertDocument({ fields: item.mapValue.fields });
          } else if (item.stringValue !== undefined) {
            return item.stringValue;
          } else if (item.integerValue !== undefined) {
            return parseInt(item.integerValue);
          } else if (item.doubleValue !== undefined) {
            return parseFloat(item.doubleValue);
          } else if (item.booleanValue !== undefined) {
            return item.booleanValue;
          }
          return item;
        });
      }
      else if (value.mapValue !== undefined) data[key] = this.convertDocument({ fields: value.mapValue.fields });
    }

    // Fallback: use userId as id if no doc.name
    if (!data.id && data.userId) {
      data.id = data.userId;
    }

    return data;
  }

  // Get pre-registered students for a specific teacher (legacy - by addedBy)
  static async getPreRegisteredStudentsByTeacher(teacherId) {
    try {
      console.log(`📋 Fetching pre-registered students for teacher: ${teacherId}`);

      const response = await this.request('/pre_registered_students');

      if (!response || !response.documents) {
        return [];
      }

      const students = response.documents
        .map(doc => this.convertDocument(doc))
        .filter(student => student && student.addedBy === teacherId);

      console.log(`✅ Found ${students.length} pre-registered students for this teacher`);
      return students;
    } catch (error) {
      console.error('Error getting pre-registered students:', error);
      return [];
    }
  }

  // Get all teachers from the system
  static async getAllTeachers() {
    try {
      console.log('👩‍🏫 Fetching all teachers (REST API)...');

      const response = await this.request('/users');

      if (!response || !response.documents) {
        console.log('✅ Loaded 0 teachers');
        return [];
      }

      const teachers = response.documents
        .map(doc => this.convertDocument(doc))
        .filter(user => user && user.role === 'Teacher');

      teachers.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

      console.log(`✅ Loaded ${teachers.length} teachers (REST API)`);
      return teachers;
    } catch (error) {
      console.error('Error getting teachers:', error);
      return [];
    }
  }

  // Get all students - optionally filtered by teacher or classId
  // Priority: classId > teacherId (if both provided, classId wins)
  static async getAllStudents(teacherId = null, classId = null) {
    try {
      console.log('📋 Fetching students (REST API)...', classId ? `for class ${classId}` : teacherId ? `for teacher ${teacherId}` : '(all)');

      let allowedEmails = null;

      // If classId is provided, filter by class
      if (classId) {
        const preRegistered = await this.getStudentsByClass(classId);
        allowedEmails = preRegistered.map(s => s.email?.toLowerCase());
        console.log(`📋 Allowed emails for class:`, allowedEmails);
      }
      // Otherwise, filter by teacherId if provided
      else if (teacherId) {
        const preRegistered = await this.getPreRegisteredStudentsByTeacher(teacherId);
        allowedEmails = preRegistered.map(s => s.email?.toLowerCase());
        console.log(`📋 Allowed emails for this teacher:`, allowedEmails);
      }

      const response = await this.request('/users');

      if (!response || !response.documents) {
        console.log('✅ Loaded 0 students');
        return [];
      }

      let students = response.documents
        .map(doc => this.convertDocument(doc))
        .filter(user => user && user.role === 'Student');

      // Filter by allowed emails if filtering is active
      if (allowedEmails) {
        students = students.filter(student =>
          allowedEmails.includes(student.email?.toLowerCase())
        );
      }

      students.sort((a, b) => {
        const dateA = a.lastLogin || new Date(0);
        const dateB = b.lastLogin || new Date(0);
        return dateB - dateA;
      });

      console.log(`✅ Loaded ${students.length} students (REST API)`);
      return students;
    } catch (error) {
      console.error('Error getting students:', error);
      return [];
    }
  }

  // Get all students progress - calculated dynamically from quiz_results
  static async getAllStudentsProgress(teacherId = null, classId = null) {
    try {
      console.log('📊 Calculating students progress (REST API)...', classId ? `for class ${classId}` : teacherId ? `for teacher ${teacherId}` : '(all)');

      // Get students (filtered by class or teacher)
      const students = await this.getAllStudents(teacherId, classId);

      if (students.length === 0) {
        console.log('✅ No students found');
        return [];
      }

      // Get all quiz results once
      const allQuizResults = await this.getAllQuizResults();

      // Calculate progress for each student - include student data for merge
      const progressList = students.map(student => {
        const studentQuizzes = allQuizResults.filter(q => q.userId === student.id);

        // Base progress object with student identifiers
        const baseProgress = {
          userId: student.id,
          id: student.id,
          name: student.name,
          email: student.email,
          lastLogin: student.lastLogin
        };

        if (studentQuizzes.length === 0) {
          return {
            ...baseProgress,
            overallStats: { totalQuizzes: 0, averageScore: 0, streak: 0 },
            moduleProgress: {}
          };
        }

        // Calculate overall stats
        const totalQuizzes = studentQuizzes.length;
        // Score is stored as fraction (0-1), convert to percentage (0-100)
        const totalScore = studentQuizzes.reduce((sum, q) => sum + (q.score || 0), 0);
        const averageScore = Math.round((totalScore / totalQuizzes) * 100);

        // Calculate module progress
        const moduleProgress = {};
        studentQuizzes.forEach(quiz => {
          const module = quiz.quizId || quiz.type || 'unknown';
          if (!moduleProgress[module]) {
            moduleProgress[module] = { completed: 0, totalScore: 0, bestScore: 0 };
          }
          moduleProgress[module].completed++;
          moduleProgress[module].totalScore += (quiz.score || 0);
          moduleProgress[module].bestScore = Math.max(moduleProgress[module].bestScore, quiz.score || 0);
        });

        // Convert module scores to percentage
        Object.keys(moduleProgress).forEach(module => {
          const m = moduleProgress[module];
          m.averageScore = Math.round((m.totalScore / m.completed) * 100);
          m.completion = Math.round(m.bestScore * 100);
        });

        return {
          ...baseProgress,
          overallStats: { totalQuizzes, averageScore, streak: 0 },
          moduleProgress
        };
      });

      console.log(`✅ Calculated progress for ${progressList.length} students (REST API)`);
      return progressList;
    } catch (error) {
      console.error('Error calculating students progress:', error);
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

  // Get teacher analytics - filtered by teacher's students or classId
  static async getTeacherAnalytics(teacherId = null, classId = null) {
    try {
      console.log('📈 Generating teacher analytics (REST API)...', classId ? `for class ${classId}` : teacherId ? `for teacher ${teacherId}` : '(all)');

      const [students, allQuizResults] = await Promise.all([
        this.getAllStudents(teacherId, classId),
        this.getAllQuizResults()
      ]);

      // Filter quiz results to only include students in the class/teacher
      const studentIds = students.map(s => s.id);
      const quizResults = (teacherId || classId)
        ? allQuizResults.filter(r => studentIds.includes(r.userId))
        : allQuizResults;

      // Calculate analytics
      const totalStudents = students.length;
      const activeStudents = students.filter(s => {
        if (!s.lastLogin) return false;
        const daysSinceLogin = (Date.now() - s.lastLogin.getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceLogin <= 7;
      }).length;

      const completedQuizzes = quizResults.filter(r => r.completed).length;
      const totalQuizzes = quizResults.length;
      // Score is stored as decimal (0-1), convert to percentage (0-100)
      const averageScore = totalQuizzes > 0
        ? Math.round((quizResults.reduce((sum, r) => sum + (r.score || 0), 0) / totalQuizzes) * 100)
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

  // Get student progress calculated from quiz_results
  static async getStudentProgress(userId) {
    try {
      // Fetch all quiz results for this user
      const quizHistory = await this.getStudentQuizHistory(userId);

      if (!quizHistory || quizHistory.length === 0) {
        return {
          overallStats: { totalQuizzes: 0, averageScore: 0, streak: 0 },
          moduleProgress: {},
          achievements: []
        };
      }

      // Calculate overall stats
      const totalQuizzes = quizHistory.length;
      // Score is stored as fraction (0-1), sum them up
      const totalScore = quizHistory.reduce((sum, q) => sum + (q.score || 0), 0);
      // Convert average from fraction to percentage (0-100)
      const averageScore = Math.round((totalScore / totalQuizzes) * 100);

      // Calculate module progress
      const moduleProgress = {};
      quizHistory.forEach(quiz => {
        const module = quiz.quizId || quiz.type || 'unknown';
        if (!moduleProgress[module]) {
          moduleProgress[module] = { completed: 0, totalScore: 0, bestScore: 0 };
        }
        moduleProgress[module].completed++;
        moduleProgress[module].totalScore += (quiz.score || 0);
        moduleProgress[module].bestScore = Math.max(moduleProgress[module].bestScore, quiz.score || 0);
      });

      // Calculate average per module and completion percentage
      Object.keys(moduleProgress).forEach(module => {
        const m = moduleProgress[module];
        // Score is stored as fraction (0-1), convert to percentage (0-100)
        m.averageScore = Math.round((m.totalScore / m.completed) * 100);
        // Best score as completion percentage (convert from 0-1 to 0-100)
        m.completion = Math.round(m.bestScore * 100);
      });

      // Calculate streak (consecutive days with quizzes)
      let streak = 0;
      if (quizHistory.length > 0) {
        const sortedByDate = [...quizHistory].sort((a, b) => {
          const dateA = a.completedAt ? new Date(a.completedAt) : new Date(0);
          const dateB = b.completedAt ? new Date(b.completedAt) : new Date(0);
          return dateB - dateA;
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let checkDate = new Date(today);
        for (const quiz of sortedByDate) {
          const quizDate = quiz.completedAt ? new Date(quiz.completedAt) : null;
          if (!quizDate) continue;
          quizDate.setHours(0, 0, 0, 0);

          const diffDays = Math.floor((checkDate - quizDate) / (1000 * 60 * 60 * 24));
          if (diffDays <= 1) {
            streak++;
            checkDate = quizDate;
          } else {
            break;
          }
        }
      }

      console.log(`📊 Calculated progress for ${userId}: ${totalQuizzes} quizzes, ${averageScore}% avg, ${streak} streak`);

      return {
        overallStats: { totalQuizzes, averageScore, streak },
        moduleProgress,
        achievements: [] // TODO: Calculate achievements
      };
    } catch (error) {
      console.error('❌ Error calculating student progress:', error);
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
      console.log(`📝 Fetching quiz history for userId: "${userId}"`);

      const allResults = await this.getAllQuizResults();
      console.log(`📝 Total quiz results in DB: ${allResults.length}`);

      // Debug: show all userIds in results
      if (allResults.length > 0) {
        const uniqueUserIds = [...new Set(allResults.map(r => r.userId))];
        console.log(`📝 Unique userIds in DB:`, uniqueUserIds);
      }

      // Filter results for this user
      const userResults = allResults.filter(result => result.userId === userId);

      // Sort by date (most recent first)
      userResults.sort((a, b) => {
        const dateA = a.completedAt || new Date(0);
        const dateB = b.completedAt || new Date(0);
        return dateB - dateA;
      });

      console.log(`✅ Loaded ${userResults.length} quiz results for this student`);
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
  // If teacherId is provided, only returns students added by that teacher
  static async getAllPreRegisteredStudents(teacherId = null) {
    try {
      console.log('📋 Fetching pre-registered students...', teacherId ? `for teacher ${teacherId}` : '(all)');

      const response = await this.request('/pre_registered_students');

      if (!response.documents) {
        console.log('✅ No pre-registered students found');
        return [];
      }

      let students = response.documents
        .map(doc => this.convertDocument(doc));

      // Filter by teacher if provided
      if (teacherId) {
        students = students.filter(s => s.addedBy === teacherId);
      }

      students.sort((a, b) => {
        const dateA = a.addedAt || new Date(0);
        const dateB = b.addedAt || new Date(0);
        return dateB - dateA;
      });

      console.log(`✅ Loaded ${students.length} pre-registered students`);
      return students;
    } catch (error) {
      console.error('Error getting pre-registered students:', error);
      return [];
    }
  }

  // ============================================
  // CLASSES METHODS
  // ============================================

  // Get all classes for a teacher (owned or assigned)
  static async getTeacherClasses(teacherId) {
    try {
      console.log(`🏫 Fetching classes for teacher: ${teacherId}`);

      const response = await this.request('/classes');

      if (!response || !response.documents) {
        console.log('✅ No classes found');
        return [];
      }

      const allClasses = response.documents.map(doc => this.convertDocument(doc));

      // Filter: classes where teacher is owner OR is in teachers array
      const teacherClasses = allClasses.filter(cls => {
        if (cls.ownerId === teacherId) return true;
        if (cls.teachers && Array.isArray(cls.teachers)) {
          return cls.teachers.some(t => t.teacherId === teacherId);
        }
        return false;
      });

      console.log(`✅ Found ${teacherClasses.length} classes for this teacher`);
      return teacherClasses;
    } catch (error) {
      console.error('Error getting teacher classes:', error);
      return [];
    }
  }

  // Get a single class by ID
  static async getClass(classId) {
    try {
      console.log(`🏫 Fetching class: ${classId}`);

      const response = await this.request(`/classes/${classId}`);

      if (!response) {
        return null;
      }

      return this.convertDocument(response);
    } catch (error) {
      console.error('Error getting class:', error);
      return null;
    }
  }

  // Create a new class
  static async createClass(classData) {
    try {
      console.log('🏫 Creating class:', classData.name);

      // Generate unique ID
      const classId = `class_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const firestoreData = {
        fields: {
          name: { stringValue: classData.name },
          academicYear: { stringValue: classData.academicYear || '' },
          description: { stringValue: classData.description || '' },
          ownerId: { stringValue: classData.ownerId },
          ownerName: { stringValue: classData.ownerName || '' },
          createdAt: { timestampValue: new Date().toISOString() },
          teachers: {
            arrayValue: {
              values: [{
                mapValue: {
                  fields: {
                    teacherId: { stringValue: classData.ownerId },
                    teacherName: { stringValue: classData.ownerName || '' },
                    modules: { arrayValue: { values: [{ stringValue: 'all' }] } }
                  }
                }
              }]
            }
          }
        }
      };

      await this.request(`/classes/${classId}`, 'PATCH', firestoreData);
      console.log('✅ Class created successfully:', classId);

      return { id: classId, ...classData };
    } catch (error) {
      console.error('❌ Error creating class:', error);
      throw error;
    }
  }

  // Update class info
  static async updateClass(classId, updates) {
    try {
      console.log('🏫 Updating class:', classId);

      const fields = {};
      const updateMask = [];

      if (updates.name !== undefined) {
        fields.name = { stringValue: updates.name };
        updateMask.push('name');
      }
      if (updates.academicYear !== undefined) {
        fields.academicYear = { stringValue: updates.academicYear };
        updateMask.push('academicYear');
      }
      if (updates.description !== undefined) {
        fields.description = { stringValue: updates.description };
        updateMask.push('description');
      }

      const updateData = { fields };
      const maskQuery = updateMask.map(field => `updateMask.fieldPaths=${field}`).join('&');

      await this.request(`/classes/${classId}?${maskQuery}`, 'PATCH', updateData);

      console.log('✅ Class updated successfully');
      return true;
    } catch (error) {
      console.error('❌ Error updating class:', error);
      throw error;
    }
  }

  // Delete a class
  static async deleteClass(classId) {
    try {
      console.log('🏫 Deleting class:', classId);

      await this.request(`/classes/${classId}`, 'DELETE');

      console.log('✅ Class deleted successfully');
      return true;
    } catch (error) {
      console.error('❌ Error deleting class:', error);
      throw error;
    }
  }

  // Add teacher to class with module permissions
  static async addTeacherToClass(classId, teacherData) {
    try {
      console.log(`🏫 Adding teacher ${teacherData.teacherId} to class ${classId}`);

      // Get current class
      const cls = await this.getClass(classId);
      if (!cls) {
        throw new Error('Class not found');
      }

      // Add new teacher to array
      const teachers = cls.teachers || [];

      // Check if teacher already exists
      const existingIndex = teachers.findIndex(t => t.teacherId === teacherData.teacherId);
      if (existingIndex >= 0) {
        // Update existing teacher's modules
        teachers[existingIndex].modules = teacherData.modules;
      } else {
        teachers.push({
          teacherId: teacherData.teacherId,
          teacherName: teacherData.teacherName || '',
          modules: teacherData.modules || ['all']
        });
      }

      // Update class with new teachers array
      const updateData = {
        fields: {
          teachers: {
            arrayValue: {
              values: teachers.map(t => ({
                mapValue: {
                  fields: {
                    teacherId: { stringValue: t.teacherId },
                    teacherName: { stringValue: t.teacherName || '' },
                    modules: {
                      arrayValue: {
                        values: (t.modules || []).map(m => ({ stringValue: m }))
                      }
                    }
                  }
                }
              }))
            }
          }
        }
      };

      await this.request(`/classes/${classId}?updateMask.fieldPaths=teachers`, 'PATCH', updateData);

      console.log('✅ Teacher added to class successfully');
      return true;
    } catch (error) {
      console.error('❌ Error adding teacher to class:', error);
      throw error;
    }
  }

  // Remove teacher from class
  static async removeTeacherFromClass(classId, teacherId) {
    try {
      console.log(`🏫 Removing teacher ${teacherId} from class ${classId}`);

      // Get current class
      const cls = await this.getClass(classId);
      if (!cls) {
        throw new Error('Class not found');
      }

      // Remove teacher from array
      const teachers = (cls.teachers || []).filter(t => t.teacherId !== teacherId);

      // Update class with new teachers array
      const updateData = {
        fields: {
          teachers: {
            arrayValue: {
              values: teachers.map(t => ({
                mapValue: {
                  fields: {
                    teacherId: { stringValue: t.teacherId },
                    teacherName: { stringValue: t.teacherName || '' },
                    modules: {
                      arrayValue: {
                        values: (t.modules || []).map(m => ({ stringValue: m }))
                      }
                    }
                  }
                }
              }))
            }
          }
        }
      };

      await this.request(`/classes/${classId}?updateMask.fieldPaths=teachers`, 'PATCH', updateData);

      console.log('✅ Teacher removed from class successfully');
      return true;
    } catch (error) {
      console.error('❌ Error removing teacher from class:', error);
      throw error;
    }
  }

  // Get students by class ID
  static async getStudentsByClass(classId) {
    try {
      console.log(`🏫 Fetching students for class: ${classId}`);

      const response = await this.request('/pre_registered_students');

      if (!response || !response.documents) {
        return [];
      }

      const students = response.documents
        .map(doc => this.convertDocument(doc))
        .filter(student => student && student.classId === classId);

      console.log(`✅ Found ${students.length} students in class ${classId}`);
      return students;
    } catch (error) {
      console.error('Error getting students by class:', error);
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
      console.log('📢 Raw announcement response:', response);

      const announcement = this.convertDocument(response);
      console.log('📢 Converted announcement:', announcement);
      console.log('📢 Current readBy:', announcement.readBy);

      // Add userId to readBy array if not already there
      const readBy = announcement.readBy || [];
      console.log('📢 ReadBy array:', readBy);
      console.log('📢 User already read?', readBy.includes(userId));

      if (!readBy.includes(userId)) {
        readBy.push(userId);
        console.log('📢 New readBy array:', readBy);

        const updateData = {
          fields: {
            readBy: {
              arrayValue: {
                values: readBy.map(id => ({ stringValue: id }))
              }
            }
          }
        };

        console.log('📢 Update data:', JSON.stringify(updateData, null, 2));

        const updateResponse = await this.request(
          `/announcements/${announcementId}?updateMask.fieldPaths=readBy`,
          'PATCH',
          updateData
        );

        console.log('📢 Update response:', updateResponse);
        console.log('✅ Announcement marked as read');
      } else {
        console.log('📢 User already in readBy, skipping update');
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
