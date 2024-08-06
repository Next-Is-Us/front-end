import { View, Text, StyleSheet, Image, Pressable, SafeAreaView, Animated, Dimensions, Share } from "react-native";
import TopBackground from "../components/TopBackground";
import HeaderNav from "../components/HeaderNav";
import RelationButton from "../components/RelationButton";
import WeekCalendar from "../components/WeekCalendar";
import { useState, useRef, useEffect, useCallback, useContext } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { useUser } from "../context/UserContext";
import * as Linking from 'expo-linking';
// import Share from 'react-native-share';

export default function MomHomeScreen({navigation}) {
  const [name, setName] = useState("갱년기"); // userName 추후에 백과 통신 예정 (complete)
  const [invited, setInvited] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [flowerPieces, setFlowerPieces] = useState(0);
  const [totalNft, setTotalNft] = useState();
  const today = new Date();
  const [date, setDate] = useState('');
  // const [token, setToken] = useState("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiYXV0aCI6WyJST0xFX01PTSJdLCJpYXQiOjE3MjI4NzM5MzUsImV4cCI6MTcyNTQ2NTkzNX0.cP65jJ8FoUtLjYe2J-G4boNhWT1riWOKqtl_BuMAl6U"); // 더미데이터임 
  const [token, setToken] = useState();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());
  const { userDetails } = useUser();
  // const { link } = userDetails;
  // const {userRoles} = userDetails;
  // const link = "42837137-bf51-449a-8bea-f394911ff0c7"; // 더미 데이터 (추후 삭제 할 것)
  const [link, setLink] = useState("");
  const [userRole, setUserRole] = useState("ROLE_MOM");

  const rotateAnimation = useRef(new Animated.Value(0)).current;

  // 콜백 기반 get
  // useEffect(() => {
  //   AsyncStorage.getItem("accessToken", (error, token) => {
  //     const accessToken = token;
  //     if(accessToken) {
  //       console.log("token:" + accessToken);
  //     } else {
  //       console.error(error);
  //     }
  //   })
  // }, [])

  const getUserRole = async () => {
    try {
      const userRole = await AsyncStorage.getItem('userRoles');
      setUserRole(userRole);
      console.log(userRole);
      if(userRole == "ROLE_SON" || userRole == "ROLE_DAUGHTER") {
        navigation.navigate("ChildrenHome");
      }
      if(userRole == "ROLE_MOM") {
        navigation.navigate("MomHome");
      }
    } catch (e) {
      console.log(e);
    }
  }

  // promise 기반 get
  const getToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        console.log('token: ' + accessToken);
        setToken(accessToken);
      } else {
        console.log('not found');
        navigation.navigate("Splash");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getDayRecord = async () => {
    if(!token) return;
    console.log(token);
    try {
      console.log('Sending request with token:', token);
      const response = await axios.get(
        `https://15.164.134.131/api/condition/byDate/${year}/${month}/${day}/${userRole}`,
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
      setInvited(response.data.data.isInvited);
      setLink(response.data.data.link);
      // setUserRole(response.data.data.userRole);
    } catch(e) {
      console.error(e);
    }
  };

  const getFlowerRecord = async () => {
    if(!token) return;
    try {
      const response = await axios.get("https://15.164.134.131/api/nft/${userRole}", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(response.data);
      setFlowerPieces(response.data.data.pieceOfNft);
      setTotalNft(response.data.data.totalNftCount);
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    console.log("토큰 받아오기");
    getToken();
    getUserRole();
    console.log(userRole);
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

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (
        flowerPieces === 6 &&
        now.getHours() === 0 &&
        now.getMinutes() === 0 &&
        now.getSeconds() === 0
      ) {
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
  }, [flowerPieces]);

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

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

  // 초대 링크 보내기
  const sendLinkHandler = () => {
    const encodedLink = encodeURIComponent(link);
    const url = Linking.createURL(`splash/${encodedLink}`);
    const shareHandler = () => {
      Share.share({
        // title: "오늘의맘 초대장이 왔어요!",
        message: `엄마의 초대를 받아보세요! \n\n앱 링크: ${url} \n\n초대코드: ${link}`,
      })
    }
    // Linking.openURL(url).catch(err => {
    //   console.error('Error:', err);
    // });

    shareHandler();
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
        <HeaderNav relation="엄마" name={name} />
      </SafeAreaView>
      <View style={styles.bodyContainer}>
        <WeekCalendar
          relation="엄마"
          selectDay={selectDay}
          selectMonth={selectMonth}
          selectYear={selectYear}
        />
        <Text style={styles.momHomeTitleText}>오늘의 상태를 알려주세요!</Text>
        <ToRecordContainer invited={invited} recorded={recorded} selectConditionHandler={selectConditionHandler} date={date} name={name} year={year} month={month} day={day} sendLinkHandler={sendLinkHandler} userRole={userRole}/>
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

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    paddingHorizontal: 20,
    // alignItems: "center",
    // flex: 1
  },
  momHomeTitleText: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '400',
    marginTop: 24,
  },
  flowerGridContainer: {
    width: "100%",
    marginTop: deviceHeight < 900 ? 40: 80,
    justifyContent: "center",
    alignItems: "center"
  }
});