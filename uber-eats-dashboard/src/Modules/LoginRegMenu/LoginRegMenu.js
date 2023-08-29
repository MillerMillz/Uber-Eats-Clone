
import { Layout,Image } from "antd";
import LoginSideMenu from "../../Components/LoginSideMenu/Index";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { Route,Routes } from "react-router-dom";
import App from "../../App";


const {Sider,Content} = Layout;
const LoginRegMenu = () => {

return(
    <Layout >
         <Sider style={{height:"100vh", backgroundColor:"green"}} >
          <Image src="https://logos-world.net/wp-content/uploads/2020/11/Uber-Eats-Symbol.jpg" preview={false} />
          <LoginSideMenu />  
        </Sider>
        <Layout style={{height:"100vh", backgroundColor:"#46d615",alignItems:'center'}}>
            <Content style={{width:'50%'}}>
             <Routes> 
                <Route path="/" element={<Login/>}/> 
                <Route path="signUp" element={<Register/>}/> 
                <Route path="app" element={<App/>}/>
             </Routes>  
            </Content>
        </Layout>
    </Layout>
)
}

export default LoginRegMenu;