import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import TermsModal from './TermsModal';

const IntroCompo = () => {
  const [step, setStep] = useState(0);
  const fadeAnim = useState(new Animated.Value(1))[0];
  const translateXAnim = useState(new Animated.Value(0))[0];
  const [modalVisible, setModalVisible] = useState(false);

  const steps = [
    {
      title: '매일의 기록',
      details: [
        '엄마는 매일의 상태를 기록하고,',
        '자녀는 엄마의 상태를 확인해요',
      ],
      image: require('../assets/images/recordphoneshadow.png'),
      indicatorOrder: ['purple', 'one', 'one'],
    },
    {
      title: '꽃피 NFT',
      details: ['갱년기 시기 기록을', '디지털 의료 보증서로 변환'],
      image: require('../assets/images/intronft.png'),
      indicatorOrder: ['one', 'purple', 'one'],
    },
    {
      title: '커뮤니티',
      details: ['전문가의 큐레이션이 담긴', '갱년기 시기 영양/건강 정보'],
      image: require('../assets/images/Introcom.png'),
      indicatorOrder: ['one', 'one', 'purple'],
    },
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step === steps.length - 1) {
      setModalVisible(true);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        setStep((prevStep) => prevStep + 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const renderIndicator = () => {
    return currentStep.indicatorOrder.map((indicator, index) => {
      let animationStyle = {};
      if (index === 0) {
        animationStyle = { transform: [{ translateX: translateXAnim }] };
      } else if (index === 1) {
        animationStyle = { transform: [{ translateX: translateXAnim }] };
      }

      if (indicator === 'purple') {
        return (
          <Animated.View key={index} style={[styles.purple, animationStyle]} />
        );
      } else {
        return (
          <Animated.View key={index} style={[styles.one, animationStyle]} />
        );
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.indicator}>{renderIndicator()}</View>
        <View style={styles.center}>
          <Animated.Text style={[styles.Title, { opacity: fadeAnim }]}>
            {currentStep.title}
          </Animated.Text>
          {currentStep.details.map((detail, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.detail,
                index > 0 && styles.indent,
                { opacity: fadeAnim },
              ]}
            >
              {detail}
            </Animated.Text>
          ))}
          <Animated.Image
            source={currentStep.image}
            style={[styles.record, { opacity: fadeAnim }]}
          />
        </View>
        <View style={styles.spacer} />
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
        <TermsModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    width: '100%',
    height: 52,
    borderRadius: 12,
    backgroundColor: '#A30FFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 33,
  },
  record: {
    marginTop: 19,
    width: 262,
    height: 501,
    marginLeft: 91,
    marginRight: 47,
  },
  shadow: {
    width: 211,
    height: 450,
    marginTop: 19,
    marginLeft: 71,
    marginRight: 57,
  },
  detail: {
    color: '#767676',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.35,
  },
  center: {
    marginTop: 16,
    alignItems: 'center',
    flexDirection: 'column',
  },
  Title: {
    marginBottom: 8,
    color: '#111',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 38,
    letterSpacing: -0.7,
  },
  one: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
  },
  purple: {
    width: 20,
    height: 6,
    borderRadius: 100,
    backgroundColor: '#A30FFA',
  },
  indicator: {
    marginTop: 28,
    flexDirection: 'row',
    gap: 6,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
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
  indent: {
    marginLeft: 20,
  },
});

export default IntroCompo;
