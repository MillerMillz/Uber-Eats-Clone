import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import apiRoutes from "../../apiRoutes";
import {post,get} from '../../apiCalls'

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();

  const [restaurant, setRestaurant] = useState(null);
  const [basket, setBasket] = useState(null);
  const [basketDishes, setBasketDishes] = useState([]);
  

  const totalPrice = basketDishes.reduce(
    (sum, basketDish) => sum + basketDish.quantity * basketDish.dish.price,
    restaurant?.deliveryFee
  );
  const FetchBasketByIDs = async (user,restu) =>{
    const Basketdata = await get(apiRoutes.getBasketByIDs+user.id+"/"+restu.id);
    setBasket(Basketdata);
  }
 

  const FetchBasketDishes = async (id) =>{
    const BDish = await get(apiRoutes.getBasketDishes+id);
    setBasketDishes(BDish);
  }
 
 
  useEffect(() => { 
    if(restaurant){
    FetchBasketByIDs(dbUser,restaurant);}
  }, [dbUser, restaurant]);

  useEffect(() => {
    if (basket) {
       FetchBasketDishes(basket.id);
    }
  }, [basket]);

  const addDishToBasket = async (dish, quantity) => {
   
    // get the existing basket or create a new one
    let theBasket =basket.id===-1 ? (await createNewBasket()) : basket;
    // create a BasketDish item and save to Datastore
    const newDish = await post(apiRoutes.addDishToBasket,{
        quantity: quantity, 
        dish: dish,
        basketID: theBasket.id 
    }); 
     

    setBasketDishes([...basketDishes, newDish]);
  };

  const createNewBasket = async () => {
    const newBasket = await post(apiRoutes.addBasket,{
        userID: dbUser.id,
        restaurantID: restaurant.id 
    });
 
    setBasket(newBasket);
    return newBasket;
  };

  return (
    <BasketContext.Provider
      value={{
        addDishToBasket,
        setRestaurant,
        restaurant,
        basket,
        basketDishes,
        totalPrice,
        setBasket,
        setBasketDishes
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
