import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://192.168.29.164:5000/api/auth/login",
        user
      );
      if (response.data?.token) {
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        Alert.alert("Login is successful");
        setTimeout(()=>{
          router.replace("(tabs)/home");
        },500);
      } else {
        Alert.alert("Login unsuccessful");
      }
    } catch (error) {
      Alert.alert("Login Error");
    }
  };

  return (
    <SafeAreaView
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor:"black",
          height: "20%",
        }}
      >
        <FontAwesome
          style={{
            width: 70,
            height: 200,
            marginTop: 200,
            marginLeft: 15,
          }}
          name="amazon"
          size={50}
          color="#000"
        />
      </View>
      <KeyboardAvoidingView
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // backgroundColor:"gray"
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 12,
              color: "#041E42",
            }}
          >
            Login to your account
          </Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 10,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <MaterialCommunityIcons name="email" size={24} color="black" />
            <TextInput
              style={{
                marginVertical: 10,
                width: 320,
              }}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={{ marginTop: 20, height: 100 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5.5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 10,
              padding: 15,
              borderRadius: 10,
            }}
          >
            <FontAwesome name="lock" size={24} color="black" />
            <TextInput
              style={{
                marginVertical: 11,
                width: 320,
              }}
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
              placeholder="Enter your password"
            />
          </View>
          <View
            style={{
              // backgroundColor:"red",
              marginTop: 10,
              padding: 5,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me logged in</Text>
            <Text style={{ color: "#007FFF", fontWeight: "500" }}>
              Forgot Password
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#FEBE10",
          marginTop: 150,
          padding: 20,
          width: 250,
          borderRadius: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
          }}
        >
          Don't have an account?{" "}
          <Text
            onPress={() => router.replace("auth/register")}
            style={{ color: "#007FFF", fontWeight: "500" }}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
