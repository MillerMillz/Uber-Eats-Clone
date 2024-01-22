import { StyleSheet, FlatList, View } from "react-native";
import RestaurantItem from "../../components/RestaurantItem";
import restaurants from "../../../assets/data/restaurants.json";
import {get} from "../../../apiCalls"
import apiRoutes from '../../../apiRoutes'
import { useEffect, useState } from "react";
import * as signalR from "../../../lib/signalr/dist/browser/signalr"
import { useAuthContext } from "../../contexts/AuthContext";

export default function HomeScreen() {
  const [restu,setRestu] = useState([])
  const [connection,setConnection] = useState();
  const {authUser} = useAuthContext();
  const FetchData = async () => {
    const data = await get(apiRoutes.listRestuarants);
    setRestu(data);   
}
const connectToHub = async () =>{
  try{ 
      var hubConnection = new signalR.HubConnectionBuilder().withUrl("http://192.168.0.151:7088/ChatHub").withAutomaticReconnect().build();
      hubConnection.on("RecievedMessage",function(message){
              console.log("testing restu updates");
              FetchData();
        
          })

          setConnection(hubConnection);
          await hubConnection.start();
          await hubConnection.invoke("AssignGroup",JSON.stringify({Email:authUser.email,Group:"Restaurant"}));
  }
  catch(e)
  {
      console.log(e);
  }
}

useEffect(()=>{
  
  connectToHub();
  FetchData();
},[])
  return (
    <View style={styles.page}>
      <FlatList
        data={restu}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});
