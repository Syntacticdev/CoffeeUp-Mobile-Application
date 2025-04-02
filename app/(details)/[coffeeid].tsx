import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { coffees, sizes } from '@/utils/coffee'
import { Coffee } from '@/types/coffee'
import { FontAwesome } from '@expo/vector-icons'
import { formatter, getSize } from '@/helper'
import { useCartContext } from '@/context/CartProvider'
import { cartItem } from '@/types/cart'
import axios from 'axios'
import Loading from '@/components/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'


const CoffeeDetails = () => {
    const [loading, setLoading] = useState(false)
    const [pickedSize, setPickedSize] = useState("small")
    const [item, setItem] = useState<Coffee>();
    const [quantity, setQuantity] = useState(1)
    const [cubeQuantity, setCubeQuantity] = useState(1)

    const { coffeeid } = useLocalSearchParams()
    const navigation = useNavigation()

    const { addToCart } = useCartContext();


    useEffect(() => {
        const fetchDataDetails = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${process.env.EXPO_PUBLIC_DB_URI}/api/coffee/find/${coffeeid}`);
                const data = response.data;
                data && setItem(data)
                navigation.setOptions({
                    headerTitle: data?.name,
                    headerShown: true
                })
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchDataDetails()

    }, [navigation])



    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1)
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1)
        }
    }

    const handleAddToCart = async (item: any) => {
        const { image, price, sizes, ...other } = item
        const itemSelected: cartItem = {
            ...other,
            price: item.sizes.find((item: any) => item.size == pickedSize).price,
            image: require("../../assets/images/coffee.png"),
            size: pickedSize,
            quantity,
            cubeQuantity
        }
        addToCart(itemSelected)

        ToastAndroid.show('Item Added', ToastAndroid.SHORT);
    }

    if (loading) return <Loading />

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.thumbnailWrapper}>
                    <Image source={require("../../assets/images/coffee.png")} style={styles.thumbnail} />
                </View>
                <View style={styles.subAction}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item?.name}</Text>

                        {item?.sizes?.map((item, index) => {
                            if (item.size === pickedSize) {
                                return <Text key={index} style={{ fontSize: 20 }}>{formatter.format(item.price)}</Text>
                            }
                        })}
                    </View>
                    <View style={styles.action}>
                        <Pressable onPress={decrementQuantity}>
                            <Text style={styles.actionBtnLeft}>-</Text>
                        </Pressable>
                        <Text>{quantity}</Text>
                        <Pressable onPress={incrementQuantity}>
                            <Text style={styles.actionBtnRight}>-</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.sizeWrapper}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Size:</Text>
                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                        {item?.sizes?.map(({ size, price }, index) => (
                            <Pressable key={index} onPress={() => setPickedSize(size)}>
                                <View style={{ alignItems: "center" }}>
                                    <Image style={{ width: getSize(size), height: getSize(size), opacity: size === pickedSize ? 1 : .5 }} source={require("../../assets/images/coffee.png")} />
                                    <Text>{size}</Text>
                                    <Text>{formatter.format(price)}</Text>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </View>

                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Sugar</Text>
                        <Text>(in Cubes)</Text>
                    </View>
                    <View style={{ gap: 10, flexDirection: "row", marginVertical: 10 }}>
                        {[1, 2, 3].map((item, index) => (
                            <Pressable key={index} onPress={() => setCubeQuantity(item)}>
                                <View style={{ flexDirection: "row", opacity: cubeQuantity === item ? 1 : .5 }}>
                                    {Array(item).fill("_").map((star, i) => (<FontAwesome key={i} name="cube" size={24} color="black" />))}
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </View>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addToCartBtn} >
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>Add to cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default CoffeeDetails

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e6f5e5",
        flex: 1,
    },
    thumbnailWrapper: {
        height: 300,
        backgroundColor: "#7da77a",
        justifyContent: "center",
        alignItems: "center"
    },
    thumbnail: {
        width: 120,
        height: 120
    },
    subAction: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    action: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    actionBtnLeft: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#58e355",
        color: "#fff",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    actionBtnRight: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#58e355",
        color: "#fff",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    sizeWrapper: {
        padding: 10
    },
    addToCartBtn: {
        backgroundColor: "#58e355",
        width: "70%",
        alignItems: "center",
        justifyContent: "center",
        height: 55,
        borderRadius: 35,
        marginVertical: 20
    }

})