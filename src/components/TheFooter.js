import { Component } from '../core/setup'
import aboutStore from '../store/about'

export default class TheFooter extends Component {
  constructor() {
    super({
      tagName: 'footer'
    })
  }
  render() {
    const { github, repository } = aboutStore.state
    this.el.innerHTML = /* html */ `
      <div>
        <a href="${repository}">
          GitHub Repository.
        </a>
      </div>
      <div class="attribution">
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </a>
      </div>
      <div>
        <a href="${github}">
          ${new Date().getFullYear()}
          rlnrln
        </a>
      </div>
    `
  }
}