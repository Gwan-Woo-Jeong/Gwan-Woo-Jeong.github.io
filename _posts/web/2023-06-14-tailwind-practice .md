---
layout: single
title: "Tailwind Practice"
categories: HTML-CSS 
tag: [Tailwind, Nomad Coders, Carrot Market]
toc: true
toc_sticky: true
excerpt: '
Introduction

Tailwind is a utility-first CSS framework

유틸리티는 테일윈드가 여러 클레스 네임을 가지고 있다는 의미. 즉, 테일윈드 자체가 굉장히 큰 CSS 파일이다. 우리는 이미 정의된 클래스네임을 가지고 조합하여 CSS 작업을 할 수 있는데 이는 생산성에 굉장히 큰 도움을 준다.
'
header:
  teaser: https://miro.medium.com/v2/resize:fit:1400/1*oPL8C-i04sqAUoOS_da9aA.jpeg
---

![tailwind-css-thumb](https://miro.medium.com/v2/resize:fit:1400/1*oPL8C-i04sqAUoOS_da9aA.jpeg)

# Auth

## class util function

`Array.prototype.join()` : 배열의 모든 요소를 연결해 하나의 문자열로 만든다.
이를 사용해 여러 클래스 네임을 한 줄로 합쳐주는 함수를 만들 수 있다. 템플릿 리터럴로 조건부 클래스를 주는 복잡한 코드를 만들 필요가 없이, 여러 클래스를 함수의 인자로 넣어 호출하기만 하면 된다.

```jsx
function cls(...classnames: string[]) {
  return classnames.join(" ");
}
```

## Plugins

플러그인을 사용하면 CSS 대신 JS를 사용하여 스타일시트에 삽입할 Tailwind에 대한 새 스타일을 등록할 수 있다.

### @tailwindcss/forms

- form요소에 다양한 기본 스타일을 추가
- form 스타일에 대한 기본 reset을 제공하는 플러그인

```bash
[설치]
npm install -D @tailwindcss/forms
```

`tailwind.config.js`에 아래와 같이 plugins에 추가

```jsx
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
```

## user-select

CSS user-select 속성은 사용자가 텍스트를 선택할 수 있는지 지정 `ex) user-select: none;`

## Heroicons

Tailwind CSS에서 만들어진 SVG 아이콘
https://heroicons.com/

### Spacing

```
Space Between (space-x, space-y)
자식 요소 사이의 공간을 제어

space-x-{amount}
요소 사이의 수평 공간을 제어
ex) space-x-4

space-y-{amount}
요소 사이의 수직 공간을 제어
ex) space-y-4
```

# Item Detail

## Next 13 버전에서 바뀐 라우팅

- App 폴더 안에서 (pages 폴더 X) 폴더명으로 라우팅한다.
- 다이나믹 라우팅은 마찬가지로 폴더명으로 파라미터를 받는다. `ex) [id]`
- 기본 주소(/)는 index.확장자가 아닌 page.확장자가 된다.

# Upload Item

## label

- 사용자 인터페이스 항목의 설명을 나타냄
- label 을 input 요소와 연결하려면, input 에 id 속성을 넣어야함.
  그 후 label 에 id 와 같은 값의 for 속성을 삽입.

```html
<label for="username"
  >Click me< /label> <input type="text" id="username"
/></label>
```

## CSS

- `pointer-events-none` : 사용자가 마우스로 클릭이나 드래그를 할 수 없게 방지
- `resize-none` : textarea의 사이즈를 고정
- `row={10}` : textarea의 세로 사이즈 조정

# Chats

## Divide Width

- 요소 사이의 border width를 제어.
- 자동적으로 구분선을 생성하되 첫 요소의 윗 부분과 마지막 요소의 아래 부분의 구분선은 생성하지 않는다.

```css

divide-x = border-right-width: 1px; border-left-width: 0px;
divide-x-2 = border-right-width: 2px; border-left-width: 0px;

divide-y = border-top-width: 0px; border-bottom-width: 1px;
divide-y-2 = border-top-width: 0px; border-bottom-width: 2px;

(+) divide-y-[1px]로 쓰거나 [1px]을 생략하고 divide-y로 쓸 수도 있음
```

# Chat Detail

## Top / Right / Bottom / Left

positioned된 요소의 배치를 제어

```css
inset-x-0 = left: 0px; right: 0px;
inset-x-2 = left: 0.5rem; (8px) right: 0.5rem; (8px)

inset-y-0 = top: 0px; bottom: 0px;
inset-y-2 = top: 0.5rem; (8px) bottom: 0.5rem; (8px)

```

# Layout

## Max-Width

- 요소의 최대 너비를 설정
- 모바일 웹 사이트에 최대 너비 설정하여 좌우 여백을 줌

```css
max-w-none => max-width: none;
max-w-xs => max-width: 20rem; ( 320px )
max-w-sm => max-width: 24rem; ( 384px )
max-w-md => max-width: 28rem; ( 448px )
max-w-lg => max-width: 32rem; ( 512px )
max-w-full => max-width: 100%;
max-w-screen-sm => max-width: 640px;
max-w-screen-md => max-width: 768px;
max-w-screen-lg => max-width: 1024px;
max-w-screen-xl => max-width: 1280px;
...

```

> 대괄호를 사용하여 임의의 값을 사용하여 즉시 속성을 생성 가능
> `div class="max-w-[50%]"`
