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
  setTimeout(() => console.log('first'), Math.random() * 10000);
};

const printSecond = function () {
  setTimeout(() => console.log('second'), Math.random() * 10000);
};

const printLast = function () {
  setTimeout(() => console.log('last'), Math.random() * 10000);
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
     console.log('first');
     callback();
   }, Math.random() * 10000);
 };
 
 const printSecond = (callback) => {
   setTimeout(() => {
     console.log('second');
     callback();
   }, Math.random() * 10000);
 };
 
 const printLast = (callback) => {
   setTimeout(() => {
     console.log('last');
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
new Promise(/* executor */) // [pending]
```

생성자의 인자로 executor 함수를 입력하는데, 이 함수는 `resolve`와 `reject`라는 두 가지 콜백 함수를 받는다.<br/> `resolve`는 비동기 처리가 성공했을 때 실행하는 콜백 함수다. 이 함수가 실행되면 프로미스 객체는 `fulfilled` 상태가 된다.<br/>

`reject`는 비동기 처리가 실패했을 때 실행하는 콜백 함수다.이 함수가 실행되면 프로미스 객체는 `rejected` 상태가 된다.

```js
new Promise((resolve, reject) => {
  // ...비동기 처리 코드
  resolve(); // 성공 시 [fulfilled]
  reject(); //  실패 시 [rejected]
});
```

여기까지, 비동기 처리를 위한 프로미스 객체를 생성하는 방법이었다. 이제 이 프로미스를 리턴하는 함수를 실행하는 법을 알아보자.

콜백 체이닝과 마찬가지로, 프로미스는 `then`이라는 문법을 사용하여 `then` 체이닝이 가능하다. 프로미스 객체의 resolve (비동기 함수 처리 성공)가 호출되면 `then` 내부의 함수가 실행되는 패턴이다. `then` 내부 함수의 리턴 값은 다음 `then`의 내부 함수의 인자로 주어진다. 만약 `reject`(비동기 함수 처리 실패)가 호출되면, `then` 체인의 끝에 `catch`로 연결되어 있는 함수를 실행한다. 이를 이용해 에러 핸들링을 할 수 있다. 

```js
function promise() {
  return new Promise((resolve, reject) => {
    resolve(1);
  })
};

promise()
	.then((resolveParams) => {
  	console.log(resolveParams); // 1
  	return resolveParams + 1;
	})
	.then((thenRes) => {
  	console.log(thenRes); // 2
	})
	.catch((rejectParams) => {
  	console.log(rejectParams);
	});
```

콜백 함수의 예시와 마찬가지로 `setTimeout`의 지연 시간을 랜덤으로 지정한 함수를 만들어보자. 이번에는 랜덤 지연 시간이 5초 미만일 경우 성공 메시지를 출력하고 5초 이상일 경우 에러 메시지를 출력하도록 비동기 함수를 처리해보자.

```js
function handleAsync() {
  return new Promise((resolve, reject) => {
    const delayTime = Math.floor(Math.random() * 10000);
    setTimeout(() => {
      if(delayTime < 5000) {
        resolve(delayTime);
      } else {
        reject(delayTime);
      }
    }, delayTime)
  });
};

handleAsync()
	.then((time) => { console.log(`[성공] ${time}ms이 걸렸습니다.`)})
	.catch((time) => { console.log(`[실패] ${time}ms이 걸렸습니다.`)});

// 결과 :
// 1 ) [실패] 6539ms이 걸렸습니다.
// 2 ) [성공] 4813ms이 걸렸습니다.
// 3 ) [실패] 7257ms이 걸렸습니다.
```



## async/await



# 요약



# Reference

- [https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)