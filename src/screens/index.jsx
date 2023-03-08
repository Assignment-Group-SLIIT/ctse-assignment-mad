import React, { useState } from 'react'

import { SafeAreaView } from "react-native-safe-area-context"
import { ImageBackground, StyleSheet } from "react-native"
import auth from '@react-native-firebase/auth';
import Button from "../components/Button"
import { Snackbar } from 'react-native-paper';

const image = require('../assets/images/homeBG.jpg')

const HomeScreen = ({ navigation }) => {
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Button mode={"contained"} icon="calculator">BMI Calculator</Button>
                <Button mode={"contained"} icon="weight-kilogram">Weight Convertor</Button>
                <Button mode={"contained"} icon="nutrition">Macro Finder</Button>
                <Button mode={"contained"} icon="logout" onPress={() => {
                    onToggleSnackBar();
                    auth().signOut();
                }}>Signout</Button>
            </ImageBackground>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Dismiss',
                    onPress: () => {
                        // Do something
                    },
                }}>
                Signing out...
            </Snackbar>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 40
    },
    text: {
        color: 'white',
        fontSize: 42,
        lineHeight: 84,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0',
    },
});

export default HomeScreen