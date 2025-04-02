import Loading from "@/components/Loading";
import { useCartContext } from "@/context/CartProvider";
import { useGlobalContext } from "@/context/GlobalContext";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function TabLayout() {
    const { cart, totalCartItems } = useCartContext()
    const { itemLoaded } = useGlobalContext()

    if (!itemLoaded) return <Loading />
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderRadius: 40,
                    marginHorizontal: 20,
                    marginBottom: 20,
                    shadowColor: "#C4C4C4",
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 2,
                    height: 60,
                    paddingHorizontal: 20,
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <AntDesign name="home" size={focused ? 30 : 24} color={focused ? "#576c09" : "#158454"} />
                    )
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Cart",
                    tabBarIcon: ({ focused }) => (
                        <View style={{ position: "relative" }}>
                            {cart.length ? <Text style={{ backgroundColor: "#7fbe36", color: "#fff", fontWeight: "bold", position: "absolute", right: -5, top: -12, zIndex: 1, padding: 2, borderRadius: 50, fontSize: 13 }}>{totalCartItems}</Text> : ""}
                            <MaterialCommunityIcons name="coffee-outline" size={focused ? 30 : 24} color={focused ? "#576c09" : "#158454"} />
                        </View>
                    )
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <AntDesign name="user" size={focused ? 30 : 24} color={focused ? "#576c09" : "#158454"} />
                    )
                }}
            />
            <Tabs.Screen
                name="order"
                options={{ href: null }}
            />

        </Tabs>
    )
}   