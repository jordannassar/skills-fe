import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateOffer from '../screens/CreateOffer/CreateOffer';
import Login from '../screens/WelcomePage/Welcome';
import Register from '../screens/Register/Register';
import Account from '../screens/Account/Account';

const Stack = createNativeStackNavigator();

export default function AppNavigation({ AppState }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" options={{ headerShown: false }}>
          {(props) => <Login {...props} AppState={AppState} />}
        </Stack.Screen>
        <Stack.Screen name="Register" options={{ headerShown: false }}>
          {(props) => <Register {...props} AppState={AppState} />}
        </Stack.Screen>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <Home {...props} AppState={AppState} />}
        </Stack.Screen>
        <Stack.Screen name="CreateOffer" options={{ headerShown: false }}>
          {(props) => <CreateOffer {...props} AppState={AppState} />}
        </Stack.Screen>
        <Stack.Screen name="Account" options={{ headerShown: false }}>
          {(props) => <Account {...props} AppState={AppState} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
