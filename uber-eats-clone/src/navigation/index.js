import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import RestaurantDetailsScreen from "../screens/RestaurantDetailsScreen";
import DishDetailsScreen from "../screens/DishDetailsScreen";
import Basket from "../screens/Basket";
import OrdersScreen from "../screens/OrdersScreen";
import OrderDetails from "../screens/OrderDetails";
import ProfileScreen from "../screens/ProfileScreen"
import Login from "../screens/Login"


import { Foundation, FontAwesome5, MaterialIcons,SimpleLineIcons } from "@expo/vector-icons";
import { useAuthContext } from "../contexts/AuthContext";
import BasketScreen from "../screens/BasketScreen";
import BasketFromList from "../screens/BasketFromList";
import OrderDetailsNavigator from "./OrderDetailsNavigator";


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const {authUser} = useAuthContext();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authUser ? (
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      ):(<Stack.Screen name="Login" component={Login} />)}
    </Stack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();
const HomeTabs = () => {
  return (
    <Tab.Navigator shifting={false} barStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list-alt" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Baskets"
        component={BasketStackNavigator}
        options={{ 
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="basket" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Restaurants" component={HomeScreen} />
      <HomeStack.Screen name="Restaurant" component={RestaurantDetailsScreen} />
      <HomeStack.Screen name="Dish" component={DishDetailsScreen} />
      <HomeStack.Screen name="Basket" component={Basket} />
    </HomeStack.Navigator>
  );
};

const OrdersStack = createNativeStackNavigator();

const OrderStackNavigator = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen name="My Orders" component={OrdersScreen} />
      <OrdersStack.Screen name="Order" component={OrderDetailsNavigator} />
    </OrdersStack.Navigator>
  );
};
const BasketsStack = createNativeStackNavigator();

const BasketStackNavigator = () => {
  return (
    <BasketsStack.Navigator>
      <BasketsStack.Screen name="My Baskets" component={BasketScreen} />
      <BasketsStack.Screen name="My Basket" component={BasketFromList} />
    </BasketsStack.Navigator>
  );
};

export default RootNavigator;

