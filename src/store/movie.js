import { Store } from '../core/setup'

const store = new Store({
  searchText: '',
  page: 1,
  pageMax: 1,
  movies: [],
  movie: {},
  // null: 로딩 중(스켈레톤) / []: 평점 없음 / [...]: 평점 목록
  ratings: null,
  loading: false,
  message: '영화 제목을 검색해 보세요!'
})

export default store

// 같은 세션 안에서 상세/평점 재요청 방지
const detailCache = new Map()
const ratingsCache = new Map()

const api = (path, params) => {
  const query = new URLSearchParams(params).toString()
  return fetch(`${path}?${query}`).then(res => res.json())
}

export const searchMovies = async page => {
  store.state.loading = true
  store.state.page = page
  if (page === 1) {
    store.state.movies = []
    store.state.message = ''
  }
  try {
    const { movies, totalPages, totalResults, error } = await api('/api/movie', {
      title: store.state.searchText,
      page
    })
    if (error) {
      store.state.message = error
      store.state.pageMax = 1
    } else if (totalResults === 0) {
      store.state.message = '검색 결과가 없어요.'
      store.state.pageMax = 1
    } else {
      store.state.movies = [
        ...store.state.movies,
        ...movies
      ]
      store.state.pageMax = totalPages
    }
  } catch (error) {
    console.log('searchMovies error:', error)
    store.state.message = '검색 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요.'
  } finally {
    store.state.loading = false
  }
}

export const getMovieDetails = async id => {
  if (detailCache.has(id)) {
    store.state.movie = detailCache.get(id)
    return
  }
  try {
    const movie = await api('/api/movie', { id })
    detailCache.set(id, movie)
    store.state.movie = movie
  } catch (error) {
    console.log('getMovieDetails error:', error)
  }
}

// 평점은 상세와 분리해서 지연 로드 — 상세 화면 먼저 뜨고 평점 영역만 스켈레톤 유지
export const getMovieRatings = async imdbID => {
  if (!imdbID) {
    store.state.ratings = []
    return
  }
  if (ratingsCache.has(imdbID)) {
    store.state.ratings = ratingsCache.get(imdbID)
    return
  }
  store.state.ratings = null
  try {
    const { ratings = [] } = await api('/api/ratings', { imdbID })
    ratingsCache.set(imdbID, ratings)
    store.state.ratings = ratings
  } catch (error) {
    console.log('getMovieRatings error:', error)
    store.state.ratings = []
  }
}
