import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const OrderSuccessModal = ({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Order Placed Successfully!</Text>
                    <Text style={styles.subtitle}>
                        Your order has been placed successfully. Thank you for choosing us!
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// Parent component where the modal will be used
// const OrderSuccess = () => {
//     const [isModalVisible, setIsModalVisible] = useState(false);

//     const toggleModal = () => {
//         setIsModalVisible(!isModalVisible);
//     };

//     return (
//         <View style={styles.appContainer}>
//             {/* Trigger button to show the modal */}
//             <TouchableOpacity style={styles.triggerButton} onPress={toggleModal}>
//                 <Text style={styles.triggerButtonText}>Place Order</Text>
//             </TouchableOpacity>

//             {/* Modal component */}
//             <OrderSuccessModal isVisible={isModalVisible} onClose={toggleModal} />
//         </View>
//     );
// };

// Styles
const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    triggerButton: {
        padding: 15,
        backgroundColor: '#4caf50',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    triggerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 5,
        width: '50%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OrderSuccessModal;