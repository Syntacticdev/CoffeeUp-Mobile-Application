import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Coffee } from '@/types/coffee'
import { router } from 'expo-router'

const CoffeCard = (item: Coffee) => {
    return (
        <Pressable onPress={() => router.push(`/(details)/${item._id}`)}>
            <View style={styles.card}>
                <Image style={styles.icon} source={require("../assets/images/coffee.png")} />
                <Text style={{ fontWeight: "bold", fontSize: 16, flex: 1 }}>{item.name}</Text>
                <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
            </View>
        </Pressable>
    )
}

export default CoffeCard

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        height: 70,
        alignItems: "center",
        paddingRight: 10
    },
    icon: {
        width: 70,
        height: 70,
        marginHorizontal: 10
    }
})