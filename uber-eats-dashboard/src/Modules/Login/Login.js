
import {Form,Input,Button,Card} from 'antd'
import { useState,useEffect } from 'react'
import apiRoutes from '../../apiRoutes';
import {get,post} from '../../apiCalls'
import { useAuthContext } from '../../Contexts/AuthContext';
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';
import jwt from "jwt-decode";




const Login = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState(null);
    const [email,setEmail] = useState('');
    const [sub,setSub] = useState();
    const [Jwt,setJwt] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState();
    const {setAuthUser,setRestaurant,Restaurant} = useAuthContext();
   const cookies = new Cookies();
    const FetchRestaurant =  async (id) => {
        const RestaurantData = await get(apiRoutes.getRestuarantByAdminID+id);
        setRestaurant(RestaurantData);
    }

    const onSubmit = async () => {
        
        localStorage.removeItem('jwt')
        var data = await post(apiRoutes.login,{email:email,
        password:password });
       console.log(data)
      
    //  localStorage.setItem('jwt',data.token)
        if(data.token==="Invalid User name")
        {
            setError("Invalid user-name please re-enter username")
        }else if(data.token==="Wrong password")
        {
            setError("Invalid password please re-enter password")
        } else
        {
        const decoded = jwt(data.token);
        console.log(decoded);
        localStorage.setItem('jwt',data.token);
        setJwt(data.token);
        }

        
    }
    const QueryUser = async () =>{
      
       

        console.log(Jwt)
         var data = await get(apiRoutes.getAuthUser+Jwt)
         console.log(data)
         setSub(data?.id)
        

        if(data!=null)
        {
           
            setAuthUser(data);
            setUser(data);
            if(!email){}
            
               
        }
        else{
            console.log("false")
        }
    }
    useEffect(()=>{
        if(Jwt!='')
        {
            QueryUser();
        }
    },[Jwt])
     useEffect(()=>{
        if(sub)
        {
        FetchRestaurant(sub);
        }
     },[sub])
    useEffect(()=>{
       
        navigate(-1);
    },[user]);
    const renderWarning = () =>
    (
      <h1 style={{color:'red'}}>{error}</h1>
    )
      
  
    //   return(
    //   <Card title={"Menu"} style={{margin:20}} extra={renderNewItemButton()}> 

return(
 
        <Card title="LOGIN" style={{margin:20}} extra={renderWarning()}>
            <Form layout='vertical' wrapperCol={{span: 8}} onFinish={onSubmit}>
                <Form.Item label="Admin Email" required>
                    <Input placeholder='Enter admin email' onChange={(e)=>setEmail(e.target.value)}></Input>
                </Form.Item>
                <Form.Item label="Password" required>
                    <Input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
                </Form.Item>
              
                <Form.Item >
                    <Button type='primary'htmlType='submit'>Login</Button>
                </Form.Item>
            </Form>
        </Card>

      
)
}

export default Login;