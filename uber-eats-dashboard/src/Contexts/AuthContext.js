import { createContext,useEffect,useState,useContext } from "react";
import apiRoutes from "../apiRoutes";
import {get} from "../apiCalls"

const AuthContext = createContext({});

const AuthContextProvider = ({children}) =>{
    const [authUser,setAuthUser] = useState(null);
    const [Restaurant,setRestaurant] = useState(null);
    const sub = authUser?.id;

    const FetchUser = async () =>{
        var token = localStorage.getItem('jwt')
        const UserData = await get(apiRoutes.getAuthUser+token);
        setAuthUser(UserData);
    }

    const FetchRestaurant =  async (id) => {
        const RestaurantData = await get(apiRoutes.getRestuarantByAdminID+id);
        setRestaurant(RestaurantData);
    }
    
    useEffect(()=>{
        FetchUser();
    },[]);
    useEffect(()=>{
        FetchRestaurant(sub);
    },[sub]);

   return(
    <AuthContext.Provider value={{authUser,Restaurant,sub,setAuthUser,setRestaurant}}>
        {children}
    </AuthContext.Provider>
   );

};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);