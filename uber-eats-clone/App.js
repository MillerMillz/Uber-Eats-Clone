import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import RootNavigator from "./src/navigation";
import AuthContextProvider from "./src/contexts/AuthContext";
import BasketContextProvider from "./src/contexts/BasketContext";
import BasketListContextProvider from "./src/contexts/BasketListContext";
import OrderContextProvider from "./src/contexts/OrderContext";
import OrderListContextProvider from "./src/contexts/OrderListContext";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
      <NavigationContainer>
     <AuthContextProvider>
        <BasketContextProvider>
          <BasketListContextProvider>
            <OrderContextProvider>
              <OrderListContextProvider>
                <RootNavigator /> 
              </OrderListContextProvider>
            </OrderContextProvider>
          </BasketListContextProvider>
        </BasketContextProvider>
      </AuthContextProvider>
     

      <StatusBar style="light" />
    </NavigationContainer>
  );
}
