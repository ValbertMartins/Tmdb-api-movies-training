

export default function render(poster,title,sinopsis) {
    return `
    <header class="container">
            <nav class="navbar-header-container">
                <a href=""id="logo"><span class="color-red">MOVIE</span>DOM</a>
                <ul class="navbar-menu" >
                    <li><a href="">TV Shows</a></li>
                    <li><a href="#top-rated-movies">Movies</a></li>
                    <li><a href="">Upcoming</a></li>
                    <li><a href="">Trailers</a></li>
                    <li><a href="">My list</a></li>
                </ul>

                <div class="icons-container">
                    <button id="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
                    <input type="text" class="search-input" placeholder="Search for Movies..."></button>
                    <a href=""><i class="fa-regular fa-bell"></i></a>
                    <a href=""><i class="fa-regular fa-user"></i></a>
                </div>   
            </nav>     
        </header>
        

        <section class="container">
            <div>
                <h1 class='title-movie'>${title}</h1>
            </div>

            <article class="movie-informations-container">

                <div class="movie-container">
                    <img src="${poster}"  class="poster-movie" alt="">
                </div>


                <div class="movie-details">
                    <div>
                        <h2 class="color-red">SINOPSIS</h2>
                    </div>
                    <div>
                        <p class="sinopsis">
                            ${sinopsis}
                        </p>
                    </div>
                    <div>
                       <button class="default-button" id="watch-btn">
                            <span>
                                 <i class="fa-sharp fa-solid fa-play"></i>
                            </span> Play
                        </button>
                    </div>
                </div>


            </article>

        </section>


        <footer>
            <div class="footer-container">
                <a href=""id="logo">MOVIEDOM</a>
                <ul class="navbar-menu" >
                    <li><a href="">TV Shows</a></li>
                    <li><a href="#top-rated-movies">Movies</a></li>
                    <li><a href="">Upcoming</a></li>
                    <li><a href="">Trailers</a></li>
                    <li><a href="">My list</a></li>
                </ul>

                <div class="icons-social-container flex-container">
                    <a href="">
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>

                    <a href="">
                        <i class="fa-brands fa-instagram"></i>  
                    </a>

                    <a href="">
                        <i class="fa-brands fa-youtube"></i>
                    </a>
                    <a href="">
                        <i class="fa-brands fa-twitter"></i>
                    </a>
                </div>

            </div>
        </footer>
    `
}