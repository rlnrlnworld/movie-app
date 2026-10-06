// OMDB 프록시 — imdbID로 IMDb / Rotten Tomatoes / Metacritic 평점만 가져온다.
const { APIKEY } = process.env
const CACHE = 'public, s-maxage=86400, stale-while-revalidate=604800'

export default async function handler(request, response) {
  const { imdbID } = request.query
  if (!imdbID) {
    return response.status(400).json({ error: 'imdbID required' })
  }
  try {
    const res = await fetch(`https://omdbapi.com?apikey=${APIKEY}&i=${encodeURIComponent(imdbID)}`)
    const json = await res.json()
    const ratings = json.Response === 'True'
      ? (json.Ratings || []).map(r => ({ source: r.Source, value: r.Value }))
      : []
    response.setHeader('Cache-Control', CACHE)
    response.status(200).json({ ratings })
  } catch (error) {
    response.status(502).json({ error: error.message })
  }
}
