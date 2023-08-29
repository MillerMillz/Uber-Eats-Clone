import { StyleSheet, FlatList, View } from "react-native";
import RestaurantItem from "../../components/RestaurantItem";
import restaurants from "../../../assets/data/restaurants.json";
import {get} from "../../../apiCalls"
import apiRoutes from '../../../apiRoutes'
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [restu,setRestu] = useState([])
  const FetchData = async () => {
    const data = await get(apiRoutes.listRestuarants);
    console.log(data); 
    setRestu(data);   
}

useEffect(()=>{
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
