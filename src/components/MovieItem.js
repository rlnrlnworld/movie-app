import { Component } from '../core/setup'

export default class MovieItem extends Component {
    constructor(props) {
        super({
            props,
            tagName: 'a'
        })
    }
    render() {
        const { movie } = this.props
        
        //! 경로 명시 속성 설정 메소드
        this.el.setAttribute('href', `#/movie?id=${movie.imdbID}`)
        this.el.classList.add('movie')
        this.el.style.backgroundImage = `url(${movie.Poster})`
    
        // 화면에 출력
        this.el.innerHTML = `
            <div class="info">
                <div class="year">
                    ${movie.Year}
                </div>
                <div class="title">
                    ${movie.Title}
                </div>
            </div>
        `
    }
}