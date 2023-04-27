---
layout: single
title: '웹 표준이란?'
categories: Web-ETC
tag: [웹 표준, 시맨틱 태그, 웹 접근성]
toc: true
toc_sticky: true
excerpt: '
웹 표준

웹 표준은 웹에서 사용되는 기술들(HTML, CSS, JS)의 표준을 통일시켜 브라우저와 기기 간의 호환성을 높이고 모두가 동일한 사용자 경험을 할 수 있도록 하는 규칙이다.

장점

웹 페이지 호환성 / 접근성 향상

웹 표준을 지킨 웹 페이지는 어떤 운영체제나 브라우저에서든 호환되어 동일하게 보여지고 사용자들은 동일한 사용자 경험을 하게 된다.
'
header:
  teaser:  https://www.pa-unaaha.go.id/assets/_uploads/images/3cf3b95ddd83fe95dd10b73851750531.jpg

---

![w3c_thumb.jpg](https://www.pa-unaaha.go.id/assets/_uploads/images/3cf3b95ddd83fe95dd10b73851750531.jpg)

# 웹 표준

웹 표준은 웹에서 사용되는 기술들(HTML, CSS, JS)의 표준을 통일시켜 브라우저와 기기 간의 호환성을 높이고 모두가 동일한 사용자 경험을 할 수 있도록 하는 규칙이다.

# 장점

## 웹 페이지 호환성 / 접근성 향상

웹 표준을 지킨 웹 페이지는 어떤 운영체제나 브라우저에서든 호환되어 동일하게 보여지고 사용자들은 동일한 사용자 경험을 하게 된다.

웹 표준을 준수한 웹 페이지는 보조공학 기기도 지원하기 때문에, 장애인을 포함한 누구든 쉽게 웹에 접근하여 정확한 정보를 얻을 수 있다.

> **웹 접근성 ( Web Accessibility)**<br />
> 나이, 장애 등과 관계없이 모든 사람이 인터넷 정보에 접근하고 이용할 수 있도록 하는 것.<br />이를 위해 스크린리더, 자막, 자동완성, 마우스스틱, 색상 대비 디자인 등의 보조 기기들이 사용된다.

## 검색 엔진 최적화

meta 요소를 이용한 정확한 문서 정보, 적절한 제목(heading 요소), 의미에 맞는 마크업은 검색 결과에 큰 영향을 미친다. 이를 충실히 작성하면, 검색 효율성을 크게 높일 수 있다.

## 유지보수 및 확장성

웹 표준은 `구조 - (X)HTML`, `표현 - CSS`, `동작 - JS`와 같이 코드를 기능에 따라 분리하여 구축하는 방식을 규정한다. 이 방식을 사용하면 개발자들은 웹 페이지를 개발하는 데 드는 시간과 비용을 줄일 수 있으며, 이후의 유지 보수 및 확장 작업에서도 효율적으로 작업할 수 있다.

또한, 논리적이고 효율적으로 작성된 웹 문서는 코드 양이 줄어들어 파일 크기가 작아진다. 이로 인해, 서버 부담이 감소하고 브라우저가 웹 페이지를 로드하는 시간도 줄어든다.

# 웹 표준 지키기

## DOCTYPE 선언

HTML 문서 최상단에 `DOCTYPE`를 선언한다. 이는 해당 페이지가 어떤 버전의 HTML, XHTML을 사용하는지 명시한다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>HTML !DOCTYPE declaration</title>
  </head>
  <body>
    <p>이 문서는 HTML 문서입니다.</p>
  </body>
</html>
```

## 시맨틱 태그 사용

시맨틱 태그는 HTML5에 도입된 태그로 코드의 가독성과 유지보수성을 높인다. 시맨틱 태그는 자체적으로 영역을 표시하기 때문에 다른 작업자가 코드를 파악하기 쉽다.

<figure>
<a style="width: 75%" href="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https://blog.kakaocdn.net/dn/bQnJYS/btrS0EiPIhT/ryRaJfFIYanVdrBy8sVHq0/img.png">
  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https://blog.kakaocdn.net/dn/bQnJYS/btrS0EiPIhT/ryRaJfFIYanVdrBy8sVHq0/img.png" title="semantic-tag.png">
  <figcaption>시맨틱 태그를 사용하면 웹 페이지를 직관적으로 구성할 수 있다.<br/>
  이처럼 큰 틀의 레이아웃을 표시할 때는, &lt;div&gt; 대신 시맨틱 태그를 활용하자!</figcaption>
</a>
</figure>

### 시맨틱 태그 종류

<br />
<div style="display: flex; justify-content: center;">
<table style="width: auto;">
  <thead>
    <tr>
      <th>태그</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&lt;header&gt;</code></td>
      <td>사이트의 머리부분에 사용</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&lt;main&gt;</code></td>
      <td>메인 콘텐츠를 나타내는데 사용</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&lt;section&gt;</code></td>
      <td>제목별로 나눌 수 있는 문서의 콘텐츠 영역을 구성하는 요소</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&lt;article&gt;</code></td>
      <td>개별 콘텐츠를 나타내는 요소</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&lt;aside&gt;</code></td>
      <td>좌우측의 사이드 영역</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&lt;footer&gt;</code></td>
      <td>사이트의 바닥부분, 주로 연락처나 제작자 정보등을 기술하는 부분</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&lt;hgroupr&gt;</code></td>
      <td>제목과 부제목을 묶어서 나타내는 요소</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&lt;nav&gt;</code></td>
      <td>웹 페이지 메뉴를 만들 때 사용</td>
    </tr>
  </tbody>
</table>
</div>

## CSS 스타일시트 사용

웹 페이지의 디자인(CSS 스타일시트)과 레이아웃(HTML)을 분리하여 관리할 수 있다. 이를 통해, 웹 페이지의 내용이 변경되어도 디자인이 그대로 유지된다. 또, 공통으로 사용되는 스타일을 CSS 파일 하나로 관리할 수 있어 유지보수와 확장이 쉬워진다.

## 웹 접근성 고려

웹 페이지를 만들 때, 장애를 가진 사용자를 포함한 모든 이가 쉽게 접근이 가능하게 만들어야 한다.

### 시각적 요소 처리

#### 보조 속성 사용

`img`, `div`, `video` 등의 태그는 시각적으로 정보를 획득할 수 없는 사람은 확인할 수 없다. 따라서 이러한 정보를 포함하는 보조 속성(`alt`, `role`, `aria` 등)을 사용해야 한다.

예를 들어, 로그인 페이지의 디자인을 로그인 이미지만 사용할 경우 스크린 리더가 인식하지 못하여 시각 장애인이 페이지를 이용할 수 없게된다. 따라서 이미지 대신 소스코드에 내용을 그대로 담는 것이 권장되며, 부득이하게 이미지를 사용할 경우 이미지가 어떤 내용인지 `alt` 속성을 통해 설명을 추가 해야 한다.

```html
<img arc = "img/login.png" alt="로그인 />
```

#### 상대 단위 사용

폰트 사이즈에 `px` 과 같은 고정 단위를 사용하면, 브라우저에서 글꼴 크기를 키워도 커지지 않는다. 따라서, `rem` , `em` 과 같은 상대 단위를 쓰는 것이 좋다.

또한, 폰트를 상대 단위로하고 컨테이너 크기를 고정 값으로 주는 경우 가독성을 심하게 저하시킨다. 그러므로, 전체적인 레이아웃을 고려하여 단위를 설정해야 한다.

<figure>
<a style="text-align: center;" href="https://jthcast.dev/static/f7e02c013a768480332ac7fb0d1c985e/3764e/accessibility_example.webp">
  <img style="width: 60%"  src="https://jthcast.dev/static/f7e02c013a768480332ac7fb0d1c985e/3764e/accessibility_example.webp" title="accessibility_example.webp">
  <figcaption>폰트와 컨테이너 크기 단위를 고려하지 않은 경우 벌어지는 일</figcaption>
</a>
</figure>

#### 적절한 색상 대비 사용

저시력자와 색각 이상자를 위해 배경 간 명도 대비를 구분 될 수 있을 만큼 명확하게 해주는 것이 좋다.

<figure>
<a style="text-align: center;" href="https://jthcast.dev/static/9d288b384bd7bf266dcb4e0106a4bb58/7967d/dev_tool.webp">
  <img style="width: 60%"  src="https://jthcast.dev/static/9d288b384bd7bf266dcb4e0106a4bb58/7967d/dev_tool.webp" title="dev_tool.webp">
  <figcaption>개발자 도구에서 색상비를 확인할 수 있으며, 색상 대비 기준에 부합하는 색상을 추천도 해준다.</figcaption>
</a>
</figure>

### 청각적 요소 처리

청각 장애인은 오디오 콘텐츠를 듣지 못하기 때문에, 청각적 요소를 자막, 수화, 오디오 설명 등과 같은 시각적 요소로 변환하여 제공해야 한다.

### 키보드 접근성

지체 장애인은 손을 자유롭게 사용하지 못하기 때문에, 마우스를 사용할 수 없다. 그러므로, 웹 사이트에서 키보드로 모든 기능을 수행할 수 있도록 키보드 포커스, 키보드 순서 등을 고려하여 구현해야 한다.

### 웹 접근성 검사

웹 접근성의 국제 표준인, **웹 컨텐츠 접근성 지침(WCAG)**을 체크해보면 웹 접근성을 확보할 수 있다.<br />4가지 원칙, 13가지 지침, 78가지 성공 기준으로 구성되어 있다.

1. 인식의 용이성 : 정보와 UI 요소는 유저가 인지할 수 있도록 표시되어야 한다.
   - 텍스트가 아닌 컨텐츠에 인쇄, 점자, 음성, 기호 또는 간단 언어와 같은 형태의 대체 텍스트를 제공해야 한다.
   - 컨텐츠를 정보와 구조의 손실 없이 다른 방식들로 표현할 수 있어야 하낟.
   - 전경에서 배경을 분리한 컨텐츠를 만들어 사용자들이 쉽게 인식 가능하게 해야한다.
2. 운용의 용이성 : 사용자가 UI 요소를 클릭하거나 입력하면 예상된 동작이 발생(운용)해야 한다.
   - 키보드로 모든 기능이 사용 가능해야 한다.
   - 읽기 및 컨텐츠를 사용하는 사용자에게 충분한 시간을 제공해야 한다.
   - 사용자가 탐색하고 컨텐츠를 찾고 어디에 위치하고 있는지 알 수 있도록 하는 방법을 제공해야 한다.
3. 이해의 용이성 : 정보와 UI 운용은 이해할 수 있어야 한다.
   - 텍스트 컨텐츠를 판독하고 이해할 수 있도록 만들어야 한다.
   - 웹 페이지의 탑재와 운용을 예측 가능한 방법으로 제작해야 한다.
   - 사용자의 실수를 방지하고 수정할 수 있도록 해야 한다.
4. 내구성 : 콘텐츠는 시각, 청각, 운동 능력 등에 제한이 있는 사용자들이 사용하는 보조 기술을 이용하여 충분히 이해하고 접근할 수 있도록 만들어져야 한다.

# Reference

- [https://seulbinim.github.io/WSA/standards.html#웹표준-이란](https://seulbinim.github.io/WSA/standards.html#%EC%9B%B9%ED%91%9C%EC%A4%80-%EC%9D%B4%EB%9E%80)
- [https://inpa.tistory.com/entry/WEB-📚-웹-표준의-이해](https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-%EC%9B%B9-%ED%91%9C%EC%A4%80%EC%9D%98-%EC%9D%B4%ED%95%B4)
- [https://goddaehee.tistory.com/244](https://goddaehee.tistory.com/244)
- [https://jthcast.dev/posts/why-efforts-to-preserve-web-standards-and-web-accessibility-are-required/](https://jthcast.dev/posts/why-efforts-to-preserve-web-standards-and-web-accessibility-are-required/)
- [https://coding-factory.tistory.com/883](https://coding-factory.tistory.com/883)
