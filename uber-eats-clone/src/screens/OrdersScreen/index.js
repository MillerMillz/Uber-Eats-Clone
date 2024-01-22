import { useFocusEffect } from "@react-navigation/native";
import { View, Text, FlatList } from "react-native";
import react from "react";
import OrderListItem from "../../components/OrderListItem";
import { useOrderContext } from "../../contexts/OrderContext";
import { useAuthContext } from "../../contexts/AuthContext";

const OrderScreen = () => {
  const {dbUser} = useAuthContext();
  const { orders,FetchOrders } = useOrderContext();

  useFocusEffect(
    react.useCallback(()=>{
      FetchOrders(dbUser)
     
    },[])
  )
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
};

export default OrderScreen;
