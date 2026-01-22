// Announcements Management for Pethology - REST API Version
import { PethologyFirebaseREST } from './firebase-rest.js';

/**
 * Show modal to create a new announcement
 */
export function showCreateAnnouncementModal() {
  const modal = document.getElementById('announcementModal');
  const form = document.getElementById('announcementForm');

  // Reset form
  form.reset();
  form.dataset.mode = 'create';
  delete form.dataset.announcementId;

  // Update modal title
  document.getElementById('announcementModalTitle').textContent = 'Create Announcement';

  // Show modal
  modal.style.display = 'flex';
}

/**
 * Show modal to edit an announcement
 */
export async function showEditAnnouncementModal(announcementId) {
  const modal = document.getElementById('announcementModal');
  const form = document.getElementById('announcementForm');

  // Get announcement data
  const announcements = await PethologyFirebaseREST.getAnnouncements();
  const announcement = announcements.find(a => a.id === announcementId);

  if (!announcement) {
    console.error('Announcement not found:', announcementId);
    return;
  }

  // Fill form with announcement data
  document.getElementById('announcementTitle').value = announcement.title;
  document.getElementById('announcementMessage').value = announcement.message;
  document.getElementById('announcementPinned').checked = announcement.isPinned || false;

  // Set form mode
  form.dataset.mode = 'edit';
  form.dataset.announcementId = announcementId;

  // Update modal title
  document.getElementById('announcementModalTitle').textContent = 'Edit Announcement';

  // Show modal
  modal.style.display = 'flex';
}

/**
 * Close announcement modal
 */
export function closeAnnouncementModal() {
  const modal = document.getElementById('announcementModal');
  modal.style.display = 'none';
}

/**
 * Handle announcement form submission
 */
export async function handleAnnouncementSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const mode = form.dataset.mode;
  const announcementId = form.dataset.announcementId;

  // Get form data
  const title = document.getElementById('announcementTitle').value.trim();
  const message = document.getElementById('announcementMessage').value.trim();
  const isPinned = document.getElementById('announcementPinned').checked;

  if (!title || !message) {
    alert('Please fill in all fields');
    return;
  }

  try {
    // Get current user
    const userSession = sessionStorage.getItem('pethologyUser');
    if (!userSession) {
      alert('User session not found. Please log in again.');
      return;
    }

    const user = JSON.parse(userSession);

    if (mode === 'create') {
      // Create new announcement
      const announcementData = {
        title,
        message,
        isPinned,
        createdBy: user.id,
        createdByName: user.name
      };

      await PethologyFirebaseREST.createAnnouncement(announcementData);
      console.log('✅ Announcement created successfully');

    } else if (mode === 'edit') {
      // Update existing announcement
      const updates = {
        title,
        message,
        isPinned
      };

      await PethologyFirebaseREST.updateAnnouncement(announcementId, updates);
      console.log('✅ Announcement updated successfully');
    }

    // Close modal
    closeAnnouncementModal();

    // Reload announcements list
    if (typeof window.loadAnnouncementsList === 'function') {
      await window.loadAnnouncementsList();
    }

    // Show success message
    showSuccessMessage(mode === 'create' ? 'Announcement created!' : 'Announcement updated!');

  } catch (error) {
    console.error('❌ Error saving announcement:', error);
    alert('Error saving announcement. Please try again.');
  }
}

/**
 * Delete an announcement
 */
export async function deleteAnnouncement(announcementId) {
  if (!confirm('Are you sure you want to delete this announcement?')) {
    return;
  }

  try {
    await PethologyFirebaseREST.deleteAnnouncement(announcementId);
    console.log('✅ Announcement deleted successfully');

    // Reload announcements list
    if (typeof window.loadAnnouncementsList === 'function') {
      await window.loadAnnouncementsList();
    }

    showSuccessMessage('Announcement deleted!');

  } catch (error) {
    console.error('❌ Error deleting announcement:', error);
    alert('Error deleting announcement. Please try again.');
  }
}

/**
 * Load and display announcements list (for teacher dashboard)
 */
export async function loadAnnouncementsList() {
  try {
    const announcements = await PethologyFirebaseREST.getAnnouncements();
    const container = document.getElementById('announcementsListContainer');

    if (!container) {
      console.warn('Announcements container not found');
      return;
    }

    if (announcements.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--gray-500);">
          <i data-lucide="megaphone" style="width: 48px; height: 48px; margin-bottom: 12px;"></i>
          <p>No announcements yet</p>
          <p style="font-size: 13px;">Create your first announcement to communicate with students!</p>
        </div>
      `;
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
      return;
    }

    container.innerHTML = announcements.map(announcement => {
      const date = announcement.createdAt;
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      return `
        <div class="announcement-item ${announcement.isPinned ? 'pinned' : ''}">
          <div class="announcement-header">
            <div>
              ${announcement.isPinned ? '<span class="pinned-badge"><i data-lucide="pin"></i> Pinned</span>' : ''}
              <h4 class="announcement-item-title">${announcement.title}</h4>
              <p class="announcement-item-date">${formattedDate} • by ${announcement.createdByName || 'Teacher'}</p>
            </div>
            <div class="announcement-actions">
              <button onclick="window.editAnnouncement('${announcement.id}')" class="btn-icon" title="Edit">
                <i data-lucide="edit-2"></i>
              </button>
              <button onclick="window.deleteAnnouncement('${announcement.id}')" class="btn-icon" title="Delete">
                <i data-lucide="trash-2"></i>
              </button>
            </div>
          </div>
          <p class="announcement-item-message">${announcement.message}</p>
          <div class="announcement-stats">
            <span><i data-lucide="eye"></i> Read by ${announcement.readBy?.length || 0} students</span>
          </div>
        </div>
      `;
    }).join('');

    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

  } catch (error) {
    console.error('❌ Error loading announcements:', error);
  }
}

/**
 * Load and display announcements for students
 */
export async function loadStudentAnnouncements() {
  try {
    const announcements = await PethologyFirebaseREST.getAnnouncements();

    // Get current user
    const userSession = sessionStorage.getItem('pethologyUser');
    if (!userSession) {
      return;
    }
    const user = JSON.parse(userSession);

    // Separate pinned and regular announcements
    const pinnedAnnouncements = announcements.filter(a => a.isPinned);
    const regularAnnouncements = announcements.filter(a => !a.isPinned);

    // Show pinned announcement banner (first pinned only)
    const bannerContainer = document.getElementById('announcementBanner');

    if (bannerContainer && pinnedAnnouncements.length > 0) {
      const pinned = pinnedAnnouncements[0];
      const isRead = pinned.readBy?.includes(user.id);

      bannerContainer.innerHTML = `
        <div class="announcement-banner pinned ${isRead ? 'read' : ''}">
          <i data-lucide="${isRead ? 'check-circle' : 'pin'}" class="announcement-icon"></i>
          <div class="announcement-content">
            <div class="announcement-title">${pinned.title}</div>
            <div class="announcement-body">${pinned.message}</div>
          </div>
          ${!isRead ? `<button onclick="window.markAnnouncementAsRead('${pinned.id}')" class="btn-secondary btn-sm">
            Mark as read
          </button>` : '<span class="read-badge">Read</span>'}
        </div>
      `;
      bannerContainer.style.display = 'block';

      // Re-initialize Lucide icons
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    } else if (bannerContainer) {
      bannerContainer.style.display = 'none';
    }

    // Show announcements list (only unread ones for non-pinned)
    const listContainer = document.getElementById('announcementsList');
    if (listContainer) {
      // Filter out already-read announcements
      const unreadAnnouncements = regularAnnouncements.filter(a => !a.readBy?.includes(user.id));

      if (unreadAnnouncements.length === 0) {
        listContainer.innerHTML = `
          <p style="text-align: center; color: var(--gray-500); padding: 20px;">
            No new announcements
          </p>
        `;
      } else {
        listContainer.innerHTML = unreadAnnouncements.slice(0, 5).map(announcement => {
          const date = announcement.createdAt;
          const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          });

          return `
            <div class="announcement-item unread"
                 onclick="window.markAnnouncementAsRead('${announcement.id}')">
              <div class="announcement-item-header">
                <div class="announcement-item-title">${announcement.title}</div>
                <div class="announcement-item-date">${formattedDate}</div>
              </div>
              <div class="announcement-item-body">${announcement.message}</div>
            </div>
          `;
        }).join('');
      }
    }

    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

  } catch (error) {
    console.error('❌ Error loading student announcements:', error);
  }
}

/**
 * Mark announcement as read
 */
export async function markAnnouncementAsRead(announcementId) {
  try {
    const userSession = sessionStorage.getItem('pethologyUser');
    if (!userSession) {
      return;
    }
    const user = JSON.parse(userSession);

    await PethologyFirebaseREST.markAnnouncementAsRead(announcementId, user.id);
    console.log('✅ Announcement marked as read');

    // Reload announcements
    await loadStudentAnnouncements();

  } catch (error) {
    console.error('❌ Error marking announcement as read:', error);
  }
}

/**
 * Show success message (toast notification)
 */
function showSuccessMessage(message) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'success-toast';
  toast.innerHTML = `
    <i data-lucide="check-circle"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  // Initialize icon
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Show toast
  setTimeout(() => toast.classList.add('show'), 100);

  // Hide and remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Make functions globally available
if (typeof window !== 'undefined') {
  window.showCreateAnnouncementModal = showCreateAnnouncementModal;
  window.showEditAnnouncementModal = showEditAnnouncementModal;
  window.closeAnnouncementModal = closeAnnouncementModal;
  window.editAnnouncement = showEditAnnouncementModal;
  window.deleteAnnouncement = deleteAnnouncement;
  window.loadAnnouncementsList = loadAnnouncementsList;
  window.markAnnouncementAsRead = markAnnouncementAsRead;
}
