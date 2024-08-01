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
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';

const Comment = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  const route = useRoute();
  const roomPostId = route.params.roomPostId;
  const [postDetails, setPostDetails] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    // 댓글 리스트 불러옴
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const response = await fetch(
        `https://15.164.134.131/api/roomComment/all/${roomPostId}?page=0`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setComments(result.data.data);
        console.log('댓글:', result.data.data);
      } else {
        throw new Error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchPostDetail = async () => {
    // 상세 게시글 불러옴
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const response = await fetch(
        `https://15.164.134.131/api/roomPost/detail/${roomPostId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        setPostDetails(result.data);
        console.log(result.data);
      } else {
        throw new Error('Failed to fetch post details');
      }
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPostDetail();
      fetchComments();
    }, [roomPostId])
  );

  const handleSubmitComment = async () => {
    // 댓글 작성 api
    const accessToken = await AsyncStorage.getItem('accessToken');
    const commentData = {
      roomPostId,
      commentContent: text,
    };

    try {
      const response = await fetch('https://15.164.134.131/api/roomComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(commentData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Comment submitted successfully', result);
        setText('');
        fetchComments(); // 댓글을 다시 불러와 갱신
      } else {
        throw new Error('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

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

  const renderCommentItem = ({ item }) => (
    <View style={styles.realcomment}>
      <Text style={styles.username}>{item.author}</Text>
      <Text style={styles.comments}>{item.commentContent}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <Header />
            <View style={styles.content}>
              <Text style={styles.title}>{postDetails?.title}</Text>
              <View style={styles.horizontalLine}></View>
              <Text style={styles.contenttext}>{postDetails?.content}</Text>
              <Text style={styles.views}>조회수 {postDetails?.viewCount}</Text>
            </View>

            <View style={styles.commentcon}>
              <View style={styles.row}>
                <Message />
                <Text style={styles.commenttitle}>댓글</Text>
                <Text style={styles.number}>{comments.length}</Text>
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
                <TouchableOpacity onPress={handleSubmitComment}>
                  {isFocused ? <Purplesend /> : <Send />}
                </TouchableOpacity>
              </View>

              <FlatList
                data={comments}
                keyExtractor={(item) => item.commentId.toString()}
                renderItem={renderCommentItem}
                contentContainerStyle={{ paddingBottom: 50 }}
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
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
