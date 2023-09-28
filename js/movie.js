const titleInput = document.getElementById('Title');
const genreInput = document.getElementById('GenreId');
const yearInput = document.getElementById('Year');
const rateInput = document.getElementById('Rate');
const storylineInput = document.getElementById('Storyline');
const posterPreview = document.getElementById('poster-preview');
const submitButton = document.getElementById('Submit');
const heading = document.getElementById('heading'); 

let moviesData = JSON.parse(localStorage.getItem('Movies')) || [];
const urlParams = new URLSearchParams(window.location.search);
const index = urlParams.get('id');

if (index !== null) {
  const movie = moviesData[index];
  titleInput.value = movie.title;
  yearInput.value = movie.year;
  rateInput.value = movie.rate;
  genreInput.value = movie.genre;
  storylineInput.value = movie.storyline;
  posterPreview.src = movie.poster;
  posterPreview.style.display = 'block';
  heading.innerHTML = 'Edit Movie'; 
} else {
  heading.innerHTML = 'Create Movie'; 
}

function isInputEmpty(input) {
  return input.value.trim() === "";
}

function validateInputs() {
  const titleValue = titleInput.value.trim();
  const genreValue = genreInput.value.trim();
  const yearValue = yearInput.value.trim();
  const rateValue = rateInput.value.trim();
  const storylineValue = storylineInput.value.trim();
  const posterValue = posterPreview.src.trim();

  if (
    isInputEmpty(titleInput) ||
    isInputEmpty(genreInput) ||
    isInputEmpty(yearInput) ||
    isInputEmpty(rateInput) ||
    isInputEmpty(storylineInput) ||
    posterValue === ""
  ) {
    alert("Please fill in all required fields.");
    return false; 
  }

  return true; 
}

submitButton.onclick = function () {
  if (!validateInputs()) {
    return; 
  }

  
  const newMovie = {
    title: titleInput.value.trim(),
    genre: genreInput.value.trim(),
    year: yearInput.value.trim(),
    rate: rateInput.value.trim(),
    storyline: storylineInput.value.trim(),
    poster: posterPreview.src.trim(),
  };

  if (index !== null) {
    moviesData.splice(index, 1, newMovie); // Update an existing movie
  } else {
    moviesData.push(newMovie);
  }

  localStorage.setItem('Movies', JSON.stringify(moviesData));
  window.location.href = 'index.html';
};
function displayImage(input) {
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      posterPreview.src = e.target.result;
      posterPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
    return;
  }
  posterPreview.src = '';
  posterPreview.style.display = 'none';
}
