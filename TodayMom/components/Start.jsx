import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';

const Start = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>오늘의 맘에 오신 것을 환영해요!</Text>
      <Text style={styles.subText}>어떤 사용자로 활동할</Text>
      <Text style={[styles.subText, { marginBottom: 32 }]}>예정이신가요?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require('../assets/images/Woman.png')}
            style={styles.image}
          />
          <Text style={styles.buttonText}>엄마</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Image
            source={{ uri: 'https://your-image-url.com/image2.png' }}
            style={styles.image}
          />
          <Text style={styles.buttonText}>자녀</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  headerText: {
    marginTop: 88,
    color: '#767676',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.35,
    marginBottom: 4,
  },
  subText: {
    color: '#111',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 34,
    letterSpacing: -0.35,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 296,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 165,
    height: 165,
    borderRadius: 24,
    alignItems: 'center',
    backgroundColor: '#F7F7FB',
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 26,
    letterSpacing: -0.45,
  },
  nextButton: {
    backgroundColor: 'rgba(163, 15, 250, 0.15)',
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    borderRadius: 12,
  },
  nextButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.4,
  },
});

export default Start;
