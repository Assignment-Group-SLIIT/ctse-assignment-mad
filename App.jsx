import React, { useEffect, useState } from 'react'
import {
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AuthStackNavigator from './src/navigation/stackNavigators/AuthStackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from './src/core/theme';
import { Provider } from 'react-native-paper';

import { navigationRef } from './src/navigation/stackNavigators/RootNavigation';

import auth from '@react-native-firebase/auth';

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

const Stack = createNativeStackNavigator();

const App = () => {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider theme={theme}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.primary}
        />
        <NavigationContainer ref={navigationRef}
        // onReady={() => RNBootSplash.hide()}
        >

          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {!user ? (
              <Stack.Screen name="Auth" component={AuthStackNavigator} />

            ) : (
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            )}

          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
};

export default App;
