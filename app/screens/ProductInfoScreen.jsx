import {
  View,
  Text,
  ScrollView,
  Platform,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartReducer";

export default function ProductInfoScreen() {
  const width = Dimensions.get("window");
  const height = width * 0.6;
  const params = useLocalSearchParams();
  const { id, title, price, carouselImages, color, size, oldPrice, item } =
    params;
  const items = JSON.parse(item);
  //   console.log(items);
  const parsedCarouselImages = carouselImages ? JSON.parse(carouselImages) : [];

  const dispatch = useDispatch();

  const addItemToCart = (items) => {
    setAddedToCart(true);
    dispatch(addToCart(items));
    setTimeout(()=>{
    setAddedToCart(false)
    },2000)
  };
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

   const [addedTOCart, setAddedToCart] = useState(false);
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 0 : 0,
        backgroundColor: "white",
        height: "100%",
        width: "100%",
      }}
    >
      <ScrollView>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {parsedCarouselImages.map((item, index) => (
            <ImageBackground
              key={index}
              style={{ width: 400, height: 350, marginTop: 25 }}
              resizeMode="contain"
              source={{ uri: item }}
            >
              <Text>{item?.title}</Text>
            </ImageBackground>
          ))}
        </ScrollView>
        <View style={{ padding: 10 }}>
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {title}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 12,
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            gap: 5,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            ₹{price}
          </Text>
          <Text
            style={{
              fontSize: 15,
              textDecorationLine: "line-through",
              color: "red",
            }}
          >
            {" "}
            ₹{oldPrice}
          </Text>
        </View>
        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text>Color : </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>{color}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text>Size : </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>{size}</Text>
        </View>
        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 1,
          }}
        />
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "600", marginVertical: 5 }}>
            Total : {price}
          </Text>
          <Text style={{ color: "#00CED1" }}>
            Free delivery Tomorrow by 3PM. Order within 10hrs 30 mins
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <Entypo name="location-pin" size={24} color="black" />
            <Text style={{ fontSize: 15, fontWeight: 500 }}>
              Deliver To Sujan - Bangalore 560019
            </Text>
          </View>
        </View>
        <Text
          style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}
        >
          In Stock
        </Text>
        <TouchableOpacity
          onPress={() => addItemToCart(items)}
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        > 
          <Text> {addedTOCart ? "Added to Cart" : "Add to Cart"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#FFAC1C",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          <Text>Buy Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
