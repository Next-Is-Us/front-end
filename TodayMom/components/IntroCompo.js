import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

const IntroCompo = ({ title, details, image, onPress }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.indicator}>
          <View style={styles.purple} />
          <View style={styles.one} />
          <View style={styles.one} />
        </View>
        <View style={styles.center}>
          <Text style={styles.Title}>{title}</Text>
          {details.map((detail, index) => (
            <Text
              key={index}
              style={[styles.detail, index > 0 && styles.indent]}
            >
              {detail}
            </Text>
          ))}
          <Image source={image} style={styles.record} />
        </View>
        <View style={styles.spacer} />
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
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
    fontSize: 14, // 숫자로 변경
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20, // 숫자로 변경
    letterSpacing: -0.35, // 숫자로 변경
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
    fontSize: 28, // 숫자로 변경
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 38, // 숫자로 변경
    letterSpacing: -0.7, // 숫자로 변경
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
});

export default IntroCompo;
