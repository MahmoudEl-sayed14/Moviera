const urlParams = new URLSearchParams(window.location.search);
const index = urlParams.get('id');

const movie = getMovieData();
showMovieDetails(movie);

function getMovieData() {
    const moviesData = JSON.parse(localStorage.getItem('Movies'));
    return moviesData ? moviesData[index] : null;
}

function showMovieDetails(movie) {
    const movieTitleElement = document.getElementById('movieTitle');
    const moviePosterElement = document.getElementById('moviePoster');
    const movieRatingElement = document.getElementById('movieRating');
    const movieYearElement = document.getElementById('movieYear');
    const movieGenreElement = document.getElementById('movieGenre');
    const movieDescriptionElement = document.getElementById('movieDescription');

    if (movie) {
        movieTitleElement.textContent = movie.title;
        moviePosterElement.src = movie.poster;
        movieRatingElement.textContent = movie.rate;
        movieYearElement.textContent = movie.year;
        movieGenreElement.textContent = movie.genre;
        movieDescriptionElement.textContent = movie.storyline;
    } else {
        movieTitleElement.textContent = 'Movie Not Found';
        movieDescriptionElement.textContent = 'The requested movie details are not available.';
    }
}
