import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { saveEvent } from "../../apis/gmu/planCalendar";

const EventModal = ({ date, onSubmit, event, tourId }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [expense, setExpense] = useState("");
  const isReadOnly = !!event;

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setStartTime(event.start || "");
      setEndTime(event.end || "");
      setDescription(event.description || "");
      setExpense(event.expense || 0);
    }
  }, [event]);

  const handleSubmit = async () => {
    const newEvent = {
      tour_id: tourId,
      title,
      start: startTime,
      end: endTime,
      date: `${date}`,
      description,
      expense,
    };

    try {
      const savedEvent = await saveEvent(newEvent);
      console.log(savedEvent);
      onSubmit(savedEvent); // 저장된 이벤트 데이터 전달
      // 폼 초기화
      setTitle("");
      setStartTime("");
      setEndTime("");
      setDescription("");
      setExpense(0); // 초기화할 때 숫자는 0으로 설정
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form>
      <h2>
        {date} 일정 {isReadOnly ? "읽기" : "추가"}
      </h2>
      <Time>
        <label>시작 시간</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          readOnly={isReadOnly}
          required
        />
        <label>끝 시간</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          readOnly={isReadOnly}
        />
      </Time>
      <Else>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          readOnly={isReadOnly}
          placeholder="제목을 입력해 주세요"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          readOnly={isReadOnly}
          placeholder="내용을 입력해 주세요"
        ></textarea>
        <label>소비금</label>
        <input
          type="number"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
          placeholder="소비금"
          readOnly={isReadOnly}
        />
      </Else>
      {!isReadOnly && <Button onClick={handleSubmit}>저장</Button>}
    </Form>
  );
};

export default EventModal;

const Form = styled.div`
  border: solid;
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px 5px 5px 5px;
  background-color: blue;
`;

const Time = styled.div`
  display: flex;
`;

const Else = styled.div`
  border: solid;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #1e88e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005cb2;
  }
`;
