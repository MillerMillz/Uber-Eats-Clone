import {Form,Input,Button,Card} from 'antd'
import { useState,useEffect } from 'react'
import apiRoutes from '../../apiRoutes';
import jwt from "jwt-decode";
import {get,post} from '../../apiCalls';
import { useAuthContext } from '../../Contexts/AuthContext';
import {useNavigate} from "react-router-dom";

const Register =() =>{
 
    const {setAuthUser} = useAuthContext();
     const navigate = useNavigate();
    const [Jwt,setJwt] = useState('');
    const [user,setUser] = useState(null);
    const [error,setError] = useState();
    const [checkReg,setCheckReg] = useState(false);
    const [checkLogin,setCheckLogin] = useState(null);
   
    const [checkUser,setCheckUser] = useState(false);
   
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const Login = async ()=>{
        localStorage.removeItem('jwt')
        var data = await post(apiRoutes.login,{email:email,
        password:password });
       const decoded = jwt(data.token);
        setJwt(data.token);
        localStorage.setItem('jwt',data.token);
        setCheckUser(true);
    }
    const Register = async () => {
        var data = await post(apiRoutes.register,{email:email,password:password});
        if(data.success)
        {
           setCheckLogin(true);
        }
        else
        {
            setError(data.errors[0])
        }
    }
    const QueryUser = async () =>{
      
       

         var data = await get(apiRoutes.getAuthUser+Jwt)
         
        

        if(data!=null)
        {
            setAuthUser(data);
            setUser(data);
        
            
               
        }
        else{
            console.log("false")
        }
    }
   
    const CheckPasswords = () =>{

        if(!email && !password && !confirmPassword)
        {
            setError("All fields are empty, please populate all fields to proceed");
        }
        else if(!email && !password)
        {
            setError("Email and Password Required")
        }
        else if(!email && !confirmPassword)
        {
            setError("Email and Confirm Password field Required")
        }
        else if(!confirmPassword && !password)
        {
            setError("Please fill in both passwords")
        }
        else if(!email)
        {
            setError("Email Required")
        }
        else if(!password)
        {
            setError("Please fill in both passwords")
        }
        else if(!confirmPassword)
        {
            setError("Please fill in both passwords")
        }
        else if(password!==confirmPassword)
        {
            setError("Password Not confirmed, Passwords Don't match")
        }
        else
        {
            
            setCheckReg(true);
            
        }
    }
    useEffect(()=>{
        if(checkLogin){
        Login();}
    },[checkLogin]);
    useEffect(()=>{
        if(checkReg){
        Register();}
    },[checkReg]);
    useEffect(()=>{
        if(checkUser){
        QueryUser();}
    },[checkUser]);
    useEffect(()=>{
       if(user){
        navigate(-1);}
    },[user]);
    const renderWarning = () =>
    (
      <h1 style={{color:'red'}}>{error}</h1>
    ) 
      

    return(
        <Card title="Register" style={{margin:20}} extra={renderWarning()}>
        <Form layout='vertical' wrapperCol={{span: 8}} onFinish={()=>CheckPasswords()}>
            <Form.Item label="Admin Email" required>
                <Input onChange={(e)=>setEmail(e.target.value)} placeholder='Enter admin email'></Input>
            </Form.Item>
            <Form.Item label="Password" required>
                <Input type='password' onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter Password'/>
            </Form.Item>
            <Form.Item label="Confirm Password" required>
                <Input type='password' onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder='Re-enter Password'/>
            </Form.Item>
            <Form.Item >
                <Button type='primary' htmlType='submit'>Submit</Button>
            </Form.Item>
        </Form>
    </Card>
    )
}

export default Register;