const topRatedMoviesCategory = document.querySelector('.top-rated-movies-container')
const apiKey = '218aed1d10794deff7b827964c539e0c'
const urlTopRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`


const request = async url => {

    try {
        const response = await fetch(url)
        const data = await response.json()
        const moviesList = data.results
        console.log(moviesList)
        createCategory(moviesList,topRatedMoviesCategory)
        
    } catch(error){
        console.log(error)
    }    
}


const createCategory = (moviesList,category) => {
    
    moviesList.forEach( movie => {
        const movieContainer = createMovieContainer()
        category.appendChild(movieContainer)
        movieContainer.append(createPosterMovie(movie),createTitleMovie(movie),createRankingImdb(movie))
        
        
    });  
}
const createRankingImdb = movie => {
    const rankingImdb = document.createElement('span')
    rankingImdb.innerText = movie.vote_average
    return rankingImdb
    
}

const createPosterMovie = movie => {
    const img = document.createElement('img')
    img.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`
    img.classList.add('poster-movie')
    return img
    
} 

const createTitleMovie = movie => {
    const h3 = document.createElement('h3')
    h3.innerText = movie.title
    return h3
    
}

const createMovieContainer = () => {
    const movieContainer = document.createElement("div")
    movieContainer.classList.add('movie-container')
    return movieContainer
} 



request(urlTopRatedMovies)