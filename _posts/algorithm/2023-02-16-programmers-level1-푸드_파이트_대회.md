---
layout: single
title: 'Programmers - Level 1 :  푸드 파이트 대회'
categories: Algorithm
tag: [javascript, algorithm, programmers]
toc: true
toc_sticky: true
excerpt: '
문제 설명

푸드 파이트 대결은 일렬로 배치된 음식을, 한 선수는 왼쪽에서 오른쪽으로, 다른 선수는 오른쪽에서 왼쪽으로 순서대로 먹는 방식으로 진행됨. 중앙에는 물이 있고, 물을 먼저 먹는 선수가 승리.

두 선수가 먹는 음식의 종류, 양, 순서는 같음. 음식을 먹는 순서도 같아야 합니다. 칼로리가 낮은 음식을 먼저 먹을 수 있게 배치. 이 조건을 고려하지 않아서, 몇 개의 음식은 사용 못함.

대회를 위한 음식의 배치를 나타내는 문자열을 리턴하는 함수를 완성해라.
'
header:
  teaser: ../../images/thumbnails/programmers.png


---

![프로그래머스.png](../../images/thumbnails/programmers.png)

## 문제 설명

푸드 파이트 대결은 일렬로 배치된 음식을, 한 선수는 왼쪽에서 오른쪽으로, 다른 선수는 오른쪽에서 왼쪽으로 순서대로 먹는 방식으로 진행됨. 중앙에는 물이 있고, 물을 먼저 먹는 선수가 승리.

두 선수가 먹는 음식의 종류, 양, 순서는 같음. 음식을 먹는 순서도 같아야 합니다. 칼로리가 낮은 음식을 먼저 먹을 수 있게 배치. 이 조건을 고려하지 않아서, 몇 개의 음식은 사용 못함.

대회를 위한 음식의 배치를 나타내는 문자열을 리턴하는 함수를 완성해라.

## 매개변수

- food : 준비한 음식의 양을 칼로리가 적은 순서대로 나타내는 정수 배열
  - food[0] : 준비한 물의 양, 항상 1
  - i : 준비한 음식 ( 1번부터 시작 )
  - food[i] : 음식의 양

## 제한사항

- `food`에는 칼로리가 적은 순서대로 음식의 양이 담겨 있음.
- `food[i]`는 i번 음식의 수.
- `food[0]`은 준비한 물의 양이며, 항상 1임.
- 정답의 길이가 3 이상인 경우만 입력으로 주어짐.

## 입출력 예

| food         | result          |
| ------------ | --------------- |
| [1, 3, 4, 6] | "1223330333221" |
| [1, 7, 1, 2] | "111303111"     |

## 내 풀이

```jsx
// foods[0]은 물의 양, 음식 배치 중간에 "0"으로 고정이기 때문에 사용안함
function solution([water, ...foods]) {
  let row = "";
  for (let i = 0; i < foods.length; i++) {
    // 한쪽 음식 배치. 음식 양을 반으로 나눠 음식 번호를 해당 수 만큼 반복하여 입력
    row = row + String(i + 1).repeat(Math.floor(foods[i] / 2));
  }
  // 완성된 한쪽 배치에 물을 더한 후, 배치를 뒤집어 반대편 배치를 완성
  return row + "0" + [...row].reverse().join("");
```

foods[0]은 물의 양이다. 문제 예시에서, 음식 배치 중간에 "0"으로 끼어있는 값이다. 물은 무조건 하나이기 때문에 함수에서 사용하지 않는다. 매개 변수 `food` 를 구조 분해하여, 0번째 인덱스를 제외한 나머지만 사용하였다.

우선적으로 한쪽 음식 배치를 완성한 후, 다른 한쪽은 완성된 한쪽을 뒤집으면 쉽게 구현할 수 있을 것이라고 생각했다. 음식 배치를 구하기 위해, 먼저 음식 양을 반으로 나눈 다음 음식 번호를 해당 수 만큼 반복하였다. 여기서 음식 종류가 인덱스 + 1인 이유는 0번째가 물이기 때문이다.

이렇게 완성된 한쪽 배치에 0번인 물을 붙인 후에 이 배치를 뒤집어 반대편 배치를 완성시켰다.

### 어려웠던 점

처음에 문제를 이해하는게 제일 어려웠던 부분인 것 같다. 문제 설명의 예시를 여러 번 읽은 후에 이해했다. 문제에서 음식의 종류가 배열의 인덱스인 것을 정확하게 명시하지 않아서 많이 헷갈렸던 것 같다. 정리하자면 다음과 같다.

- food[0] : 준비한 물의 양, 항상 1 ( 음식 배치 결과 문자열에서 중간에 끼어있는 0 )
- i : 준비한 음식 ( 1번부터 시작 )
- food[i] : 음식의 양 ( 두 명이 먹기 위해서는 정확히 2로 나눠 떨어져함 )

문제를 정확하게 이해하고 나니, 풀이 자체는 어렵지 않았다. 역시 문제를 먼저 정확하게 이해하는 것이 중요하다는 것을 다시 한번 깨달았다.
