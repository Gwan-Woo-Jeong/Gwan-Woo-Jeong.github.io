---
layout: single
title: "SCSS 핵심 문법 정리"
categories: HTML-CSS 
tag: [SCSS]
toc: true
toc_sticky: true
excerpt: '
# SCSS란

- CSS preprocessor (전처리기)
- CSS로 컴파일되는 스크립트 언어
- 추가 기능과 유용한 도구를 제공하여, CSS의 태생적 한계 보완

> **Sass vs SCSS**

- Sass가 먼저 출시했지만 서로 완벽하게 호환
- 단, 사소한 문법 차이 존재 (중괄호와 세미콜론 유무)
- SCSS가 CSS와 더 비슷하여 더 많이 쓰임
'

header:
  teaser: https://i0.wp.com/techprimelab.com/wp-content/uploads/2020/06/SCSS-or-CSS.jpg?fit=1024%2C576&ssl=1
---

![scss-thumb](https://i0.wp.com/techprimelab.com/wp-content/uploads/2020/06/SCSS-or-CSS.jpg?fit=1024%2C576&ssl=1)

# SCSS란

- CSS preprocessor (전처리기)
- CSS로 컴파일되는 스크립트 언어
- **추가 기능과 유용한 도구**를 제공하여, CSS의 태생적 한계 보완

> **Sass vs SCSS**

- Sass가 먼저 출시했지만 서로 완벽하게 호환
- 단, 사소한 문법 차이 존재 (중괄호와 세미콜론 유무)
- SCSS가 CSS와 더 비슷하여 더 많이 쓰임
  >

# Variables

## 변수 선언

`_variables.scss` 에 선언한 후, `@import` 한다.

```scss
// _variables.scss
$white: #ffffff;
```

```scss
// styles.scss
@import "_variables";

.box {
  background-color: $white;
}
```

# Nesting

- 선택자를 중첩하여 CSS 속성을 부여
- 더 직관적이면서, 정확한 타겟을 선택 가능

## Example

- HTML

```html
<body>
  <h2>Title</h2>
  <div class="box">
    <h2>Another Title</h2>
    <button>Hello</button>
  </div>
  <button>Bye bye</button>
</body>
```

- CSS

```css
.box {
  margin-top: 20px;
}

.box:hover {
  background-color: green;
}

.box h2 {
  color: blue;
}

.box button {
  color: red;
}
```

- SCSS

```scss
.box {
  margin-top: 20px;

  &:hover {
    background-color: green;
  }

  h2 {
    color: blue;
  }

  button {
    color: red;
  }
}
```

> **&**는 부모 선택자를 의미한다.

# Extends

여러 CSS 속성의 세트를 만들어, 중복되는 코드를 줄일 수 있다.

```scss
// _buttons.scss

%button {
  border-radius: 7px;
  font-size: 12px;
  text-transform: uppercase;
  padding: 5px 10px;
}
```

```scss
// styles.scss
@import "_buttons";

a {
  @extend %button;
  /*
		border-radius : 7px;
		font-size: 12px;
		text-transform: uppercase;
		padding: 5px 10px;
	*/
  text-decoration: none;
}

button {
  @extend %button;
  /*
		border-radius : 7px;
		font-size: 12px;
		text-transform: uppercase;
		padding: 5px 10px;
	*/
  border: none;
}
```

# Mixins

SCSS 안에서 사용할 수 있는 함수로 재사용이 가능하다.

## CSS 속성 상속

단순하게 CSS 속성을 상속할 수 있지만, 이 기능은 `extends` 와 완벽하게 동일하다. 따라서, 이 경우 `extends`를 사용하자.

```scss
// _mixins.scss
@mixin bigTitle {
  color: orange;
  font-size: 20px;
  margin-bottom: 12px;
}
```

```scss
// styles.scss
@import "_mixins";

h1 {
  @include bigTitle();
  /*
		color: orange;
		font-size: 20px;
		margin-bottom: 12px;
	*/
}
```

## 속성값 받기

속성값을 인자로 받아, CSS에 적용 가능하다.

```scss
// _mixins.scss
@mixin link($color) {
  text-decoration: none;
  display: block;
  color: $color;
}
```

```scss
// styles.scss
@import "_mixins";

a {
  &:nth-child(odd) {
    // 홀수번째 자식 요소 color: blue
    @include link(blue);
  }

  &:nth-child(even) {
    // 짝수번째 자식 요소 color: red
    @include link(red);
  }
}
```

## 조건문

함수이기 때문에 `if`조건문도 사용가능하다.

```scss
// _mixins.scss
@mixin link($word) {
  text-decoration: none;
  display: block;
  // color: $color;

  @if $word == "blue" {
    color: blue;
  } @else if $word == "red" {
    color: red;
  } @else {
    color: black;
  }
}
```

```scss
// styles.scss
@import "_mixins";

a {
  &:nth-child(odd) {
    // 홀수번째 자식 요소 color: blue
    @include link(blue);
  }

  &:nth-child(even) {
    // 짝수번째 자식 요소 color: red
    @include link(red);
  }
}
```

## Content

- 전달인자와 더불어 스타일 블록(여러 CSS 속성)을 함수로 넘겨, 재사용성을 크게 강화할 수 있다.
- `mixin`을 호출한 후, 다음 스타일 블록을 명시한다. 그럼, `@mixin` 선언문에서 `@content` 부분이 해당 스타일 블록으로 적용된다.

```scss
// style.scss
@import _mixins;

.box {
  @include boxStyle(white) {
    background-color: blue;
    margin-bottom: 12px;
  }
}

// _mixins.scss
@mixin boxStyle($color) {
  color: $color; // white
  @content;
  /*
		background-color: blue;
		margin-bottom: 12px;
	*/
}
```

- mixin & content를 활용한, 반응형 레이아웃

```scss
// _mixins.scss

$minIphone: 500px;
$maxIphone: 690px;
$minTablet: $minIphone + 1;
$maxTablet: 1120px;

@mixin responsive($device) {
  // 기종에 따라, 미디어 쿼리와 @content(css 속성)를 적용
  @if $device == "iphone" {
    @media screen and (min-width: $minIphone) and (max-width: $maxIphone) {
      @content;
    }
  } @else if $device == "tablet" {
    @media screen and (min-width: $minTablet) and (max-width: $maxTablet) {
      @content;
    }
  } @else if $device == "iphone-l" {
    @media screen and (max-width: $minIphone) and (max-width: $maxIphone) and (orientation: landscape) {
      @content;
    }
  } @else if $device == "ipad-l" {
    @media screen and (min-width: $minTablet) and (max-width: $maxTablet) and (orientation: landscape) {
      @content;
    }
  }
}
```

```scss
// style.scss

@import "_mixins";

h1 {
  color: red;

  // 아이폰이면
  @include responsive("iphone") {
    color: yellow; // 노란색 텍스트 적용
  }

  // 아이폰 가로모드면
  @include responsive("iphone-l") {
    font-size: 60px; // 폰트 사이즈 적용
  }

  // 테블릿이면
  @include responsive("tablet") {
    color: green; // 초록색 텍스트 적용
  }
}
```
