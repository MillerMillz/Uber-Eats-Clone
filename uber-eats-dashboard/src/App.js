import DetailedOrder from "./Modules/DetailedOrder/Index";
import Orders from "./Modules/Orders/Index"
import {Route,Routes} from "react-router-dom"
import {Layout,Image} from 'antd';
import SideMenu from './Components/SideMenu'
import RestaurantMenu from "./Components/RestaurantMenu";
import CreateMenuItem from "./Modules/CreateMenuItem";
import Settings from "./Modules/Settings";
import OrderHistory from "./Modules/OrderHistory";

const {Sider,Content,Footer} = Layout;

function App() {
  return (
    <Layout>
        <Sider style={{height:"100vh", backgroundColor:"white"}}>
          <Image src="https://logos-world.net/wp-content/uploads/2020/11/Uber-Eats-Symbol.jpg" preview={false} />
          <SideMenu/>
        </Sider>
        <Layout>
          <Content >
           <Routes> 
            <Route path="orders" element={<Orders/>}/> 
            <Route path="orders/order/:id" element={<DetailedOrder/>}/> 
            <Route path="menu" element={<RestaurantMenu/>}/> 
            <Route path="order-history" element={<OrderHistory/>}/> 
            <Route path="menu/Create" element={<CreateMenuItem/>}/>
            <Route path="settings" element={<Settings/>}/> 
         </Routes>  
          </Content>
          <Footer style={{textAlign:'center'}}>
            Uber Eats Restuarant Dashboard @2023 By Mihlali Mkile
          </Footer>
        </Layout>
    </Layout>
  // <Routes> 
  //   <Route path="" element={<Orders/>}/> 
  //   <Route path="order/:id" element={<DetailedOrder/>}/> 
  // </Routes>  
  );
}



export default App;
