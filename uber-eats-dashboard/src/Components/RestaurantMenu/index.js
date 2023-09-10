import {Card, Table, Button,Popconfirm, message,Image} from 'antd'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Contexts/AuthContext';
import apiRoutes from '../../apiRoutes';
import { get, post } from '../../apiCalls';
import {useEffect,useState} from "react"
import PopUp from '../Popup';
import deleteIcon from "./../../data/assets/deleteIcon.png"


const RestaurantMenu = () =>{
    const navigate=useNavigate();
    const {Restaurant} = useAuthContext();
    const [trigger,setTrigger] = useState(false);

    const [restuDishes,setRestuDishes] = useState([]);
    const [deletedItem,setDeletedItem] = useState(null)
    const FetchMenu = async () => {
        var data = await get(apiRoutes.getRestuDishes+Restaurant.id)
        console.log(data);
        setRestuDishes(data);
    }
    const DeleteItem = async (item)=>{
        var data = await post(apiRoutes.RemoveDish,item)
        console.log(data);
        setDeletedItem(data);
        if(data.success)
        {
            setTrigger(true);
        }
    }
    useEffect(()=>{
        FetchMenu();
    },[deletedItem])
    useEffect(()=>{
        FetchMenu();
    },[])
    const tableColumns = [
        {
            title:"Menu Item",
            dataIndex:"name",
            key:"name",
        },
        {
            title:"Price",
            dataIndex:"price",
            key:"price",
            render:(price)=>`R ${price}`
        },
        {
            title:"Action",
            key:"action",
            render:(_,item) => 
            <Popconfirm placement='topLeft' title={"Are you sure you want to delete this menu item"} onConfirm={()=>{DeleteItem(item)}} okText="Yes" cancelText="No">
                <Button danger>Remove</Button>
            </Popconfirm>
        }

    ];

    const renderNewItemButton = () =>
  (
    <Button type='primary' onClick={()=>navigate("Create")}>New Dish</Button>
  )
    

    return(
        <div>
            <Card title={"Menu"} style={{margin:20}} extra={renderNewItemButton()}> 
                <Table dataSource={restuDishes} columns={tableColumns} rowKey="id"/>
            </Card>
            <PopUp trigger={trigger} setTrigger={setTrigger} >
                <div style={{width:'65%',float:"left"}} >
                    <h3>Notification</h3>
                    <p style={{position:"relative", paddingTop:"10%",fontWeight:'bold',fontSize:25}}>succesfully removed</p>
                </div>
                <div style={{width:'35%',float:'right'}}>
                    <Image src={deleteIcon} preview={false}></Image>
                </div>
            </PopUp>
        </div>)
};
export default RestaurantMenu;