import {View,Text} from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet,ActivityIndicator,Image } from "react-native";
import {get} from "../../../apiCalls"
import apiRoutes from "../../../apiRoutes";
import MapView,{Marker} from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import {FontAwesome5} from "@expo/vector-icons"
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import * as signalR from "../../../lib/signalr/dist/browser/signalr"
import { useRef } from "react";
import { useFocusEffect,useIsFocused } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";

const OrderMapView = ({id}) =>{
    const [order,setOrder] = useState(null);
    const [driver,setDriver] = useState(null);
    const [user,setUser] = useState(null);
    const [connection,setConnection] = useState();
    const {authUser,dbUser} = useAuthContext();
    const isFocused = useIsFocused();
    const mapRef = useRef(null);
    const connectToHub = async () =>{
        try{ 
            var hubConnection = new signalR.HubConnectionBuilder().withUrl("http://192.168.0.151:7088/ChatHub").withAutomaticReconnect().build();
            hubConnection.on("RecievedMessage",function(message){
                   
                   if(order?.courierID>0)
                   {
                     FetchDriver();
                   }
              
                })
      
                setConnection(hubConnection);
                await hubConnection.start();
                await hubConnection.invoke("AssignGroup",JSON.stringify({Email:authUser.email,Group:"Driver"}));
        }
        catch(e)
        {
            console.log(e);
        }
      }
   
  /*   useEffect(()=>{
          
            
        if(order?.courierID>0) {
        var intervalID = setInterval(async ()=>{
    var data = await get(apiRoutes.getDbCourier+order?.courierID);
    console.log(data)
        console.log("6666")
        setDriver(data);
   },10000);

   return ()=>{clearInterval(intervalID);}}
},[]) */
   
    const FetchOrder = async () =>{
        var data = await get(apiRoutes.getOrderbyID+id);
        setOrder(data);
    }

    const FetchDriver = async () =>{
        var data = await get(apiRoutes.getDbCourier+order?.courierID);
        console.log(data);
        setDriver(data);
    }

    useEffect(()=>{
        if(order?.courierID)
        {
            FetchDriver();
        }

    },[order?.courierID])
    useEffect(()=>{
      if(!order?.status==="COMPLETED")
      {
        if(driver?.lat && driver?.lng)
        {
            mapRef.current.animateToRegion({
                latitude:driver?.lat,
                longitude:driver?.lng,
                latitudeDelta:0.07,
                longitudeDelta:0.07
          });
        }
      }

    },[driver?.lat,driver?.lng])

    const restaurantLocation = {
        latitude: order?.restuarant?.lat,
        longitude: order?.restuarant?.lng,
      };
      const deliveryLocation = {
        latitude: user?.lat,
        longitude: user?.lng,
      };
    
    useEffect(()=>{
       connectToHub();
        setUser(dbUser);
        if(id)
        {
           
            FetchOrder();
           
        }
    },[]) 
    if(order?.status==="NEW" )
    {
      return <View>
         <Image source={require("../../../assets/images/images.jpg")} style={styles.image}/>
         <View style={styles.spacing}>
      <Text style={styles.newtextFont}>Order status : {order?.status || "loading"}</Text></View>
      <View style={styles.info}>
      <Text style={styles.courierFont}>Waiting for restaurant to accept your order, location will be shown when driver accepts order</Text>
     </View>
      </View>
    }
    if(order?.status==="COOKING" )
    {
      return <View>
         <Image source={require("../../../assets/images/cookingState.jpg")} style={styles.image}/>
         <View style={styles.cookingspacing}>
      <Text style={styles.newtextFont}>Order status : {order?.status || "loading"}</Text></View>
      <View style={styles.info}>
      <Text style={styles.courierFont}>Our great chefs are preparing your great meal, location will be shown when driver accepts order</Text>
     </View>
      </View>
    }
    if(order?.status==="READY_FOR_PICKUP" )
    {
      return <View>
         <Image source={require("../../../assets/images/uber-eats-delivery.jpg")} style={styles.image}/>
         <View style={styles.pickupspacing}>
      <Text style={styles.newtextFont}>Order status : {order?.status || "loading"}</Text></View>
      <View style={styles.info}>
      <Text style={styles.courierFont}>Great news! your meal has been finished , we are trying to find a driver to deliver you food in a Gif , location will be shown when driver accepts order</Text>
     </View>
      </View>
    }
    if(order?.status==="DECLINED_BY_RESTAURANT" )
    {
      return <View>
         <Image source={require("../../../assets/images/16697949609968.png")} style={styles.image}/>
         <View style={styles.declinedspacing}>
      <Text style={styles.newtextFont}>Order status : DECLINED</Text></View>
      <View style={styles.info}>
      <Text style={styles.courierFont}>Sorry you order was declined by the Restuarant.</Text>
      <Text style={styles.courierFont}>for more details call 021 262 1671 or email Query@UberEats.com</Text>
     </View>
      </View>
    }
    if(!order || !driver)
    {
      return <ActivityIndicator size={"large"} color="gray" />;
    }
    if(order?.status==="COMPLETED" )
    {
      return <View>
      <Image source={require("../../../assets/images/doorstepdelivery.jpg")} style={styles.image}/>
      <View style={styles.pickupspacing}>
        <Text style={styles.newtextFont}>Order status : {order?.status}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.courierFont}>Your order was delivered, we hope you enjoy your food!!</Text>
        <Text style={styles.courierFont}></Text>
        <Text style={styles.courierFont}>Delivery address: {user.address}</Text>
        <Text style={styles.courierFont}>Courier : {driver.name}</Text>
      </View>
      </View>
    }
   
    return (
        <View>
            <Text>Status : {order?.status || "loading"}</Text>
            <MapView style={styles.map} ref={mapRef}
            initialRegion={{
              latitude: driver.lat,
              longitude: driver.lng,
              latitudeDelta: 0.07,
              longitudeDelta: 0.07,
            }}>
            <MapViewDirections
          origin={{ latitude: driver.lat, longitude: driver.lng }}
          destination={
             order.status === "ACCEPTED" ? restaurantLocation : deliveryLocation 
          }
          strokeWidth={10}
          waypoints={
            order.status === "READY_FOR_PICKUP" ? [restaurantLocation] : []
          }
          strokeColor="#3FC060"
          apikey={"AIzaSyAfjdWuBgeCIzS1aOu3qQpvovbn3Sep008"}
          
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
            {driver && (
          <Marker
            coordinate={{ latitude: driver.lat, longitude: driver.lng }}
          >
            
            <View
              style={{
                padding: 5,
                backgroundColor: "green",
                borderRadius: 40,
              }}
            >
              <FontAwesome5 name="motorcycle" size={24} color="white" />
            </View>
          </Marker>
        )}
            </MapView>
        </View>
    );
};
const styles = StyleSheet.create({
    map:{
        width:"100%",
        height:"100%",
    },
    image:{
      height:"45%",width:"auto"
    },
    textFont:{
      fontSize:30,
    },
    newtextFont:{
      fontSize:30,
      color:"white",
    },
    courierFont:{
      fontSize:20
    },
    info:{
      paddingTop:10,
      padding:20,
    },
    spacing:{
      padding :20 ,
      backgroundColor:"green",
      height:"20%"
    },
    cookingspacing:{
      padding :20 ,
      backgroundColor:"#FF8E1C",
      height:"20%"
    },
    declinedspacing:{
      padding :20 ,
      backgroundColor:"red",
      height:"20%"
    },
    pickupspacing:{
      padding :10 ,
      backgroundColor:"green",
      height:"22%"
    }
});

export default OrderMapView;