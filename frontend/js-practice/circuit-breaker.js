//  Circuit Breaker Concept

// The circuit breaker pattern is a design concept used to enhance the stability and resilience of a system by preventing a function from being called repeatedly when it fails frequently. It is akin to an electrical circuit breaker that cuts off power to prevent overloads and damage.

// Key Concepts:
// 1. Circuit State:
//    - Closed: The function executes normally.
//    - Open: The function call is blocked due to repeated failures.

// 2. Thresholds:
//    - Failure Limit: Number of allowed failures before the circuit opens.
//    - Threshold Time: Duration the circuit remains open after the failure limit is reached.

// How It Works:
// 1. Function Execution: The function is attempted and if it fails, the failure count increases.
// 2. Circuit Opening: If the failure count exceeds the limit, the circuit opens, blocking further function calls for the threshold period.
// 3. Circuit Reset: After the threshold time elapses, the circuit resets, allowing the function to be called again.


// Problem - Implement a circuit breaker function that takes a function, failure limit, and threshold time as parameters. 
// The circuit breaker should prevent the function from being called if it fails more than the failure limit times within the threshold time. 
// After the threshold time elapses, the circuit should reset, allowing the function to be called again.


const circuitBreaker = (fun, failureLimit, thresholdTime) => {
    let failureCount = 0;
    let lastFailureTime = 0;
    let isCircuitOpen = false;

    return function (...args) {
        const now = Date.now();

        // Check if the circuit is open
        if (isCircuitOpen) {
            if (now - lastFailureTime < thresholdTime) {
                console.log('Circuit is open');
            } else {
                // Reset the circuit breaker after threshold time
                isCircuitOpen = false;
            }
        }

        try {
            const result = fun(...args); // Handle async function
            failureCount = 0; // Reset failure count on success
            return result;
        } catch (error) {
            failureCount++;
            if (failureCount >= failureLimit) {
                isCircuitOpen = true;
                lastFailureTime = Date.now();
            }
            console.log('Failure count:', failureCount);
        }
    };
};

// Test function
let count = 0;
function testFunction() {
    if (count < 3) {
        count++;
        throw new Error('error');
    } else {
        return 'success';
    }
}

// Usage
const circuitBreakerTest = circuitBreaker(testFunction, 3, 1000);
circuitBreakerTest();
circuitBreakerTest();
circuitBreakerTest();
circuitBreakerTest();
setTimeout(async () => {
    const result = circuitBreakerTest(); // Call after threshold time
    console.log(result); 
}, 1100);
