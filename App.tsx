import React, { useCallback } from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/screens/HomeScreen';
import MapScreen from './components/screens/MapScreen';
import BarScreen from './components/screens/BarScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import LogInScreen from './components/screens/LogInScreen';
import OnboardingScreen from './components/screens/OnboardingScreen';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import ChallengeScreen from './components/screens/ChallengeScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import { StatusBar } from 'react-native';
import { ProviderContext } from 'react-native-maps/lib/decorateMapComponent';
import ContextStoreProvider from './context/ContextStore';

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    'Passion-One': require('./assets/fonts/PassionOne-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ContextStoreProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LogIn"
            component={LogInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Bar"
            component={BarScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Challenge"
            component={ChallengeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextStoreProvider>
  );
};

export default App;
