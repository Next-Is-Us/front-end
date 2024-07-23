import { View, Text, StyleSheet, FlatList } from "react-native";
import HeaderBack from "../components/HeaderBack";
import NotificationActiveImg from "../assets/images/notification_active.svg";
import { useState } from "react";

const dummyData = [
  {mainText: "김지은은 바보에요.", subText: "사랑해요"},
  {mainText: "김지은은 바보에요.", subText: "사랑해요"},
  {mainText: "김지은은 바보에요.", subText: "사랑해요"},
]

{/*스타일 변경할 수도 있음 (Pressable) */}
const NotificationItem = ({item, last}) => {
  return (
    <View style={!last && styles.borderBottom}>
      <View style={styles.notificationTextContainer}>
        <Text style={styles.notificationMainText}>{item.mainText}</Text>
        <Text style={styles.notificationSubText}>{item.subText}</Text>
      </View>
    </View>
  )
}

export default function NotificationScreen() {
  const [notificationText, setNotificationText] = useState(dummyData); // 추후 백에서 받을 예정

  const renderItem = ({item, index}) => {
    return (
      <NotificationItem
        item={item}
        lastNotification={index === notificationText.length-1}
      />
    )
  }

  return (
    <View style={styles.screen}>
      <HeaderBack />
      <View style={styles.noticeContainer}>
        <NotificationActiveImg />
        <Text style={styles.noticeText}>알림</Text>
      </View>
      <View style={styles.notificationContentContainer}>
        <FlatList
          alwaysBounceVertical
          data={notificationText}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white"
  },
  noticeContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginTop: 12
  },
  noticeText: {
    color: "black",
    fontFamily: "Pretendard",
    fontSize: 24,
    fontWeight: 600
  },
  notificationContentContainer: {
    marginTop: 33
  },
  notificationTextContainer: {
    gap: 4
  }, 
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1DBFE",
    paddingVertical: 8,
  },
  notificationMainText: {
    color: "black",
    fontFamily: "Pretendard",
    fontSize: 18,
    fontWeight: "400",
    fontStyle: "normal"
  },
  notificationSubText: {
    color: "#505050",
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "400",
    fontStyle: "normal"
  }
})