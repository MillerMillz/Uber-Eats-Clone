import { View, Text, Image, FlatList,ActivityIndicator } from "react-native";
import BasketDishItem from "../../components/BasketDishItem";
import styles from "./styles";
import { useOrderContext } from "../../contexts/OrderContext";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";



const OrderDetailsHeader = ({ order }) => {
  const [time,setTime] = useState("")
  useEffect(()=>{
    if(order.orderTime<60)
    {
      setTime(order.orderTime+" Minutes ago")
    }
    else if(order.orderTime<1440)
    { 
      var calc = (order.orderTime/60).toFixed(0);
      setTime(calc+" Hours ago")
    }else
    {
      var calc = (order.orderTime/1440).toFixed(0);
      setTime(calc+" Days ago")
    }
  },[])
  return (
    <View>
      <View style={styles.page}>
        <Image source={{ uri: order.restuarant.imageSource }} style={styles.image} />

        <View style={styles.container}>
          <Text style={styles.title}>{order.restuarant.name}</Text>
          <Text style={styles.subtitle}>{order.status} &#8226; {time}</Text>

          <Text style={styles.menuTitle}>Your orders</Text>
        </View>
      </View>
    </View>
  );
};

const OrderDetails = ({ id }) => {
  const [order, setOrder] = useState();
  const { getOrder } = useOrderContext();

  
  useEffect(() => {
   if(id){
    getOrder(id).then(setOrder);}
  }, []);

  if (!order) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }
  return (
    <FlatList
      ListHeaderComponent={() => <OrderDetailsHeader order={order} />}
      data={order.dishes}
      renderItem={({ item }) => <BasketDishItem basketDish={item} />}
    />
  );
};

export default OrderDetails;
