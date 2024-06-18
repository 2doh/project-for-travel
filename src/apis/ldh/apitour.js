import axios from "axios";


// post 체크리스트
export const postList = async data => {
  try {
    const response = await axios.post("/api/tour/checklist", data);
    // console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCheckList = async (data) => {
  try {
    const rres = await axios.get(`/api/tour/checklist?tour_id=${data}`);
    return rres
  } catch (error) {
    console.log(error);
  }
}

export const delList = async (data) => {
  try {
    const rep = await axios.delete(`/api/tour/checklist?checklist_id=${data}`)
    // console.log(rep)
    return rep
    } 
  catch (error) {
    console.log(error)
  }
}

export const allDel = async (selectedTourId) => {
  try {
    const resp = await axios.delete(`/api/tour/checklist/day?tour_id=${selectedTourId}`)
    return resp
  } catch (error) {
    console.log(error)
  }
}

export const checkPatch = async (data) => {
  try {
    const respon = await axios.patch(`/api/tour/checklist?checklist_id=${data}`)
    console.log(respon)
    return respon
  } catch (error) {
    console.log(error)
  }
}