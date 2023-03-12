import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens';
import MacroFinder from '../../screens/Nutrition/MacroFinder';
import BMICalculator from '../../screens/Todo/BMICalculator';
const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='DashboardHome' component={HomeScreen} />
            <Stack.Screen name='MacroFinderScreen' component={MacroFinder} />
            <Stack.Screen name='BMICalculator' component={BMICalculator} />

        </Stack.Navigator>
    )
}


export default HomeStackNavigator