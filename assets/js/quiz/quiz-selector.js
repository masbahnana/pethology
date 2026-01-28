/**
 * Quiz Selector - Handles multiple quizzes per module
 * Part of v5.0 - Multiple Quizzes Modal feature
 */

import { PethologyFirebaseREST } from '../firebase-rest.js';

let selectedQuizData = null;
let examModeEnabled = false;

/**
 * Check if module has multiple quizzes (standard + custom)
 * @param {string} moduleId - Module identifier
 * @param {Object} standardQuiz - Standard quiz data {file, name}
 * @returns {Promise<Array>} Array of available quizzes
 */
export async function getAvailableQuizzes(moduleId, standardQuiz) {
  const quizzes = [];

  // Add standard quiz
  quizzes.push({
    id: 'standard',
    type: 'standard',
    name: `${standardQuiz.name} (Standard)`,
    file: standardQuiz.file,
    module: moduleId,
    questionCount: null, // Will be loaded dynamically
    isCustom: false
  });

  // Fetch custom quizzes from Firestore
  try {
    const response = await PethologyFirebaseREST.request('/custom_quizzes');

    if (response.documents) {
      const customQuizzes = response.documents
        .map(doc => PethologyFirebaseREST.convertDocument(doc))
        .filter(quiz => quiz.module === moduleId);

      customQuizzes.forEach(quiz => {
        quizzes.push({
          id: quiz.id,
          type: 'custom',
          name: quiz.name,
          module: quiz.module,
          questions: quiz.questions,
          questionCount: quiz.questions?.length || 0,
          deadline: quiz.deadline ? new Date(quiz.deadline) : null,
          createdBy: quiz.createdByName || 'Teacher',
          createdAt: new Date(quiz.createdAt),
          isCustom: true
        });
      });
    }
  } catch (error) {
    console.warn('Could not fetch custom quizzes:', error);
  }

  return quizzes;
}

/**
 * Show quiz selection modal
 * @param {Array} quizzes - Available quizzes
 * @param {Function} onSelect - Callback when quiz is selected
 */
export function showQuizSelectionModal(quizzes, onSelect) {
  const modal = document.getElementById('quizSelectionModal');
  const optionsContainer = document.getElementById('quizOptions');
  const startBtn = document.getElementById('startSelectedQuiz');

  selectedQuizData = null;
  startBtn.disabled = true;

  // Check if examMode was passed in URL
  const urlParams = new URLSearchParams(window.location.search);
  const examModeFromUrl = urlParams.get('examMode') === 'true';
  examModeEnabled = examModeFromUrl;

  // Set exam mode checkbox based on URL param
  const examCheckbox = document.getElementById('examModeCheckbox');
  if (examCheckbox) {
    examCheckbox.checked = examModeFromUrl;
  }

  // Render quiz options
  optionsContainer.innerHTML = quizzes.map((quiz, index) => {
    const hasDeadline = quiz.deadline && quiz.deadline > new Date();
    const isPastDeadline = quiz.deadline && quiz.deadline <= new Date();
    const deadlineText = quiz.deadline ?
      (isPastDeadline ? '❌ Deadline passed' : `📅 Due ${quiz.deadline.toLocaleDateString()}`) : '';

    return `
      <label style="display: block; padding: 16px; border: 2px solid #e5e7eb; border-radius: 12px; cursor: pointer; transition: all 0.2s;"
             onclick="selectQuiz(${index})"
             id="quiz-option-${index}">
        <div style="display: flex; align-items: start; gap: 12px;">
          <input type="radio" name="quiz-selection" value="${index}"
                 style="margin-top: 4px; width: 18px; height: 18px; cursor: pointer;">
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 4px;">
              <div>
                <div style="font-weight: 600; font-size: 16px; color: #111827;">${quiz.name}</div>
                <div style="font-size: 13px; color: #6b7280; margin-top: 4px;">
                  ${quiz.questionCount ? `${quiz.questionCount} questions` : 'Loading...'}
                  ${quiz.isCustom ? ` • By ${quiz.createdBy}` : ''}
                </div>
              </div>
              ${quiz.isCustom ?
                '<span style="background: #dbeafe; color: #1e40af; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600;">CUSTOM</span>' :
                '<span style="background: #f3f4f6; color: #6b7280; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600;">STANDARD</span>'
              }
            </div>
            ${deadlineText ?
              `<div style="font-size: 12px; color: ${isPastDeadline ? '#ef4444' : '#f59e0b'}; margin-top: 8px; font-weight: 500;">
                ${deadlineText}
              </div>` : ''
            }
          </div>
        </div>
      </label>
    `;
  }).join('');

  // Setup selection handler
  window.selectQuiz = function(index) {
    selectedQuizData = quizzes[index];
    startBtn.disabled = false;

    // Update UI
    document.querySelectorAll('[id^="quiz-option-"]').forEach((el, i) => {
      if (i === index) {
        el.style.borderColor = '#3b82f6';
        el.style.background = '#eff6ff';
        el.querySelector('input').checked = true;
      } else {
        el.style.borderColor = '#e5e7eb';
        el.style.background = 'white';
        el.querySelector('input').checked = false;
      }
    });
  };

  // Setup exam mode toggle
  window.toggleExamMode = function() {
    const checkbox = document.getElementById('examModeCheckbox');
    examModeEnabled = checkbox.checked;
  };

  // Setup start handler
  window.startSelectedQuiz = function() {
    if (selectedQuizData) {
      // Add exam mode flag to quiz data
      selectedQuizData.examMode = examModeEnabled;
      closeQuizModal();
      onSelect(selectedQuizData);
    }
  };

  // Setup close handler
  window.closeQuizModal = function() {
    modal.style.display = 'none';
    selectedQuizData = null;
  };

  // Show modal
  modal.style.display = 'flex';
}

/**
 * Load and start a quiz (handles both standard and custom)
 * @param {Object} quizData - Selected quiz data
 * @param {Function} loadQuizFn - Original loadQuiz function
 * @param {Function} setQuestionsFn - Function to set currentQuestions
 */
export async function loadSelectedQuiz(quizData, loadQuizFn, setQuestionsFn) {
  if (quizData.type === 'standard') {
    // Load standard quiz from file
    await loadQuizFn(quizData.file, quizData.name);
  } else {
    // Load custom quiz from Firestore data
    console.log('🎯 Loading custom quiz:', quizData.name);

    // Convert custom quiz format to expected format
    const questions = quizData.questions.map(q => ({
      question: q.question,
      options: [q.optionA, q.optionB, q.optionC, q.optionD],
      answer: q.correctAnswer,
      explanation: q.explanation
    }));

    // Set the questions and start quiz
    setQuestionsFn(questions, quizData.name);
  }
}
