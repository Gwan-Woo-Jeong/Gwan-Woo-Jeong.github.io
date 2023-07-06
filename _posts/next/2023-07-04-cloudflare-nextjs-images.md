---
layout: single
title: "[캐럿마켓 클론] Cloud Flare & NextJS Images"
categories: Next
tag: [NextJS, Nomad Coders, Cloud Flare, carrot market]
toc: true
toc_sticky: true
excerpt: "
CLOUDFLARE IMAGES

Introduction

Cloudflare

- 클라우드를 위해 만들어진 전역 네트워크
- 인터넷에 연결하는 모든 것을 안전하고 비밀을 유지하면서 신속하고 안정적으로 연결
"
header:
  teaser: https://miro.medium.com/v2/resize:fit:1000/1*htbUdWgFQ3a94PMEvBr_hQ.png
---

![Next_thumb.jpg](https://miro.medium.com/v2/resize:fit:1000/1*htbUdWgFQ3a94PMEvBr_hQ.png)

# CLOUDFLARE IMAGES

## Introduction

### Cloudflare

- 클라우드를 위해 만들어진 전역 네트워크
- 인터넷에 연결하는 모든 것을 안전하고 비밀을 유지하면서 신속하고 안정적으로 연결

### Cloudflare Images

- 대규모로 이미지를 저장, 크기 조정, 최적화하는 하나의 API
- 이미지 인프라를 구축하고 유지하는 효율적인 솔루션을 제공
- 하나의 통합 제품으로 이미지를 대규모로 저장, 크기 조정, 최적화

#### 장점

1. 이미지 수 / 용량 대비 저렴한 비용

- 기본 5달러에 이미지 10만개 저장 가능
- 추가 1달러 당 10만개 이미지 추가 저장
- 이미지 크기 (대역폭)에 대한 추가 비용 없음

2. 이미지 크기 조정 및 최적화

- 보관 및 크기 조정의 추가 비용 없이 모든 이미지를 조정 가능

## Image Preview

### `URL.createObjectURL(object)`

- `object` : 객체 URL을 생성할 File, Blob, MediaSource 객체
- 주어진 객체를 가리키는 URL을 `DOMString`으로 반환
- 같은 객체를 사용하더라도, 매번 호출할 때마다 새로운 객체 URL을 생성
- 각각의 URL을 더는 쓰지 않을 땐 `URL.revokeObjectURL()`을 사용해 하나씩 해제해줘야 함

## Direct Creator Uploads

유저의 브라우저가 cloudflare에 다이렉트로 업로드 가능

- 유저의 브라우저가 일회성 업로드 URL로 사진을 다이렉트로 업로드 가능
- API 키 또는 토큰을 클라이언트에 노출하지 않고 업로드를 수락 가능
- 중간 스토리지 버킷 및 이와 관련된 스토리지 / 송신 비용 발생하지 않음

### 업로드 방식 비교

#### 브라우저 - 서버 - CF

```
파일 (브라우저) --> 서버 --> CloudFlare
```

각 통신 마다 파일의 송신하기 위해 큰 비용이 발생한다.

#### 브라우저 - CF

```
파일 (브라우저) --> CloudFlare
```

유저의 토큰이 노출되어 매우 위험하다.

#### Direct Create Uploads

```
브라우저 --> 서버 --> CF : 전송할 파일이 있음을 알림

CF --> 서버 --> 브라우저 : 빈 파일을 가리키는 URL을 전달

브라우저 --> CF : 전달받은 URL로 직접 파일을 업로드
```

토큰이 노출되지 않아 안전하면서도 파일 송신은 한 번만 일어나기 때문에 비용적인 면에서도 매우 유리하다.

# NEXTJS IMAGES

## Local Images

- `.jpg`, `.png`, 또는 `.webp` 이미지 파일을 `import`
- Next.js는 가져온 파일을 기반으로 `width` 와 `height`을 자동으로 결정
- 이 값들은 이미지가 로드되는 동안 [누적 레이아웃 시프트](https://nextjs.org/learn/seo/web-performance/cls) **Cumulative Layout Shift (CLS)**가 발생하는 것을 막음
- 동적 `await import()` 또는 `require()` 지원 X
- `import`는 빌드 시 분석할 수 있도록 static이어야 함

```tsx
import Image from "next/image";
import profilePic from "../public/me.png";

export default function Page() {
  return (
    <Image
      src={profilePic}
      alt="Picture of the author"
      // width={500} 자동 제공
      // height={500} 자동 제공
      // blurDataURL="data:..." 자동 제공
      // placeholder="blur" // 로딩 중 blur-up (optional)
    />
  );
}
```

<br/>

<div style="text-align: center;">
  <video width="320" height="240" controls>
    <source src="https://storage.googleapis.com/web-dev-assets/layout-instability-api/layout-instability2.webm" type="video/mp4">
  </video>
</div>

> 누적 레이아웃 시프트 : 리소스가 비동기식으로 로드되거나 DOM 요소가 기존 콘텐츠 위의 페이지에 동적으로 추가되어 사용자가 예상치 못한 레이아웃 이동을 경험하는 현상

## Remote Images

- src 속성의 URL 문자열로 상대 주소 또는 절대 주소 모두 가능
- Next.js는 빌드 프로세스 동안 원격 파일에 액세스할 수 없으므로 `width`, `height` 및 선택적 `blurDataURL` props을 수동으로 제공해야 함

```tsx
import Image from "next/image";

export default function Page() {
  return (
    <Image
      src="https://s3.amazonaws.com/my-bucket/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  );
}
```

## Domains

- Next.js 이미지 최적화 API를 사용하면서 원격 이미지에 접근 가능
- `loader`를 기본 설정으로 두고 이미지 src에 대한 절대 URL을 입력
- 악의적인 사용자로부터 애플리케이션을 보호하기 위해 이 방식으로 접근하려는 원격 도메인 목록을 `next.config.js` 파일에 정의해야 함

```tsx
//next.config.js
module.exports = {
  images: {
    domains: ["example.com", "example2.com"],
  },
};
```

## Layout

뷰포트의 크기가 변경될 때 이미지의 레이아웃 동작

### options

- `intrinsic (default)`: 이미지 크기까지 컨테이너 너비에 맞게 축소
- `fixed`: 너비와 높이를 이미지의 크기에 맞게 조절
- `responsive`: 컨테이너 너비에 맞게 크기 조정
- `fill`: 컨테이너를 채우기 위해 가로 세로 비율을 늘림 (`width`와 `height`를 값이 없을 시 필수 값)

> Next 13에서 fill prop으로 변경

## ObjectFit (NextJS)

- NextJS에서 Image 컴포넌트의 `layout="fill"`을 사용할 때 이미지가 상위 부모 요소에 맞춰서 어떻게 보여질 지를 정의
- 이미지의 스타일의 `object-fit` 속성으로 지정

## object-fit (CSS)

- `img`나 `video`태그의 콘텐츠 크기를 어떤 방식으로 조절해 요소에 맞출 것인지 지정
- `object-position` 속성을 사용해 대체 요소 콘텐츠가 콘텐츠 박스 내에 위치할 지점을 변경

## Conclusion

### blurDataURL

- src 이미지 로드 전 placeholder 이미지로 사용할 데이터 URL
- `placeholder="blur"`와 결합된 경우에만 적용
- base64로 인코딩된 이미지여야 함
- 확대되어 흐려지므로 아주 작은 이미지(10px 이하)를 권장
- 더 큰 이미지를 placeholder로 포함하면 애플리케이션 성능 저하

```tsx
//Remote 이미지에 블러 적용

<Image
  alt="Picture of the author"
  src={"https://s3.amazonaws.com/my-bucket/profile.png"}
  placeholder="blur"
  blurDataURL="https://i.ibb.co/ByhpsFY/blur.png"
/>
```
