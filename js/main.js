let moviesData = []; 
function showMovies() {
    const movieListContainer = document.getElementById('movieList');
    const noMoviesMessage = document.getElementById('noMoviesMessage');

    moviesData = getMoviesFromLocalStorage();

    if (moviesData.length === 0) {
        toggleDisplay(noMoviesMessage, true);
        movieListContainer.innerHTML = ''; 
        return;
    }

    toggleDisplay(noMoviesMessage, false);

    let movieCardsHTML = '';
    for (let i = 0; i < moviesData.length; i++) {
        const movie = moviesData[i];
        movieCardsHTML += createMovieCardHTML(movie, i);
    }

    movieListContainer.innerHTML = movieCardsHTML;
}

function getMoviesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('Movies')) || [];
}

function toggleDisplay(element, shouldShow) {
    element.style.display = shouldShow ? 'block' : 'none';
}

function createMovieCardHTML(movie, index) {
    return `<div class="col-12">
    <article class="card mb-3">
        <div class="row no-gutters bg-image card-container">
            <img class="col-md-2 card-zoom" src="${movie.poster}" alt="Movie Poster">
            <div class="col-md-10">
                <div class="card-body d-flex flex-column h-100">
                    <header>
                        <h5 class="card-title">${movie.title} (${movie.year})</h5>
                    </header>
                    <section>
                        <p class="card-text text-justify">${movie.storyline}</p>
                    </section>
                    <footer class="d-flex justify-content-between">
                        <p class="card-text mb-0 mt-2">
                            <i class="bi bi-star-fill text-warning"></i>
                            <small class="text-muted">${movie.rate}</small>
                        </p>
                        <div>
                            <a href="Details.html?id=${index}" class="btn btn-outline-secondary">
                                <i class="bi bi-camera-reels"></i>
                                Details
                            </a>
                            <a href="Movie.html?id=${index}" class="btn btn-outline-primary">
                                <i class="bi bi-pencil"></i>
                                Edit
                            </a>
                            <button onclick="deleteMovie(${index})" class="btn btn-danger js-delete">
                                <i class="bi bi-trash"></i>
                                Delete
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </article>
</div>`;
}

showMovies();

function deleteMovie(index) {
    moviesData.splice(index, 1);
    saveMoviesToLocalStorage();
    showMovies();
}

function saveMoviesToLocalStorage() {
    localStorage.Movies = JSON.stringify(moviesData);
}