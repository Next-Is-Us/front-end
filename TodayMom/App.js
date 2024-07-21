import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Nickname from './components/Nickname';
import Start from './components/Start.jsx';
import { Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import Invite from './components/Invite.jsx';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Nickname"
          component={Nickname}
          options={({ navigation }) => ({
            headerTitle: '',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('./assets/images/leftallow.png')}
                  style={{ width: 25, height: 25 }}
                />
              </TouchableOpacity>
            ),
            headerLeftContainerStyle: {
              paddingLeft: 20,
            },
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
          })}
        />
        <Stack.Screen
          name="Invite"
          component={Invite}
          options={({ navigation }) => ({
            headerTitle: '',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('./assets/images/leftallow.png')}
                  style={{ width: 25, height: 25 }}
                />
              </TouchableOpacity>
            ),
            headerLeftContainerStyle: {
              paddingLeft: 20,
            },
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
