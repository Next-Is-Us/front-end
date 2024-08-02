import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Text } from 'react-native';
import Purple from '../assets/images/purpleprofile.svg';
import Allow from '../assets/images/allow_bottom.svg';
import { useState } from 'react';
import Message from '../assets/images/message.svg';
import Doctor from '../assets/images/doctor.svg';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';

const Commuroom = ({ navigation }) => {
  const [showMore, setShowMore] = useState(false);
  const [roomDetails, setRoomDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const route = useRoute();
  const roomId = route.params.roomId;

  const fetchRoomDetails = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const response = await fetch(
        `https://15.164.134.131/api/room/detail/${roomId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setRoomDetails(result.data);
      } else {
        throw new Error('Failed to fetch room details');
      }
    } catch (error) {
      console.error('Error fetching room details:', error);
    }
  };

  const fetchRoomPosts = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const response = await fetch(
        `https://15.164.134.131/api/roomPost/list?roomId=${roomId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setPosts(result.data.data);
      } else {
        throw new Error('Failed to fetch room posts');
      }
    } catch (error) {
      console.error('Error fetching room posts:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRoomDetails();
      fetchRoomPosts();
    }, [roomId])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.content}
      onPress={() =>
        navigation.navigate('Comment', { roomPostId: item.roomPostId })
      }
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.detail} numberOfLines={2} ellipsizeMode="tail">
        {item.content}
      </Text>
      <View style={styles.row2}>
        <View style={styles.row3}>
          <Message />
          <Text style={styles.count}>00</Text>
        </View>
        <Text style={styles.minute}>{item.whenCreated}</Text>
      </View>
    </TouchableOpacity>
  );

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            {roomDetails && (
              <Image
                source={
                  roomDetails.thumbnail
                    ? { uri: roomDetails.thumbnail }
                    : require('../assets/images/doctor.svg')
                }
                style={styles.largeImage}
                resizeMode="cover"
              />
            )}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.goBackButton}
            >
              <Image
                source={require('../assets/images/leftallow.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.blurWrapper}>
          <BlurView style={styles.blurView} intensity={75}></BlurView>
        </View>
        <View style={styles.blurContainer}>
          <View style={[styles.profile, { height: showMore ? 'auto' : 240 }]}>
            <Text style={styles.communame}>{roomDetails?.name}</Text>
            <View style={styles.row}>
              <Purple />
              <Text style={styles.people}>
                {roomDetails?.peopleCount}명 참여중
              </Text>
            </View>
            <View style={styles.introcon}>
              <Text
                style={styles.intro}
                numberOfLines={showMore ? undefined : 3}
                ellipsizeMode="tail"
              >
                {roomDetails?.introduction}
              </Text>
              {roomDetails?.introduction.length > 150 && (
                <TouchableOpacity style={styles.more} onPress={toggleShowMore}>
                  <Text style={styles.moretext}>
                    {showMore ? '간략히 보기' : '자세히 보기'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <FlatList
          data={posts}
          keyExtractor={(item) => item.roomPostId.toString()}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingRight: 20,
            paddingLeft: 20,
            paddingBottom: 100,
          }}
        />

        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            navigation.navigate('Commuwrite', { roomId: roomId });
          }}
        >
          <Text style={styles.write}>글쓰기</Text>
          <Image
            source={require('../assets/images/pencil.png')}
            style={styles.fabIcon}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fabIcon: {
    width: 16,
    height: 16,
  },
  write: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.325,
  },
  fab: {
    flexDirection: 'row',
    position: 'absolute',
    right: 20,
    bottom: 20,
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
  headerContainer: {
    height: 260,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  headerLeft: {
    width: '100%',
    height: 260,
  },
  largeImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  blurWrapper: {
    position: 'absolute',
    top: 200,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
  },
  blurView: {
    flex: 1,
    borderRadius: 24,
  },
  goBackButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  price: {
    width: '100%',
    height: 300,
    backgroundColor: '#f1f1f5',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f1f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  blurContainer: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 32,
  },
  profile: {
    flexDirection: 'column',
    paddingTop: 24,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    borderRadius: 24,
    backgroundColor: '#FFF',
    shadowColor: 'rgba(67, 0, 209, 0.04)',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 10,
  },
  communame: {
    color: '#000',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.5,
  },
  row: {
    marginBottom: 24,
    gap: 4,
    flexDirection: 'row',
    marginTop: 12,
  },
  people: {
    color: '#A30FFA',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.35,
  },
  introcon: {
    width: '100%',
    alignItems: 'center',
  },
  intro: {
    color: '#505050',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  more: {
    marginTop: 12,
    flexDirection: 'row',
    width: 96,
    height: 36,
    paddingTop: 9,
    paddingRight: 12,
    paddingBottom: 9,
    paddingLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E5E5EC',
    color: '#111',
    marginBottom: 10,
  },
  moretext: {
    fontSize: 14,
    color: '#111',
  },
  container: {
    marginTop: 32,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  content: {
    marginBottom: 12,
    paddingTop: 15,
    paddingLeft: 18,
    paddingRight: 18,
    width: '100%',
    height: 124,
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: 'rgba(0, 0, 0, 0.04)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    color: '#111',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.4,
  },
  detail: {
    width: '100%',
    height: 36,
    color: '#767676',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.3,
    overflow: 'hidden',
  },
  row2: {
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row3: {
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  count: {
    color: '#A30FFA',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
  },
  minute: {
    color: '#505050',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'right',
  },
});

export default Commuroom;
