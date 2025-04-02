import { ActivityIndicator, Alert, Dimensions, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, FontAwesome5, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import axios from 'axios'
// import ReactNativeModal from 'react-native-modal'

const Register = () => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    // const data = {
    //     fullName: "Adegboye",
    //     email: "adegboye@gmail.com",
    //     phoneNumber: "123",
    //     password: "password"
    // }



    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const handleSignup = () => {
        if (!fullName || !email || !phoneNumber || !password) {
            alert('Please fill in all fields')
            return
        }

        const data = {
            fullName,
            email,
            phoneNumber,
            password
        }
        // Logic to handle 
        setLoading(true)
        Keyboard.dismiss()

        axios.post(`${process.env.EXPO_PUBLIC_DB_URI}/api/auth/register`, data).then((response) => {

            setFullName("")
            setEmail("")
            setPhoneNumber("")
            setPassword("")
            setLoading(false)
            // Reset form fields
            Alert.alert("Success", "Registration successful!")

        }).catch((err) => {
            Alert.alert("Error", err.response.data.message)
            setLoading(false)
        })
        // console.log(email, password, fullName, phoneNumber)
    }

    const deviceWidth = Dimensions.get("window").width;
    // const deviceHeight =
    //     Platform.OS === "ios"
    //         ? Dimensions.get("window").height
    //         : require("react-native-extra-dimensions-android").get(
    //             "REAL_WINDOW_HEIGHT"
    //         );

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={{ flex: 1, backgroundColor: '#e6f5e5' }}>
                <View style={styles.container}>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>Create Account</Text>

                    <View style={styles.formBox}>
                        <View style={styles.inputWrapper}>
                            <AntDesign name="user" size={24} color="black" />
                            <TextInput onChangeText={(text) => setFullName(text)} style={styles.input} placeholder='FULL NAME' />
                        </View>
                        <View style={styles.inputWrapper}>
                            <AntDesign name="mail" size={24} color="black" />
                            <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder='EMAIL' />
                        </View>
                        <View style={styles.inputWrapper}>
                            <SimpleLineIcons name="phone" size={24} color="black" />
                            <TextInput onChangeText={(text) => setPhoneNumber(text)} style={styles.input} placeholder='PHONE NO.' />
                        </View>
                        <View style={styles.inputWrapper}>
                            <MaterialIcons name="password" size={24} color="black" />
                            <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} secureTextEntry={true} placeholder='PASSWORD' />
                            <Pressable>
                                <Text style={{ fontWeight: "bold", color: "#b5c413" }}>FORGOT</Text>
                            </Pressable>
                        </View>
                        {!loading ?
                            <>
                                <Pressable disabled={loading} onPress={() => handleSignup()} style={styles.RegisterBtn}>
                                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Register</Text>
                                    <AntDesign name="arrowright" size={24} color="#fff" />
                                </Pressable>
                            </> :
                            <ActivityIndicator size='large' color='#20f12a' />
                        }
                    </View>

                </View >
                <View style={{ flexDirection: "row", gap: 5, justifyContent: "center", paddingBottom: 20 }}>
                    <Text>Already have an account?</Text>
                    <Pressable onPress={() => router.replace("/login")}>
                        <Text style={{ fontWeight: "bold", color: "#20f12a" }}>Sign In</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#e6f5e5'
    },
    formBox: {
        marginTop: 20,
        gap: 15,
    },
    input: {
        flex: 1,
        fontSize: 16
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5
    },
    RegisterBtn: {
        alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        backgroundColor: "#20f12a",
        // padding: 10,
        width: 115,
        height: 50,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
    }
})