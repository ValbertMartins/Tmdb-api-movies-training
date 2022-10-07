const topRatedMoviesCategoryEl = document.querySelector('.top-rated-movies-container')
const urlBase = `https://api.themoviedb.org/3`
const apiKey = '218aed1d10794deff7b827964c539e0c'
const urlTopRatedMovies = `${urlBase}/movie/top_rated?api_key=${apiKey}`
const urlImages = `https://image.tmdb.org/t/p/original`
const urlDiscoverMovies = `${urlBase}/discover/movie?`
const urlSearchMovies = `${urlBase}/search/movie?api_key=${apiKey}&query=`



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
    
    if(moviesList.length == 0){
        categoryEl.innerHTML = '<h1>Results not found</h1>'
    } else{ 
        categoryEl.innerHTML = ''
        moviesList.forEach( movie => {
            const movieContainer = createMovieContainer()
            categoryEl.appendChild(movieContainer)
            movieContainer.append(createPosterMovie(movie),createTitleMovie(movie),createRankingImdb(movie))
                 
        });  

    }

    

}
const createRankingImdb = movie => {
    const rankingImdb = document.createElement('span')
    rankingImdb.innerText = movie.vote_average
    return rankingImdb
    
}

const createPosterMovie = movie => {
    const img = document.createElement('img')
    if(movie.poster_path){
        img.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`
        img.classList.add('poster-movie')
        return img
    } 
    
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


//outdoor-section

const createOutdoorMovie = async () => {  
    const data = await request(`${urlDiscoverMovies}api_key=${apiKey}&page=${randomNumber(500)}&language=pt-BR`)
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
    outdoorEL.style.display = 'none'
    backgroundOutdoor.style.backgroundSize = '0'
    document.querySelector('.outdoor-gradient-container').style.minHeight = '0' 
    resultSearchEl.style.display = 'flex'

}
const showOutdoor = (outdoorEL,backgroundOutdoor) => {
    outdoorEL.style.display = 'block'
    backgroundOutdoor.style.backgroundSize = 'cover'
    backgroundOutdoor.classList.add('animation-class')
    document.querySelector('.outdoor-gradient-container').style.minHeight = '100vh'
}
const hideCategory = category => category.style.display = 'none'




const searchAndCreateAnimations = (backgroundOutdoor,searchInput,resultSearchEl,outdoorEL) => {
    backgroundOutdoor.classList.remove('animation-class')
    if(searchInput){
        
        hideOutdoor(outdoorEL,resultSearchEl,backgroundOutdoor)
        createCategory(urlSearchMovies + searchInput, resultSearchEl)
       
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
        searchAndCreateAnimations(backgroundOutdoor,searchInput.value,resultSearchEl,outdoorEL)
    })

}




const init = () => {
    createOutdoorMovie()
    createCategory(urlTopRatedMovies,topRatedMoviesCategoryEl)
    SearchListener()
    
}



init()

