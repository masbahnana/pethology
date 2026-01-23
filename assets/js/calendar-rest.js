// Calendar REST API Service - NO SDK, pure HTTP requests
import { PethologyFirebaseREST } from './firebase-rest.js';

console.log('📅 Calendar REST API initialized - v1.0');

// 📅 CALENDAR MODAL FUNCTIONS
export function showCreateEventModal() {
  const modal = document.getElementById('calendarModal');
  const form = document.getElementById('calendarForm');
  form.reset();
  form.dataset.mode = 'create';
  delete form.dataset.eventId;
  document.getElementById('calendarModalTitle').textContent = 'Schedule Event';
  modal.style.display = 'flex';
}

export function closeCalendarModal() {
  const modal = document.getElementById('calendarModal');
  modal.style.display = 'none';
}

export async function handleCalendarSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const mode = form.dataset.mode;

  const title = document.getElementById('eventTitle').value.trim();
  const type = document.getElementById('eventType').value;
  const date = document.getElementById('eventDate').value;
  const time = document.getElementById('eventTime').value;
  const description = document.getElementById('eventDescription').value.trim();

  if (!title || !type || !date) {
    alert('Please fill in all required fields');
    return;
  }

  const userSession = sessionStorage.getItem('pethologyUser');
  const user = JSON.parse(userSession);

  // Combine date and time into timestamp
  const dateTime = time ? `${date}T${time}` : `${date}T09:00`;
  const eventDate = new Date(dateTime);

  try {
    if (mode === 'create') {
      const eventData = {
        title,
        type,
        date: eventDate,
        description,
        createdBy: user.id,
        createdByName: user.name
      };

      await createCalendarEvent(eventData);
      showSuccessMessage('Event scheduled!');
    } else if (mode === 'edit') {
      const eventId = form.dataset.eventId;
      const eventData = {
        title,
        type,
        date: eventDate,
        description
      };

      await updateCalendarEvent(eventId, eventData);
      showSuccessMessage('Event updated!');
    }

    closeCalendarModal();

    // Reload calendar if function exists
    if (typeof window.loadCalendarEvents === 'function') {
      await window.loadCalendarEvents();
    }
  } catch (error) {
    console.error('Error saving event:', error);
    alert('Error saving event. Please try again.');
  }
}

// Show modal to edit an event
export async function showEditEventModal(eventId) {
  const modal = document.getElementById('calendarModal');
  const form = document.getElementById('calendarForm');

  // Get all events and find the one to edit
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const events = await getCalendarEvents(startOfMonth, endOfMonth);
  const event = events.find(e => e.id === eventId);

  if (!event) {
    console.error('Event not found:', eventId);
    alert('Event not found');
    return;
  }

  // Fill form with event data
  document.getElementById('eventTitle').value = event.title || '';
  document.getElementById('eventType').value = event.type || 'other';

  // Format date for input (YYYY-MM-DD)
  const eventDate = event.date instanceof Date ? event.date : new Date(event.date);
  document.getElementById('eventDate').value = eventDate.toISOString().split('T')[0];

  // Format time for input (HH:MM)
  const hours = String(eventDate.getHours()).padStart(2, '0');
  const minutes = String(eventDate.getMinutes()).padStart(2, '0');
  document.getElementById('eventTime').value = `${hours}:${minutes}`;

  document.getElementById('eventDescription').value = event.description || '';

  // Set form mode
  form.dataset.mode = 'edit';
  form.dataset.eventId = eventId;

  // Update modal title
  document.getElementById('calendarModalTitle').textContent = 'Edit Event';

  // Show modal
  modal.style.display = 'flex';
}

// Delete a calendar event
export async function deleteCalendarEvent(eventId) {
  if (!confirm('Are you sure you want to delete this event?')) {
    return;
  }

  try {
    await deleteCalendarEventFromDB(eventId);
    showSuccessMessage('Event deleted!');

    // Reload calendar if function exists
    if (typeof window.loadCalendarEvents === 'function') {
      await window.loadCalendarEvents();
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    alert('Error deleting event. Please try again.');
  }
}

// REST API function to create calendar event
async function createCalendarEvent(eventData) {
  try {
    console.log('📅 Creating calendar event (REST API)...', eventData);

    // Convert to Firestore format
    const firestoreData = {
      fields: {
        title: { stringValue: eventData.title },
        type: { stringValue: eventData.type },
        date: { timestampValue: eventData.date.toISOString() },
        description: { stringValue: eventData.description || '' },
        createdBy: { stringValue: eventData.createdBy },
        createdByName: { stringValue: eventData.createdByName },
        createdAt: { timestampValue: new Date().toISOString() }
      }
    };

    const response = await PethologyFirebaseREST.request('/calendar_events', 'POST', firestoreData);
    console.log('✅ Calendar event created (REST API)');
    return response;
  } catch (error) {
    console.error('❌ Error creating calendar event:', error);
    throw error;
  }
}

// REST API function to update calendar event
async function updateCalendarEvent(eventId, eventData) {
  try {
    console.log('📅 Updating calendar event (REST API)...', eventId, eventData);

    const firestoreData = {
      fields: {
        title: { stringValue: eventData.title },
        type: { stringValue: eventData.type },
        date: { timestampValue: eventData.date.toISOString() },
        description: { stringValue: eventData.description || '' },
        updatedAt: { timestampValue: new Date().toISOString() }
      }
    };

    const response = await PethologyFirebaseREST.request(`/calendar_events/${eventId}`, 'PATCH', firestoreData);
    console.log('✅ Calendar event updated (REST API)');
    return response;
  } catch (error) {
    console.error('❌ Error updating calendar event:', error);
    throw error;
  }
}

// REST API function to delete calendar event
async function deleteCalendarEventFromDB(eventId) {
  try {
    console.log('📅 Deleting calendar event (REST API)...', eventId);
    await PethologyFirebaseREST.request(`/calendar_events/${eventId}`, 'DELETE');
    console.log('✅ Calendar event deleted (REST API)');
    return true;
  } catch (error) {
    console.error('❌ Error deleting calendar event:', error);
    throw error;
  }
}

function showSuccessMessage(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <i data-lucide="check-circle"></i>
    <span>${message}</span>
  `;
  toast.style.cssText = `
    position: fixed;
    top: 24px;
    right: 24px;
    background: #059669;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(toast);

  // Initialize lucide icons for the toast
  if (window.lucide) {
    window.lucide.createIcons();
  }

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Load and render calendar events
export async function loadCalendarEvents() {
  try {
    console.log('📅 Loading calendar events (REST API)...');

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    // Get events from REST API
    const events = await getCalendarEvents(startOfMonth, endOfMonth);
    console.log(`✅ Loaded ${events.length} calendar events (REST API)`);

    renderCalendar(events);
  } catch (error) {
    console.error('❌ Error loading calendar events:', error);
    renderCalendar([]);
  }
}

// REST API function to get calendar events
async function getCalendarEvents(startDate, endDate) {
  try {
    const response = await PethologyFirebaseREST.request('/calendar_events');

    if (!response.documents) {
      console.log('📅 No documents property in response');
      return [];
    }

    console.log(`📅 Found ${response.documents.length} documents in Firebase`);

    let events = response.documents.map(doc => {
      const converted = PethologyFirebaseREST.convertDocument(doc);
      // Ensure date is a Date object
      if (converted.date && typeof converted.date === 'string') {
        converted.date = new Date(converted.date);
      }
      return converted;
    });

    console.log(`📅 After conversion: ${events.length} events`);
    console.log('📅 Events:', events);

    // Filter by date range
    if (startDate && endDate) {
      events = events.filter(e => {
        const eventDate = e.date instanceof Date ? e.date : new Date(e.date);
        return eventDate >= startDate && eventDate <= endDate;
      });
    }

    // Sort by date ascending
    events.sort((a, b) => {
      const dateA = a.date instanceof Date ? a.date : new Date(a.date);
      const dateB = b.date instanceof Date ? b.date : new Date(b.date);
      return dateA - dateB;
    });

    return events;
  } catch (error) {
    console.error('❌ Error getting calendar events:', error);
    return [];
  }
}

function renderCalendar(events) {
  const container = document.getElementById('calendarWidget');
  console.log('🎨 renderCalendar called, container:', container, 'events:', events.length);
  if (!container) {
    console.error('❌ No #calendarWidget found!');
    return;
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Month name
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  let html = `
    <div class="calendar-header">
      <h4 style="margin: 0; font-size: 16px; font-weight: 600; color: var(--gray-700);">${monthNames[month]} ${year}</h4>
    </div>
    <div class="calendar-days">
      <div class="calendar-day-header">Sun</div>
      <div class="calendar-day-header">Mon</div>
      <div class="calendar-day-header">Tue</div>
      <div class="calendar-day-header">Wed</div>
      <div class="calendar-day-header">Thu</div>
      <div class="calendar-day-header">Fri</div>
      <div class="calendar-day-header">Sat</div>
  `;

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    html += '<div class="calendar-day empty"></div>';
  }

  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isToday = date.toDateString() === now.toDateString();
    const dayEvents = events.filter(e => {
      const eventDate = new Date(e.date);
      return eventDate.toDateString() === date.toDateString();
    });

    html += `
      <div class="calendar-day ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-event' : ''}">
        ${day}
        ${dayEvents.length > 0 ? '<span class="event-dot"></span>' : ''}
      </div>
    `;
  }

  html += '</div>';

  // Upcoming events list - always show the section
  const upcomingEvents = events.filter(e => new Date(e.date) >= now).slice(0, 5);

  html += '<div class="upcoming-events"><h5>Upcoming</h5>';
  
  if (upcomingEvents.length > 0) {
    // Check if this is teacher dashboard (has edit capabilities)
    const userSession = sessionStorage.getItem('pethologyUser');
    const user = userSession ? JSON.parse(userSession) : null;
    const isTeacher = user?.role === 'Teacher';

    upcomingEvents.forEach(event => {
      const eventDate = new Date(event.date);
      const typeColors = {
        quiz: '#6366f1',
        assignment: '#f59e0b',
        exam: '#ef4444',
        announcement: '#10b981',
        other: '#6b7280'
      };
      const color = typeColors[event.type] || typeColors.other;

      html += `
        <div class="event-item" style="border-left: 3px solid ${color}">
          <div style="flex: 1;">
            <div class="event-title">${event.title}</div>
            <div class="event-date">${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
          </div>
          ${isTeacher ? `
            <div class="event-actions" style="display: flex; gap: 4px;">
              <button onclick="window.editCalendarEvent('${event.id}')" class="btn-icon-sm" title="Edit">
                <i data-lucide="edit-2"></i>
              </button>
              <button onclick="window.deleteCalendarEvent('${event.id}')" class="btn-icon-sm" title="Delete">
                <i data-lucide="trash-2"></i>
              </button>
            </div>
          ` : ''}
        </div>
      `;
    });
  } else {
    html += '<p style="text-align: center; color: var(--gray-500); font-size: 13px; margin: 12px 0;">No upcoming events</p>';
  }
  
  html += '</div>';

  container.innerHTML = html;
  console.log('✅ Calendar rendered successfully');
  
  // Reinitialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Load student calendar events (for student dashboard)
export async function loadStudentCalendarEvents() {
  try {
    console.log('📅 Loading student calendar events (REST API)...');

    const now = new Date();
    const upcomingEvents = await getCalendarEvents(now, null);

    const container = document.getElementById('upcomingEvents');
    if (!container) return;

    if (upcomingEvents.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--gray-500); padding: 20px;">No upcoming events</p>';
      return;
    }

    const eventsHtml = upcomingEvents.slice(0, 5).map(event => {
      const eventDate = new Date(event.date);
      const typeIcons = {
        quiz: 'file-text',
        assignment: 'clipboard',
        exam: 'alert-circle',
        announcement: 'megaphone',
        other: 'calendar'
      };
      const icon = typeIcons[event.type] || typeIcons.other;

      return `
        <div class="deadline-item">
          <i data-lucide="${icon}"></i>
          <div>
            <div class="deadline-title">${event.title}</div>
            <div class="deadline-date">${eventDate.toLocaleDateString()} at ${eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = eventsHtml;

    // Re-initialize lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    console.log(`✅ Loaded ${upcomingEvents.length} student events (REST API)`);
  } catch (error) {
    console.error('❌ Error loading student calendar events:', error);
  }
}

// Make functions globally available
if (typeof window !== 'undefined') {
  window.showCreateEventModal = showCreateEventModal;
  window.closeCalendarModal = closeCalendarModal;
  window.handleCalendarSubmit = handleCalendarSubmit;
  window.loadCalendarEvents = loadCalendarEvents;
  window.editCalendarEvent = showEditEventModal;
  window.deleteCalendarEvent = deleteCalendarEvent;
}
