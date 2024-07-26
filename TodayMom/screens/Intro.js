import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Animated,
} from 'react-native';
import Todaymom from '../assets/images/todaymom_black.svg';
import Rectangle2 from '../assets/images/heartseeds.svg';
import SeedShadow from '../assets/images/seedshadow.png';
import SeedShadow2 from '../assets/images/seedshadow2.png';

const Intro = () => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const [currentShadow, setCurrentShadow] = useState(SeedShadow);

  useEffect(() => {
    // 조건 체크 방법을 개선하여 이미지 교체
    const listenerId = moveAnim.addListener(({ value }) => {
      if (value < -15) {
        setCurrentShadow(SeedShadow2);
      } else {
        setCurrentShadow(SeedShadow);
      }
    });

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: -20,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      moveAnim.removeListener(listenerId);
      animation.stop();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>엄마의 사람에 이제 내가 보답할게!</Text>
        <Todaymom style={styles.image} />
        <Animated.View style={{ transform: [{ translateY: moveAnim }] }}>
          <Rectangle2 style={styles.icon} />
        </Animated.View>
        <Image source={currentShadow} style={styles.shadow} />
        <View style={styles.spacer} />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  shadow: {
    width: 220,
    height: 60,
    paddingTop: 0,
  },
  nextButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.4,
  },
  button: {
    marginTop: 12,
    width: '100%',
    height: 52,
    borderRadius: 12,
    backgroundColor: '#A30FFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 33,
  },
  image: {
    marginTop: 12,
    marginBottom: 76,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  textStyle: {
    marginTop: 104,
    color: '#767676',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.35,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  spacer: {
    flex: 1,
  },
});

export default Intro;
