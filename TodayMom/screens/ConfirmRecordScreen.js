import { StyleSheet, View } from "react-native";
import HeaderBack from "../components/HeaderBack";

export default function ConfirmRecordScreen() {
  return (
    <View>
      <HeaderBack />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white"
  }
})