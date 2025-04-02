import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CartCard from '@/components/CartCard'
import { formatter } from '@/helper'
import { useCartContext } from '@/context/CartProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyCart from '@/components/EmptyCart'
import { router } from 'expo-router'
import Payment from "../../components/Payment"
import OrderSuccess from '@/components/Success'
const cart = () => {
    const [paymentModalVisible, setPaymentModalVisible] = useState(false)
    const [successModalVisible, setSuccessModalVisible] = useState(false)
    const { cart, subTotal } = useCartContext();
    const deliveryFee = 1000



    const onClose = () => {
        setSuccessModalVisible((prev) => !prev)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {cart.length > 0 ? (
                <View style={styles.containter}>
                    <View style={{ marginVertical: 15 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Order Summary</Text>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ gap: 10 }}>
                            {cart.map((item, i) => (
                                <CartCard i={i} item={item} key={i} />
                            ))}
                        </View>
                    </ScrollView>

                    <View style={{ backgroundColor: "#fff", padding: 10 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Sub total:</Text>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{formatter.format(subTotal)}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Delivery Fee:</Text>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{formatter.format(deliveryFee)}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Total:</Text>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{formatter.format(subTotal + deliveryFee)}</Text>
                        </View>
                        <Pressable onPress={() => setPaymentModalVisible(true)} style={{ backgroundColor: "#20f12a", padding: 10, borderRadius: 5, marginTop: 10 }}>
                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Checkout</Text>
                        </Pressable>
                    </View>
                    <Payment paymentModalVisible={paymentModalVisible} setPaymentModalVisible={setPaymentModalVisible} setSuccessModalVisible={setSuccessModalVisible} />
                </View>
            ) : (
                <EmptyCart />
            )}

            <OrderSuccess isVisible={successModalVisible} onClose={onClose} />

        </SafeAreaView>
    )
}

export default cart


const styles = StyleSheet.create({
    containter: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f5f5f5"
    },
});

