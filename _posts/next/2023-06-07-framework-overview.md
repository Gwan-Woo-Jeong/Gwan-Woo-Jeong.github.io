---
layout: single
title: "Framework Overview"
categories: Next
tag: [웹 표준, 시맨틱 태그, 웹 접근성]
toc: true
toc_sticky: true
excerpt: "
Library vs Framework

Library

개발자로서 내가 사용하는 것. 내가 라이브러리를 불러온 후 무언가를 한다.

따라서 내가 원할 때 언제든 어떤 방식으로든 사용 가능하다.

예를 들어, React에서 페이지를 작성할 때 파일이 프로젝트 안에만 존재하면 상관없다. 그 페이지를 React Router(라이브러리)로 연결시켜 route를 만든다.
"
header:
  teaser: https://nomadcoders.co/_next/image?url=https%3A%2F%2Fd1telmomo28umc.cloudfront.net%2Fmedia%2Fpublic%2Fthumbnails%2Fnextjs.jpeg&w=1200&q=75
---

![Next_thumb.jpg](https://nomadcoders.co/_next/image?url=https%3A%2F%2Fd1telmomo28umc.cloudfront.net%2Fmedia%2Fpublic%2Fthumbnails%2Fnextjs.jpeg&w=1200&q=75)

# Library vs Framework

## Library

개발자로서 내가 사용하는 것. 내가 라이브러리를 불러온 후 무언가를 한다.

따라서 내가 원할 때 언제든 어떤 방식으로든 사용 가능하다.

예를 들어, React에서 페이지를 작성할 때 파일이 프로젝트 안에만 존재하면 상관없다. 그 페이지를 React Router(라이브러리)로 연결시켜 route를 만든다.

## Framework

내가 코드를 적절한 위치에 작성하면 프레임워크가 내 코드를 불러와 동작하게 한다.

따라서 개발자는 프레임워크의 특정한 규칙을 따라야만 한다.

예를 들어, Next에서 페이지를 작성하려면 `pages` 폴더 안에 파일을 생성해야한다. Next는 해당 파일을 찾아 파일명으로 페이지 route를 만든다.

# Static Pre Rendering

## CSR

브라우저가 JS파일 다운받은 후 작성된 코드를 참조하여 UI를 만드는 모든 작업을 한다. 인터넷이 느리면, 파일을 받기 전까지 유저는 빈 화면을 보고 있어야한다.

## SSR

서버에서 첫 화면(HTML)을 그려주기 때문에 (pre-rendering), 유저는 거의 즉시 페이지를 볼 수 있다.

### Hydration

사용자가 초기 페이지 접속을 요청하면, 서버에서 SSR 방식으로 프리렌더링 된 HTML을 보낸다. 브라우저는 **JS 파일을 다운로드하고 JS 프레임워크를 실행한다. 이 때, 모든 JS나 프레임워크가 로딩되지 않았더라도 유저는 콘텐츠를 볼 수 있다.** 이후 JS가 로드되면 이미 존재하는 페이지와 연결되어 CSR 방식으로 처리된다. 한 마디로, CSR과 SSR의 장점을 섞어놓은 렌더링 방식이다.

# Routing

## Link

Next에서 페이지 간 이동시 `<a>` 태그 대신 `<Link>` 태그를 쓴다.

## useRouter

router 객체 내부에 접근할 수 있도록 하는 React Hook이다.

# Pages

`pages` 폴더 안에 있는 파일명에 따라 route가 생성된다.

`pages/about.js` 를 생성하면 `localhost:3000/about` route가 만들어진다.

예외적으로 `pages/index.js`의 경우, 앱의 엔트리 포인트이다. 즉, `localhost:3000` 와 같다.

NextJS에서 `import react from "react"`로 리액트를 불러올 필요가 없지만

`useState`나 `useEffect`와 같은 lifecycle method를 쓸 때 import해야 한다.

# CSS Modules

`파일명.modules.css` 으로 CSS 파일을 생성한다. 페이지는 무조건 모듈 CSS를 불러와야 한다.

평범한 CSS처럼 작성하지만, \***\*JS파일에서 CSS 프로퍼티를 **자바스크립트 객체 형식\*\*으로 불러온다.

컴파일 과정에서 CSS는 무작위로 만들어진 **고유한 클래스 이름을 생성**한다. 따라서, **클래스명 간의 충돌**이 발생하지 않는다.

> **복수 클래스를 한 요소에 적용하는 법
> ⇒ 복수 클래스를 하나의** 문자열로 만든다.

**1. 템플릿 리터럴 사용**<br/>
**2. 배열 + `join(' ')` 메서드 사용**

>

# Styles JSX

`<style jsx>` 태그를 컴포넌트 하단에 선언하고 이 안에 CSS를 작성한다. ( 파일 생성 X )

이 스타일은 해당 컴포넌트에만 적용된다. 따라서, 다른 파일에서 같은 클래스명을 사용해도 충돌이 발생하지 않는다.

# Custom App

**`<style jsx global>`** 태그를 사용하면 해당 페이지나 컴포넌트 파일에 선언된 모든 컴포넌트에 전역 스타일을 설정할 수 있다.

전체 앱에 스타일을 적용하려면 **`/pages`** 폴더에 **`_app.js`** 파일을 생성한다.

Next는 페이지를 렌더링하기 전에 **`_app.js`** 파일을 먼저 확인한다.

**`_app.js`**에서 정의된 컴포넌트는 **`Component`**와 **`pageProps`**를 props로 전달받는다.

이 컴포넌트를 수정하여 다음과 같이 전역으로 적용되는 스타일이나 컴포넌트를 구현할 수 있다.

```jsx
// 기본 상태
export default function App({Component, pageProps}){
  return <Component {...pageProps} />;
}

// 모든 페이지에 네비게이션바 추가
// + 전역 스타일
export default function App({Component, pageProps}){
  return (
    <>
      <NavBar />
        <Component {...pageProps} />
          <style jsx global>{`
            a {
              color: white;
            }
           `}</style>
    </>
    );
}
```

> **`_app.js`**에서 정의된 컴포넌트에서는 예외적으로 모듈이 아닌 일반적인 CSS를 호출할 수 있다.
