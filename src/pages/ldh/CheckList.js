import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  allDel,
  checkPatch,
  delList,
  getCheckList,
  postList,
} from "../../apis/ldh/apitour";
import List from "../../components/ldh/List";
import Tour from "../../components/ldh/Tour";
import { userInfoContext } from "../../context/UserInfoProvider";
import "../../css/ldh/checklist/main-bottom.css";
import "../../css/ldh/checklist/main-top.css";
import "../../css/ldh/checklist/main.css";

const CheckList = () => {
  const { isUser } = useContext(userInfoContext);
  const [onAdd, setOnAdd] = useState("");
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  const [tourId, setTourId] = useState([]);
  const [tourTitle, setTourTitle] = useState([]);
  const [selectedTourId, setSelectedTourId] = useState(null);

  const handleOnSubmit = async e => {
    e.preventDefault();
    if (list.some(item => item.title === onAdd)) {
      return setMessage("중복된 목록이 존재합니다");
    }
    if (onAdd === "") {
      return setMessage("추가할 물건을 기입해주세요");
    }
    try {
      const result = await postList({ tourId: selectedTourId, title: onAdd });
      setMessage(result.data.resultMsg);
      const newItem = {
        checklistid: result.data.resultData,
        title: onAdd,
        checked: false,
      };
      setList(prevList => [...prevList, newItem]);
      setOnAdd("");
    } catch (error) {
      console.error(error);
      setMessage("항목 추가에 실패했습니다");
    }
  };

  const handleRemove = async index => {
    try {
      const res = await delList(list[index].checklistid);
      if (res.status === 200) {
        setList(prevList => prevList.filter((_, i) => i !== index));
        setMessage("삭제되었습니다");
      }
    } catch (error) {
      console.error(error);
      setMessage("삭제에 실패했습니다");
    }
  };

  const handleCheck = async index => {
    try {
      const updatedList = [...list];
      updatedList[index].checked = !updatedList[index].checked;
      setList(updatedList);
      await checkPatch(list[index].checklistid);
    } catch (error) {
      console.error(error);
      setMessage("체크 상태 변경에 실패했습니다");
    }
  };

  const handleAllDel = async () => {
    setMessage("");
    try {
      await allDel(selectedTourId);
      setList([]);
      setMessage("전체 목록이 삭제되었습니다");
    } catch (error) {
      console.error(error);
      setMessage("전체 삭제에 실패했습니다");
    }
  };

  const handleTourClick = async data => {
    setSelectedTourId(data);
    try {
      const resultCheck = await getCheckList(data);
      const fetchedList = resultCheck.data.resultData.map(item => ({
        checklistid: item.checklistId,
        title: item.title,
        checked: item.checked,
      }));
      setList(fetchedList);
    } catch (error) {
      console.error(error);
      setMessage("체크리스트 불러오기에 실패했습니다");
    }
  };

  const getTourId = async () => {
    if (!isUser) return;
    try {
      const res = await axios.get(`/api/tour?signed_user_id=${isUser}`);
      setTourId(res.data.resultData.map(item => item.tourId));
      setTourTitle(res.data.resultData.map(item => item.title));
    } catch (error) {
      console.error(error);
      setMessage("투어 정보를 불러오기에 실패했습니다");
    }
  };

  useEffect(() => {
    getTourId();
  }, [isUser]);

  return (
    <main className="main">
      <div className="tourwrap">
        <ul className="pagination">
          {tourTitle.map((item, index) => (
            <Tour
              key={index}
              tour={item}
              tourClick={() => handleTourClick(tourId[index])}
            />
          ))}
          <div className="btnwrap">
            <button className="btn btn-danger" onClick={handleAllDel}>
              전체삭제
            </button>
          </div>
        </ul>
      </div>
      <List
        isTourIdSelected={!!selectedTourId}
        list={list}
        message={message}
        onAdd={onAdd}
        setOnAdd={setOnAdd}
        handleOnSubmit={handleOnSubmit}
        handleRemove={handleRemove}
        handleCheck={handleCheck}
      />
    </main>
  );
};

export default CheckList;
