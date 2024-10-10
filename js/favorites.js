let favoritesList = [];
const favoritesNavBtn = document.getElementById('favouritesNavBtn');
const addToFavBtn = document.getElementById('addToFavBtn');


favoritesNavBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleFavorites()
});

function toggleFavorites() {
    const favoritesSection = document.getElementById('favorites');
    if (favoritesSection.style.display === 'none') {
        favoritesSection.style.display = 'block';
    } else {
        favoritesSection.style.display = 'none';
    }
}

// Function to create ratings (reused)
const createRatings = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return Array(5).fill().map((_, index) => {
        if (index < fullStars) return '<ion-icon class="star" name="star"></ion-icon>';
        if (index === fullStars && hasHalfStar) return '<ion-icon class="star" name="star-half"></ion-icon>';
        return '<ion-icon class="star" name="star-outline"></ion-icon>';
    }).join('');
};

function checkIfFavoriteExists(topicId) {

    if (!favoritesList) {
        console.error('favoritesList is null or undefined');
        return false;
    }
    if (!topicId) {
        console.error('topicId is null or undefined');
        return false;
    }
    if (favoritesList.some(topic => topic.id === topicId)) {
        console.log('This topic is already in your favorites list.');
        return true;
    }
    return false;
}

function findTopic(topicId){
    return topics.find(topic => topic.id === topicId);
}

function pushTopicToFavorites(topic){
    favoritesList.push(topic);
}

function saveToLocalStorage(){
    localStorage.setItem('favorites', JSON.stringify(favoritesList));
}

function addFavorite(topicId){
    if(checkIfFavoriteExists(topicId)){
        return;
    }
    pushTopicToFavorites(findTopic(topicId));
    addCardToFavoritesSection();
    saveToLocalStorage();
    toggleFavorites();
    renderDetails();
}

function createFavoriteCard(topic){
    return `
      <div class="favorite-item">
         <div class="delete-btn-container">
            <button class="delete-btn" onclick="removeFavorite(${topic.id})">×</button>
        </div>
        <img src="assets/Logos/${topic.image}" alt="${topic.topic}">
        <div class="content">
          <h3>${topic.topic}</h3>
          <div class="rating">${createRatings(topic.rating)}</div>
        </div>
    </div>`;
}

function addCardToFavoritesSection(){
    const favoritesSection = document.getElementById('favoritesList');
    favoritesSection.innerHTML = favoritesList.map(topic => createFavoriteCard(topic)).join('');
}

function removeFavorite(topicId){
    favoritesList = favoritesList.filter(topic => topic.id !== topicId);
    toggleFavorites();
    saveToLocalStorage();
    addCardToFavoritesSection();
    renderDetails();
}

function getFavorites(){
    const favorites = localStorage.getItem('favorites');
    if(favorites){
        favoritesList = JSON.parse(favorites);
    }
    addCardToFavoritesSection();
}

document.onload = getFavorites();