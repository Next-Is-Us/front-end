import { View, Text, StyleSheet } from "react-native";
import TopBackground from "../components/TopBackground";
import HeaderNav from "../components/HeaderNav";
import RelationButton from "../components/RelationButton";

export default function MomHomeScreen() {
  return (
    <>
      <TopBackground>
        <HeaderNav />
        <View style={styles.buttonContainer}>
          <RelationButton title="엄마" />
        </View>
      </TopBackground>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
})