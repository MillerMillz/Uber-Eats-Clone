import {Card,Descriptions,Divider, List, Button,Spin} from 'antd'
import dishes from "../../data/dishes.json"
import {useNavigate, useParams} from "react-router-dom"
import { useEffect,useState } from 'react'
import { get, post } from '../../apiCalls'
import apiRoutes from '../../apiRoutes'
 


const DetailedOrder = ()=>{
  const navigate = useNavigate();
  const [checkDecline,setCheckDecline] = useState(1);
  const [checkAccepted,setCheckAccepted] = useState(1);
 
  const {id} = useParams();
  const [theOrder,setTheOrder] = useState(null);
  const FetchOrderDishes = async () => {
    var data = await get(apiRoutes.getCustomerOrderDishes+id);
    console.log(data);
    setTheOrder(data);
  }
  const DeclineOrder = async () =>{
    theOrder.status="DECLINED_BY_RESTAURANT";
    var data = await post(apiRoutes.updateOrder,theOrder)
    console.log(data);
    setCheckDecline(3)
  }
  const AcceptOrder = async () =>{
    theOrder.status="COOKING";
    var data = await post(apiRoutes.updateOrder,theOrder)
    console.log(data);
    setCheckAccepted(5)
  }
  const OrderIsDone = async () =>{
    theOrder.status="READY_FOR_PICKUP";
    var data = await post(apiRoutes.updateOrder,theOrder)
    console.log(data);
    setCheckDecline(5)
  }
  
  useEffect(()=>{
    if(checkDecline!=1){
    navigate(-1);}
  },[checkDecline])
  useEffect(()=>{
    if(checkAccepted!=1){
      FetchOrderDishes();}
  },[checkAccepted]) 
  useEffect(() => {
    FetchOrderDishes();
  },[]);
  if(theOrder===null)
  {
    return <Spin size='large'/>
  }
    return(
        <Card title={`Order ${id}`} style={{margin:20}}>
        <Descriptions bordered column={{lg: 1,md: 1,sm: 1}}>
          <Descriptions.Item label="Customer"> {theOrder?.user?.name}</Descriptions.Item>
          <Descriptions.Item label="Customer Address"> {theOrder?.user?.address}</Descriptions.Item>
        </Descriptions>
        <Divider/>
        <List 
        dataSource={theOrder?.dishes}
        renderItem={(dishItem)=> (
          <List.Item>
            <div style={{fontWeight:'bold'}}>{dishItem.dish.name} x{dishItem.quantity}</div>
            
            <div>R{dishItem.dish.price}</div>
          </List.Item>
      )}/>
      <Divider/>
      <div style={styles.totalSumContainer}>
        <h2>Total:</h2>
        <h2 style={styles.totalPrice}>R {theOrder?.total.toFixed(2)}</h2>
      </div>
      <Divider/>
        
      
      {theOrder.status==="NEW" && <div style={styles.ButtonsContainer}>
          <Button block type='danger' size='large' onClick={()=>{DeclineOrder()}} style={styles.Button}>
            Decline Order
          </Button>
          <Button block type='primary' size='large' onClick={()=>{AcceptOrder()}} style={styles.Button}>
            Accept Order
          </Button>
      </div>}
        
      {theOrder.status==="COOKING" && 
      <Button block type='primary' size='large' onClick={()=>{OrderIsDone()}} >
           Food is done
          </Button>}
       </Card>
    )
}

const styles = {
    totalSumContainer:{
      flexDirection:'row',
      display: 'flex'
    },
    totalPrice:{
      marginLeft:'auto',
      fontWeight:'bold'
    },
    ButtonsContainer:{
      display:'flex',
      paddingBottom:30
    },
  Button:{
    marginRight:20,
   marginLeft:20
  }
  }
export default DetailedOrder;