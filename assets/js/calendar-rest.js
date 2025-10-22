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

  if (mode === 'create') {
    const eventData = {
      title,
      type,
      date: eventDate,
      description,
      createdBy: user.id,
      createdByName: user.name
    };

    try {
      await createCalendarEvent(eventData);
      showSuccessMessage('Event scheduled!');
      closeCalendarModal();

      // Reload calendar if function exists
      if (typeof window.loadCalendarEvents === 'function') {
        await window.loadCalendarEvents();
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error scheduling event. Please try again.');
    }
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
      return [];
    }

    let events = response.documents.map(doc => PethologyFirebaseREST.convertDocument(doc));

    // Filter by date range
    if (startDate && endDate) {
      events = events.filter(e => {
        const eventDate = e.date;
        return eventDate >= startDate && eventDate <= endDate;
      });
    }

    // Sort by date ascending
    events.sort((a, b) => a.date - b.date);

    return events;
  } catch (error) {
    console.error('❌ Error getting calendar events:', error);
    return [];
  }
}

function renderCalendar(events) {
  const container = document.getElementById('calendarWidget');
  if (!container) return;

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
      <h4>${monthNames[month]} ${year}</h4>
    </div>
    <div class="calendar-grid">
      <div class="calendar-day-name">Sun</div>
      <div class="calendar-day-name">Mon</div>
      <div class="calendar-day-name">Tue</div>
      <div class="calendar-day-name">Wed</div>
      <div class="calendar-day-name">Thu</div>
      <div class="calendar-day-name">Fri</div>
      <div class="calendar-day-name">Sat</div>
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
      <div class="calendar-day ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}">
        <span class="day-number">${day}</span>
        ${dayEvents.length > 0 ? `<span class="event-dot" title="${dayEvents.length} event(s)"></span>` : ''}
      </div>
    `;
  }

  html += '</div>';

  // Upcoming events list
  const upcomingEvents = events.filter(e => new Date(e.date) >= now).slice(0, 5);

  if (upcomingEvents.length > 0) {
    html += '<div class="upcoming-events"><h5>Upcoming</h5>';
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
          <div class="event-title">${event.title}</div>
          <div class="event-date">${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        </div>
      `;
    });
    html += '</div>';
  }

  container.innerHTML = html;
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
