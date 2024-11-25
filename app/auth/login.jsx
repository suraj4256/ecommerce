import { View, Text } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import LoginScreen from "../screens/LoginScreen";

export default function login() {
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          router.replace("(tabs)/home");
        }
      } catch (error) {
        console.log("error messaage : ", error);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <View>
      <LoginScreen/>
    </View>
  );
}
