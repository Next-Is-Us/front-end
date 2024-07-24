import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/BasicHeader';

const ViewContent = () => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Header />

        <View style={styles.content}>
          <Text style={styles.title}>갱년기 식사 요법</Text>
          <View style={styles.horizontalLine}></View>
          <Text style={styles.contenttext}>
            필수 영양소를 충분히 섭취하되 적정 체중을 유지하도록 조절해야합니다.
            고칼슘 식품을 섭취합니다. 알코올과 탄산음료는 칼슘의 흡수를
            저해하므로 자제해야합니다. 저지방, 저염식으로 심혈관질환의 위험을
            감소시킵니다. 비타민 E 등 비타민, 무기질이 풍부한 식품을 섭취합니다.
            플라본은 여성호르몬인 에스트로겐과 구조가 비슷한 물질로 갱년기
            증상(얼굴 홍조, 불면증)을 완화시킨다는 연구 결과들이 있으나 그
            차이가 현저하게 나타나지는 않습니다.
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollViewStyle}
          >
            <View style={styles.Imagecon}></View>
            <View style={styles.Imagecon}></View>
            <View style={styles.Imagecon}></View>
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
