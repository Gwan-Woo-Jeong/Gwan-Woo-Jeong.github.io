---
layout: single
title: '[Algorithm] Programmers - Level 2 : 귤 고르기'
categories: algorithm
tag: [javascript, algorithm, programmers]
toc: true
toc_sticky: true
excerpt: '
문제 설명

수확한 귤 중 k개를 골라 상자 하나에 담아 판매하려고 한다. 그런데 귤의 크기가 일정하지 않아 크기별로 분류했을 때 서로 다른 종류의 수를 최소화려고 한다.

매개 변수

- k : 한 상자에 담으려는 귤의 개수
- tangerine : 귤의 크기를 담은 배열

제한사항

- 1 ≤ `k` ≤ `tangerine`의 길이 ≤ 100,000
- 1 ≤ `tangerine`의 원소 ≤ 10,000,000
'

header:
  teaser: ../../images/thumbnails/programmers.png


---

![프로그래머스.png](../../images/thumbnails/programmers.png)

### 문제 설명

수확한 귤 중 k개를 골라 상자 하나에 담아 판매하려고 한다. 그런데 귤의 크기가 일정하지 않아 크기별로 분류했을 때 서로 다른 종류의 수를 최소화려고 한다.

> 서로 다른 종류의 수의 최솟값을 리턴하는 함수를 작성하라.

### 매개 변수

- k : 한 상자에 담으려는 귤의 개수
- tangerine : 귤의 크기를 담은 배열

### 제한사항

- 1 ≤ `k` ≤ `tangerine`의 길이 ≤ 100,000
- 1 ≤ `tangerine`의 원소 ≤ 10,000,000

### 입출력 예

| k   | tangerine                | result |
| --- | ------------------------ | ------ |
| 6   | [1, 3, 2, 5, 4, 5, 2, 3] | 3      |
| 4   | [1, 3, 2, 5, 4, 5, 2, 3] | 2      |
| 2   | [1, 1, 1, 1, 2, 2, 2, 3] | 1      |

### 내 풀이

문제를 풀기 위해, 귤 크기 별 개수를 알아야한다. 이를 쉽게 구하기 위해, 우선적으로 귤 크기대로 귤들을 정렬한다. 이 배열을 순회하면서 각 귤 크기 별로 개수가 담긴 배열을 생성한다.

다시 이 귤 크기 별 개수를 순회하여, k (한 상자에 담을 귤의 개수)에 하나씩 빼서 담을 수 있는 종류의 개수를 구한다. 중간에 k가 0 아래로 떨어지면, 누적한 종류 개수를 리턴한다.

처음에 내가 놓친 부분이 있는데, 담으려는 귤이 남을 수도 있다는 사실이다. 그래서 마지막에 다시 합산한 누적 개수를 리턴하지 않으면 함수는 아무것도 리턴하지 않을 것이다. 그러므로, 함수 마지막에 누적 개수를 리턴해준다.

```jsx
function solution(k, tangerine) {
  // 귤 크기로 오름차순 정렬
  tangerine = tangerine.sort();

  let box = [];
  let answer = 0;
  let count = 1;
  // 귤 크기에 마다 갯수를 샌다.
  for (let i = 0; i < tangerine.length; i++) {
    if (tangerine[i] === tangerine[i + 1]) {
      count++;
    } else {
      box.push(count);
      count = 1;
    }
  }

  // 갯수 배열은 내림차순 정렬
  box = box.sort((a, b) => b - a);
  for (t of box) {
    // k가 없으면 누적된 종류 수를 리턴
    if (k <= 0) return answer;
    // k에 도달할 때까지 갯수를 감산
    k = k - t;
    // 뺄 때마다, 종류를 하나씩 늘림
    answer++;
  }

  // k가 남으면, 누적된 종류 수를 리턴
  return answer;
}
```

## 다른 사람의 풀이

### 해석

내 풀이와 거의 비슷하다. 차이점이 있다면 귤 크기 별 개수를 객체로 선언한 점이다. 나도 처음에 이 생각을 했지만, 이 문제를 풀기 위해 필요한건 개수 뿐이지 귤 크기와 해당 크기의 개수까진 필요 없다고 생각했다.

이렇게 만들어진 객체의 `value` (크기 별 개수)를 합산하여 내림차순 정렬한다. 마찬가지로, 이 귤 크기 별 개수를 상자에 담을 귤의 개수에 하나씩 빼주어 담을 수 있는 종류의 개수를 구한다.

```jsx
function solution(k, tangerine) {
  let answer = 0;
  const tDict = {};
  // 귤 크기를 key, 개수를 value로 객체를 할당
  tangerine.forEach((t) => (tDict[t] = (tDict[t] || 0) + 1));
  // 위 객체의 value를 내림차순으로 정렬하여 배열 생성
  const tArr = Object.values(tDict).sort((a, b) => b - a);
  // 정렬된 배열을 순회하면서, 담을 개수가 크기 별 개수보다 크면 감산
  for (const t of tArr) {
    answer++;
    if (k > t) k -= t;
    // 없으면 반복문 종료
    else break;
  }
  return answer;
}
```

### 배울 점

크기 별 개수를 담을 개수에 감산하여 답을 구하는 과정에서, 코드가 더 직관적인 것 같다.

```jsx
answer++;
if (k > t) k -= t;
else break;
// vs
if (k <= 0) return answer;
k = k - t;
answer++;
```

현재 개수보다 뺄 개수가 더 클 때 뺀다는 의미인데, 내가 작성한 코드는 일단 빼고나서 뺀 결과가 0 아래면 종류 개수를 리턴하는 방식보다 더 직관적인 것 같다. 도출하고자 하는 결과는 똑같지만, 코드를 해석하는 과정에 있어서 더 직관적으로 이해할 수 있을 것 같다.
