import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Text } from 'react-native';
import Purple from '../assets/images/purpleprofile.svg';
import Allow from '../assets/images/allow_bottom.svg';
import { useState } from 'react';
import Message from '../assets/images/message.svg';

const Commuroom = ({ navigation }) => {
  const [profileHeight, setProfileHeight] = useState(256); // 초기 높이 256

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.headerLeft}
      >
        <Image
          source={require('../assets/images/leftallow.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      <View style={styles.blurContainer}>
        <BlurView style={styles.price} intensity={10}>
          <View style={[styles.profile, { height: profileHeight }]}>
            <Text style={styles.communame}>
              산부인과 전문가 의사 김민주님이
            </Text>
            <Text style={styles.communame}>함께하는 커뮤니티</Text>
            <View style={styles.row}>
              <Purple />
              <Text style={styles.people}>90명 참여중</Text>
            </View>
            <View style={styles.introcon}>
              <Text style={styles.intro}>
                안녕하세요, 산부인과 전문가 김민주 의사입니다. 저희 소통방에서는
                여성 삶의 모든 단계에서 여성을 포괄적으로 돌보고 지원하는 데
                전념하고 있습니다. 임신, 생식 건강, 전반적인 웰빙에 관해 궁금한
                점이 있으시면 수년간의 경험과 여성 건강에 대한 깊은 헌신을
                바탕으로 성실히 답변드리겠습니다!
              </Text>
              <TouchableOpacity
                style={styles.more}
                onPress={() => setProfileHeight(286)}
              >
                <Text style={styles.moretext}>자세히 보기</Text>
                <Allow />
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>게시글 제목</Text>
          <Text style={styles.detail} numberOfLines={2} ellipsizeMode="tail">
            동해물과 백두산이 동해물과 백두산이동해물과 백두산이동해물과
            백두산이동해물과 백두산이동해물과 백두산이동해물과 백두산이동해물과
          </Text>

          <View style={styles.row2}>
            <View style={styles.row3}>
              <Message />
              <Text style={styles.count}>00</Text>
            </View>
            <Text style={styles.minute}>3분전</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  minute: {
    color: '#505050',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'right',
  },
  count: {
    color: '#A30FFA',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
  },
  row3: {
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  row2: {
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  title: {
    color: '#111',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.4,
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
  container: {
    marginTop: 32,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
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
  introcon: {
    width: '100%',
    height: 54,
    alignItems: 'center',
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
  row: {
    marginBottom: 24,
    gap: 4,
    flexDirection: 'row',
    marginTop: 12,
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
  profile: {
    flexDirection: 'column',
    paddingTop: 24,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    // height: 256,
    borderRadius: 24,
    backgroundColor: '#FFF',
    shadowColor: 'rgba(67, 0, 209, 0.04)',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 10,
    marginTop: 50,
  },
  blurContainer: {
    width: '100%',
    height: 336,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  price: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f1f1f5',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f1f5',
  },
  headerLeft: {
    paddingTop: 14,
    paddingBottom: 14,
    width: '100%',
    height: 170,
    backgroundColor: '#f1f1f5',
  },
  icon: {
    marginLeft: 20,
    width: 25,
    height: 25,
  },
});

export default Commuroom;
