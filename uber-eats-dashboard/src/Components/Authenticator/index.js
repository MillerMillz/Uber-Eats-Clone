import { useAuthContext } from "../../Contexts/AuthContext";
import LoginRegMenu from "../../Modules/LoginRegMenu/LoginRegMenu";
import App from "../../App";
import Settings from "../../Modules/Settings";


const Authenticator = () =>{
    
    const {authUser,Restaurant} = useAuthContext();
    console.log("The check")
    console.log(authUser);
    console.log("=============================")
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