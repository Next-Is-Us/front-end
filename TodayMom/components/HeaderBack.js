import { useNavigation } from "@react-navigation/native";
import { Image, SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function HeaderBack({white}) {
  const navigation = useNavigation();

  const goBackHandler = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBackHandler}>
          {white ? <Image source={require("../assets/images/whiteLeftArrow.png")} /> : <Image source={require("../assets/images/leftallow.png")} />}
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
});
