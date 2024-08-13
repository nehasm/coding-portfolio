
import fetch from "node-fetch"; // fetch is not available in node.js by default
const fetchWithTimeout = (url, timeout = 3000) => { 
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        console.log('Request timed out');
        controller.abort()
    }, timeout);
    const response  = fetch(url, { signal: controller.signal });
    return response.finally(() => clearTimeout(timeoutId));
}

// Usage
fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1', 1000)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));