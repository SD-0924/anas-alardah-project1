function createTopicCards() {

    const cardsContainer = document.querySelector('.cards-container');

    for(let i = 0; i < topics.length; i++) {
        // Create card
        const card = document.createElement('div');
        card.classList.add('card');

        // Create card image
        const cardImage = document.createElement('div');
        cardImage.classList.add('card-image');
        const image = document.createElement('img');
        image.src = `assets/Logos/${topics[i].image}`;
        image.alt = topics[i].topic;
        image.classList.add('image');

        // Create card content
        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        // Create card category
        const cardCategory = document.createElement('p');
        cardCategory.classList.add('category');
        cardCategory.textContent = topics[i].category;

        // Create card title
        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('title'); 
        cardTitle.textContent = topics[i].topic;

        // Create card rating
        const cardRating = document.createElement('div');
        cardRating.classList.add('rating');

        const rating = topics[i].rating;
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let j = 1; j <= 5; j++) {
            const star = document.createElement('ion-icon');
            star.classList.add('star');

            if (j <= fullStars) {
                star.name = 'star';
            } else if (j === fullStars + 1 && hasHalfStar) {
                star.name = 'star-half';
            } else {
                star.name = 'star-outline';
            }

            cardRating.appendChild(star);
        }

        // Create card author
        const cardAuthor = document.createElement('p');
        cardAuthor.classList.add('author');
        cardAuthor.textContent = `Author: ${topics[i].name}`;

        card.addEventListener('click', (e) => {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            try {
                window.location.href = 'details.html';
            } catch (error) {
                console.error('Error navigating to details.html page:', error);
            }
        });

        // Append children
        cardImage.appendChild(image);
        cardContent.appendChild(cardCategory);
        cardContent.appendChild(cardTitle);
        cardContent.appendChild(cardRating);
        cardContent.appendChild(cardAuthor);
        card.appendChild(cardImage);
        card.appendChild(cardContent);
        cardsContainer.appendChild(card);
    }
}

// Call the function when the window loads
window.addEventListener('load', createTopicCards);