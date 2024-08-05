import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '../assets/images/splash_icon.svg';
import SecondIcon from '../assets/images/todaymom.svg';
import * as Linking from 'expo-linking';

const Splash = ({ route }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const secondTranslateY = useRef(new Animated.Value(-18)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const invitedLink = route.params.link;

  useEffect(() => {
    console.log(route.params);
    console.log(decodeURIComponent(invitedLink));
  }, []);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(translateY, {
        toValue: -78,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(secondTranslateY, {
          toValue: 25,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setTimeout(() => {
        navigation.navigate('Intro');
      }, 1000);
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.secondIconStyle,
          { opacity, transform: [{ translateY: secondTranslateY }] },
        ]}
      >
        <SecondIcon />
      </Animated.View>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Icon />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a30ffa',
  },
  secondIconStyle: {
    position: 'absolute',
  },
});

export default Splash;
