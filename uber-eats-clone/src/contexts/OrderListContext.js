import { createContext, useContext, useState, useEffect } from "react";

import { useAuthContext } from "./AuthContext";
import { useBasketListContext } from "./BasketListContext";
import {get,post} from "../../apiCalls"
import apiRoutes from "../../apiRoutes";
import * as signalR from "../../lib/signalr/dist/browser/signalr"

const OrderListContext = createContext({});

const OrderListContextProvider = ({ children }) => {
  const { dbUser,authUser } = useAuthContext();
  const { restaurant, totalPrice, basketDishes, basket, setBasket,setBasketDishes } = useBasketListContext();
  var hubConnection = new signalR.HubConnectionBuilder().withUrl("http://192.168.0.151:7088/ChatHub").withAutomaticReconnect().build();


  const [orders, setOrders] = useState([]);
  const FetchOrders = async (user) => {
    const orderData = await get(apiRoutes.getUserOrders+user.id)
    setOrders(orderData)
  }

  useEffect(() => {
    FetchOrders(dbUser);
  }, [dbUser]);

  const createOrder = async () => {
    console.log("from list")
    // create the order
    const newOrder = await post(apiRoutes.AddOrder,
      {
        userID: dbUser.id,
        restaurantID: restaurant.id,
        status: "NEW",
        total: totalPrice,
        noItems:basketDishes.length
      }
    );

    try{
      await hubConnection.start();
      await hubConnection.invoke("AssignGroup",JSON.stringify({Email:authUser.email,Group:"Order"}));
       
     await hubConnection.invoke("SendMessageAsync","New Dish");
      hubConnection.stop();
     } catch(e)
     {
       console.log(e);
     }
    

    
    // add all basketDishes to the order
    await Promise.all(
      basketDishes.map((basketDish) =>
        post(apiRoutes.addOrderDish,
          {
            quantity: basketDish.quantity,
            orderID: newOrder.id,
            Dish: basketDish.dish,
          }
        )
        
      )
    );
          
    // delete basket
   
    await post(apiRoutes.DeleteBasket,basket);
    setBasket(null);
    setBasketDishes([]);

    setOrders([...orders, newOrder]);
  };

  const getOrder = async (id) => {
    const order = await get(apiRoutes.getOrderbyID+id);
    const orderDishes = await get(apiRoutes.getOrderDishes+id);

    return { ...order, dishes: orderDishes };
  };

  return (
    <OrderListContext.Provider value={{ createOrder, orders, getOrder,FetchOrders }}>
      {children}
    </OrderListContext.Provider>
  );
};

export default OrderListContextProvider;

export const useOrderListContext = () => useContext(OrderListContext);
