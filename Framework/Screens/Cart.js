import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, StatusBar, Pressable, Modal, Alert } from 'react-native';
import { formatMoney } from '../Components/FormatMoney';
import { AppContext } from '../Components/globalVariables';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/settings';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { AppBotton } from '../Components/AppBotton';
import { Theme } from '../Components/Theme';

export function Cart({ navigation }) {
    const { userInfo, setPreloader, userUID } = useContext(AppContext)
    const [cart, setCart] = useState([]);
    const [fetchChanges, setfetchChanges] = useState(6687);
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Florida T-Shirt',
            price: 620,
            image: 'https://img.freepik.com/free-photo/creased-t-shirt_23-2147704086.jpg?t=st=1723814609~exp=1723818209~hmac=546f903e17aa2f5f483a5a0237f36d6b971ca45844be3f467cfee3fa795611ed&w=900',
        },
        {
            id: 2,
            name: 'Nike Airforce',
            price: 1200,
            image: 'https://img.freepik.com/free-photo/pair-trainers_144627-3799.jpg?t=st=1723813876~exp=1723817476~hmac=efa45ec722f6c3338abb97838470410f7e010f6adf76c57c5dff78b2277c62c0&w=900',
        },
        {
            id: 3,
            name: 'Hoop Earrings',
            price: 80,
            image: 'https://img.freepik.com/premium-photo/fashion-women-s-earrings-gold-women-s-jewelery-gift_179493-477.jpg?w=740',
        },
    ]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [amount, setAmount] = useState(0);
    const [seletedItem, setseletedItem] = useState({});
    const [vendor, setVendor] = useState({});

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };

    const subtotal = cart.reduce((sum, item) => sum + Number(item.price), 0);
    const shipping = subtotal * 0.15;
    const total = subtotal + shipping;

    function getCartItem() {
        userInfo.cart.map((item) => {
            getDoc(doc(db, "products", item))
                .then(response => {
                    setCart(prev => [...prev, response.data()])
                    setfetchChanges(Math.random())
                })
                .catch(e => console.log(e))
        })
    }

    function getVendor(id) {
        setPreloader(true)
        getDoc(doc(db, "users", id))
            .then(response => {
                setPreloader(false)
                setVendor({ ...response.data(), userUID: id })
                closeModal()
            })
            .catch(e => {
                setPreloader(false)
                console.log(e);
                Alert.alert("Vendor", "Unable to get vendor's detials. Try again")
            })
    }

    useEffect(() => {
        getCartItem();
        // console.log(cart);
    }, [])

    // useEffect(() => {
    //     setCart(cart);
    //     // console.log(cart);
    // }, [fetchChanges])


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Shopping Cart</Text>
                <TouchableOpacity>
                    <Text style={styles.cartIcon}>🛍️</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.itemsCountContainer}>
                <Text style={styles.itemsCount}>{userInfo.cart.length} Items</Text>
            </View>

            <FlatList
                data={cart}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <Text style={styles.itemName}>{item.title}</Text>
                        <View>
                            <Text style={styles.itemPrice}>${formatMoney(item.price)}</Text>
                            <AppBotton
                                onPress={() => { setseletedItem(item); setAmount(Number(item.price)); getVendor(item.userId) }}
                            >Checkout</AppBotton>
                        </View>
                    </View>

                )}
                keyExtractor={(item) => item.createdAt.toString() + Math.random()}
                contentContainerStyle={styles.cartList}
            />

            <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Subtotal</Text>
                    <Text style={styles.summaryText}>${subtotal}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Shipping</Text>
                    <Text style={styles.summaryText}>${shipping}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text style={styles.totalText}>${total}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisibility}
                animationType="slide"
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                    <Pressable style={{ flex: 1 }} onPress={closeModal} >
                    </Pressable>
                    <View style={{ backgroundColor: "#fcfbff", borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                        <View style={{ alignItems: 'flex-end', margin: 10 }}>
                            <TouchableOpacity onPress={closeModal}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size={24}
                                    color='#787A8D'
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 20 }}>

                            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                <Text style={[styles.header, { fontSize: 25 }]}>Confirm Transaction</Text>
                            </View>
                            <View style={{ marginTop: 20, margin: 15, }}>

                                <View style={{ alignItems: 'center', marginBottom: 20, justifyContent: "space-between", flexDirection: "row" }}>
                                    <Text style={styles.modalText}>Payment Method</Text>
                                    <Text style={[styles.modalText, { color: Theme.colors.text, fontSize: 20, fontWeight: "bold", fontFamily: null }]}>Paystack(ATM Card)</Text>
                                </View>

                                <View style={{ alignItems: 'center', marginBottom: 20, justifyContent: "space-between", flexDirection: "row" }}>
                                    <Text style={styles.modalText}>Vendor</Text>
                                    <Text style={[styles.modalText, { color: Theme.colors.text, fontSize: 20, fontWeight: "bold", fontFamily: null }]}>{vendor.firstname} {vendor.lastname}</Text>
                                </View>
                                <View style={{ alignItems: 'center', marginBottom: 20, justifyContent: "space-between", flexDirection: "row" }}>
                                    <Text style={styles.modalText}>Product</Text>
                                    <Text style={[styles.modalText, { color: Theme.colors.text, fontSize: 20, fontWeight: "bold", fontFamily: null }]}>{seletedItem.title}</Text>
                                </View>
                                <View style={{ alignItems: 'center', marginBottom: 20, justifyContent: "space-between", flexDirection: "row" }}>
                                    <Text style={styles.modalText}>Fee</Text>
                                    <Text style={[styles.modalText, { color: Theme.colors.text, fontSize: 20, fontWeight: "bold", fontFamily: null }]}>1.8%</Text>
                                </View>

                                <View style={{ alignItems: 'center', marginBottom: 20, justifyContent: "space-between", flexDirection: "row" }}>
                                    <Text style={styles.modalText}>Amount</Text>
                                    <Text style={[styles.modalText, { color: Theme.colors.text, fontSize: 20, fontWeight: "bold", fontFamily: null }]}>₦{formatMoney(amount)}</Text>
                                </View>

                                <View style={{ alignItems: 'center', marginBottom: 30, justifyContent: "space-between", flexDirection: "row" }}>
                                    <Text style={styles.modalText}>Total</Text>
                                    <Text style={[styles.modalText, { color: Theme.colors.green, fontSize: 20, fontWeight: "bold", fontFamily: null }]}>₦{formatMoney(amount + ((1.8 / 100) * amount))}</Text>
                                </View>

                                <TouchableOpacity onPress={() => { closeModal(); navigation.navigate("Checkout", { amount: amount, vendor }) }} style={styles.appBTN}>
                                    <Text style={{ fontSize: 16, color: "white", fontFamily: Theme.fonts.text600 }}>Pay Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        alignItems: 'center',
    },
    backArrow: {
        fontSize: 24,
        color: 'black',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00000094',
    },
    cartIcon: {
        fontSize: 24,
    },
    itemsCountContainer: {
        backgroundColor: 'purple',
        paddingVertical: 8,
        alignItems: 'center',
    },
    itemsCount: {
        fontSize: 18,
        color: '#fff',
    },
    cartList: {
        padding: 16,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'purple',
        paddingVertical: 16,
    },
    itemDetails: {
        flex: 1,
        paddingLeft: 16,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 4,
    },

    itemImage: {
        width: 80,
        height: 80,
    },
    itemPrice: {
        fontSize: 18,
        color: 'black',
        alignContent: 'flex-end'
    },
    summaryContainer: {
        borderTopWidth: 1,
        borderTopColor: 'purple',
        padding: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    summaryText: {
        fontSize: 16,
        color: 'black',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    checkoutButton: {
        backgroundColor: 'purple',
        padding: 16,
        margin: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    appBTN: {
        borderWidth: 1,
        borderColor: Theme.colors.green,
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: Theme.colors.green
    },
    modalText: {
        fontFamily: Theme.fonts.text400,
        fontSize: 16
    }
});