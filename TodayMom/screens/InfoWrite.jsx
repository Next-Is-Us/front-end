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

const InfoWrite = () => {
  const navigation = useNavigation();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const nickname = await AsyncStorage.getItem('nickname');
        const response = await fetch(
          'https://15.164.134.131/api/admin/accessToken',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nickname }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          if (result.status === 200 && nickname === '관리자') {
            setShowButton(true);
          }
        }
      } catch (error) {
        console.error('Error fetching admin status', error);
      }
    };

    checkAdmin();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.list}>
        <View style={styles.textContent}>
          <Text style={styles.mainText}>게시글 제목</Text>
          <Text style={styles.subText} numberOfLines={2} ellipsizeMode="tail">
            1. 필수 영양소를 충분히 섭취하되 적정 체중을 유지하도록
            조절해야합니다 고칼슘 식품을 섭취합니다.
          </Text>
        </View>
        <Image
          source={require('../assets/images/allowright.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.list}>
        <Image source={Beam} style={styles.thumbnail} />
        <View style={styles.textContent}>
          <Text style={styles.mainText}>게시글 제목</Text>
          <Text style={styles.subText} numberOfLines={2} ellipsizeMode="tail">
            1. 필수 영양소를 충분히 섭취하되 적정 체중을 유지하도록
            조절해야합니다 고칼슘 식품을 섭취합니다.
          </Text>
        </View>
        <Image
          source={require('../assets/images/allowright.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

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
    bottom: -400,
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
