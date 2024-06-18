const LogInBottom = () => {
  return (
    <>
      <span className="none-id">아이디를 입력해 주세요</span>
      <span className="none-password">비밀번호를 입력해 주세요</span>
      <span className="none-user">
        아이디 또는 비밀번호를 잘못 입력하셨습니다
      </span>
      <button type="button" className="button">
        로그인
      </button>
    </>
  );
};

export default LogInBottom;
