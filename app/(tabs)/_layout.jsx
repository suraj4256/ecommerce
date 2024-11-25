import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <FontAwesome name="user" size={24} color="black" />
            ) : (
              <FontAwesome name="user-o" size={24} color="black" />
            );
          },
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Ionicons name="cart" size={24} color="black" />
            ) : (
              <Ionicons name="cart-outline" size={24} color="black" />
            );
          },
        }}
      />
    </Tabs>
  );
}
