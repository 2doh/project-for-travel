import { createContext, useEffect, useState } from "react";

export const userInfoContext = createContext();
export const UserInfoProvider = ({ children }) => {
  const [isUser, setIsUser] = useState("");

  useEffect(() => {
    const tempUser = localStorage.getItem("user");
    if (tempUser !== null || tempUser !== "") {
      setIsUser(tempUser);
    }
  }, []);
  return (
    <userInfoContext.Provider value={{ isUser, setIsUser }}>
      {children}
    </userInfoContext.Provider>
  );
};
