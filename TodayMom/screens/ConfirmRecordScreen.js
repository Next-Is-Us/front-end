import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import HeaderBack from "../components/HeaderBack";
import ConditionItem from "../components/ConditionItem";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SleepingFaceIcon from "../assets/images/sleepingFace.svg";
import BottomButton from "../components/BottomButton";

const conditions = [
  { symptom: "안면 홍조", state: "isBlushing" },
  { symptom: "두통", state: "isHeadache" },
  { symptom: "복통", state: "isStomachache" },
  { symptom: "변비", state: "isConstipated" },
  { symptom: "근육통", state: "isMusclePainful" },
  { symptom: "피부 트러블", state: "isSkinTroubled" },
  { symptom: "손발 저림", state: "isNumbness" },
  { symptom: "오한", state: "isChilled" },
  { symptom: "우울", state: "isDepressed" },
];

export default function ConfirmRecordScreen({navigation, route }) {
  const name = route.params.userName;
  const userRole = route.params.userRole;
  const date = route.params.selectedDate;
  const [token, setToken] = useState("");
  const [year, month, day] = date;
  const [conditionStates, setConditionStates] = useState(
    conditions.reduce((acc, condition) => {
      acc[condition.state] = false;
      return acc;
    }, {})
  );
  const [sleepTime, setSleepTime] = useState("");
  const [recordedText, setRecordedText] = useState("");

  const getToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (accessToken) {
        console.log("token: " + accessToken);
        setToken(accessToken);
      } else {
        console.log("not found");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken();
    console.log(conditionStates);
  }, []);

  const getStateRecords = async () => {
    try {
      const response = await axios.get(
        `https://15.164.134.131/api/condition/detail/${year}/${month}/${day}/${userRole}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      const recordeStates = conditions.reduce((acc, condition) => {
        acc[condition.state] = response.data.data[condition.state];
        return acc;
      }, {});
      setConditionStates(recordeStates);
      setSleepTime(response.data.data.sleepTime);
      setRecordedText(response.data.data.record);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (token) {
      getStateRecords();
    }
  }, [token]);

  const homeHandler = () => {
    navigation.navigate("MomHome");
  }

  return (
    <>
      <SafeAreaView style={styles.screen}>
        <ScrollView style={styles.screen}>
          {/* <HeaderBack /> */}
          <View style={{paddingHorizontal: 20}}>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.nameText}>
                <Text style={styles.name}>{name}</Text>님의
              </Text>
              <Text style={styles.nameText}>오늘의 상태에요</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>몸 상태</Text>
              <ConditionItem
                conditions={conditions}
                conditionStates={conditionStates}
                confirm
              />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>수면 시간</Text>
              <View style={styles.sleepContainer}>
                <SleepingFaceIcon />
                <Text style={styles.sleepText}>{sleepTime} 숙면</Text>
              </View>
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoText}>추가 기록</Text>
              <View style={styles.recordedTextContainer}>
                <Text style={styles.recordedText}>{recordedText}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.safeView}>
          <TouchableOpacity style={styles.button} onPress={homeHandler}>
            <Text style={styles.buttonText}>확인 완료</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  nameText: {
    color: "black",
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 28,
    letterSpacing: -0.5,
  },
  name: {
    fontWeight: "600",
  },
  infoTextContainer: {
    marginTop: 32,
  },
  infoText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Pretendard",
  },
  sleepContainer: {
    marginTop: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: "#A30FFA",
    gap: 10,
    alignSelf: "flex-start",
  },
  sleepText: {
    color: "white",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: -0.35,
  },
  recordedTextContainer: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#E5E5EC",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    height: 262,
  },
  recordedText: {
    color: "black",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: -0.35,
    lineHeight: 20,
  },
  safeView: {
    marginTop: 58,
    backgroundColor: "white",
    height: 76,
    width: "100%",
    paddingTop: 12,
    paddingBottom: 46,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  button: {
    backgroundColor: "#A30FFA",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    height: 52
  }, 
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.4,
  }
});
