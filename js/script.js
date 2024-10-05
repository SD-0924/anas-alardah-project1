const darkModeToggle = document.getElementById('darkModeToggle');
const favouritesBtn = document.getElementById('favouritesBtn');
const body = document.body;
const cardsContainer = document.querySelector('.cards-container');
const cards = document.querySelectorAll('.card');
const anchorTags = document.querySelectorAll('a');

// On small screens, remove the text but keep the icons
if (window.innerWidth < 768) {
    anchorTags.forEach(tag => {
        tag.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                child.remove();
            }
        });
    });
}

// Toggle dark mode
darkModeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        darkModeToggle.innerHTML = window.innerWidth > 768 ? '<i class="fa-regular fa-sun"></i>Light Mode' : '<i class="fa-regular fa-sun"></i>';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        darkModeToggle.innerHTML = window.innerWidth > 768 ? '<i class="fa-regular fa-moon"></i>Dark Mode' : '<i class="fa-regular fa-moon"></i>';
    }
});


favouritesBtn.addEventListener('click', (e) => {
    e.preventDefault();
});



   

