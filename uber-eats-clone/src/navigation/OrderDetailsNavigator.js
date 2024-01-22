import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import OrderDetails from "../screens/OrderDetails";
import OrderMapView from "../screens/OrderMapView";
import { useEffect } from "react";

const Tab = createMaterialTopTabNavigator();

const OrderDetailsNavigator = ({route}) =>{
    const id = route?.params?.id;
   useEffect(()=>{
   },[])
    return(
        <Tab.Navigator>
            <Tab.Screen name="Details" >
               {()=> <OrderDetails id={id}/>}
            </Tab.Screen>
            <Tab.Screen name="Location">
            {()=> <OrderMapView id={id}/>}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default OrderDetailsNavigator;