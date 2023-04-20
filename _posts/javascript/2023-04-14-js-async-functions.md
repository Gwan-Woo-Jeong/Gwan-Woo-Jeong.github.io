---
layout: single
title: "[JavaScript] 비동기 처리 (Promise & async/await)"
categories: javascript
tag: [JavaScript, Promise, Async/Await]
toc: true
toc_sticky: true
excerpt: '지난 글에서 한 번에 하나의 작업만 실행할 수 있는 자바스크립트가 어떻게 동시에 여러 작업을 실행할 수 있는 지 알아보았다.
짧게 요약하자면, 자바스크립트 엔진은 하나의 작업 처리 환경 (콜 스택)을 가지고 있어 한 번에 한 가지 작업만 할 수 있다.'
header:
  teaser: https://i.redd.it/359wewwmjbc31.jpg

---

![](https://i.redd.it/359wewwmjbc31.jpg)

# 들어가며

지난 글에서 한 번에 하나의 작업만 실행할 수 있는 자바스크립트가 어떻게 동시에 여러 작업을 실행할 수 있는 지 알아보았다.

짧게 요약하자면, 자바스크립트 엔진은 하나의 작업 처리 환경 (콜 스택)을 가지고 있어 한 번에 한 가지 작업만 할 수 있다. 그러나, 자바스크립트 엔진은 특정 작업(Web API)을 브라우저에게 전달하고 둘은 각자의 작업을 동시에 수행한다. 이 Web API는 비동기적으로 작동하는 작업들로 완료 후에 후속 작업 (콜백 함수)를 반환한다. 태스크 큐에 저장된 콜백 함수들은 이벤트 루프에 의해 콜 스택에 쌓이고 처리된다.

이번 글에서는 실제 자바스크립트 코드를 작성할 때, 이 비동기 처리를 하는 방법들에 대해 알아보고자 한다.

# 비동기 처리란?

우선 짚고 넘어가야 할 부분이 있다. 우리가 알아볼 비동기 처리란 무엇인가? 이전 글에서도 말했듯이, 비동기적으로 처리되는 작업은 함수끼리 서로의 시작과 완료를 신경쓰지 않는다. 그래서, 비동기 함수는 병렬적으로 실행된다. 쉽게 말해, 함수 A가 실행되는 동안 함수 B를 실행할 수 있는 것이다.

하지만, 코드를 작성할 때 비동기 함수는 문제가 된다. 왜냐하면, 비동기로 실행시킨 함수는 언제 완료될지 모르기 때문이다. 예를 들어, 함수 A가 비동기 함수 B의 리턴값을 가지고 연산을 한다면 B가 완료되기 전까지 A가 실행되선 안된다. 우리는 이러한 비동기 함수에 대해 완료 시점을 보장받을 수 있어야 한다.

정리하자면, 비동기 처리란 병렬적으로 (동시에 여러 개가) 실행 및 완료되는 비동기 함수들의 완료 순서를 보장 받기 위해 동기적으로 혹은 직렬적으로 (코드가 위에서부터 아래로 한줄 한줄씩) 동작하게 만드는 것이다. 비동기 처리를 위한 기법들을 지금부터 알아보자.

# 비동기 처리 방법

## 콜백 함수

`setTimeout` 은 2번째의 인자인 밀리초만큼 1번째 인자의 함수의 실행을 지연시키는 비동기 함수다.
이 함수를 이용하여 10초 이내의 랜덤한 시간 안에 실행 순서를 출력하는 함수를 만들어보자.

```js
const printFirst = function () {
  setTimeout(() => console.log("first"), Math.random() * 10000);
};

const printSecond = function () {
  setTimeout(() => console.log("second"), Math.random() * 10000);
};

const printLast = function () {
  setTimeout(() => console.log("last"), Math.random() * 10000);
};
```

이 함수를 그대로 비동기적으로 동작하게 실행시켜보자.

```js
printFirst();
printSecond();
printLast();

// 결과 :
// first
// last
// second
```

역시나, 코드를 실행시킨 순서와 상관없이 랜덤하게 출력되었다. 즉, 이 비동기 함수들이 완료되는 시간은 알 수 없다. 어떻게 하면 이 함수들의 완료 순서를 차례대로 맞출 수 있을까?

그 방법 중 하나는 콜백 함수를 사용하는 것이다. 콜백 함수는 간단하게 말하면 함수 안에서 실행하는 또 다른 함수다. 함수를 인자로 받아, 마지막 끝단에 해당 함수를 실행하는 방법으로 함수의 완료 순서를 보장받을 수 있다.

위의 예시 코드를 콜백 함수 형태로 변형시켜보자.

```js
const printFirst = (callback) => {
  setTimeout(() => {
    console.log("first");
    callback();
  }, Math.random() * 10000);
};

const printSecond = (callback) => {
  setTimeout(() => {
    console.log("second");
    callback();
  }, Math.random() * 10000);
};

const printLast = (callback) => {
  setTimeout(() => {
    console.log("last");
    callback();
  }, Math.random() * 10000);
};
```

이제 이 함수들을 우리가 원하는 순서대로 실행시켜보자.

```js
printFirst(() => {
  printSecond(() => {
    printLast();
  });
});

// 결과 :
// first
// second
// last
```

100번을 돌려도 똑같이 순서대로 출력되었다. 이와 같이, 콜백 함수를 원하는 순서대로 입력하여 호출하면 비동기 함수를 동기적으로 처리할 수 있다. 이런 함수들의 호출 방식을 **콜백 체이닝 (Callback Chainning)**이라고 한다.

하지만 이 방법은 치명적인 단점이 있다. 바로, 콜백 지옥을 만들 수도 있다는 것이다. 위 예시와 같은 함수들이 3개가 아닌, 30개가 있다고 가정해보자. 이 함수들을 순서대로 호출하면 코드가 다음과 같이 만들어진다.

```js
printFirst(() => {
  printSecond(() => {
    printThird(() => {
      printFourth(() => {
        printFifth(() => {
          printSixth(() => {
            printSeventh(() => {
              ...
            });
          });
        });
      });
    });
  });
});
```

함수의 매개변수로 넘기는 콜백 함수가 계속 반복되어 코드의 들여쓰기가 감당이 안될 정도로 깊어진다. 이런 현상을 **콜백 지옥(Callback Hell)**이라 부른다.

<figure>
<a href="https://images.viblo.asia/fd09f945-1a84-4cb5-9adb-95711ba032e1.jpg">
  <img src="https://images.viblo.asia/fd09f945-1a84-4cb5-9adb-95711ba032e1.jpg" title="callback-hell.jpg">
<figcaption>
</figcaption>
</a>
</figure>

## Promise

프로미스(Promise)를 사용하면, 콜백 지옥의 문제를 어느정도 해소할 수 있다. 프로미스는 말그대로 비동기 작업이 성공적으로 완료되면 그 결과 값을 반환해주는 약속(실제로는 객체)이다. 프로미스 객체를 리턴하는 함수를 만들면 좀 더 직관적인 비동기 처리가 가능하다.

프로미스는 3가지 상태가 있다.

1. pending(대기) : 처리가 완료되지 않은 상태
2. fulfilled(이행) : 성공적으로 처리가 완료된 상태
3. Rejected(거부) : 처리가 실패로 끝난 상태

<figure>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png">
  <img src="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png" title="promise-flow.png">
<figcaption>
  [프로미스의 객체의 처리 흐름] 비동기 함수의 처리 상태에 따라 알맞은 작업을 실행할 수 있도록 해준다.
</figcaption>
</a>
</figure>

프로미스 객체는 생성자를 통해 만들 수 있다. 생성자를 통해 프로미스 객체를 생성되면 pending(대기) 상태가 된다.

```js
new Promise(/* executor */); // [pending]
```

생성자의 인자로 executor 함수를 입력하는데, 이 함수는 `resolve`와 `reject`라는 두 가지 콜백 함수를 받는다.<br /> `resolve`는 비동기 처리가 성공했을 때 실행하는 콜백 함수다. 이 함수가 실행되면 프로미스 객체는 `fulfilled` 상태가 된다.<br />

`reject`는 비동기 처리가 실패했을 때 실행하는 콜백 함수다.이 함수가 실행되면 프로미스 객체는 `rejected` 상태가 된다.

```js
new Promise((resolve, reject) => {
  // ...비동기 처리 코드
  resolve(); // 성공 시 [fulfilled]
  reject(); //  실패 시 [rejected]
});
```

여기까지, 비동기 처리를 위한 프로미스 객체를 생성하는 방법이었다. 이제 이 프로미스를 리턴하는 함수를 실행하는 법을 알아보자.

콜백 체이닝과 마찬가지로, 프로미스는 `then`이라는 문법을 사용하여 `then` 체이닝이 가능하다. 프로미스 객체의 resolve (비동기 함수 처리 성공)가 호출되면 `then` 내부의 함수가 실행되는 패턴이다. `then` 내부 함수의 리턴 값은 다음 `then`의 내부 함수의 인자로 주어진다.

```js
const promise = function (num) {
  return new Promise((resolve, reject) => {
    if (num > 0) resolve(num);
    reject(new Error("error!"));
  });
};

promise(1)
  .then((value) => {
    console.log(value); // 1
    return value + 1;
  })
  .then((value) => {
    console.log(value); // 2
    return value + 1;
  })
  .then((value) => {
    console.log(value); // 3
    return value + 1;
  });
```

만약 `reject`(비동기 함수 처리 실패)가 호출되면, `then` 체인의 끝에 `catch`로 연결되어 있는 함수를 실행한다. 이를 이용해 에러 핸들링을 할 수 있다. 그리고, 프로미스 체인의 가장 끝에 달리는 `finally`는 비동기 처리의 성공과 실패 여부와 관계 없이 마지막에 무조건 실행된다.

```js
promise(-1)
  .then(...)
  ...
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log('promise end');
  });

/*
  결과 :
  Error: error!
  promise end
*/
```

지금까지, 프로미스 객체를 다루는 기본적인 방법에 대해 알아보았다. 이번에도 `setTimeout`을 사용하여 실제로 프로미스 체이닝을 통해 비동기 함수들을 제어하는 코드를 만들어보자. 학교에서 하는 일들을 함수로 다음과 같이 표현해보았다.

```js
function goToSchool() {
  return new Promise((resolve, reject) => {
    console.log("등교 시작");
    setTimeout(() => {
      console.log("학교 도착");
      resolve("등교");
    }, 1000);
  });
}

function study() {
  return new Promise((resolve, reject) => {
    console.log("공부 시작");
    setTimeout(() => {
      console.log("공부 끝");
      resolve("공부");
    }, 3000);
  });
}

function eatLunch() {
  return new Promise((resolve, reject) => {
    console.log("점심식사 시작");
    setTimeout(() => {
      console.log("점심식사 끝");
      resolve("점심식사");
    }, 2000);
  });
}
```

이제 비동기 함수들을 차례대로 실행해보자.

```js
goToSchool()
  .then(() => study())
  .then(() => eatLunch());
/*
결과 :
등교 시작 
학교 도착
공부 시작
공부 끝
점심식사 시작
점심식사 끝
*/
```

`then` 체이닝을 통해 깔끔한 코드가 완성되었다. 여기서, 이번엔 각 함수들이 `resolve`를 통해 리턴하는 값들을 가지고 하나의 문자열로 합치는 함수를 만들어보자.

```js
function writeDiary() {
  return goToSchool().then((first) => {
    return study().then((second) => {
      return eatLunch().then((third) => {
        console.log(`오늘 한 일: ${first}. ${second}, ${third}`);
      });
    });
  });
}
```

또 문제가 생겼다. 여러 프로미스의 리턴 값들에 접근하기 위해 `then` 블록을 중첩시켰더니, 들여쓰기의 깊이가 계속 깊어져 가독성이 좋지 않아졌다. 이런 현상을 콜백 지옥과 마찬가지로 **프로미스 지옥 (Promise Hell)**이라고 한다.

그렇다면, 이 들여쓰기의 지옥으로부터 완벽하게 벗어나기 위해선 어떻게 해야할까?

## async/await

`async/await` 문법을 사용하면 비동기 함수를 동기 함수와 똑같이 작성할 수 있기 때문에, 들여쓰기 지옥으로부터 자유로워질 수 있다.

### async

우선 `async` 라는 키워드부터 살펴보자. 이 키워드를 `function` 앞에 붙이면 비동기 함수를 선언할 수 있다. 이 **함수는 항상 프로미스 객체를 반환**하고, **리턴 값은 `resolve()`의 값**과 같다. reject하기 위해선 에러를 `throw`해주면 된다.

예시로, 위 예시 함수를 `async` 키워드를 적용시켜보자. 코드가 간단해진 것을 확인할 수 있다.

```js
// before
function goToSchool() {
  return new Promise((resolve, reject) => {
    console.log("등교 시작");
    setTimeout(() => {
      console.log("학교 도착");
      resolve("등교");
    }, 1000);
  });
}

// after
async function goToSchool() {
  console.log("등교 시작");
  setTimeout(() => {
    console.log("학교 도착");
    return "등교";
  }, 1000);
}
```

### await

`await` 키워드는 프로미스가 처리(settled)될 때 까지 말그대로 기다리게 한다. `promise.then()`의 역할과 같다. 하지만, `then`의 경우 내부에 함수 스코프를 생성하기 때문에 프로미스의 결과 값에 접근하기 위해 함수 내부에서 로직을 작성해야한다. 그래서, 만약 프로미스가 중첩된다면 방금 전 처럼 프로미스 지옥이 생길 수 있다. `await`은 즉시 동기 처리를 하기 때문에, 이런 들여쓰기에 대한 걱정이 없다. `await`은 `async function` 안에서만 쓸 수 있다는 것을 명심하자.

위 예시 코드를 `async/await` 키워드로 최적화 시켜보도록 하자.

우선, 반복되는 `setTimeout` 함수 자체를 커스텀해보자. `ms`를 인자로 받아, 해당 시간만큼 후에 다음 코드가 작동할 것이다.

```js
function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });
}
```

다음으로, 나머지 함수들을 최적화하자. 코드가 상당히 읽기 편해졌다.

```js
async function goToSchool() {
  console.log("등교 시작");
  await delay(1000);
  console.log("학교 도착");
  return "등교";
}

async function study() {
  console.log("공부 시작");
  await delay(3000);
  console.log("공부 끝");
  return "공부";
}

async function eatLunch() {
  console.log("점심식사 시작");
  await delay(2000);
  console.log("점심식사 끝");
  return "점심식사";
}
```

마지막으로 프로미스 지옥으로 가기 직전의 코드는 어떻게 되었을까? 다음과 같이 말끔해졌다.

```js
async function writeDiary() {
  const first = await goToSchool();
  const second = await study();
  const third = await eatLunch();
  console.log(`오늘 한 일: ${first}. ${second}, ${third}`);
}
```

`await`를 쓰면서 코드는 보기 좋아졌지만, 문제가 생겼다. 비동기 함수들이 비효율적으로 하나씩 직렬로 처리되길 기다려야 한다는 것이다. 이를 병렬적으로 처리하는 방법이 두 가지 있다.

첫 번째는 비동기 함수들을 그대로 실행시켜 처리되지 않은 프로미스 객체를 가져온 후, `await` 키워드로 프로미스를 처리하는 것이다.

```js
async function writeDiary() {
  const firstPromise = goToSchool();
  const secondPromise = study();
  const thirdPromise = eatLunch();

  const first = await firstPromise;
  const second = await secondPromise;
  const third = await thirdPromise;
  ...
}
```

두 번째는 `Promise.all()` 메서드를 사용하는 것이다. 프로미스 객체들로 이루어진 배열을 넣으면, 한번에 모아서 처리 가능하다. 배열 안의 프로미스들의 순서는 처리 후에도 동일하다. 즉, 처리 순이 아닌 나열된 순이다.

```js
async function writeDiary() {
  const [first, second, third] = await Promise.all([
    goToSchool(),
    study(),
    eatLunch()
  ]);
  ...
}
```

물론 Promise이기 때문에, `then`으로도 처리 가능하다.

```js
async function writeDiary() {
  Promise.all([goToSchool(), study(), eatLunch()])
  	.then(([first, second, third]) => {
    	...
  })
}
```

마지막으로, `async/await`의 에러 핸들링 방법을 알아보자. `async function` 안에서 리턴 값이 `resolve()`의 값이고 `throw`로 날린 에러가 `reject()`의 값이라고 하였다.

```js
async function errorPromise(num) {
  throw "rejected";
}
```

프로미스의 경우, `then` 체이닝의 끝에 `catch` 체인 안에서 에러 핸들링을 하였다. 사실, `async function` 또한 프로미스를 리턴하기 때문에 `catch` 체이닝도 가능하다. 하지만, 동기적으로 작동하는 코드이기 때문에 `try/catch` 문을 쓰는 것이 더 가독성에 좋다.

```js
async function errorPromise(num) {
  try {
    await promise();
  } catch (err) {
    console.error(err);
  }
}
```

> `Promise`를 꼭 써야하는 경우?
>
> 사실, 대부분의 경우 `async/await`을 쓰는 것이 코드 작성의 편리함이나 가독성 등 여러 모로 좋다. 그럼에도 불구하고, `Promise`를 써야하는 경우는 `Promise`가 제공하는 메서드를 사용하면 좋은 케이스일 때인 것 같다.
>
> 앞선 예시와 같이 여러 프로미스들을 병렬적으로 처리해야 할 경우 `Promise.all`을 쓰면 좋다. `Promise.all`이 프로미스의 나열 순으로 처리(settled)된 프로미스 배열을 반환한다. 이와 비슷하면서 다른 `Promise.race`도 있다. 이는 인자로 주어진 프로미스 배열 중 가장 빨리 처리된 프로미스 하나를 반환한다.

# Reference

- [https://www.youtube.com/watch?v=aoQSOZfz3vQ](https://www.youtube.com/watch?v=aoQSOZfz3vQ)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [https://inpa.tistory.com/entry/JS-📚-비동기처리-async-await](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%B2%98%EB%A6%AC-async-await)
