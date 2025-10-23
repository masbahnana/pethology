/**
 * LOADING UTILITIES - Pethology Platform
 * Reusable functions for showing/hiding loading states
 */

/**
 * Show a loading spinner in a container
 * @param {string} containerId - ID of the container element
 * @param {string} message - Optional loading message
 */
export function showLoading(containerId, message = 'Loading...') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <p>${message}</p>
    </div>
  `;
  container.style.display = 'block';
}

/**
 * Show a small inline spinner
 * @param {string} containerId - ID of the container element
 * @param {string} message - Optional loading message
 */
export function showLoadingInline(containerId, message = 'Loading...') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="loading-inline">
      <div class="spinner spinner-sm"></div>
      <span>${message}</span>
    </div>
  `;
}

/**
 * Hide loading and show content
 * @param {string} loadingId - ID of loading container to hide
 * @param {string} contentId - ID of content container to show
 */
export function hideLoading(loadingId, contentId) {
  const loadingContainer = document.getElementById(loadingId);
  const contentContainer = document.getElementById(contentId);

  if (loadingContainer) {
    loadingContainer.style.display = 'none';
  }

  if (contentContainer) {
    contentContainer.style.display = 'block';
  }
}

/**
 * Show full-page loading overlay
 * @param {string} message - Loading message
 */
export function showLoadingOverlay(message = 'Loading...') {
  // Remove existing overlay if any
  hideLoadingOverlay();

  const overlay = document.createElement('div');
  overlay.id = 'loadingOverlay';
  overlay.className = 'loading-overlay';
  overlay.innerHTML = `
    <div class="loading-overlay-content">
      <div class="spinner spinner-lg"></div>
      <p style="margin-top: 16px; font-size: 16px; color: var(--gray-700);">${message}</p>
    </div>
  `;

  document.body.appendChild(overlay);
}

/**
 * Hide full-page loading overlay
 */
export function hideLoadingOverlay() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) {
    overlay.remove();
  }
}

/**
 * Set button to loading state
 * @param {string|HTMLElement} button - Button element or ID
 * @param {boolean} isLoading - True to show loading, false to hide
 * @param {string} originalText - Original button text (optional, will restore if provided)
 */
export function setButtonLoading(button, isLoading, originalText = null) {
  const btn = typeof button === 'string' ? document.getElementById(button) : button;
  if (!btn) return;

  if (isLoading) {
    btn.disabled = true;
    btn.classList.add('btn-loading');
    if (!btn.dataset.originalText && btn.textContent) {
      btn.dataset.originalText = btn.textContent;
    }
  } else {
    btn.disabled = false;
    btn.classList.remove('btn-loading');
    if (originalText) {
      btn.textContent = originalText;
    } else if (btn.dataset.originalText) {
      btn.textContent = btn.dataset.originalText;
    }
  }
}

/**
 * Create a skeleton loader for a card
 * @returns {string} HTML string for skeleton card
 */
export function createSkeletonCard() {
  return `
    <div class="skeleton-card">
      <div class="skeleton-header" style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
        <div class="skeleton skeleton-icon"></div>
        <div style="flex: 1;">
          <div class="skeleton skeleton-text" style="width: 60%; margin-bottom: 8px;"></div>
          <div class="skeleton skeleton-text-sm" style="width: 40%;"></div>
        </div>
      </div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text" style="width: 80%;"></div>
      <div class="skeleton skeleton-button" style="margin-top: 16px;"></div>
    </div>
  `;
}

/**
 * Create a skeleton loader for module grid
 * @param {number} count - Number of skeleton cards to show
 * @returns {string} HTML string for skeleton grid
 */
export function createSkeletonModuleGrid(count = 6) {
  const cards = Array(count).fill(null).map(() =>
    '<div class="skeleton skeleton-module-card"></div>'
  ).join('');

  return `
    <div class="skeleton-module-grid">
      ${cards}
    </div>
  `;
}

/**
 * Create a skeleton loader for table rows
 * @param {number} rows - Number of rows
 * @param {number} columns - Number of columns
 * @returns {string} HTML string for skeleton table
 */
export function createSkeletonTable(rows = 5, columns = 4) {
  const tableRows = Array(rows).fill(null).map(() => {
    const cols = Array(columns).fill(null).map((_, i) => {
      const width = i === 0 ? '30%' : i === columns - 1 ? '20%' : '25%';
      return `<div class="skeleton skeleton-text" style="width: ${width};"></div>`;
    }).join('');

    return `<div class="skeleton-table-row">${cols}</div>`;
  }).join('');

  return tableRows;
}

/**
 * Show loading state with skeleton
 * @param {string} containerId - Container ID
 * @param {string} type - Type of skeleton ('card', 'grid', 'table')
 * @param {object} options - Additional options
 */
export function showSkeletonLoading(containerId, type = 'card', options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let skeletonHTML = '';

  switch (type) {
    case 'card':
      skeletonHTML = createSkeletonCard();
      break;
    case 'grid':
      skeletonHTML = createSkeletonModuleGrid(options.count || 6);
      break;
    case 'table':
      skeletonHTML = createSkeletonTable(options.rows || 5, options.columns || 4);
      break;
    default:
      skeletonHTML = '<div class="skeleton" style="height: 200px;"></div>';
  }

  container.innerHTML = skeletonHTML;
  container.style.display = 'block';
}

/**
 * Wrap async function with loading state
 * @param {Function} asyncFn - Async function to execute
 * @param {string} loadingId - Loading container ID
 * @param {string} contentId - Content container ID
 * @param {string} message - Loading message
 */
export async function withLoading(asyncFn, loadingId, contentId, message = 'Loading...') {
  try {
    showLoading(loadingId, message);
    const result = await asyncFn();
    hideLoading(loadingId, contentId);
    return result;
  } catch (error) {
    hideLoading(loadingId, contentId);
    throw error;
  }
}

/**
 * Simulate loading delay (for testing)
 * @param {number} ms - Milliseconds to wait
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
