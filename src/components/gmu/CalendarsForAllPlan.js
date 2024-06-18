import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import { getAllEvents, getAllPlans } from "../../apis/gmu/planCalendar"; // getAllPlans API 가져오기
import ALOTlogo from "../../images/ALOTlogo.png";

const CalendarsForAllPlan = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        // 모든 이벤트 가져오기
        const events = await getAllEvents();
        // 모든 여행 계획 가져오기
        const plans = await getAllPlans();

        // 여행 계획을 events 형식으로 변환
        const planEvents = plans.map(plan => ({
          title: plan.tourTitle,
          start: plan.tourStartDay,
          end: plan.tourFinishDay,
          extendedProps: {
            type: "plan", // 이벤트의 유형을 추가
          },
        }));

        setEvents([
          ...events.map(event => ({
            ...event,
            start: `${event.date}T${event.start}`,
            end: `${event.date}T${event.end}`,
          })),
          ...planEvents,
        ]);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadAllData();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const filteredEvents = events.filter(
        event => event.start.split("T")[0] === selectedDate,
      );
      const sortedEvents = filteredEvents.sort((a, b) => {
        const aTime = new Date(a.start).getTime();
        const bTime = new Date(b.start).getTime();
        return aTime - bTime;
      });
      setSelectedEvents(sortedEvents);
    }
  }, [selectedDate, events]);

  const handleDateClick = info => {
    setSelectedDate(info.dateStr);
  };

  return (
    <>
      {/* <Header>
        <img src={ALOTlogo} alt="로고" />
      </Header> */}
      {/* <Body> */}
      <CalendarContainer>
        <Calendar>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            events={events}
          />
        </Calendar>

        <EventModalWrap>
          {selectedDate && (
            <>
              <SelectedDate>{selectedDate} 일정</SelectedDate>
              {selectedEvents.map((event, index) => (
                <EventSummary key={index}>
                  <strong>{event.title}</strong>
                  <br />
                  {event.extendedProps?.type === "plan" ? (
                    <>
                      <p>시작: {event.start.split("T")[0]}</p>
                      <p>끝: {event.end.split("T")[0]}</p>
                    </>
                  ) : (
                    <>
                      <p>
                        시간: {event.start.split("T")[1]} -{" "}
                        {event.end.split("T")[1]}
                      </p>
                      <p>설명: {event.description}</p>
                      <p>비용: {event.expense}</p>
                    </>
                  )}
                </EventSummary>
              ))}
            </>
          )}
        </EventModalWrap>
      </CalendarContainer>
      {/* </Body> */}
    </>
  );
};

export default CalendarsForAllPlan;

// Styled-components

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  img {
    margin: auto;
    display: block;
    width: 300px;
    padding: 20px;
  }
`;

// const Body = styled.div`
//   padding-top: 180.24px;
// `;

const CalendarContainer = styled.div`
  display: flex;
`;

const Calendar = styled.div`
  flex: 1;
`;

const EventModalWrap = styled.div`
  width: 300px;
  padding: 20px;
  border-left: 1px solid #ccc;
  background-color: #f9f9f9;
  overflow-y: auto;
`;

const SelectedDate = styled.div`
  font-size: 1.2em;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
`;

const EventSummary = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
`;
