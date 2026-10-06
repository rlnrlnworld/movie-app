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
        this.el.setAttribute('href', `#/movie?id=${movie.id}`)
        this.el.classList.add('movie')
        if (movie.poster) {
            this.el.style.backgroundImage = `url(${movie.poster})`
        } else {
            this.el.classList.add('no-poster')
        }
    
        // 화면에 출력
        this.el.innerHTML = `
            <div class="info">
                <div class="year">
                    ${movie.year}
                </div>
                <div class="title">
                    ${movie.title}
                </div>
            </div>
        `
    }
}
