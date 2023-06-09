---
layout: single
title: "Practice Project"
categories: Next
tag: [NextJS, Nomad Coders]
toc: true
toc_sticky: true
excerpt: "
Patterns

React 모델을 사용하면 페이지를 여러 컴포넌트로 분해할 수 있다. 이런 컴포넌트는 페이지 간에 재사용 할 수 있다. 예를 들어, 페이지 간 동일한 내비게이션과 푸터를 공통 컴포넌트로 작성할 수 있다.

Layout

페이지의 공통적인 레이아웃을 컴포넌트로 만들 수 있다. React props에 제공되는 `children` 은 이 레이아웃 컴포넌트를 사용할 시, 내부에 있는 모든 컴포넌트를 가리킨다.
"
header:
  teaser: https://miro.medium.com/v2/resize:fit:1000/1*htbUdWgFQ3a94PMEvBr_hQ.png
---

![Next_thumb.jpg](https://miro.medium.com/v2/resize:fit:1000/1*htbUdWgFQ3a94PMEvBr_hQ.png)

# Patterns

React 모델을 사용하면 페이지를 여러 컴포넌트로 분해할 수 있다. 이런 컴포넌트는 페이지 간에 재사용 할 수 있다. 예를 들어, 페이지 간 동일한 내비게이션과 푸터를 공통 컴포넌트로 작성할 수 있다.

## Layout

페이지의 공통적인 레이아웃을 컴포넌트로 만들 수 있다. React props에 제공되는 `children` 은 이 레이아웃 컴포넌트를 사용할 시, 내부에 있는 모든 컴포넌트를 가리킨다.

```jsx
// Layout.js
import NavBar from "./NavBar";

export default function Layout({children}){
	return (
		<>
			<NavBar />
			<div>{children}</div>
		</>
	);
}

// _app.js
import Layout from "../components/Layout";
...

export default function App({Component, pageProps}){
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
```

공통 레이아웃 컴포넌트를 사용하면 레이아웃에 사용되는 코드의 중복을 줄일 수 있다.

## Head

Next의 내장 컴포넌트 (`next/head`)로 HTML의 `head` 안에 보여진다.

# Redirect and Rewrite

## Redirect (URL 변경)

들어오는 request 경로를 다른 destination 경로로 이동시킬 수 있다.

`next.config.js`에서 `redirects` 함수를 정의해주면 된다.

`redirects`은 `source`, `destination`, `permanent` 속성을 가진 객체를 포함하는 배열을 반환하는 비동기 함수다.

- `source`: 들어오는 request 경로 패턴 (request 경로)
- `destination`: 라우팅하려는 경로 (redirect할 경로)
- `permanent`: `true`인 경우 브라우저와 검색 엔진에 redirect를 영구적으로 캐싱을 지시하는 308 상태 코드를 사용, `false`인 경우 일시적이고 캐싱하지 않은 307 상태 코드를 사용한다.

```jsx
//next.config.js
module.exports = {
	...,
	async redirects(){
		return [
			{
				source : "/old-url/:path",
				destination: "/new-url/:path",
				permanent: false,
			},
			...
		]
	}
}
```

## Rewrite (URL 변경 X)

들어오는 request 경로를 다른 destination 경로에 매핑할 수 있다.

URL 프록시 역할을 하고 destination 경로를 mask하여 사용자가 사이트에서 위치를 변경하지 않은 것처럼 보이게 한다. 이를 이용하여, API 키를 숨길 수 있다.

반대로 redirects은 새 페이지로 reroute되고 URL 변경 사항을 표시한다.

```jsx
//next.config.js
const API_KEY = process.env.API_KEY;
module.exports = {
	...,
	async rewrite(){
		return [
			{
				source : "/api/movies",
				destination: `https://api.com/movies?api_key=${API_KEY}`,
			},
			...
		]
	}
}
```

# Server Side Rendering

page에서 서버 측 랜더링 함수인 `getServerSideProps`함수를 export하는 경우, Next는 `getServerSideProps`에서 반환된 데이터를 사용하여 각 request에서 이 페이지를 pre-render한다.

(서버 사이드에서만 실행, 브라우저 실행 X)

```jsx
export default function Home({ data }) {
  // 서버로부터 data를 props로 받아 데이터 렌더
}

// 매 request마다 실행
export async function getServerSideProps() {
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // props를 통해 page에 data 전달
  return { props: { data } };
}
```

# Dynamic Routes

page에 대괄호([param])를 추가하여 Dynamic Route를 생성할 수 있다.

예를 들어, `/movies/123`로 들어가면 해당 페이지에서 query를 통해 `{ id : 123 }` 을 받을 수 있다.

```jsx
// movies/[id].js
const router = useRouter();
const { id } = router.query;
```

# Movie Detail

`router.push(url, as, options)` 로 페이지 간 이동이 가능하다. URL 객체를 통해 query를 통해 데이터를 전달할 수 있다. `as` 옵션을 이용하여 브라우저에 보여지는 query를 조작할 수 있다.

- `url` : (UrlObject / String) 탐색할 URL
- `as` : (UrlObject / String) 브라우저 URL 표시줄에 표시할 경로. 마스킹이 가능하다.

```jsx
router.push({
  pathname: "/post/[pid]",
  query: { pid: post.id },
});
```

외부 URL에 대해서는 `window.location`을 사용하는 것이 더 적합하다.

# Catch All

대괄호 안에 세 개의 점(...)을 추가하여 모든 경로를 포착하도록 Dynamic Routes를 확장할 수 있다. `pages/movies/[...id].js`는 여러 쿼리를 받을 수 있다. 예를 들어, `movies/12/34/56` 의 경우 `{id : ["12", "34", "56"]}` 으로 객체가 전달된다.

# 404 pages

`pages/404.js` 에서 404 페이지를 커스터마이징 할 수 있다.
