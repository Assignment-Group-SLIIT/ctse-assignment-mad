import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SupplementScreen from '../../screens/Supplement';
import AddSuppplement from '../../screens/Supplement/addSuplement';
const Stack = createNativeStackNavigator();


const SupplementNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='SupplementHome' component={SupplementScreen} />
            <Stack.Screen name='AddSupplement' component={AddSuppplement} />

        </Stack.Navigator>
    )
}

export default SupplementNavigator