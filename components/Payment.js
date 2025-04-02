import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from "react-native-modal"
import { Paystack } from 'react-native-paystack-webview';
import { useCartContext } from '@/context/CartProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from '@/context/GlobalContext';

const Payment = ({ paymentModalVisible, setPaymentModalVisible, setSuccessModalVisible }) => {
    const { cart, subTotal, clearCarts } = useCartContext();
    const { user } = useGlobalContext()
    const config = {
        cart,
        user: user._id
    };

    // const config = {
    //     custom_fields: [
    //         {
    //             display_name: 'description',
    //             variable_name: 'description',
    //             value: 'Funding Wallet'
    //         }
    //         // To pass extra metadata, add an object with the same fields as above
    //     ]

    // };
    return (
        <View>
            <Modal isVisible={paymentModalVisible}>
                <View style={{ flex: 1 }}>
                    <Paystack
                        billingName='Coffeeup'
                        paystackKey={process.env.EXPO_PUBLIC_PAYSTACK_KEY}
                        amount={subTotal}
                        billingEmail={process.env.EXPO_PUBLIC_BILLING_EMAIL}
                        activityIndicatorColor="green"
                        metadata={JSON.stringify(config)}
                        onCancel={(e) => {
                            console.log("Payment cancelled")
                            setPaymentModalVisible(false)
                        }}
                        onSuccess={async (res) => {
                            const { status, transactionRef: { reference } } = res
                            setPaymentModalVisible(false)
                            setSuccessModalVisible(true)
                            clearCarts()
                        }}
                        autoStart={true}

                    />
                </View>
            </Modal>
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({})