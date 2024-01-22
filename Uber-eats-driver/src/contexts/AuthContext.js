import { createContext, useEffect, useState, useContext } from "react";
import {get} from "../../apiCalls"
import apiRoutes from "../../apiRoutes"


const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbCourier, setDbCourier] = useState(null);
  const sub = authUser?.id;
  const FetchAuthUser = async () =>{
    const Authdata = await get(apiRoutes.getAuthUser);
    setAuthUser(Authdata);
  }

  const FetchdbCourier = async (id) =>{
    const dbCouriedata = await get(apiRoutes.getDbCourier+id);
    setDbCourier(dbCouriedata);
  }

  useEffect(() => {
    FetchAuthUser();
  }, []);

  useEffect(() => {
    
    FetchdbCourier(sub);
  }, [sub]);
  return (
    <AuthContext.Provider value={{ authUser, dbCourier, sub, setDbCourier,setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
