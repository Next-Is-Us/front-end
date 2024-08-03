import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Flower from '../assets/images/flower.svg';
import MiniProfile from '../assets/images/miniprofile.svg';
import PurpleNav from '../components/PurpleNav';
import BottomNav from '../components/BottomNav';
import Create from '../assets/images/commuplus.svg';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native';

const Communication = () => {
  const [rooms, setRooms] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const testAccessToken = //관리자용 토큰 테스트용임
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiYXV0aCI6WyJST0xFX0FETUlOIl0sImlhdCI6MTcyMjI5OTg5NCwiZXhwIjoxNzI0ODkxODk0fQ.YJKYS0wRx2MxNNvAbIjvvg10Qtr08YM1W1hneZbCAq4';

  useEffect(() => {
    const setAdminRole = async () => {
      try {
        await AsyncStorage.setItem('userRoles', JSON.stringify(['ROLE_ADMIN']));
        console.log('User roles set to ROLE_ADMIN');
      } catch (error) {
        console.error('Failed to set user roles', error);
      }
    };

    const setTestAccessToken = async () => {
      try {
        const testAccessToken =
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiYXV0aCI6WyJST0xFX0FETUlOIl0sImlhdCI6MTcyMjI5OTg5NCwiZXhwIjoxNzI0ODkxODk0fQ.YJKYS0wRx2MxNNvAbIjvvg10Qtr08YM1W1hneZbCAq4';
        await AsyncStorage.setItem('accessToken', testAccessToken);
        console.log('Test access token set in AsyncStorage');
      } catch (error) {
        console.error('Failed to store access token', error);
      }
    };

    setAdminRole();
    setTestAccessToken();
  }, []);

  const enterRoom = async (roomId) => {
    //소통방 입장(엄마,관리자만 가능)
    const accessToken = await AsyncStorage.getItem('accessToken');
    const roles = await AsyncStorage.getItem('userRoles');
    if (!roles) return alert('권한이 없습니다.');

    const parsedRoles = JSON.parse(roles);
    if (
      !parsedRoles.includes('ROLE_ADMIN') &&
      !parsedRoles.includes('ROLE_MOM')
    ) {
      return alert('입장 권한이 없습니다.');
    }

    try {
      const response = await fetch('https://15.164.134.131/api/room/enter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ roomId }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('입장 성공:', result);
        navigation.navigate('Commuroom', { roomId: roomId });
      } else {
        throw new Error(result.message || '입장에 실패했습니다.');
      }
    } catch (error) {
      console.error('입장 오류:', error);
      alert(error.message);
    }
  };

  const fetchRooms = async (page) => {
    if (isLoading) return; // 중복 호출 방지
    setIsLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('Access Token is not available');
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `https://15.164.134.131/api/room/list?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        setRooms(
          page === 0 ? result.data.data : [...rooms, ...result.data.data]
        );
        setCurrentPage(page);
      } else {
        console.error('Failed to fetch rooms:', result.message);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
    setIsLoading(false);
  };

  const handleLoadMore = () => {
    if (!isLoading) {
      fetchRooms(currentPage + 1);
    }
  };

  const setupRoles = async () => {
    const roles = await AsyncStorage.getItem('userRoles');
    if (roles) {
      const parsedRoles = JSON.parse(roles);
      setUserRoles(parsedRoles);
      if (
        parsedRoles.includes('ROLE_ADMIN') ||
        parsedRoles.includes('ROLE_DOCTOR')
      ) {
        setShowCreateRoom(true);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      setupRoles().catch(console.error);
      fetchRooms(0);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {showCreateRoom && (
          <TouchableOpacity
            style={styles.createRoom}
            onPress={() => navigation.navigate('Commucreate')}
          >
            <Text style={styles.create}>새로운 소통방 개설하기</Text>
            <Create />
          </TouchableOpacity>
        )}

        <FlatList
          data={rooms}
          keyExtractor={(item) => item.roomId.toString()}
          renderItem={({ item }) => (
            <View style={styles.Wholecontainer}>
              <Image source={{ uri: item.thumbnail }} style={styles.profile} />
              <Text style={styles.communame}>{item.name}</Text>
              <View style={styles.row}>
                <Text style={styles.communame}>함께 하는 커뮤니티</Text>
                <View style={styles.count}>
                  <MiniProfile />
                  <Text style={styles.people}>{item.peopleCount}명</Text>
                </View>
              </View>
              {item.isPossibleToEnter ? (
                <TouchableOpacity
                  style={styles.enter}
                  onPress={() => enterRoom(item.roomId)}
                >
                  <Text style={styles.entertext}>입장 하기</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.enter2}>
                  <View style={styles.iconContainer}>
                    {Array.from(
                      { length: item.necessaryNftCount },
                      (_, index) => (
                        <Flower key={index} width={24} height={24} />
                      )
                    )}
                  </View>
                  <Text style={styles.plusText}>가 필요해요</Text>
                </View>
              )}
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading ? <ActivityIndicator size="large" /> : null
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  create: {
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: -0.375,
    color: '#FFF',
  },
  createRoom: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
    width: '100%',
    height: 58,
    borderRadius: 12,
    backgroundColor: '#488CF3',
    paddingTop: 14,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    // flex: 1,
    backgroundColor: '#F1F1F5',
    marginBottom: 32,
  },
  Wholecontainer: {
    padding: 20,
    width: '100%',
    height: 292,
    borderRadius: 12,
    backgroundColor: '#FFF',
    marginBottom: 8,
  },
  profile: {
    width: '100%',
    backgroundColor: '#F1F1F5',
    height: 140,
    borderRadius: 12,
    marginBottom: 12,
  },
  communame: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  count: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  people: {
    color: '#505050',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.3,
  },
  enter: {
    width: '100%',
    height: 40,
    paddingTop: 10,
    paddingRight: 114,
    paddingBottom: 10,
    paddingLeft: 114,
    borderRadius: 12,
    backgroundColor: '#A30FFA',
    marginTop: 12,
  },
  entertext: {
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
    color: '#FFF',
  },
  enter2: {
    width: '100%',
    height: 40,
    paddingTop: 11,
    paddingRight: 75,
    paddingBottom: 11,
    paddingLeft: 75,
    borderRadius: 12,
    backgroundColor: '#f1f1f5',
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  plusText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    color: '#767676',
    marginLeft: 4,
    lineHeight: 18,
  },
});

export default Communication;
