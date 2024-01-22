import { Card,Table,Tag } from "antd";
import { useState,useEffect } from "react";
import orders from "../../data/orders.json"
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Contexts/AuthContext";
import apiRoutes from "../../apiRoutes";
import { get } from "../../apiCalls"
import * as signalR from "@microsoft/signalr";

const Orders = () => {
    const {Restaurant,authUser} = useAuthContext();
    const navigate = useNavigate();
    const [restuOrders,setRestuOrders] = useState([]);
    const [connection,setConnection] = useState();
    
    const FetchOrders = async () => {
        var data = await get(apiRoutes.getRestaurantOrders+Restaurant.id)
        setRestuOrders(data);
    }

    const connectToHub = async () =>{
        try{ 
            var hubConnection = new signalR.HubConnectionBuilder().withUrl("http://192.168.0.151:7088/ChatHub").withAutomaticReconnect().build();
            hubConnection.on("RecievedMessage",function(message){
                  
                FetchOrders();
                
                })

                setConnection(hubConnection);
                await hubConnection.start();
                await hubConnection.invoke("AssignGroup",JSON.stringify({Email:authUser.email,Group:"Order"}));
        }
        catch(e)
        {
            console.log(e);
        }
    }
   
    useEffect(()=>{
        connectToHub();
        FetchOrders();
    },[]);
   
    const renderOrderStatus = (orderStatus) => {
        if(orderStatus==='NEW')
        {
            return <Tag color={'blue'}>{orderStatus}</Tag>
        }
        if(orderStatus==='COOKING')
        {
            return <Tag color={'green'}>{orderStatus}</Tag>
        }
        if(orderStatus==='READY_FOR_PICKUP')
        {
            return <Tag color={'orange'}>{orderStatus}</Tag>
        }
        if(orderStatus==='Declined')
        {
            return <Tag color={'red'}>{orderStatus}</Tag>
        }
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
    return(
     <Card title="Orders" style={{margin:20}}>
        <Table dataSource={restuOrders}
        columns={tableColumns}
        rowKey="orderID"
        onRow={(orderItem) => ({
            onClick: () => navigate(`order/${orderItem.id}`)
    })}/>
     </Card>
    )
}

export default Orders;