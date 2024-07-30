import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { useEffect, useState } from "react";

const conditionsArray = (array, size) => {
  const conditionArray = [];
  for(let i=0;i<array.length;i+=size) {
    conditionArray.push(array.slice(i, i+size));
  }
  return conditionArray;
}

export default function ConditionItem({selectedCondition, setConditionSelected, conditions, conditionStates, setConditionStates}) {
  // const [selectedConditions, setSelectedConditions] = useState([]);

  const selectConditionHandler = (condition) => {
    // setSelectedConditions((prevCondition) => {
    //   return prevCondition.includes(condition) ? prevCondition.filter((c) => c!==condition) : [...prevCondition, condition]
    // });

    setConditionStates((prevStates) => {
      const newState = !prevStates[condition.state];
      return { ...prevStates, [condition.state]: newState };
    });
  };

  const cArray = conditionsArray(conditions, 3);

  useEffect(() => {
    const selectedConditions = Object.values(conditionStates).filter((state) => state);
    setConditionSelected(selectedConditions.length>0);
    
  }, [conditionStates]);

  // 이 부분 통신하면서 수정 예정 (선택된 컨디션 불러오는 함수)
  // useEffect(() => {
  //   setSelectedConditions(cArray.filter((c) => c === selectedCondition.condition));
  // }, [])

  return (
    <View style={styles.selectConditionContainer}>
        {cArray.map((conditionArray, index) => {
          return (
            <View key={index} style={styles.selectConditionArrayContainer}>
              {conditionArray.map((condition) => {
                return (
                  <TouchableOpacity key={condition.state} style={[styles.conditionContainer, conditionStates[condition.state] && styles.selectedButton]} onPress={() => selectConditionHandler(condition)}>
                    <Text style={[styles.conditionText, conditionStates[condition.state] && styles.selectedText]}>{condition.symptom}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          )
        })}
      </View>
  )
}

const styles = StyleSheet.create({
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
})