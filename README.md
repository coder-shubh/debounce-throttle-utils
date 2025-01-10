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
// === Example in React Functional Component ===
import React, { useState } from "react";
import { debounce, throttle } from "debounce-throttle-utils"; // Assuming you're using a library like "debounce-throttle-utils"

const App = () => {
  const [query, setQuery] = useState("");
  const [throttleText, setThrottleText] = useState("");

  // Debounced function for search
  const debouncedSearch = debounce(
    (query: string) => {
      console.log("Debounced Searching for:", query);
    },
    500,
    { leading: true, trailing: true }
  );

  // Throttled function for search (only called once every 500ms)
  const throttledSearch = throttle((query: string) => {
    console.log("Throttled Searching for:", query);
  }, 500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    debouncedSearch(event.target.value); // Debounced search call
    throttledSearch(event.target.value); // Throttled search call
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for something..."
      />
      <div>
        <p>Debounced Search Query: {query}</p>
        <p>Throttled Search Query: {throttleText}</p>
      </div>
    </div>
  );
};

export default App;

// === Example in React Native ===

import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { debounce, throttle } from "debounce-throttle-utils"; // Assuming you're using a library like "debounce-throttle-utils"

const App = () => {
  const [query, setQuery] = useState("");
  const [throttleText, setThrottleText] = useState("");

  // Debounced function for search
  const debouncedSearch = debounce(
    (query: string) => {
      console.log("Debounced Searching for:", query);
    },
    500,
    { leading: true, trailing: true }
  );

  // Throttled function for search (only called once every 500ms)
  const throttledSearch = throttle((query: string) => {
    console.log("Throttled Searching for:", query);
  }, 500);

  const handleInputChange = (text: string) => {
    setQuery(text);
    debouncedSearch(text); // Debounced search call
    throttledSearch(text); // Throttled search call
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        placeholder="Search for something..."
        value={query}
        onChangeText={handleInputChange}
      />
      <Text>Debounced Search: {query}</Text>
      <Text>Throttled Search: {throttleText}</Text>
    </View>
  );
};

export default App;
```

### UseCases:

```js
import { debounce, throttle } from 'debounce-throttle-utils';

// === DEBOUNCE ===

// Debounced search function with a 500ms delay, with both leading and trailing executions
const search = debounce((query: string) => console.log('Searching for:', query), 500, {
  leading: true,  // Execute the function on the first input (immediately)
  trailing: true, // Execute the function again after the specified delay
});

// Simulate user typing
search('React');       // Will log immediately due to leading
search('React JS');    // Will log after 500ms due to trailing
search('React Hook');  // Will log after 500ms due to trailing

// === CANCELING DEBOUNCED FUNCTION ===
// If you need to cancel any pending debounced function execution
search.cancel();

// === THROTTLE ===

// Throttled scroll function that can only be triggered once every 1000ms
const handleScroll = throttle(() => console.log('Scrolling...'), 1000, {
  leading: true,  // Execute immediately on the first scroll event
  trailing: true, // Execute again after 1000ms if further scroll events happen
});

// Simulating a scroll event (this would be added to the scroll listener in a real-world case)
window.addEventListener('scroll', handleScroll);

// === FLUSHING THROTTLED FUNCTION ===
// You can immediately execute the throttled function using flush()
handleScroll.flush();  // Forces the throttled function to execute immediately



2. 'Node.js / Backend':

import { debounce } from 'debounce-throttle-utils';

// Simulate a background task that runs after user stops interacting
const updateDatabase = (userData: object) => {
  console.log('Updating the database with user data:', userData);
};

// Create a debounced function that waits for 1 second after the last call
const debouncedUpdate = debounce(updateDatabase, 1000);

// Simulate user making changes
debouncedUpdate({ name: 'John Doe', email: 'john@example.com' });  // Won't execute immediately
debouncedUpdate({ name: 'John Doe', email: 'john.doe@example.com' }); // Updates after 1 second of no change

// Example: Sending an email after a user stops typing for a set period
const sendEmail = (emailContent: string) => {
  console.log(`Sending email: ${emailContent}`);
};

// Use debounce to ensure the email is only sent once after the user stops typing for 500ms
const debouncedSendEmail = debounce(sendEmail, 500);
debouncedSendEmail('Hello, your subscription is about to expire.');
debouncedSendEmail('Hello, your subscription is almost expired.');
// Email will be sent only after 500ms delay, i.e., once the user stops typing.


import { throttle } from 'debounce-throttle-utils';

// Function to simulate sending an API request
const sendApiRequest = (requestData: object) => {
  console.log('Sending API request with data:', requestData);
};

// Create a throttled function that sends an API request only once every 2000ms
const throttledApiRequest = throttle(sendApiRequest, 2000);

// Simulating multiple API calls
throttledApiRequest({ userId: 1 });  // This will execute immediately
throttledApiRequest({ userId: 2 });  // This will be throttled (won't execute immediately)
throttledApiRequest({ userId: 3 });  // This will also be throttled
// After 2000ms, the next API call will be triggered.

setTimeout(() => {
  throttledApiRequest({ userId: 4 }); // After 2000ms, the request will be sent
}, 3000);

// Example: Limiting database queries
const queryDatabase = (query: string) => {
  console.log(`Querying database with query: ${query}`);
};

// Throttling database queries to avoid overloading the database
const throttledDatabaseQuery = throttle(queryDatabase, 3000);
throttledDatabaseQuery('SELECT * FROM users WHERE status = "active"');
throttledDatabaseQuery('SELECT * FROM users WHERE status = "inactive"');
// Only one query will be executed every 3 seconds, avoiding unnecessary load
```

- **Explanation of Key Points**:

**Debounce**:

- In Debouncing, the function will only execute after the delay has passed without any additional event calls.
- It’s commonly used for input fields like search bars where you want to wait for the user to finish typing before performing an action.
  **Throttle**:
- In Throttling, the function will be called at most once in a given time frame (e.g., once every 500ms).
- It’s useful for things like scroll events, window resizing, or any case where you want to limit how often a function is triggered during rapid events.

**Debounce in Backend**:

- Use debounce to delay background tasks until the user has finished interacting. For example, debounced database updates ensure that only the final state of the data is saved after the user stops making changes.
- Real-world usage: Form submission, saving user data after changes, or updating cache.
  **Throttle in Backend**:
- Throttle is used to limit the rate of execution. It ensures that a function (e.g., API request, database query) is executed at most once in a given time interval.
- Real-world usage: Limiting the number of API calls to an external service, rate-limiting, controlling frequent queries to a database, etc.

## License

Include a `LICENSE` file. For example, if you're using the MIT License:

```txt
MIT License

Copyright (c) 2025 [coder-shubh]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Summary:

- This `README.md` now includes installation instructions, examples for **debounce** and **throttle** functions, and detailed explanations of how the library can be used in different environments **(React, React Native, Node.js, Vanilla JS)**.
- Copy-pasting this file will work seamlessly for users who are interested in integrating the `debounce-throttle-utils` package into their projects.
