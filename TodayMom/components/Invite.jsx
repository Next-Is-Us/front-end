import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Clipboard } from 'react-native';

const Invite = () => {
  const [link, setLink] = useState('www.todays.mom');
  const [toastVisible, setToastVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const copyToClipboard = () => {
    Clipboard.setString('www.todays.mom');
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: '링크가 복사되었습니다!',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 60,
      bottomOffset: 40,
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // 정확한 색상 코드 사용
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text1Style: {
        color: '#000000',
        fontFamily: 'Pretendard',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18,
      },
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
        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
          <Text style={styles.copyButtonText}>복사</Text>
        </TouchableOpacity>
      </View>

      <Toast ref={(ref) => Toast.setRef(ref)} />

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>가입 완료</Text>
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
  toast: {
    position: 'absolute',
    bottom: 48, // marginTop으로 지정된 48px 위에 위치
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
    borderRadius: 4,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  toastText: {
    color: '#fff',
    fontFamily: 'Pretendard',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default Invite;
