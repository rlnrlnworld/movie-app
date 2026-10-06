// TMDB 프록시 — 검색(title, page) / 상세(id). 응답은 프론트에서 바로 쓰는 형태로 정규화한다.
// TMDB_TOKEN: TMDB 설정 > API 의 "API Read Access Token" (eyJ... 로 시작하는 JWT)
const { TMDB_TOKEN } = process.env
const TMDB = 'https://api.themoviedb.org/3'
const IMG = 'https://image.tmdb.org/t/p'
const LANG = 'ko-KR'

// Vercel CDN 캐시: 하루 신선, 일주일간 stale 서빙하며 백그라운드 갱신
const CACHE = 'public, s-maxage=86400, stale-while-revalidate=604800'

const poster = (path, size) => (path ? `${IMG}/${size}${path}` : '')
const year = date => (date ? date.slice(0, 4) : '')

async function tmdb(path, params = {}) {
  const url = new URL(`${TMDB}${path}`)
  url.search = new URLSearchParams({ language: LANG, ...params })
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      accept: 'application/json'
    }
  })
  const json = await res.json()
  if (!res.ok || json.success === false) {
    throw new Error(json.status_message || `TMDB ${res.status}`)
  }
  return json
}

async function search(title, page) {
  const json = await tmdb('/search/movie', {
    query: title,
    page,
    include_adult: 'false'
  })
  return {
    movies: json.results.map(m => ({
      id: m.id,
      title: m.title,
      year: year(m.release_date),
      poster: poster(m.poster_path, 'w500')
    })),
    totalPages: json.total_pages,
    totalResults: json.total_results
  }
}

async function details(id) {
  const m = await tmdb(`/movie/${id}`, {
    append_to_response: 'external_ids,credits'
  })
  const director = m.credits?.crew?.find(c => c.job === 'Director')
  return {
    id: m.id,
    imdbID: m.external_ids?.imdb_id || m.imdb_id || '',
    title: m.title,
    originalTitle: m.original_title,
    released: m.release_date,
    runtime: m.runtime ? `${m.runtime}분` : '',
    country: m.production_countries?.map(c => c.iso_3166_1).join(', ') || '',
    poster: poster(m.poster_path, 'w780'),
    plot: m.overview || '',
    genres: m.genres?.map(g => g.name).join(', ') || '',
    production: m.production_companies?.map(c => c.name).join(', ') || '',
    actors: m.credits?.cast?.slice(0, 6).map(c => c.name).join(', ') || '',
    director: director?.name || ''
  }
}

export default async function handler(request, response) {
  const { title, page = '1', id } = request.query
  try {
    const data = id
      ? await details(id)
      : await search(title ?? '', page)
    response.setHeader('Cache-Control', CACHE)
    response.status(200).json(data)
  } catch (error) {
    response.status(502).json({ error: error.message })
  }
}
