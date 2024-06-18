import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getUserInfo } from "../../apis/gmu/signupApi";
import { Link } from "react-router-dom";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setUserInfo(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Wrapper>
      <Container>
        <h1>내 정보</h1>
        {userInfo && (
          <UserInfo>
            <p>
              <strong>아이디:</strong> {userInfo.userId}
            </p>
            <p>
              <strong>이름:</strong> {userInfo.userName}
            </p>
            <p>
              <strong>이메일:</strong> {userInfo.userEmail}
            </p>
          </UserInfo>
        )}
      </Container>
      <Link to="/">회원정보 수정</Link>
    </Wrapper>
  );
};

export default MyPage;

const Wrapper = styled.div``;

const Container = styled.div`
  text-align: center;
`;

const UserInfo = styled.div`
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  background-color: #f9f9f9;
`;
