
## To use this application
1. Boiler-plate 다운 ( git clone )
2. node 설치 ( node -v을 통해 확인 가능 )
3. **root directory**에서 `npm install`을 통해 server dependency를 다운로드
4. **client directory**에서 `npm install`을 통해 client에 해당하는 dependency를 다운로드 
5. `npm run dev`를 통해 프론트 서버 가동
6. **client directory**에서 `npm install react-dropzone --save` 을 통해 Drop zone dependency 다운로드

## Boiler-plate란?
어떤 웹사이트를 만들 때 로그인, 회원가입 등은 어디에나 들어간다. <br>
따라서 프로젝트를 시작할 때 처음부터 만들기 보다는 `자주 쓰이는 것을 재사용 가능하도록` 해놓은 것이 **Boiler-plate**이다. <br>
그러므로 이 프로젝트도 처음부터가 아닌 프로젝트에 더 집중할 수 있도록 Boiler-plate는 제공한다.

## 비디오 업로드 FORM 만들기
1. Upload Page만들기
2. Upload Page Route 만들기
3. Upload Page Header Tab 만들기
4. Form Template 만들기
5. 파일을 올리는 Template 만들기 위해 Drop-zone 다운받기
   - npm install react-dropzone --save
6. onChange func 만들기

## Multer로 서버에 비디오 저장하기
1. OnDrop func 만들기
2. 노드 서버에 파일을 저장하기 위해 Dependency를 먼저 다운로드 (in Server directory == root directory)
   - npm install multer --save 
3. 비디오 파일을 서버로 보내기
4. 받은 비디오 파일을 서버에서 저장
5. 파일 저장 경로를 클라이언트로 전달해 주기 
(filefilter에는 따로 filter기능은 강의에서 제공하지 않음)

## ffmpeg으로 비디오 썸네일 생성하기
1. 썸네일 생성을 위한 Dependency 다운
    - window에서 ffmpeg 설치
    - npm install fluent-ffmpeg --save
2. 서버에 저장된 비디오를 이용한 썸네일 생성
3. 생성된 썸네일을 서버에 저장
4. 썸네일 이미지 파일 경로 정보를 클라이언트에 보내기
5. 썸네일 이미지를 화면에 표시

## 비디오 업로드 하기
1. 비디오 Collection 만들기
   - Columns (= Fields )
     - writer, title, description, privacy, filePath, category, views, duration,thumbnail
2. onSubmit Function 만들기
3. 요청할 데이터들을 서버로 보내기
4. 보낸 데이터들을 MongoDB에 저장하기

## RDBMS vs MongoDB
MongoDB에서는 기존 데이터베이스의 용어가 다르니 참고하면 된다.

![screenshot](/screenshot/RDMSNMongDB.PNG)

## 랜딩 페이지에 비디오들 나타나게 하기
1. 빈 랜딩 페이지 생성
2. 비디오 카드 Template 만들기
3. 몽고 DB에서 모든 비디오 데이터 가져오기
4. 가져온 비디오 데이터들을 스크린에 출력하기
   - use map() methods

## 비디오 디테일 페이지 만들기
1. 비어있는 비디오 디테일 페이지 생성
2. 비디오 디테일 페이지를 위한 Route 만들기
3. 비디오 디테일 페이지 Template 만들기
4. MongoDB에서 비디오 데이터 가져오기
5. 가져온 데이터들을 스크린에 출력

## 비디오 디테일 페이지에서 Side 비디오 생성
1. Side Video 부분 Layout Template 만들기
2. 한개의 카드 template 만들기
3. DB에서 모든 비디오 데이터를 불러오기
4. 불러온 데이터 화면에 출력하기  

## 구독 기능(1)
1. Subscriber Model 만들기
   - userTo
   - userFrom
2. Subscriber Button UI 만들기
3. 데이터베이스에서 얼마나 많은 사람이 비디오 업로드 한 유저를 구독하는지 정보 가져오기
4. 내가 이 비디오 업로드 한 유저를 구독하는지 정보 가져오기
   - 0 Subscribe
   - 1 Subscribed
5. 가져온 정보들 화면에 출력

## 구독 기능(2)
1. 구독하기 기능 만들기
2. 구독 취소하기 기능 만들기
   - 아직 구독 중이 아니라면 `Subscribe`
   - 이미 구독 중이라면 `UnSubscribe`

## 구독 비디오 페이지
1. 빈 Subscription 페이지 생성
2. Subscription Page를 위한 Route 만들기
3. Template 만들기
4. 내가 구독한 유저의 비디오들만 서버에서 가져오기
5. 가져온 비디오 데이터들을 화면에 출력하기

### 참고
- https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%9C%A0%ED%8A%9C%EB%B8%8C-%EB%A7%8C%EB%93%A4%EA%B8%B0/lecture/29589?tab=curriculum
- https://github.com/jaewonhimnae/boilerplate-mern-stack