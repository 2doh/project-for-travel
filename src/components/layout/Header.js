import React, { useContext, useEffect, useState } from "react";
import "../../css/ldh/header/header.css";
import { useNavigate } from "react-router-dom";
import { userInfoContext } from "../../context/UserInfoProvider";

const Header = ({ onheader }) => {
  const [onNavi, setOnNavi] = useState("");
  const [authStatus, setAuthStatus] = useState("");
  const [authUser, setAuthUser] = useState("");
  const [authLogin, setAuthLogin] = useState(false);
  const { isUser, setIsUser } = useContext(userInfoContext);
  const navigate = useNavigate();
  const handleNavi = (navi, path) => {
    if (isUser) {
      setAuthLogin(true);
      setOnNavi(navi);
      navigate(path);
    } else {
      setAuthLogin(false);
      navigate("/login");
    }
  };
  const handleAuth = () => {
    if (isUser) {
      setIsUser("");
      localStorage.setItem("user", "");
      handleNavi("홈", "/");
    }
    if (!isUser) {
      navigate("/signup");
    }
  };
  const handleStatus = () => {
    if (isUser) {
      handleNavi("내정보", "/userinfo");
    }
    if (!isUser) {
      handleNavi("로그인", "/login");
    }
  };
  useEffect(() => {
    if (isUser) {
      setAuthStatus("내정보");
      setAuthUser("로그아웃");
    }
    if (!isUser) {
      setAuthStatus("로그인");
      setAuthUser("회원가입");
    }
  }, [isUser]);

  return onheader ? (
    <div className="headerwrap">
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <img
                src="/www/images/KakaoTalk_20240607_150139849.jpg"
                className="alotimg"
                onClick={() => {
                  handleNavi("home", "/");
                }}
              />
            </a>
            <ul className="nav navbar-nav">
              <li className={onNavi === "plan" ? "active" : ""}>
                <a
                  href="#"
                  onClick={() => {
                    handleNavi("plan", "/plan");
                  }}
                >
                  계획세우기
                </a>
              </li>
              <li className={onNavi === "calendar" ? "active" : ""}>
                <a
                  href="#"
                  onClick={() => {
                    handleNavi("calendar", "/allSchedule");
                  }}
                >
                  캘린더
                </a>
              </li>
              <li className={onNavi === "detail" ? "active" : ""}>
                <a
                  href="#"
                  onClick={() => {
                    handleNavi("detail", "/detail");
                  }}
                >
                  상세계획
                </a>
              </li>
              <li className={onNavi === "checklist" ? "active" : ""}>
                <a
                  href="#"
                  onClick={() => {
                    handleNavi("checklist", "/checklist");
                  }}
                >
                  체크리스트
                </a>
              </li>
            </ul>
          </div>
          <ul className="usernav">
            <li className="usernav-left">
              <a
                href="#"
                className="usernav-left-content navbar-brand"
                onClick={() => {
                  handleStatus();
                }}
              >
                {authStatus}
              </a>
            </li>
            <li className="usernav-right">
              <a
                href="#"
                className="usernav-right-content navbar-brand"
                onClick={() => {
                  handleAuth();
                }}
              >
                {authUser}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  ) : null;
};

export default Header;
