import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, Text } from "react-native"

const TodoScreen = ({ }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>
                Todo screen
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

export default TodoScreen