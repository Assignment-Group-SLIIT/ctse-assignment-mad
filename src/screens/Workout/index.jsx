import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, Text } from "react-native"

const WorkoutScreen = ({ }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>
                Workout screen
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

export default WorkoutScreen