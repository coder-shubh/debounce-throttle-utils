import { debounce, throttle } from './index';

jest.useFakeTimers(); // Use fake timers for controlling time during tests

describe('Debounce Function', () => {
  it('should call the function after the specified delay', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn(); // Trigger the debounced function
    debouncedFn(); // Trigger again before the delay
    debouncedFn(); // Trigger again before the delay

    // Assert that the function is not called immediately
    expect(mockFn).not.toHaveBeenCalled();

    // Fast-forward the timers by 500ms (i.e., simulate the passage of time)
    jest.advanceTimersByTime(500);

    // Assert that the function has been called exactly once after the debounce delay
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should reset the timer if the function is called within the delay', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn(); // Trigger the debounced function
    debouncedFn(); // Trigger again within the 500ms delay

    // Fast-forward time to 500ms
    jest.advanceTimersByTime(500);

    // The function should only be called once after the final call
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

describe('Throttle Function', () => {
  it('should call the function at most once every specified interval', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 1000);

    throttledFn(); // Trigger the throttled function
    throttledFn(); // Trigger again immediately (should be throttled)
    throttledFn(); // Trigger again immediately (should be throttled)

    // Assert that the function was only called once immediately
    expect(mockFn).toHaveBeenCalledTimes(1);

    // Fast-forward by 1000ms to simulate the time interval
    jest.advanceTimersByTime(1000);

    throttledFn(); // Now, it should be called after 1000ms

    // Assert that the function is called again only after the specified interval
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should execute the function immediately and then throttle subsequent calls', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 500);

    throttledFn(); // Function should execute immediately
    expect(mockFn).toHaveBeenCalledTimes(1);

    // Fast-forward time by 200ms (within the limit)
    jest.advanceTimersByTime(200);
    throttledFn(); // Function should NOT execute yet (within throttle limit)
    expect(mockFn).toHaveBeenCalledTimes(1);

    // Fast-forward time by 300ms (making it exceed the 500ms limit)
    jest.advanceTimersByTime(300);
    throttledFn(); // Function should execute now
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
