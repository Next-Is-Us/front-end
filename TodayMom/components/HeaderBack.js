import { useNavigation } from "@react-navigation/native";
import { Image, SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import LeftArrow from "../assets/images/leftArrow.svg";

export default function HeaderBack({white}) {
  const navigation = useNavigation();

  const goBackHandler = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBackHandler} style={styles.imgContainer}>
          {white ? <Image source={require("../assets/images/whiteLeftArrow.png")} /> : <LeftArrow />}
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // marginTop: 12,
    paddingVertical: 14,
  },
  imgContainer: {
    width: 28,
    height: 28
  },
});
