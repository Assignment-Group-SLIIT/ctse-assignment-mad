import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkoutScreen from '../../screens/Workout';
import AddWorkOut from '../../screens/Workout/AddWorkOut';
const Stack = createNativeStackNavigator();

const WorkoutNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
           <Stack.Screen name='WorkOutHome' component={WorkoutScreen} />
            <Stack.Screen name='AddWorkOut' component={AddWorkOut} />
        </Stack.Navigator>
    )
}

export default WorkoutNavigator