import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrdersScreen from "../screens/OrdersScreen";
import OrdersDeliveryScreen from "../screens/OrderDelivery";
import ProfileScreen from "../screens/ProfileScreen";
import Login from "../screens/Login";
import { useAuthContext } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { dbCourier,authUser } = useAuthContext();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authUser ? (dbCourier ? (
        <>
          <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
          <Stack.Screen
            name="OrdersDeliveryScreen"
            component={OrdersDeliveryScreen}
          />
        </>
      ) : (
        <Stack.Screen name="Profile" component={ProfileScreen} />
      )):(<Stack.Screen name="Login" component={Login} />)}
    </Stack.Navigator>
  );
};

export default Navigation;
