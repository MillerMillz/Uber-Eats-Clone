import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect,useState } from "react";

const OrderListItem = ({ order }) => {
  const navigation = useNavigation();
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
  const onPress = () =>{
    navigation.navigate("Order", { id: order.id },);
  };
  
 
  return (
    <Pressable
      onPress={onPress}
      style={{ flexDirection: "row", margin: 10, alignItems: "center" }}
    >
      <Image
        source={{ uri: order.restuarant.imageSource }}
        style={{ width: 75, height: 75, marginRight: 5 }}
      />

      <View>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          {order.restuarant.name}
        </Text>
        <Text style={{ marginVertical: 5 }}> {order.noItems} items &#8226; R{order.total.toFixed(2)}</Text>
        <Text>{time} &#8226; {order.status} </Text>
      </View>
    </Pressable>
  );
};

export default OrderListItem;
