import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, Text } from "react-native"

const HomeScreen = ({ }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>
                Home Screen
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10
    }
});

export default HomeScreen