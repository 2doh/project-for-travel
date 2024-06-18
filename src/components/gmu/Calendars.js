import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "./EventModal";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { getAllEvents, getOnePlan } from "../../apis/gmu/planCalendar";
import ALOTlogo from "../../images/ALOTlogo.png";

const Calendars = () => {
  const { id: tourId } = useParams();

  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    const loadTours = async () => {
      try {
        const tours = await getOnePlan(tourId);
        setEvents(tours);
      } catch (error) {
        console.error("Error loading tours:", error);
      }
    };

    loadTours();
  }, [tourId]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await getAllEvents(tourId);
        setEvents(prevEvents => [...prevEvents, ...events]);
      } catch (error) {
        console.error("Error loading events:", error);
      }
    };
    loadEvents();
  }, [tourId]);

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

  const handleEventSubmit = event => {
    const formattedEvent = {
      ...event,
      start: `${event.date}T${event.start}`,
      end: `${event.date}T${event.end}`,
    };
    setEvents(prevEvents => [...prevEvents, formattedEvent]);
  };

  return (
    <>
      <Body>
        <Link to={`/planModify/${tourId}`}>
          <Button>계획 수정하기</Button>
        </Link>
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
                <SelectedDate>{selectedDate} 일정 </SelectedDate>
                <EventModal
                  date={selectedDate}
                  onSubmit={handleEventSubmit}
                  tourId={tourId}
                  event={null}
                />
                {selectedEvents.map((event, index) => (
                  <EventModal
                    key={index}
                    date={event.date}
                    event={event}
                    tourId={tourId}
                  />
                ))}
              </>
            )}
          </EventModalWrap>
        </CalendarContainer>
      </Body>
    </>
  );
};

export default Calendars;

// Styled-components

const Body = styled.div`
  padding-top: 180.24px;
`;

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
