import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import HeaderBack from "../components/HeaderBack";
import { useState, useEffect } from "react";
import ConditionRecordedItem from "../components/ConditionRecordItem";
import BottomButton from "../components/BottomButton";
import axios from "axios";

// const recordItem = [
//   {recordedNumber: 860, complete: true, startedDate: "2024.7.9", endedDate: "2024.9.29", recordCount: 6},
//   {recordedNumber: 858, complete: true, startedDate: "2024.5.1", endedDate: "2024.7.6", recordCount: 6},
//   {recordedNumber: 857, complete: true, startedDate: "2024.5.1", endedDate: "2024.7.6", recordCount: 6},
//   {recordedNumber: 856, complete: true, startedDate: "2024.5.1", endedDate: "2024.7.6", recordCount: 6},
// ]

export default function SelectForChangeRecordScreen({navigation}) {
  const [completedRecord, setCompletedRecord] = useState();
  const [selectedRecord, setSelctedRecord] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImF1dGgiOlsiUk9MRV9NT00iXSwiaWF0IjoxNzIyNDE0MTQzLCJleHAiOjE3MjUwMDYxNDN9.5zi_P7WsX7GYY5o6pXqxvbV5V_j8F80e-1vtl1Ny3eE"); // 더미데이터임

  const getToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if(accessToken) {
        setToken(accessToken);
      } else {
        console.log("Not Found");
      }
    } catch(e) {
      console.error(e);
    }
  }

  const getNFTRecord = async () => {
    try {
      const response = await axios.get("https://15.164.134.131/api/healthRecord", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(response.data);
      setCompletedRecord(response.data.data);
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    console.log("get Token");
    // getToken();
    if(token) {
      getNFTRecord();
    }
  }, [token])

  // useFocusEffect(
  //   useCallback(() => {
  //     if(token) {
  //       getNFTRecord();
  //     }
  //   },[token])
  // )

  const getPDFData = async () => {
    let allData = [];
    for (recordId of selectedRecord) {
      let currentPage = 0;
      const pageSize = 10;
      try {
        while(true) {
          const response = await axios.get(`https://15.164.134.131/api/healthRecord/pdf/${recordId}?page=${currentPage}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            }
          })
          console.log(response.data.data);
          const data = response.data.data;
          allData = [...allData, ...data.data];
          if (data.isLast) {
            break;
          }
          currentPage++;
        }
        setPdfData(allData);
      } catch(e) {
        console.error(e);
      } 
    }
  }

  const selectRecordHandler = (record) => {
    setSelctedRecord((prevRecord) => {
      return prevRecord.includes(record) ? prevRecord.filter((r) => r!==record) : [...prevRecord, record];
    })
  }

  // 추후 경로 변경 예정
  const changeHandler = () => {
    // selectedRecord.length>0 && navigation.navigate("RecordChange");
    getPDFData();
  }

  const renderItem = ({item}) => {
    return (
      item.isComplete && (
        <TouchableOpacity onPress={() => selectRecordHandler(item.healthRecordId)}>
          <ConditionRecordedItem recordItem={item} selected={selectedRecord.includes(item.healthRecordId)} />
        </TouchableOpacity>
      )
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
          keyExtractor={(item) => item.healthRecordId}
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
    gap: 24,
    paddingBottom:100
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