import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'
import Rewards from './Rewards';
import MapNavigation from './MapNavigation';

const Stack = createStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Rewards" component={Rewards} />
          <Stack.Screen name="Map" component={MapNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    );
} ;
