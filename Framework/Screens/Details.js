import { ScrollView, View, SafeAreaView, Image, Text, TouchableOpacity, Alert } from "react-native";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { AppBotton } from "../Components/AppBotton";
import { Theme } from "../Components/Theme";
import { LinearGradient } from 'expo-linear-gradient';
import GradientText from '../Components/GradientText';
import { AppContext } from "../Components/GlobalVariables";
import { formatMoney } from "../Components/FormatMoney";
import { updateDoc, doc as dbDoc } from "firebase/firestore";
import { db } from "../Firebase/settings";
import { errorMessage } from "../Components/formatErrorMessage";

export function Details({ navigation }) {
    const { userInfo, setPreloader, userUID, doc } = useContext(AppContext)
    const [Price, setPrice] = useState('#10,000');
    const [size, setSize] = useState('10');
    const [color, setColor] = useState('Black');


    const handleAddToCart = () => {
        setPreloader(true);
        updateDoc(dbDoc(db, "users", userUID), {
            cart: [...userInfo.cart, doc.docID]
        }).then(() => {
            setPreloader(false);
            alert("Cart Product", `${doc.title} has been added to your cart!`);
        }).catch((e) => {
            setPreloader(false);
            Alert.alert(
                "Error!",
                errorMessage(e.code),
                [{ text: "Try Again" }]
            )
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView style={{ flex: 1 }}>

                <View style={{ padding: 15, flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1, gap: 15 }}>
                        <GradientText colors={['#800080', '#4B0082']} style={{ fontSize: 30, flex: 1 }}>
                            <Text style={{ color: 'white', fontFamily: Theme.fonts.text500 }}> {doc.title}</Text>
                        </GradientText>
                        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                            <FontAwesomeIcon icon={faCartShopping} size={30} color="purple" />
                        </TouchableOpacity>
                    </View>
                    {/* <Text style={{ fontFamily: Theme.fonts.text400, fontSize: 20, color: "black" }}>Elevate Your Style with Our Sleek Jacket</Text> */}
                </View>


                <View style={{ height: 300 }}>
                    <Image source={{ uri: doc.image }} style={{ width: "100%", height: "100%", marginRight: 10, }} />
                    {/* <ScrollView horizontal>
                            <Image source={{ uri: "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724749207/img13_onqewq.jpg" }} style={{ width: 300, height: 300, marginRight: 10, borderRadius: 10 }} />
                            <Image source={{ uri: "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724749207/img13_onqewq.jpg" }} style={{ width: 300, height: 300, marginRight: 10, borderRadius: 10 }} />
                        </ScrollView> */}
                </View>


                <View style={{ padding: 10 }}>

                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 20 }}>Price:</Text>
                            <Text style={{ fontSize: 25, fontFamily: Theme.fonts.text700, color: Theme.colors.primary }}>₦{formatMoney(doc.price)}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={{ fontSize: 20 }}>Catigory:</Text>
                            <Text style={{ fontSize: 20, fontFamily: Theme.fonts.text600 }}>{doc.category}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={{ fontSize: 20 }}>Location:</Text>
                            <Text style={{ fontSize: 20, fontFamily: Theme.fonts.text600 }}>{doc.location}</Text>
                        </View>
                    </View>

                    <View style={{ borderRadius: 5, marginTop: 20 }}>
                        <Text style={{ fontSize: 20, fontFamily: Theme.fonts.text500 }}>Description</Text>
                        <Text style={{ color: Theme.colors.gray, fontSize: 16 }}>{doc.description}</Text>
                    </View>
                </View>
            </ScrollView>


            <TouchableOpacity onPress={handleAddToCart} style={{ borderRadius: 20, margin: 15 }}>
                <LinearGradient
                    colors={['#800080', '#4B0082', "blue"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 20, alignItems: 'center', borderRadius: 20 }}
                >
                    <Text style={{ color: '#fff', fontSize: 20 }}>Add to Cart</Text>
                </LinearGradient>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
