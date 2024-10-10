// DOM elements
const searchInput = document.querySelector('#search-input');

// Utility functions
const createStarIcon = (type) => `<ion-icon class="star" name="star${type}"></ion-icon>`;

const createCard = ({ image, topic, category, rating, name, id }) => `
  <div class="card" id="${id}">
    <div class="card-image">
      <img src="assets/Logos/${image}" alt="${topic}" class="image">
    </div>
    <div class="card-content">
      <p class="category">${category}</p>
      <h2 class="title">${topic}</h2>
      <div class="rating">${createRatings(rating)}</div>
      <p class="author">Author: ${name}</p>
    </div>
  </div>
`;

const createCardList = (topics) => topics.map(createCard).join('');

// Event handlers
const handleCardClick = (e) => {
  e.preventDefault();
  try {
    window.location.href = 'details.html?id=' + e.currentTarget.id;
  } catch (error) {
    console.error('Error navigating to details.html page:', error);
  }
};

const searchCourse = (searchText) => {
  const resultText = document.getElementById('resultText');
  const query = event.target.value.toLowerCase();
  const filteredTopics = topics.filter(topic => 
    topic.topic.toLowerCase().includes(query)
  );
  // resultText.textContent = `"${filteredTopics.length}" Web Topics Found`;
  // render(filteredTopics);
  return filteredTopics;
};

const handleSearch = (e) => {
  const resultText = document.getElementById('resultText');
  const filteredTopics = searchCourse(e.target.value);
  resultText.textContent = `"${filteredTopics.length}" Web Topics Found`;
  render(filteredTopics);
}

// Render function
const render = (topicsToRender) => {
  cardsContainer.innerHTML = createCardList(topicsToRender);
  cardsContainer.querySelectorAll('.card').forEach(card => 
    card.addEventListener('click', handleCardClick)
  );
};

// Initialization
const init = () => {
  render(topics);
  searchInput.addEventListener('input', handleSearch);
};

// Call the init function when the document loads
document.onload = init();