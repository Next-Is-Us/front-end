import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import HeaderBack from "../components/HeaderBack";
import InformConditionText from "../components/InformConditionText";
import SelectSleepTime from "../components/SelectSleepTime";
import BottomButton from "../components/BottomButton";
import ConditionItem from "../components/ConditionItem";

const conditions = [
  { symptom: "안면 홍조", state: "isBlushing" },
  { symptom: "두통", state: "isHeadache" },
  { symptom: "복통", state: "isStomachache" },
  { symptom: "변비", state: "isConstipated" },
  { symptom: "근육통", state: "isMusclePainful" },
  { symptom: "피부 트러블", state: "isSkinTroubled" },
  { symptom: "손발 저림", state: "isNumbness" },
  { symptom: "오한", state: "isChilled" },
  { symptom: "우울", state: "isDepressed" }
];

export default function MomRecordConditionScreen({route, navigation}) {
  const name = route.params.userName;
  const [conditionSelected, setConditionSelected] = useState(false); // 컨디션이 체크됐는지 확인하는 상태
  const [sleepTimeSelected, setSleepTimeSelected] = useState(false); // 수면 시간이 체크됐는지 확인하는 상태
  const [totalSelected, setTotalSelected] = useState(false); // 전체 항목이 체크됐는지 확인하는 상태
  const [sleepTime, setSleepTime] = useState("");
  const [conditionStates, setConditionStates] = useState(
    conditions.reduce((acc, condition) => {
      acc[condition.state] = false;
      return acc;
    }, {})
  );

  useEffect(() => {
    if(conditionSelected && sleepTimeSelected) {
      setTotalSelected(true);
    } else {
      setTotalSelected(false);
    }
  }, [conditionSelected, sleepTimeSelected])

  const writeConditionScreenHandler = () => {
    console.log(conditionStates, sleepTime);
    totalSelected && navigation.navigate("WriteCondition", 
      {
        userName: name,
        conditionStates: conditionStates,
        sleepTime: sleepTime
      });
  }

  return (
    <View style={styles.screen}>
      <HeaderBack />
      <InformConditionText name={name} />
      <View style={styles.mutiTextContainer}>
        <Text style={styles.infoText}>몸 상태</Text>
        <Text >(다중 선택 가능)</Text>
      </View>
      <ConditionItem setConditionSelected={setConditionSelected} conditions={conditions} conditionStates={conditionStates} setConditionStates={setConditionStates} />
      <View style={styles.sleepTextContainer}>
        <Text style={styles.infoText}>수면 시간</Text>
      </View>
      <SelectSleepTime setSleepTimeSelected={setSleepTimeSelected} setSleepTime={setSleepTime} sleepTime={sleepTime} />
      <BottomButton text="다음" selected={totalSelected} handler={writeConditionScreenHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white"
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
  sleepTextContainer: {
    marginTop: 24
  }
})