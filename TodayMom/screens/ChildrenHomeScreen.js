import { View, Text, StyleSheet, Image, Pressable, SafeAreaView, Animated } from "react-native";
import TopBackground from "../components/TopBackground";
import HeaderNav from "../components/HeaderNav";
import RelationButton from "../components/RelationButton";
import WeekCalendar from "../components/WeekCalendar";
import { useState, useRef, useEffect, useCallback } from "react";
import ToRecordContainer from "../components/ToRecordContainer";
import FlowerGrid from "../assets/images/flowerGrid.svg";
import BottomNav from "../components/BottomNav";
import Flower1 from "../assets/images/flower1.svg";
import Flower2 from "../assets/images/flower2.svg";
import Flower3 from "../assets/images/flower3.svg";
import Flower4 from "../assets/images/flower4.svg";
import Flower5 from "../assets/images/flower5.svg";
import Flower6 from "../assets/images/flower6.svg";
import YellowFlower1 from "../assets/images/yellowFlower1.svg";
import YellowFlower2 from "../assets/images/yellowFlower2.svg";
import YellowFlower3 from "../assets/images/yellowFlower3.svg";
import YellowFlower4 from "../assets/images/yellowFlower4.svg";
import YellowFlower5 from "../assets/images/yellowFlower5.svg";
import YellowFlower6 from "../assets/images/yellowFlower6.svg";
import GreenFlower1 from "../assets/images/greenFlower1.svg";
import GreenFlower2 from "../assets/images/greenFlower2.svg";
import GreenFlower3 from "../assets/images/greenFlower3.svg";
import GreenFlower4 from "../assets/images/greenFlower4.svg";
import GreenFlower5 from "../assets/images/greenFlower5.svg";
import GreenFlower6 from "../assets/images/greenFlower6.svg";
import RecordedContainer from "../components/RecordedContainer";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useUser } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChildrenHomeScreen({navigation}) {
  const [name, setName] = useState("갱년기"); // userName 추후에 백과 통신 예정
  // const [invited, setInvited] = useState(true);
  const [recorded, setRecorded] = useState(false);
  const [flowerPieces, setFlowerPieces] = useState(0);
  const today = new Date();
  const [date, setDate] = useState('');
  // const [token, setToken] = useState('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMSIsImF1dGgiOlsiUk9MRV9TT04iXSwiaWF0IjoxNzIyNTc0NzczLCJleHAiOjE3MjUxNjY3NzN9.iTe1AfZp7C4PmZu-9bwdT9qWicgujP3pQo_LZ8BeEYk'); // 더미데이터임 
  const [token, setToken] = useState("");
  const [userRole, setUserRole] = useState("");
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  const rotateAnimation = useRef(new Animated.Value(0)).current;

  // promise 기반 get
  const getToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        console.log("토큰 받아오기");
        setToken(accessToken);
      } else {
        console.log('not found');
        navigation.navigate("Splash");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUserRole = async () => {
    try {
      const userRole = await AsyncStorage.getItem('userRoles2');
      if (userRole) {
        setUserRole(userRole);
        console.log("유저를 받아옵니다 " + userRole);
      } else {
        console.log('not found');
      }
    } catch (e) {
      console.log(e);
    }
  }

  const getDayRecord = async () => {
    if(!token || !userRole) return;
    // console.log(token);
    try {
      console.log('토큰 보내기', token);
      console.log("유저 보내기", userRole)
      const response = await axios.get(
        `https://15.164.134.131/api/condition/byDate/${year}/${month}/${day}/${userRole}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("기록 결과" + JSON.stringify(response.data.data));
      setName(response.data.data.nickname);
      setRecorded(response.data.data.isRecording);
      setDate(response.data.data.date);
      // setUserRole(response.data.data.userRole);
    } catch(e) {
      console.error(e);
    }
  };

  const getFlowerRecord = async () => {
    if(!token || !userRole) return;
    try {
      const response = await axios.get("https://15.164.134.131/api/nft/${userRole}", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      console.log("꽃피 결과 " + JSON.stringify(response.data));
      setFlowerPieces(response.data.data);
    } catch(e) {
      console.error(e);
    }
  }

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

  useEffect(() => {
    getToken();
    getUserRole();
  }, []);

  useEffect(() => {
    if (token && userRole) {
      console.log("통신 실행");
      getDayRecord();
      getFlowerRecord();
    }
  }, [token, year, month, day, userRole]);
  
  useFocusEffect(
    useCallback(() => {
      const today = new Date();
      selectDay(today.getDate());
      selectMonth(today.getMonth() + 1);
      selectYear(today.getFullYear());
      getDayRecord();
      getFlowerRecord();
    }, [token])
  );

  const renderFlower = () => {
    switch (flowerPieces) {
      case 1:
        return (
          <>
            {totalNft % 3 == 1 && <Flower1 />}
            {totalNft % 3 == 2 && <YellowFlower1 />}
            {totalNft % 3 == 0 && <GreenFlower1 />}
          </>
        );
      case 2:
        return (
          <>
            {totalNft % 3 == 1 && <Flower2 />}
            {totalNft % 3 == 2 && <YellowFlower2 />}
            {totalNft % 3 == 0 && <GreenFlower2 />}
          </>
        );
      case 3:
        return (
          <>
            {totalNft % 3 == 1 && <Flower3 />}
            {totalNft % 3 == 2 && <YellowFlower3 />}
            {totalNft % 3 == 0 && <GreenFlower3 />}
          </>
        );
      case 4:
        return (
          <>
            {totalNft % 3 == 1 && <Flower4 />}
            {totalNft % 3 == 2 && <YellowFlower4 />}
            {totalNft % 3 == 0 && <GreenFlower4 />}
          </>
        );
      case 5:
        return (
          <>
            {totalNft % 3 == 1 && <Flower5 />}
            {totalNft % 3 == 2 && <YellowFlower5 />}
            {totalNft % 3 == 0 && <GreenFlower5 />}
          </>
        );
      case 6:
        return (
          <>
            {totalNft % 3 == 1 && <Flower6 />}
            {totalNft % 3 == 2 && <YellowFlower6 />}
            {totalNft % 3 == 0 && <GreenFlower6 />}
          </>
        );
      default:
        return <FlowerGrid />;
    }
  };

  const selectConditionHandler = () => {
    if (
      today.getFullYear() === year &&
      today.getMonth() + 1 === month &&
      today.getDate() === day
    ) {
      navigation.navigate('SelectCondition', { userName: name });
    }
  };

  const selectDay = (day) => {
    setDay(day);
  };

  const selectMonth = (month) => {
    setMonth(month);
  };

  const selectYear = (year) => {
    setYear(year);
  };

  return (
    <View style={styles.screen}>
      {/* <TopBackground>
        <HeaderNav />
        <View style={styles.buttonContainer}>
          <RelationButton mom />
        </View>
      </TopBackground> */}
      <SafeAreaView>
        <HeaderNav relation="자녀" name={name} />
      </SafeAreaView>
      <View style={styles.bodyContainer}>
      <WeekCalendar
          relation="자녀"
          selectDay={selectDay}
          selectMonth={selectMonth}
          selectYear={selectYear}
        />
        <Text style={styles.momHomeTitleText}>오늘의 상태를 알려주세요!</Text>
        <RecordedContainer recorded={recorded} userRole={userRole} year={year} month={month} day={day} date={date}/>
        <Text style={[styles.momHomeTitleText, {marginTop: 40}]}>우리의 꽃을 피워보아요</Text>
        <View style={styles.flowerGridContainer}>
          <Animated.View style={{ transform: [{ rotate }] }}>
            {renderFlower()}
          </Animated.View>
        </View>
      </View>
      <BottomNav home userRole={userRole} />
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
