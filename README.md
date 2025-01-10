# debounce-throttle-utils

`debounce-throttle-utils` is a lightweight utility library that provides two essential functions: **debounce** and **throttle**. These functions help optimize performance by controlling how often a function is executed.

- **Debounce** delays the execution of a function until after a specified delay period has passed since the last time it was called.
- **Throttle** ensures that a function is executed at most once in a given time interval.

## Features

- **Debounce**: Ideal for user input handling (e.g., text input, search fields).
- **Throttle**: Useful for events that happen frequently (e.g., scrolling, resizing).

<!-- Badges -->
<p style="align:center;">
  <img src="https://img.shields.io/npm/v/debounce-throttle-utils" alt="npm version">
</p>


<div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
  <!-- First GIF -->
  <img src="https://github.com/coder-shubh/debounce-throttle-utils/blob/297b19962148e81f14648501084aec86d6779a60/src/video.gif?raw=true" alt="Demo 1" width="45%" height='30%'>
</div>

<!-- Table of Contents -->
<h2>Table of Contents</h2>

- [Installation](#installation)
- [Features](#Features)
- [Usage](#UseCases)
- [Example](#Example)
- [License](#license)
- [Summary](#Summary)

## Installation

You can install the package via npm or yarn:

### Using npm:

```bash
npm install debounce-throttle-utils
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

### UseCases:

```js
1. 'React (Web)/React-native':

import { debounce, throttle } from 'debounce-throttle-utils';

// Debounced search function with a 500ms delay
const search = debounce((query: string) => console.log('Searching for:', query), 500);

// Throttled scroll function that can only be triggered once every 1000ms
const handleScroll = throttle(() => console.log('Scrolling...'), 1000);


3. 'Node.js / Backend':

You can also use the debounce and throttle functions in Node.js or backend services to limit the rate of requests or actions.

Debounce: Used to delay the execution of background tasks until the user stops interacting for a specified amount of time.
Throttle: Controls the rate at which a function is called, such as limiting the number of requests to an API.

```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Summary:

- This `README.md` now includes installation instructions, examples for **debounce** and **throttle** functions, and detailed explanations of how the library can be used in different environments **(React, React Native, Node.js, Vanilla JS)**.
- Copy-pasting this file will work seamlessly for users who are interested in integrating the `debounce-throttle-utils` package into their projects.
