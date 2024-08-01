import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FlowerBadge from "../assets/images/flower6.svg";
import FlowerGrid from "../assets/images/flowerGrid.svg";
import BottomNav from "../components/BottomNav";
import ConditionRecordedItem from "../components/ConditionRecordItem";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// const recordItem = [
//   {recordedNumber: 860, complete: true, startedDate: "2024.7.9", endedDate: "2024.9.29", recordCount: 6},
//   {recordedNumber: 859, complete: false, completedCount: 4, recordCount: 4},
//   {recordedNumber: 858, complete: true, startedDate: "2024.5.1", endedDate: "2024.7.6", recordCount: 6},
// ]

export default function FlowerRecordScreen({navigation}) {
  const [recordedContent, setRecordedContent] = useState([]); // 추후 백과 통신 예정
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImF1dGgiOlsiUk9MRV9NT00iXSwiaWF0IjoxNzIyNDE0MTQzLCJleHAiOjE3MjUwMDYxNDN9.5zi_P7WsX7GYY5o6pXqxvbV5V_j8F80e-1vtl1Ny3eE"); // 더미데이터임

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

  const getNFTRecord = async () => {
    try {
      const response = await axios.get("https://15.164.134.131/api/healthRecord", {
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
    // getToken();
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
    navigation.navigate("SelectForVisitHospital");
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
        keyExtractor={(item, index) => item.healthRecordId}
        renderItem={renderItem}
      />
      <BottomNav flower />
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