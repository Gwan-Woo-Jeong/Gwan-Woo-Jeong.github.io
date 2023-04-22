---
layout: single
title: "이벤트 루프란?"
categories: JavaScript
tag: [Event Loop, Microtask Queue, Macrotask Queue]
toc: true
toc_sticky: true
excerpt: '
들어가기전
자바스크립트는 **싱글 스레드 기반 언어**다. 즉, 자바스크립트 엔진은 한 번에 하나의 작업(task)만 할 수 있다. 그럼에도 불구하고, 자바스크립트는 여러 작업을 동시에 수행하는 것 처럼 보인다. 예를 들어, Node.js 서버는 동시에 여러 HTTP 요청을 처리하기도 하고, 브라우저는 클릭이나 스크롤 등 마우스 입력을 처리하면서 동시에 애니메이션 효과를 보여준다.
'
header:
  teaser: https://i.pinimg.com/originals/51/1c/e1/511ce1c2959c73b700e198a52f2146bd.gif
---

![](https://i.pinimg.com/originals/51/1c/e1/511ce1c2959c73b700e198a52f2146bd.gif)

# 들어가기전

자바스크립트는 **싱글 스레드 기반 언어**다. 즉, 자바스크립트 엔진은 한 번에 하나의 작업(task)만 할 수 있다. 그럼에도 불구하고, 자바스크립트는 여러 작업을 동시에 수행하는 것 처럼 보인다. 예를 들어, Node.js 서버는 동시에 여러 HTTP 요청을 처리하기도 하고, 브라우저는 클릭이나 스크롤 등 마우스 입력을 처리하면서 동시에 애니메이션 효과를 보여준다.

자바스크립트 런타임에서, 이런 동시다발적인 (비동기 논블락킹) 작업이 가능한 이유는 사실 자바스크립트 엔진이 혼자 일하는게 아니기 때문이다. 브라우저는 자바스크립트 엔진의 작업들을 넘겨 받아 특정 작업들을 대신 수행한 후 자바스크립트 엔진에게 돌려준다. 앞선 예시로, HTTP 요청이나 DOM 이벤트 등이 브라우저가 수행하는 작업들이다.

자바스크립트 런타임은 하나의 스레드가 아닌 여러 스레드, 즉 멀티 스레드를 사용한다. 따라서, 여러 스레드와 자바스크립트 엔진이 톱니 바퀴가 맞물리듯 함께 작동하기 위해선 정교한 사이클이 필요하다. 이 사이클을 완성시키는 장치가 바로 이벤트 루프이다.

> 스레드 (Thread) : 어떠한 프로그램이 실행되는 작업 환경

> 런타임 (Run Time) : 프로그래밍 언어가 실행되는 환경 (자바스크립트는 브라우저 , Node.js)

# 브라우저 환경의 구조

<a href="../../images/2023-04-05-js-event-loop/browser-environment-structure.png">
  <img src="../../images/2023-04-05-js-event-loop/browser-environment-structure.png" title="browser-environment-structure">
</a>

우선, 이 사이클이 돌고 있는 브라우저 환경의 구조를 살펴보자. 브라우저 환경은 다음과 같은 구성으로 이루어져 있다.

- JavaScript Engine
- Web API
- Task Queue
  - Microtask Queue
  - Macrotask Queue
- Event Loop

## 1. JavaScript Engine

자바스크립트 엔진은 태스크(작업)을 처리한다. 2개의 파트로 나뉘어 있다.

**Memory Heap**: 메모리 할당이 일어나는 공간이다. 소스 코드에서 선언된 모든 식별자의 정보들은 객체 형태로 저장된다.

**Call Stack** : 함수 호출 시 메모리 힙에 저장된 객체를 참조하여, 호출된 함수의 정보([실행 컨텍스트](../../../../javascript/js-execution-context/))를 저장하고 실행한다.

> Stack : 실행 순으로 함수들이 쌓인 후, 맨위에서부터 하나씩 처리된다. (Last-In, First Out)

## 2. Web API

**브라우저가 제공하는 API**로 `DOM API`,` setTimeout`, `HTTP requests` 등의 메서드들이 포함된다. 전부 **비동기적으로 작동**하며 **콜백 함수**를 가지고 있다. 즉, 자바스크립트 엔진이 넘겨준 함수(작업)를 인자(콜백 함수)로 받아 자바스크립트 엔진이 그 다음 작업을 처리하고 있는 동안 브라우저만의 작업(Web API)을 동시에 실행(비동기적으로 작동)한다.

예를 들면, `setTimeout(() => console.log('Hey!'), 1000)`를 자바스크립트 엔진이 브라우저에게 넘기면 브라우저는 `setTimeout` 을 수행한다. 즉, 1초동안 콜백 함수인 `()=> console.log('Hey!')`를 들고 있는 타이머 역할을 한다. 그 다음, 이를 Task Queue라는 일종의 콜백 함수 대기소에 넘긴다.

<a href="https://res.cloudinary.com/practicaldev/image/fetch/s--d_n4m4HH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif2.1.gif">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--d_n4m4HH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif2.1.gif" title="setTimeout.png">
</a>

## 3. Task Queue

**비동기 함수의 콜백 함수가 잠시 대기하는 곳**이다. 이 곳에 보관된 함수는 순서대로 줄서서 기다리다가, 순서대로 빠져나간다. 태스크 큐 또한 넘겨 받은 비동기 함수의 콜백 함수에 따라 크게 2가지로 나뉜다.

### Macrotask Queue

`setTimeout`, `setInterval`,` setImmediate`,`requestAnimationFrame`, `I/O`, `UI 렌더링` 과 같은 비동기 함수의 콜백을 넘겨 받는다. 흔히, task queue라고 하면 일반적으로 이 매크로태스크 큐를 의미한다.

### Microtask Queue

`Promise`, `async/await`,`process.nextTick`,`Object.observe`,`MutationObserver`과 같은 비동기 함수의 콜백을 넘겨받는다.

### 그래서 누가 먼저인가?

결론부터 말하자면, **마이크로태스크가 먼저다.**

이벤트 루프는 마이크로태스크 큐의 모든 태스크들을 처리한 후, 매크로태스크 큐의 태스크들을 처리한다.

여기서 주의할 점은 처음 스크립트가 로드될 때, **'스크립트를 실행' (Run Script)하는 태스크가 먼저 매크로태스크 큐에 들어간다는 것**이다. 그 다음, 이 태스크가 콜 스택으로 전달되고 콜 스택은 전역 [실행 컨텍스트](../../../../javascript/js-execution-context/)를 생성한다. 이제 모든 준비가 끝나고, 말그대로 '스크립트가 실행'되기 시작한다.

## 4. Event Loop

이벤트 루프는 콜 스택과 태스크 큐를 감시하며, **콜 스택이 비어있을 경우 태스크 큐에서 태스크(콜백 함수)를 가져와 콜 스택에 넣어 실행**시키는 역할을 한다.

### 동작 방식

<a href="https://res.cloudinary.com/practicaldev/image/fetch/s--05Fi8vBq--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/42eatw03fcha0e1qcrf0.gif">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--05Fi8vBq--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/42eatw03fcha0e1qcrf0.gif" title="task-queue.png">
</a>

이벤트 루프는 다음 과정을 반복한다.

1. 콜 스택이 비었는지 확인한다.
2. 콜 스택이 비면 우선 마이크로태스크 큐에서 가장 오래된 태스크를 콜 스택에 올린다.<br />
   이것을 마이크로태스크 큐가 빌 때까지 수행한다.
3. 마이크로태스크가 모두 수행된 후, 렌더링이 필요할 시 렌더링 작업을 실행한다.
4. 다음 매크로태스크 큐를 확인한다.
5. 매크로태스크 큐에서 가장 오래된 태스크 하나를 콜 스택에 올린다.
6. 1번으로 돌아가 이 과정을 반복한다.

# 예시

```js
console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

Promise.resolve()
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });

console.log("script end");
```

이 코드가 실제 브라우저 내부에서 어떤 과정을 거쳐 동작할지 생각해보자.
생각해보았다면, 다음 시각 자료를 통해 알아보자.

<p/>
<div style="position: relative;
    width: 100%;
    padding-top: 60%;
    overflow: hidden;">
 <iframe style="position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;" src="https://docs.google.com/presentation/d/e/2PACX-1vShF8tD77zHxzfCYCWDXPbj0P6oAf17t-TqqQJljf74yiRpxVyUNs1K7Tr9w3MFQGsJ37hu0EAwHjRL/embed?start=false&loop=true&delayms=60000" frameborder="0" width="749" height="630" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
</div>
# 정리

자바스크립트는 하나의 작업 환경(싱글 스레드 = 하나의 콜 스택)을 가지고 있기 때문에 한 번에 한 가지 작업(함수)만 실행할 수 있다. 그런데, 코드가 작동하는 환경(브라우저, Node.js)에서는 여러 작업이 동시에 실행된다. 그 원리는 다음과 같다.

1. 자바스크립트 엔진은 특정 작업(Web API)을 브라우저에게 전달하고 둘은 각자의 작업을 동시에 수행한다. 브라우저는 해당 작업을 마친 후, 후속 작업(콜백 함수)를 우선 순위에 따라 다른 보관소(매크로 / 마이크로태스크 큐)에 저장한다.
2. 이벤트 루프는 콜 스택이 빌 때 마다, 마이크로태스크 큐에 있는 각 작업들을 큐가 빌 때 까지 콜 스택에 쌓는다. 그 다음, 매크로태스크 큐의 태스크 하나를 콜 스택에 쌓는다. 이 과정을 계속 반복한다.
3. 자바스크립트 엔진은 이렇게 콜 스택에 쌓인 작업들을 위에서부터 하나씩 처리한다.

# Reference

- [https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)
- [https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
