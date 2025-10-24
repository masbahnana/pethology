/**
 * Error Handling Utilities
 * Centralized error handling with user-friendly messages
 */

import toast from './toast.js';

/**
 * Error message mappings
 */
const ERROR_MESSAGES = {
    // Network errors
    'network': {
        title: 'Connection Error',
        message: 'Unable to connect to the server. Please check your internet connection.',
        retry: true
    },
    'timeout': {
        title: 'Request Timeout',
        message: 'The request took too long. Please try again.',
        retry: true
    },

    // Authentication errors
    'auth/unauthorized': {
        title: 'Access Denied',
        message: 'You need to be logged in to access this page.',
        redirect: 'auth0-login.html'
    },
    'auth/forbidden': {
        title: 'Permission Denied',
        message: 'You do not have permission to perform this action.',
        retry: false
    },
    'auth/session-expired': {
        title: 'Session Expired',
        message: 'Your session has expired. Please login again.',
        redirect: 'auth0-login.html'
    },

    // Data errors
    'data/not-found': {
        title: 'Data Not Found',
        message: 'The requested data could not be found.',
        retry: false
    },
    'data/invalid': {
        title: 'Invalid Data',
        message: 'The data provided is invalid. Please check and try again.',
        retry: false
    },

    // Server errors
    'server/error': {
        title: 'Server Error',
        message: 'Something went wrong on our end. Please try again later.',
        retry: true
    },
    'server/maintenance': {
        title: 'Maintenance Mode',
        message: 'The platform is currently under maintenance. Please try again later.',
        retry: false
    },

    // Default
    'default': {
        title: 'Error',
        message: 'An unexpected error occurred. Please try again.',
        retry: true
    }
};

/**
 * Error Handler Class
 */
class ErrorHandler {
    constructor() {
        this.errorLog = [];
    }

    /**
     * Handle an error
     */
    handle(error, context = {}) {
        // Log error
        console.error('Error occurred:', error, 'Context:', context);
        this.errorLog.push({
            error,
            context,
            timestamp: new Date()
        });

        // Determine error type
        const errorType = this.determineErrorType(error);
        const errorConfig = ERROR_MESSAGES[errorType] || ERROR_MESSAGES['default'];

        // Show user-friendly message
        toast.error(errorConfig.message, errorConfig.title, {
            duration: 7000
        });

        // Handle redirect if specified
        if (errorConfig.redirect) {
            setTimeout(() => {
                window.location.href = errorConfig.redirect;
            }, 2000);
        }

        return {
            type: errorType,
            canRetry: errorConfig.retry,
            ...errorConfig
        };
    }

    /**
     * Determine error type from error object
     */
    determineErrorType(error) {
        // Network errors
        if (!navigator.onLine) {
            return 'network';
        }

        if (error instanceof TypeError && error.message.includes('fetch')) {
            return 'network';
        }

        // HTTP status codes
        if (error.status || error.statusCode) {
            const status = error.status || error.statusCode;
            if (status === 401) return 'auth/unauthorized';
            if (status === 403) return 'auth/forbidden';
            if (status === 404) return 'data/not-found';
            if (status >= 500) return 'server/error';
        }

        // Firebase errors
        if (error.code) {
            if (error.code.includes('auth')) {
                return 'auth/unauthorized';
            }
            if (error.code.includes('not-found')) {
                return 'data/not-found';
            }
        }

        // Custom error types
        if (error.type) {
            return error.type;
        }

        return 'default';
    }

    /**
     * Wrap an async function with error handling
     */
    async wrap(fn, context = {}) {
        try {
            return await fn();
        } catch (error) {
            return this.handle(error, context);
        }
    }

    /**
     * Create a retry-able function
     */
    withRetry(fn, { maxRetries = 3, delay = 1000, context = {} } = {}) {
        return async (...args) => {
            let lastError;

            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    return await fn(...args);
                } catch (error) {
                    lastError = error;

                    if (attempt < maxRetries) {
                        console.log(`Retry attempt ${attempt}/${maxRetries}...`);
                        await new Promise(resolve => setTimeout(resolve, delay * attempt));
                    }
                }
            }

            return this.handle(lastError, {
                ...context,
                retriesAttempted: maxRetries
            });
        };
    }

    /**
     * Show loading state with error fallback
     */
    async handleWithLoading(fn, {
        loadingMessage = 'Loading...',
        successMessage = null,
        errorContext = {}
    } = {}) {
        try {
            const result = await fn();

            if (successMessage) {
                toast.success(successMessage);
            }

            return result;
        } catch (error) {
            this.handle(error, errorContext);
            throw error;
        }
    }

    /**
     * Get error log (for debugging)
     */
    getLog() {
        return this.errorLog;
    }

    /**
     * Clear error log
     */
    clearLog() {
        this.errorLog = [];
    }
}

// Create global error handler instance
const errorHandler = new ErrorHandler();
window.errorHandler = errorHandler;

// Export
export default errorHandler;

/**
 * Convenience function for try-catch with error handling
 */
export async function tryAsync(fn, context = {}) {
    try {
        return await fn();
    } catch (error) {
        errorHandler.handle(error, context);
        return null;
    }
}

/**
 * Create a safe async function that won't throw
 */
export function safe(fn, context = {}) {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (error) {
            errorHandler.handle(error, context);
            return null;
        }
    };
}
