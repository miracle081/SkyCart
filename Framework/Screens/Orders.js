import { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, Alert, ScrollView, FlatList, RefreshControl, ImageBackground } from "react-native";
import { Theme } from "../Components/Theme";
import { formatMoney } from "../Components/FormatMoney";
import { AppBotton } from "../Components/AppBotton";
import { LinearGradient } from "expo-linear-gradient";
import { collection, doc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { AppContext } from "../Components/globalVariables";
import { db } from "../Firebase/settings";
import { ToastApp } from "../Components/Toast";


export function Orders({ navigation }) {
    const { width, height } = Dimensions.get("screen")
    const { userUID, setDoc, setPreloader, setUserInfo } = useContext(AppContext)
    const [products, setProducts] = useState([])


    function getAllProducts() {
        setPreloader(true);
        // getDocs(collection(db, "order"))
        //     .then((all) => {
        //         let col = []
        //         all.forEach((item) => {
        //             // item.data();
        //             // setProducts((pre) => [...pre, item.data()])
        //             // setProducts([...products, item.data()])
        //             col.push({ ...item.data(), docID: item.id })
        //         })
        //         // console.log(JSON.stringify(col, null, 2));

        //         setProducts(col)
        //         setPreloader(false);
        //     })
        //     .catch(e => { setPreloader(false); console.log(e) })

        const q = collection(db, 'order');
        const filter = query(q, where('clientID', '==', userUID));
        onSnapshot(filter, (snapShot) => {
            let data = [];
            snapShot.forEach((doc) => {
                data.push({ ...doc.data(), docID: doc.id })
            })
            setProducts(data);
            // console.log(data);
            setPreloader(false)
        });

    }

    useEffect(() => {
        getAllProducts();
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: Theme.colors.light.bg2 }}>
            <ScrollView>
                <View style={styles.constainer}>
                    {/*  */}
                    <View style={{ marginVertical: 20 }}>
                        <Text style={styles.header}>Orders</Text>
                    </View>

                    <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between" }}>
                        {products.map((item, i) =>
                            <View key={i} style={{ backgroundColor: "white", borderRadius: 10, width: (width / 2) - 20, marginBottom: 10 }}>
                                <Image source={{ uri: item.image }} style={{ width: "100%", height: 150, borderTopRightRadius: 10, borderTopLeftRadius: 10 }} />
                                <View style={{ padding: 10, }}>
                                    <Text numberOfLines={1} style={{ fontSize: 15, fontFamily: Theme.fonts.text400, color: Theme.colors.text2 }}>{item.title}</Text>
                                    <Text style={{ fontSize: 18, fontFamily: Theme.fonts.text600, marginVertical: 10 }}>₦{formatMoney(item.price)}</Text>
                                    <Text style={{ fontSize: 18, fontFamily: Theme.fonts.text600, marginVertical: 10, color: Theme.colors.yellow }}>{String(item.status).replace("-", " *")}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
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

});