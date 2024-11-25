import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  TextInput,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Carousel from "react-native-reanimated-carousel";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import ProductItem from "../../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import {
  BottomModal,
  ModalContent,
  ModalPortal,
  SlideAnimation,
} from "react-native-modals";

export default function HomeScreen() {
  const { width } = Dimensions.get("window");
  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Deals",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Electronics",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobiles",
    },
    {
      id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      name: "Music",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Fashion",
    },
  ];
  const images = [
    "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
  ];
  const deals = [
    {
      id: "20",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 25000,
      price: 19000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "30",
      title:
        "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
      oldPrice: 74000,
      price: 26000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      ],
      color: "Cloud Navy",
      size: "8 GB RAM 128GB Storage",
    },
    {
      id: "40",
      title:
        "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
      oldPrice: 16000,
      price: 14000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
      ],
      color: "Icy Silver",
      size: "6 GB RAM 64GB Storage",
    },
    {
      id: "40",
      title:
        "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
      oldPrice: 12999,
      price: 10999,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
      ],
    },
  ];
  const offers = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
      offer: "72%",
      oldPrice: 7500,
      price: 4500,
      image:
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
      ],
      color: "Green",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
      carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
      image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
      ],
      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchProducts();
  }, []);
  // console.log(products);

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  return (
    <>
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

          {/* Address icon and dynamic address area */}

          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: 15,
              backgroundColor: "#AFEEEE",
              gap: 5,
            }}
          >
            <EvilIcons
              style={{
                height: "100%",
                marginBottom: 2,
                marginLeft: 2,
              }}
              name="location"
              size={25}
              color="black"
            />
            <Pressable
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "500",
                }}
              >
                Deliver to Suraj - Kolkata 741222
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color="black"
              />
            </Pressable>
          </Pressable>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    resizeMode: "contain",
                  }}
                  source={{ uri: item.image }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: 500,
                    marginTop: 5,
                  }}
                >
                  {item.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Carousal view of banners */}
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Carousel
              loop
              width={width}
              height={200}
              autoPlay
              autoPlayInterval={900}
              data={images}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={{
                    width: width,
                    height: 200,
                    resizeMode: "cover",
                  }}
                />
              )}
            />
          </View>

          <View
            style={{
              padding: 5,
              // backgroundColor: "#F0F0F1"
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              Trending Deals Of the Week
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 5,
              marginTop: 10,
            }}
          >
            {deals.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "screens/ProductInfoScreen",
                    params: {
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      carouselImages: JSON.stringify(item.carouselImages), // Serialize the array as a string
                      color: item.color,
                      size: item.size,
                      oldPrice: item.oldPrice,
                      item: JSON.stringify(item),
                    },
                  })
                }
                key={index}
              >
                <Image
                  style={{
                    width: 200,
                    height: 200,
                    resizeMode: "contain",
                  }}
                  source={{ uri: item?.image }}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />
          <Text style={{ padding: 10, fontSize: 20, fontWeight: "bold" }}>
            Today's Deals
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "screens/ProductInfoScreen",
                    params: {
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      carouselImages: JSON.stringify(item.carouselImages), // Serialize the array as a string
                      color: item.color,
                      size: item.size,
                      oldPrice: item.oldPrice,
                      item: JSON.stringify(item),
                    },
                  })
                }
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginVertical: 10,

                  alignItems: "center",
                  justifyContent: "center",
                }}
                key={index}
              >
                <Image
                  style={{
                    height: 100,
                    width: 100,
                    resizeMode: "contain",
                  }}
                  source={{ uri: item?.image }}
                />
                <View
                  style={{
                    backgroundColor: "#E31837",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 4,
                    margin: 5,
                  }}
                >
                  <Text>{item?.offer} Off</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              placeholderStyle={(style = { width: 100 })}
              //   onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 5,
            }}
          >
            {products
              .filter((item) => item?.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "90%", height: 400 }}>
          <View style={{marginBottom:8}}>
            <Text style={{
              fontSize:16,
              fontWeight:"500"
            }}>Choose Your Location</Text>
            <Text style={{marginTop:5,
              fontSize:16,
              color:"gray"
            }}>Select a delivery location to see product availability and delivery options</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Already added addresses */}
            <Pressable 
            onPress={()=>{
              setModalVisible(false);
              router.push("/screens/Addresses")
            }}
            style={{
              width:140,
              height:140,
              borderColor:"#D0D0D0",
              marginTop: 10,
              borderWidth: 1,
              padding: 10,
              display:"flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Text style={{textAlign:"center",
                color:"0066b2",
                fontWeight:"500"
              }}>Add an Address or Pick-up point</Text>
            </Pressable>
          </ScrollView>
          <View style={{display:"flex",
            flexDirection:"column",
            gap:10
          }}>
            <View style={{backgroundColor:"white", display:"flex",
              flexDirection:"row",
              alignItems:"center",
              gap:5
            }}>
            <Entypo name="location-pin" size={22} color="#0066b2" />
            <Text style={{color:"#0066b2", fontWeight:"400"}}>Enter an Indian Pincode</Text>
            </View>

            <View style={{backgroundColor:"white", display:"flex",
              flexDirection:"row",
              alignItems:"center",
              gap:5
            }}>
            <Ionicons name="locate-sharp" size={22} color="#0066b2" />
            <Text style={{color:"#0066b2", fontWeight:"400"}}>Use my current location</Text>
            </View>

            <View style={{backgroundColor:"white", display:"flex",
              flexDirection:"row",
              alignItems:"center",
              gap:5,
              marginLeft:3
            }}>
            <Entypo name="globe" size={20} color="#0066b2" />
            <Text style={{color:"#0066b2", fontWeight:"400"}}>Deliver Outside India</Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
      <ModalPortal />
    </>
  );
}
