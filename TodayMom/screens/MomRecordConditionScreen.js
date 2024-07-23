import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import HeaderBack from "../components/HeaderBack";
import InformConditionText from "../components/InformConditionText";
import SelectSleepTime from "../components/SelectSleepTime";
import BottomButton from "../components/BottomButton";
import ConditionItem from "../components/ConditionItem";

export default function MomRecordConditionScreen() {
  const [name, setName] = useState("갱년기");
  const [conditionSelected, setConditionSelected] = useState(false); // 컨디션이 체크됐는지 확인하는 상태
  const [sleepTimeSelected, setSleepTimeSelected] = useState(false); // 수면 시간이 체크됐는지 확인하는 상태
  const [totalSelected, setTotalSelected] = useState(false); // 전체 항목이 체크됐는지 확인하는 상태

  useEffect(() => {
    if(conditionSelected && sleepTimeSelected) {
      setTotalSelected(true);
    } else {
      setTotalSelected(false);
    }
  }, [conditionSelected, sleepTimeSelected])

  return (
    <View style={styles.screen}>
      <HeaderBack />
      <InformConditionText name={name} />
      <View style={styles.mutiTextContainer}>
        <Text style={styles.infoText}>몸 상태</Text>
        <Text >(다중 선택 가능)</Text>
      </View>
      <ConditionItem setConditionSelected={setConditionSelected} />
      <View style={styles.sleepTextContainer}>
        <Text style={styles.infoText}>수면 시간</Text>
      </View>
      <SelectSleepTime setSleepTimeSelected={setSleepTimeSelected} />
      <BottomButton text="다음" selected={totalSelected} />
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