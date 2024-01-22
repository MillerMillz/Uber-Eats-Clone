import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import apiRoutes from "../../../apiRoutes";
import {post,get} from "../../../apiCalls"

const Profile = () => {
  const { dbUser,setAuthUser,sub, setDbUser } = useAuthContext();

  const [name, setName] = useState(dbUser?.name || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [lat, setLat] = useState(dbUser?.lat + "" || "0");
  const [lng, setLng] = useState(dbUser?.lng + "" || "0");

  
  const navigation = useNavigation();
  const onSave = async () => {
    
    if (dbUser?.userID!=null) { 
      await updateUser();
    } else {
       await createUser();
    }
    navigation.goBack();
  };
  const signOut = async () => {
    const signal = await post(apiRoutes.signOut)
    setAuthUser(null);
    setDbCourier(null);
    navigation.goBack();
  }

  const updateUser = async () => {
    const user = await post(apiRoutes.updateDBUser
      , {
        Id:dbUser.id,
        Name : name,
        Address :address,
        Lat : parseFloat(lat),
        Lng : parseFloat(lng),
        UserId:sub
      }
    );
    setDbUser(user);
  };

  const createUser = async () => {
    try {
      const user = await post(apiRoutes.addDBUser,
        {
          Name:name,
          Address:address,
          Lat: parseFloat(lat),
          Lng: parseFloat(lng),
          UserId:sub
        }
      );
      setDbUser(user);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
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
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        style={styles.input}
      />
      <TextInput
        value={lat}
        onChangeText={setLat}
        placeholder="Latitude"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        value={lng}
        onChangeText={setLng}
        placeholder="Longitude"
        style={styles.input}
        keyboardType="numeric"
      />
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
