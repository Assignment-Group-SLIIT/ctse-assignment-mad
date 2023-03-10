import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NutritionScreen from '../../screens/Nutrition';
import AddMeal from '../../screens/Nutrition/AddMeal';
const Stack = createNativeStackNavigator();

const NutritionNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='NutritionHome' component={NutritionScreen} />
            <Stack.Screen name='AddMeal' component={AddMeal} />
        </Stack.Navigator>
    )
}

export default NutritionNavigator