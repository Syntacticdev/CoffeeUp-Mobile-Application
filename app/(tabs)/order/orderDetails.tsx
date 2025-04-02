import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { order } from '@/types/orders';
import Loading from '@/components/Loading';
import { formatter } from '@/helper';

const OrderScreen = () => {
    const [orders, setOrders] = useState<order | null>();
    const [loading, setLoading] = useState(true);

    const { orderId } = useLocalSearchParams()

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_DB_URI}/api/order/find/${orderId}`);
                setOrders(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [orderId]);

    const renderItem = ({ item }: any) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemDetail}>
                <Image source={require("../../../assets/images/coffee.png")} style={styles.image} />
                <View>
                    <Text style={{ fontWeight: 700 }}>{item.name}</Text>
                    <Text>Size: {item.size}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                    <Text>Price:{formatter.format(item.price)}</Text>
                    <Text>Cube Quantity: {item.cubeQuantity}</Text>
                </View>
            </View>

        </View>
    );

    if (loading) {
        return <Loading />
    }

    return (
        <View>
            <Stack.Screen options={{
                title: orders?.reference ? orders?.reference : ""
            }} />

            <FlatList
                data={orders?.items}
                renderItem={renderItem}
                keyExtractor={item => item?._id}
            />

            <View style={{ padding: 10 }}>
                <Text style={styles.total}>Total: {formatter.format(orders?.total!)}</Text>
                <Text style={styles.status}>Status: {orders?.status}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    reference: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDetail: {
        marginLeft: 10,
        marginTop: 5,
        flexDirection: "row"
    },
    image: {
        width: 100,
        height: 100,
    },
    total: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    status: {
        fontStyle: 'italic',
    }
});

export default OrderScreen;

