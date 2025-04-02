import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EmptyCart = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.cartImage} source={require("../assets/images/cart.png")} />
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Your Cart is empty</Text>
            <Text style={{ fontSize: 16 }}>Looks like you haven't made your menu yet.</Text>

            <Pressable style={styles.backBtn}>
                <Text style={{ fontWeight: "bold", fontSize: 18, color: "#fff" }}>Start ordering now</Text>
            </Pressable>
        </View>
    )
}

export default EmptyCart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6f5e5'
    },
    cartImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    backBtn: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#7da77a',
        // borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000000",
        // shadowOffset:2,
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
        width: 200,
        height: 50,
    }
})