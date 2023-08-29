import { createContext, useContext, useState, useEffect } from "react";

import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketContext";
import {get,post} from "../../apiCalls"
import apiRoutes from "../../apiRoutes";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const { restaurant, totalPrice, basketDishes, basket, setBasket,setBasketDishes } = useBasketContext();

  const [orders, setOrders] = useState([]);
  const FetchOrders = async (user) => {
    const orderData = await get(apiRoutes.getUserOrders+user.id)
    setOrders(orderData)
  }

  useEffect(() => {
    FetchOrders(dbUser);
  }, [dbUser]);

  const createOrder = async () => {
    console.log(restaurant)
    console.log({
      userID: dbUser.id,
      restaurantID: restaurant.id,
      status: "NEW",
      total: totalPrice,
      noItems:basketDishes.length
    })
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

    
      console.log(basketDishes);
    // add all basketDishes to the order
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
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
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    console.log(basket)
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
