import {
  View,
  Text,
  ScrollView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import AddressCard from "../../components/AddressCard";

export default function Addresses() {
  const [userId, setUserId] = useState(null);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchUser = async()=>{
        const token = await AsyncStorage.getItem("authToken")
        const decodedToken = jwtDecode(token)
        console.log(decodedToken)
        if (decodedToken && decodedToken.user && decodedToken.user.id) {
          setUserId(decodedToken.user.id);
          console.log("Done")
        } else {
          console.log("Invalid token structure");
        }
      }
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      getAllAddresses(userId); // Call API only when userId is available
    }
  }, [userId]); // Depend on userId to ensure API is called when it's ready

  const getAllAddresses = async (id) => {
    try {
      const response = await axios.get(
        `http://192.168.29.164:5000/api/auth/getAddresses/${id}`
      );
      if (response.data && response.data.success) {
        console.log("Fetched addresses:", response.data.data);
        setAddresses(response.data.data);
      } else {
        console.log("Unsuccessful fetching of address data");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error.message);
    }
  };


  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 0 : 0,
        backgroundColor: "white",
        height: "100%",
        width: "100%",
      }}
    >
      <ScrollView nestedScrollEnabled={true}>
        {/* Search bar and border*/}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            paddingRight: 35,
            paddingLeft: 20,
            paddingVertical: 10,
            backgroundColor: "#00CED1",
            gap: 5,
          }}
        >
          <View
            style={{
              backgroundColor: "#F0F0F1",
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              borderRadius: 4,
              padding: 5,
              paddingLeft: 8,
            }}
          >
            <AntDesign name="search1" size={18} color="black" />
            <TextInput
              style={{
                width: "90%",
              }}
              placeholder="Search"
            />
          </View>
          <Feather name="mic" size={24} color="black" />
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>
            Your Addresses
          </Text>
        </View>
        <View
          style={{ width: "100%", borderWidth: 0.3, borderColor: "gray" }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 11,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "gray", fontSize: 15 }}>
            Add a new Address
          </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 25, fontWeight: "400" }}>{">"}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ width: "100%", borderWidth: 0.3, borderColor: "gray" }}
        />
        <View style={{padding:10}}>
            {addresses.length>0?(addresses.map((item,index)=>{
               return <AddressCard  key={index} items={item}/>
            })):(
                <Text>No Addresses Found</Text>
            )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
