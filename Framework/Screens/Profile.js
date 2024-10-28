import { View, StyleSheet, Text, Platform, StatusBar, TouchableOpacity, Image, Modal, Pressable, ScrollView, Alert, RefreshControl, SafeAreaView } from "react-native";
import { Theme } from "../Components/Theme";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faArrowRightRotate, faPlusCircle, faUserCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AppBotton } from "../Components/AppBotton";
import { AntDesign, Feather, FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { formatMoney } from "../Components/FormatMoney";

export function Profile({ navigation }) {
    const [modalVisibility, setModalVisibility] = useState(false);

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };

    function logout() {
        setPreloader(true)
        setTimeout(() => {
            setPreloader(false)
            navigation.replace("Intro")
        }, 3000);
    }

    const refreshControl = () => { }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", marginTop: StatusBar.currentHeight }}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={false} onRefresh={refreshControl} />
            } showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <Image style={{ width: 70, height: 70, borderRadius: 50 }}
                            source={require("../../assets/user.png")} />

                        <View style={{ marginBottom: 10, }}>
                            <Text style={{ fontSize: 22, fontFamily: Theme.fonts.text700 }}>John Wick</Text>
                            <Text style={{ fontSize: 15, fontFamily: Theme.fonts.text400, color: Theme.colors.light.text2 }}>john@gmail.com</Text>
                            <TouchableOpacity
                                style={{ borderColor: Theme.colors.primary, borderWidth: 1, padding: 5, paddingHorizontal: 10, borderRadius: 100, width: 130, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                                <FontAwesomeIcon icon={faUserCircle} color={Theme.colors.primary} />
                                <Text style={{ fontSize: 13, alignItems: 'center', fontWeight: 'bold', marginLeft: 5, color: Theme.colors.primary }}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 20, borderColor: Theme.colors.light.line, borderWidth: 1, borderRadius: 10, padding: 10 }}>
                        <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: 15, fontFamily: Theme.fonts.text500, }}>Wallet Balance</Text>
                            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                                <FontAwesomeIcon icon={faArrowRightRotate} color={Theme.colors.primary} size={11} style={{ marginTop: 3 }} />
                                <Text style={{ fontSize: 14, fontFamily: Theme.fonts.text400, color: Theme.colors.primary, }}>Transaction History</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 13, fontFamily: Theme.fonts.text700, }}>₦<Text style={{ fontSize: 30 }}>{formatMoney(9380000)}</Text></Text>
                        <Text style={{ fontSize: 13, color: Theme.colors.primary, fontFamily: Theme.fonts.text400 }}>Asset Balance: ₦<Text style={{ fontSize: 15, fontFamily: Theme.fonts.text700, }}>{formatMoney(830000)}</Text></Text>

                        <View style={{ marginTop: 25, flexDirection: "row", justifyContent: "space-around" }}>
                            <TouchableOpacity style={{ alignItems: "center" }}>
                                <View style={{ backgroundColor: Theme.colors.primary + 20, borderRadius: 10, padding: 5 }}>
                                    <Ionicons name="arrow-down" size={20} color={Theme.colors.primary} />
                                </View>
                                <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 14, color: Theme.colors.light.text1 }}>Deposit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: "center" }}>
                                <View style={{ backgroundColor: Theme.colors.primary + 20, borderRadius: 10, padding: 5 }}>
                                    <Feather name="arrow-up-right" size={20} color={Theme.colors.primary} />
                                </View>
                                <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 14, color: Theme.colors.light.text1 }}>Withdraw</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginTop: 10, paddingTop: 20, }}>

                        <TouchableOpacity style={styles.ProfileBtn}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Ionicons name="heart-outline" size={24} style={{ paddingRight: 10, color: Theme.colors.light.text2 }} />
                                <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 16 }}>My Listing</Text>
                            </View>
                            <FontAwesomeIcon icon={faAngleRight} size={20} color={Theme.colors.light.text2} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.ProfileBtn}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <AntDesign name="idcard" size={24} style={{ paddingRight: 10, color: Theme.colors.light.text2 }} />
                                <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 16 }}>Account Verification</Text>
                            </View>
                            <FontAwesomeIcon icon={faAngleRight} size={20} color={Theme.colors.light.text2} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.ProfileBtn}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Ionicons name="gift-outline" size={24} style={{ paddingRight: 10, color: Theme.colors.light.text2 }} />
                                <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 16 }}>Referral Bonus</Text>
                            </View>
                            <FontAwesomeIcon icon={faAngleRight} size={20} color={Theme.colors.light.text2} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.ProfileBtn}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <AntDesign name="key" size={24} style={{ paddingRight: 10, color: Theme.colors.light.text2 }} />
                                <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 16 }}>Transaction Pin</Text>
                            </View>
                            <FontAwesomeIcon icon={faAngleRight} size={20} color={Theme.colors.light.text2} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.ProfileBtn}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <AntDesign name="message1" size={24} style={{ paddingRight: 10, color: Theme.colors.light.text2 }} />
                                <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 16 }}>Help & Feedback</Text>
                            </View>
                            <FontAwesomeIcon icon={faAngleRight} size={20} color={Theme.colors.light.text2} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.ProfileBtn}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <AntDesign name="Safety" size={24} style={{ paddingRight: 10, color: Theme.colors.light.text2 }} />
                                <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 16 }}>Privacy Policy</Text>
                            </View>
                            <FontAwesomeIcon icon={faAngleRight} size={20} color={Theme.colors.light.text2} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.ProfileBtn}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <MaterialCommunityIcons name='format-list-text' size={24} style={{ paddingRight: 10, color: Theme.colors.light.text2 }} />
                                <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 16 }}>Terms of Use</Text>
                            </View>
                            <FontAwesomeIcon icon={faAngleRight} size={20} color={Theme.colors.light.text2} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ProfileBtn}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Ionicons name='trash-outline' size={24} style={{ paddingRight: 10, color: Theme.colors.red, }} />
                                <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 16, color: Theme.colors.red, }}>Delete Account</Text>
                            </View>
                            <FontAwesomeIcon icon={faAngleRight} size={20} color={Theme.colors.light.text2} />
                        </TouchableOpacity>

                    </View>

                    <View style={{ marginTop: 30 }}>
                        <AppBotton onPress={closeModal} style={{ borderColor: Theme.colors.red, backgroundColor: "transparent", borderWidth: 1 }} textColor={Theme.colors.red}>Sign Out</AppBotton>
                        <Text style={{ fontSize: 13, color: Theme.colors.light.text2, fontFamily: Theme.fonts.text400, textAlign: "center", marginTop: 10 }}>Profiter Version: v1.0.1</Text>
                    </View>
                </View>
            </ScrollView>


            {/* logout  modal  */}
            <Modal
                visible={modalVisibility}
                animationType="slide"
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: "#000000cc" }}>
                    <Pressable style={{ flex: 1 }} onPress={closeModal} >
                    </Pressable>
                    <View style={{ height: 200, backgroundColor: Theme.colors.light.bg, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                        <View style={{ alignItems: 'flex-end', margin: 10 }}>
                            <TouchableOpacity onPress={closeModal}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size={24}
                                    color={Theme.colors.light.text2}
                                />
                            </TouchableOpacity>
                        </View>
                        <View>

                            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ fontSize: 16, fontFamily: Theme.fonts.text400 }}>Are you sure you want to log out?</Text>
                            </View>

                            <View style={{
                                marginTop: 20, margin: 15,
                            }}>

                                <AppBotton onPress={() => { closeModal(); logout() }} style={{ borderColor: Theme.colors.red, backgroundColor: "transparent", borderWidth: 1 }} textColor={Theme.colors.red}>Yes, Sign Out</AppBotton>
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        padding: 20,
    },
    EditProfileBtn: {
        borderWidth: 1,
        paddingHorizontal: 20,
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 10,
        // flex: 1,
        backgroundColor: Theme.colors.primary
    },
    ProfileBtn: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        borderRadius: 10,
        marginBottom: 10,
        borderColor: Theme.colors.light.line,
        borderBottomWidth: 1
    },
})