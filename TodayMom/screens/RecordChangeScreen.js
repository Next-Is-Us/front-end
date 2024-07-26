import { StyleSheet, View, Text, Animated, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native"
import HeaderBack from "../components/HeaderBack"
import Loading from "../assets/images/loading.svg"
import { useEffect, useRef, useState } from "react"
import BottomButton from "../components/BottomButton";
import PDFLogo from "../assets/images/pdfImg.svg";
import InactiveExportIcon from "../assets/images/export_inactive.svg";
import ActiveExportIcon from "../assets/images/export_active.svg";

export default function RecordChangeScreen({navigation}) {
  const [complete, setComplete] = useState(true);
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const [userMail, setUserMail] = useState("");
  const [validType, setValidType] = useState(false);
  const emailRegEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const userInputHandler = (enteredText) => {
    setUserMail(enteredText);
    if(emailRegEx.test(enteredText)) {
      setValidType(true);
    } else {
      setValidType(false);
    }
  }

  let detailText;
  if (!validType && userMail.length > 0) {
    detailText = <Text style={styles.errorText}>올바르지 않은 이메일입니다.</Text>;
  } else {
    detailText = <Text style={styles.userInputDetailText}>꽃피 의료기록을 보낼 이메일을 입력해주세요!</Text>;
  }

  const homeHandler = () => {
    complete && navigation.navigate("MomHome");
  }

  useEffect(() => {
    !complete && Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 2500,
        delay: 100,
        useNativeDriver: true,
      })
    ).start();
  }, [complete])

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
      complete ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <HeaderBack />
            <KeyboardAvoidingView behavior="position" style={styles.testContainer}>
            <Text style={[styles.changingText, styles.completeText]}>꽃피 의료 기록 변환 완료</Text>
            <View style={styles.loadingContainer}>
              <PDFLogo />
            </View>
            <View style={styles.userInputTextContainer}>
              <View style={styles.userInputContainer}>
              {userMail.length>0 ? <ActiveExportIcon /> : <InactiveExportIcon />}
               <TextInput 
                style={styles.userInput} 
                placeholder="today_mom@naver.com" 
                autoCapitalize="none" 
                onChangeText={userInputHandler}
                keyboardType="email-address"
                value={userMail}
              />
              </View>
               {detailText} 
            </View>
            <TouchableOpacity style={[styles.buttonContainer, validType && {backgroundColor: "#E25959"}]}>
              <Text style={styles.buttonText}>PDF로 보내기</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
            {/* </KeyboardAvoidingView> */}
            <BottomButton text="완료" selected handler={homeHandler}/>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={styles.screen}>
          <HeaderBack />
          <Text style={styles.changingText}>꽃피 의료 기록 변환 중</Text>
          <Text style={styles.waitingText}>잠시만 기다려 주세요!</Text>
          <View style={styles.loadingContainer}>
            <Animated.View style={{ transform: [{ rotate }] }} >
              <Loading />
            </Animated.View>
          </View>
          <BottomButton text="완료" />
        </View>
      )
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
  }, 
  changingText: {
    color: "black",
    fontFamily: "Prentendard",
    fontSize: 28,
    fontWeight:"600",
    lineHeight: 38,
    letterSpacing: -0.7,
    textAlign: "center",
    marginTop: 100
  },
  completeText: {
    marginTop: 40
  },
  waitingText: {
    color: "#767676",
    fontFamily: "Prentendard",
    fontSize: 16,
    fontWeight:"400",
    lineHeight: 24,
    letterSpacing: -0.4,
    textAlign: "center",
    marginTop: 12
  },
  loadingContainer: {
    alignItems: "center",
    marginTop: 19,
    // backgroundColor: "pink",
    marginLeft: 100,
    marginRight: 60,
    justifyContent: "center",
    width: 200,
    height: 200, 
  },
  userInputTextContainer: {
    marginTop: 10,
    gap: 8,
    paddingHorizontal: 18
  },
  userInputContainer: {
    flexDirection: "row",
    paddingVertical: 9,
    borderBottomColor: "#E5E5EC",
    borderBottomWidth: 1,
    gap: 4,
  },
  userInput: {
    color: "black",
  },
  userInputDetailText: {
    color: "#505050",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: -0.3
  },
  testContainer: {
  },
  buttonContainer: {
    marginTop: 28,
    borderRadius: 100,
    padding: 18,
    backgroundColor: "rgba(226, 89, 89, 0.20)",
    alignSelf: "center"
  },
  buttonText: {
    width: 122,
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
    letterSpacing: -0.375,
    textAlign: "center"
  }, 
  errorText: {
    color: "#DC0000",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: -0.3
  }
})