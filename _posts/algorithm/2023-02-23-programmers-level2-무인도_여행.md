---
layout: single
title: '[Algorithm] Programmers - Level 2 : 무인도 여행'
categories: algorithm
tag: [javascript, algorithm, programmers]
toc: true
toc_sticky: true
excerpt: '
문제 설명

지도는 1 x 1크기의 사각형들로 이루어진 직사각형 격자, 각 칸 안에는 바다를 뜻하는 X 또는 무인도를 뜻하는 1~9의 자연수가 있다. 상, 하, 좌, 우로 연결된 땅들은 하나의 무인도를 이룬다. 각 칸의 숫자는 식량을 나타내는데, 연결된 칸에 적힌 숫자의 합은 해당 무인도에서 머물 수 있는 날짜 수를 나타낸다. 각 섬에서 최대 며칠씩 머무를 수 있는지 배열에 오름차순으로 담아 리턴하는 함수를 완성해라. 단, 지낼 수 있는 무인도가 없으면 -1을 담아 리턴.
'

header:
  teaser: ../../images/thumbnails/programmers.png


---

![프로그래머스.png](../../images/thumbnails/programmers.png)

### 문제 설명

지도는 1 x 1크기의 사각형들로 이루어진 직사각형 격자, 각 칸 안에는 바다를 뜻하는 'X' 또는 무인도를 뜻하는 1~9의 자연수가 있다. 상, 하, 좌, 우로 연결된 땅들은 하나의 무인도를 이룬다. 각 칸의 숫자는 식량을 나타내는데, 연결된 칸에 적힌 숫자의 합은 해당 무인도에서 머물 수 있는 날짜 수를 나타낸다. 각 섬에서 최대 며칠씩 머무를 수 있는지 배열에 오름차순으로 담아 리턴하는 함수를 완성해라. 단, 지낼 수 있는 무인도가 없으면 -1을 담아 리턴.

### 매개변수

- maps : 지도를 나타내는 문자열 배열

### 제한사항

- 3 ≤ `maps`의 길이 ≤ 100
  - 3 ≤ `maps[i]`의 길이 ≤ 100
  - `maps[i]`는 'X' 또는 1 과 9 사이의 자연수로 이루어진 문자열입니다.
  - 지도는 직사각형 형태입니다.

### 입출력 예

| maps                               | result     |
| ---------------------------------- | ---------- |
| ["X591X","X1X5X","X231X", "1XXX1"] | [1, 1, 27] |
| ["XXX","XXX","XXX"]                | [-1]       |

## 내 풀이 ( 오답 )

접근을 너무 단순하게 했다. 각 칸을 돌면서, 상하좌우로 숫자가 있다면 하나의 무인도라고 생각했다. 이 로직으로 섬에 있는 식량 수를 합산하니 대표 케이스는 통과했지만, 대부분의 테스트 케이스에서 오답 처리가 되었다. 이 알고리즘으론 서로 완전히 떨어져있는 여러 섬이 있을 경우에 각 섬을 구분하여 식량을 합산할 수가 없었다.

```jsx
function solution(maps) {
  let answer = [];
  let map = new Map();

  for (let i = 0; i < maps.length; i++) {
    for (let j = 0; j < maps[i].length; j++) {
      if (maps[i][j] !== "X") map.set(`${i}${j}`, Number(maps[i][j]));
    }
  }

  let count = 0;

  map.forEach((v, k, m) => {
    const right = `${k[0]}${Number(k[1]) + 1}`;
    const left = `${k[0]}${Number(k[1]) - 1}`;
    const bottom = `${Number(k[0]) + 1}${k[1]}`;
    const top = `${Number(k[0]) - 1}${k[1]}`;

    if (m.get(right) || m.get(left) || m.get(bottom) || m.get(top)) {
      count += v;
    } else {
      answer.push(count);
      count = v;
    }
  });

  if (count > 0) answer.push(count);

  return answer.length > 0 ? answer.sort() : [-1];
}
```

## 다른 사람의 풀이

구글링을 해보니, 이 문제는 그래프 탐색 알고리즘인 BFS나 DFS를 사용해야하는 문제였다. 지도를 이루는 모든 칸들을 살펴봐야 하는데, DFS를 사용할 경우 보통 재귀함수로 모든 노드들을 순회하고 BFS의 경우는 큐를 사용한다.

### 해석

먼저, 현재 위치에서 상하좌우를 쉽게 살펴보기 위해 좌표를 미리 만들어둔다. 깊이 우선 탐색 (DFS) 함수는 현재 위치 `(x, y)` 와 식량수 `(num)` 을 입력받아 주변 식량 수를 합산한다. 식량을 더했으면 그 자리를 “X”로 표시해두어, 다시 더하는 일을 방지한다. 이 작업을 인접한 땅에 더 이상 식량이 남아있지 않을 때까지 재귀 함수를 실행하여 반복한다.

이렇게 해서 어떤 시작점에서 호출된 깊이 우선 탐색 (DFS) 함수가 동작을 완료하면 해당 함수의 리턴 값이 한 무인도에 있는 식량의 총합이 된다. 이 작업을 지도에 있는 모든 땅에서 실행시켜 각 무인도의 식량을 배열에 담아 조건에 맞게 오름차순 정렬하여 리턴하면 된다.

```jsx
function solution(maps) {
  const newMap = maps.map((n) => n.split(""));

  // 상 하 좌 우 좌표
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];

  function DFS(x, y, num) {
    let sum = Number(num);

    // 상 하 좌 우를 탐색
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      // 지도 범위 내에서,
      if (nx >= 0 && ny >= 0 && nx < newMap.length && ny < newMap[0].length) {
        // X가 아닌 곳을 찾으면,
        if (newMap[nx][ny] !== "X") {
          // 식량 수를 저장
          const next = newMap[nx][ny];

          // 해당 위치에 "X"를 할당
          newMap[nx][ny] = "X";

          // DFS로 해당 좌표부터 다시 탐색.
          // 리턴 값을 sum에 합산.
          sum += DFS(nx, ny, next);
        }
      }
    }

    // 합산된 값을 리턴
    return sum;
  }

  const answer = [];

  for (let i = 0; i < newMap.length; i++) {
    for (let j = 0; j < newMap[0].length; j++) {
      // "X"가 아닌 위치에서
      if (newMap[i][j] !== "X") {
        // 현재 식량 수 저장.
        const start = newMap[i][j];

        // 해당 위치를 X로 변환
        newMap[i][j] = "X";

        // DFS로 범위 내 식량 수의 총합을 구한 후, 해당 값을 answer에 추가
        answer.push(DFS(i, j, start));
      }
    }
  }

  // answer의 길이가 0이라면 [-1], 아니면 배열을 오름차순으로 정렬 후 리턴
  return answer.length ? answer.sort((a, b) => a - b) : [-1];
}
```
