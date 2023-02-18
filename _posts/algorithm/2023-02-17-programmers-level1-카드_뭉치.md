---
layout: single
title: '[Algorithm] Programmers - Level 1 :  카드 뭉치'
categories: algorithm
tag: [javascript, algorithm, programmers]
toc: true
toc_sticky: true
excerpt: '
문제 설명

다음과 같은 규칙으로 단어 카드를 사용해 원하는 순서의 단어 배열을 만들 수 있는지 확인하는 함수를 만들어라.

- 원하는 카드 뭉치에서 카드를 순서대로 한 장씩 사용.
- 한 번 사용한 카드는 다시 사용할 수 없음.
- 카드를 사용하지 않고 다음 카드로 넘어갈 수 없음.
- 기존에 주어진 카드 뭉치의 단어 순서는 못바꿈.
'
header:
  teaser: ../../images/thumbnails/programmers.png


---

![프로그래머스.png](../../images/thumbnails/programmers.png)

### 문제 설명

다음과 같은 규칙으로 단어 카드를 사용해 원하는 순서의 단어 배열을 만들 수 있는지 확인하는 함수를 만들어라.

- 원하는 카드 뭉치에서 카드를 순서대로 한 장씩 사용.
- 한 번 사용한 카드는 다시 사용할 수 없음.
- 카드를 사용하지 않고 다음 카드로 넘어갈 수 없음.
- 기존에 주어진 카드 뭉치의 단어 순서는 못바꿈.

---

### 매개변수

- cards1 : 문자열로 이루어진 카드 단어 배열 1
- cards2 : 문자열로 이루어진 카드 단어 배열 2
- goal : 원하는 단어 배열

---

### 입출력 예

| cards1                  | cards2         | goal                                  | result |
| ----------------------- | -------------- | ------------------------------------- | ------ |
| ["i", "drink", "water"] | ["want", "to"] | ["i", "want", "to", "drink", "water"] | "Yes"  |
| ["i", "water", "drink"] | ["want", "to"] | ["i", "want", "to", "drink", "water"] | "No"   |

## 내 풀이

### 1차 시도 (오답)

처음으로 시도한 코드인데 대표 케이스는 통과했지만 채점 결과 마지막 테스트 케이스에서 계속 실패했다. 마지막 테스트 케이스가 무엇인지 몰라서 아직 왜 틀린건지는 확인이 안되고 있다…

로직은 다음과 같다.

1. 먼저 card1에서 idx1(전에 사용했던 카드의 인덱스)부터 word를 찾는다.
   1. 찾았다면, 해당 인덱스를 idx1에 저장한 후 바로 다음 word로 넘어간다.
2. card1에 없으면, idx2부터 card2에서 찾는다.
   1. 찾았다면, 해당 인덱스를 idx2에 저장한 후 다음 word로 넘어간다.
3. card2에서도 없으면 단어 카드를 만들지 못하므로 “No”를 리턴한다.

```jsx
function solution(card1, card2, goal) {
  let idx1 = -1,
    idx2 = -1;

  for (word of goal) {
    let isFound = false;
    for (let i = idx1; i < card1.length; i++) {
      if (card1[i] === word && i > idx1) {
        idx1 = i;
        isFound = true;
        break;
      } else {
        for (let j = idx2; j < card2.length; j++) {
          if (card2[j] === word && j > idx2) {
            idx2 = j;
            isFound = true;
            break;
          }
        }
      }
    }
    if (isFound === false) return "No";
  }

  return "Yes";
}
```

### 2차 시도

얼마 전에 Map 객체를 공부했는데, Map 객체에 있는 메서드를 활용하면 풀 수 있을 것 같다는 생각이 들었다.

이 문제에서 좀 까다로운 점이 카드를 순서대로 한번 씩만 쓸 수 있다는 점인데, `Map Iterator`를 수동으로 순회하는 방법을 이용하면 반복문 없이도 쉽게 구현이 가능하다.

```jsx
function solution(card1, card2, goal) {
  const c1 = new Map(card1.map((v, i) => [v, i]));
  const c2 = new Map(card2.map((v, i) => [v, i]));
  const c1i = c1.keys();
  const c2i = c2.keys();

  for (word of goal) {
    if (c1.has(word)) {
      if (c1i.next().value !== word) return "No";
    } else if (c2.has(word)) {
      if (c2i.next().value !== word) return "No";
    } else {
      return "No";
    }
  }

  return "Yes";
}
```

먼저, 각 카드 배열을 Map 객체로 변환하였다. 그리고 객체를 수동으로 순회하기 위해서 `keys` 메서드를 통해 `key` 들의 반복자를 추출하였다.

```jsx
const c1 = new Map(card1.map((v, i) => [v, i])); // Map { "i" => 1 , "drink" => 2, "water" => 3 }
const c2 = new Map(card2.map((v, i) => [v, i])); // Map { "want" => 1, "to" => 2, "drink" => 3 ]
const c1i = c1.keys(); // { [iterator] }
const c2i = c2.keys();
```

이제 goal의 값들을 순회하면서 값이 일치하는지 비교한다. `Map Iterator`의 `next` 함수를 호출하면 `key`를 추가한 순으로 `key`나 `value`를 가져올 수 있다. 예를 들어 다음과 같다.

```jsx
const c1 = new Map(card1.map((v, i) => [v, i]));
// Map { "i" => 1 , "drink" => 2, "water" => 3 }

const c1i = c1.keys();

console.log(c1i.next().value); // i
console.log(c1i.next().value); // drink
console.log(c1i.next().value); // water
console.log(c1i.next().value); // undefined
```

이를 이용하여, 값을 찾는다. `has` 메서드로 먼저 값이 있는지 확인하는 이유는 `next` 함수는 호출과 동시에 바로 다음 `key`로 넘어가기 때문이다. 구체적으로, `c1` 에서 먼저 값을 찾은 후 없다면 `c2` 로 넘어가야한다. 만약 `c1`의 값을 `next` 로 불러왔는데 값이 없다면, 이 요소는 다음 단어와 비교되지 않고 건너뛰어져 버리는 현상이 발생한다. 이를 방지하기 위해 미리 확인하는 과정이 필요한 것이다.

```jsx
for (word of goal) {
  // c1에 word가 있으면
  if (c1.has(word)) {
    // c1의 다음 value와 일치하지 않으면 "No"
    if (c1i.next().value !== word) return "No";
    // c2에 word가 있으면
  } else if (c2.has(word)) {
    // c2의 다음 value와 일치하지 않으면 "No"
    if (c2i.next().value !== word) return "No";
    // c1, c2에도 없으면 "No"
  } else {
    return "No";
  }
}

return "Yes";
```

Map 객체에 있는 메서드를 활용하여 코드를 작성하니, 코드과 꽤 직관적으로 짤 수 있어서 좋은 것 같다. 다만, 이처럼 간단한 작업에서 모든 배열을 객체화 시키는 것이 조금 오버헤드가 큰 것이 아닌가라는 생각이 들기도 한다. 배열이 엄청 크고 루프가 많이 일어나면 더 좋은 성능을 보일 것 같기도 하다.
