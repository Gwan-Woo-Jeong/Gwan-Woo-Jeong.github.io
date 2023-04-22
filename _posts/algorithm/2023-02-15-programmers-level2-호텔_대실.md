---
layout: single
title: 'Programmers - Level 2 : 호텔 대실'
categories: Algorithm
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

## 문제 설명

### 설명

최소한의 객실만 사용하여 예약 손님들을 받으려고 함. 사용한 객실은 퇴실 시간을 기준, 10분 청소 후 사용 가능.

> 최소 객실의 수를 리턴하는 함수를 완성하라.

### 매개 변수

- book_time : 예약 시각이 문자열 형태로 담긴 2차원 배열

### 입출력 예시

| book_time                                                                                            | result |
| ---------------------------------------------------------------------------------------------------- | ------ |
| [["15:00", "17:00"], ["16:40", "18:20"], ["14:20", "15:20"], ["14:10", "19:20"], ["18:20", "21:20"]] | 3      |
| [["09:10", "10:10"], ["10:20", "12:20"]]                                                             | 1      |
| [["10:20", "12:30"], ["10:20", "12:30"], ["10:20", "12:30"]]                                         | 3      |

## 내 풀이

### 1차 시도 (오답)

```jsx
function solution(book_time) {
  var answer = 0;

  const books = book_time.map((el) => {
    // 예약 종료 시간에 청소 시간 10분 추가
    let startTime = el[0].split(":"),
      endTime = el[1].split(":");
    endTime[1] = Number(endTime[1]) + 10;
    if (endTime[1] >= 60) {
      endTime[1] = endTime[1] % 60;
      endTime[0] = Number(endTime[0]) + 1;
    }

    // book_time => [[[15, 0], [17, 10]], ...] 형태로 변환
    return [
      [Number(startTime[0]), Number(startTime[1])],
      [Number(endTime[0]), Number(endTime[1])],
    ];
  });

  if (books.length > 0) {
    // 예약 리스트를 이중 반복문으로 시간/분을 비교하여 필요한 방을 합산
    for (let i = 0; i < books.length; i++) {
      for (let j = i + 1; j < books.length; j++) {
        if (
          books[i][0][0] === books[j][0][0] &&
          books[i][0][1] === books[j][0][1] &&
          books[i][1][0] === books[j][1][0] &&
          books[i][1][1] === books[j][1][1]
        ) {
          answer++;
        } else if (
          books[i][0][0] < books[j][0][0] &&
          books[i][1][0] > books[j][1][0]
        ) {
          answer++;
        } else if (
          books[i][0][0] < books[j][0][0] &&
          books[i][1][0] > books[j][0][0]
        ) {
          answer++;
        } else if (
          books[i][0][0] < books[j][1][0] &&
          books[i][1][0] > books[j][1][0]
        ) {
          answer++;
        } else if (
          books[i][0][0] === books[j][1][0] &&
          books[i][0][1] > books[j][1][1]
        ) {
          answer++;
        } else if (
          books[i][1][0] === books[j][0][0] &&
          books[i][1][1] > books[j][0][1]
        ) {
          answer++;
        }
      }
    }
  }
  return answer;
}
```

문제를 풀기전 내가 만든 시나리오는 다음과 같다.

1. 예약 종료 시간에 청소 시간을 미리 합산
2. 예약 목록 배열을 보기 좋게 [`[[예약시작 시간 , 예약시작 분], [예약종료 시간, 예약 종료 분]], …]` 형태로 변환
3. 이중 반복문을 돌면서, 각 예약 시간/분을 비교하여 겹치는 케이스에서 방 갯수를 1씩 더함

꽤나 공을 들여서 케이스를 분기하여 로직을 구현해보려고 했지만 케이스가 너무 복잡해서 엄청 헤매다가 결국 처참하게 실패했다…

### 2차 시도

구글링을 통해 어느정도 힌트를 얻은 다음, 다시 시도해보았다.

```jsx
// 2차원 시간 배열을 분으로 환산
const convertToMin = (timeArr) => {
  const [hour, min] = timeArr.split(":").map((el) => parseInt(el));
  return hour * 60 + min;
};

const solution = (book_time) => {
  let rooms = [];

  // 예약 시작시간 오름차순으로 정렬
  book_time.sort().forEach(([st, et]) => {
    const bookStart = convertToMin(st);
    const bookEnd = convertToMin(et);

    // 시작 시, 방이 없으므로 추가
    if (rooms.length === 0) {
      rooms.push(bookEnd + 10);
    } else {
      // 방이 필요한 상태
      let isRoomNeeded = true;

      // 방 배열을 오름차순으로 정렬
      rooms.sort().forEach((end, i) => {
        // 예약 시작 시간이 기존 방의 종료 시간과 겹치지 않으면,
        if (!(end > bookStart)) {
          // 방을 추가할 필요 없음
          isRoomNeeded = false;
          // 방의 종료시간을 다음 예약종료 시간으로 변경
          rooms[i] = bookEnd + 10;
          return false;
        }
      });
      // 방 추가
      if (isRoomNeeded) rooms.push(bookEnd + 10);
    }
  });
  // 방 목록 배열 길이 리턴
  return rooms.length;
};
```

2차원 시간 배열을 분으로 환산하니 훨씬 더 로직이 쉽고 단순해졌다. 여기서 핵심은 예약 시간을 정렬하여, 반복문을 통해 이전 시간과 다음 시간 비교가 가능하게 만드는 것이다. 처음 시도할 때, 그저 한 번씩만 비교하면 되는 줄 알았는데 그게 아니였다..

이중 반복을 통해서 매개변수로 주어진 예약목록을 현재 방 목록과 비교하는데, 방 목록에는 종료시간을 할당한다. 이 종료시간과 다음 예약 시작시간을 비교하는데, 두 시간이 겹치지 않으면 두 예약건을 하나의 방으로 해결이 가능하기 때문에 방을 추가할 필요없다.

### 3차 시도

여기서 한 단계 더 나아가 Map 객체를 쓰는 방법을 구글링을 통해 찾았다. 기존 방법보다 획기적으로 코드 양이 줄어 굉장히 충격적이다.

```jsx
function solution(book_time) {
  const convertToMin = (timeArr) => {
    const [hour, min] = timeArr.split(":").map((el) => parseInt(el));
    return hour * 60 + min;
  };

  const map = new Map();

  for ([startTime, endTime] of book_time) {
    let st = convertToMin(startTime),
      et = convertToMin(endTime);

    // 각 예약 건의 시작시간부터 종료시간 + 10(청소시간)까지 반복
    while (st < et + 10) {
      // 모든 분 단위 예약 시간별로 Map 객체에 1씩 누적
      map.set(st, (map.get(st) || 0) + 1);
      st++;
    }
  }

  // 가장 value가 높은 값이 필요한 방의 개수
  return Math.max(...map.values());
}
```

이 방법은 기존 방식과 많이 다르다. 예약 시작과 종료까지 분 단위마다 key를 생성하여 방 개수를 저장한다. 그래서, 예약 건들을 반복문을 돌면서 그 분 단위의 시간(key)이 겹치면 1씩 중첩된다. 이 중첩된 숫자가 그 시간에 필요한 방의 개수를 의미하고, 이렇게 합산된 수 많은 key (시간) - value (방 개수) 중에 가장 value를 높은 값을 도출해내면 바로 그것이 이 문제의 답이다.

더 쉽게 보기 위해, 다음과 같은 예약 목록이 있다고 가정해보자.

```jsx
[
  [900, 1020], // ["15:00", "17:00"]
  [1000, 1100], // ["16:40", "18:20"]
  [860, 920], // ["14:20", "15:20"]
  [850, 1160], // ["14:10", "19:20"]
  [1100, 1280], // ["18:20", "21:20"]
];
```

이를 위 함수의 while 문을 통해 Map 객체로 만들면 이렇게 된다.

```jsx
Map {
  900 => 3,
  901 => 3,
  902 => 3,
  903 => 3,
  904 => 3,
  905 => 3,
  ...
  930 => 2,
  931 => 2,
  932 => 2,
  933 => 2,
  934 => 2,
  935 => 2,
  ...
  850 => 1,
  851 => 1,
  852 => 1,
  853 => 1,
  854 => 1,
  855 => 1,
  ...
}
```

이게 무슨 말이냐하면, 900분 (15:00) 부터 929분 (15:29)까지 3개의 방이 쓰이고 있다는 의미이다. 930분 (15:30)부터는 2개의 방이 쓰이고 있으며, 850분(14:16)부터는 1개의 방만 쓰이고 있다. 이를 종합해봤을 때, 모든 예약 건을 소화하기 위해선 최소 3개의 방이 있어야 된다는 사실을 알 수 있다.
