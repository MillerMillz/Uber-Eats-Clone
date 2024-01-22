import { createContext, useEffect, useState, useContext } from "react";
import apiRoutes from "../../apiRoutes";
import {get} from "../../apiCalls"


const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const sub = authUser?.id;
  const FetchAuthUser = async () =>{
    const Authdata = await get(apiRoutes.getAuthUser);    
    setAuthUser(Authdata);
    
  }

  const FetchdbUser = async () =>{
    
    const dbUserdata = await get(apiRoutes.getDbUser+sub);
    setDbUser(dbUserdata);
  }

  useEffect(() => {
    FetchAuthUser();
  }, []);

  useEffect(() => {
    if(authUser){
    FetchdbUser();}
  }, [sub]);

  return (
    <AuthContext.Provider value={{ authUser, dbUser, sub, setDbUser,setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);