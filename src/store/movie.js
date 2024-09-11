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
        const res = await fetch('/api/movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                title: store.state.searchText,
                page
            })
        })
        const { Search, totalResults, Response } = await res.json()
        if (Response === 'True') {
            store.state.movies = [
                ...store.state.movies,
                ...Search
            ]
            store.state.pageMax = Math.ceil(Number(totalResults) / 10) || 0        
        } else {
            store.state.pageMax = 1
            store.state.message = 'No movie found'
        }
    } catch (error) {
        console.error('searchMovies method Error: ',error)
    } finally {
        store.state.loading = false
    }
}
export const getMovieDetails = async id => {
    try {
        // const res = await fetch(`https://www.omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`)
        const res = await fetch('/api/movie', {
            method: 'POST',
            body: JSON.stringify({
                id
            })
        })
        store.state.movie = await res.json()
    } catch (e) {
        console.error('getMovieDetails method Error: ', e)
    }
}