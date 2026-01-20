/**
 * Support Modal Component
 * Reusable component for submitting support tickets
 * Includes reporting guidelines, auto-captured metadata, and Firebase integration
 */

class SupportModal {
  constructor() {
    this.modal = null;
    this.currentUser = null;
    this.init();
  }

  init() {
    // Get current user from session storage
    const userDataStr = sessionStorage.getItem('userData');
    if (userDataStr) {
      this.currentUser = JSON.parse(userDataStr);
    }

    // Create modal HTML
    this.createModal();

    // Add event listeners
    this.attachEventListeners();
  }

  createModal() {
    const modalHTML = `
      <div id="support-modal-overlay" class="support-modal-overlay">
        <div class="support-modal">
          <div class="support-modal-header">
            <h2 class="support-modal-title">Report an Issue</h2>
            <button class="support-modal-close" onclick="window.supportModal.close()">
              <i data-lucide="x"></i>
            </button>
          </div>

          <div class="support-modal-body">
            <!-- Reporting Guidelines -->
            <div class="support-guidelines">
              <div class="support-guidelines-header">
                <i data-lucide="info"></i>
                <span>How to Report an Issue</span>
              </div>
              <div class="support-guidelines-content">
                <p>Please provide:</p>
                <ul>
                  <li>✓ What you were trying to do</li>
                  <li>✓ What happened instead</li>
                  <li>✓ Steps to reproduce (1, 2, 3...)</li>
                  <li>✓ Browser: Chrome, Safari, Firefox, Edge</li>
                  <li>✓ Device: Desktop, Tablet, Mobile</li>
                  <li>✓ Page where it happened (auto-filled)</li>
                </ul>
              </div>
            </div>

            <!-- Support Form -->
            <form id="support-form" class="support-form">
              <!-- Subject -->
              <div class="support-form-group">
                <label for="support-subject">Subject *</label>
                <select id="support-subject" required>
                  <option value="">Select a category...</option>
                  <option value="Login Issue">Login Issue</option>
                  <option value="Quiz Problem">Quiz Problem</option>
                  <option value="Display Issue">Display Issue</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <!-- Description -->
              <div class="support-form-group">
                <label for="support-description">Description *</label>
                <textarea
                  id="support-description"
                  rows="6"
                  placeholder="Please describe the issue in detail..."
                  minlength="20"
                  required
                ></textarea>
                <div class="support-form-hint">Minimum 20 characters</div>
              </div>

              <!-- Browser -->
              <div class="support-form-group">
                <label for="support-browser">Browser *</label>
                <input
                  type="text"
                  id="support-browser"
                  placeholder="e.g., Chrome, Safari, Firefox"
                  required
                />
              </div>

              <!-- Device -->
              <div class="support-form-group">
                <label for="support-device">Device *</label>
                <select id="support-device" required>
                  <option value="">Select device type...</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Mobile">Mobile</option>
                </select>
              </div>

              <!-- Screenshot Upload (Optional) -->
              <div class="support-form-group">
                <label for="support-screenshot">Screenshot (optional)</label>
                <input
                  type="file"
                  id="support-screenshot"
                  accept="image/*"
                />
                <div class="support-form-hint">Upload a screenshot if it helps explain the issue</div>
              </div>

              <!-- Auto-filled metadata (hidden) -->
              <input type="hidden" id="support-page-url" />
              <input type="hidden" id="support-user-agent" />
              <input type="hidden" id="support-screen-size" />
            </form>
          </div>

          <div class="support-modal-footer">
            <button type="button" class="support-btn support-btn-secondary" onclick="window.supportModal.close()">
              Cancel
            </button>
            <button type="button" class="support-btn support-btn-primary" onclick="window.supportModal.submit()">
              <i data-lucide="send"></i>
              Submit Report
            </button>
          </div>
        </div>
      </div>
    `;

    // Add modal to body
    const container = document.createElement('div');
    container.innerHTML = modalHTML;
    document.body.appendChild(container.firstElementChild);

    this.modal = document.getElementById('support-modal-overlay');

    // Add styles
    this.addStyles();
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .support-modal-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        overflow-y: auto;
        padding: 20px;
      }

      .support-modal-overlay.active {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .support-modal {
        background: white;
        border-radius: 12px;
        max-width: 600px;
        width: 100%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-height: 90vh;
        display: flex;
        flex-direction: column;
      }

      .support-modal-header {
        padding: 20px 24px;
        border-bottom: 1px solid #e9e9e7;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .support-modal-title {
        font-size: 20px;
        font-weight: 600;
        color: #37352f;
        margin: 0;
      }

      .support-modal-close {
        background: none;
        border: none;
        color: #787774;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .support-modal-close:hover {
        background: #f1f1ef;
      }

      .support-modal-body {
        padding: 24px;
        overflow-y: auto;
        flex: 1;
      }

      .support-guidelines {
        background: #e3f2fd;
        border: 1px solid #2196f3;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 24px;
      }

      .support-guidelines-header {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        color: #1976d2;
        margin-bottom: 8px;
      }

      .support-guidelines-header i {
        width: 18px;
        height: 18px;
      }

      .support-guidelines-content {
        color: #1565c0;
        font-size: 14px;
        line-height: 1.6;
      }

      .support-guidelines-content p {
        margin: 0 0 8px 0;
        font-weight: 500;
      }

      .support-guidelines-content ul {
        margin: 0;
        padding-left: 20px;
      }

      .support-guidelines-content li {
        margin-bottom: 4px;
      }

      .support-form-group {
        margin-bottom: 20px;
      }

      .support-form-group label {
        display: block;
        font-weight: 600;
        color: #37352f;
        margin-bottom: 8px;
        font-size: 14px;
      }

      .support-form-group input[type="text"],
      .support-form-group select,
      .support-form-group textarea {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #e9e9e7;
        border-radius: 6px;
        font-size: 14px;
        font-family: inherit;
        transition: border-color 150ms ease;
      }

      .support-form-group input[type="text"]:focus,
      .support-form-group select:focus,
      .support-form-group textarea:focus {
        outline: none;
        border-color: #2383e2;
      }

      .support-form-group textarea {
        resize: vertical;
        min-height: 120px;
      }

      .support-form-group input[type="file"] {
        width: 100%;
        padding: 8px;
        border: 1px dashed #e9e9e7;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
      }

      .support-form-hint {
        font-size: 12px;
        color: #787774;
        margin-top: 4px;
      }

      .support-modal-footer {
        padding: 16px 24px;
        border-top: 1px solid #e9e9e7;
        display: flex;
        justify-content: flex-end;
        gap: 12px;
      }

      .support-btn {
        padding: 10px 20px;
        border-radius: 6px;
        border: none;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 150ms ease;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .support-btn-secondary {
        background: #f1f1ef;
        color: #37352f;
      }

      .support-btn-secondary:hover {
        background: #e9e9e7;
      }

      .support-btn-primary {
        background: #2383e2;
        color: white;
      }

      .support-btn-primary:hover {
        background: #1a73d1;
      }

      .support-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      @media (max-width: 768px) {
        .support-modal {
          max-width: 100%;
          margin: 20px;
        }

        .support-modal-body {
          padding: 16px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  attachEventListeners() {
    // Close on overlay click
    this.modal.addEventListener('click', (e) => {
      if (e.target.id === 'support-modal-overlay') {
        this.close();
      }
    });

    // Auto-detect browser
    const browserInput = document.getElementById('support-browser');
    browserInput.value = this.detectBrowser();
  }

  detectBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Edge')) return 'Chrome';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  open() {
    // Auto-fill metadata
    document.getElementById('support-page-url').value = window.location.href;
    document.getElementById('support-user-agent').value = navigator.userAgent;
    document.getElementById('support-screen-size').value = `${window.screen.width}x${window.screen.height}`;

    // Show modal
    this.modal.classList.add('active');

    // Re-initialize Lucide icons
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  close() {
    this.modal.classList.remove('active');
    document.getElementById('support-form').reset();
    document.getElementById('support-browser').value = this.detectBrowser();
  }

  async submit() {
    const form = document.getElementById('support-form');

    // Validate form
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Get form data
    const subject = document.getElementById('support-subject').value;
    const description = document.getElementById('support-description').value;
    const browser = document.getElementById('support-browser').value;
    const device = document.getElementById('support-device').value;
    const pageUrl = document.getElementById('support-page-url').value;
    const userAgent = document.getElementById('support-user-agent').value;
    const screenSize = document.getElementById('support-screen-size').value;

    // Check description length
    if (description.length < 20) {
      if (window.showToast) {
        window.showToast('Please provide a more detailed description (minimum 20 characters)', 'error');
      } else {
        alert('Please provide a more detailed description (minimum 20 characters)');
      }
      return;
    }

    // Disable submit button
    const submitBtn = document.querySelector('.support-btn-primary');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i data-lucide="loader"></i> Submitting...';
    if (window.lucide) lucide.createIcons();

    try {
      // Prepare ticket data
      const ticketData = {
        fields: {
          userEmail: { stringValue: this.currentUser?.email || 'unknown' },
          userName: { stringValue: this.currentUser?.name || 'Unknown User' },
          userRole: { stringValue: this.currentUser?.role || 'Unknown' },
          subject: { stringValue: subject },
          description: { stringValue: description },
          browser: { stringValue: browser },
          device: { stringValue: device },
          pageUrl: { stringValue: pageUrl },
          userAgent: { stringValue: userAgent },
          screenSize: { stringValue: screenSize },
          status: { stringValue: 'open' },
          priority: { stringValue: 'medium' },
          createdAt: { timestampValue: new Date().toISOString() }
        }
      };

      // Submit to Firebase
      const response = await window.PethologyFirebaseREST.request('/support_tickets', {
        method: 'POST',
        body: JSON.stringify(ticketData)
      });

      if (response && response.name) {
        // Success
        if (window.showToast) {
          window.showToast('Support ticket submitted successfully! We\'ll review it shortly.', 'success');
        } else {
          alert('Support ticket submitted successfully! We\'ll review it shortly.');
        }
        this.close();
      } else {
        throw new Error('Failed to create ticket');
      }

    } catch (error) {
      console.error('Error submitting support ticket:', error);
      if (window.showToast) {
        window.showToast('Failed to submit ticket. Please try again.', 'error');
      } else {
        alert('Failed to submit ticket. Please try again.');
      }
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i data-lucide="send"></i> Submit Report';
      if (window.lucide) lucide.createIcons();
    }
  }
}

// Initialize support modal when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.supportModal = new SupportModal();
  });
} else {
  window.supportModal = new SupportModal();
}
