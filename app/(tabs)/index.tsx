import { Image, Pressable, ScrollView, StyleSheet, Text, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';

import WebView from 'react-native-webview'
import { coffees } from '@/utils/coffee'
import { MaterialIcons } from '@expo/vector-icons'
import CoffeCard from '@/components/CoffeCard'
import { useCartContext } from '@/context/CartProvider'
import axios from 'axios'
import { Coffee } from '@/types/coffee'
import Loading from '@/components/Loading'
import { useGlobalContext } from '@/context/GlobalContext';

export default function Home() {
    const { items } = useGlobalContext()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <Image style={styles.logo} source={require("../../assets/images/logo-bg.png")} />
            <View style={styles.subheader}>
                <Text style={{ fontSize: 25 }}>It's Great </Text>
                <Text style={{ color: "#20bf27", fontSize: 25, fontWeight: "bold", fontStyle: "italic" }}> Day for Coffee.</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, gap: 30, marginTop: 10 }}>
                    {
                        items.map((item, index) => <CoffeCard key={item._id} {...item} />)
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 50,
        alignSelf: "center",
        marginVertical: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subheader: {
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
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