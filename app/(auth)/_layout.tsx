import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalContext'

const AuthLayout = () => {
    const { loading, isLoggedIn } = useGlobalContext()
    if (!loading && isLoggedIn) return <Redirect href="/(tabs)/" />

    return (
        <Stack>
            <Stack.Screen name='login' options={{ headerShown: false }} />
            <Stack.Screen name='register' options={{ headerShown: false }} />
        </Stack>
    )
}

export default AuthLayout

const styles = StyleSheet.create({})