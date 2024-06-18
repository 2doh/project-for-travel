import axios from "axios";

export const postLogin = async data => {
  try {
    const res = await axios.post("/api/user/sign-in", data);
    if (res.statusCode === 1) {
      return;
    } else {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = async (isUser) => {
  try {
      const response = await axios.get(`/api/user?uid=testid21`)
      return response;
  } catch (error) {
      console.log(error)
  }
}

export const putUserPass = async (data) => {
  console.log(data)
  try {
    const response = await axios.put(`/api/user/password?uid=testid21&upw=${data.upw}&newPw=${data.newPw}`)
    return response
  } catch (error) {
    console.log(error)
  }
}