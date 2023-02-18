---
layout: single
title: '[Algorithm] Programmers - Level 1 : 신고결과 받기'
categories: algorithm
tag: [javascript, algorithm, programmers]
toc: true
toc_sticky: true
excerpt: '
문제 설명

게시판 불량 이용자를 신고하고 처리 결과를 메일로 발송하는 시스템을 개발하려고 함.

- 각 유저는 한 번에 한 명의 유저를 신고할 수 있음.
  - 신고 횟수에 제한은 없음.
  - 한 유저를 여러 번 신고가 가능하나, 동일한 유저 신고 횟수는 1회로 처리.
- k번 이상 신고된 유저는 게시판 이용이 정지, 해당 유저를 신고한 모든 유저에게 정지 사실을 메일로 알림

> 각 유저별로 처리 결과 메일을 받은 횟수를 배열로 리턴하는 함수를 만들어라.

'
header:
  teaser: ../../images/thumbnails/programmers.png


---

![프로그래머스.png](../../images/thumbnails/programmers.png)

# Programmers - Level 1 : 신고결과 받기

## 문제 설명

### 설명

게시판 불량 이용자를 신고하고 처리 결과를 메일로 발송하는 시스템을 개발하려고 함.

- 각 유저는 한 번에 한 명의 유저를 신고할 수 있음.
  - 신고 횟수에 제한은 없음.
  - 한 유저를 여러 번 신고가 가능하나, 동일한 유저 신고 횟수는 1회로 처리.
- k번 이상 신고된 유저는 게시판 이용이 정지, 해당 유저를 신고한 모든 유저에게 정지 사실을 메일로 알림

> 각 유저별로 처리 결과 메일을 받은 횟수를 배열로 리턴하는 함수를 만들어라.

### 매개 변수

- id_list : 이용자 ID가 담긴 문자열 배열
- report : 각 이용자가 신고한 이용자의 ID 정보가 담긴 문자열 배열
- k : 정지 기준이 되는 신고 횟수

### 입출력 예시

| id_list                            | report                                                             | k   | result    |
| ---------------------------------- | ------------------------------------------------------------------ | --- | --------- |
| ["muzi", "frodo", "apeach", "neo"] | ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"] | 2   | [2,1,1,0] |
| ["con", "ryan"]                    | ["ryan con", "ryan con", "ryan con", "ryan con"]                   | 3   | [0,0]     |

## 내 풀이

```jsx
function solution(id_list, report, k) {
  let receivedReports = {},
    successBanCounts = {};

  /* id_list를 배열에서 객체로 변환
  receivedReports : 신고를 받은 ID의 목록
  successBanCounts : 신고가 정지로 이어진 횟수
  */
  id_list.forEach((each) => {
    receivedReports[each] = [];
    successBanCounts[each] = 0;
  });

  // 중복된 신고 제거
  [...new Set(report)].forEach((each) => {
    const reporter = each.split(" ")[0];
    const reported = each.split(" ")[1];

    // 신고 받은 ID를 배열에 추가
    receivedReports[reported] = [...receivedReports[reported], reporter];
  });

  // 신고 받은 ID 개수가 k(정지 최소 횟수)이상이면 해당 ID들을 합산하여 successBanCounts에 할당
  for (let reported in receivedReports) {
    if (receivedReports[reported].length >= k) {
      receivedReports[reported].forEach(
        (reporter) =>
          (successBanCounts[reporter] = successBanCounts[reporter] + 1)
      );
    }
  }

  // successBanCounts를 배열로 변환하여 리턴
  return Object.keys(successBanCounts).map((key) => successBanCounts[key]);
}
```

### 설명

신고 결과를 주어진 ID 순서대로 `key`로서 객체로 선언하였다. 신고 결과 객체의 `value`는 신고자의 ID가 들어간다. 그 이유는 신고자를 알아야 정지 당한 ID를 구했을 때, 정지 처리 메일을 받을 목록을 만들 수 있기 때문이다.

```jsx
// 신고 결과 (receivedReports)
{ "muzi" : [ /* 신고자가 들어가는 배열 */ ] , "frodo" : [], "appeach" : [], "neo" : [] }
```

신고한 ID가 `k` 이상 신고 당했을 경우, 이를 합산할 수 있는 객체를 따로 선언하였다.

```jsx
// 정지 처리 메일을 받은 횟수 (successBanCounts)
{ "muzi" : 0 , "frodo" : 0, "appeach" : 0, "neo" : 0 }
```

이제 신고 기록들을 순회하여 신고 결과를 합산하였다.

```jsx
 { "muzi" : ["apeach" /* apeach에게 한번 신고당함 */], ... }
```

위 배열의 길이가 `k` 이상이면 신고자 (배열의 요소)에게 정지 처리 메일을 보낸다. 이 조건을 충족할 때마다, `successBanCounts` 의 값을 하나씩 높인다.

```jsx
// 신고 결과 (receivedReports)
{ "muzi" : ["appeach"], "frodo" : ["muzi", "apeach"], "appeach" : [], "neo" : ["frodo", "muzi"] }

// 정지 처리 메일을 받은 횟수 (successBanCounts)
{ "muzi" : 2 , "frodo" : 1, "appeach" : 1, "neo" : 0 }
```

마지막으로 `successBanCounts` 를 문제 조건에 맞게 배열로 변환하여 리턴해주었다.

### 어려웠던 점

동일한 유저의 신고를 1회로 처리하는 방법을 생각해내는데 시간이 좀 걸렸다. 처음에는 신고 결과를 수집하는 과정에서 기존 배열을 확인하는 방법을 사용했는데, 이 방식은 배열의 요소마다 무조건 한번씩 순회를 거쳐야함으로 효율적이지 못했다.

구글링을 해보니 ES6부터 제공되는 `Set` 키워드를 사용하면 배열 자체에서 유니크한 값만 필터링이 가능했다. 처음부터 중복되는 요소를 제거하니 동작 속도가 훨씬 빨라졌다.

## 다른 사람의 풀이

```jsx
function solution(id_list, report, k) {
  // 중복된 신고 제거 후, 배열 0번째 인덱스는 신고자 / 1번째 인덱스는 신고 대상 할당
  let reports = [...new Set(report)].map((a) => {
    return a.split(" ");
  });

  // 신고 수 합산
  let counts = new Map();

  for (const bad of reports) {
    // 신고 대상을 key로 하여 value(신고 수)를 합산
    counts.set(bad[1], counts.get(bad[1]) + 1 || 1);
  }

  let good = new Map();

  for (const report of reports) {
    // 신고 기록을 순회하며 신고 합산 횟수가 k(정지 최소 횟수) 이상이면,
    if (counts.get(report[1]) >= k) {
      // 신고자를 key로 value(정지시킨 ID)를 합산
      good.set(report[0], good.get(report[0]) + 1 || 1);
    }
  }

  // ID 리스트를 key로 value(정지시킨 ID 수)를 구함
  let answer = id_list.map((a) => good.get(a) || 0);
  return answer;
}
```

### 해석

내 풀이와 마찬가지로 중복되는 신고를 제거하면서 시작한다. 하지만, 다른점은 신고자의 ID를 저장하지 않고 신고 당한 횟수만 합산했다.

```jsx
{"frodo" => 2, "neo" => 2, "muzi" => 1}
/*
counts
vs
receivedReports
 */
{ "muzi" : ["appeach"], "frodo" : ["muzi", "apeach"], "appeach" : [], "neo" : ["frodo", "muzi"] }
```

이 신고 당한 횟수만 가지고 바로 신고 기록을 순회하여, 신고한 ID가 위 기록의 `key(신고 당한 ID)`와 같으면서 `k(최소 정지 횟수)` 이상이면 `정지 처리 메일을 받은 횟수(goods)`로 저장하였다.

```jsx
// 정지 처리 메일을 받은 횟수
{"muzi" => 2, "apeach" => 1, "frodo" => 1}
/*
goods
vs
successBanCounts
 */
{ "muzi" : 2 , "frodo" : 1, "appeach" : 1, "neo" : 0 }
```

### 배울 점

풀이 방식은 크게 다르지 않았으나, 딱 필요한 정보만 가지고 문제를 해결하여 더 간결하고 가독성이 좋은 것 같다. 처음에 신고 기록을 `[신고자 ID, 신고 당한 ID]` 로 정리하여 풀이를 전개하는 방식이 인상 깊었다. 이렇게 정리해놓으니, 굳이 신고자 ID 목록을 따로 배열로 정리하지 않고 바로 답을 도출해낼 수 있구나 깨달았다.

또, Map 객체를 사용한 것이 큰 차이인데 사실 이 문법을 거의 처음 보았다. 구글링을 해보니, Map 객체는 Object 객체와 매우 유사하나, 큰 차이점들이 존재했다. 주요한 차이는 다음과같다.

- Object는 key로 string과 symbol로만 선언이 가능하지만 Map은 제약이 없다.
- Map은 key의 삽입 순서를 기억하여, for of 문법으로도 순회가 가능하다.
- Map은 퍼포먼스 적으로 key 추가/제거가 Object보다 빠르다. 하지만, key-value 참조는 느리다는 말이 있다.

이런 사실들을 미루어 볼때, 알고리즘 풀이에 있어서 Object 객체를 쓰는 것보다 더 유용하게 쓰일 것 같다. 객체 참조/추가/삭제 방식이 Object와 달리 메소드를 사용하는 것 같은데, 정확히 어떻게 사용하는지 공부 해봐야겠다.
