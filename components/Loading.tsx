import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Loading() {

    return (
        <View style={styles.animationContainer}>
            <LottieView
                autoPlay
                style={{
                    width: 200,
                    height: 200,
                    margin: "auto"
                }}
                source={require('../assets/icons/coffee-loading.json')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    animationContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
