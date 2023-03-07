import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens';
const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='DashboardHome' component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default HomeStackNavigator