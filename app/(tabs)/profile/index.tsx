import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalContext'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const index = () => {
    const { logout } = useGlobalContext()
    const [userId, setuserId] = useState("")
    const { user } = useGlobalContext()



    // useEffect(() => {
    //  async function getUserId() {
    //     const token = await AsyncStorage.getItem("token");
    //     const decode = json_decode(token)
    //     setuserId(decode.userId)    
    //  }
    //  getUserId()
    // }, [])

    // useEffect(() => {
    //    const getUserProfile = async ()=> {
    //     try {
    //         const user = await axios.get(`${process.env.DB_URL}/api/user/${userId}`)
    //       setuserId(user.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    //    }
    // }, [userId])    

    const router = useRouter()
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.topCard}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={styles.icon_bg}>
                        <MaterialCommunityIcons name="dots-grid" size={24} color="black" />
                    </View>
                    <Text style={{ fontWeight: "bold", letterSpacing: 2 }}>PROFILE</Text>
                    <Pressable onPress={() => router.push("../profile/edit")}>
                        <View style={styles.icon_bg}>
                            <MaterialCommunityIcons name="pencil" size={24} color="black" />
                        </View>
                    </Pressable>
                </View>

                <View style={styles.profile}>
                    <View style={styles.profile_img_wrapper}>
                        <Image style={styles.profile_img} source={require("../../../assets/images/coffee.png")} />
                    </View>
                    <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold" }}>{user?.fullName.toUpperCase()}</Text>
                        <Text style={{ fontWeight: "bold" }}>{user?.email}</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={styles.actions}>
                    <Pressable onPress={() => router.push("../order/orders")}>
                        <View style={styles.order}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                                <View style={{ padding: 10, borderRadius: 5, backgroundColor: "#f6eaca" }}>
                                    <FontAwesome name="history" size={24} color="black" />
                                </View>
                                <Text style={{ fontWeight: "bold" }}>Orders</Text>
                            </View>
                            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                        </View>
                    </Pressable>
                    <View style={styles.order}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <View style={{ padding: 10, borderRadius: 5, backgroundColor: "#f6eaca" }}>
                                <FontAwesome name="history" size={24} color="black" />
                            </View>
                            <Text style={{ fontWeight: "bold" }}>Share to Friends</Text>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                    </View>
                    <View style={styles.order}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <View style={{ padding: 10, borderRadius: 5, backgroundColor: "#f6eaca" }}>
                                <FontAwesome name="history" size={24} color="black" />
                            </View>
                            <Text style={{ fontWeight: "bold" }}>Change Password</Text>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                    </View>
                    <View style={styles.order}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <View style={{ padding: 10, borderRadius: 5, backgroundColor: "#f6eaca" }}>
                                <FontAwesome name="history" size={24} color="black" />
                            </View>
                            <Text style={{ fontWeight: "bold" }}>Follow Social Pages</Text>
                        </View>
                        <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                    </View>
                    <Pressable style={{ padding: 20, backgroundColor: "#1cd651", flexDirection: "row", gap: 10 }} onPress={() => logout()}>
                        <MaterialIcons name="logout" size={24} color="black" />
                        <Text style={{ fontWeight: "bold", fontSize: 18, color: "#fff", textAlign: "center" }}>Logout</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    topCard: {
        height: 300,
        backgroundColor: '#9af4b1',
        padding: 20
    },
    actions: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        gap: 5,
        // marginBottom: 100
    },
    order: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        gap: 10,
        backgroundColor: "#fff",
        borderRadius: 5
    },
    icon_bg: {
        backgroundColor: "#ffffff40",
        padding: 5,
        borderRadius: 5
    },
    profile: {
        justifyContent: 'center',
        alignItems: "center",
        flex: 1

    },
    profile_img_wrapper: {
        borderWidth: 3,
        borderColor: "#fff",
        width: 150,
        height: 150,
        borderRadius: 50,
        padding: 10
    },
    profile_img: {
        width: "100%",
        height: "100%",
    }
})