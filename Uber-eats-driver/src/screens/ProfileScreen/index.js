import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import apiRoutes from "../../../apiRoutes";
import {get,post} from "../../../apiCalls"

const Profile = () => {
  const TransportationModes = {
    "DRIVING": "DRIVING",
    "BICYCLING": "BICYCLING"
  };
  
  const OrderStatus = {
    "NEW": "NEW",
    "COOKING": "COOKING",
    "READY_FOR_PICKUP": "READY_FOR_PICKUP",
    "PICKED_UP": "PICKED_UP",
    "COMPLETED": "COMPLETED",
    "ACCEPTED": "ACCEPTED"
  };
  const { dbCourier, sub, setDbCourier,setAuthUser } = useAuthContext();

  const [name, setName] = useState(dbCourier?.name || "");
  const [transportationMode, setTransportationMode] = useState(
    TransportationModes.DRIVING
  );

  const navigation = useNavigation();
  const signOut = async () => {
    const signal = await post(apiRoutes.signOut)
    console.log(signal);
    setAuthUser(null);
    setDbCourier(null);
    navigation.goBack();
  }

  const onSave = async () => {
    if (dbCourier) {
      await updateCourier();
    } else {
      console.log("First hit");
      await createCourier();
    }
    navigation.goBack();
  };

  const updateCourier = async () => {
    const courier = await post(apiRoutes.updateCourier,
      {
        id:dbCourier.id,
        name:name,
        userID:sub,
        transportationMode:transportationMode
      }
    );
    setDbCourier(courier);
  };

  const createCourier = async () => {
//    try {
      console.log(transportationMode)
      const courier = await post(apiRoutes.AddCourier,
        {
        
        name:name,
        userID:sub,
        transportationMode:transportationMode
        }
      );
      console.log(courier)
      setDbCourier(courier);
   /*  } catch (e) {
      Alert.alert("Error", e.message);
    } */
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      <View style={{ flexDirection: "row" }}>
        <Pressable
          onPress={() => setTransportationMode(TransportationModes.BICYCLING)}
          style={{
            backgroundColor:
              transportationMode === TransportationModes.BICYCLING
                ? "#3FC060"
                : "white",
            margin: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 10,
          }}
        >
          <MaterialIcons name="pedal-bike" size={40} color="black" />
        </Pressable>
        <Pressable
          onPress={() => setTransportationMode(TransportationModes.DRIVING)}
          style={{
            backgroundColor:
              transportationMode === TransportationModes.DRIVING
                ? "#3FC060"
                : "white",
            margin: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 10,
          }}
        >
          <FontAwesome5 name="car" size={40} color="black" />
        </Pressable>
      </View>

      <Button onPress={onSave} title="Save" />
      <Text
        onPress={signOut}
        style={{ textAlign: "center", color: "red", margin: 10 }}
      >
        Sign out
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
});

export default Profile;
