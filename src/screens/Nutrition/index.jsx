import React, { useState, useEffect } from 'react'

import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, FAB } from "react-native-paper";
import { theme } from '../../core/theme';
import { ScrollView } from 'react-native-gesture-handler';

const NutritionScreen = ({ navigation }) => {
    const [mealPlans, setMealPlans] = useState([]);
    useEffect(() => {
        setMealPlans([
            {
                name: "meal 01"
            },
            {
                name: "meal 02"
            },
            {
                name: "meal 03"
            },
            {
                name: "meal 03"
            },
            {
                name: "meal 03"
            },
            {
                name: "meal 03"
            },
            {
                name: "meal 03"
            },
            {
                name: "meal 03"
            },
            {
                name: "meal 03"
            },
            {
                name: "meal 04"
            },
        ]);
        return () => {
            setMealPlans([]);
        };
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerTxt}>
                Meal Plans
            </Text>
            <ScrollView style={{ width: '100%', padding: 5 }}>
                {
                    mealPlans.map((meal, index) => {
                        return (
                            <View key={index} style={styles.card}>
                                <View style={styles.cardView}>
                                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{meal?.name?.charAt(0)}</Text>
                                </View>
                                <Text style={{ fontSize: 20 }}>{meal.name}</Text>
                            </View>

                        )
                    })
                }
            </ScrollView>
            <FAB
                icon="plus"
                style={styles.FAB}
                color="#fff"
                size='medium'
                onPress={() => {
                    // navigation.navigate('ScreenOne');
                    navigation.navigate('Root', {
                        screen: 'Todos',
                        initial: false,
                    });
                }}>

            </FAB>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 10
    },
    headerTxt: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20
    },
    FAB: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        position: 'absolute',
        bottom: 15,
        right: 15,
        height: 50,
        backgroundColor: theme.colors.buttonBackground,
        borderRadius: 100,
    },
    card: {
        width: "100%",
        height: 75,
        backgroundColor: "white",
        borderColor: theme.colors.primary,
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    cardView: {
        width: '20%',
        backgroundColor: theme.colors.primary,
        height: 75,
        borderTopStartRadius: 15,
        borderBottomStartRadius: 15,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default NutritionScreen