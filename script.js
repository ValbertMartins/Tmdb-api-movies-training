const topRatedMoviesCategoryEl = document.querySelector('.top-rated-movies-container')
const urlBase = `https://api.themoviedb.org/3`
const apiKey = '218aed1d10794deff7b827964c539e0c'
const urlTopRatedMovies = `${urlBase}/movie/top_rated?api_key=${apiKey}&language=pt-BR`
const urlImages = `https://image.tmdb.org/t/p/original`
const urlDiscoverMovies = `${urlBase}/discover/movie?`
const urlSearchMovies = `${urlBase}/search/multi?api_key=${apiKey}&query=`
const main = document.querySelector('main')
import render from "./render.js"


const request = async url => {

    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
        
    } catch(error){
        console.log(error)
    }    
}



//category-section
const createCategory = async (urlCategory,categoryEl) => {
    const { results:moviesList } = await request(urlCategory)
    console.log(moviesList)
    console.log(categoryEl)
    
    if(moviesList.length == 0){
        categoryEl.innerHTML = '<h1>Results not found</h1>'
    } else{ 
        categoryEl.innerHTML = ''
        moviesList.forEach( movie_res => {
            const movieContainer = createMovieContainer()
            categoryEl.appendChild(movieContainer)
            movieContainer.append(createPosterMovie(movie_res),createTitleMovie(movie_res),createRankingImdb(movie_res))
            showMovieDetails(movieContainer,movie_res)
            

        });  
        
    }
       
}

const showMovieDetails = (movie,movie_res) => {
    movie.addEventListener('click' , () => {
        showInformation(movie_res)
        const infoMovieEL = document.querySelector('.movie-informations-container')
        infoMovieEL.classList.add('animation-class')

    } )
}

const showInformation = movie => {
    console.log(movie)
    document.querySelector('body').innerHTML = render(urlImages , movie)
    SearchListener()
    
        
}


const createRankingImdb = movie => {
    const rankingImdb = document.createElement('span')
    rankingImdb.innerHTML = `${movie.vote_average} <i class="fa-regular fa-star"></i>`
    return rankingImdb
    
}

const createPosterMovie = movie => {
    const img = document.createElement('img')
    if(movie.poster_path || movie.profile_path){
        img.src = `https://image.tmdb.org/t/p/original${movie.poster_path ?? movie.profile_path}`
        img.classList.add('poster-movie')
        return img
    } 
    
} 

const createTitleMovie = movie => {
    const h3 = document.createElement('h3')
    h3.innerText = movie.title ?? movie.name
    return h3
    
}

const createMovieContainer = () => {
    const movieContainer = document.createElement("div")
    movieContainer.classList.add('movie-container')
    return movieContainer
} 


//outdoor-section

const createOutdoorMovie = async () => {  
    const data = await request(`${urlDiscoverMovies}api_key=${apiKey}&page=${randomNumber(100)}&language=pt-BR`)
    const { backdrop_path, title , vote_average , overview } = data.results[randomNumber(19)]
    outdoorDetails(title,backdrop_path,vote_average, overview)
    document.querySelector('body').style.opacity = 1
      
}

const outdoorDetails = (title,background,vote_average, overview) => {
    const backgroundMovieEl = document.querySelector('.background-container-outdoor')
    backgroundMovieEl.style.backgroundImage = `url(${urlImages}${background})`
    document.querySelector('#title-outooor-movie').innerText = title
    document.querySelector('.sinopsis-outdoor').innerText = overview
    
}

const randomNumber = multiplier => Math.ceil(Math.random() * multiplier)




const hideOutdoor = (outdoorEL,resultSearchEl,backgroundOutdoor) => {
    if(outdoorEL){

        outdoorEL.style.display = 'none'
        backgroundOutdoor.style.backgroundSize = '0'
        document.querySelector('.outdoor-gradient-container').style.minHeight = '0' 
    }
    

}
const showOutdoor = (outdoorEL,backgroundOutdoor) => {
    outdoorEL.style.display = 'block'
    backgroundOutdoor.style.backgroundSize = 'cover'
    backgroundOutdoor.classList.add('animation-class')
    document.querySelector('.outdoor-gradient-container').style.minHeight = '100vh'
}
const hideCategory = category => category.style.display = 'none'




const searchAndCreateAnimations = (backgroundOutdoor,searchInput,resultSearchEl,outdoorEL) => {
    if(backgroundOutdoor){
        backgroundOutdoor.classList.remove('animation-class')

    }

    if(searchInput){
        resultSearchEl.style.display = 'flex'
        hideOutdoor(outdoorEL,resultSearchEl,backgroundOutdoor)
        createCategory(urlSearchMovies + searchInput + '&language=pt-BR', resultSearchEl)
       
    } else {
        showOutdoor(outdoorEL,backgroundOutdoor)
        hideCategory(resultSearchEl)
    }
}

const SearchListener =  () => {
    const searchInput = document.querySelector('.search-input')
    const resultSearchEl = document.querySelector('#results-category')
    const outdoorEL = document.querySelector('.details-outdoor-container')
    const backgroundOutdoor = document.querySelector('.background-container-outdoor')
    searchInput.addEventListener('keyup' , () => {
        console.log(searchInput.value)
        searchAndCreateAnimations(backgroundOutdoor,searchInput.value,resultSearchEl,outdoorEL)
    })

}


const init = () => {
    createOutdoorMovie()
    createCategory(urlTopRatedMovies,topRatedMoviesCategoryEl)
    SearchListener()
    
}



init()

