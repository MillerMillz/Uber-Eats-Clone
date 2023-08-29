import { View, Text, StyleSheet, FlatList,Pressable,ActivityIndicator } from "react-native";
import BasketDishItem from "../../components/BasketDishItem";
import {get} from "../../../apiCalls"
import apiRoutes from "../../../apiRoutes";
import { useBasketListContext } from "../../contexts/BasketListContext";
import { useOrderListContext } from "../../contexts/OrderListContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import {useState,useEffect} from "react"

const BasketFromList = () => {
  const { setRestaurant,restaurant,basketDishes,setBasketDishes,basket,setBasket } = useBasketListContext();
  const { createOrder } = useOrderListContext();
 
 
 
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;
  const [totalPrice,setTotalPrice] = useState(null);
  const FetchRestuarant = async ()=>{
    console.log(basket)
    console.log("------------")
    console.log("2")
    console.log("-----------")
    var data = await get(apiRoutes.getRestuarant+basket?.restaurantID)
    console.log(data)
    setRestaurant(data);
  }
  // const FetchBasketDishes = async ()=>{
  //   console.log("------------")
  //   console.log("3")
  //   console.log("-----------")
  //  var data = await get(apiRoutes.getBasketDishes+basket?.id)
  //  console.log(data)
  //  setBasketDishes(data);
  // }
  const CalculateTotal = () =>{
    setTotalPrice( basketDishes.reduce(
      (sum, basketDish) => sum + basketDish.quantity * basketDish.dish.price,
      restaurant?.deliveryFee
    ));
  }
  const FetchBasket =async()=>{
    console.log(apiRoutes.getBasket+id)
    var data=await get(apiRoutes.getBasket+id);
    console.log("+++++++++++++++++++++++")
    console.log("1")
    console.log("+++++++++++++++++++++++")
    console.log(data)
    setBasket(data);
    
  }
  const onCreateOrder = async () => {
    setRestaurant(restaurant);
    await createOrder();
    navigation.goBack();
  };
  useEffect(()=>{
    
          FetchBasket();
    
  },[])
  useEffect(()=>{
    if(basketDishes){
    CalculateTotal();
    console.log("hit") 
    }
  },[basketDishes])
  useEffect(()=>{ 
    console.log("in uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
    if(basket){
      console.log("in uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
    FetchRestuarant();
   // FetchBasketDishes();
  }
  },[basket])
 
  if (!restaurant || !basket || !totalPrice) {
    console.log("===========================================================")
    console.log(restaurant)
    console.log(basket)
    console.log(totalPrice)
    console.log("===========================================================")
    return <ActivityIndicator size={"large"} color="gray" />;
  }
  return (
    <View style={styles.page}>
      <Text style={styles.name}>{restaurant?.name}</Text>

      <Text style={{ fontWeight: "bold", marginTop: 20, fontSize: 19 }}>
        Your items
      </Text>

      <FlatList
        data={basketDishes}
        renderItem={({ item }) => <BasketDishItem basketDish={item} />}
      />

      <View style={styles.separator} />

      <Pressable onPress={onCreateOrder} style={styles.button}>
        <Text style={styles.buttonText}>
          Create order &#8226; R{totalPrice.toFixed(2)}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 40, // temp fix
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 10,
  },
  description: {
    color: "gray",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 25,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  quantityContainer: {
    backgroundColor: "lightgray",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});

export default BasketFromList;
