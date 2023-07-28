---
layout: single
title: "CSS 레이아웃 (Flexbox, Grid) 정리"
categories: HTML-CSS 
tag: [Layout, Flex, Grid, CSS]
toc: true
toc_sticky: true
excerpt: '
# Flexbox

## display 속성

### block

- box의 개념
- width(너비)와 height(높이)를 가짐
- 옆으로 margin이 존재
- element가 한 줄을 차지하여 옆에 다른 element가 올 수 없어 아래로 배치
'
header:
  teaser: https://ishadeed.com/assets/grid-flex/grid-vs-flexbox.png
---

![css-grid-flexbox-thumb](https://ishadeed.com/assets/grid-flex/grid-vs-flexbox.png)

# Flexbox

## display 속성

### block

- box의 개념
- width(너비)와 height(높이)를 가짐
- 옆으로 margin이 존재
- element가 한 줄을 차지하여 옆에 다른 element가 올 수 없어 아래로 배치

### inline

- 같은 직선 상에 있다는 뜻으로 옆에 다른 element가 올 수 있음
- box가 아니라 너비와 높이를 가질 수 없음 (element contents에 따라 유동적)

### inline-block

- inline과 block의 속성을 모두 지님
- element가 일직선 상에 배치되어 옆에 다른 element가 올 수 있음
- 너비와 높이를 가질 수 있음
- 단, element 사이에 정체불명의 margin이 생겨 layout을 계산해야 하는 불편함 존재

### flexbox

- inline-block의 문제점을 해결한 방식
- 1차원 레이아웃 즉, 행(세로)과 열(가로)을 자유롭게 다룰 수 있음
- 단, grid 형태를 구현하는 것은 어려움

### grid

- flexbox의 문제점을 해결한 방식
- 복잡한 2차원 레이아웃을 직관적으로 구축 가능

## Main axis & Cross Axis

- flex container에는 main axis와 main axis라는 두 축이 존재
- flex-direction에 따라, 다음과 같이 이 두 가지 축의 방향이 다름

![flexbox-axis](https://coliss.com/wp-content/uploads-201904/flexbox/4-flexbox-axes.png)

### justify-content

- main axis를 중심으로 item의 위치들을 조정
- row의 경우, 수평 방향
- column의 경우, 수직 방향

### align-items

- cross axis를 중심으로 item의 위치들을 조정
- row의 경우, 수직 방향
- column의 경우, 수평 방향

### align-self

- cross axis를 중심으로 item의 위치를 개별적으로 조정
- row의 경우, 수직 방향
- column의 경우, 수평 방향

### align-content

- `flex-wrap` 조정으로 인해, flex item이 한 줄이 아닌 여러 라인에 거쳐 생겼을 때 작동
- cross axis를 중심으로 라인의 간격을 조정

## flex-wrap

flexbox는 너비와 상관없이, item들이 같은 라인에 있도록 하는 속성을 가짐 (= `nowrap`)

### nowrap (default)

- item들이 같은 라인에 정렬
- item의 사이즈가 조정될 수 있음

### wrap

- item들이 flex container 크기를 넘어가면 다른 라인에 정렬
- item의 사이즈를 유지

## Order

- flex item의 순서를 조정
- 클 수록 축의 시작점, 작을 수록 끝점에 위치
- 기본 값은 0이며 음수 설정 가능

## flex-[grow, shrink, basis]

### flex-grow

container에 item이 차지할 공간이 있을 때, item별로 영역이 늘어나는 비율

### flex-shrink

container에 item이 차지할 공간이 있을 때, item별 영역이 줄어드는 비율

### flex-basis

- item이 늘어(grow)나거나 줄어(shrink)들기 전, item의 기본 사이즈
- `flex-direnction`이 `row`일 때, `width`와 동일
- `flex-direnction`이 `column`일 때, `height`와 동일
- 값이 `auto`일 경우, item의 `width`나 `height`와 동일

# Grid

## [grid-template-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows)

그리드 행의 크기 조정

```css
grid-template-rows: 60px 60px 40px; /* 60px 60px 40px 크기의 3개 행 */
grid-template-rows: 1fr 2fr 1fr; /* 1 : 2 : 1 비율의 3개의 행 */
grid-template-rows: repeat(6, 1fr); /* 1 : 1 : 1 : 1 비율의 6개의 행 */
grid-template-rows: auto 200px; /* 2번째 행은 200px, 나머지 N행은 (grid height - 200px / N - 1)px 지정 */
```

## [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)

그리드 열의 크기 조정

```css
grid-template-columns: 60px 60px;
grid-template-columns: 1fr 2fr;
```

## [gap](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)

행과 열 사이의 간격을 설정 (`row-gap` + `column-gap`)

```css
gap: 10%;
gap: 10px 20px; /* = row gap: 10px; column-gap: 20px; */
gap: calc(20px + 10%);
```

## [grid-template-areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas)

그리드에 셀을 설정하고 이름을 지정

<iframe style="width: 100%; height: 380px;" src="https://interactive-examples.mdn.mozilla.net/pages/css/grid-template-areas.html"></iframe>

## **[grid-template](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template)**

그리드에 셀을 설정하고 이름과 row 크기를 지정 (repeat 불가)

<iframe style="width: 100%; height: 380px;" src="
https://interactive-examples.mdn.mozilla.net/pages/css/grid-template.html
"></iframe>

> block 요소의 기본 width는 100%, height은 0이다.
>
> 그러므로, 그리드 부모 요소에서 `fr`는 `height`만 써도 동작하나 `width`만 쓰면 동작하지 않는다.

## [grid-area](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area)

영역에 이름을 지정하거나 `grid-row`와 `grid-column`의 단축 속성

```css
grid-area: <grid-row-start> / <grid-column-start> / <grid-row-end> /
  <grid-column-end>;
grid-area: 영역이름;
```

### 적용 조건

그리드 내부 `grid-area` 영역이

1. 쪼개져 있지 않고 이어져 있어야 함
2. 사각형 모양을 가지고 있어야 함

## [grid-column-start](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start)

### [grid-column-end](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end) / [grid-row-start](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start) / [grid-row-end](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end)

- 그리드 배치에 `line`, `span`을 통해 열(행)에서 블럭의 시작(끝) 위치를 지정
- 시작(끝) 위치는 그리드 영역의 블록 시작(끝) 가장자리를 정의 ( 1 ~ 블럭 개수 + 1)

```css
grid-column-start: auto;
grid-column-end: -1; /* 마지막 가장자리 */
grid-row-start: 1;
grid-row-end: span 3; /* 3번째 블럭 (가장자리가 아닌 블럭을 지정)*/
```

## Layout using named gird lines

`grid-template-rows` 및 `grid-template-columns` 속성으로 그리드를 정의할 때 그리드의 일부 또는 모든 라인에 이름을 지정 가능

```css
.wrapper {
  display: grid;
  grid-template-columns: [main-start] 1fr [content-start] 1fr [content-end] 1fr [main-end];
  grid-template-rows: [main-start] 100px [content-start] 100px [content-end] 100px [main-end];
}

.box1 {
  grid-column-start: main-start;
  grid-row-start: main-start;
  grid-row-end: main-end;
}
```

## [place-items](https://developer.mozilla.org/en-US/docs/Web/CSS/place-items)

그리드 내부 컨텐츠의 배치 방식을 일괄적으로 적용

- `stretch` : grid를 늘려서 grid를 채움
- `start` : item을 cell 시작에 배치
- `center` : item을 cell 중앙에 배치
- `end` : item을 cell 끝에 배치

```css
place-items: start center;
/* align-items (수직) / justify-items (수평) */
```

### [justify-items](https://www.notion.so/Grid-c983521488164be7bf2fb06f4a1ee115?pvs=21)

모든 하위 요소에 대한 `justify-self`를 설정

### [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)

모든 하위 요소에 대한 `align-self`를 설정

> Flexbox에서 `align-items` 는 Cross Axis의 항목 정렬을 제어
> Grid에서는 수직 축의 정렬 제어

## [place-content](https://developer.mozilla.org/en-US/docs/Web/CSS/place-content)

그리드 전체의 컨테이너 안에서 배치 방식을 일괄적으로 적용

```css
place-content: start end;
/* align-content (수직) / justify-content (수평) */
```

### [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)

그리드 전체의 수평 위치를 조정

### [align-content](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content)

그리드 전체의 수직 위치를 조정

## [grid-auto-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows)

- 명시한 row보다 더 많은 content가 있으면 자동으로 row 생성

## [grid-auto-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns)

- 명시한 column보다 더 많은 content가 있으면 자동으로 column 생성
- `grid-auto-flow: column`일 때 작동

## [grid-auto-flow](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow)

- row가 끝날 때 새로운 row(기본값)를 만들지, 새로운 column을 만들지 결정
- `flex-direction`과 비슷

# Additional

## [minmax(min, max)](https://developer.mozilla.org/en-US/docs/Web/CSS/minmax)

최소보다 크거나 같고 최대보다 작거나 같은 크기 범위를 정의

```css
grid-template-columns: minmax(20px, auto) 1fr 1fr;
```

## auto-fill(fit)

`repeat()` 함수 안에서만 동작

### auto-fill

정해진 크기 안에서 가능한 많은 row(column)을 만들어 채운다(fill).

### auto-fit

현재 element를 늘려 colum(row) 딱 맞게(fit) 해준다.

```css
/*창 너비가 늘어나면 빈 column들로 row를 채움 */
grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));

/* 창 너비가 늘어나면 element를 늘려서 row에 맞게 해줌*/
grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
```

## max(min)-content

content가 보여지는 방식 결정

### max-content

content의 크기만큼 cell의 크기를 늘림

### min-content

content의 크기를 최대한 줄여 cell의 크기를 줄임
