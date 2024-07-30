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

const Communication = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const setupRoles = async () => {
      // await AsyncStorage.setItem('userRoles', JSON.stringify(['ROLE_DOCTOR']));

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

    setupRoles().catch(console.error);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {showCreateRoom && (
        <TouchableOpacity
          style={styles.createRoom}
          onPress={() => navigation.navigate('Commucreate')}
        >
          <Text style={styles.create}>새로운 소통방 개설하기</Text>
          <Create />
        </TouchableOpacity>
      )}
      <View style={styles.Wholecontainer}>
        <View style={styles.profile} />
        <Text style={styles.communame}>산부인과 전문가 의사 김민주님이</Text>
        <View style={styles.row}>
          <Text style={styles.communame}>함께 하는 커뮤니티</Text>
          <View style={styles.count}>
            <MiniProfile />
            <Text style={styles.people}>00명</Text>
          </View>
        </View>
        <View style={styles.enter}>
          <Text style={styles.entertext}>입장 하기</Text>
        </View>
      </View>

      <View style={styles.Wholecontainer}>
        <View style={styles.profile} />
        <Text style={styles.communame}>산부인과 전문가 의사 김민주님이</Text>
        <View style={styles.row}>
          <Text style={styles.communame}>함께 하는 커뮤니티</Text>
          <View style={styles.count}>
            <MiniProfile />
            <Text style={styles.people}>00명</Text>
          </View>
        </View>
        <View style={styles.enter2}>
          <View style={styles.iconContainer}>
            <Flower width={24} height={24} />
            <Flower width={24} height={24} />
            <Flower width={24} height={24} />
          </View>
          <Text style={styles.plusText}>가 필요해요</Text>
        </View>
      </View>
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
