import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useGlobalContext } from '@/context/GlobalContext';
import { Stack, router } from 'expo-router';
import { order } from '@/types/orders';
import { formatDate, formatter } from '@/helper';
import Loading from '@/components/Loading';
import NoOrdersScreen from '@/components/NoOrder';

const OrderScreen = () => {
    const [orders, setOrders] = useState<order[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useGlobalContext()


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_DB_URI}/api/order/userorders/${user?._id}`);
                const data = response.data;
                setOrders((prev) => [...prev, ...data]);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const renderOrderCard = ({ item }: any) => (
        <TouchableOpacity
            style={styles.orderCard}
            onPress={() => router.navigate({ pathname: "/(tabs)/order/orderDetails", params: { orderId: item._id } })}
        >
            <Text style={styles.orderReference}>Order #{item.reference}</Text>
            <Text style={styles.orderStatus}>Status: {item.status}</Text>
            <Text style={styles.orderTotal}>Total: {formatter.format(item?.total)}</Text>
            <Text>Date: {formatDate(item?.createdAt)}</Text>
        </TouchableOpacity>
    );

    if (loading) return <Loading />

    if (!orders.length) return <NoOrdersScreen />

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerTitle: "ORDERS"
            }} />
            <FlatList
                data={orders}
                renderItem={renderOrderCard}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    listContainer: {
        paddingBottom: 20,
    },
    orderCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    orderReference: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    orderStatus: {
        fontSize: 16,
        color: '#666',
    },
    orderTotal: {
        fontSize: 16,
        color: '#4CAF50',
        marginVertical: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OrderScreen;