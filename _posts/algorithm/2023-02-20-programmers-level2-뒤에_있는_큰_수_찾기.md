---
layout: single
title: 'Programmers - Level 2 : 뒤에 있는 큰 수 찾기'
categories: Algorithm
tag: [javascript, algorithm, programmers]
toc: true
toc_sticky: true
excerpt: '
문제 설명

배열의 각 원소들에 대해 자신보다 뒤에 있는 숫자 중에서 자신보다 크면서 가장 가까이 있는 수를 뒷 큰수라고 한다. 정수 배열 `numbers`가 매개변수로 주어질 때, 모든 원소에 대한 뒷 큰수들을 차례로 담은 배열을 리턴하도록 함수를 완성해라. 단, 뒷 큰수가 존재하지 않는 원소는 -1을 담는다.

제한사항

- 4 ≤ `numbers`의 길이 ≤ 1,000,000
    - 1 ≤ `numbers[i]` ≤ 1,000,000

입출력 예

| numbers | result |
| --- | --- |
| [2, 3, 3, 5] | [3, 5, 5, -1] |
| [9, 1, 5, 3, 6, 2] | [-1, 5, 6, 6, -1, -1] |
'

header:
  teaser: ../../images/thumbnails/programmers.png


---

![프로그래머스.png](../../images/thumbnails/programmers.png)

## 문제 설명

배열의 각 원소들에 대해 자신보다 뒤에 있는 숫자 중에서 자신보다 크면서 가장 가까이 있는 수를 뒷 큰수라고 한다. 정수 배열 `numbers`가 매개변수로 주어질 때, 모든 원소에 대한 뒷 큰수들을 차례로 담은 배열을 리턴하도록 함수를 완성해라. 단, 뒷 큰수가 존재하지 않는 원소는 -1을 담는다.

## 제한사항

- 4 ≤ `numbers`의 길이 ≤ 1,000,000
  - 1 ≤ `numbers[i]` ≤ 1,000,000

## 입출력 예

| numbers            | result                |
| ------------------ | --------------------- |
| [2, 3, 3, 5]       | [3, 5, 5, -1]         |
| [9, 1, 5, 3, 6, 2] | [-1, 5, 6, 6, -1, -1] |

## 내 풀이

### 1차 시도 (오답)

대부분의 테스트 케이스는 맞췄지만, `numbers` 가 긴 테스트에서 시간초과로 인해 통과하지 못한 코드다.

단순하게 각 원소를 가지고 나머지 숫자들을 순회하여, 더 큰 숫자가 있으면 해당 숫자로 교체한다. 만약 없으면, -1을 리턴한다. 모든 숫자들을 순회하여서 그런지, 함수가 동작부터 종료되는 시간이 매우 오래 걸렸다.

```jsx
function solution(numbers) {
  let answer = new Array(numbers.length);
  answer[numbers.length - 1] = -1;
  for (let i = 0; i < numbers.length; i++) {
    let current = numbers[i];
    let isBiggerNum = false;
    for (let j = i + 1; j < numbers.length; j++) {
      if (current < numbers[j]) {
        answer[i] = numbers[j];
        isBiggerNum = true;
        break;
      }
    }
    if (isBiggerNum === false) answer[i] = -1;
  }
  return answer;
}
```

### 2차 시도 (오답)

그래서 시간을 단축하기 위해 다시 시도한 코드인데 결과는 더 처참했다.. 몇몇 테스트 케이스에선 시간이 줄은 듯하나 여전히 시간초과가 있었고 어떤 테스트는 통과조차 하지 못했다.

동작 완료 시간을 단축하기 위해서 하나의 숫자와 나머지 요소를 비교 할 때, 나머지 요소 중 가장 큰 요소의 인덱스를 구했다. 가장 큰 요소의 인덱스 뒤로는 확인할 필요가 없기 때문이다. 하지만 이 방법도 틀렸다.

```jsx
function solution(numbers) {
  let answer = [-1];
  let maxVal = numbers[numbers.length - 1];
  let maxIdx = numbers.length - 1;
  for (let i = numbers.length - 2; i >= 0; i--) {
    const current = numbers[i];
    if (current > maxVal) {
      maxVal = current;
      maxIdx = i;
      answer.unshift(-1);
    } else {
      for (let j = i + 1; j <= maxIdx; j++) {
        const target = numbers[j];
        if (current < target) {
          answer.unshift(target);
          break;
        }
      }
    }
  }
  return answer;
}
```

## 다른 사람의 풀이

구글링을 통해 이 문제가 스택 자료구조를 사용해야하는 문제인 것을 알았다.

스택 자료구조의 후입선출 [ LIFO(Last In First Out) ] 이란 특징을 이용하여, 현재 숫자가 마지막으로 스택에 넣은 수보다 크면 스택의 마지막 수를 버리고 새로운 수를 스택에 추가해주는 식으로 전개한다.

### 풀이

```jsx
function solution(numbers) {
  // 우선 모두 뒷 큰수가 존재하지 않는다고 가정한 후, 뒷 큰수를 찾아 교체해준다.
  const answer = Array(numbers.length).fill(-1);
  const stack = [];
  for (let i = 0; i < numbers.length; i++) {
    // 스택에 쌓인 마지막 인덱스를 참조하여 수를 비교, 현재 수가 더 크면 이게 뒷 큰수
    while (numbers[stack[stack.length - 1]] < numbers[i]) {
      // 스택에 마지막 수의 인덱스를 버리고, -1을 뒷 큰수로 교체
      answer[stack.pop()] = numbers[i];
    }
    // 차례대로 numbers의 인덱스를 스택에 쌓는다.
    stack.push(i);
  }
  return answer;
}
```

### 해석

입출력 예시 #2 에 나온 케이스를 하나하나 파해쳐보자.

| numbers            | result                |
| ------------------ | --------------------- |
| [9, 1, 5, 3, 6, 2] | [-1, 5, 6, 6, -1, -1] |

처음 `answer`는 뒷 큰수가 존재하지 않는다는 가정하에 시작한다.

```jsx
// answer
[-1, -1, -1, -1, -1, -1];
```

처음 스택에는 아무 요소도 없으므로 스택에는 인덱스 0 (i = 0)이 쌓인다.

```jsx
// numbers : [⑨, 1, 5, 3, 6, 2]

// stack
[0];
```

그 다음 i = 1일 때를 비교해보자. 현재 숫자 1은 스택의 마지막 요소 (9)보다 작기 때문에, 1은 뒷 큰수가 아니다. 그대로 해당 인덱스를 스택에 쌓아둔다.

```jsx
// numbers : [9, ①, 5, 3, 6, 2]

while (numbers[stack[stack.length - 1]] < numbers[i])
/*
  => numbers[0] < number[i]
  => 9 < 1
  => false
*/

// stack
[0] -> [0, 1]

```

그 다음 i = 2일 때는 다르다. 현재 숫자 5는 스택의 마지막 요소 (1)보다 크기 때문에, 5는 뒷 큰수다. 스택 `answer` 배열을 교체해준다.

```jsx
// numbers : [9, 1, ⑤, 3, 6, 2]

while (numbers[stack[stack.length - 1]] < numbers[i]) {
/*
  => numbers[1] < number[i]
  => 1 < 5
  => true
*/

  // 스택에 마지막 수의 인덱스 ( 1 )를 버리고, -1을 뒷 큰수 ( 5 )로 교체
  answer[stack.pop()] = numbers[i];
  // => answer[1] = 5
}

// stack
[0, 1] -> [0, 2]

// answer
[-1, 5, -1, -1, -1, -1]
```

그 다음 i = 3일 때를 보자. 현재 숫자 3은 스택의 마지막 요소 (5)보다 작기때문에, 3은 뒷 큰수가 아니다. 그대로 해당 인덱스를 스택에 쌓아둔다.

```jsx
// numbers : [9, 1, 5, ③, 6, 2]

while (numbers[stack[[stack.length - 1]] < numbers[i])
/*
  => numbers[0] < number[i]
  => 5 < 3
  => false
*/

// stack
[0, 1] -> [0, 2] -> [0, 2, 3]

// answer
[-1, 5, -1, -1, -1, -1]
```

그 다음 i = 4일 때는 어떤지보자. 현재 숫자 6은 스택의 마지막 요소 ( 3 )보다 크기 때문에, 6은 뒷 큰수다.

```jsx
// numbers : [9, 1, 5, 3, ⑥, 2]

while (numbers[stack[[stack.length - 1]] < numbers[i]) {
/*
  => numbers[3] < number[i]
  => 3 < 6
  => true
*/

  // 스택에 마지막 수의 인덱스 ( 3 )를 버리고, -1을 뒷 큰수 ( 6 )로 교체
  answer[stack.pop()] = numbers[i];
  // => answer[3] = 6
  // stack
  [0, 1] -> [0, 2] -> [0, 2, 3] -> [0, 2]
}

// answer
[-1, 5, -1, 6, -1, -1]
```

i = 4의 경우, 그 다음 스택의 마지막 요소 ( 5 )에 대해 마찬가지로 6은 뒷 큰수다. 스택과 `answer`를 교체해주자.

```jsx
// numbers : [9, 1, 5, 3, ⑥, 2]

while (numbers[stack[[stack.length - 1]] < numbers[i]) {
/*
  => numbers[0] < number[i]
  => 5 < 6
  => true
*/

  // 스택에 마지막 수의 인덱스 ( 2 )를 버리고, -1을 뒷 큰수 ( 6 )로 교체
  answer[stack.pop()] = numbers[i];
  //=> answer[2] = 6

  // stack
  [0, 1] -> [0, 2] -> [0, 2, 3] -> [0, 2] -> [0]
}

stack.push(i);

// stack
[0, 1] -> [0, 2] -> [0, 2, 3] -> [0, 2] -> [0] -> [0, 4]
// answer
[-1, 5, 6, 6, -1, -1]
```

마지막 인덱스 5다. 현재 스택의 마지막 요소 ( 4 ) 은 numbers[i] ( 2 )보다 크기 때문에, 뒷 큰수가 아니다.

```jsx
// numbers : [9, 1, 5, 3, 6, ②]

while (numbers[stack[stack.length - 1]] < numbers[i]) {
/*
  => numbers[4] < number[i]
  => 6 < 2
  => true
*/

// stack
[0, 1] -> [0, 2] -> [0, 2, 3] -> [0, 2] -> [0] -> [0, 4] -> [0, 4, 5]
```

결국, 이 과정을 거쳐 도출한 `answer` 배열은 다음과 같다.

```jsx
// answer
[-1, 5, 3, 6, -1, -1];
```
