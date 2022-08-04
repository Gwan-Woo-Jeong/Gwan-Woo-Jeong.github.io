---
layout: single
title: '프로젝트 회고 : MAPLY'
categories: project
tag: [project, backend]
toc: true
toc_sticky: true
excerpt: '나만의 유튜브 플레이리스트를 만들 수 있는 간단한 웹사이트다. 사실 유튜브에서도 이미 제공하고 있는 기능이지만...'
header:
  teaser: images/2021-08-19-MAPLY_retro/MAPLY-logo.png
---

<img src="../../images/2021-08-19-MAPLY_retro/MAPLY-logo.png" alt="MAPLY-logo" style="zoom:50%;" />

## Project : MAPLY

### What?

나만의 유튜브 플레이리스트를 만들 수 있는 간단한 웹사이트다. 사실 유튜브에서도 이미 제공하고 있는 기능이지만, 백지상태에서 기능을 하나하나 구현하며 배울 점이 많을 것 같았다.

### Why?

이전 프로젝트에서는 프론트엔드로만 참여했었는데, 이번 프로젝트는 백엔드 포지션을 담당했다. 백엔드에 대한 지식이 부족한 상태에서, 프론트엔드로 프로젝트를 진행해보니까 아쉬운 점이 많았다. 그중 가장 큰 부분은 백엔드와의 소통이 어려웠던 것이다. 아직 경험이 부족하여 협업이 익숙하지 않은 부분도 있지만, 내가 그쪽 분야를 잘 모르기 때문에 생기는 문제가 더 큰 것 같았다.

데이터베이스 스키마와 API를 설계할 때, 사실 이 부분에 대해 내가 잘 알지 못해서 거의 모든 부분을 백엔드 팀원에게 믿고 맡겼었다. 그러다보니, 내가 프론트에서 서버로부터 받은 데이터를 페이지에 띄울 때 데이터가 내가 쓰기 불편한 형태로 오는 경우도 있었고 심지어 내가 필요한 데이터가 없어서 다시 API를 고치는 경우도 있었다. 프로젝트가 끝나고 나서, 프론트엔드인 내가 백엔드와 적극적으로 소통하지 못한 잘못이라는 걸 크게 깨달았다.

지금까지 내 웹 개발 경험으로, 프론트엔드는 요리사와도 같다. 백엔드가 재료를 구해주면 그걸 가지고 요리하여 유저에게 맛있는 요리를 제공하는 요리사가 내 역할이다. 그런데, 요리사가 자신의 요리에 필요한 재료를 발주하지 않는 것은 말이 안 되는 일이다. 백엔드나 프론트엔드 구분 없이 설계 단계에서부터 적극적으로 소통하는 것이 얼마나 중요한 일인지 깨달았고, 내가 백엔드와 잘 협업하기 위해서 가장 좋은 방법은 내가 그 역할을 경험해보는 것으로 생각했다.

### How?

#### Schema

![](https://images.velog.io/images/gwanuuoo/post/84821f86-a9a5-4566-9808-fc6f2071b3f7/Screen_Shot_2021-07-24_at_11.08.37_PM.png)

스키마는 다음과 같다. 유저의 id가 플레이리스트의 참조 키(Foreign Key)로 또 플레이리스트의 id가 비디오의 참조 키로 데이터베이스가 구성되어 있다. 서비스 로직이 로그인을 하면 플레이리스트를 받아오고 또 플레이리스트를 클릭하면 그것에 속한 모든 비디오를 받아오는 식이기 때문에 스키마가 이렇게 짜게 되었다. Sequelize의 cascade 기능을 이용하여 FK가 삭제되면 이를 참조하는 모든 레코드를 삭제시킬 수 있었다. 플레이리스트를 삭제하면 그것에 속한 모든 영상이 삭제되었다. 회원 탈퇴 기능은 아직 구현하지 않았지만 만들게 된다면 회원 탈퇴 시 모든 정보를 삭제시키는 것도 가능할 것 같다.

#### API

API를 설계할 때, 프론트엔드 팀원과 함께 서비스 흐름을 처음부터 끝까지 생각해보면서 어느 시점에 어떤 요청과 응답이 필요한지 고민해보았다. 처음에는 로그인 시, 단순히 로그인 유저가 가지고 있는 모든 플레이리스트와 동영상을 주는 방향으로 생각해보았다.

```
// 로그인 요청 성공 시,
Response :
[ playlist 1 : { id : 1, playlist_title : "플레이리스트 1", videos : [ { id : 1, title : "영상 1", ...}, ...],
  playlist 2 : { videos : [ ... ], ... },
  playlist 3 : { videos : [ ... ], ... },
  ...
]

```

사실, 프론트엔드를 했었던 이전 프로젝트에서 이런 방식으로 데이터를 받아 프론트를 구축했었던 경험이 있다. 그 때 프로젝트가 끝나고 이 방식은 정말 아니라고 생각하며 고개를 절레절레 저었던 기억이 있다. 프론트엔드 엔지니어 입장에서, 필요한 데이터를 일일이 뽑아내어 써야하기 때문에 불편하고 앱의 성능을 고려했을 때 매우 좋지 않았다. 물론, 이런 작은 프로젝트에서는 성능 차이가 거의 느껴지지 않았지만 실제 상용화된 서비스라면 느려터지지 않았을까.. 어쨌든 프론트 서버와 백엔드 서버, 두 대의 컴퓨터가 있으면 한 대의 컴퓨터를 혹사시키는 것보다 두 대의 성능을 비슷하게 끌어올리는 것이 합리적일 것이다. 클라이언트는 페이지를 그리는 것에만, 서버는 데이터를 다루는 것에만 집중할 수 있게끔...

그래서 서버는 최대한 클라이언트가 필요한 데이터만 중요하다고 생각했다. 그러기 위해, API를 조금 더 세분화시켰다. 처음에는 플레이리스트만 보여주면 되기 때문에, 플레이리스트 제목과 영상의 개수 그리고 썸네일을 보여주기 위한 첫 번째 영상의 썸네일 이렇게 3가지 데이터만 보내주기로 했다. 사실, 이 부분이 API 설계할 때 가장 어려웠다. 데이터베이스에서 데이터를 가져와 내가 원하는 형태로 가공시키는 작업이 생각보다 쉽지 않았다.

```js
// 플레이리스트에서 필요한 데이터만 꺼내어 가공하는 작업..
const myPlaylists = await playlist.findAll({ where: { user_id } });

let refinedData = myPlaylists.map(async (each) => {
  const { id, playlist_name } = each.dataValues;
  const firstVideo = await video.findOne({ where: { playlist_id: id } });
  const count = await video.count({ where: { playlist_id: id } });
  return { id, playlist_name, count, playlist_thumbnail: firstVideo !== null ? firstVideo.thumbnail : 'empty' };
});

refinedData = await Promise.all(refinedData);
res.send(refinedData);
```

이 부분이 가장 어려웠는데, 우선 배열 안에 객체를 다루기가 여간 까다로운 일이 아니였다. 배열과 객체의 형태가 보이지 않아, 콘솔을 수십 번은 찍은 것 같다. 또, 데이터가 resolved 되지 않고 그대로 Promise 객체 형태로 나와 이를 해결하는데 애를 먹었다. 위 방법이 최선인지는 모르겠지만 async & await과 Promise.all을 사용하여 문제를 해결할 수 있었다.

이런 작업을 하면서, 프론트엔드에서는 느껴보지 못한 백엔드만의 재미를 느낄 수 있었다. 날 것의 데이터를 가져와 내가 원하는 형태로 만들었을 때 오는 희열이 있었던 것 같다. 이전에는 데이터를 다룬다고 하면 마냥 어렵고 따분한 일이라고 생각했는데, 직접 해보니까 생각보다 재미있고 백엔드 포지션에 대한 내 인식이 많이 바뀌게 된 것 같다.

[API 문서 링크](https://app.gitbook.com/@maply-1/s/maply/)

### Difficulties

#### Cascade

Sequelize에서 FK 삭제 시, 이를 참조하는 모든 레코드들을 삭제하는 기능이다. 처음에 이 기능이 잘 구현되지 않았다. 이유는 FK 설정이 제대로 안되어서인데, models를 설정할 때 각 테이블 간 관계를 제대로 설정해주지 않았다.

```js
// video.js /models
class video extends Model {
    static associate(models) {
      // 여기에 테이블 간 관계를 설정한다.
      // playlist - video (1 : N)
      models.video.belongsTo(models.playlist, {
        foreignKey: "playlist_id",
        onDelete: "CASCADE", // * Cascade 설정
      });
    }
  ...

// playlist.js /models
class playlist extends Model {
    static associate(models) {
      // user - playlist (1 : N)
      models.playlist.belongsTo(models.user, {
        foreignKey: "user_id",
      });
      // playlist - video (1 : N)
      models.playlist.hasMany(models.video, {
        foreignKey: "playlist_id",
      });
    }
  }
 ...
```

이렇게 관계를 설정해준 후, 서버에서 데이터베이스를 migration한다. 그럼, 데이터베이스가 스키마에서 계획한 관계대로 만들어진다. 그 후, 아래와 같이 migration을 한 파일에 다시 Cascade 설정을 해주어야 비로소 FK를 삭제했을 때 나머지 레코드들이 모두 삭제되는 모습을 확인할 수 있었다.

```js
// -create-video.js /migrations
...
await queryInterface.createTable('videos', {
  ...,
  playlist_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'playlists',
          key: 'id'
        }
      },
  ...
}
```

#### 카카오 로그인

회원가입을 따로 구현하지 않고 소셜 로그인으로만 서비스를 이용할 수 있게 만들었다. 소셜 로그인은 프로젝트에서 처음 구현해보았는데, 카카오 로그인 과정은 간략히 표현하면 다음과 같다.

<img src="https://developers.kakao.com/docs/latest/ko/assets/style/images/kakaologin/kakaologin_process.png" style="zoom:60%;" />

부트캠프에서 Oauth와 토큰에 대해 배운 적이 있어서, 로직을 이해하는데는 크게 어렵지 않았다. 하지만, 인증 코드와 토큰을 요청하는 코드를 작성하면서 에러와 계속 맞닥뜨렸는데 코드의 문제는 아니였고 카카오 개발자 사이트에서 설정 문제였다.

인증 코드를 받기 위해서 내 앱에서 카카오 로그인 페이지로 redirect를 해야하는데 redirect-uri 설정을 제대로 하지않아 에러가 발생했다. 설정을 한 후에도 비슷한 문제가 있었는데, 사용자의 정보를 받아오기 위해서 개발자 사이트에서 동의 항목에 대한 설정을 해주어야했다.

#### 토큰 확인 후 요청 수행

카카오 서버로부터 토큰을 받아오는데 성공한 후, 토큰이 유효한 지 확인하고 api 요청에 응답을 해주어야하는데 모든 api 요청에 카카오 토큰을 확인하는 코드를 넣으려니 중복되는 코드의 양이 너무 많았다. 구글링을 하면서 고민해보던 중, express에서 middleware를 사용하면 모든 api 호출에 대해 호출 이전에 특정 작업을 수행할 수 있다는 정보를 찾았다.

```js
// checkToken.js /middlewares
async checkToken(req, res, next) {
        const path = req.originalUrl.split("/")[1];
        if (path === "user") {
            next();
        } else {
            try {
                const authorization = req.headers['authorization'];
                const accessToken = authorization.split(' ')[1];
                await axios.get(
                    "https://kapi.kakao.com/v1/user/access_token_info",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        },
                        withCredentials: true
                    })
                next();
            	...

```

정리하면, 요청의 headers에서 토큰을 가져와서 카카오 서버에 토큰 유효성을 확인한 후 토큰이 유효하다는 응답을 받으면 본 요청을 수행하는 방식인데 토큰 유효성을 확인하는 함수를 middleware로 만들어 모든 api에 넣어줄 필요가 없게 만들었다. 여기서, 로그인과 관련된 users라는 uri path를 파라미터로 갖는 요청들은 토큰이 필요없다고 판단해서 이 경로로 오는 요청들은 제외시켰다.

#### 토큰 만료 시 로그아웃 처리

사이트에 로그인 후 오랫동안 사용하지 않으면 자동적으로 로그아웃이 되는 것이 일반적이라고 생각했다. 그래서, 토큰이 만료될 시에 로그아웃이 되는 기능을 구현하려고 했는데 어떻게 구현해야되는지 갈피를 잡지 못했다. 서버에서 클라이언트를 강제로 로그아웃 시키는 방법이 생각나지 않았다. 한 동안 서버 쪽에서 로그아웃 시키는 방법을 고민하다가 도저히 방법이 생각나지 않아 로그아웃은 클라이언트 쪽에서 코드를 작성해야된다고 판단했다.

그래서 생각한 방법이 토큰 유효성 검사를 하는 middleware 함수를 통과하지 못하면, 특정 응답을 주어 클라이언트에서 강제로 가지고 있던 토큰을 비워주는 방법을 생각했다.

```js
// checkToken.js /middlewares
 async checkToken(req, res, next) {
	      ...
          try { // 토큰 유효성 검사
              ...
          } catch (err) { // 토큰이 유효하지 않음
              res.send({ error_code: 401, message: "Invalid access token" });
          }
      }
  }
```

클라이언트는 axios라는 HTTP 비동기 통신 라이브러리를 사용했는데, 여기서도 middleware와 비슷하게 본 요청이나 응답 이전에 특정 함수를 실행할 수 있게하는 interceptors라는 기능이 있었다. 그래서, 서버로부터 응답을 받기 전에 만약 위와 같은 응답을 받았을 때, 강제로 로그아웃 처리를 하게끔 만들었다.

```js
// 클라이언트
// App.js
axios.interceptors.response.use(function (res) {
  if (res.data.error_code === 401) {
    localStorage.clear(); // 로컬 스토리지의 토큰을 강제로 삭제
    alert('토큰이 만료되었습니다. 다시 로그인 해주세요!');
    window.location.reload();
  }
  return res;
});
```

### Final App View

#### 인기 동영상

홈 화면에서 현재 가장 인기 있는 음악 관련 동영상 9개를 볼 수 있다.
<img src="https://github.com/Gwan-Woo-Jeong/media-sources/blob/master/MAPLY/gifs/TrendingVideos.gif?raw=true"/>

#### 비디오 검색 및 재생

동영상을 검색하고 동영상 클릭시 재생이 가능하다.
<img src="https://github.com/Gwan-Woo-Jeong/media-sources/blob/master/MAPLY/gifs/searchVideo.gif?raw=true"/>

#### 플레이리스트 및 동영상 추가

플레이리스트를 추가하거나 기존 플레이리스트에 영상을 추가할 수 있다.
<img src="https://github.com/Gwan-Woo-Jeong/media-sources/blob/master/MAPLY/gifs/addPlaylist.gif?raw=true"/>

#### 플레이리스트 및 동영상 삭제

삭제 버튼 클릭시 플레이리스트에 저장된 영상과 플레이리스트 전체를 삭제할 수 있다.
<img src="https://github.com/Gwan-Woo-Jeong/media-sources/blob/master/MAPLY/gifs/deleteVideo.gif?raw=true"/>

#### 카카오 소셜 로그인

카카오 계정으로 서비스를 이용할 수 있다.
<img src="https://github.com/Gwan-Woo-Jeong/media-sources/blob/master/MAPLY/gifs/kakaoLogin.gif?raw=true"/>

### Conclusion

처음 백엔드 포지션을 해보면서 어려운 점도 많았지만, 기획한 대로 사이트를 구현을 무사히 마칠 수 있어서 기분이 좋다. 백엔드를 해보면서 가장 크게 느낀 건 의사소통의 중요성이다. 내가 서버를 만들어보니, 프론트엔드의 요구사항이 명확하지가 않으니까 대충 이렇게 주면 되겠거니.. 하는 식으로 API를 만들고 있는 나를 발견했다. 그러다가, 그 전의 실수가 떠올랐다. 그냥 내 생각대로 만들면 프론트 쪽에서 문제가 발생할게 분명했다. 그래서 적극적으로 프론트엔드 팀원분과 의사소통을 하기 시작했다. 프론트엔드 팀원이 생각하는 그림과 어떤 데이터를 어떻게 띄울지, 그러기 위해선 어떤 데이터를 DB에서 가져와서 어떤 형태로 만들어 주어야 할지 등 모든 것을 명확하게 하기 위해 많은 이야기를 나눴다.

그냥 내 생각대로 만들었으면 처음에는 편했겠지만, 이전 프로젝트에서 했던 실수처럼 코드를 여러 번 수정하는 번거로움이 생겼을 것이다. 그리고, 이런 사소한 마찰들은 점점 다른 포지션 간의 소통을 어렵게 만들고 결과적으로 팀 워크에 좋지 않은 영향을 미쳤던 것 같다. 내가 프론트엔드였을 때, 백엔드에게 무언가를 요구하면 민폐를 끼치는 것 같고 눈치가 보이기도 하였는데 내가 말하지 않으면 결국 나중에 문제가 생긴다는 것을 이번 프로젝트를 하면서 깨달았다. 앞으로는 커뮤니케이션을 잘 하는 개발자가 되기 위해 노력할 것이다! 이번 프로젝트는 백엔드를 담당했지만, 앞으로 내가 프론트엔드 엔지니어로서 성장하는 데 큰 도움이 되는 경험이었다.
