import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ALOTlogo from "../../images/ALOTlogo.png";
import { checkDuplicateId, postAccount } from "../../apis/gmu/signupApi";

const Signup = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const [confirmPwError, setConfirmPwError] = useState("");
  const [idDuplicateError, setIdDuplicateError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // 유효성 검사 함수
  const validateId = id => {
    const regEx = /^[a-zA-Z0-9]{6,12}$/;
    return regEx.test(id);
  };

  const validatePassword = password => {
    const regEx =
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    return regEx.test(password);
  };

  const validateEmail = email => {
    const regEx = /^[a-zA-Z0-9]{8,12}@[a-z]{3,5}\.(com|net|org)$/;
    return regEx.test(email);
  };

  const handleIdChange = async e => {
    const newId = e.target.value;
    setUserId(newId);

    const validationError = validateId(newId)
      ? ""
      : "아이디는 6~12 글자의 영문 대소문자와 숫자만 가능합니다.";
    setIdError(validationError);

    if (!validationError) {
      try {
        const isDuplicate = await checkDuplicateId(newId);
        if (isDuplicate) {
          setIdDuplicateError("이미 사용 중인 ID입니다.");
        } else {
          setIdDuplicateError("");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setIdDuplicateError("");
    }
  };

  const handlePwChange = e => {
    const newPw = e.target.value;
    setUserPw(newPw);
    setPwError(
      validatePassword(newPw)
        ? ""
        : "비밀번호는 8~20 글자, 특수문자와 숫자를 포함해야 합니다.",
    );
  };

  const handleConfirmPwChange = e => {
    const newConfirmPw = e.target.value;
    setConfirmPw(newConfirmPw);
    setConfirmPwError(
      userPw === newConfirmPw ? "" : "비밀번호가 일치하지 않습니다.",
    );
  };

  const handleEmailChange = e => {
    const newEmail = e.target.value;
    setUserEmail(newEmail);
    setEmailError(
      validateEmail(newEmail) ? "" : "올바른 이메일 형식이 아닙니다.",
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const idValidationError = validateId(userId)
      ? ""
      : "아이디는 6~12 글자의 영문 대소문자와 숫자만 가능합니다.";
    const pwValidationError = validatePassword(userPw)
      ? ""
      : "비밀번호는 8~20 글자, 특수문자와 숫자를 포함해야 합니다.";
    const confirmPwValidationError =
      userPw === confirmPw ? "" : "비밀번호가 일치하지 않습니다.";
    const emailValidationError = validateEmail(userEmail)
      ? ""
      : "올바른 이메일 형식이 아닙니다.";

    setIdError(idValidationError);
    setPwError(pwValidationError);
    setConfirmPwError(confirmPwValidationError);
    setEmailError(emailValidationError);

    if (
      idValidationError ||
      pwValidationError ||
      confirmPwValidationError ||
      emailValidationError ||
      idDuplicateError
    ) {
      return;
    }

    const signupData = {
      uid: userId,
      upw: userPw,
      nm: userName,
      email: userEmail,
    };

    try {
      const response = await postAccount(signupData);
      const userId = response.user_id; // 서버로부터 받은 user_id
      localStorage.setItem("user_id", userId); // 로컬 스토리지에 저장
      setShowSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Container>
        <SignupForm onSubmit={handleSubmit}>
          <h1>회원가입</h1>
          <InputField>
            <Label>아이디</Label>
            <Input type="text" value={userId} onChange={handleIdChange} />
            {idError && <ErrorMessage>{idError}</ErrorMessage>}
            {idDuplicateError && (
              <ErrorMessage>{idDuplicateError}</ErrorMessage>
            )}
          </InputField>
          <InputField>
            <Label>비밀번호</Label>
            <Input type="password" value={userPw} onChange={handlePwChange} />
            {pwError && <ErrorMessage>{pwError}</ErrorMessage>}
          </InputField>
          <InputField>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              value={confirmPw}
              onChange={handleConfirmPwChange}
            />
            {confirmPwError && <ErrorMessage>{confirmPwError}</ErrorMessage>}
          </InputField>
          <InputField>
            <Label>이메일</Label>
            <Input
              type="email"
              value={userEmail}
              onChange={handleEmailChange}
            />
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          </InputField>
          <InputField>
            <Label>이름</Label>
            <Input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </InputField>
          <Button type="submit">회원가입</Button>
          {showSuccess && (
            <SuccessMessage>
              <p>회원가입이 완료되었습니다.</p>
              <Link to="/">확인</Link>
            </SuccessMessage>
          )}
        </SignupForm>
      </Container>
    </Wrapper>
  );
};

export default Signup;

const Wrapper = styled.div``;

const Header = styled.div`
  h1 {
    background-color: blue;
    padding: 20px 20px 20px 20px;
    margin: 0 auto;
  }
  img {
    margin: auto;
    display: block;
    width: 300px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const SignupForm = styled.form`
  background: white;
  padding: 2vw;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const InputField = styled.div`
  margin-bottom: 1vw;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: green;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin: 0;
`;

const SuccessMessage = styled.div`
  margin-top: 1rem;
`;
