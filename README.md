eslint
ruls  
 "react/react-in-jsx-scope": "off",
"@typescript-eslint/no-unused-vars" : "off",
"react/prop-types" : "off"
마이그레이션 중 테스트용으로 기입, 제거 필요

# GMU

# 6.09

- plan 페이지 입력 정보 post 성공

- calendar 페이지 plan에서 입력한 정보 get 성공, events post 성공

- allSchedule 페이지 plan에서 입력한 모든 정보 get 성공, events post 성공

- events get도 성공

# 6.10

- postman 자체 DB로 수정 작동 확인
- 계획 수정하기 및 삭제하기 만듦
- 마이페이지 만듦- 다만 로그인 기능 미구현으로 테스트 불가

# 6.12

- 아이디, 비밀번호, 이메일 정규표현식 성공

- user 테이블에서 만든 uid가 계획 페이지의 tour 테이블로 가는 것 확인. 다만 user테이블의 pk가 넘어가진 않음.

- tour테이블의 pk인 tour_id 가 tour_schedule(세부일정) 테이블로 가는건 확인.

- tour_schedule에 date 따로 뺌

- plan/:id 의 경우 새로고침시 캘린더에 나오지 않음

# 남은 할 일

- 로그인 후 Swagger로 테스트, 수정, 삭제 기능

- 메인 페이지에서 계획 누를시 /plan/:id 페이지로 이동
  "proxy": "http://192.168.0.53:8080"

# 수정필요

체크리스트 새로 생성한 리스트 삭제안됨
체크 모든 tour에서 적용됨

get /api/user 마이페이지에서 get으로 보낼 데이터가 유저의 id임
회원가입시 발급되는 userid를 보내야 하도록 수정 요청해야함
수정 후 src/apis/ldh/apiuser.js getUserInfo의 axios 부분
testid1를 isUser로 수정 필요

pages/ldh/ test, test2, tsetItem / components/ldh/ListItem.js 삭제 요망

회원정보수정 없는 비밀번호 입력시 500에러
이를 statusCode 를 통하여 없으면, 비밀번호가 틀렸습니다 등의 메세지를 보내줘야함

비밀번호수정 put의 파라미터
upw newPw 두개만

로그인페이지 작업 필요

2024-06-17
Drop.js 수정
Main.js 작업
CheckList.js, List.js, Item.js 컴포넌트 확인 필요

머지 테스트