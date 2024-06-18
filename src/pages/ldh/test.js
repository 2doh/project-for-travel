import axios from "axios";
import { useEffect, useState } from "react";
import Item from "../../components/ldh/Item";
import ListInput from "../../components/ldh/ListInput";
import "../../css/ldh/checklist/main-bottom.css";
import "../../css/ldh/checklist/main-top.css";
import "../../css/ldh/checklist/main.css";

const initList = [
  // { tour_id: 1, title: "안녕 1", checked: false },
  // { tour_id: 1, title: "안녕 2", checked: false },
  // { tour_id: 1, title: "안녕 3", checked: false },
  // { tour_id: 1, title: "안녕 4", checked: false },
  // { boardId: 1, title: "sdfsdafa", checked: false },
];

const CheckList = () => {
  const [onAdd, setOnAdd] = useState("");
  const [message, setMessage] = useState("");
  const [list, setList] = useState(initList);
  const [isChecked, setIsChecked] = useState([]);

  const handleOnSubmit = e => {
    e.preventDefault();
    if (onAdd === "") {
      return setMessage("추가할 물건을 기입해주세요");
    }
    if (onAdd) {
      setList([...list, { boardId: 1, title: onAdd, checked: false }]);
      // setIsChecked([...isChecked, false]);
      setOnAdd("");
      setMessage("");
    }
    const reqData = {
      tour_id: 1,
      title: onAdd,
    };
    postList(reqData);
  };

  const postList = async data => {
    try {
      const response = await axios.post("/api/tour/checklist", data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemove = itemRemove => {
    setList(list.filter((_, index) => index !== itemRemove));
    setIsChecked(isChecked.filter((_, index) => index !== itemRemove));
  };
  const handleCheck = index => {
    // 임시의 객체를 만들고 배열로 만들어 원본 훼손 방지
    const tempObj = { ...list[index] };
    // 토글, true면 바로 false로 만들어줌
    tempObj.checked = !tempObj.checked;
    // 임시 배열을 만들어 원본 유지하게 만듬
    const tempArr = [...list];
    tempArr[index] = tempObj;
    // state 업데이트
    setList(tempArr);

    // const checked = [...isChecked];
    // checked[index] = !checked[index];
    // setIsChecked(checked);
  };

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <main className="main">
      <div className="main-wrap">
        <div className="main-top">
          <div className="main-top-wrap">
            <div className="main-top-title">{message}</div>
            <form
              name="list-form"
              className="list-form"
              onSubmit={e => {
                handleOnSubmit(e);
              }}
            >
              <ListInput value={onAdd} onChange={setOnAdd}></ListInput>
            </form>
          </div>
        </div>
        <div className="main-bottom">
          <div className="main-bottom-wrap">
            <div className="main-bottom-check">
              {list.map((item, index) => (
                <Item
                  key={index}
                  item={item}
                  index={index}
                  onRemove={() => {
                    handleRemove(index);
                  }}
                  onCheck={() => {
                    handleCheck(index);
                  }}
                  // isChecked={item.checked}
                ></Item>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckList;
