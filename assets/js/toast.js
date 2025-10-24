/**
 * Toast Notification System
 * Simple, elegant notifications for user feedback
 */

class ToastManager {
    constructor() {
        this.container = null;
        this.toasts = [];
        this.init();
    }

    init() {
        // Create container if it doesn't exist
        if (!document.querySelector('.toast-container')) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        } else {
            this.container = document.querySelector('.toast-container');
        }
    }

    /**
     * Show a toast notification
     * @param {Object} options - Toast options
     * @param {string} options.type - Type of toast: 'success', 'error', 'warning', 'info'
     * @param {string} options.title - Toast title (optional)
     * @param {string} options.message - Toast message
     * @param {number} options.duration - Duration in ms (default: 5000)
     * @param {boolean} options.closable - Show close button (default: true)
     */
    show({ type = 'info', title, message, duration = 5000, closable = true }) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        // Icon mapping
        const icons = {
            success: 'check-circle',
            error: 'x-circle',
            warning: 'alert-triangle',
            info: 'info'
        };

        const icon = icons[type] || 'info';

        // Build toast HTML
        toast.innerHTML = `
            <div class="toast-icon">
                <i data-lucide="${icon}"></i>
            </div>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                <div class="toast-message">${message}</div>
            </div>
            ${closable ? `
                <button class="toast-close" aria-label="Close">
                    <i data-lucide="x"></i>
                </button>
            ` : ''}
            ${duration > 0 ? '<div class="toast-progress"></div>' : ''}
        `;

        // Add to container
        this.container.appendChild(toast);

        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Handle close button
        if (closable) {
            const closeBtn = toast.querySelector('.toast-close');
            closeBtn.addEventListener('click', () => this.remove(toast));
        }

        // Auto-remove after duration
        if (duration > 0) {
            setTimeout(() => this.remove(toast), duration);
        }

        // Track toast
        this.toasts.push(toast);

        return toast;
    }

    /**
     * Remove a toast
     */
    remove(toast) {
        toast.classList.add('removing');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            this.toasts = this.toasts.filter(t => t !== toast);
        }, 300); // Match animation duration
    }

    /**
     * Clear all toasts
     */
    clearAll() {
        this.toasts.forEach(toast => this.remove(toast));
    }

    /**
     * Convenience methods
     */
    success(message, title = null, options = {}) {
        return this.show({
            type: 'success',
            title: title || 'Success',
            message,
            ...options
        });
    }

    error(message, title = null, options = {}) {
        return this.show({
            type: 'error',
            title: title || 'Error',
            message,
            ...options
        });
    }

    warning(message, title = null, options = {}) {
        return this.show({
            type: 'warning',
            title: title || 'Warning',
            message,
            ...options
        });
    }

    info(message, title = null, options = {}) {
        return this.show({
            type: 'info',
            title: title || 'Info',
            message,
            ...options
        });
    }
}

// Create global toast instance
window.toast = new ToastManager();

// Export for ES6 modules
export default window.toast;
