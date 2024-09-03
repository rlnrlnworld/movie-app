import { Component } from '../core/setup'
import movieStore, { getMovieDetails } from '../store/movie'

export default class Movie extends Component {
    async render() {
        //? 영화 정보 가져오기
        await getMovieDetails(history.state.id)
        console.log(movieStore.state.movie)
        const { movie } = movieStore.state

        this.el.classList.add('container','the-movie')
        this.el.innerHTML = `
            <div 
                class="poster" 
                style="background-image: url(${movie.Poster})"
            >
            </div>
            <div class="description">
                <div class="title">${movie.Title}</div>
                <div class="labels">
                    <span>${movie.Released}</span>
                    &nbsp;|&nbsp;
                    <span>${movie.Runtime}</span>
                    &nbsp;|&nbsp;
                    <span>${movie.Country}</span>
                </div>
                <div class="plot">${movie.Plot}</div>
                <div>
                    <h3>Ratings</h3>
                    ${movie.Ratings.map(rating => {
                        return `<p><span class="site"><div class="site-icon ${rating.Source}">icon</div> ${rating.Source}</span> - ${rating.Value}</p>`
                    }).join('')}
                </div>
                <div>
                    <h3>Actors</h3>
                    <p>${movie.Actors}</p>
                </div>
                <div>
                    <h3>Director</h3>
                    <p>${movie.Director}</p>
                </div>
                <div>
                    <h3>Production</h3>
                    <p>${movie.Production}</p>
                </div>
                <div>
                    <h3>Genre</h3>
                    <p>${movie.Genre}</p>
                </div>
            </div>
        `
    }
}