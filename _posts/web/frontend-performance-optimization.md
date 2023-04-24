---
layout: single
title: '브라우저의 렌더링 과정'
categories: Web-ETC
tag: [Browser, HTML, CSS, Javascript]
toc: true
toc_sticky: true
excerpt: '
프론트엔드 성능 최적화란

프론트 단에서 성능이란 다음 두 가지 능력을 의미한다.

1. 로딩 성능 : 다운로드 받은 리소스를 빠르게 해석하는 능력
2. 렌더링 성능 : 해석한 리소스를 끊김없이 부드럽게 표현해내는 능력

즉, 프론트엔드의 성능 최적화를 위해선 로딩 성능과 렌더링 성능을 향상시켜야 한다.
'
header:
  teaser:  https://media.tenor.com/bD9vHNiR1rQAAAAd/boom-mind-blown.gif

---

![https://media.tenor.com/bD9vHNiR1rQAAAAd/boom-mind-blown.gif](https://media.tenor.com/bD9vHNiR1rQAAAAd/boom-mind-blown.gif)

# 프론트엔드 성능 최적화란

프론트 단에서 성능이란 다음 두 가지 능력을 의미한다.

1. 로딩 성능 : 다운로드 받은 리소스를 빠르게 해석하는 능력
2. 렌더링 성능 : 해석한 리소스를 끊김없이 부드럽게 표현해내는 능력

즉, 프론트엔드의 성능 최적화를 위해선 로딩 성능과 렌더링 성능을 향상시켜야 한다.

최적화 방법들을 알아보기 전에, 우선 브라우저가 어떻게 화면을 사용자에게 보여주는지 간단하게 살펴보도록 하자. (보다 상세한 과정은 이 글에서 확인할 수 있다.)

# 브라우저 렌더링 과정

## 파싱 (⇒ DOM / CSSOM)

브라우저는 가장 먼저 HTML 파일을 다운로드 받고 첫 줄부터 차례대로 해석(파싱)한다. 단순 텍스트에서 자신이 이해할 수 있는 트리 형태의 객체 자료구조인 **DOM**으로 변환한다. 파싱 중 `<script />` , `<link />` , `<img />` 태그를 만나면 해당 리소스를 요청하고 다운로드한다. 리소스 중 CSS 파일이 있다면, 마찬가지로 CSS 문서 또한 **CSSOM**으로 해석한다.

![CSSOM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/40ad46f6-28ec-4514-8660-c734bc3bdd51/CSSOM.png)

## 스타일 (⇒ 렌더 트리)

이렇게 완성된 HTML 요소들의 관계도(DOM 트리)와 CSS 선택자들의 관계도(CSSOM 트리)를 매칭시키는 스타일 단계에 들어간다. 이 단계를 거치면, 렌더 트리(Render Tree)가 생성되고 브라우저는 이제 본격적으로 화면을 그릴 준비가 된다.

![render-tree.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/884088ba-bb9c-49c3-9d01-2fce1d74cef3/render-tree.png)

## 레이아웃 (⇒ 위치/크기 계산)

우리가 그림을 그릴 때, 색칠을 하기 전에 스케치를 하는 것처럼 브라우저도 레이아웃 단계를 거쳐 먼저 구도를 잡는다. 브라우저는 렌더 트리의 최상위 노드부터 최하위 노드까지 순회하며 각 노드들의 정확한 위치와 크기를 계산한다.

![만약 CSS 속성 값이 %라면 픽셀 단위(px)로 변환하여 렌더 트리에 반영한다.  ](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/65bde9a2-2a11-4e0a-9ded-efdde1d2f083/Screen_Recording_2023-04-24_at_2.32.29_PM.gif)

만약 CSS 속성 값이 %라면 픽셀 단위(px)로 변환하여 렌더 트리에 반영한다.

## 페인트 (⇒ 레이어)

브라우저는 밑그림을 그린 후, 각 노드를 색칠한다. 이 때 각 노드를 한 페이지에 그리는 것이 아닌, 개별적인 레이어에 그린다.

단, 모든 노드가 레어어화 되는 것은 아니다. `transform` 등의 특정 속성을 적용하면 해당 노드와 관련 노드들은 하나의 레이어로 분리되어 위치와 관련된 CSS 속성에 동일한 영향을 받는다.

페인트 단계에서 브라우저는 위치와 관련 없는 CSS 속성 (색상, 투명도 등)을 적용한다.

![Screen Shot 2023-04-24 at 2.44.37 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b12f7477-b3d6-4d6c-92b6-71631cdcef9c/Screen_Shot_2023-04-24_at_2.44.37_PM.png)

## 합성 & 렌더 (⇒ 웹 페이지)

생성된 레이어를 합성하여 하나의 완성된 페이지를 만든다. 이 단계를 거치면 드디어 사용자는 화면에서 웹 페이지를 볼 수 있게 된다.

## 브라우저 로딩 요약

브라우저가 서버로부터 리소스를 받은 후, 웹 페이지를 화면에 그리기까지 과정은 다음과 같다.

1. 리소스를 해석하여 (HTML →) DOM +( CSS →) CSSOM ⇒ **렌더 트리**를 생성한다.
   (파싱 ⇒ 스타일)
2. 렌더 트리의 각 노드의 위치와 크기를 픽셀로 계산한다. (레이아웃)
3. 노드들을 여러 레이어에 그린다. (페인트)
4. 레이어를 합쳐 웹 페이지를 화면에 띄운다. (합성 & 렌더)

## 레이아웃(리플로우) / 리페인트

클릭이나 타이핑 등, 사용자와의 상호작용이 일어나면 웹 페이지의 UI는 이에 맞춰 변화한다. 이런 동작은 DOM 조작이나 CSS 속성값을 변화시켜 브라우저의 리렌더링을 발생시킨다. 이 때, 레이아웃이나 페인트가 다시 일어날 수 있다.

레이아웃을 다시 수행하는 과정을 **리플로우(Reflow)**라고도 하는데, 다음과 경우에 발생한다.

1. DOM 조작으로 인한 HTML 요소가 추가 또는 삭제
2. 위치나 크기에 영향을 주는 CSS 속성값의 변경
   (`height`, `width`, `left`, `top`, `font-size`, `line-height` 등)

반대로, 요소의 위치나 크기에 영향을 주지 않는 CSS 속성값의 변화는 **리페인트(Repaint)**만 일으킨다. (`background-color`, `color`, `visibility`, `text-decoration` 등)

리플로우는 전체 픽셀을 다시 계산해야되는 만큼 부하가 크고 렌더링 시간이 더 오래 걸린다. 리페인트는 이미 계산된 픽셀 값으로 레이어를 그리기 때문에 부하가 덜 하다. 따라서, 불필요한 리플로우는 최대한 방지해야한다.

![리플로우는 모든 렌더링 과정을 거치기 때문에, 렌더링 성능에 치명적이다. 리플로우는 되도록 피하자!](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8096ac6c-d7f7-46ab-b729-2e496cbeb1e6/reflow-vs-repaint.png)

리플로우는 모든 렌더링 과정을 거치기 때문에, 렌더링 성능에 치명적이다. 리플로우는 되도록 피하자!

# 성능 측정 지표

성능을 측정하는 지표가 있어야 효과적으로 성능 최적화를 이룰 수 있다. 즉, “빠르게 동작하는 웹페이지”의 대한 명확한 기준을 세우는 것이 중요하다. 왜냐하면 그 기준에 따라 성능을 최적화 시키는 방법이 다르기 때문이다.

## 브라우저 기준의 성능 측정

예전 웹 페이지는 브라우저가 얼마나 빨리 리소스를 파싱하고 렌더링을 시작할 수 있는지 빠른 웹페이지의 기준이었다. 네비게이션 타이밍 모델은 이러한 브라우저의 주요 이벤트를 기준으로 성능을 측정할 수 있도록 돕는다.

![네비게이션 모델에서 리소스를 다운받은 이후의 단계가 프론트엔드 최적화를 시킬 수 있는 영역이다.](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d0844f2c-5602-4728-8ff4-e176ea116e1c/Screen_Shot_2023-04-24_at_12.16.22_PM.png)

네비게이션 모델에서 리소스를 다운받은 이후의 단계가 프론트엔드 최적화를 시킬 수 있는 영역이다.

이 모델에서 눈 여겨봐야 할 이벤트는 **DOMContentLoaded** 와 **load** 이벤트이다.

**DOMContentedLoaded 이벤트**는 HTML과 CSS 파싱이 끝나고 DOM과 CSSOM을 구성한 상황을 의미한다. 즉, 렌더 트리를 구성할 준비가 된 상태다.

**load 이벤트**는 HTML을 그리기 위해 필요한 모든 리소스가 로드된 시점을 의미한다.

전통적인 성능 측정 방식에서 이 두 이벤트의 시점이 빠를 수록, 발생 시차가 좁을 수록 성능이 좋은 것으로 간주되었다. 다시 말해, 빨리 리소스를 파싱하고 화면에 컨텐츠를 일찍 그리기 시작하면 성능이 뛰어난 웹 페이지였던 것이다.

하지만 개발 패러다임이 MPA(Multiple Page Application)에서 SPA(Single Page Application)으로 변화하면서 기존 측정 방식으로 성능을 판단하기 어려워졌다. SPA에선 파싱할 HTML 코드량이 적어 DOMContentLoaded나 load 이벤트가 빠르게 발생했다. 하지만, 웹 사이트가 CSR(Client Side Rendering)로 동작하면서 사용자가 실질적인 컨텐츠를 볼 수 있는 시간은 느려졌다.

![스크립트가 무거운 웹페이지에서 브라우저 기준의 성능 최적화를 적용시킨 모습이다. 
최적화로 인해 프로그레스바가 더 이른 시간에 그려졌지만, 실제 컨텐츠를 볼 수 있는 시간은 같다.](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9d725ca3-3d52-4fea-a100-4593a024dd3d/domloaded-opt.gif)

스크립트가 무거운 웹페이지에서 브라우저 기준의 성능 최적화를 적용시킨 모습이다.
최적화로 인해 프로그레스바가 더 이른 시간에 그려졌지만, 실제 컨텐츠를 볼 수 있는 시간은 같다.

## 사용자 기준의 성능 측정

그래서 빠른 웹페이지의 기준은 사용자가 **의미 있는 컨텐츠가 처음 보여지는 시점(FMP)**으로 바뀌었다. 현재 웹 페이지는 이 시점을 앞당기는 최적화를 해야한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/92e2eafc-23de-462e-89af-d12a1ddf308f/Untitled.png)

사용자 기준의 성능 측정은 브라우저의 핵심 이벤트가 아닌, 사용자 입장에서 컨텐츠를 보여지는 여러 시점을 기반으로 한다. 그 시점들은 다음과 같다.

1. FP (First Paint) : 빈 화면에서 무언가가 처음 그려지는 시점
2. FCP (First Contentful Paint) : 텍스트나 이미지가 출력되기 시작하는 시점
3. **FMP (First Meaningful Paint)** : 사용자에게 의미 있는 컨텐츠가 그려지기 시작하는 시점. 컨텐츠를 노출하기 위해 필요한 CSS, JS 로드가 시작되고 스타일이 적용되어 주요 컨텐츠를 볼 수 있다.
4. TTI (Time to Interactive) : JS 초기 실행이 완료되어 사용자가 페이지와 상호작용 할 수 있는 시점

FMP와 더불어 중요한 것은 **주요 렌더링 결과를 최적화**하여 사용자에게 웹페이지가 (프로그레스바만 보여주는게 아닌) 실질적으로 작동하고 있다는 인상을 주는 것이다.

![주요 렌더링 경로 최적화가 잘 된 웹페이지와 그러지 못한 웹페이지의 비교
](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0eb297f5-e36a-47b1-b2ce-b9db1b6a4e39/Screen_Shot_2023-04-24_at_10.08.40_PM.png)

주요 렌더링 경로 최적화가 잘 된 웹페이지와 그러지 못한 웹페이지의 비교

## 성능 측정 도구

# 로딩 최적화

## 블록 리소스 최적화

### 블록 리소스 (CSS, JS)

브라우저는 서버로부터 리소스를 내려받은 후, HTML 문서부터 파싱하여 DOM을 생성한다고 했다. 그런데, HTML 파서는 `<link>`나 `<style />` 태그를 만나면 DOM 생성을 중단(블록)하고 CSS나 JS 파일을 파싱하기 시작한다.

![블록 리소스로 인해 HTML 파싱이 지연된 시간 동안, 사용자는 빈 화면을 보고 있어야 한다.](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cedd1105-aef1-442b-960a-f8b477ad4ac6/Screen_Shot_2023-04-24_at_6.34.25_PM.png)

블록 리소스로 인해 HTML 파싱이 지연된 시간 동안, 사용자는 빈 화면을 보고 있어야 한다.

왜 브라우저는 HTML 파싱을 멈추고 CSS와 JS를 먼저 파싱할까? 그 이유는 당연하게도 브라우저가 CSS와 JS를 먼저 알지 못하면 웹 페이지를 정상적으로 그릴 수 없기 때문이다.

**CSS**

브라우저가 웹 페이지를 그리기 위해선, 렌더 트리(DOM + CSSOM)가 있어야 한다. CSSOM이 만들어지지 않은 상태에서는 브라우저는 텍스트와 기본 마크업 밖에 보여줄 수 없다. 이런 화면이 잠시라도 보여지게 된다면 사용자 경험 측면에서 매우 좋지 않을 것이다. 따라서, 이런 상황을 방지하기 위해 브라우저는 CSS 파싱 전 HTML 파싱을 중단시킨다.

![Screen Shot 2023-04-24 at 6.44.30 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e942b81d-5fc9-4821-b1ec-e53789bc1315/Screen_Shot_2023-04-24_at_6.44.30_PM.png)

**JS**

그럼 JS은 렌더링과 관련이 없는데 왜 HTML 파싱을 막는 것일까? 사실, 관련이 있다. 왜냐하면 JS 엔진은 DOM API를 통해 DOM과 CSSOM에 접근하고 변경할 수 있기 때문이다.

브라우저 엔진과 JS 엔진은 기본적으로 직렬 동작한다. 즉, 하나가 실행되면 다른 하나는 동작을 멈춘다. 만약 JS 엔진이 파싱 중에 병렬적으로 DOM 조작한다면, 리플로우가 일어나 시작부터 다시 DOM을 그려야할 것이고 렌더링이 심각하게 지연될 것이다. 이런 경우를 방지하기 위해서, HTML 파싱을 중단시킨 후 JS 코드를 먼저 파악하는 것이다.

CSS와 JS는 HTML 파싱을 중단시키므로 **블록 리소스(Block resource)**라고 부른다. 우리는 로딩 최적화를 이루기 위해, 이 블록 리소스 문제를 반드시 해결해야한다.

### 최적화 방법

블록 리소스가 HTML 파싱을 차단하지 않도록 하는 방법은 크게 2가지가 있다.

1. 블로킹 되지 않는 **특정 위치에서 태그를 삽입**하는 방법
2. 특정 속성을 사용하여 **비동기적으로 파싱**하는 방법

**CSS 최적화**

렌더 트리를 구성하기 위해 DOM과 CSSOM이 필요하다. DOM은 파싱 중 태그를 찾을 때마다 구축이 가능하나 CSSOM은 CSS를 모두 파싱해야 구성할 수 있다. 따라서, CSSOM이 완성되지 않으면 렌더 트리의 조합이 차단되기 때문에 렌더링이 블록(렌더링 차단 리소스)된다.

다음과 같은 방법으로 블로킹을 방지하여 CSS 최적화를 하자.

1. HTML 문서의 최상단 `<head>` 안에서 CSS 불러오기 (특정 위치)

```html
<head>
  <link href="style.css" rel="stylesheet" />
</head>
```

1. 특정 조건에서 필요한 CSS는 미디어 쿼리로 불러오기 (비동기)

```jsx
// 기본 CSS
<link href="style.css" rel="stylesheet" />
// 페이지 인쇄용 CSS
<link href="print.css" rel="stylesheet" media="print" />
// 세로 모드용 CSS
<link href="portrait.css" rel="stylesheet" media="orientation:portrait"
```

1. `@import`로 외부 CSS 파일 불러오지 않기 (병렬로 내려받지 않기 때문에, 로딩 시간 길어질 수 있음)

```scss
/* foo.css */
@import url("bar.css");
```

1. 인라인 스타일 사용 (CSS 파일을 받기 전, 빠르게 보여주어야 할 스타일의 경우 ex. 프로그레스바)

```html
<head>
  <style type="text/css">
    .wrapper {
      background-color: red;
    }
  </style>
</head>
```

**JS 최적화**

JS는 DOM 조작을 통해 DOM / CSSOM 트리를 변경할 수 있기 때문에, 모든 스크립트가 다운되고 실행될 때까지 HTML 파싱(DOM 생성)이 중단된다. 이로 인해, 렌더 트리(DOM + CSSOM)의 구성 또한 지연된다. 따라서, JS는 블록 리소스이자 렌더링 차단 리소스이기도 하다.

![일반적인 스크립트 로드 순서 
(HTML 파싱과 스크립트 로딩이 동기(직렬)적으로 일어나고 있다) ](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bbb4ff9e-f524-4e82-8f9a-d8cd07cedbb1/Untitled.png)

일반적인 스크립트 로드 순서
(HTML 파싱과 스크립트 로딩이 동기(직렬)적으로 일어나고 있다)

만약 JS가 DOM 조작을 하지 않으면 HTML 파싱을 블로킹하지 않고 동시에 스크립트를 로드할 수 있다. (async 속성 사용)

![async 스크립트의 로드 순서
(HTML 파싱과 스크립트 로딩이 비동기(병렬)적으로 일어나고 있다)](https://wormwlrm.github.io/static/cb15314ad68cf7b5d34cd2f3386fabab/a6d36/4.png)

async 스크립트의 로드 순서
(HTML 파싱과 스크립트 로딩이 비동기(병렬)적으로 일어나고 있다)

따라서, 다음과 같은 방법으로 블로킹을 방지하여 JS 최적화를 하자.

1. 스크립트 태그를 HTML문서 최하단, `</body>` 직전에 배치하기 (특정 위치)

```html
<body>
  <div>...</div>
  <div>...</div>
  <script src="app.js" type="text/javascript"></script>
</body>
```

1. `async` 또는 `defer` 속성을 명시하여 스크립트 로딩과 HTML 파싱을 비동기적으로 실행하기 (비동기)

```html
<html>
  <head>
    <script
      async
      src="https://google.com/analatics.js"
      type="text/javascript"
    ></script>
  </head>
  <body>
    <div>...</div>
    <div>...</div>
  </body>
</html>
```

> `async`와 `defer` 의 차이
>
> ![defer 스크립트의 로드 순서
(HTML 파싱과 스크립트 로딩이 비동기적으로 일어난다. 스크립트 실행은 HTML 파싱이 끝난 후 일어난다.)](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d05d1b15-c0a3-4761-a3a2-6b909d5d4030/Untitled.png)
>
> defer 스크립트의 로드 순서
> (HTML 파싱과 스크립트 로딩이 비동기적으로 일어난다. 스크립트 실행은 HTML 파싱이 끝난 후 일어난다.)
>
> `async` 와 `defer` 둘 다 스크립트 로딩과 HTML 파싱을 병렬적으로 수행하지만 **스크립트 실행 시점의 차이가 존재**한다.
>
> `async` 는 스크립트 실행이 로딩 직후 일어나는데 반면, `defer` 는 HTML 파싱이 끝난 후 발생한다.
>
> 이런 특성 때문에, `async` 스크립트는 실행 순서가 보장되지 않는다. 만약 스크립트 간에 의존성이 존재한다면 제대로 동작하지 않을 수도 있다. 따라서, `async` 는 DOM에 직접 접근하지 않거나 의존성이 없는 스크립트를 실행할 때 효과적이다.
>
> 이 와 달리, `defer`는 선언순으로 실행 순서가 보장된다 .
