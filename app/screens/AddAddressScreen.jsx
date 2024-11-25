import { View, Text, ScrollView, SafeAreaView, Platform, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function AddAddressScreen() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [userId, setUserId] = useState("") 

  useEffect(()=>{
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
  },[]);

  const handleAddAddress=async()=>{
    const newAddress = {
      name: name,
      mobileNo: mobile,
      houseNo: houseNumber,
      street: street,
      landmark: landmark,
      city: city,
      country: country,
      postalCode: postalCode,
    };
    try {
      const response = await axios.post(
        "http://192.168.29.164:5000/api/auth/address",
        [newAddress,userId])
      if(!response){
          Alert.alert("Failed to Add Address")
      }
    else{
      Alert.alert("Address added successfully")
    }
    } catch (error) {
      console.log({message:error.message})
    }

  setTimeout(() => {
    setName("");
    setAddAddress("");
    setCity("");
    setMobile("");
    setCountry("");
    setPostalCode("");
    setHouseNumber("");
    setLandmark(""),
    setUserId("")
  }, 500);
  
}


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
      <View style={{padding:10}}>
        <Text style={{fontWeight:"bold", fontSize:20}}>Add a new Address</Text>
        <View style={{marginTop:10}}>
          <Text style={{fontWeight:"bold", fontSize:20}}>Full name</Text>
          <TextInput value={name} onChange={(text)=>setName(text.nativeEvent.text)} placeholderTextColor={"gray"}  placeholder='Enter full name' style={{borderWidth:1, borderColor:"#D0D0D0", marginTop:10,borderRadius:5 }}/>
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontWeight:"bold", fontSize:20}}>Mobile Number</Text>
          <TextInput value={mobile} onChange={(text)=>setMobile(text.nativeEvent.text)} placeholderTextColor={"gray"} placeholder='Enter your mobile number' style={{borderWidth:1, borderColor:"#D0D0D0", marginTop:10,borderRadius:5 }}/>
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontWeight:"bold", fontSize:20}}>Flat, House No, Building, Company</Text>
          <TextInput value={houseNumber} onChange={(text)=>setHouseNumber(text.nativeEvent.text)} placeholderTextColor={"gray"} placeholder='' style={{borderWidth:1, borderColor:"#D0D0D0", marginTop:10,borderRadius:5 }}/>
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontWeight:"bold", fontSize:20}}>Area, Street, Sector, Village</Text>
          <TextInput value={street} onChange={(text)=>setStreet(text.nativeEvent.text)} placeholderTextColor={"gray"} placeholder='' style={{borderWidth:1, borderColor:"#D0D0D0", marginTop:10,borderRadius:5 }}/>
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontWeight:"bold", fontSize:20}}>Landmark</Text>
          <TextInput value={landmark} onChange={(text)=>setLandmark(text.nativeEvent.text)} placeholderTextColor={"gray"} placeholder='Eg near apollo hospital' style={{borderWidth:1, borderColor:"#D0D0D0", marginTop:10,borderRadius:5 }}/>
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontWeight:"bold", fontSize:20}}>City</Text>
          <TextInput value={city} onChange={(text)=>setCity(text.nativeEvent.text)} placeholderTextColor={"gray"} placeholder='Enter city name' style={{borderWidth:1, borderColor:"#D0D0D0", marginTop:10,borderRadius:5 }}/>
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontWeight:"bold", fontSize:20}}>Country</Text>
          <TextInput value={country} onChange={(text)=>setCountry(text.nativeEvent.text)} placeholderTextColor={"gray"} placeholder='Enter country name' style={{borderWidth:1, borderColor:"#D0D0D0", marginTop:10,borderRadius:5 }}/>
        </View>
        <View style={{marginTop:10}}>
          <Text style={{fontWeight:"bold", fontSize:20}}>Pincode</Text>
          <TextInput value={postalCode} onChange={(text)=>setPostalCode(text.nativeEvent.text)} placeholderTextColor={"gray"} placeholder='Eg 741222 ' style={{borderWidth:1, borderColor:"#D0D0D0", marginTop:10,borderRadius:5 }}/>
        </View>
      </View>
</ScrollView>

<TouchableOpacity onPress={handleAddAddress} style={{backgroundColor:"#FFC72C", padding:19, borderRadius:6, justifyContent:"center", alignItems:"center", marginTop:20}}>
          <Text style={{fontWeight:"bold", fontSize:20}} >Add Address</Text>
        </TouchableOpacity>
</SafeAreaView>
  )
}