---
layout: single
title: '[Algorithm] Programmers - Level 1 :  성격 유형 검사하기'
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

성격 유형 검사지를 만들려고 한다.다음과 같은 4개 지표로 성격 유형을 구분한다. 성격은 두 유형 중 하나.

| 지표 번호 | 성격 유형              |
| --------- | ---------------------- |
| 1번 지표  | 라이언형(R), 튜브형(T) |
| 2번 지표  | 콘형(C), 프로도형(F)   |
| 3번 지표  | 제이지형(J), 무지형(M) |
| 4번 지표  | 어피치형(A), 네오형(N) |

유형은 총 16(=2 x 2 x 2 x 2)가지가 나올 수 있다.

질문마다 판단하는 지표를 담은 1차원 문자열 배열 `survey`와 검사자가 각 질문마다 선택한 선택지를 담은 1차원 정수 배열 `choices`가 매개변수로 주어진다. 고로, `choices`의 길이와 `survey`의 길이는 같다.

`survey`의 원소는 `"RT", "TR", "FC", "CF", "MJ", "JM", "AN", "NA"` 중 하나다. `survey[i][0]`은 질문의 비동의 선택지를 선택하면 받는 성격 유형을 의미한다. `survey[i][1]`은 질문의 동의 선택지를 선택하면 받는 성격 유형을 의미한다.

`choices` 에는 다음과 같은 7개의 선택지가 있고 각 숫자는 오른쪽 뜻을 의미한다.

| choices | 뜻          |
| ------- | ----------- |
| 1       | 매우 비동의 |
| 2       | 비동의      |
| 3       | 약간 비동의 |
| 4       | 모르겠음    |
| 5       | 약간 동의   |
| 6       | 동의        |
| 7       | 매우 동의   |

이 `choices` 를 지표로 성격 유형 점수를 합산한 후, 각 지표에서 더 높은 점수를 받은 성격 유형을 산출한다. 단, 하나의 지표에서 성격 유형 점수가 같으면, 둘 중 사전 순으로 빠른 유형을 성격 유형으로 판단한다.

> 검사자의 성격 유형 검사 결과를 지표 번호 순서대로 리턴하도록 함수를 완성해라.

### 매개변수

- survey : 질문마다 판단하는 지표를 담은 1차원 문자열 배열
  - `"RT", "TR", "FC", "CF", "MJ", "JM", "AN", "NA"` 중 하나
- choices : 각 질문마다 선택한 선택지를 담은 1차원 정수 배열
  - 1 ~ 7의 숫자

### 입출력 예

| survey                         | choices         | result |
| ------------------------------ | --------------- | ------ |
| ["AN", "CF", "MJ", "RT", "NA"] | [5, 3, 2, 7, 5] | "TCMA" |
| ["TR", "RT", "TR"]             | [7, 1, 3]       | "RCJA" |

### 내 풀이

Map 객체를 사용하였다. 먼저, 각 유형 별 점수를 누적하여 `key-value` 로 저장하였다. 성격 유형이 4자리이고 각 자리마다 두 유형으로 나뉘는데, 이를 각 자리마다 알맞은 유형을 리턴하는 함수를 만드는게 쉬운 방법일 것 같았다.

유형 알파벳을 리턴하는 함수는 두 가지 유형의 알파벳을 받아, 먼저 사전 순으로 정렬한다. 그리고 Map 객체에서 `key`에 해당하는 알파벳에 대한 `value` 를 가져온다. 검사지(choices)에 기록되지 않은 알파벳이라면 Map 객체에 없을 수도 있다. 그래서 이 `key` 에 대한 `value` 를 0으로 일단 선언한 후, 두 유형의 점수를 비교한다.

```jsx
function solution(survey, choices) {
  const res = new Map();

  const returnType = (type1, type2) => {
    const sorted = [type1, type2].sort();
    const mtype1 = res.get(type1) || 0;
    const mtype2 = res.get(type2) || 0;

    if (mtype1 < mtype2) {
      return type2;
    } else if (mtype1 > mtype2) {
      return type1;
    } else {
      return sorted[0];
    }
  };

  const setType = (type, addNum = 0) =>
    res.set(type, (res.get(type) || 0) + addNum);

  for (let i = 0; i < survey.length; i++) {
    const type1 = survey[i][0];
    const type2 = survey[i][1];

    if (choices[i] === 1) setType(type1, 3);
    if (choices[i] === 2) setType(type1, 2);
    if (choices[i] === 3) setType(type1, 1);
    if (choices[i] === 4) {
      setType(type1);
      setType(type2);
    }
    if (choices[i] === 5) setType(type2, 1);
    if (choices[i] === 6) setType(type2, 2);
    if (choices[i] === 7) setType(type2, 3);
  }

  return (
    returnType("R", "T") +
    returnType("C", "F") +
    returnType("J", "M") +
    returnType("A", "N")
  );
}
```
