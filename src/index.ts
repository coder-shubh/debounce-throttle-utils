type Fn = (...args: any[]) => void;

interface DebounceOptions {
  leading?: boolean; // Execute on the leading edge
  trailing?: boolean; // Execute on the trailing edge
}

interface ThrottleOptions {
  leading?: boolean; // Execute on the leading edge
  trailing?: boolean; // Execute on the trailing edge
}

/**
 * Debounce function - Delays the execution of the passed function until the user stops calling it for a specified delay.
 *
 * @param func The function to debounce
 * @param delay The time to wait before executing the function, in milliseconds
 * @param options The options for leading/trailing execution
 * @returns A debounced function
 */
function debounce(func: Fn, delay: number, options: DebounceOptions = {}): Fn {
  let timer: NodeJS.Timeout;
  let lastCallTime = 0;

  // Use a normal function here to access `this` context
  const debouncedFn = function (this: any, ...args: any[]) {
    const context = this; // Explicitly refer to the correct `this` value
    const now = Date.now();
    const isLeading = options.leading && !lastCallTime;

    clearTimeout(timer);

    if (isLeading) {
      func.apply(context, args); // Apply with the correct context and arguments
    }

    timer = setTimeout(() => {
      if (options.trailing) {
        func.apply(context, args); // Apply with the correct context and arguments
      }
      lastCallTime = now;
    }, delay);
  };

  // Cancel the pending debounced function execution
  debouncedFn.cancel = function () {
    clearTimeout(timer);
  };

  return debouncedFn;
}

/**
 * Throttle function - Ensures the passed function is executed at most once in a given period of time.
 *
 * @param func The function to throttle
 * @param limit The time interval in milliseconds to limit the execution of the function
 * @param options The options for leading/trailing execution
 * @returns A throttled function
 */
function throttle(func: Fn, limit: number, options: ThrottleOptions = {}): Fn {
  let lastFunc: NodeJS.Timeout;
  let lastTime: number = 0;
  let lastArgs: any[] = []; // Store the arguments to use in flush

  // Use a normal function here to access `this` context
  const throttledFn = function (this: any, ...args: any[]) {
    const context = this; // Explicitly refer to the correct `this` value
    const now = Date.now();
    const isLeading = options.leading && !lastTime;

    if (isLeading) {
      func.apply(context, args); // Apply with the correct context and arguments
      lastTime = now;
    }

    const remainingTime = limit - (now - lastTime);

    if (remainingTime <= 0) {
      clearTimeout(lastFunc);
      func.apply(context, args); // Apply with the correct context and arguments
      lastTime = now;
    } else if (options.trailing) {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        func.apply(context, args); // Apply with the correct context and arguments
        lastTime = Date.now();
      }, remainingTime);
    }

    // Store the latest arguments for flushing
    lastArgs = args;
  };

  // Flush the pending throttled function execution
  throttledFn.flush = function () {
    if (lastFunc) {
      clearTimeout(lastFunc);
      func.apply(this, lastArgs); // Apply with the correct context and the stored arguments
    }
  };

  return throttledFn;
}

// Exporting the debounce and throttle functions
export { debounce, throttle };
