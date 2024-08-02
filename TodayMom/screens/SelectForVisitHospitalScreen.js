import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import HeaderBack from "../components/HeaderBack"
import { useState } from "react"
import BottomButton from "../components/BottomButton";

export default function SelectForVisitHospitalScreen({navigation, route}) {
  const [selected, setSelcted] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const userRole = route.params.userRole;

  const selectHandler = (buttonId) => {
    setSelcted(buttonId);
    setIsSelected(true);
  }

  const nextHandler = () => {
    isSelected && navigation.navigate("SelectForChangeRecord", {userRole: userRole})
  }

  const findHospitalHandler = () => {
    navigation.navigate("FindHospital");
  }

  return (
    <View style={styles.screen}>
      <HeaderBack />
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText}>오늘의 맘과 제휴 중인 병원에</Text>
        <Text style={styles.titleText}>방문할 예정이신가요?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, selected == "yes" && styles.selectedButton]} onPress={() => selectHandler("yes")}>
          <Text style={[styles.buttonText, selected == "yes" && styles.selectedButtonText]} onPress={() => selectHandler("yes")}>예</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, selected == "no" && styles.selectedButton]} onPress={() => selectHandler("no")}>
          <Text style={[styles.buttonText, selected == "no" && styles.selectedButtonText]} onPress={() => selectHandler("no")}>아니요</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.informTextButton}>
        <TouchableOpacity style={styles.informTextContainer} onPress={findHospitalHandler}>
          <Text style={styles.informText}>
            내가 방문하는 병원이 제휴 병원인지 모르겠어요
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <BottomButton text="다음" selected={isSelected} handler={nextHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white"
  },
  titleTextContainer: {
    marginTop: 24
  },
  titleText: {
    color: "black",
    fontFamily: "Pretendard",
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 34,
    letterSpacing: -0.6
  },
  buttonContainer: {
    marginTop: 48,
    gap: 8
  },
  button: {
    backgroundColor: "#F1F1F5",
    paddingHorizontal: 28,
    paddingVertical: 23,
    borderRadius: 12
  },
  selectedButton: {
    backgroundColor: "rgba(163, 15, 250, 0.15)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(163, 15, 250, 0.50)"
  },
  buttonText: {
    color: "black",
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: -0.4
  },
  selectedButtonText: {
    color: "#A30FFA",
  },
  informTextButton: {
    marginTop: 24,
    alignItems: "center"
  },
  informTextContainer: {
    borderBottomColor: "#999",
    borderBottomWidth: 1,
  },
  informText: {
    color: "#999",
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: -0.35,
    textAlign: "center",
    borderBottomColor: "#999",
    borderBottomWidth: 1,
    paddingBottom: 4,
  }
})