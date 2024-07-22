import { Image, Pressable, StyleSheet, View } from "react-native";
import LogoImg from "../assets/images/logo.svg";
import LogoText from "../assets/images/logoText.svg";
import MyPage from "../assets/images/myPage.svg";
import Notice from "../assets/images/notice.svg";

export default function HeaderNav() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.lgooContainer}>
        <Pressable>
          <LogoImg />
        </Pressable>  
        <Pressable>
          <LogoText/>
        </Pressable>
      </View>
      <View style={styles.myLinkContainer}>
        <Pressable>
          <MyPage />
        </Pressable>  
        <Pressable>
          <Notice />
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