import { Alert, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Components/globalVariables';
import { formatMoney } from '../Components/FormatMoney';
import { Theme } from '../Components/Theme';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRotateBack, faTrash } from '@fortawesome/free-solid-svg-icons';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../Firebase/settings';
import { errorMessage } from '../Components/formatErrorMessage';

export function MyProducts() {
    const { setUserInfo, setPreloader, userUID } = useContext(AppContext)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setPreloader(true)
        onSnapshot(query(collection(db, 'products'), where('userId', '==', userUID)), (snapshot) => {
            const allData = []
            snapshot.forEach(item => {
                allData.push({ ...item.data(), docID: item.id })
            })
            setProducts(allData);
            setPreloader(false)
            // console.log(allData);
        })
    }, []);

    function deleteProduct(id, name) {
        setPreloader(true)
        deleteDoc(doc(db, "products", id))
            .then(() => {
                setPreloader(false)
                Alert.alert(
                    "Delete Product!",
                    `(${name}) has been deleted successfully`,
                )
            })
            .catch(e => {
                setPreloader(false)
                Alert.alert(
                    "Error!",
                    errorMessage(e.code),
                    [{ text: "Try Again" }]
                )
            })
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 10, flex: 1 }}>
                <View
                    style={{
                        backgroundColor: "white",
                        padding: 8,
                        paddingVertical: 20,
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingRight: 4,
                            alignItems: "center",
                        }}
                    >
                        <View>
                            <Text style={{ fontSize: 17, fontFamily: Theme.fonts.text600 }}>
                                My Posted Products
                            </Text>

                        </View>

                    </View>
                    <View style={styles.container}>
                        {products && products?.length > 0 ? (
                            products.map((item, index) => (
                                <View style={{ flex: 1 }} key={index}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{ width: "100%", height: 150, borderRadius: 10 }}
                                    />
                                    <View style={{ padding: 5, flex: 1 }} >
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{}}
                                        >
                                            {item.title}
                                        </Text>
                                        <View>
                                            <Text style={{ fontWeight: 600, fontSize: 16 }}>{formatMoney(item.price)}</Text>
                                            <TouchableOpacity onPress={() => {
                                                Alert.alert(
                                                    "Delete Product!",
                                                    `Are you sure you want to delete this product? (${item.title})`,
                                                    [{ text: "No", style: "cancel" }, { text: "Yes!", onPress: () => { deleteProduct(item.docID, item.title) }, style: "destructive" }]
                                                )
                                            }}>
                                                <FontAwesomeIcon icon={faTrash} color={Theme.colors.red} size={25} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text
                                            style={{ fontWeight: 400, fontSize: 12, color: "gray", textTransform: "capitalize" }}
                                        >
                                            {item.category}
                                        </Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 30 }}>
                                <View style={{ width: 130, height: 130, alignItems: "center", justifyContent: "center", backgroundColor: Theme.colors.light.bg2, borderRadius: 100 }}>
                                    <FontAwesome5 name="clipboard-list" size={60} color={Theme.colors.primary} />
                                </View>
                                <Text style={{ fontSize: 20, color: Theme.colors.light.text1, fontFamily: Theme.fonts.text600, textTransform: "capitalize", marginTop: 20 }}>No items yet</Text>
                                <Text style={{ color: Theme.colors.light.text2, textAlign: 'center', marginTop: 10 }}>Your Sell Assets is currently empty. Start posting your assets to fill it up</Text>

                                {/* <TouchableOpacity onPress={() => { }} style={{ flexDirection: "row", alignItems: "center", marginTop: 10, gap: 5 }}>
                                    <FontAwesomeIcon icon={faRotateBack} color={Theme.colors.primary} />
                                    <Text style={{
                                        color: Theme.colors.primary, fontSize: 18, fontFamily: Theme.fonts.text600
                                    }}>Refresh</Text>
                                </TouchableOpacity> */}
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 20,
        justifyContent: "space-between",
        padding: 16,
        flex: 1
    },
    item: {
        width: "49%",
        marginVertical: 7,
        padding: 16,
        backgroundColor: "#f6f6f6",
    },
});