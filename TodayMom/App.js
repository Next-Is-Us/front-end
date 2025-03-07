import * as React from 'react';
import * as Linking from 'expo-linking';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Nickname from './screens/Nickname';
import Start from './screens/Start.jsx';
import { Button, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import Invite from './screens/Invite.jsx';
import Status from './screens/Status.jsx';
import { Text } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import MomHomeScreen from './screens/MomHomeScreen.js';
import MomRecordConditionScreen from './screens/MomRecordConditionScreen.js';
import InfoWrite from './screens/InfoWrite.jsx';
import NewWrite from './screens/NewWrite.js';
import { PostProvider } from './screens/PostContext.js';
import ViewContent from './screens/ViewContent.js';
import MomRecordConditionAdditionScreen from './screens/MomRecordConditionAdditionScreen.js';
import NotificationScreen from './screens/NotificationScreen.js';
import MyPageScreen from './screens/MyPageScreen.js';
import ChildrenHomeScreen from './screens/ChildrenHomeScreen.js';
import Communication from './screens/Communication.js';
import FlowerRecordScreen from './screens/FlowerRecordScreen.js';
import Commuroom from './screens/Commuroom.js';
import Comment from './screens/Comment.js';
import Commucreate from './screens/Commucreate.js';
import SelectForVisitHospitalScreen from './screens/SelectForVisitHospitalScreen.js';
import SelectForChangeRecordScreen from './screens/SelectForChangeReordScreen.js';
import RecordChangeScreen from './screens/RecordChangeScreen.js';
import FindHospitalScreen from './screens/FindHospitalScreen.js';
import NFTCardScreen from './screens/NFTCardScreen.js';
import Splash from './screens/Splash.js';
import Intro from './screens/Intro.js';
import IntroCompo from './components/IntroCompo.js';
import Choose from './screens/Choose.js';
import { UserProvider } from './context/UserContext.js';
import CommunityPage from './components/CommunityPage.js';
import ConfirmRecordScreen from './screens/ConfirmRecordScreen.js';
import Commuwrite from './screens/Commuwrite.js';
import InviteLink from './screens/InviteLink.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { Asset } from 'expo-asset';

const Stack = createStackNavigator();

const prefix = Linking.createURL('/');

const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      Splash: 'splash/:link',
    },
  },
};

function App() {
  const [isReady, setIsReady] = useState(false);

  const cacheResourcesAsync = async () => {
    const images = [
      require('./assets/images/NFTBackground.png'),
      require('./assets/images/NFTContainer.png'),
      require('./assets/images/recordphoneshadow.png'),
      require('./assets/images/intronft.png'),
      require('./assets/images/Introcom.png'),
    ];

    const cacheImages = images.map((image) =>
      Asset.fromModule(image).downloadAsync()
    );
    return Promise.all(cacheImages);
  };

  useEffect(() => {
    cacheResourcesAsync()
      .then(() => setIsReady(true))
      .catch((error) => {
        console.error('Failed to load assets', error);
        setIsReady(true);
      });
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <PostProvider>
        <UserProvider>
          <StatusBar style="auto" />
          <NavigationContainer linking={linking}>
            <Stack.Navigator initialRouteName="MomHome">
              <Stack.Screen
                name="Choose"
                component={Choose}
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
                name="Commuwrite"
                component={Commuwrite}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CommunityPage"
                component={CommunityPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="IntroCompo"
                component={IntroCompo}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Intro"
                component={Intro}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Commuroom"
                component={Commuroom}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Commucreate"
                component={Commucreate}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Comment"
                component={Comment}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Start"
                component={Start}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Communication"
                component={Communication}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="NewWrite"
                component={NewWrite}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ViewContent"
                component={ViewContent}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="InfoWrite"
                component={InfoWrite}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MomHome"
                component={MomHomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ChildrenHome"
                component={ChildrenHomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SelectCondition"
                component={MomRecordConditionScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WriteCondition"
                component={MomRecordConditionAdditionScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ConfirmRecord"
                component={ConfirmRecordScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Notification"
                component={NotificationScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MyPage"
                component={MyPageScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FlowerRecord"
                component={FlowerRecordScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SelectForVisitHospital"
                component={SelectForVisitHospitalScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SelectForChangeRecord"
                component={SelectForChangeRecordScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RecordChange"
                component={RecordChangeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FindHospital"
                component={FindHospitalScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="NFTCard"
                component={NFTCardScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="InviteLink"
                component={InviteLink}
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
        </UserProvider>
      </PostProvider>
    </>
  );
}

const styles = StyleSheet.create({
  leftHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    paddingBottom: 14,
    paddingTop: 14,
  },
  rightHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingBottom: 14,
    paddingTop: 14,
  },
  icon: {},
  icon2: {
    marginLeft: 8,
    resizeMode: 'contain',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
  },
});

export default App;
