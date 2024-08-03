import { View, Text, Pressable, StyleSheet } from "react-native";
import MailPlane from "../assets/images/mailPlane.svg";
import RightArrow from "../assets/images/rightArrow.svg";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function RecordedContainer({ recorded, userRole, year, month, day }) {
  // const [date, setDate] = useState("2024.07.09");
  const navigation = useNavigation();
  const selectedDate = [year, month, day];

  const confirmRecordHandler = () => {
    navigation.navigate("ConfirmRecord", {selectedDate: selectedDate, userRole: userRole});
  }

  return recorded ? (
    <View style={styles.completeContainer}>
      <View style={styles.completeRecordTextBox}>
        <Text style={styles.completeDate}>{date}</Text>
        <Text style={styles.completeText}>기록이 완료되었습니다.</Text>
      </View>
      <Pressable onPress={confirmRecordHandler}>
        <RightArrow />
      </Pressable>
    </View>
  ) : (
    <View style={styles.inCompleteContainer}>
      <View style={styles.completeRecordTextBox}>
        <Text style={styles.inCompleteMainText}>아직 기록하지 않았어요!</Text>
        <Text style={styles.inCompleteSubText}>알람으로 보내 기록을 유도해보아요 :)</Text>
      </View>
      <Pressable style={styles.sendNoticeButton}>
        <MailPlane />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  completeContainer: {
    width: "100%",
    height: 88,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 18,
    backgroundColor: "rgba(163, 15, 250, 0.15)",
  },
  inCompleteContainer: {
    width: "100%",
    height: 88,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 18,
    backgroundColor: "#F1F1F5",
  },
  completeRecordTextBox: {
    gap: 8,
  },
  completeDate: {
    color: "#767676",
    fontSize: 12,
    fontFamily: "Pretendard",
    fontWeight: "400",
  },
  completeText: {
    color: "black",
    fontSize: 15,
    fontFamily: "Pretendard",
    fontWeight: "400",
  },
  inCompleteMainText: {
    color: "black",
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 22
  },
  inCompleteSubText: {
    color: "#767676",
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18
  },
  sendNoticeButton: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39C3B6"
  }
});
