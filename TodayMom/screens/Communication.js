import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Flower from '../assets/images/flower.svg';
import MiniProfile from '../assets/images/miniprofile.svg';

const Communication = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.textStyle2}>소통방</Text>
        <Text style={styles.textStyle}>갱년기 건강 정보</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  people: {
    color: '#505050',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.3,
  },
  count: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  plusText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    color: '#767676',
    marginLeft: 4,
    lineHeight: 18,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  communame: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#000',
  },
  profile: {
    width: '100%',
    backgroundColor: '#F1F1F5',
    height: 140,
    borderRadius: 12,
    marginBottom: 12,
  },
  Wholecontainer: {
    padding: 20,
    width: '100%',
    height: 292,
    borderRadius: 12,
    backgroundColor: '#FFF',
    marginBottom: 8,
  },
  thumbnail: {
    width: 68,
    height: 68,
    borderRadius: 12,
    marginRight: 16,
  },
  write: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.325,
  },
  container: {
    marginTop: 36,
    flex: 1,
    padding: 20,
    backgroundColor: '#F1F1F5',
  },
  headerContainer: {
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 6,
    backgroundColor: '#F1F1F5',
  },
  textContent: {
    flex: 1,
  },
  fab: {
    flexDirection: 'row',
    position: 'absolute',
    right: 30,
    bottom: 100,
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
  fabIcon: {
    width: 16,
    height: 16,
  },
  itemContainer: {
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
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 10,
  },
  textStyle: {
    color: '#767676',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 28,
  },
  textStyle2: {
    color: '#A30FFA',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  mainText: {
    color: '#111',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  subText: {
    color: '#767676',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    marginLeft: 12,
  },
});

export default Communication;
