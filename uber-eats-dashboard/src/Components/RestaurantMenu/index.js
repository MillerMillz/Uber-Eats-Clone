import {Card, Table, Button,Popconfirm, message} from 'antd'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Contexts/AuthContext';
import apiRoutes from '../../apiRoutes';
import { get, post } from '../../apiCalls';
import {useEffect,useState} from "react"


const RestaurantMenu = () =>{
    const navigate=useNavigate();
    const {Restaurant} = useAuthContext();
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
    <Card title={"Menu"} style={{margin:20}} extra={renderNewItemButton()}> 
       <Table dataSource={restuDishes} columns={tableColumns} rowKey="id"/>
    </Card>)
};
export default RestaurantMenu;