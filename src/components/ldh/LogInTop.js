const LogInTop = () => {
  return (
    <>
      <div className="input-id">
        <img
          src="../../images/ldh/1564534_customer_man_user_account_profile_icon.svg"
          className="profileico"
        />
        <div className="id-inner">
          <form className="idform">
            <input type="text" placeholder="아이디" className="uid" />
          </form>
        </div>
        <img
          src="../../images/ldh/10758948_x_circle_icon.svg"
          className="cleanupico-id"
        />
      </div>
      <div className="input-pass">
        <img
          src="../../images/ldh/3643767_key_keys_main_password_privilege_icon.svg"
          className="keyico"
        />
        <div className="pass-inner">
          <form className="passform">
            <input
              type="password"
              placeholder="비밀번호"
              className="password"
            />
          </form>
        </div>
        <img
          src="../../images/ldh/10758948_x_circle_icon.svg"
          className="cleanupico-pass"
        />
      </div>
    </>
  );
};

export default LogInTop;
