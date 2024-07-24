import { Image, Pressable, StyleSheet, View } from "react-native";
import LogoImg from "../assets/images/logo.svg";
import LogoText from "../assets/images/logoText.svg";
import MyPage from "../assets/images/myPage.svg";
import Notice from "../assets/images/notice.svg";
import RelationButton from "./RelationButton";
import NoticeActive from "../assets/images/notice_active.svg";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function HeaderNav({relation, name}) {
  const [isNotice, setIsNotice] = useState(false);

  const navigation = useNavigation();

  const notificationHandler = () => {
    navigation.navigate("Notification");
  }

  const myPageHandler = () => {
    navigation.navigate("MyPage", {userName: name})
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.lgooContainer}>
        <Pressable>
          <LogoImg />
        </Pressable>  
        <Pressable>
          <LogoText/>
        </Pressable>
        <RelationButton relation={relation} />
      </View>
      <View style={styles.myLinkContainer}>
        <Pressable onPress={myPageHandler}>
          <MyPage />
        </Pressable>  
        <Pressable onPress={notificationHandler}>
          {isNotice ? <NoticeActive /> : <Notice />}
        </Pressable>
      </View>
    </View>
  )
}

const styles= StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18
  },
  lgooContainer: {
    flexDirection: "row",
    gap: 4.85,
    alignItems: "center"
  },
  myLinkContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center"
  }
})