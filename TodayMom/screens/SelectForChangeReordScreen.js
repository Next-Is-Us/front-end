import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import HeaderBack from "../components/HeaderBack";
import { useState } from "react";
import ConditionRecordedItem from "../components/ConditionRecordItem";
import BottomButton from "../components/BottomButton";

const recordItem = [
  {recordedNumber: 860, complete: true, startedDate: "2024.7.9", endedDate: "2024.9.29", recordCount: 6},
  {recordedNumber: 858, complete: true, startedDate: "2024.5.1", endedDate: "2024.7.6", recordCount: 6},
  {recordedNumber: 857, complete: true, startedDate: "2024.5.1", endedDate: "2024.7.6", recordCount: 6},
  {recordedNumber: 856, complete: true, startedDate: "2024.5.1", endedDate: "2024.7.6", recordCount: 6},
]

export default function SelectForChangeRecordScreen({navigation}) {
  const [completedRecord, setCompletedRecord] = useState(recordItem);
  const [selectedRecord, setSelctedRecord] = useState([]);

  const selectRecordHandler = (record) => {
    setSelctedRecord((prevRecord) => {
      return prevRecord.includes(record) ? prevRecord.filter((r) => r!==record) : [...prevRecord, record];
    })
  }

  // 추후 경로 변경 예정
  const changeHandler = () => {
    selectedRecord.length>0 && navigation.navigate("RecordChange");
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => selectRecordHandler(item.recordedNumber)}>
        <ConditionRecordedItem recordItem={item} selected={selectedRecord.includes(item.recordedNumber)} />
      </TouchableOpacity>
    )
  }

  return (
    <>
      <View style={styles.screen}>
        <HeaderBack />
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleMainText}>꽃피 의료기록으로 변환하기</Text>
          <Text style={styles.titleSubText}>변환할 꽃피를 선택해주세요</Text>
        </View>
        <FlatList 
          style={styles.listContainer}
          contentContainerStyle={styles.listItem}
          data={completedRecord}
          keyExtractor={(item) => item.recordedNumber.toString()}
          renderItem={renderItem}
        />
      </View>
      <SafeAreaView style={styles.safe}>
        <View style={styles.safeView}>
          <BottomButton text="다음" handler={changeHandler} selected={selectedRecord.length > 0} />
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20
  },
  titleTextContainer: {
    marginTop: 24
  },
  titleMainText: {
    color: "black",
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
    letterSpacing: -0.5
  },
  titleSubText: {
    color: "#767676",
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: -0.35
  },
  listContainer: {
    flex: 1,
    marginTop: 32
  },
  listItem: {
    gap: 24
  },
  safe: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
    backgroundColor: "white",
  },
  safeView: {
    backgroundColor: "white",
    height: 76
  }
})