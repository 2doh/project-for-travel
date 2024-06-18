import axios from "axios";
import { SERVER } from "../config";

// 로그인 API 요청 함수
export const postLogin = async (loginData) => {
  try {
    const response = await axios.post(`${SERVER}/login`, loginData);
    return response; // 필요한 경우 response.data를 반환할 수도 있음
  } catch (error) {
    console.log("로그인 요청 오류:", error);
    throw error;
  }
};
