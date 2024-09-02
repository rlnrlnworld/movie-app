import { Component } from '../core/setup'
import movieStore, { searchMovies } from '../store/movie'

export default class Search extends Component {
    render() {
        this.el.classList.add('search')
        this.el.innerHTML = `
            <input placeholder="Enter the movie title to search"/>
            <button class="btn btn-primary">Search</button>
        `

        const inputEl = this.el.querySelector('input')
        inputEl.addEventListener('input', () => {
            movieStore.state.searchText = inputEl.value
        })
        inputEl.addEventListener('keydown', e => {
            // Enter 입력 시 검색 실행
            if( e.key === 'Enter' && movieStore.state.searchText.trim() ){
                searchMovies(1)
            }
        })

        const btnEl = this.el.querySelector('.btn')
        btnEl.addEventListener('click', () => {
            // 버튼 클릭 시, 검색 실행
            if(movieStore.state.searchText.trim() ){
                searchMovies(1)
            }
        })
    }
}