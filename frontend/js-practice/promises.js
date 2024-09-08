const testPromise = () => {
    let count = 0
    return () => {
        count += 1
        return new Promise((resolve, reject) => {
            if (count > 5) {
                resolve('Success');
            } else {
                reject('Error');
            }
        });
    }
}

const retry = (func, retries) => {
    return func()
        .then(result => {
            console.log(result); // Log success message
        })
        .catch(error => {
            if (retries > 0) {
                console.log('Retrying...');
                return retry(func, retries - 1); // Retry the function
            } else {
                // Final rejection after all retries are exhausted
                console.error('Final error:', error);
                return Promise.reject(error);
            }
        });
}

// Call the retry function with the testPromise and a number of retries
retry(testPromise(), 7)
    .catch(error => {
        console.error('Unhandled error:', error); // Final catch for any unhandled errors
    });
