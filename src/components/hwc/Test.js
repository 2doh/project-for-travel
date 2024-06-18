import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/hwc/indexstyle.css";
import "../../css/hwc/mobilestyle.css";
import DetilePages from "./DetilePages";
import DModifyPages from "./DModifyPages";
import ModifyText from "./ModifyText";

const Test = () => {
  const [schedule, setSchedule] = useState({
    tourId: 1, // 기본값 설정
    title: "",
    tourLocation: "",
    tourStartDay: "",
    tourFinishDay: "",
    tourBudget: 0,
    tourColor: "#FFFFFF",
  });

  const [isEditing, setIsEditing] = useState(true);
  const [showDetail, setShowDetail] = useState(true);

  useEffect(() => {
    // 초기 데이터 로드
    axios
      .get("/api/schedule/1") // 이 엔드포인트는 백엔드에서 제공해야 합니다.
      .then(response => {
        setSchedule(response.data);
      })
      .catch(error => {
        console.error("Error fetching schedule data:", error);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setSchedule(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = e => {
    e.preventDefault();
    setIsEditing(false);

    // 일정 저장 API 호출
    axios
      .post("/api/schedule", schedule)
      .then(response => {
        console.log("Saved Schedule:", response.data);
      })
      .catch(error => {
        console.error("Error saving schedule:", error);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleReset = () => {
    setSchedule({
      tourId: 1, // 기본값 설정
      title: "",
      tourLocation: "",
      tourStartDay: "",
      tourFinishDay: "",
      tourBudget: 0,
      tourColor: "#FFFFFF",
    });
    setIsEditing(true);
  };

  const handleDelete = () => {
    // 일정 삭제 API 호출
    axios
      .delete(`/api/schedule/${schedule.tourId}`)
      .then(response => {
        console.log("삭제된 일정:", response.data);
        setSchedule({
          tourId: 1, // 기본값 설정
          title: "",
          tourLocation: "",
          tourStartDay: "",
          tourFinishDay: "",
          tourBudget: 0,
          tourColor: "#FFFFFF",
        });
        setShowDetail(false);
      })
      .catch(error => {
        console.error("Error deleting schedule:", error);
      });
  };

  const style = {
    background: "linear-gradient(to right, #2bc0e4, #eaecc6)",
    minHeight: "100vh",
  };

  return (
    <div style={style}>
      {showDetail && (
        <DetilePages schedule={schedule} onDelete={handleDelete} />
      )}
      <DModifyPages
        schedule={schedule}
        onChange={handleChange}
        isEditing={isEditing}
      />
      <ModifyText
        onSave={handleSave}
        onEdit={handleEdit}
        onReset={handleReset}
        isEditing={isEditing}
      />
    </div>
  );
};

export default Test;
