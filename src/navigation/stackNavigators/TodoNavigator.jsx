import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoScreen from '../../screens/Todo';
import AddNewTodo from '../../screens/Todo/AddNewTodo';
const Stack = createNativeStackNavigator();

const TodoNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name='TodoHome' component={TodoScreen} />
            <Stack.Screen name='AddTodo' component={AddNewTodo} />

        </Stack.Navigator>
    )
}

export default TodoNavigator