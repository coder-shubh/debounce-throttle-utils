"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = debounce;
exports.throttle = throttle;
/**
 * Debounce function - Delays the execution of the passed function until the user stops calling it for a specified delay.
 *
 * @param func The function to debounce
 * @param delay The time to wait before executing the function, in milliseconds
 * @returns A debounced function
 */
function debounce(func, delay) {
    let timer;
    return function (...args) {
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
function throttle(func, limit) {
    let lastFunc;
    let lastTime;
    return function (...args) {
        const now = Date.now();
        if (lastTime && now - lastTime < limit) {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                lastTime = now;
                func(...args);
            }, limit - (now - lastTime));
        }
        else {
            lastTime = now;
            func(...args);
        }
    };
}
