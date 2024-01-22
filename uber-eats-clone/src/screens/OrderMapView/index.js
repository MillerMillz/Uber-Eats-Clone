import {View,Text} from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {get} from "../../../apiCalls"
import apiRoutes from "../../../apiRoutes";
import MapView,{Marker} from "react-native-maps"
import {FontAwesome5} from "@expo/vector-icons"
import * as signalR from "../../../lib/signalr/dist/browser/signalr"
import { useRef } from "react";
import { useFocusEffect,useIsFocused } from "@react-navigation/native";

const OrderMapView = ({id}) =>{
    const [order,setOrder] = useState(null);
    const [driver,setDriver] = useState(null);
    const [connection,setConnection] = useState();
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
        
        setDriver(data);
    }

    useEffect(()=>{
        if(order?.courierID)
        {
            FetchDriver();
        }

    },[order?.courierID])
    useEffect(()=>{
        if(driver?.lat && driver?.lng)
        {
            mapRef.current.animateToRegion({
                latitude:driver?.lat,
                longitude:driver?.lng,
                latitudeDelta:0.007,
                longitudeDelta:0.007
          });
        }

    },[driver?.lat,driver?.lng])

    useEffect(()=>{
       connectToHub();

        if(id)
        {
           
            FetchOrder();
           
        }
    },[]) 
    
    return (
        <View>
            <Text>Status : {order?.status || "loading"}</Text>
            <MapView style={styles.map} ref={mapRef}>
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
});

export default OrderMapView;