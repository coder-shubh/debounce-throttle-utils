"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = debounce;
exports.throttle = throttle;
/**
 * Debounce function - Delays the execution of the passed function until the user stops calling it for a specified delay.
 *
 * @param func The function to debounce
 * @param delay The time to wait before executing the function, in milliseconds
 * @param options The options for leading/trailing execution
 * @returns A debounced function
 */
function debounce(func, delay, options = {}) {
    let timer;
    let lastCallTime = 0;
    // Use a normal function here to access `this` context
    const debouncedFn = function (...args) {
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
function throttle(func, limit, options = {}) {
    let lastFunc;
    let lastTime = 0;
    let lastArgs = []; // Store the arguments to use in flush
    // Use a normal function here to access `this` context
    const throttledFn = function (...args) {
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
        }
        else if (options.trailing) {
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
