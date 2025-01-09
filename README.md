# debounce-throttle-utils

`debounce-throttle-utils` is a lightweight utility library that provides two essential functions: **debounce** and **throttle**. These functions help optimize performance by controlling how often a function is executed.

- **Debounce** delays the execution of a function until after a specified delay period has passed since the last time it was called.
- **Throttle** ensures that a function is executed at most once in a given time interval.

## Features

- **Debounce**: Ideal for user input handling (e.g., text input, search fields).
- **Throttle**: Useful for events that happen frequently (e.g., scrolling, resizing).

## Installation

You can install the package via npm or yarn:

### Using npm:

```bash
npm install debounce-throttle-utils.
```

### Example:

```ts
//Debounce:
import { debounce } from "debounce-throttle-utils";

// Function to be debounced
const search = (query: string) => {
  console.log("Searching for:", query);
};

// Debounced function with a 500ms delay
const debouncedSearch = debounce(search, 500);

// Test the debounced function by calling it multiple times
debouncedSearch("React");
debouncedSearch("React JS");
debouncedSearch("React Hook");

//Throttle:
import { throttle } from "debounce-throttle-utils";

// Function to be throttled
const handleScroll = () => {
  console.log("Handling scroll event");
};

// Throttled function that can only be called once every 1000ms
const throttledScroll = throttle(handleScroll, 1000);

// Attach the throttled scroll event listener
window.addEventListener("scroll", throttledScroll);
```
