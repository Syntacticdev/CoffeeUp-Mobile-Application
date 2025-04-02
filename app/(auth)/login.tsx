import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGlobalContext } from '@/context/GlobalContext'
import { StatusBar } from 'expo-status-bar'


const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    const { setIsAuthenticated } = useGlobalContext()


    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    router.replace("/(tabs)")
                }
            } catch (error) {
                console.log(error);
            }
        }

        checkLoginStatus();
    }, [])

    useEffect(() => {
        let timeout = setTimeout(() => {
            setError(null)
        }, 2500)

        return () => {
            clearTimeout(timeout)
        }
    }, [error])


    const handleLogin = () => {
        if (!email || !password) {
            alert('Please fill in all fields')
            return
        }
        setLoading(true)
        axios.post(`${process.env.EXPO_PUBLIC_DB_URI}/api/auth/login`, { email, password }).then((response) => {
            AsyncStorage.setItem('authToken', JSON.stringify(response.data.token))
            router.push('/(tabs)') // Navigate to the tabs screen after successful login
            setIsAuthenticated(true)
            setLoading(false)
        }).catch((error) => {
            if (error) {
                setError(error.response.data.message)
                console.log(error.response.data.message)
            }
            setLoading(false)
        })
    }
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Login</Text>
            <Text style={{ fontSize: 16 }}>Please sign in to continue</Text>
            {error !== null && <Text style={{ fontSize: 16, color: "#ec5858", fontWeight: "bold" }}>{error}</Text>}

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.formBox}>
                    <View style={styles.inputWrapper}>
                        <MaterialIcons name='email' size={24} />
                        <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder='EMAIL' />
                    </View>
                    <View style={styles.inputWrapper}>
                        <MaterialIcons name='key' size={24} />
                        <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} secureTextEntry={true} placeholder='PASSWORD' />
                        <Pressable>
                            <Text style={{ fontWeight: "bold", color: "#b5c413" }}>FORGOT</Text>
                        </Pressable>
                    </View>
                    {
                        !loading ? (
                            <Pressable onPress={() => handleLogin()} style={styles.loginBtn}>
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Login</Text>
                                <AntDesign name="arrowright" size={24} color="#fff" />
                            </Pressable>
                        ) : (
                            <ActivityIndicator size='large' color='#20f12a' />
                        )
                    }
                </View>
                <View style={{ flexDirection: "row", gap: 5, justifyContent: "center", }}>
                    <Text>Don't have an account?</Text>
                    <Pressable onPress={() => router.push('/register')} >
                        <Text style={{ fontWeight: "bold", color: "#20f12a" }}>Sign Up</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View >
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#e6f5e5'
    },
    formBox: {
        marginVertical: 20,
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
    loginBtn: {
        alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        backgroundColor: "#20f12a",
        // padding: 10,
        width: 100,
        height: 50,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
    }
})