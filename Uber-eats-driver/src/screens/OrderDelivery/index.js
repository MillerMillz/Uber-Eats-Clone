import { useRef, useMemo, useEffect, useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator,
  Pressable,
} from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import styles from "./styles";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as signalR from "../../../lib/signalr/dist/browser/signalr";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useOrderContext } from "../../contexts/OrderContext";
import { useAuthContext } from "../../contexts/AuthContext";
import apiRoutes from "../../../apiRoutes";
import {post} from "../../../apiCalls";

// const ORDER_STATUSES = {
//   READY_FOR_PICKUP: "READY_FOR_PICKUP",
//   ACCEPTED: "ACCEPTED",
//   PICKED_UP: "PICKED_UP",
// };

const OrderDelivery = () => {
  const {
    order,
    user,
    dishes,
    acceptOrder,
    fetchOrder,
    FetchOrders,
    completeOrder,
    pickUpOrder,
  } = useOrderContext();
  const {authUser,dbCourier,setDbCourier} = useAuthContext();


  const [driverLocation, setDriverLocation] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalKm, setTotalKm] = useState(0);
  // const [deliveryStatus, setDeliveryStatus] = useState(
  //   ORDER_STATUSES.READY_FOR_PICKUP
  // );
  const [isDriverClose, setIsDriverClose] = useState(false);

  const bottomSheetRef = useRef(null);
  const mapRef = useRef(null);
  const { width, height } = useWindowDimensions();

  const snapPoints = useMemo(() => ["12%", "95%"], []);
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  var hubConnection = new signalR.HubConnectionBuilder().withUrl("http://192.168.0.151:7088/ChatHub").build();


  useEffect(() => {
    fetchOrder(id);
  }, [id]);
  const UpdateDriver=async ()=>{
    await post(apiRoutes.updateCourier,
      {id:dbCourier.id,name:dbCourier.name,userID:dbCourier.userID,transportatioMode:dbCourier.transportatioMode,
        lat:driverLocation.latitude, lng:driverLocation.longitude}
    );
    try{
      await hubConnection.start();
      await hubConnection.invoke("AssignGroup",JSON.stringify({Email:authUser.email,Group:"Order"}));
       
     await hubConnection.invoke("SendMessageAsync","Update Driver");
      hubConnection.stop();
     } catch(e)
     {
       console.log(e);
     }
  }
  useEffect( ()=>{
if(driverLocation){
   UpdateDriver();}
  },[driverLocation])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (!status === "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setDriverLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();

    const foregroundSubscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 100,
      },
      (updatedLocation) => {
        setDriverLocation({
          latitude: updatedLocation.coords.latitude,
          longitude: updatedLocation.coords.longitude,
        });
      }
    );
    return foregroundSubscription;
  }, []);

  const onButtonpressed = async () => {
    if (order.status === "READY_FOR_PICKUP") {
      bottomSheetRef.current?.collapse();
      mapRef.current.animateToRegion({
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      acceptOrder();
      try{
        await hubConnection.start();
        await hubConnection.invoke("AssignGroup",JSON.stringify({Email:authUser.email,Group:"Order"}));
         
       await hubConnection.invoke("SendMessageAsync","Update Order");
        hubConnection.stop();
       } catch(e)
       {
         console.log(e);
       }
    }
    if (order.status === "ACCEPTED") {
      bottomSheetRef.current?.collapse();
      pickUpOrder();
      try{
        await hubConnection.start();
        await hubConnection.invoke("AssignGroup",JSON.stringify({Email:authUser.email,Group:"Order"}));
         
       await hubConnection.invoke("SendMessageAsync","Update Order");
        hubConnection.stop();
       } catch(e)
       {
         console.log(e);
       }
    }
    if (order.status === "PICKED_UP") {
      await FetchOrders();
      await completeOrder();
      try{
        await hubConnection.start();
        await hubConnection.invoke("AssignGroup",JSON.stringify({Email:authUser.email,Group:"Order"}));
         
       await hubConnection.invoke("SendMessageAsync","Update Order");
        hubConnection.stop();
       } catch(e)
       {
         console.log(e);
       }
      bottomSheetRef.current?.collapse();
      navigation.goBack();
    }
  };

  const renderButtonTitle = () => {
    if (order.status === "READY_FOR_PICKUP") {
      return "Accept Order";
    }
    if (order.status === "ACCEPTED") {
      return "Pick-Up Order";
    }
    if (order.status === "PICKED_UP") {
      return "Complete Delivery";
    }
  };

  const isButtonDisabled = () => {
    if (order.status === "READY_FOR_PICKUP") {
      return false;
    }
    if (order.status === "ACCEPTED" ) {
      return false;
    }
    if (order.status === "PICKED_UP" ) {
      return false;
    }
    return true;
  };

  const restaurantLocation = {
    latitude: order?.restuarant?.lat,
    longitude: order?.restuarant?.lng,
  };
  const deliveryLocation = {
    latitude: user?.lat,
    longitude: user?.lng,
  };

  if (!driverLocation) {
    
    return <ActivityIndicator size={"large"} />;
  }

  if (!order || !user || !driverLocation) {
   
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{ width, height }}
        showsUserLocation
        followsUserLocation
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}
      >
        <MapViewDirections
          origin={driverLocation}
          destination={
            order.status === "ACCEPTED" ? restaurantLocation : deliveryLocation
          }
          strokeWidth={10}
          waypoints={
            order.status === "READY_FOR_PICKUP" ? [restaurantLocation] : []
          }
          strokeColor="#3FC060"
          apikey={"AIzaSyA40_jSaAHHq6J3o3HKJujVrMHv9gcSV3E"}
          onReady={(result) => {
            setIsDriverClose(result.distance <= 5);
            setTotalMinutes(result.duration);
            setTotalKm(result.distance);
          }}
        />
        <Marker
          coordinate={{
            latitude: order.restuarant.lat,
            longitude: order.restuarant.lng,
          }}
          title={order.restuarant.name}
          description={order.restuarant.address}
        >
          <View
            style={{ backgroundColor: "green", padding: 5, borderRadius: 20 }}
          >
            <Entypo name="shop" size={30} color="white" />
          </View>
        </Marker>

        <Marker
          coordinate={deliveryLocation}
          title={user?.name}
          description={user?.address}
        >
          <View
            style={{ backgroundColor: "green", padding: 5, borderRadius: 20 }}
          >
            <MaterialIcons name="restaurant" size={30} color="white" />
          </View>
        </Marker>
      </MapView>
      {order.status === "READY_FOR_PICKUP" && (
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back-circle"
          size={45}
          color="black"
          style={{ top: 40, left: 15, position: "absolute" }}
        />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <View style={styles.handleIndicatorContainer}>
          <Text style={styles.routeDetailsText}>
            {totalMinutes.toFixed(0)} min
          </Text>
          <FontAwesome5
            name="shopping-bag"
            size={30}
            color="#3FC060"
            style={{ marginHorizontal: 10 }}
          />
          <Text style={styles.routeDetailsText}>{totalKm.toFixed(2)} km</Text>
        </View>
        <View style={styles.deliveryDetailsContainer}>
          <Text style={styles.restaurantName}>{order.restuarant.name}</Text>
          <View style={styles.adressContainer}>
            <Fontisto name="shopping-store" size={22} color="grey" />
            <Text style={styles.adressText}>{order.restuarant.address}</Text>
          </View>

          <View style={styles.adressContainer}>
            <FontAwesome5 name="map-marker-alt" size={30} color="grey" />
            <Text style={styles.adressText}>{user?.address}</Text>
          </View>

          <View style={styles.orderDetailsContainer}>
            {dishes?.map((dishItem) => (
              <Text style={styles.orderItemText} key={dishItem.id}>
                {dishItem.dish.name} x{dishItem.quantity}
              </Text>
            ))}
          </View>
        </View>
        <Pressable
          style={{
            ...styles.buttonContainer,
            backgroundColor: isButtonDisabled() ? "grey" : "#3FC060",
          }}
          onPress={onButtonpressed}
          disabled={isButtonDisabled()}
        >
          <Text style={styles.buttonText}>{renderButtonTitle()}</Text>
        </Pressable>
      </BottomSheet>
    </View>
  );
};

export default OrderDelivery;
