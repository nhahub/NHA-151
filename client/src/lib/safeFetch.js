/**
 * @file safeFetch.js
 * @description Production-grade fetch wrapper with:
 *   - Environment-based API URL configuration
 *   - Health check verification before requests
 *   - Exponential backoff retry logic (2 retries: 500ms, 1000ms)
 *   - Request timeout protection (8s max)
 *   - Structured JSON logging for all operations
 *   - Graceful fallbacks and user-friendly error messages
 */

/**
 * Structured logger for network operations
 * @param {string} level - 'info', 'warn', 'error'
 * @param {string} message - Human-readable message
 * @param {object} data - Additional structured data (url, status, retries, etc.)
 */
const log = (level, message, data = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    level,
    timestamp,
    message,
    ...data,
  };
  console.log(`[${level.toUpperCase()}] [${timestamp}] ${message}`, data);
  // In production, send to external logging service (e.g., Sentry, LogRocket)
  if (level === 'error' && typeof window !== 'undefined' && window.__logError) {
    window.__logError(logEntry);
  }
};

/**
 * Get API base URL from environment, with fallbacks
 * @returns {string} Base URL (e.g., 'http://localhost:5000')
 */
export const getAPIBaseURL = () => {
  // Try Vite env first, then fallback
  if (import.meta?.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  // Development fallback
  return 'http://localhost:5002';
};

/**
 * Check if backend is healthy by calling /api/health
 * @param {string} apiURL - Base API URL
 * @param {number} timeout - Timeout in ms
 * @returns {Promise<boolean>} true if healthy, false otherwise
 */
export const checkBackendHealth = async (apiURL, timeout = 3000) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${apiURL}/api/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const isHealthy = data.status === 'ok';
      if (isHealthy) {
        log('info', 'Backend health check passed', { url: apiURL, status: data.status });
      }
      return isHealthy;
    }
    return false;
  } catch (err) {
    log('warn', 'Backend health check failed', {
      url: apiURL,
      error: err.message,
      isAborted: err.name === 'AbortError',
    });
    return false;
  }
};

/**
 * Retry logic with exponential backoff
 * @param {function} fn - Async function to retry
 * @param {number} maxRetries - Number of retries (default 2)
 * @param {array} delays - Backoff delays in ms (default [500, 1000])
 * @returns {Promise<any>} Result of fn or throws last error
 */
const retryWithBackoff = async (fn, maxRetries = 2, delays = [500, 1000]) => {
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        const delay = delays[attempt] || delays[delays.length - 1];
        log('warn', `Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`, {
          error: err.message,
        });
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
};

/**
 * safeFetch: Production-grade fetch wrapper
 * @param {string} url - API endpoint (e.g., '/api/login')
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @param {object} config - Custom config (timeout, retries, skipHealthCheck, etc.)
 * @returns {Promise<Response>} Fetch response
 * @throws {Error} User-friendly error message
 */
export const safeFetch = async (url, options = {}, config = {}) => {
  const {
    timeout = 8000,
    retries = 2,
    skipHealthCheck = false,
    delays = [500, 1000],
  } = config;

  // Resolve absolute URL
  const apiURL = getAPIBaseURL();
  const absoluteURL = url.startsWith('http') ? url : `${apiURL}/api${url.startsWith('/api') ? url.slice(4) : url}`;

  // Prepare request metadata
  const requestMeta = {
    url: absoluteURL,
    method: options.method || 'GET',
    timestamp: new Date().toISOString(),
  };

  try {
    // Health check (unless skipped)
    if (!skipHealthCheck) {
      const isHealthy = await checkBackendHealth(apiURL, Math.min(timeout / 2, 3000));
      if (!isHealthy) {
        log('error', 'Backend unavailable: skipping request', requestMeta);
        throw new Error(
          'SERVER_UNAVAILABLE: The server is temporarily unreachable. Please try again in a moment.'
        );
      }
    }

    // Retry logic with exponential backoff
    const executeRequest = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(absoluteURL, {
          ...options,
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        clearTimeout(timeoutId);

        // Log success
        log('info', `${requestMeta.method} ${requestMeta.url}`, {
          status: response.status,
          statusText: response.statusText,
        });

        return response;
      } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          throw new Error(`REQUEST_TIMEOUT: Request exceeded ${timeout}ms limit`);
        }
        throw err;
      }
    };

    // Execute with retries
    const response = await retryWithBackoff(executeRequest, retries, delays);
    return response;
  } catch (err) {
    // Log error and return user-friendly message
    const errorMessage = err.message || 'UNKNOWN_ERROR: An unexpected error occurred';
    log('error', `Request failed: ${requestMeta.method} ${requestMeta.url}`, {
      error: errorMessage,
      url: absoluteURL,
      retries,
    });

    // Map internal errors to user-friendly messages
    let userMessage = 'Failed to reach the server. Please check your connection.';
    if (errorMessage.includes('TIMEOUT')) {
      userMessage = 'Request timed out. The server is taking too long to respond. Please try again.';
    } else if (errorMessage.includes('SERVER_UNAVAILABLE')) {
      userMessage = 'The server is temporarily unavailable. Please try again in a moment.';
    } else if (errorMessage.includes('NETWORK')) {
      userMessage = 'Network error. Please check your internet connection.';
    }

    // Create structured error object
    const structuredError = new Error(userMessage);
    structuredError.originalError = err;
    structuredError.internalCode = errorMessage.split(':')[0];
    throw structuredError;
  }
};

/**
 * Parsed JSON wrapper around safeFetch
 * @param {string} url - API endpoint
 * @param {object} options - Fetch options
 * @param {object} config - Custom config
 * @returns {Promise<any>} Parsed JSON response
 */
export const safeFetchJSON = async (url, options = {}, config = {}) => {
  const response = await safeFetch(url, options, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || `HTTP ${response.status}`);
    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  return response.json();
};

/**
 * Helper: POST with JSON body
 */
export const safePost = (url, body, config) =>
  safeFetchJSON(url, {
    method: 'POST',
    body: JSON.stringify(body),
  }, config);

/**
 * Helper: GET
 */
export const safeGet = (url, config) =>
  safeFetchJSON(url, { method: 'GET' }, config);

/**
 * Helper: PUT with JSON body
 */
export const safePut = (url, body, config) =>
  safeFetchJSON(url, {
    method: 'PUT',
    body: JSON.stringify(body),
  }, config);

/**
 * Helper: DELETE
 */
export const safeDelete = (url, config) =>
  safeFetchJSON(url, { method: 'DELETE' }, config);

export default safeFetch;
