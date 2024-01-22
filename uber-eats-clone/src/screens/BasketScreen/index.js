import { View, ActivityIndicator, FlatList } from "react-native";
import {useEffect,useState} from "react"
import { useFocusEffect } from "@react-navigation/native";
import react from "react";
import BasketListItem from "../../components/BasketListItem";
import { useAuthContext } from "../../contexts/AuthContext";
import apiRoutes from "../../../apiRoutes";
import {get} from "../../../apiCalls"

const BasketScreen = () => {
  const { dbUser } = useAuthContext();

  const [baskets,setBaskets] = useState();

  const FetchUserDishes = async () =>{
    var baskets = await get(apiRoutes.getUserBaskets+dbUser.id)
    setBaskets(baskets);
  }
  useFocusEffect(
    react.useCallback(()=>{
      FetchUserDishes();
     
    },[])
  )
  if (!baskets) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        data={baskets}
        renderItem={({ item }) => <BasketListItem basket={item} />}
      />
    </View>
  );
};

export default BasketScreen;
