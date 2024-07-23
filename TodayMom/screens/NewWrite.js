import React, { useState } from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewWrite = () => {
  const navigation = useNavigation();

  const [titleText, setTitleText] = useState('');
  const [contentText, setContentText] = useState('');

  const handleTitleChange = (text) => {
    setTitleText(text);
  };

  const handleContentChange = (text) => {
    setContentText(text);
  };

  const maxLengthTitle = 20;
  const maxLengthContent = 500;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerLeft}
          >
            <Image
              source={require('../assets/images/leftallow.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>새 글쓰기</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>작성하기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container2}>
        <View style={styles.textcontainer}>
          <TextInput
            style={styles.input}
            onChangeText={handleTitleChange}
            value={titleText}
            maxLength={maxLengthTitle}
            placeholder="제목을 입력해주세요"
          />
          <Text
            style={styles.counter}
          >{`${titleText.length}/${maxLengthTitle}`}</Text>
        </View>

        <View style={styles.textcontainer2}>
          <TextInput
            style={styles.inputContent}
            onChangeText={handleContentChange}
            value={contentText}
            maxLength={maxLengthContent}
            placeholder="내용을 입력해주세요"
            multiline // Enable multiline input
          />
          <View style={styles.counterWrapper}>
            <Text
              style={styles.counterContent}
            >{`${contentText.length}/${maxLengthContent}`}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textcontainer2: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5ec',
    backgroundColor: '#F7F7FB',
    height: 512,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    flexDirection: 'column', // Allow multiline input to expand
    justifyContent: 'flex-start', // Align children to the top
    marginBottom: 24,
  },
  counterWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  counterContent: {
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    color: '#767676',
  },
  input: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.35,
    flex: 1, // Allow input to grow and fill available space
    textAlignVertical: 'top', // Align text to the top
  },
  inputContent: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.35,
    flex: 1, // Allow input to grow and fill available space
    textAlignVertical: 'top', // Align text to the top
  },
  textcontainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5ec',
    backgroundColor: '#F7F7FB',
    height: 48,
    paddingTop: 14,
    paddingRight: 16,
    paddingBottom: 14,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  container2: {
    flexDirection: 'column',
    marginTop: 12,
  },
  safeArea: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 14,
    paddingBottom: 14,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeft: {
    paddingRight: 8,
  },
  icon: {
    width: 25,
    height: 25,
  },
  title: {
    color: '#111',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.5,
  },
  button: {
    backgroundColor: '#A30FFA',
    paddingTop: 7,
    paddingRight: 16,
    paddingBottom: 7,
    paddingLeft: 16,
    borderRadius: 100,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.325,
  },
});

export default NewWrite;
