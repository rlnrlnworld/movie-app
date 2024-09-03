import { Store } from '../core/setup'

const store = new Store({
    searchText: '',
    page: 1,
    pageMax : 1,
    movies: [],
    movie: {},
    loading: false,
    message: 'Search movie'
})

export default store
export const searchMovies = async page => {
    store.state.loading = true
    store.state.page = page
    if (page === 1) {
        store.state.movies = []
        store.state.message = ''
    }
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=7035c60c&s=${store.state.searchText}&page=${page}`)
        const { Search, totalResults, Response, Error } = await res.json()
        if (Response === 'True') {
            store.state.movies = [
                ...store.state.movies,
                ...Search
            ]
            store.state.pageMax = Math.ceil(Number(totalResults) / 10) || 0        
        } else {
            store.state.pageMax = 1
            store.state.message = Error || 'No movie found'
        }
    } catch (error) {
        console.error('searchMovies method Error: ',error)
    } finally {
        store.state.loading = false
    }
}
export const getMovieDetails = async id => {
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`)
        store.state.movie = await res.json()
    } catch (e) {
        console.error('getMovieDetails method Error: ', e)
    }
}