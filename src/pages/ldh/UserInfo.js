import { useContext, useEffect, useState } from "react";
import { getUserInfo } from "../../apis/ldh/apiuser";
import Drop from "../../components/ldh/Drop";
import { userInfoContext } from "../../context/UserInfoProvider";
import "../../css/ldh/userinfo/userinfo.css";

const UserInfo = () => {

  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [userId, setUserId] = useState("")
  const [userCreateAt, setUserCreateAt] = useState("")
  const [userUpdateAt, setUserUpdateAt] = useState("")
  const [selectedModifyPass, setSelectedModifyPass] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const {isUser} = useContext(userInfoContext)

  const modipass = () => {
      setSelectedModifyPass(true)
  }

  const modifyStyle = {
    display : userUpdateAt ? "block" : "none"
  }

  const getInfo = async () => {
    const result = await getUserInfo({isUser})
    setUserId(result.data.resultData.uid)
    setUserEmail(result.data.resultData.email)
    setUserName(result.data.resultData.nm)
    setUserCreateAt(result.data.resultData.createdAt)
    setUserUpdateAt(result.data.resultData.updatedAt)
  }
  useEffect(()=>{
    getUserInfo({isUser})
    getInfo()
  },[])

 return (
  <div className="infowrap">
   <div className="panel-group">
    <div className="panel panel-default">
      <div className="panel-heading">아이디</div>
      <div className="panel-body">{userId}</div>
    </div><br/>
    <div className="panel panel-default">
      <div className="panel-heading">이메일</div>
      <div className="panel-body">{userEmail}</div>
    </div><br/>
    <div className="panel panel-default">
      <div className="panel-heading">닉네임</div>
      <div className="panel-body">{userName}</div>
    </div><br/>
    <div className="panel panel-default">
      <div className="panel-heading">생성일자</div>
      <div className="panel-body">{userCreateAt}</div>
    </div><br/>
    <div className="panel panel-default" style={modifyStyle}>
      <div className="panel-heading">수정일자</div>
      <div className="panel-body">{userUpdateAt}</div>
    </div><br/>
    <div className="dropdown flex">
     <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
        정보수정
     <span className="caret"></span>
     </button>
     <ul className="dropdown-menu">
      <li><a href="#" onClick={()=>{modipass()}}>비밀번호수정</a></li>
     </ul>
     <div className="alert-wrap">
      <div className="alert-msg">
        {errMsg}
      </div>
     </div>
    </div>
   </div>
   <Drop
   selectedModifyPass={selectedModifyPass}
   setSelectedModifyPass={setSelectedModifyPass}
   setErrMsg={setErrMsg}
   setUserUpdateAt={setUserUpdateAt}
   />
  </div>
  )
}

export default UserInfo