import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  deleteAccount,
  getUserInfo,
  updateUserInfo,
} from "../../apis/gmu/signupApi";

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setUserInfo(userData);
        setUserName(userData.userName);
        setUserEmail(userData.userEmail);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      userName,
      userEmail,
    };

    try {
      await updateUserInfo(updatedData);
      setShowSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount();
      navigate("/logout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Container>
        <h1>회원 정보 수정</h1>
        {userInfo && (
          <form onSubmit={handleUpdate}>
            <InputField>
              <Label>이름</Label>
              <Input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </InputField>
            <InputField>
              <Label>이메일</Label>
              <Input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </InputField>
            <Button type="submit">수정</Button>
          </form>
        )}
        {showSuccess && (
          <SuccessMessage>회원 정보가 업데이트되었습니다.</SuccessMessage>
        )}
        <DeleteButton onClick={handleDelete}>회원 탈퇴</DeleteButton>
      </Container>
    </Wrapper>
  );
};

export default EditProfile;

const Wrapper = styled.div``;

const Container = styled.div`
  text-align: center;
`;

const InputField = styled.div`
  margin-bottom: 1rem;
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

const DeleteButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff3333;
  }
`;

const SuccessMessage = styled.div`
  margin-top: 1rem;
  color: green;
`;
