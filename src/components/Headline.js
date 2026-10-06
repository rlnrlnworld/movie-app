import { Component } from '../core/setup'

export default class Headline extends Component {
    render() {
        this.el.classList.add('headline')
        this.el.innerHTML = `
            <h1>
                <span>TMDB API</span><br>
                THE MOVIE<br>
                DATABASE
            </h1>
            <p>
                한국어로 영화를 검색하고 줄거리, 출연진, 평점을 한눈에 확인하세요.<br>
                영화 정보와 포스터는 TMDB, 평점은 IMDb · Rotten Tomatoes · Metacritic(OMDb) 데이터를 사용합니다.
            </p>
        `
    }
}