import React, { useEffect, useState } from "react";
import Map from "./Map";
import axios from "axios";
import styled from "styled-components";
import MapMobile from "./MapMobile";
import ALOTlogo from "../../images/ALOTlogo.png";
import { useNavigate, useParams } from "react-router-dom";
import { postPlan } from "../../apis/gmu/planApi";

const Plan = () => {
  const [tourTitle, setTourTitle] = useState("");
  const [tourStartDay, setTourStartDay] = useState("");
  const [tourFinishDay, setTourFinishDay] = useState("");
  const [tourLocation, setTourLocation] = useState("");
  const [tourBudget, setTourBudget] = useState("");
  const [mapCenter, setMapCenter] = useState([37.5665, 126.978]);

  const { userId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (tourLocation) {
        axios
          .get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${tourLocation}`,
          )
          .then(response => {
            const data = response.data;
            if (data && data.length > 0) {
              const { lat, lon } = data[0];
              setMapCenter([lat, lon]);
            }
          })
          .catch(error => console.log(error));
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [tourLocation]);

  const handleSubmit = async e => {
    e.preventDefault();

    const userId = localStorage.getItem("user"); // 로컬 스토리지에서 user_id 가져오기
    if (!userId) {
      alert("로그인 정보가 없습니다. 다시 로그인 해주세요."); //navi로 로그인으로 이동시키기
      return;
    }

    const writeData = {
      userId: userId, //user DB의 pk
      title: tourTitle,
      tourLocation,
      tourStartDay,
      tourFinishDay,
      tourColor: "#FFFFFF",
      tourBudget,
    };
    console.log(userId);

    try {
      const planData = await postPlan(writeData);
      console.log(planData);
      navigate(`/plan/${planData.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <main>
        <Content>
          <LeftSection>
            <Map center={mapCenter} destination={tourLocation} />
          </LeftSection>
          <RightSection>
            <Form onSubmit={handleSubmit}>
              <FormFactor>
                <Label htmlFor="tourTitle">제목</Label>
                <Input
                  type="text"
                  id="tourTitle"
                  name="tourTitle"
                  placeholder="여행 계획 제목을 입력하세요"
                  value={tourTitle}
                  onChange={e => setTourTitle(e.target.value)}
                  required
                />
              </FormFactor>

              <FormFactor>
                <Label htmlFor="destination">목적지</Label>
                <Input
                  type="text"
                  id="tourLocation"
                  name="tourLocation"
                  placeholder="목적지를 입력하세요"
                  value={tourLocation}
                  onChange={e => {
                    setTourLocation(e.target.value);
                    fetch(`/search?format=json&q=${e.target.value}`)
                      .then(response => response.json())
                      .then(data => {
                        if (data && data.length > 0) {
                          const { lat, lon } = data[0];
                          setMapCenter([lat, lon]);
                        }
                      })
                      .catch(error => console.log(error));
                  }}
                  required
                />
              </FormFactor>
              <MapForMobile>
                <MapMobile center={mapCenter} destination={tourLocation} />
              </MapForMobile>

              <FormFactor>
                <Label htmlFor="start-date">시작일</Label>
                <Input
                  type="date"
                  id="tourStartDay"
                  name="tourStartDay"
                  value={tourStartDay}
                  onChange={e => setTourStartDay(e.target.value)}
                  required
                />
              </FormFactor>

              <FormFactor>
                <Label htmlFor="end-date">끝나는 날</Label>
                <Input
                  type="date"
                  id="tourFinishDay"
                  name="tourFinishDay"
                  value={tourFinishDay}
                  onChange={e => setTourFinishDay(e.target.value)}
                  required
                />
              </FormFactor>

              <FormFactor>
                <Label htmlFor="budget">예산</Label>
                <Input
                  type="number"
                  id="tourBudget"
                  name="tourBudget"
                  placeholder="예산을 입력하세요"
                  value={tourBudget}
                  onChange={e => setTourBudget(e.target.value)}
                  required
                />
              </FormFactor>
              <Button type="submit">저장</Button>
            </Form>
          </RightSection>
        </Content>
      </main>
      <Footer>
        <p>푸터</p>
      </Footer>
    </Wrapper>
  );
};

export default Plan;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  h1 {
    background-color: blue;
    padding: 20px 20px 20px 20px;
    margin: 0 auto;
  }
  img {
    margin: auto;
    display: block;
    width: 300px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const LeftSection = styled.div`
  position: relative;
  height: 80vh;

  @media (max-width: 760px) {
    display: none;
  }
`;

const MapForMobile = styled.div`
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;

const RightSection = styled.div`
  position: absolute;
  right: 20px;
  width: 300px;
  height: 80vh;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100000;
  transform: translateX(100%);
  opacity: 0;
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
  animation: slideIn 0.5s ease-in-out 0.1s forwards;

  @keyframes slideIn {
    to {
      transform: translateX(0);
      opacity: 1;
      right: 0;
    }
  }

  @media (max-width: 760px) {
    position: relative;
    margin: 0 auto;
  }
`;

const Form = styled.form`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormFactor = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  width: calc(100% - 12px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
const Footer = styled.div`
  z-index: 999999;
  background-color: blue;
  margin: 0px 0px 0px 0px;
`;
