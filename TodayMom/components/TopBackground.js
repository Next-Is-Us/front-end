import { ImageBackground, StyleSheet, SafeAreaView } from "react-native";

export default function TopBackground({children}) {
  return (
    <>
      <ImageBackground
        source={require("../assets/images/topBackgroundImg.png")}
        resizeMode="cover"
        style={styles.backgroundImg}
      >
        <SafeAreaView style={styles.safeArea}>
          {children}
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImg: {
    width: "100%",
    height: 156,
  },
  safeArea: {
    flex: 1,
  },
});
