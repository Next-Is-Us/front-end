import { StyleSheet, Text, View } from "react-native";
import CommunityActiveImg from "../assets/images/community_active.svg";
import CommunityInactiveImg from "../assets/images/community_inactive.svg";
import FlowerActiveImg from "../assets/images/flower_active.svg";
import FlowerInactiveImg from "../assets/images/flower_inactive.svg";
import HomeActiveImg from "../assets/images/home_active.svg";
import HomeInactiveImg from "../assets/images/home_inactive.svg";

export default function BottomNav({ community, home, flower }) {
  return (
    <View style={styles.navContainer}>
      {community ? (
        <View style={styles.itemContainer}>
          <CommunityActiveImg />
          <Text style={[styles.itemText, {color: "#A30FFA"}]}>커뮤니티</Text>
        </View>
      ) : (
        <View style={styles.itemContainer}>
          <CommunityInactiveImg />
          <Text style={styles.itemText}>커뮤니티</Text>
        </View>
      )}
      {home ? (
        <View style={styles.itemContainer}>
          <HomeActiveImg />
          <Text style={[styles.itemText, {color: "#A30FFA"}]}>홈</Text>
        </View>
      ) : (
        <View style={styles.itemContainer}>
          <HomeInactiveImg />
          <Text style={styles.itemText}>홈</Text>
        </View>
      )}
      {flower ? (
        <View style={styles.itemContainer}>
          <FlowerActiveImg />
          <Text style={[styles.itemText, {color: "#A30FFA"}]}>꽃피</Text>
        </View>
      ) : (
        <View style={styles.itemContainer}>
          <FlowerInactiveImg />
          <Text style={styles.itemText}>꽃피</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    marginTop: 30,
    flexDirection: "row",
    width: "100%",
    height: 52,
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5
  },
  itemText: {
    color: "#767676",
    fontFamily: "Pretendard",
    fontSize: 11,
    fontWeight: "400",
    textAlign: "center"
  }
});
