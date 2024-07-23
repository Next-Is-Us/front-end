import { View, Text, StyleSheet, Image, Pressable, SafeAreaView } from "react-native";
import TopBackground from "../components/TopBackground";
import HeaderNav from "../components/HeaderNav";
import RelationButton from "../components/RelationButton";
import WeekCalendar from "../components/WeekCalendar";
import { useState } from "react";
import ToRecordContainer from "../components/ToRecordContainer";
import FlowerGrid from "../assets/images/flowerGrid.svg";
import BottomNav from "../components/BottomNav";

export default function MomHomeScreen({navigation}) {
  const [invited, setInvited] = useState(true);
  const [recorded, setRecorded] = useState(false);

  const selectConditionHandler = () => {
    navigation.navigate("SelectCondition");
  }

  return (
    <View style={styles.screen}>
      {/* <TopBackground>
        <HeaderNav />
        <View style={styles.buttonContainer}>
          <RelationButton mom />
        </View>
      </TopBackground> */}
      <SafeAreaView>
        <HeaderNav relation="엄마" />
      </SafeAreaView>
      <View style={styles.bodyContainer}>
        <WeekCalendar />
        <Text style={styles.momHomeTitleText}>오늘의 상태를 알려주세요!</Text>
        <ToRecordContainer invited={invited} recorded={recorded} selectConditionHandler={selectConditionHandler} />
        <Text style={[styles.momHomeTitleText, {marginTop: 40}]}>우리의 꽃을 피워보아요</Text>
        <View style={styles.flowerGridContainer}>
          <FlowerGrid />
        </View>
      </View>
      <BottomNav home />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white"
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bodyContainer: {
    paddingHorizontal: 20,
    // alignItems: "center",
    // flex: 1
  },
  momHomeTitleText: {
    color: "black",
    fontFamily: "Pretendard",
    fontSize: 18,
    fontWeight: "400",
    marginTop: 24,
  },
  flowerGridContainer: {
    width: "100%",
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center"
  }
});
