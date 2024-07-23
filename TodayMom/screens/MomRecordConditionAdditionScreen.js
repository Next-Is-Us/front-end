import { View, StyleSheet, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import HeaderBack from "../components/HeaderBack"
import InformConditionText from "../components/InformConditionText";
import { useEffect, useState } from "react";
import BottomButton from "../components/BottomButton";

export default function MomRecordConditionAdditionScreen({route}) {
  const name = route.params.userName;
  const [isFocused, setIsFocused] = useState(false);
  const [userInput, setUserInput] = useState("");
  const maxLength = 300;

  const userInputHandler = (enteredText) => {
    if (enteredText.length <= maxLength) {
      setUserInput(enteredText);
    }
  }

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
      <BottomButton text="기록 완료하기" selected={true} />
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