import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import HeaderBack from "../components/HeaderBack";
import InformConditionText from "../components/InformConditionText";
import SelectSleepTime from "../components/SelectSleepTime";

const conditions = [
  "안면 홍조", "두통", "복통",
  "변비", "근육통", "피부 트러블",
  "손발 저림", "오한", "우울"
];

const conditionsArray = (array, size) => {
  const conditionArray = [];
  for(let i=0;i<array.length;i+=size) {
    conditionArray.push(array.slice(i, i+size));
  }
  return conditionArray;
}

export default function MomRecordConditionScreen() {
  const [name, setName] = useState("갱년기");
  const [selectedConditions, setSelectedConditions] = useState([]);

  const selectConditionHandler = (condition) => {
    setSelectedConditions((prevCondition) => {
      return prevCondition.includes(condition) ? prevCondition.filter((c) => c!==condition) : [...prevCondition, condition]
    });
  };

  const cArray = conditionsArray(conditions, 3);

  return (
    <View style={styles.screen}>
      <HeaderBack />
      <InformConditionText name={name} />
      <View style={styles.mutiTextContainer}>
        <Text style={styles.infoText}>몸 상태</Text>
        <Text >(다중 선택 가능)</Text>
      </View>
      <View style={styles.selectConditionContainer}>
        {cArray.map((conditionArray, index) => {
          return (
            <View key={index} style={styles.selectConditionArrayContainer}>
              {conditionArray.map((condition) => {
                return (
                  <TouchableOpacity key={condition} style={[styles.conditionContainer, selectedConditions.includes(condition) && styles.selectedButton]} onPress={() => selectConditionHandler(condition)}>
                    <Text style={[styles.conditionText, selectedConditions.includes(condition) && styles.selectedText]}>{condition}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          )
        })}
      </View>
      <View style={styles.sleepTextContainer}>
        <Text style={styles.infoText}>수면 시간</Text>
      </View>
      <SelectSleepTime />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20
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
  selectConditionContainer: {
    marginTop: 12,
    gap: 12
  },
  selectConditionArrayContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center"
  },
  conditionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 24,
    borderColor: "#CACAD7",
    borderStyle: "solid",
    borderWidth: 1,
  },
  conditionText: {
    color: "#999",
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "400"
  }, 
  selectedButton: {
    backgroundColor: "#A30FFA",
    borderColor: "#A30FFA",
  },
  selectedText: {
    color: "white"
  },
  sleepTextContainer: {
    marginTop: 24
  }
})