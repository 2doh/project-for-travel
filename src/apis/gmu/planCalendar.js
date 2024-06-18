import axios from "axios";
import { SERVER } from "../config";

// 셀프
// export const saveEvent = async (event) => {
//   try {
//     const response = await axios.post(`${SERVER}/events`, event);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const getAllPlans = async () => {
//   try {
//     const response = await axios.get(`${SERVER}/tour`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getAllEvents = async () => {
//   try {
//     const response = await axios.get(`${SERVER}/events`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getOnePlan = async (id) => {
//   try {
//     const response = await axios.get(`${SERVER}/tour/${id}`);
//     console.log(response.data); // 응답 데이터 출력
//     if (Array.isArray(response.data)) {
//       return response.data.map((tour) => ({
//         title: tour.tourTitle,
//         start: tour.tourStartDay,
//         end: tour.tourFinishDay,
//       }));
//     } else {
//       console.error(response.data);
//       // 배열로 변환하여 반환
//       return [response.data].map((tour) => ({
//         title: tour.tourTitle,
//         start: tour.tourStartDay,
//         end: tour.tourFinishDay,
//       }));
//     }
//   } catch (error) {
//     console.error("tours가져오기에러", error);
//     throw error;
//   }
// };

////////////////////////////////

// Swagger;
export const saveEvent = async event => {
  try {
    const response = await axios.post(`${SERVER}/api/tour/schedule`, event);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllPlans = async () => {
  try {
    const response = await axios.get(
      `${SERVER}/api/tour/schedule/tourScheduleList`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${SERVER}/events`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// export const getOnePlan = async (id) => {
//   try {
//     const response = await axios.get(`${SERVER}/tour/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching the plan:", error);
//     throw error;
//   }
// };

export const getOnePlan = async id => {
  try {
    const response = await axios.get(`${SERVER}/api/tour?signed_user_id=${id}`);
    console.log(response.data); // 응답 데이터 출력
    if (Array.isArray(response.data)) {
      return response.data.map(tour => ({
        title: tour.tourTitle,
        start: tour.tourStartDay,
        end: tour.tourFinishDay,
      }));
    } else {
      console.error(response.data);
      // 배열로 변환하여 반환
      return [response.data].map(tour => ({
        title: tour.tourTitle,
        start: tour.tourStartDay,
        end: tour.tourFinishDay,
      }));
    }
  } catch (error) {
    console.error("Error fetching tours:", error);
    throw error;
  }
};
