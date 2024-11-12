import { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, Alert, ScrollView, FlatList, RefreshControl, ImageBackground } from "react-native";
import { Theme } from "../Components/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell, faHeart } from "@fortawesome/free-regular-svg-icons";
import { Searchbar } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile } from "./Profile";
// import Carousel from 'react-native-reanimated-carousel';
import { Ionicons } from "@expo/vector-icons";
import { formatMoney } from "../Components/FormatMoney";
import { AppBotton } from "../Components/AppBotton";
import { LinearGradient } from "expo-linear-gradient";
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { AppContext } from "../Components/globalVariables";
import { db } from "../Firebase/settings";
import { PostProduct } from "./PostProduct";
import { Cart } from "./Cart";

// const products = [
//     {
//         name: "Realistic virtual reality headset",
//         image: "https://img.freepik.com/free-vector/realistic-virtual-reality-headset_52683-52870.jpg?t=st=1730276062~exp=1730279662~hmac=8636a638b9a928ed3f2935c65a8b0464d18bebe5cc32542324f93b212df9fec5&w=996",
//         price: 13200
//     },
//     {
//         name: "A Globe",
//         image: "https://img.freepik.com/premium-photo/globe-with-globe-it-sits-table_1078211-582808.jpg?w=996",
//         price: 54000
//     }
// ];


function Home({ navigation }) {
    const { width, height } = Dimensions.get("screen")
    const { userUID, setDoc, setPreloader, setUserInfo } = useContext(AppContext)
    const [products, setProducts] = useState([])

    // miracleobafemi09@gmail.com

    function getUserInfo() {
        setPreloader(true);
        // getDoc(doc(db, "users", userUID))
        //     .then((user) => {
        //         setUserInfo(user.data());
        //         setPreloader(false);
        //     })
        //     .catch(e => { setPreloader(false); console.log(e) });

        onSnapshot(doc(db, "users", userUID), (snapShot) => {
            setPreloader(false);
            snapShot.exists() ? setUserInfo(snapShot.data()) : null;
        });
    }

    function getAllProducts() {
        setPreloader(true);
        getDocs(collection(db, "products"))
            .then((all) => {
                let col = []
                all.forEach((item) => {
                    // item.data();
                    // setProducts((pre) => [...pre, item.data()])
                    // setProducts([...products, item.data()])
                    col.push({ ...item.data(), docID: item.id })
                })
                // console.log(JSON.stringify(col, null, 2));

                setProducts(col)
                setPreloader(false);
            })
            .catch(e => { setPreloader(false); console.log(e) })
        // onSnapshot(doc(db, "users", userUID), (snapShot) => {
        //     setPreloader(false);
        //     snapShot.exists() ? setUserInfo(snapShot.data()) : null;
        // });

    }

    useEffect(() => {
        getUserInfo();
        getAllProducts();
    }, []);


    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <ImageBackground source={require("../../assets/landing.jpg")} style={{ height: height / 2, width: "100%" }} >
                    <LinearGradient
                        start={{ x: 0, y: 1.5 }} end={{ x: 1.5, y: 0 }}
                        colors={["#2c07d3", "#c500003e"]} style={{
                            flex: 1,
                            padding: 20,
                            justifyContent: "space-between",
                        }}
                    >
                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                            <Text style={[styles.header, { color: "white" }]}>Check products</Text>
                            <AppBotton style={{ alignSelf: "flex-start", paddingHorizontal: 30, marginTop: 10 }}>Products</AppBotton>
                        </View >
                    </LinearGradient>
                </ImageBackground>
                <View style={styles.constainer}>
                    {/*  */}
                    <View style={{ marginVertical: 20 }}>
                        <Text style={styles.text}>Recent product</Text>
                    </View>

                    <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between" }}>
                        {products.map((item, i) =>
                            <View key={i} style={{ backgroundColor: "white", borderRadius: 10, width: (width / 2) - 20, marginBottom: 10 }}>
                                <Image source={{ uri: item.image }} style={{ width: "100%", height: 150, borderTopRightRadius: 10, borderTopLeftRadius: 10 }} />
                                <View style={{ padding: 10, }}>
                                    <Text numberOfLines={1} style={{ fontSize: 15, fontFamily: Theme.fonts.text400, color: Theme.colors.text2 }}>{item.title}</Text>
                                    <Text style={{ fontSize: 18, fontFamily: Theme.fonts.text600, marginVertical: 10 }}>₦{formatMoney(item.price)}</Text>
                                    <AppBotton onPress={() => { setDoc(item); navigation.navigate("Details"); }}>Buy Now</AppBotton>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const Tab = createBottomTabNavigator();

export function HomeScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    let size;
                    if (route.name === 'Home') {
                        size = focused ? 35 : 23
                        iconName = focused ? 'home' : 'home-outline';
                    }
                    else if (route.name === 'PostProduct') {
                        size = focused ? 35 : 23
                        iconName = focused ? 'bag-add' : 'bag-add-outline';
                    }
                    else if (route.name === 'Cart') {
                        size = focused ? 35 : 23
                        iconName = focused ? 'cart' : 'cart-outline';
                    }
                    else if (route.name === 'Profile') {
                        size = focused ? 35 : 23
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: Theme.colors.primary,
                tabBarInactiveTintColor: Theme.colors.gray,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="PostProduct" component={PostProduct} options={{ title: "Post Ads" }} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="Profile" component={Profile} options={{ title: "Account" }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        padding: 15,
        paddingTop: 0,
    },
    header: {
        fontSize: 30,
        fontFamily: Theme.fonts.text700,
        color: Theme.colors.text1
    },
    text: {
        fontSize: 16,
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.text2
    },

})