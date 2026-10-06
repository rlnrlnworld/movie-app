import { Component } from '../core/setup'

export default class Headline extends Component {
    render() {
        this.el.classList.add('headline')
        this.el.innerHTML = `
            <h1>
                <span>FIND THE MOVIE,</span><br>
                READ THE STORY,<br>
                CHECK THE SCORE.
            </h1>
            <p>
                영화를 검색하고 줄거리, 출연진, 평점을 한눈에 확인하세요.<br>
                IMDb · Rotten Tomatoes · Metacritic 평점을 함께 보여드립니다.
            </p>
        `
    }
}