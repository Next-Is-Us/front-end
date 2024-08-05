import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

const Nickname = ({route}) => {
  const [nickname, setNickname] = useState('');
  const { userDetails, setUserDetails } = useUser();
  const isButtonEnabled = nickname.length > 0;
  const invitedLink = route.params.invitedLink;

  const navigation = useNavigation();

  const handleNicknameChange = (nickname) => {
    setNickname(nickname);
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      nickname,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subText}>반가워요 :)</Text>
      <Text style={styles.subText}>어떻게 불러드릴까요?</Text>

      <TextInput
        style={styles.input}
        onChangeText={handleNicknameChange}
        value={nickname}
        placeholder="이렇게 불러주세요!!"
      />

      <TouchableOpacity
        style={[styles.nextButton, isButtonEnabled && styles.buttonActive]}
        onPress={() => {
          if (isButtonEnabled) {
            navigation.navigate('Invite', {invitedLink : invitedLink});
          }
        }}
        disabled={!isButtonEnabled}
      >
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
  subText: {
    color: '#111',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 34,
    letterSpacing: -0.35,
  },
  input: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EC',
    width: '100%',
    marginBottom: 24,
    paddingTop: 14,
    marginTop: 24,
    paddingBottom: 14,
    marginBottom: 426,
  },
  nextButton: {
    backgroundColor: 'rgba(163, 15, 250, 0.15)',
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

export default Nickname;
