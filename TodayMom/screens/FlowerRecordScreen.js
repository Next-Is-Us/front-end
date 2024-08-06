import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FlowerBadge from "../assets/images/flower6.svg";
import FlowerGrid from "../assets/images/flowerGrid.svg";
import BottomNav from "../components/BottomNav";
import ConditionRecordedItem from "../components/ConditionRecordItem";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function FlowerRecordScreen({navigation, route}) {
  const [recordedContent, setRecordedContent] = useState([]); // 추후 백과 통신 예정
  // const [token, setToken] = useState("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiYXV0aCI6WyJST0xFX01PTSJdLCJpYXQiOjE3MjI4NzM5MzUsImV4cCI6MTcyNTQ2NTkzNX0.cP65jJ8FoUtLjYe2J-G4boNhWT1riWOKqtl_BuMAl6U"); // 엄마 더미데이터임
  // const [token, setToken] = useState('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4IiwiYXV0aCI6WyJST0xFX1NPTiJdLCJpYXQiOjE3MjI4NzUxOTUsImV4cCI6MTcyNTQ2NzE5NX0.917lOkbQYf3PFrE7uCH-FPZDzWXnQox3i3E0IN1tgvU'); // 자식 더미데이터임 
  // const [userRole, setUserRole] = useState("");
  const userRole = route.params.userRole;
  const [token, setToken] = useState("");

  const getToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if(accessToken) {
        setToken(accessToken);
      } else {
        console.log("Not Found");
      }
    } catch(e) {
      console.error(e);
    }
  }

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

  const getNFTRecord = async () => {
    try {
      const response = await axios.get(`https://15.164.134.131/api/healthRecord?userRole=${userRole}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(response.data);
      setRecordedContent(response.data.data);
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    console.log("get Token");
    console.log(userRole);
    getToken();
    // getUserRole();
    if(token) {
      getNFTRecord();
    }
  }, [token])

  // useFocusEffect(
  //   useCallback(() => {
  //     if(token) {
  //       getNFTRecord();
  //     }
  //   },[token])
  // )

  const selectHospitalScreenHandler = () => {
    navigation.navigate("SelectForVisitHospital", {userRole: userRole});
  }

  const recordNFTHandler = (item) => {
    item.isComplete && navigation.navigate("NFTCard", {info: item});
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => recordNFTHandler(item)}>
        <ConditionRecordedItem recordItem={item} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Text style={styles.titleText}>우리의 꽃을 피워보아요</Text>
        <Text style={styles.subText}>계속해서 추가될 예정이에요!</Text>
      </SafeAreaView>
      <View style={styles.changeButtonContainer}>
        <TouchableOpacity style={styles.changeButton} onPress={selectHospitalScreenHandler}>
          <Text style={styles.changeButtonText}>의료 기록 변환하기</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.listContainer}
        contentContainerStyle={styles.listItem}
        data={recordedContent}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
      />
      <BottomNav flower userRole={userRole} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white"
  },
  titleText: {
    color: "black",
    fontFamily: "Pretendard",
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 34,
    letterSpacing: -0.6,
    marginTop: 32
  }, 
  subText: {
    color: "#767676",
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: -0.35,
    marginTop: 4
  },
  changeButtonContainer: {
    marginTop: 32,
    alignItems: "center"
  },
  changeButton: {
    backgroundColor: "#8E48F3",
    padding: 18,
    borderRadius: 100
  },
  changeButtonText: {
    color: "white",
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
    letterSpacing: -0.375,
    width: 164,
    textAlign: "center"
  },
  listContainer: {
    flex: 1,
    marginTop: 32,
  },
  listItem: {
    // flex: 1,
    gap: 24,
    paddingBottom: 100
  },
})