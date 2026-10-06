import { Component } from '../core/setup'
import movieStore, { getMovieDetails, getMovieRatings } from '../store/movie'

const RATING_SKELETON_ROWS = 3

export default class Movie extends Component {
    constructor() {
        super()
        movieStore.subscribe('ratings', () => this.renderRatings())
    }
    async render() {
        this.el.classList.add('container','the-movie')
        //? Skeleton loading animation
        this.el.innerHTML = `
            <div class="poster skeleton"></div>
            <div class="description">
                <div class="title skeleton"></div>
                <div class="labels skeleton"></div>
                <div class="plot skeleton"></div>
            </div>
        ` 

        //? 영화 정보 가져오기 (TMDB) — 평점(OMDB)은 기다리지 않고 먼저 그린다
        await getMovieDetails(history.state.id)
        const { movie } = movieStore.state
        const labels = [movie.released, movie.runtime, movie.country]
            .filter(Boolean)
            .map(v => `<span>${v}</span>`)
            .join('&nbsp;|&nbsp;')

        this.el.innerHTML = `
            <div 
                class="poster ${movie.poster ? '' : 'no-poster'}" 
                style="${movie.poster ? `background-image: url(${movie.poster})` : ''}"
            >
            </div>
            <div class="description">
                <div class="title">${movie.title}</div>
                <div class="labels">${labels}</div>
                <div class="plot">${movie.plot || '아직 한국어 줄거리가 등록되지 않았어요.'}</div>
                <div>
                    <h3>Ratings</h3>
                    <div class="ratings"></div>
                </div>
                <div>
                    <h3>Actors</h3>
                    <p>${movie.actors || '-'}</p>
                </div>
                <div>
                    <h3>Director</h3>
                    <p>${movie.director || '-'}</p>
                </div>
                <div>
                    <h3>Production</h3>
                    <p>${movie.production || '-'}</p>
                </div>
                <div>
                    <h3>Genre</h3>
                    <p>${movie.genres || '-'}</p>
                </div>
            </div>
        `

        //? 평점 지연 로드 — 스켈레톤 먼저, 도착하면 renderRatings가 교체
        this.renderRatings()
        getMovieRatings(movie.imdbID)
    }
    renderRatings() {
        if (!this.el.isConnected) return
        const ratingsEl = this.el.querySelector('.ratings')
        if (!ratingsEl) return
        const { ratings } = movieStore.state

        if (ratings === null) {
            ratingsEl.innerHTML = Array.from({ length: RATING_SKELETON_ROWS }, () => `
                <p class="rating-row">
                    <span class="site-icon skeleton"></span>
                    <span class="rating-text skeleton"></span>
                </p>
            `).join('')
            return
        }
        if (ratings.length === 0) {
            ratingsEl.innerHTML = `<p class="rating-empty">등록된 평점이 없어요.</p>`
            return
        }
        ratingsEl.innerHTML = ratings.map(({ source, value }) => `
            <p class="rating-row">
                <span class="site">
                    <span class="site-icon ${source}">icon</span> ${source}
                </span>
                - ${value}
            </p>
        `).join('')
    }
}
