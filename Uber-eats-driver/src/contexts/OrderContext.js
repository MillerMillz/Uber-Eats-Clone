import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { set } from "react-native-reanimated";
import apiRoutes from "../../apiRoutes"
import {get,post} from "../../apiCalls"

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const { dbCourier } = useAuthContext();
  const [order, setOrder] = useState();
  const [user, setUser] = useState();
  const [dishes, setDishes] = useState();
  const [orders, setOrders] = useState([]);

  const FetchOrders = async ()=>{
    
    var data = await get(apiRoutes.getOrdersByStatus+"READY_FOR_PICKUP")
    
    setOrders(data);

  }

  const fetchOrder = async (id) => {
    if (!id) {
      setOrder(null);
      return;
    }

    const fetchedOrder = await get(apiRoutes.getOrderbyID+id);
    console.log(apiRoutes.getOrderbyID+id)
    console.log(fetchedOrder)
    setOrder(fetchedOrder);

    console.log(apiRoutes.getDbUserByID+fetchedOrder.userID)
    var userData = await get(apiRoutes.getDbUserByID+fetchedOrder.userID);
    console.log(userData)
    setUser(userData);
    var orderDishes = await get(apiRoutes.getOrderDishes+fetchedOrder.id)
    console.log(orderDishes)
    setDishes(orderDishes);
  };

  const acceptOrder = async () => {
    // update the order, and change status, and assign the courier
    console.log("hit")
    var data = await post(apiRoutes.updateOrderStatus,
       {
        Id:order.id,
      
        Status : "ACCEPTED",
        CourierID : dbCourier.id
      })
      console.log(data)
      setOrder(data);
     
  };

  const pickUpOrder = async () => {
    // update the order, and change status, and assign the courier
    console.log("hit")
    var data = await post(apiRoutes.updateOrderStatus,
       {
        Id:order.id,
      
        Status : "PICKED_UP",
        CourierID : dbCourier.id
      })
      console.log(data)
      setOrder(data);
   
  };

  const completeOrder = async () => {
    // update the order, and change status, and assign the courier
    console.log("hit")
    var data = await post(apiRoutes.updateOrderStatus,
       {
        Id:order.id,
      
        Status : "COMPLETED",
        CourierID : dbCourier.id
      })
      console.log(data)
      setOrder(data);
  };

  return (
    <OrderContext.Provider
      value={{
        acceptOrder,
        order,
        orders,
        user,
        dishes,
        FetchOrders,
        fetchOrder,
        pickUpOrder,
        completeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
