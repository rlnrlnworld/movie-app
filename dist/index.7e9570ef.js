class e{constructor(e={}){let{tagName:s="div",state:t={},props:i={}}=e;this.el=document.createElement(s),this.state=t,this.props=i,this.render()}render(){}}function s(e){location.hash||history.replaceState(null,"","/#/");let s=document.querySelector("router-view"),[t,i=""]=location.hash.split("?"),a=i.split("&").reduce((e,s)=>{let[t,i]=s.split("=");return e[t]=i,e},{});history.replaceState(a,"");let r=e.find(e=>RegExp(`${e.path}/?$`).test(t));s.innerHTML="",s.append(new r.component().el),window.scrollTo(0,0)}class t extends e{render(){this.el.classList.add("headline"),this.el.innerHTML=`
            <h1>
                <span>OMDb API</span><br>
                THE OPEN<br>
                MOVIE DATABASE
            </h1>
            <p>
                The OMDb API is a RESTful web service to obtain movie information,<br> 
                all content and images on the site are contributed and maintained by our users.<br>
                If you find this service useful, please consider making a one-time donation or become a patron.
            </p>
        `}}const i=new class{constructor(e){for(let s in this.state={},this.observers={},e)Object.defineProperty(this.state,s,{get:()=>e[s],set:t=>{e[s]=t,Array.isArray(this.observers[s])&&this.observers[s].forEach(e=>e(t))}})}subscribe(e,s){Array.isArray(this.observers[e])||(this.observers[e]=[]),this.observers[e].push(s)}}({searchText:"",page:1,pageMax:1,movies:[],movie:{},loading:!1,message:"Search movie"}),a=async e=>{i.state.loading=!0,i.state.page=e,1===e&&(i.state.movies=[],i.state.message="");try{let s=await fetch("http://localhost:1234/api/movie",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:i.state.searchText,page:e})}),{Search:t,totalResults:a,Response:r}=await s.json();"True"===r?(i.state.movies=[...i.state.movies,...t],i.state.pageMax=Math.ceil(Number(a)/10)||0):(i.state.pageMax=1,i.state.message="No movie found")}catch(e){console.error("searchMovies method Error: ",e)}finally{i.state.loading=!1}},r=async e=>{try{let s=await fetch("/api/movie",{method:"POST",body:JSON.stringify({id:e})});i.state.movie=await s.json()}catch(e){console.error("getMovieDetails method Error: ",e)}};class n extends e{render(){this.el.classList.add("search"),this.el.innerHTML=`
            <input value="${i.state.searchText}" placeholder="Enter the movie title to search"/>
            <button class="btn btn-primary">Search</button>
        `;let e=this.el.querySelector("input");e.addEventListener("input",()=>{i.state.searchText=e.value}),e.addEventListener("keydown",e=>{"Enter"===e.key&&i.state.searchText.trim()&&a(1)}),this.el.querySelector(".btn").addEventListener("click",()=>{i.state.searchText.trim()&&a(1)})}}class o extends e{constructor(e){super({props:e,tagName:"a"})}render(){let{movie:e}=this.props;this.el.setAttribute("href",`#/movie?id=${e.imdbID}`),this.el.classList.add("movie"),this.el.style.backgroundImage=`url(${e.Poster})`,this.el.innerHTML=`
            <div class="info">
                <div class="year">
                    ${e.Year}
                </div>
                <div class="title">
                    ${e.Title}
                </div>
            </div>
        `}}class l extends e{constructor(){super(),i.subscribe("movies",()=>{this.render()}),i.subscribe("loading",()=>{this.render()}),i.subscribe("message",()=>{this.render()})}render(){this.el.classList.add("movie-list"),this.el.innerHTML=`
            ${i.state.message?`<div class="message">${i.state.message}</div>`:'<div class="movies"></div>'}
            <div class="the-loader hide"></div>
        `;let e=this.el.querySelector(".movies");e?.append(...i.state.movies.map(e=>new o({movie:e}).el));let s=this.el.querySelector(".the-loader");i.state.loading?s.classList.remove("hide"):s.classList.add("hide")}}class d extends e{constructor(){super({tagName:"button"}),i.subscribe("pageMax",()=>{let{page:e,pageMax:s}=i.state;s>e?this.el.classList.remove("hide"):this.el.classList.add("hide")})}render(){this.el.classList.add("btn","view-more","hide"),this.el.textContent="View More",this.el.addEventListener("click",async()=>{this.el.classList.add("hide"),await a(i.state.page+1)})}}var c,h=(c=[{path:"#/",component:class extends e{render(){let e=new t().el,s=new n().el,i=new l().el,a=new d().el;this.el.classList.add("container"),this.el.append(e,s,i,a)}}},{path:"#/movie",component:class extends e{async render(){this.el.classList.add("container","the-movie"),this.el.innerHTML=`
            <div class="poster skeleton"></div>
            <div class="description">
                <div class="title skeleton"></div>
                <div class="labels skeleton"></div>
                <div class="plot skeleton"></div>
            </div>
        `,await r(history.state.id),console.log(i.state.movie);let{movie:e}=i.state,s=e.Poster.replace("SX300","SX700");this.el.innerHTML=`
            <div 
                class="poster" 
                style="background-image: url(${s})"
            >
            </div>
            <div class="description">
                <div class="title">${e.Title}</div>
                <div class="labels">
                    <span>${e.Released}</span>
                    &nbsp;|&nbsp;
                    <span>${e.Runtime}</span>
                    &nbsp;|&nbsp;
                    <span>${e.Country}</span>
                </div>
                <div class="plot">${e.Plot}</div>
                <div>
                    <h3>Ratings</h3>
                    ${e.Ratings.map(e=>`<p><span class="site"><div class="site-icon ${e.Source}">icon</div> ${e.Source}</span> - ${e.Value}</p>`).join("")}
                </div>
                <div>
                    <h3>Actors</h3>
                    <p>${e.Actors}</p>
                </div>
                <div>
                    <h3>Director</h3>
                    <p>${e.Director}</p>
                </div>
                <div>
                    <h3>Production</h3>
                    <p>${e.Production}</p>
                </div>
                <div>
                    <h3>Genre</h3>
                    <p>${e.Genre}</p>
                </div>
            </div>
        `}}}],function(){window.addEventListener("popstate",()=>{s(c)}),s(c)});document.querySelector("#root").append(new class extends e{render(){let e=document.createElement("router-view");this.el.append(e)}}().el),h();
//# sourceMappingURL=index.7e9570ef.js.map
