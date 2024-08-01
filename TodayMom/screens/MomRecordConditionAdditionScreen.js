import { View, StyleSheet, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import HeaderBack from "../components/HeaderBack"
import InformConditionText from "../components/InformConditionText";
import { useEffect, useState } from "react";
import BottomButton from "../components/BottomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MomRecordConditionAdditionScreen({route, navigation}) {
  const name = route.params.userName;
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImF1dGgiOlsiUk9MRV9NT00iXSwiaWF0IjoxNzIyNDE0MTQzLCJleHAiOjE3MjUwMDYxNDN9.5zi_P7WsX7GYY5o6pXqxvbV5V_j8F80e-1vtl1Ny3eE'); // 더미데이터임 
  const sleepTime = route.params.sleepTime;
  const conditionStates = route.params.conditionStates;
  const [isFocused, setIsFocused] = useState(false);
  const [userInput, setUserInput] = useState("");
  const maxLength = 300;

  const getToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if(accessToken) {
        console.log(accessToken);
        setToken(accessToken);
      }
    } catch(e) {
      console.log(e);
    }
  }

  // useEffect(() => {
  //   getToken();
  // }, []);

  const completeHandler = async () => {
    console.log(token);
    console.log(conditionStates, sleepTime, userInput);
    console.log(typeof conditionStates);
    console.log(typeof sleepTime);
    console.log(typeof userInput);
    try {
      const response = await axios.post("https://15.164.134.131/api/condition",
        {
          sleepTime: sleepTime.toString(),
          ...conditionStates,
          record: userInput
        },
        {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("기록 완료", response.data);
      navigation.navigate("MomHome");
    } catch(e) {
      console.error(e);
    }
  };

  const userInputHandler = (enteredText) => {
    if (enteredText.length <= maxLength) {
      setUserInput(enteredText);
    }
  }

  // const homeHandler = () => {
  //   navigation.navigate("MomHome");
  // }

  const userInputBackground = isFocused ? {backgroundColor: "white", borderColor: "#A30FFA"} : {backgroundColor: "#F7F7FB", borderColor: "#E5E5EC"};
  const userTextBackground = userInput && {backgroundColor : "white"};

  return (
    <>
      <ScrollView style={styles.rootScreen}>
        {/* <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
        <KeyboardAvoidingView style={styles.screen} behavior='position'>
          <View style={styles.screen}>
            <HeaderBack />
            <InformConditionText name={name} />
            <View style={styles.mutiTextContainer}>
              <Text style={styles.infoText}>추가 기록하기</Text>
              <Text >(선택)</Text>
            </View>
            <View style={[styles.userInputContainer, userInputBackground, userTextBackground]}>
              <TextInput 
                style={styles.userInput}
                multiline={true}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="하고 싶은 말을 자유롭게 적어주세요!"
                autoCorrect={true}
                autoCapitalize="none"
                onChangeText={userInputHandler}
                maxLength={300}
              />
              <Text style={styles.userInputText}>{userInput.length}/{maxLength}</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <BottomButton text="기록 완료하기" selected={true} handler={completeHandler} />
    </>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white"
  },
  screen: {
    flex: 1
  },
  mutiTextContainer: {
    marginTop: 24,
    flexDirection: "row",
    gap: 4,
    alignItems: "center"
  },
  infoText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Pretendard"
  },
  multiSelectText: {
    color: "#767676",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Pretendard"
  },
  userInputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    // borderColor: "var(--Line-Regular_Color, #E5E5EC)",
    borderStyle: "solid",
    width: "100%",
    padding: 16,
    marginTop: 12
  },
  userInput: {
    height: 288,
  },
  userInputText: {
    color: "#767676",
    fontFamily: "Prentendard",
    fontSize: 13,
    fontWeight: 400,
    textAlign: "right"
  }
})