import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const App = () => {
    return (
        <Redirect href="/(auth)/login" />
        // <Redirect href="/(tabs)" />
        // <Redirect href="/(tabs)/cart" />
        // <Redirect href="/(details)/1" />
        // <Redirect href="/(payment)/" />
        // <Redirect href="/(tabs)/profile" />
    )
}

export default App
