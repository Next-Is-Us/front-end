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
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMSIsImF1dGgiOlsiUk9MRV9TT04iXSwiaWF0IjoxNzIyNTc0NzczLCJleHAiOjE3MjUxNjY3NzN9.iTe1AfZp7C4PmZu-9bwdT9qWicgujP3pQo_LZ8BeEYk'); // 더미데이터임 
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
        setToken(accessToken);
      } else {
        console.log('not found');
        navigation.navigate("Splash");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // const getUserRole = async () => {
  //   try {
  //     const userRole = await AsyncStorage.getItem('userRoles');
  //     if (userRole) {
  //       setUserRole(userRole);
  //       console.log(userRole);
  //     } else {
  //       console.log('not found');
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  const getDayRecord = async () => {
    if(!token) return;
    console.log(token);
    try {
      console.log('Sending request with token:', token);
      const response = await axios.get(
        `https://15.164.134.131/api/condition/byDate/${year}/${month}/${day}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      setName(response.data.data.nickname);
      setRecorded(response.data.data.isRecording);
      setDate(response.data.data.date);
      setUserRole(response.data.data.userRole);
    } catch(e) {
      console.error(e);
    }
  };

  const getFlowerRecord = async () => {
    if(!token) return;
    try {
      const response = await axios.get("https://15.164.134.131/api/nft", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(response.data);
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
    // console.log("토큰 받아오기");
    // getToken();
    // getUserRole();
  }, []);

  useEffect(() => {
    if (token) {
      console.log("토큰이 설정되었습니다:", token);
      console.log(year);
      console.log(month);
      console.log(day);
      console.log('통신 실행');
      getDayRecord();
      getFlowerRecord();
    }
  }, [token, year, month, day]);
  
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
        <RecordedContainer recorded={recorded} />
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
