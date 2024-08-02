import { View, Text, Pressable, StyleSheet } from "react-native";
import PlusImg from "../assets/images/plusImg.svg";
import MailImg from "../assets/images/mail.svg";
import RightArrow from "../assets/images/rightArrow.svg";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function ToRecordContainer({ invited, recorded, selectConditionHandler, date, name, year, month, day, sendLinkHandler }) {
  // const [selectedDate, setSelectedDate] = useState("2024.07.09");
  const navigation = useNavigation();
  const selectedDate = [year, month, day]

  const confirmRecordHandler = () => {
    console.log(selectedDate);
    navigation.navigate("ConfirmRecord", {userName: name, selectedDate: selectedDate});
  }

  const toRecordContainer = invited
    ? { backgroundColor: "#8E48F3" }
    : { backgroundColor: "#F1F1F5" };
  const toRecordMainText = invited
    ? { color: "white", fontWeight: "600" }
    : { color: "black", fontWeight: "400" };
  const toRecordSubText = invited ? { color: "#CACAD7" } : { color: "#767676" };
  const addButton = invited
    ? { backgroundColor: "#F2DDFF" }
    : { backgroundColor: "#A30FFA" };

  return invited ? (
    recorded ? (
      <View style={styles.completeContainer}>
        <View style={styles.toRecordTextBox}>
          <Text style={styles.completeDate}>{date}</Text>
          <Text style={styles.completeText}>기록이 완료되었습니다.</Text>
        </View>
        <Pressable onPress={confirmRecordHandler}>
          <RightArrow />
        </Pressable>
      </View>
    ) : (
      <View style={[styles.toRecordContainer, toRecordContainer]}>
        <View style={styles.toRecordTextBox}>
          <Text style={[styles.toRecordMainText, toRecordMainText]}>
            오늘 상태 기록하기
          </Text>
          <Text style={[styles.toRecordSubText, toRecordSubText]}>
            어지러움, 우울 등 사소한 증상이라도 좋아요!
          </Text>
        </View>
        <Pressable style={[styles.addButton, addButton]} onPress={selectConditionHandler}>
          <PlusImg />
        </Pressable>
      </View>
    )
  ) : (
    <View style={[styles.toRecordContainer, toRecordContainer]}>
      <View style={styles.toRecordTextBox}>
        <Text style={[styles.toRecordMainText, toRecordMainText]}>
          아직 초대를 하지 않으셨어요!
        </Text>
        <Text style={[styles.toRecordSubText, toRecordSubText]}>
          메시지를 보내 초대해보아요 :)
        </Text>
      </View>
      <Pressable style={[styles.addButton, addButton]} onPress={sendLinkHandler}>
        <MailImg />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  toRecordContainer: {
    width: "100%",
    height: 88,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 18,
  },
  toRecordTextBox: {
    gap: 8,
  },
  toRecordMainText: {
    fontSize: 15,
    fontFamily: "Pretendard",
  },
  toRecordSubText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Prentendard",
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
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
});
