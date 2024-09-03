import { Component, createRouter } from '../core/setup'
import Home from './Home'
import Movie from './Movie'

export default createRouter([
    { path: '#/', component: Home },
    { path: '#/movie', component: Movie }
])