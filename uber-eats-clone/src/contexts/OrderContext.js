import { createContext, useContext, useState, useEffect } from "react";
import * as signalR from "../../lib/signalr/dist/browser/signalr";
import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketContext";
import {get,post} from "../../apiCalls"
import apiRoutes from "../../apiRoutes";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const { dbUser,authUser } = useAuthContext();
  const { restaurant, totalPrice, basketDishes, basket, setBasket,setBasketDishes } = useBasketContext();
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
    <OrderContext.Provider value={{ createOrder, orders, getOrder,FetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
