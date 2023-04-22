---
layout: single
title: "타입스크립트란?"
categories: JavaScript
tag: [JavaScript, TypeScript]
toc: true
toc_sticky: true
excerpt: '
TS는 JS에 추가적으로 데이터의 종류(Type)를 명시해준 언어다. TS 코드는 JS로 변환 (컴파일)되어 실행된다. 그래서, 타입스크립트(TS)도 결국 자바스크립트(JS)다.
'
header:
  teaser: https://img.devrant.com/devrant/rant/r_3015646_HZCi4.jpg

---

<a href="https://img.devrant.com/devrant/rant/r_3015646_HZCi4.jpg">
  <img style="width: 75%;" src="https://img.devrant.com/devrant/rant/r_3015646_HZCi4.jpg" title="typescript-meme.jpg">
</a>

# Javascript + Type = TypeScript

타입스크립트(TS)는 자바스크립트(JS)에 추가적으로 데이터의 종류(Type)를 명시해준 언어다. 타입스크립트 코드는 자바스크립트로 변환(컴파일)되어 실행된다. 그래서, 타입스크립트도 결국 자바스크립트다.

<figure>
<a href="https://d2ms8rpfqc4h24.cloudfront.net/uploads/2021/12/Understand-Typescript.jpg">
  <img src="https://d2ms8rpfqc4h24.cloudfront.net/uploads/2021/12/Understand-Typescript.jpg" title="Understand-Typescript.jpg">
<figcaption>
TS는 JS의 확장팩(슈퍼셋 - superset)이다. 브라우저는 TS를 실행시킬 수 없으므로, JS로 컴파일 후에 실행된다. 
</figcaption>
</a>
</figure>

TS는 JS의 확장팩(슈퍼셋 - superset)이다. 브라우저는 TS를 실행시킬 수 없으므로, JS로 컴파일 후에 실행된다.

그렇다면, 어차피 JS로 바꿀건데 왜 TS를 써야하는걸까? 그러니까, 근본적으로 왜 데이터 타입을 명시해주어야 할까?

그 이유는 JS가 타입에 있어서 너무 유연하기 때문이다. JS는 연산 중에 변수들의 타입이 맞지 않아도 스스로 알아서 변환한다.

예를 들어, JS에서 숫자 `3`과 문자 `“2”` 를 더하면 문자 `“32”` 이다. 근데 또 이 둘을 빼면 숫자 `1` 이다. 이렇게 타입의 예측이 힘들기 때문에, JS는 사용 중에 에러가 자주 발생한다. 하지만 코드가 실행되기 전까지, JS는 잘못된 데이터 타입으로 인한 에러를 감지할 수 없다.

그래서, 실행 전에 타입 에러를 감지할 수 있는 타입스크립트가 등장한 것이다. 그렇다면, 왜 TS는 코드 실행 전 에러 감지가 되고 JS는 되지 않는 것일까?

# 컴파일 / 정적 언어

그 이유는 바로 이거다. **TS는** **정적 언어**다. 이 말은 즉, 변수 타입을 컴파일 과정(TS → JS)에서 결정한다. 이 과정에서 타입 에러를 잡아내는 것이다.

**TS를 컴파일 언어**라고 하는데, 컴파일 언어는 소스 코드를 한꺼번에 다른 목적 코드(TS → JS)로 번역한 후, 한 번에 실행한다. 그래서, 규모가 큰 소스의 경우 컴파일 자체는 오래 걸리지만, 한 번 해두면 실행 속도가 매우 빠르다.

그 반대로, **JS는 동적 언어**다. 즉, 변수 타입을 코드를 실행 시(런타임)에 결정한다. 코드를 실행하기 전까지 타입을 모르기 때문에, 타입 에러를 찾을 수 없다.

**JS를 인터프리터 언어**라고 하는데, 인터프리터 언어는 소스 코드를 한 줄씩 읽어가며 명령을 바로 처리한다. 때문에, 소스가 크면 실행이 느리다. 하지만, 고급 언어를 즉시 실행시켜 수정이 간편하다는 장점도 있다.

# 써야하는 이유

## 빠른 디버깅

코드 작성 단계에서, 변수나 함수의 매개변수 또는 반환값 등의 데이터의 타입을 명시해주기 때문에 이와 타입이 맞지 않는 경우 사전에 에러를 발생시킨다. TS는 코드 실행 후가 아닌 컴파일 단계에서 버그를 찾아주기 때문에, 즉각적으로 버그 수정이 가능하다.

## 객체 지향 프로그래밍 지원

클래스,인터페이스, 상속, 모듈과 같은 객체지향 프로그래밍을 지원하기 때문에, 크고 복잡한 프로젝트의 코드 기반을 쉽게 구성할 수 있다. Java, C# 등 클래스 기반 객체지향 언어에 익숙한 개발자의 JS 프로젝트에 대한 진입 장벽을 낮추는 효과도 있다.

## 강력한 자동 완성

객체의 필드나 함수의 매개 변수에 어떤 값이 들어가는지 찾을 필요 없이, 자동으로 들어가야할 데이터 타입을 알려준다. 또한 서버나 외부 API를 통해 받아온 데이터들에 타입을 지정해두면, 사용시에 쉽게 데이터 타입을 참조할 수 있다. 심지어, 일부 문법에 대해 오타 교정도 해준다.

## 폭넓은 생태계

대부분의 유명한 라이브러리들은 TS를 지원한다. 또한, vscode 등 각종 에디터에 내장된 관련 기능이 있고 다양한 관련 플러그인들이 있다.

하지만, 무조건 TS를 써서 좋은 것은 아니다. JS에 추가적으로 새로운 언어에 대한 러닝커브, 타입 명시로 인해 상대적으로 낮아지는 가독성, 절대적인 코드량의 증가, 컴파일로 인한 속도 저하 등의 단점도 존재한다. 때문에, 프로젝트의 성격에 따라 도입 여부를 결정하는 것이 좋다.

프로젝트의 규모가 클수록 그리고 유지보수가 중요할 수록 TS 더 유용하게 쓰이기 때문에, 도입하는 것이 좋다. 반대로, 규모가 작거나 빠르게 끝내야하는 프로젝트의 경우 TS가 오히려 번거로운 장애물로 느껴질 수도 있다.

# 기본 문법

## 기본 타입 선언

TS는 다양한 기본 타입을 제공한다.
: Boolean, Number, String, Object, Array, Tuple, Enum, Any, Void, Null, Undefined, Never

```tsx
// String
let str: string = "hello";

// Number
let num: number = 100;

// Array
let arr: Array<number> = [10, 20, 30];
let arr2: number[] = [10, 20, 30];
let arr3: Array<string> = ["lion", "tiger"];
let arr4: [string, number] = ["seoul", 30];

// Object
let obj: object = { name: "gwanwoo", age: 28 };
let person: { name: string; age: number };

// Boolean
let isAvaliable: boolean = true;

// tuple : 배열의 타입 순서와 배열 길이를 지정할 수 있는 타입
let tuple: [string, number] = ["aa", 100];

/* 
Enum: Number 또는 String 값 집합에 고정된 이름을 부여할 수 있는 타입 
- 값의 종류가 일정한 범위로 정해져 있는 경우에 유용함
- 기본적으로 0부터 시작, 값은 1씩 증가함
*/

enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

// Any: 모든 데이터 타입을 허용
let str: any = "hi";
let num: any = 10;
let arr: any = ["a", 2, true];

// Void: 변수에는 undefined와 null만 할당하고 함수에는 리턴 값을 설정할 수 없는 타입
let unuseful: void = undefined;
function notuse(): void {
  console.log("sth");
}

// Never: 특정 값이 절대 발생할 수 없을 때 사용 (절대 함수의 끝까지 실행되지 않는다는 의미)
function neverEnd(): never {
  while (true) {}
}
```

## 함수 선언

```tsx
// 매개 변수와 리턴 값에 대한 타입 선언
function sum(a: number, b: number): number {
  return a + b;
}

// optional한 매개 변수일 경우 `?` 를 사용
function log(time: string, result?: string, option?: string) {
  console.log(time, result, option);
}
```

## 인터페이스(interface)

`interface`는 자주 사용하는 타입들을 `object` 형태의 묶음으로 정의해 새로운 타입을 만들어 사용하는 기능이다.

```tsx
// 인터페이스 선언
interface User {
  age: number;
  name: string;
}

// 변수 활용
function getUser(user: User) {
  console.log(user);
}

getUser({ age: 10, name: 'hayoon'});

// 함수 구조 활용
interface Sum {
  (a: number, b: number): number;
}

let sumFunc: Sum:
sumFunc = function(a: number, b: number): number {
  return a + b;
}

// 배열 활용
interface StringArray {
  [index: number]: string;
}

let arr: StringArray = ['a', 'b', c];

// 객체 활용
interface StringRegexObject {
  [key: string]: RegExp;
}

const obj: StringRegexObject {
  cssFile: /\.css$/,
  jsFile: /\.js$/
}

// 인터페이스 확장 : extends 키워드를 사용
interface Person {
  name: string;
  age: number;
}

interface Developer extends Person {
  skill: string;
}

const juniorDeveloper = {
  name: 'gwanwoo',
  age: 28,
  skill: 'coding'
}
```

## 타입 별칭 (type alias)

`type` 키워드로 선언한 타입은 확장 불가능하다. (`extends` 키워드는 사용할 수 없다.)

```tsx
// 타입 별칭 선언 및 활용
type MyString = string;
const str: MyString = "I love you";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

function getTodo(todo: Todo) {
  console.log(todo);
}
```

## 연산자(Operator)

<h3>Union Type</h3>

`|`로 두 가지 이상의 타입을 선언하고자 할 때 사용한다.

```tsx
// 함수 호출시 value 인자의 타입에는 string 또는 number
function logMessage(value: string | number) {
  if (typeof value === "string") {
    value.toString();
  } else if (typeof value === "number") {
    value.toLocaleString();
  } else {
    throw new TypeError("value must be string or number");
  }
}
```

<h3>Intersection Type</h3>

함수 호출의 경우, 함수 인자에 `&`로 명시한 타입을 모두 제공해야 한다.

```tsx
interface Person {
  name: string;
  age: number;
}

interface Developer {
  name: string;
  skill: number;
}

type Capt = Person & Developer;

/* 
type Capt =
{
  name: string;
  age: number;
  skill: string;
}
*/
```

<h3>Enum</h3>

Number 또는 String 값 집합에 고정된 이름을 부여할 수 있는 타입

- 값의 종류가 일정한 범위로 정해져 있는 경우에 유용함
- 기본적으로 0부터 시작, 값은 1씩 증가함

```tsx
/* 
숫자형 enum
: 자동으로 0에서 1씩 증가하는 값을 부여
*/

enum Shoes {
  Nike, // 0
  Adidas, // 1
  NewBalance, // 2
}

const myShoes = Shoes.Nike; // 0

// 문자형 enum

enum Player {
  Son = "흥민",
  Whang = "희찬",
}

const player = Player.Son; // 흥민
```

## 클래스 (Class)

```tsx
class Tiger {
  // constructor 위에 선언
  private name: string;
  public age: number;
  readonly log: string;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

## 제네릭(generics)

- 인자를 넘겨 호출하는 시점에 타입을 결정할 수 있다. (타입을 함수의 매개 변수처럼 사용)
- 동일한 기능을 하는 함수를 일일이 만들 필요가 없으며, 타입 추론(TS의 코드 해석)에 있어서 강점을 가진다.

```tsx
// 제너릭 선언 : <T>와 같이 타입을 선언한다. 알파벳은 통상 `T`로 정해져 있다.
function logText<T>(text: T): T {
  consol.log(text);
  return text;
}

logText<string>("Hello My World!");

// interface에 제네릭 선언
interface Dropdown<T> {
  value: T;
  selected: boolean;
}

const obj: Dropdown<string> = { value: "hamburger", selected: true };

// 제너릭 타입 제한

// 1) 배열 힌트
function logTextLength<T>(text: T[]): T[] {
  console.log(text.length);
  text.forEach((text) => {
    console.log(text);
  });
  return text;
}

logTextLength<string>(["hi", "hello"]);

// 2) 정의된 타입 이용(extends)
interface LengthType {
  length: number;
}

function logTextLen<T extends LengthType>(text: T): T {
  console.log(text.length);
  return text;
}

logTextLen("abc");
logTextLen(100); // 숫자에 length property가 없으므로 에러
logTextLen({ length: 100 });

// 3) keyof :interface에 정의된 key 값만 허용
interface ShoppingItem {
  name: string;
  price: number;
  stock: number;
}

function getShoppingItemOption<T extends keyof ShoppingItem>(itemOption: T): T {
  return itemOption;
}

// 'name', 'price', 'stock'만 인자로 가능
getShoppingItemOption("price");
```

## 타입 단언(type assertion)

`as` 키워드를 사용해 타입을 정함으로써 TS에게 타입을 알려줄 수 있다. (주로, DOM API를 조작할 때 사용)

```tsx
// div가 있는지 장담할 수 없음, HTMLDivElement | null
// 따라써 typescript에게 타입 단언해 타입을 알려 줄 수 있다.
const div = document.querySelector("div") as HTMLDivElement;
div.innerText = "test";
```

## 타입 가드(type guard)

`Union Type` 은 공통된 속성만 접근이 가능하여, 로직 상 공통되지 않은 속성에 접근하고자 할 때 불편함이 따를 수 있다. 타입 단언으로 하는 방법이 있지만, 코드가 지저분해지기 때문에 타입 가드 방법을 사용한다.

```tsx
function isDeveloper(target: Developer | Humanoid): target is Developer {
  return (target as Developer).skill !== undefined;
}

if (isDeveloper(tom)) {
  console.log(tom.name);
  console.log(tom.skill);
} else {
  console.log(tom.name);
  console.log(tom.age);
}
```

## 타입 호환 (Type Compatibility)

TS에서는 더 큰 타입 구조를 갖는 변수에 작은 타입 구조를 갖는 변수를 할당할 수 있다.

```tsx
let add = function (a: number) {
  // ...
};
let sum = function (a: number, b: number) {
  // ...
};

add = sum; // 에러
sum = add; // 에러 X (sum의 구조가 더 크다고 볼 수 있기 때문)
```

# 정리

| 언어           | JavaScript                  | TypeScript                  |
| -------------- | --------------------------- | --------------------------- |
| 명령 실행      | 인터프리터 (한 줄씩 실행)   | 컴파일 (전체 변역 후 실행)  |
| 타입 결정 시점 | 동적 타입 (런타임 결정)     | 정적 타입 (컴파일 결정)     |
| 타입 에러      | 런타임 단계에서 발생        | 컴파일 단계에서 발생        |
| 타입 제한      | 타입에 관대 (제한 X)        | 타입에 엄격 (제한 O)        |
| 적합성         | 작고 간단한 프로젝트에 적합 | 크고 복잡한 프로젝트에 적합 |

# Reference

- [https://joshua1988.github.io/ts/](https://joshua1988.github.io/ts/)
- [https://velog.io/@9bin08/Typescript를-쓰는-이유](https://velog.io/@9bin08/Typescript%EB%A5%BC-%EC%93%B0%EB%8A%94-%EC%9D%B4%EC%9C%A0)
- [https://eunjinii.tistory.com/4](https://eunjinii.tistory.com/4)
