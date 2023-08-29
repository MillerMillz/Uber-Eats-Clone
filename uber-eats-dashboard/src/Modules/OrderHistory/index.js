import { Card,Table,Tag,Spin } from "antd";
import { useEffect, useState } from "react";
import { get } from "../../apiCalls";
import apiRoutes from "../../apiRoutes";
import {useAuthContext} from "../../Contexts/AuthContext"

const OrderHistory = () =>{
    
    const {Restaurant} = useAuthContext();
    const [OrderHistory,setOrderHistory] = useState([]);
    console.log(Restaurant);
    const FetchOrders = async () =>{
        var data = await get(apiRoutes.OrderHistory+Restaurant.id);
        console.log(data);
        setOrderHistory(data);
    }
    useEffect(()=>{
        FetchOrders();
    },[])
    const renderOrderStatus = (orderStatus) => {
        if(orderStatus==='DELIVERED')
        {
            return <Tag color={'green'}>{orderStatus}</Tag>
        }
        
            return <Tag color={'red'}>{orderStatus}</Tag>
       
        
    };
    const tableColumns = [
        {
            title:'Order ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title:'Delivery Address',
            dataIndex: 'deliveryAddress',
            key : 'deliveryAddress'
        },
        {
            title:'Price',
            dataIndex:'total',
            key : 'total',
            render: (price) =>  `R ${price.toFixed(2)} `
        },
        {
            title:'Status',
            dataIndex:'status',
            key: 'status',
            render : renderOrderStatus
        }
    ];
    if(OrderHistory===[])
    {
        return <Spin size="large"/>
    }
    return(
     <Card title="History Orders" style={{margin:20}}>
        <Table dataSource={OrderHistory}
        columns={tableColumns}
        rowKey="orderID"
     />
     </Card>)
};
export default OrderHistory;