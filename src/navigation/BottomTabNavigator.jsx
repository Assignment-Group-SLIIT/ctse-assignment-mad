import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeStackNavigator from './stackNavigators/HomeStackNavigator'
import WorkoutNavigator from './stackNavigators/WorkoutNavigator'
import NutritionNavigator from './stackNavigators/NutritionNavigator'
import TodoNavigator from './stackNavigators/TodoNavigator'
import SupplementNavigator from './stackNavigators/SupplementNavigator'
// import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from '../core/theme'

const Tab = createBottomTabNavigator()

const screenOptions = (route, color) => {
    let iconName

    switch (route.name) {
        case 'Home':
            iconName = 'home';
            break
        case 'Workouts':
            iconName = 'run';
            break
        case 'Nutrition':
            iconName = 'nutrition';
            break
        case 'Todos':
            iconName = 'list-status';
            break
        case 'Supplements':
            iconName = 'bottle-tonic-plus-outline';
            break
        default:
            break
    }

    return <Icon name={iconName} color={color} size={30} />
}

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => screenOptions(route, color),
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.tabBarBackground,
                    height: 60,
                },
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: '#FFFFFF',
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false
            })}
            initialRouteName='Home'>
            <Tab.Screen name='Home' component={HomeStackNavigator} />
            <Tab.Screen name='Workouts' component={WorkoutNavigator} />
            <Tab.Screen name='Nutrition' component={NutritionNavigator} />
            <Tab.Screen name='Todos' component={TodoNavigator} />
            <Tab.Screen name='Supplements' component={SupplementNavigator} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator
