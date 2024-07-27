import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Clipboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Invite = () => {
  const [link, setLink] = useState('www.todays.mom');
  const fadeAnim = useRef(new Animated.Value(0)).current; // opacity의 초기값을 0으로 설정
  const navigation = useNavigation();

  const handleCopy = () => {
    Clipboard.setString(link);

    // 애니메이션 시작
    Animated.timing(fadeAnim, {
      toValue: 1, // opacity를 1로 변경하여 보이게 함
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // 2초 후에 애니메이션을 다시 실행하여 숨김
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0, // opacity를 0으로 변경하여 숨김
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 2000);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subText}>오늘의 맘을 함께 사용할</Text>
      <Text style={styles.subText}>가족을 초대해주세요</Text>
      <Text style={styles.subText2}>
        초대 링크는 ‘마이페이지’에서 다시 확인할 수 있어요!
      </Text>

      <View style={styles.linkContainer}>
        <Text style={styles.linkText} numberOfLines={1}>
          {link}
        </Text>
        <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
          <Text style={styles.copyButtonText}>복사</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
        <Text style={styles.toastText}>링크가 복사되었습니다!</Text>
      </Animated.View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          navigation.navigate('MomHome');
        }}
      >
        <Text style={styles.nextButtonText}>가입 완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toastText: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.3,
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 48,
    backgroundColor: 'white',
  },
  toast: {
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
    borderRadius: 4,
    width: 139,
    height: 38,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 150,
    left: '50%',
    transform: [{ translateX: -50 }],
    zIndex: 1000,
  },
  link: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.3,
  },
  subText: {
    color: '#111',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 34,
    letterSpacing: -0.35,
  },
  subText2: {
    color: '#767676',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.35,
    marginTop: 4,
    marginBottom: 24,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 14,
    paddingRight: 16,
    paddingBottom: 14,
    paddingLeft: 16,

    borderColor: '#E5E5EC',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#F7F7FB',
    marginBottom: 402,
  },
  linkText: {
    flex: 1,
    marginRight: 10,
    color: '#111',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  copyButton: {
    backgroundColor: '#A30FFA',
    borderRadius: 4,
    paddingTop: 3,
    paddingRight: 8,
    paddingBottom: 3,
    paddingLeft: 8,
    width: 37,
    height: 24,
  },
  copyButtonText: {
    color: '#fff',
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    lineHeight: 18,
    fontSize: 12,
    fontWeight: '400',
  },
  nextButton: {
    backgroundColor: '#A30FFA',
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 12,
  },
  nextButtonText: {
    color: '#fff',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  buttonActive: {
    backgroundColor: '#A30FFA',
  },
});

export default Invite;
