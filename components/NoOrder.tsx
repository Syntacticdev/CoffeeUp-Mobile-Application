import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const NoOrdersScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: Image.resolveAssetSource(require("../assets/images/coffee.png")).uri }} // Replace with your own image URL or local asset
                style={styles.image}
            />

            <Text style={styles.title}>No Available Orders</Text>
            <Text style={styles.subtitle}>
                It looks like you don't have any orders at the moment.
            </Text>
            <Text style={styles.description}>
                You can browse our catalog and place an order to get started!
            </Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
});

export default NoOrdersScreen;