import { Image, SafeAreaView, StyleSheet, View, Text } from "react-native";

export default function HeaderBack({white}) {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        {white ? <Image source={require("../assets/images/whiteLeftArrow.png")} /> : <Image source={require("../assets/images/leftallow.png")} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // marginTop: 12,
    paddingVertical: 14,
  },
});
