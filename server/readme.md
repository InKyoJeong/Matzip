## Matzip Server

> Inflearn, Kyo

## 실행

1. 의존성 모듈 설치

프로젝트 위치에서 명령어를 실행합니다.

```
npm install
```

2. 환경 변수 설정

`[YOUR_USERNAME]` 부분 추가하여 `.env` 파일을 server 폴더 루트에 추가해주세요.

```
PORT=3030
DB_USERNAME=[YOUR_USERNAME]
DB_PASSWORD=postgres
DB_DATABASE=matzip-app
DB_HOST=localhost
JWT_SECRET=SecretMatzip
JWT_ACCRESS_TOKEN_EXPIRATION=30m
JWT_REFRESH_TOKEN_EXPIRATION=30d
```

3. 개발 환경 실행

```
npm run start:dev
```
