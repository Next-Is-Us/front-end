import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Flower from '../assets/images/flower.svg';
import MiniProfile from '../assets/images/miniprofile.svg';
import PurpleNav from '../components/PurpleNav';
import BottomNav from '../components/BottomNav';
import { Image } from 'react-native';
import Beam from '../assets/images/beam.png';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const InfoWrite = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const fetchPosts = async () => {
    try {
      const nickname = await AsyncStorage.getItem('nickname');
      const accessToken = await AsyncStorage.getItem('accessToken');

      // 관리자 확인
      const adminResponse = await fetch(
        'https://15.164.134.131/api/admin/accessToken',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nickname }),
        }
      );

      if (adminResponse.ok) {
        const result = await adminResponse.json();
        if (result.code === '200') {
          setShowButton(true);
        }
      }

      // 글 목록 불러오기
      const response = await fetch('https://15.164.134.131/api/infoPost/list', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setPosts(result.data.data);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.list}
        onPress={() => {
          console.log(
            'Navigating to ViewContent with infoPostId:',
            item.infoPostId
          );
          navigation.navigate('ViewContent', { infoPostId: item.infoPostId });
        }}
      >
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.thumbnail} />
        ) : null}
        <View style={styles.textContent}>
          <Text style={styles.mainText}>{item.title || '제목 없음'}</Text>
          <Text style={styles.subText} numberOfLines={2}>
            {item.content || '내용 없음'}
          </Text>
        </View>
        <Image
          source={require('../assets/images/allowright.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.infoPostId.toString()}
      />
      {showButton && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('NewWrite')}
        >
          <Text style={styles.write}>글쓰기</Text>
          <Image
            source={require('../assets/images/pencil.png')}
            style={styles.fabIcon}
          />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  write: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.325,
  },
  fabIcon: {
    width: 16,
    height: 16,
  },
  fab: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    bottom: 30,
    width: 90,
    height: 40,
    backgroundColor: '#A30FFA',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    paddingTop: 9,
    paddingRight: 16,
    paddingBottom: 9,
    paddingLeft: 16,
  },
  thumbnail: {
    width: 68,
    height: 68,
    borderRadius: 12,
    marginRight: 16,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    marginLeft: 12,
  },
  textContent: {
    flex: 1,
    gap: 1,
  },
  subText: {
    color: '#767676',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    // width: 290,
    // height: 36,
  },
  mainText: {
    color: '#111',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  container: {
    // flex: 1,
    backgroundColor: '#F1F1F5',
  },

  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingTop: 19,
    paddingLeft: 16,
    paddingBottom: 19,
    paddingRight: 16,
    marginBottom: 10,
    width: '100%',
    height: 100,
  },
});

export default InfoWrite;
