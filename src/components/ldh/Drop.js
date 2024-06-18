import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { putUserPass } from "../../apis/ldh/apiuser"

const Drop = ({ selectedModifyPass, setSelectedModifyPass, setErrMsg, setUserUpdateAt }) => {

  const [emptyPass, setEmptyPass] = useState("")
  const [emptyModiPass, setEmptyModiPass] = useState("")
  const [emptyDuplPass, setEmptyDuplPass] = useState("")
  const navi = useNavigate()

  const reqData = {
    upw : emptyPass,
    newPw : emptyModiPass
  }

  const isPass = async () => {
    if(!emptyPass || !emptyModiPass || !emptyDuplPass){
      setErrMsg("빈칸을 모두 입력해주세요")
    }
    if(emptyModiPass !== emptyDuplPass){
      setErrMsg("새 비밀번호를 확인해주세요")
    }
    if(emptyPass && emptyPass == (emptyDuplPass || emptyModiPass)){
      setErrMsg("현재 비밀번호와 새 비밀번호가 일치합니다")
    }
    if(emptyPass && 
      emptyModiPass && 
      emptyModiPass===emptyDuplPass && 
      emptyPass !== (emptyDuplPass || emptyModiPass)){
      setErrMsg("")
      const result = await putUserPass(reqData)
      console.log(result)
      if(result.data.resultData===1){
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        alert("수정완료")
        setUserUpdateAt(formattedTime)
        setSelectedModifyPass(false)
        setEmptyDuplPass()
        setEmptyModiPass()
        setEmptyPass()
        localStorage.setItem("user", "");
        navi("/login")
      }
    }
  }

  return selectedModifyPass ? (
    <form>
     <div className="form-group">
      <label htmlFor="usr">비밀번호</label>
      <input 
      type="password" 
      className="form-control" 
      id="usr"
      value={emptyPass}
      onChange={(e)=>{setEmptyPass(e.target.value)}}
      />
     </div>
     <div className="form-group">
      <label htmlFor="pwd">새 비밀번호</label>
      <input 
      type="password" 
      className="form-control" 
      id="pwd"
      value={emptyModiPass}
      onChange={(e)=>{setEmptyModiPass(e.target.value)}}
      />
     </div>
     <div className="form-group">
      <label htmlFor="pwdconfirm">새 비밀번호 확인</label>
      <input 
      type="password" 
      className="form-control" 
      id="confirm"
      value={emptyDuplPass}
      onChange={e=>setEmptyDuplPass(e.target.value)}
      />
     </div>
     <button type="button" className="btn btn-primary" onClick={()=>{isPass()}}
     >수정</button>
    </form>
  ) : null
}

export default Drop