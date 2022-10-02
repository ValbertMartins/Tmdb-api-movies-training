const topRatedMoviesCategoryEl = document.querySelector('.top-rated-movies-container')
const apiKey = '218aed1d10794deff7b827964c539e0c'
const urlTopRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
const urlImages = `https://image.tmdb.org/t/p/original`
const urlDiscoverMovies = `https://api.themoviedb.org/3/discover/movie?`

const request = async url => {

    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
        
    } catch(error){
        console.log(error)
    }    
}

const createCategory = async (urlCategory,categoryEl) => {
    const moviesList = await request(urlCategory)

    moviesList.results.forEach( movie => {
        const movieContainer = createMovieContainer()
        categoryEl.appendChild(movieContainer)
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
const init = () => {
    createCategory(urlTopRatedMovies,topRatedMoviesCategoryEl)
    
}

init()

//request(urlTopRatedMovies)
const body = document.querySelector('body')
const title = document.querySelector('#title-outooor-movie')


const createOutdoorMovie = async () => {    

    const data = await request(`${urlDiscoverMovies}api_key=${apiKey}&page=${randomNumber(500)}&language=pt-BR`)
    console.log(data)
    const { backdrop_path, title , vote_average , overview } = data.results[randomNumber(19)]
    outdoorDetails(title,backdrop_path,vote_average, overview)
    body.style.opacity = 1
    
      
}

const outdoorDetails = (title,background,vote_average, overview) => {
    const backgroundMovieEl = document.querySelector('.background-container-outdoor')
    backgroundMovieEl.style.backgroundImage = `url(${urlImages}${background})`
    document.querySelector('#title-outooor-movie').innerText = title
    document.querySelector('.sinopsis-outdoor').innerText = overview

}

const randomNumber = multiplier => Math.ceil(Math.random() * multiplier)

createOutdoorMovie()


