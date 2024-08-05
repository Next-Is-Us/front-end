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
import axios from 'axios';

const InviteLink = () => {
  const [link, setLink] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const isButtonEnabled = link.length > 0;

  const navigation = useNavigation();

  const handleLinkChange = (userInput) => {
    setLink(userInput);
    console.log(userInput);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const linkHandler = async () => {
    try {
      const response = await axios.get(`https://15.164.134.131/api/link/${link}`);
      console.log(response.data);
      if(response.status == 200) {
        navigation.navigate('Nickname', {invitedLink : link});
      }
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subText}>엄마에게 받은</Text>
      <Text style={styles.subText}>초대 코드를 기입해 주세요!</Text>

      <TextInput
        style={[styles.input, isFocused && styles.focusedInput]}
        onChangeText={handleLinkChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={link}
        placeholder="초대코드를 입력해주세요"
      />

      <TouchableOpacity
        style={[styles.nextButton, link.length > 0 && styles.buttonActive]}
        onPress={() => {
          if (link.length > 0) {
            linkHandler();
          }
        }}
        disabled={link.length === 0}
      >
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  focusedInput: {
    borderBottomColor: '#A30FFA',
  },
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

export default InviteLink;
