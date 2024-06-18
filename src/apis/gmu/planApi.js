import axios from "axios";
import { SERVER } from "../config";

//자체테스트
// export const postPlan = async (newPlan) => {
//   try {
//     const res = await axios.post(`${SERVER}/tour`, newPlan);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getPlan = (id) => {
//   return axios.get(`${SERVER}/tour/${id}`);
// };

// export const updatePlan = async (id, updatedPlan) => {
//   try {
//     const response = await axios.put(`${SERVER}/tour/${id}`, updatedPlan);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deletePlan = async (id) => {
//   try {
//     const response = await axios.delete(`${SERVER}/tour/${id}`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// Swagger 연동
export const postPlan = async newPlan => {
  try {
    const res = await axios.post(`${SERVER}/api/tour`, newPlan);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPlan = userId => {
  return axios.get(`${SERVER}/api/tour?signed_user_id=${userId}`);
};

export const updatePlan = async (id, updatedPlan) => {
  try {
    const response = await axios.put(`${SERVER}/tour/${id}`, updatedPlan);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePlan = async id => {
  try {
    const response = await axios.delete(`${SERVER}/tour/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
