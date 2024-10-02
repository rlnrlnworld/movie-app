<img src="https://i.imgur.com/ZBnFGAG.png" width=100%>

# 🎞️ [OMDBapi Movie Search](https://movie-app-drab-six.vercel.app/#/)
외부 API를 활용하여 영화를 검색하고 결과를 화면에 표시합니다.

## ✨ 기능
- 외부 API를 이용한 영화 검색
- 제목, 포스터, 개봉 날짜, 줄거리 등 영화 상세 정보 표시
- 데스크톱 및 모바일 기기 모두에 대응하는 반응형 디자인

## 🛠 기술 스택
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"><img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/Figma-000000?style=for-the-badge&logo=figma&logoColor=white">

## 📥 설치 방법
1. 레포지토리를 클론합니다:
    ```bash
    git clone https://github.com/yourusername/movie-search-site.git
    ```

2. 프로젝트 디렉토리로 이동합니다:
    ```bash
    cd movie-search-site
    ```

3. 필요한 패키지를 설치합니다:
    ```bash
    npm install
    npm i -D parcel
    ```

4. 개발 서버를 실행합니다:
    ```bash
    npm run dev
    ```

5. 프로덕션 환경용으로 프로젝트를 빌드합니다:
    ```bash
    npm run build
    ```
## 🚀 배포
이 사이트는 [Vercel](https://vercel.com/rlnrlnworlds-projects/movie-app/AtwQPryK3yM9ffwCT5W1PkpKeir8)에 배포되어 있습니다.

## 📂 프로젝트 구조
```bash
📦 movie-app
├─ .gitignore
├─ README.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ 📁 src
│  ├─ App.js
│  ├─ 📁 api
│  │  └─ movie.js
│  ├─ 📁 components
│  │  ├─ Headline.js
│  │  ├─ MovieItem.js
│  │  ├─ MovieList.js
│  │  ├─ MovieListMore.js
│  │  └─ Search.js
│  ├─ 📁 core
│  │  └─ setup.js
│  ├─ 📁 img
│  │  ├─ icon_Internet Movie Database.png
│  │  ├─ icon_Metacritic.png
│  │  ├─ icon_Rotten Tomatoes.png
│  │  └─ pavicon.png
│  ├─ main.css
│  ├─ main.js
│  ├─ 📁 routes
│  │  ├─ Home.js
│  │  ├─ Movie.js
│  │  └─ index.js
│  └─ 📁 store
│     └─ movie.js
└─ vercel.json
```
## 🎮 사용 방법
1. Vercel에 호스팅된 사이트에 접속합니다.
2. 검색창에 영화 제목을 입력하고 엔터를 누릅니다.
3. 검색 결과를 통해 영화의 상세 정보를 확인할 수 있습니다.

## 📌 버전 관리
이 프로젝트는 Git을 사용하여 버전 관리를 했으며, 모든 업데이트와 수정 사항은 Git을 통해 관리되었습니다.

<p><img src="https://i.imgur.com/ugkP4JZ.png" width=100%></p>
