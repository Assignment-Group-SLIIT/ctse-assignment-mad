import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NutritionScreen from '../../screens/Nutrition';
const Stack = createNativeStackNavigator();

const NutritionNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='NutritionHome' component={NutritionScreen} />
        </Stack.Navigator>
    )
}

export default NutritionNavigator