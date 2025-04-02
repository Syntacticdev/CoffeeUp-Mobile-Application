import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { formatter } from '@/helper'
import { cartItem } from '@/types/cart'
import { useCartContext } from '@/context/CartProvider'

const CartCard = ({ item, i }: { item: cartItem, i: number }) => {
    const { removeFromCart, increaseItemQuantity, decreaseItemQuantity } = useCartContext()
    return (
        <View style={styles.card}>
            <Image style={styles.productImage} resizeMode='contain' source={require("../assets/images/coffee.png")} />
            <View style={styles.detail}>
                <View style={styles.orderDetails}>
                    <Text>{`${item?.quantity}x`} {item.name}</Text>
                    <Text>{item.size}</Text>
                    <Text>{formatter.format(item?.price)}</Text>
                </View>
                <View style={styles.action}>
                    <Pressable onPress={() => removeFromCart(i)}>
                        <MaterialIcons name="delete-outline" size={30} color="black" />
                    </Pressable>
                    <View style={styles.deleteAction}>
                        <Pressable onPress={() => decreaseItemQuantity(i)}>
                            <AntDesign name="minuscircleo" size={24} color="black" />
                        </Pressable>
                        <Pressable>
                            <Text>{item?.quantity}</Text>
                        </Pressable>
                        <Pressable onPress={() => increaseItemQuantity(i)}>
                            <AntDesign name="pluscircleo" size={24} color="black" />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CartCard

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        height: 100,
        borderRadius: 10,
        padding: 10,
        gap: 10,
    },
    productImage: {
        height: "100%",
        width: 100,
        borderRadius: 10,
        backgroundColor: "#f5eeee",
    },
    detail: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    orderDetails: {
        justifyContent: "space-between"
    },
    action: {
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    deleteAction: {
        flexDirection: "row",
        gap: 10
    }
})