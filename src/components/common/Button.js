import styled from "@emotion/styled";
import React from "react";

const ButtonStyle = styled.button`
  padding: 10px 20px;
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005cb2;
  }

  &:active {
    background-color: #1e25e5;
  }
`;

const Buttons = () => {
  return <ButtonStyle>확인</ButtonStyle>;
};

export default Buttons;
