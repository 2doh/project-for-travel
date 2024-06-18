import axios from "axios";
import { SERVER } from "../config";

// export const postAccount = async (signupData) => {
//   const response = await axios.post(`${SERVER}/sign-up`, signupData);
//   return response.data;
// };

// export const checkDuplicateId = async (userId) => {
//   const response = await axios.get(`${SERVER}/백엔드?userId=${userId}`);
//   return response.data.isDuplicate;
// };

// export const getUserInfo = async () => {
//   try {
//     const response = await axios.get(`${SERVER}/sign-up`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const updateUserInfo = async userData => {
//   try {
//     const response = await axios.put("/api/user", userData);
//     return response.data;
//   } catch (error) {
//     console.log("업뎃 에러:", error);
//     throw error;
//   }
// };

// export const deleteAccount = async () => {
//   try {
//     const response = await axios.delete("/api/user");
//     return response.data;
//   } catch (error) {
//     console.log("삭제 에러:", error);
//     throw error;
//   }
// };

// Swagger
export const postAccount = async signupData => {
  try {
    const response = await axios.post(`${SERVER}/api/user/sign-up`, signupData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkDuplicateId = async userId => {
  const response = await axios.get(`${SERVER}/백엔드?userId=${userId}`);
  return response.data.isDuplicate;
};

export const getUserInfo = async id => {
  try {
    const response = await axios.get(`${SERVER}/api/user?uid=${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserInfo = async userData => {
  try {
    const response = await axios.put("/api/user", userData);
    return response.data;
  } catch (error) {
    console.log("업뎃 에러:", error);
    throw error;
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axios.delete("/api/user");
    return response.data;
  } catch (error) {
    console.log("삭제 에러:", error);
    throw error;
  }
};
