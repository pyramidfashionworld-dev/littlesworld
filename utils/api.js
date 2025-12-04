// /utils/api.js
const DEFAULT_TIMEOUT = 10000; // ms
const DEFAULT_RETRIES = 2;

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function fetchWithTimeout(resource, options = {}, timeout = DEFAULT_TIMEOUT) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(resource, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export async function safeApiFetch(url, opts = {}) {
  const { retries = DEFAULT_RETRIES, timeout = DEFAULT_TIMEOUT, parseJson = true } = opts;
  let attempt = 0;
  let lastErr;

  while (attempt <= retries) {
    try {
      const response = await fetchWithTimeout(url, opts, timeout);
      if (!response.ok) {
        const text = await response.text().catch(() => '');
        const err = new Error(`HTTP ${response.status}: ${text || response.statusText}`);
        err.status = response.status;
        throw err;
      }
      return parseJson ? response.json() : response;
    } catch (err) {
      lastErr = err;
      // Network errors or aborts => retry
      if (attempt === retries) break;
      const backoff = 200 * Math.pow(2, attempt); // 200ms, 400ms, 800ms...
      await delay(backoff);
      attempt += 1;
    }
  }
  throw lastErr;
}
