import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, Text } from "react-native"

const NutritionScreen = ({ }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>
                Nutrition screen
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

export default NutritionScreen