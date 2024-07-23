import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

const hours = Array.from({ length: 24 }, (_, i) => i + 1);

export default function SelectSleepTime({setSleepTimeSelected}) {
  const [selectedHour, setSelectedHour] = useState();

  const selectSleepHourHandler = (hour) => {
    setSelectedHour(hour);
  }

  const renderItem = (itemData) => {
    return (
      <TouchableOpacity style={[styles.hourContainer, selectedHour === itemData.item && styles.selectedHourContainer]} onPress={() => selectSleepHourHandler(itemData.item)}>
        <Text style={[styles.hourText, selectedHour === itemData.item && styles.selctedHourText]}>{itemData.item}시간</Text>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    selectedHour && setSleepTimeSelected(true);
  }, [selectedHour])

  return (
    <View>
      <FlatList 
        data={hours}
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
        // showsHorizontalScrollIndicator={false}
        style={styles.flatListContainer}
        contentContainerStyle={styles.flatListInnerContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 168
  },
  flatListContainer: {
    height: 168,
    marginTop: 12
  },
  flatListInnerContainer: {
    alignItems: "center"
  },
  hourContainer: {
    backgroundColor: "white",
    width: 238,
    height: 56,
    justifyContent: "center",
    alignItems: "center"
  },
  selectedHourContainer: {
    borderRadius: 12,
    backgroundColor: "rgba(163, 15, 250, 0.15)"
  },
  hourText: {
    color: "#767676",
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "400"
  },
  selctedHourText: {
    color: "#A30FFA"
  }
});
