// Type for the debounced/throttled function
type Fn = (...args: any[]) => void;

/**
 * Debounce function - Delays the execution of the passed function until the user stops calling it for a specified delay.
 *
 * @param func The function to debounce
 * @param delay The time to wait before executing the function, in milliseconds
 * @returns A debounced function
 */
function debounce(func: Fn, delay: number): Fn {
  let timer: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
 * Throttle function - Ensures the passed function is executed at most once in a given period of time.
 *
 * @param func The function to throttle
 * @param limit The time interval in milliseconds to limit the execution of the function
 * @returns A throttled function
 */
function throttle(func: Fn, limit: number): Fn {
  let lastFunc: NodeJS.Timeout;
  let lastTime: number;

  return function (...args: any[]) {
    const now = Date.now();
    if (lastTime && now - lastTime < limit) {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        lastTime = now;
        func(...args);
      }, limit - (now - lastTime));
    } else {
      lastTime = now;
      func(...args);
    }
  };
}

// Exporting the debounce and throttle functions
export { debounce, throttle };
