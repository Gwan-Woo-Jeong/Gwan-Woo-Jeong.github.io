---
layout: single
title: "[JavaScript] 비동기 처리 (Promise & async/await)"
categories: javascript
tag: [JavaScript, Promise, Async/Await]
toc: true
toc_sticky: true
excerpt: ''
header:
  teaser: https://i.redd.it/359wewwmjbc31.jpg

---

![](https://i.redd.it/359wewwmjbc31.jpg)

<br />

# 들어가며 

지난 글에서 한 번에 하나의 작업만 실행할 수 있는 자바스크립트가 어떻게 동시에 여러 작업을 실행할 수 있는 지 알아보았다.

짧게 요약하자면, 자바스크립트 엔진은 하나의 작업 처리 환경 (콜 스택)을 가지고 있어 한 번에 한 가지 작업만 할 수 있다. 그러나, 자바스크립트 엔진은 특정 작업(Web API)을 브라우저에게 전달하고 둘은 각자의 작업을 동시에 수행한다. 이 Web API는 비동기적으로 작동하는 작업들로 완료 후에 후속 작업 (콜백 함수)를 반환한다. 태스크 큐에 저장된 콜백 함수들은 이벤트 루프에 의해 콜 스택에 쌓이고 처리된다. 

이번 글에서는 실제 자바스크립트 코드를 작성할 때, 이 비동기 처리를 하는 방법들에 대해 알아보고자 한다. 

#  비동기 처리란?

우선 짚고 넘어가야 할 부분이 있다. 우리가 알아볼 비동기 처리란 무엇인가? 이전 글에서도 말했듯이, 비동기적으로 처리되는 작업은 함수끼리 서로의 시작과 완료를 신경쓰지 않는다. 그래서, 비동기 함수는 병렬적으로 실행된다. 쉽게 말해, 함수 A가 실행되는 동안 함수 B를 실행할 수 있는 것이다.

하지만, 코드를 작성할 때 비동기 함수는 문제가 된다. 왜냐하면, 비동기로 실행시킨 함수는 언제 완료될지 모르기 때문이다. 예를 들어, 함수 A가 비동기 함수 B의 리턴값을 가지고 연산을 한다면 B가 완료되기 전까지 A가 실행되선 안된다. 우리는 이러한 비동기 함수에 대해 완료 시점을 보장받을 수 있어야 한다.

정리하자면, 비동기 처리란 병렬적으로 (동시에 여러 개가) 실행 및 완료되는 비동기 함수들의 완료 순서를 보장 받기 위해 동기적으로 혹은 직렬적으로 (코드가 위에서부터 아래로 한줄 한줄씩) 동작하게 만드는 것이다. 비동기 처리를 위한 기법들을 지금부터 알아보자.

# 비동기 처리 방법

## 콜백 함수

## Promise

## async/await



# 요약



# Reference

- [https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)