const starContainer = document.getElementsByClassName('stars')[0];

// Function to remove all children from a container
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Function to update the rating
function updateRating(rating) {
    // Ensure the rating is within bounds
    rating = Math.max(0, Math.min(5, rating));

    // Update star icons based on rating
    for (let i = 0; i < 5; i++) {
        const star = starContainer.children[i];
        if (i < rating) {
            star.src = './star.svg';
        } else {
            star.src = './empty-star.svg';
        }
    }
}

// Create stars and add them to the container
function createStars() {
    removeAllChildren(starContainer); // Remove existing stars

    for (let i = 0; i < 5; i++) {
        const star = document.createElement('img');
        star.src = './empty-star.svg';
        star.height = 20;
        star.width = 20;
        star.onclick = () => {
            updateRating(i + 1);
        };
        starContainer.appendChild(star);
    }
}

// Initialize stars
createStars();
