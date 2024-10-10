 // Get id from URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
  
// Redirect to index.html if id is null
if (id === null) {
    window.location.href = 'index.html';
}

// global topics variable can be found in topics.js file
const topic = topics.find(t => t.id === parseInt(id));


function getFavorites(){
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function checkIfFavoriteExistsDet(favorites, id){
  if (favorites === null || favorites === undefined) {
    return false;
  }
  return favorites.some(topic => topic.id === id);
}

function configFavBtn(){
  let arr = {}  
  if(checkIfFavoriteExistsDet(getFavorites(), topic.id)){
    arr = {text: 'Remove from favorites', icon: 'heart', onclick: () => removeFavorite(topic.id)}
  } else {
    arr = {text: 'Add to favorites', icon: 'heart-outline', onclick: () => addFavorite(topic.id)}
  }
  return arr;
}
  
// Load details function
function loadDetails() {
    
    if (!topic) {
      return '<p>Topic not found.</p>';
    }

    const favBtnConfig = configFavBtn();
    const favBtnText = favBtnConfig.text;
    const favIcon = favBtnConfig.icon;


    return `
      <div class="details">
        <h3 class="category">${topic.category}</h3>
        <h2 class="title">${topic.topic}</h2>
        <div class="rating">
          ${createRatings(topic.rating)}
        </div>
        <p class="description">${topic.description}</p>
      </div>
      <div class="details-aside">
        <div class="image-container">
          <img class="image" src="assets/Logos/${topic.image}" alt="${topic.topic}">
        </div>
        <div class="content-container">
          <p class="author">${topic.topic} by <a href="#" class="author-link">${topic.name}</a></p>
          <div class="box">
            <h3 class="box-title">Interested about this topic?</h3>
            <button id="addToFavBtn" class="add-to-fav" onclick="" >
              ${favBtnText}  <ion-icon name=${favIcon} class="heart-icon"></ion-icon>
            </button>
            <p class="credit">Unlimited Credits</p>
          </div>
        </div>
      </div>`;
}


function loadSubtopics(){

    if(!topic){
        return '<p>Topic not found.</p>';
    }

    return `
    <div class="card">
        <div class="card-header">
            <h4 class="card-title">${topic.topic} Sub Topics</h4>
        </div>
        <ul class="card-list">
           
            ${
                topic.subtopics.map(subtopic => `
                <li class="list-item">
                    <ion-icon class="check-icon" name="checkmark-circle-outline"></ion-icon>
                    ${subtopic}
                </li>`).join('')
            }
        </ul>
    </div>
    ` 
}
  
function addFunctions(){

  const addToFavBtn = document.getElementById('addToFavBtn');
  const func = configFavBtn().onclick;
  addToFavBtn.onclick = func;
}

function renderDetails(){
  const detailsContainer = document.getElementById('details-container');
    const subtopicsContainer = document.getElementById('subtopics-container');
    if (detailsContainer && subtopicsContainer) {
        detailsContainer.innerHTML = loadDetails();
        subtopicsContainer.innerHTML = loadSubtopics();
        addFunctions();
    }
}
  
// Render the details and subtopics
document.addEventListener('DOMContentLoaded', () => {
    renderDetails();
});