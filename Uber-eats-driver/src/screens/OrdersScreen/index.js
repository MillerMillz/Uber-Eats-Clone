import { useRef, useMemo, useState, useEffect } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import OrderItem from "../../components/OrderItem";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { Entypo } from "@expo/vector-icons";
import apiRoutes from "../../../apiRoutes"
import {get} from "../../../apiCalls"
import { useOrderContext } from "../../contexts/OrderContext";



const OrdersScreen = () => {
  
  const bottomSheetRef = useRef(null);
  const { width, height } = useWindowDimensions();

  const snapPoints = useMemo(() => ["12%", "95%"], []);
   const {orders,FetchOrders}=useOrderContext();
  useFocusEffect(
    React.useCallback(()=>{
      FetchOrders();
     
    },[])
  )

 /*  useEffect(() => {
  
  }, []); */

  

  return (
    <View style={{ backgroundColor: "lightblue", flex: 1 }}>
      <MapView
        style={{
          height,
          width,
        }}
        showsUserLocation
        followsUserLocation
      >
        {orders.map((order) => (
          <Marker
            key={order?.id}
            title={order?.restuarant?.name}
            description={order?.restuarant?.address}
            coordinate={{
              latitude: order?.restuarant?.lat,
              longitude: order?.restuarant?.lng,
            }}
          >
            <View
              style={{ backgroundColor: "green", padding: 5, borderRadius: 20 }}
            >
              <Entypo name="shop" size={24} color="white" />
            </View>
          </Marker>
        ))}
      </MapView>
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              letterSpacing: 0.5,
              paddingBottom: 5,
            }}
          >
            You're Online
          </Text>
          <Text style={{ letterSpacing: 0.5, color: "grey" }}>
            Available Orders: {orders.length}
          </Text>
        </View>
        <BottomSheetFlatList
          data={orders}
          renderItem={({ item }) => <OrderItem order={item} />}
        />
      </BottomSheet>
    </View>
  );
};

export default OrdersScreen;
