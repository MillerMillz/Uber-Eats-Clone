import { useAuthContext } from "../../Contexts/AuthContext";
import LoginRegMenu from "../../Modules/LoginRegMenu/LoginRegMenu";
import App from "../../App";
import Settings from "../../Modules/Settings";


const Authenticator = () =>{
    
    const {authUser,Restaurant} = useAuthContext();
  
   if(authUser===null)
   {
    return(
        
        <LoginRegMenu/>
    )
   }
   else{
    
    return(
        <App/>
    )
   

}

};

export default Authenticator;