import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";

export default function ProductItem({ item }) {

  const router = useRouter();
  const cart = useSelector((state)=>state.cart.cart);
  const dispatch = useDispatch();
  const [addedTOCart, setAddedToCart] = useState(false);
  const addItemToCart = (items) => {
    setAddedToCart(true);
    dispatch(addToCart(items));
    setTimeout(()=>{
    setAddedToCart(false)
    },2000)
  };
  
  return (
    <>
      <Pressable
      onPress={()=>router.push({
        pathname: 'screens/ProductInfoScreen',
        params: {
          id: item.id,
          title: item.title,
          price: item.price,
          carouselImages: JSON.stringify(item.carouselImages), // Serialize the array as a string
          color: item.color,
          size: item.size,
          oldPrice:item.oldPrice,
          item:JSON.stringify(item)
        },
      })} 
        style={{
          marginHorizontal: 20,
          marginVertical: 25,
        }}
        >
        <Image
          style={{ width: 150, height: 150, resizeMode: "contain" }}
          source={{ uri: item?.image }}
        />
        <Text numberOfLines={1} style={{ marginTop: 10, width: 150 }}>
          {item?.title}
        </Text>

        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500" }}>
            ₹{item?.price}
          </Text>
          <Text style={{ color: "#FFC72C", fontSize: 18, fontWeight: "500" }}>
            {item?.rating.rate} ratings
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          <Text onPress={()=>addItemToCart(item)}>{addedTOCart?"Added to cart":"Add to cart"}</Text>
        </TouchableOpacity>
      </Pressable>
    </>
  );
}
