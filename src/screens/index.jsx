import { SafeAreaView } from "react-native-safe-area-context"
import { ImageBackground, StyleSheet, Text, View } from "react-native"
import Button from "../components/Button"

const image = require('../assets/images/homeBG.jpg')

const HomeScreen = ({ }) => {
    return (
        // <SafeAreaView style={styles.container}>
        //     <Text>
        //         Home Screen
        //     </Text>
        // </SafeAreaView>
        <SafeAreaView style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Button mode={"contained"} icon="calculator">BMI Calculator</Button>
                <Button mode={"contained"} icon="weight-kilogram">Weight Convertor</Button>
                <Button mode={"contained"} icon="nutrition">Macro Finder</Button>
                <Button mode={"contained"} icon="logout">Signout</Button>
            </ImageBackground>
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