import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const OrderLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="orders" options={{
                headerTitle: "ORDERS",
                headerBackButtonDisplayMode: "minimal"
            }} />
            <Stack.Screen name="orderDetails" options={{
                title: "YOUR ORDERS",
                headerBackButtonDisplayMode: "minimal"
            }} />
        </Stack>
    )
}

export default OrderLayout