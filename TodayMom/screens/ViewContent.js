import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/BasicHeader';
import { Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useCallback } from 'react';

const ViewContent = ({ route, navigation }) => {
  const [post, setPost] = useState(null);
  const infoPostId = route.params.infoPostId;

  useFocusEffect(
    React.useCallback(() => {
      const fetchPost = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        try {
          const response = await fetch(
            `https://15.164.134.131/api/infoPost/detail/${infoPostId}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.ok) {
            const result = await response.json();
            console.log(result);
            setPost(result.data);
          } else {
            console.error('Failed to fetch post details');
            setPost(null);
          }
        } catch (error) {
          console.error('Error fetching post details:', error);
          setPost(null);
        }
      };

      fetchPost();
    }, [])
  );

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>No post data available.</Text>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <View style={styles.content}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.date}>{post.whenCreated}</Text>
          <View style={styles.horizontalLine}></View>
          <Text style={styles.contenttext}>{post.content}</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollViewStyle}
          >
            {post.imageUrl &&
              post.imageUrl.map((uri, index) => (
                <Image
                  key={index}
                  source={{ uri }}
                  style={styles.image}
                  onError={(e) =>
                    console.log('Image load error:', e.nativeEvent.error)
                  }
                />
              ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth - 50) / 2;

const styles = StyleSheet.create({
  date: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
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

export default ViewContent;
