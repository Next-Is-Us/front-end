import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/BasicHeader';
import { Image } from 'react-native';
import Message from '../assets/images/message2.svg';
import { TouchableOpacity } from 'react-native';
import Send from '../assets/images/send.svg';
import { TextInput } from 'react-native';

const Comment = () => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
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

          <View style={styles.write}>
            <TextInput
              style={styles.input}
              placeholder="댓글을 작성해주세요"
              placeholderTextColor="#767676"
            />
            <TouchableOpacity>
              <Send />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth - 50) / 2;

const styles = StyleSheet.create({
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
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    color: '#000',
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
