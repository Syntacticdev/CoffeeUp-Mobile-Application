import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/user';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Coffee } from '@/types/coffee';


interface GlobalContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    user: User | null;
    setUser: (value: User | null) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
    itemLoaded: boolean;
    items: Coffee[]
    setItemLoaded: (value: boolean) => void;
    logout: () => void;
}

const GlobalContext = createContext<GlobalContextType | null>(null)


const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)
    const [itemLoaded, setItemLoaded] = useState(false)
    const [items, setItems] = useState<Coffee[]>([])


    const getUserData = async (token: string) => {
        const decode: any = jwtDecode(token)
        try {
            const res = await axios.get(`${process.env.EXPO_PUBLIC_DB_URI}/api/user/${decode?.userId}`)
            await AsyncStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const authToken = await AsyncStorage.getItem('authToken');
                if (authToken) {
                    getUserData(authToken)
                    setIsAuthenticated(true)
                    setLoading(false)
                } else {
                    setLoading(false)
                    router.replace('../(auth)/login')
                }
            } catch (error) {
                console.log(error)
            }
        }
        checkLoginStatus()
    }, [isAuthenticated])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_DB_URI}/api/coffee`);
                setItems(response.data)
                setItemLoaded(true)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

    const logout = () => {
        setIsAuthenticated(false)
        setUser(null)
        AsyncStorage.removeItem('authToken')
        AsyncStorage.removeItem('user')
        router.push("/login")
    }

    const value: GlobalContextType = {
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        loading,
        setLoading,
        itemLoaded,
        items,
        setItemLoaded,
        logout
    }


    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext)

    if (!context) {
        throw new Error('useGlobalContex must be used within a GlobalProvider');
    }
    return context;
};

export default GlobalProvider