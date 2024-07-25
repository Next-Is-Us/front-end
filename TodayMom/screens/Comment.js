import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/BasicHeader';
import { Image } from 'react-native';
import Message from '../assets/images/message2.svg';
import { TouchableOpacity } from 'react-native';
import Send from '../assets/images/send.svg';
import { TextInput } from 'react-native';
import { useState } from 'react';
import Purplesend from '../assets/images/purplesend.svg';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';

const Comment = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');

  const handleTextChange = (newText) => {
    setText(newText);
  };

  const getInputHeight = () => {
    const numberOfLines = text.split('\n').length;
    const baseHeight = 56;
    const extraHeight = 20;
    return baseHeight + (numberOfLines - 1) * extraHeight;
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1 }}>
              <Header />
              <View style={styles.content}>
                <Text style={styles.title}>게시글 제목</Text>
                <View style={styles.horizontalLine}></View>
                <Text style={styles.contenttext}>게시글 내용</Text>
                <Text style={styles.views}>조회수 00</Text>
              </View>

              <View style={styles.commentcon}>
                <View style={styles.row}>
                  <Message />
                  <Text style={styles.commenttitle}>댓글</Text>
                  <Text style={styles.number}>00</Text>
                </View>

                <View
                  style={[
                    styles.write,
                    { height: getInputHeight() },
                    isFocused ? styles.focusedBorder : null,
                  ]}
                >
                  <TextInput
                    multiline={true}
                    style={styles.input}
                    placeholder="댓글을 작성해주세요"
                    placeholderTextColor="#767676"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={handleTextChange}
                    value={text}
                  />
                  <TouchableOpacity>
                    {isFocused ? <Purplesend /> : <Send />}
                  </TouchableOpacity>
                </View>

                <View style={styles.realcomment}>
                  <Text style={styles.username}>유저 이름123</Text>
                  <Text style={styles.comments}>댓글 내용</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
};

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth - 50) / 2;

const styles = StyleSheet.create({
  focusedBorder: {
    borderColor: '#A30FFA',
  },
  comments: {
    color: '#111',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },
  username: {
    color: '#111',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
  },
  realcomment: {
    flexDirection: 'column',
    marginTop: 36,
    marginBottom: 24,
  },
  write: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 56,
    padding: 14,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E5EC',
    backgroundColor: '#F7F7F7',
  },
  input: {
    paddingTop: 0,
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    color: '#000',
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    lineHeight: -0.35,
  },
  number: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    color: '#767676',
    marginLeft: 2,
  },
  commenttitle: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    color: '#111',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  commentcon: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  views: {
    textAlign: 'right',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.3,
    color: '#767676',
  },
  scrollViewStyle: {
    flexDirection: 'row',
    marginTop: 32,
  },
  Imagecon: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EC',
    backgroundColor: '#F7F7FB',
    marginRight: 10,
  },
  contenttext: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.35,
    color: '#111',
    height: 220,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flexDirection: 'column',
    marginTop: 12,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 28,
    letterSpacing: -0.5,
    color: '#111',
  },
  horizontalLine: {
    backgroundColor: '#F1DBFE',
    height: 1,
    alignSelf: 'stretch',
    marginTop: 12,
    marginBottom: 12,
  },
});

export default Comment;
