import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/BasicHeader';
import { Image } from 'react-native';

const ViewContent = ({ route }) => {
  const post = route?.params?.post;

  // post 데이터와 이미지 URI 확인
  console.log('Post data:', post);
  if (post?.imageUri) {
    console.log('Image URI:', post.imageUri);
  }

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
          <View style={styles.horizontalLine}></View>
          <Text style={styles.contenttext}>{post.content}</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollViewStyle}
          >
            {post.imageUri && (
              <Image
                source={{ uri: post.imageUri }}
                style={styles.Imagecon}
                onError={(e) =>
                  console.log('Image load error:', e.nativeEvent.error)
                }
              />
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const screenWidth = Dimensions.get('window').width;
const imageWidth = (screenWidth - 50) / 2; // 3개에 맞추어 조정

const styles = StyleSheet.create({
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
