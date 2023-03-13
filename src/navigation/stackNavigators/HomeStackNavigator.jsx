import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens';
import MacroFinder from '../../screens/Nutrition/MacroFinder';
import WeightConverter from '../../screens/Workout/WeightConverter';
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
        </Stack.Navigator>
    )
}


export default HomeStackNavigator