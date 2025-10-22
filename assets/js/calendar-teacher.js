import { PethologyFirebaseService } from './firebase-service.js';

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
      await PethologyFirebaseService.createCalendarEvent(eventData);
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

function showSuccessMessage(message) {
  // Simple alert for now - can be replaced with toast notification
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
    background: var(--green-primary);
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

// 📅 CALENDAR WIDGET FUNCTIONS
export async function loadCalendarEvents() {
  try {
    console.log('📅 Loading calendar events...');

    // Get current month range
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const events = await PethologyFirebaseService.getCalendarEvents(null, startOfMonth, endOfMonth);
    console.log(`✅ Loaded ${events.length} calendar events`);

    renderCalendar(events);
  } catch (error) {
    console.error('❌ Error loading calendar events:', error);
  }
}

function renderCalendar(events) {
  const calendarContainer = document.getElementById('calendarWidget');
  if (!calendarContainer) {
    console.warn('Calendar widget container not found');
    return;
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Month names
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];

  let html = `
    <div class="calendar-header">
      <h3 class="calendar-month">${monthNames[month]} ${year}</h3>
    </div>
    <div class="calendar-grid">
      <div class="calendar-day-header">Sun</div>
      <div class="calendar-day-header">Mon</div>
      <div class="calendar-day-header">Tue</div>
      <div class="calendar-day-header">Wed</div>
      <div class="calendar-day-header">Thu</div>
      <div class="calendar-day-header">Fri</div>
      <div class="calendar-day-header">Sat</div>
  `;

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    html += '<div class="calendar-day empty"></div>';
  }

  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateString = date.toISOString().split('T')[0];
    const dayEvents = events.filter(e => {
      const eventDate = e.date?.toDate ? e.date.toDate() : new Date(e.date);
      return eventDate.toISOString().split('T')[0] === dateString;
    });

    const isToday = day === now.getDate();
    const dayClass = isToday ? 'calendar-day today' : 'calendar-day';

    html += `
      <div class="${dayClass}">
        <div class="calendar-day-number">${day}</div>
        ${dayEvents.map(e => `
          <div class="calendar-event ${e.type}" title="${e.title}">
            <span class="event-dot"></span>
            <span class="event-title">${e.title}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  html += '</div>';
  calendarContainer.innerHTML = html;
}

// 📅 STUDENT CALENDAR VIEW
export async function loadStudentCalendarEvents() {
  try {
    const events = await PethologyFirebaseService.getCalendarEvents();

    const upcomingContainer = document.getElementById('upcomingEvents');
    if (!upcomingContainer) return;

    // Filter upcoming events (next 7 days)
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const upcomingEvents = events.filter(e => {
      const eventDate = e.date?.toDate ? e.date.toDate() : new Date(e.date);
      return eventDate >= now && eventDate <= nextWeek;
    }).sort((a, b) => {
      const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
      const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
      return dateA - dateB;
    });

    if (upcomingEvents.length === 0) {
      upcomingContainer.innerHTML = `
        <p style="text-align: center; color: var(--gray-500); padding: 20px;">
          No upcoming events this week
        </p>
      `;
      return;
    }

    const eventsHTML = upcomingEvents.map(event => {
      const eventDate = event.date?.toDate ? event.date.toDate() : new Date(event.date);
      const dateStr = eventDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      const timeStr = eventDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const typeColors = {
        quiz: 'var(--blue-primary)',
        assignment: 'var(--purple-primary)',
        exam: 'var(--red-primary)',
        announcement: 'var(--green-primary)',
        other: 'var(--gray-500)'
      };

      return `
        <div class="event-item ${event.type}">
          <div class="event-dot" style="background: ${typeColors[event.type] || typeColors.other}"></div>
          <div class="event-details">
            <div class="event-title">${event.title}</div>
            <div class="event-meta">
              ${dateStr} at ${timeStr} • ${event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </div>
            ${event.description ? `<div class="event-description">${event.description}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');

    upcomingContainer.innerHTML = eventsHTML;
  } catch (error) {
    console.error('Error loading student calendar events:', error);
  }
}
