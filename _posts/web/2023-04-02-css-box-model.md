---
layout: single
title: "박스모델이란?"
categories: HTML-CSS 
tag: [Box Model, CSS]
toc: true
toc_sticky: true
excerpt: '
박스 모델

웹 페이지의 모든 요소는 박스 형태의 영역을 가지고 있다. 브라우저는 이 박스 모델의 크기와 속성 그리고 위치를 계산하여 웹 페이지를 화면에 띄운다. 박스 모델의 구성은 다음과 같다.
'
header:
  teaser: https://web-dev.imgix.net/image/VbAJIREinuYvovrBzzvEyZOpw5w1/FBaaJXdnuSkvOx1nB0CB.jpg?auto=format&w=1600
---

![box-model-thumb](https://web-dev.imgix.net/image/VbAJIREinuYvovrBzzvEyZOpw5w1/FBaaJXdnuSkvOx1nB0CB.jpg?auto=format&w=1600)

# 박스 모델

웹 페이지의 모든 요소는 박스 형태의 영역을 가지고 있다. 브라우저는 이 박스 모델의 크기와 속성 그리고 위치를 계산하여 웹 페이지를 화면에 띄운다.

# 구성

<a href="https://seulbinim.github.io/WSA/images/design/box-model.png">
  <img style="width: 75%;" src="https://seulbinim.github.io/WSA/images/design/box-model.png" title="box-model.png">
</a>

박스 모델의 구성은 다음과 같다.

1. content
2. padding
3. margin
4. border

## content

요소의 텍스트나 이미지 등의 실제 내용이 위치하는 영역으로 `width` 속성으로 너비를 `height` 속성으로 높이를 지정할 수 있다. 만약, `width`와 `height`로 지정한 콘텐츠 영역보다 실제 콘텐츠가 크면 콘텐츠 영역을 넘어갈 수 있어 유의해야 한다.

> `overflow: hidden;` 으로 넘친 콘텐츠를 감출 수 있다.

## padding

content와 border(테두리) 사이의 안쪽 여백을 지정하는 속성이다. content에 적용된 배경의 컬러, 이미지는 padding 영역까지 적용된다.

아래 그림처럼, 입력 값의 개수에 따라 적용되는 방향이 다르다.

<a href="https://seulbinim.github.io/WSA/images/design/padding.png">
  <img style="width: 75%;" src="https://seulbinim.github.io/WSA/images/design/padding.png" title="padding.png">
</a>

## margin

border(테두리) 바깥에 위치하는 요소의 외부 여백 영역으로 색상은 투명(transparent)하며 색을 지정할 수 없다.

padding과 마찬가지로, 입력 값의 개수에 따라 적용되는 방향이 다르다.

<a href="https://seulbinim.github.io/WSA/images/design/margin.png">
  <img style="width: 75%;" src="https://seulbinim.github.io/WSA/images/design/margin.png" title="margin.png">
</a>

## border

content(+ padding)을 감싸는 테두리 영역이다. 세부 속성을 사용하여 테두리의 모양, 굵기, 색상을 지정할 수 있다.

```css
div {
  border-width: 1px; // 굵기
}
div {
  border-style: solid; // 모양
}
div {
  border-color: #ccc; // 색상
}
div {
  border: 1px solid #ccc; // 한 줄로 가능
}
```

# box-sizing

기본적으로, 박스 모델에서 padding과 border는 content에 포함되지 않는다. 이 계산 방식을 `content-box`라고 한다. 이 방식은 요소가 화면에 보여지는 실제 크기를 계산하는데 큰 혼란을 가져온다.

예를 들어, 이런 div 요소가 있다고 가정하자.

```css
div {
  width: 200px;
  height: 150px;
  padding: 20px;
  boder: 5px;
}
```

언뜻 보기에 이 요소는 너비는 `200px`인 것 같다. 하지만, 이 요소가 보여지는 실제 너비는 `225px`이다. 왜냐하면 padding과 border는 `width`에 포함되지 않기 때문이다. 실제 너비를 구하기 위해선 이 둘을 더해주어야한다.

> content-box로 구한 div의 실제 너비 : <br />
> width + padding + border
> <br />(200px + 20px + 5px = 225px)

그러나, 매번 padding과 border를 더하여 실제 크기를 계산하는 것은 번거롭다. 이를 해결하기 위해, `box-sizing` 속성의 값을 `border-box` 로 줄 수 있다.

`border-box`는 padding과 border를 포함하여 content를 계산하는 방식이다. 따라서, 실제 너비는 `width`의 값으로 `content-box` 방식보다 훨씬 직관적이다.

> border-box로 구한 div의 실제 너비 : <br />width (200px)

<h3>box-sizing 정리</h3>

<figure>
<a style="text-align: center; width: 100%;" href="https://poiemaweb.com/img/box-sizing.png">
  <img style="width: 75%;" src="https://poiemaweb.com/img/box-sizing.png" title="box-sizing.png">
  <figcaption>content-box는 width에 padding과 border를 포함시키지 않기 때문에<br />width : 200px이여도 실제 너비는 이보다 더 넓을 수 있다.</figcaption>
</a>
</figure>

<div style="display:flex; justify-content:center;">
<table style="width: auto">
  <thead>
    <tr>
      <th>키워드</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>content-box</td>
      <td>width, height 프로퍼티 값은 content 영역 (기본값)</td>
    </tr>
    <tr>
      <td>border-box</td>
      <td>width, height 프로퍼티 값은 content 영역 + padding + border</td>
    </tr>
  </tbody>
</table>
</div>

# Reference

- [https://poiemaweb.com/css3-box-model](https://poiemaweb.com/css3-box-model)
- [https://seulbinim.github.io/WSA/box-model.html#margin-속성](https://seulbinim.github.io/WSA/box-model.html#margin-%EC%86%8D%EC%84%B1)
