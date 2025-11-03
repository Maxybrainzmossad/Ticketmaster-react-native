// App.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import screens
import DiscoverScreen from "./screens/DiscoverScreen";
import ForYouScreen from "./screens/ForYouScreen";
import MyTicketsScreen from "./screens/MyTicketsScreen";
import SellScreen from "./screens/SellScreen";
import MyAccountScreen from "./screens/MyAccountScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Tab.Navigator
        initialRouteName="Discover"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#0861FF",
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            height: 65,
            borderTopColor: "#ddd",
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Discover") iconName = "search";
            else if (route.name === "For You") iconName = "heart-outline";
            else if (route.name === "My Tickets") iconName = "ticket-outline";
            else if (route.name === "Sell") iconName = "wallet-outline";
            else if (route.name === "My Account") iconName = "person-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="For You" component={ForYouScreen} />
        <Tab.Screen name="My Tickets" component={MyTicketsScreen} />
        <Tab.Screen name="Sell" component={SellScreen} />
        <Tab.Screen name="My Account" component={MyAccountScreen} />
      </Tab.Navigator>
  );
}
