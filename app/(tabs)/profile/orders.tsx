import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'

const orders = () => {
    return (
        <SafeAreaView>
            <Stack.Screen options={{
                headerBackButtonMenuEnabled: true,
                title: "Orders",
                headerTitle: "ORDERS"
            }} />
            <Text>Orders</Text>
        </SafeAreaView>
    )
}

export default orders

const styles = StyleSheet.create({})