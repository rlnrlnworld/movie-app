# 설정

## CSS 스타일 초기화
https://www.jsdelivr.com/package/npm/reset-css

## 글꼴
### 본문
**Roboto** : https://fonts.google.com/specimen/Roboto?query=roboto
### 타이틀
**Oswald** : https://fonts.google.com/specimen/Oswald?query=osw

## 색상 팔레트
**배경** : #0E111B \
**기본** : #FFFFFF \
**포인트** : #FDC000 \
**hover** : #F86A05

# API
**OMDb** : https://www.omdbapi.com/
| **Parameter** | **Required** | **Valid Options**      | **Default Value** | **Description**                        |
|---------------|--------------|------------------------|-------------------|----------------------------------------|
| **i**         | Optional     |                        | <empty>           | A valid IMDb ID (e.g. tt1285016)       |
| **t**         | Optional     |                        | <empty>           | Movie title to search for.             |
| **type**      | No           | movie, series, episode | <empty>           | Type of result to return.              |
| **y**         | No           |                        | <empty>           | Year of release.                       |
| **plot**      | No           | short, full            | short             | Return short or full plot.             |
| **r**         | No           | json, xml              | json              | The data type to return.               |
| **callback**  | No           |                        | <empty>           | JSONP callback name.                   |
| **v**         | No           |                        | 1                 | API version (reserved for future use). |
