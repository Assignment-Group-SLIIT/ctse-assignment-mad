import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens';
import MacroFinder from '../../screens/Nutrition/MacroFinder';
import WeightConverter from '../../screens/Workout/WeightConverter';
import BMICalculator from '../../screens/Todo/BMICalculator';
import BMRFinder from '../../screens/Supplement/BMRFinder';
const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='DashboardHome' component={HomeScreen} />
            <Stack.Screen name='MacroFinderScreen' component={MacroFinder} />
            <Stack.Screen name='WeightConverterScreen' component={WeightConverter} />
            <Stack.Screen name='BMICalculator' component={BMICalculator} />
            <Stack.Screen name='BMRFinder' component={BMRFinder} />


        </Stack.Navigator>
    )
}


export default HomeStackNavigator