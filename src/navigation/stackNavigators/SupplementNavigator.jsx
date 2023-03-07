import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SupplementScreen from '../../screens/Supplement';
const Stack = createNativeStackNavigator();


const SupplementNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='SupplementHome' component={SupplementScreen} />
        </Stack.Navigator>
    )
}

export default SupplementNavigator