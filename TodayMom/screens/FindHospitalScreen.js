import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, FlatList } from "react-native";
import HeaderBack from "../components/HeaderBack";
import { useCallback, useEffect, useState } from "react";
import SearchIcon from "../assets/images/searchImg.svg";
import HeartSeedIcon from "../assets/images/seed.svg";
import HospitalInfoItem from "../components/HospitalInfoItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { debounce } from "lodash";

// const dummyInfo = [
//   {name: "종로지은병원", location: "지은특별시 지은구 지은동", number: "010-2825-7723"},
//   {name: "한성지은병원", location: "지은특별시 지은구 지은동", number: "010-2825-7723"},
//   {name: "경희지은병원", location: "지은특별시 지은구 지은동", number: "010-2825-7723"},
// ];

export default function FindHospitalScreen() {
  const [searchHospitalInput, setSearchHospitalInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [founded, setFounded] = useState(false);
  const [hospitalInfo, setHospitalInfo] = useState([]);
  const [token, setToken] = useState("");

  const getToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      setToken(accessToken);
    } catch(e) {
      console.error(e);
    }
  }

  const getHospital = async (keyword) => {
    if (!token || !keyword) return;
    try {
      const response = await axios.get(`https://15.164.134.131/api/hospital/search?keyword=${keyword}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response.data);
      setFounded(true);
      setHospitalInfo(response.data.data);
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  const debouncedGetHospital = useCallback(debounce(getHospital, 300), [token]);
  
  const userInputHandler = (enteredText) => {
    setSearchHospitalInput(enteredText);
    if (enteredText === "") {
      setFounded(false);
      setHospitalInfo([]);
    } else {
      debouncedGetHospital(enteredText);
    }
  }

  const renderItem = ({item}) => {
    return (
      <HospitalInfoItem info={item} />
    )
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.screen}>
      <HeaderBack />
      <Text style={styles.findText}>오늘의 맘 제휴 병원 찾기</Text>
      <View style={[styles.searchInputContainer, isFocused && {borderColor: "#A30FFA"}]}>
        <SearchIcon />
        <TextInput 
          style={styles.userInput}
          placeholder="병원 이름을 입력해주세요" 
          autoCapitalize="none" 
          onChangeText={userInputHandler} 
          value={searchHospitalInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {founded ? (
        hospitalInfo.length > 0 ? (
          <FlatList
          style={styles.listContainer}
          contentContainerStyle={styles.listInnerStyle}
          data={hospitalInfo}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.hospitalName}_${index}`}
        />
        ) : (
          <View style={styles.searchTextContainer}>
            <HeartSeedIcon />
            <Text style={styles.searchText}>일치하는 병원이 없습니다 :(</Text>
          </View>
        )
      ) : (
        <View style={styles.searchTextContainer}>
          <HeartSeedIcon />
          <Text style={styles.searchText}>병원 이름을 검색해보세요!</Text>
        </View>
      )}
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white"
  },
  findText: {
    color: "black",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
    letterSpacing: -0.5,
    marginTop: 12
  },
  searchInputContainer: {
    marginTop: 34,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#F7F7FB",
    borderColor: "#E5E5EC",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 12,
    gap: 6
  }, 
  userInput: {
    flex: 1
  },
  searchTextContainer: {
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
    gap: 12
  },
  searchText: {
    color: "#767676",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    letterSpacing: -0.4
  },
  listContainer: {
    flex: 1,
    marginTop: 16,
  },
  listInnerStyle: {
    gap: 12
  }
})