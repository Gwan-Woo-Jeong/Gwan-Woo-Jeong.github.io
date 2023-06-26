---
layout: single
title: "React Hook Form & Refactoring"
categories: React
tag: [React Hook Form, Nomad Coders, Carrot Market]
toc: true
toc_sticky: true
excerpt: '
# React Hook Form

사용하기 쉬운 유효성 검사를 통해 성능이 뛰어나고 유연하며 확장 가능한 React Form 라이브러리

## 장점

- 코드량 대폭 감소
- 쉬운 유효성 검사
- 쉬운 에러 핸들링 (설정, 초기화, 표시)
- 쉬운 이벤트 핸들링
- input에 대한 완전한 제어'

header:
  teaser: https://miro.medium.com/v2/resize:fit:1400/1*VcL41lBE0PlrzecOngS1Iw.png
---

![react-hook-form-thumb](https://miro.medium.com/v2/resize:fit:1400/1*VcL41lBE0PlrzecOngS1Iw.png)

# React Hook Form

사용하기 쉬운 유효성 검사를 통해 성능이 뛰어나고 유연하며 확장 가능한 React Form 라이브러리

## 장점

- 코드량 대폭 감소
- 쉬운 유효성 검사
- 쉬운 에러 핸들링 (설정, 초기화, 표시)
- 쉬운 이벤트 핸들링
- input에 대한 완전한 제어

### 설치

```bash
npm i react-hook-form
```

# Making Forms Alone

React Hook Form 없이 Form을 만들기 위해선 다음과 같은 작업들을 거쳐야한다.

1. input의 입력 상태를 받을 여러 State 선언
2. 각 input이 입력될 때마다, 입력 값을 받아 유효성 검사 등의 작업을 할 핸들러 함수 선언
3. 핸들러 함수를 input 태그와 연결

> HTML 태그 자체적으로 `required` 같은 프로퍼티로 유효성 검사가 가능하나, 유저가 HTML을 조작하면 이는 무력화 된다.

# The Register Function

```tsx
register: (name: string, RegisterOptions?) => ({ onChange, onBlur, name, ref });
```

- input을 등록하거나 요소를 선택
- 유효성 검사 규칙 적용
- 유효성 검사는 HTML 표준 기반, 사용자 지정 유효성 검사도 가능

```tsx
import { useForm } from "react-hook-form";
...
const { register, handleSubmit } = useForm();
...
< input {...register("firstName", { required: true })} placeholder="First name" />
```

# Validation

## 유효성 검사

유효성 검사는 `register` 객체에 포함된다. 다음과 같은 규칙이 기본 옵션으로 제공된다.

- required ( 필수값 )
- min ( 최소값 )
- max ( 최대값 )
- minLength ( 최소 길이 )
- maxLength ( 최대 길이 )
- pattern ( 정규 표현식 )
- validate ( 콜백 함수 )

```tsx
required: string | { value: boolean, message: string}

// 예시
< input {...register("test", {required: 'error message' })}/>

```

## handleSubmit

유효성 검사를 통과하면 `form` 데이터를 수신

```tsx
<form onSubmit={handleSubmit(onSubmit, onError)} />
```

- onSubmit (SubmitHandler) (통과 콜백)
  `(data: Object, e?: Event) => void`
- onError (SubmitErrorHandler) (실패 콜백)
  `(errors: Object, e?: Event) => void`

# Errors

## validate

유효성을 검사할 인수로 콜백 함수를 전달하거나 콜백 함수의 개체를 전달하여 모든 유효성 검사 가능

```tsx
<input {...register("test", { validate: (value) => value === "1" })} />
```

## mode

유효성 검사를 실행할 시점을 설정

- `onChage` : 값이 입력될 때마다
- `onBlur` : input의 focus를 잃을 때
- `onSubmit` : 유저가 form을 제출했을 때
- `onTouched` : 첫 번째 blur 이벤트가 실행될 때
- `all` : blur + change

# Extras

## setError()

하나 이상의 오류를 수동으로 설정.

```tsx
setError("registerInput", {
  type: "custom",
  message: "custom message",
});
```

## reset()

전체 form state 또는 form state의 일부를 리셋

(form에서 submit후, 전체 input 초기화할 때 사용 가능)

## resetField

개별 field state를 재설정

(form에서 submit후, 특정 input만 초기화할 때 사용 가능)

# REFACTORING

## Enter Form

### Type Only Imports & Exports

- Typescript 3.8에서 추가된 기능, 타입만 불러오고 출력 가능
- `import type`은 타입 표기와 선언에 사용될 선언만 불러옴
- 런타임에서는 완전히 지워짐
- `export type`은 타입 문맥에 사용할 export만 제공,TS의 출력물에서 제거됨

```tsx
import type { User } from "./exmaple.ts";
export type { User };
```

## Form Submission

### Uploading JSON data

- POST 프로토콜로 JSON 인코딩된 데이터를 보내기 위해 fetch()를 사용
- body의 데이터 유형은 반드시 `Content-Type` 헤더와 일치해야함

```tsx
await fetch(url, {
  method: "POST", // *GET, POST, PUT, DELETE 등

  body: JSON.stringify(data), // string or {object}

  headers: { "Content-Type": "application/json" },
});
```
