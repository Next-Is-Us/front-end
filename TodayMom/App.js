import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Nickname from './components/Nickname';
import Start from './components/Start.jsx';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Nickname" component={Nickname} />
        <Stack.Screen name="Start" component={Start} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
