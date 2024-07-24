import { View, Text, StyleSheet, Image, Pressable, SafeAreaView, Animated } from "react-native";
import TopBackground from "../components/TopBackground";
import HeaderNav from "../components/HeaderNav";
import RelationButton from "../components/RelationButton";
import WeekCalendar from "../components/WeekCalendar";
import { useState, useRef, useEffect } from "react";
import ToRecordContainer from "../components/ToRecordContainer";
import FlowerGrid from "../assets/images/flowerGrid.svg";
import BottomNav from "../components/BottomNav";
import Flower1 from "../assets/images/flower1.svg";
import Flower2 from "../assets/images/flower2.svg";
import Flower3 from "../assets/images/flower3.svg";
import Flower4 from "../assets/images/flower4.svg";
import Flower5 from "../assets/images/flower5.svg";
import Flower6 from "../assets/images/flower6.svg";

export default function MomHomeScreen({navigation}) {
  const [name, setName] = useState("갱년기"); // userName 추후에 백과 통신 예정
  const [invited, setInvited] = useState(true);
  const [recorded, setRecorded] = useState(false);
  const [flowerPieces, setFlowerPieces] = useState(0);

  const rotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (flowerPieces === 6 && now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
        setFlowerPieces(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 1500,
      delay: 300,
      useNativeDriver: true,
    }).start(() => {
      rotateAnimation.setValue(0);
    });
  },[flowerPieces]);

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const renderFlower = () => {
    switch (flowerPieces) {
      case 1:
        return <Flower1 />;
      case 2:
        return <Flower2 />;
      case 3:
        return <Flower3 />;
      case 4:
        return <Flower4 />;
      case 5:
        return <Flower5 />;
      case 6:
        return <Flower6 />;
      default:
        return <FlowerGrid />;
    }
  };

  const selectConditionHandler = () => {
    navigation.navigate("SelectCondition", {userName: name});
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
        <HeaderNav relation="엄마" name={name} />
      </SafeAreaView>
      <View style={styles.bodyContainer}>
        <WeekCalendar />
        <Text style={styles.momHomeTitleText}>오늘의 상태를 알려주세요!</Text>
        <ToRecordContainer invited={invited} recorded={recorded} selectConditionHandler={selectConditionHandler} />
        <Text style={[styles.momHomeTitleText, {marginTop: 40}]}>우리의 꽃을 피워보아요</Text>
        <View style={styles.flowerGridContainer}>
          <Animated.View style={{ transform: [{ rotate }] }}>
            {renderFlower()}
          </Animated.View>
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
