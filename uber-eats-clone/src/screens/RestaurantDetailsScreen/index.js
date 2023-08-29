import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DishListItem from "../../components/DishListItem";
import Header from "./Header";
import styles from "./styles";
import {get} from "../../../apiCalls"
import apiRoutes from "../../../apiRoutes";
import { useRoute, useNavigation } from "@react-navigation/native";

import { useBasketContext } from "../../contexts/BasketContext";

const RestaurantDetailsPage = () => {
  const [restaurant, setRestuarant] = useState(null);
  const [dishes, setDishes] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();

  const id = route.params?.id;

  const {
    setRestaurant, setBasketRestaurant,
    basket,
    basketDishes,
  } = useBasketContext();
  
  useEffect(() => {
    if (!id) {
      return;
    }
    setRestaurant(null);
    // fetch the restaurant with the id
    get(apiRoutes.getRestuarant+id).then(setRestuarant);
   
    get(apiRoutes.getRestuDishes+id).then(
      setDishes
    );
  }, [id]);

  useEffect(() => {
    setRestaurant(restaurant);
   // setBasketRestaurant(restaurant);
  }, [restaurant]);

  if (!restaurant) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <Header restaurant={restaurant} />}
        data={dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
        keyExtractor={(item) => item.name}
      />
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
      />
      {basket && (
        <Pressable
          onPress={() => navigation.navigate("Basket")}
          style={styles.button}
        >
          {basket.restaurantID===id &&
          <Text style={styles.buttonText}>
            Open basket ({basketDishes.length})
          </Text>}

        </Pressable>
      )}
    </View>
  );
};



export default RestaurantDetailsPage;
