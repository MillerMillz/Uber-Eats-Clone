import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BasketListItem = ({ basket }) => {
  const navigation = useNavigation();
  
  
 
  return (
    <Pressable
      onPress={() => navigation.navigate("My Basket", { id: basket.id })}
      style={{ flexDirection: "row", margin: 10, alignItems: "center" }}
    >
      <Image
        source={{ uri: basket.restuarant.imageSource }}
        style={{ width: 75, height: 75, marginRight: 5,borderRadius:75/ 2 }}
      />

      <View>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          {basket.restuarant.name}
        </Text>
        <Text style={{ marginVertical: 5 }}> {basket.noItems} items &#8226; R{basket.total.toFixed(2)}</Text>
       
      </View>
    </Pressable>
  );
};

export default BasketListItem;
