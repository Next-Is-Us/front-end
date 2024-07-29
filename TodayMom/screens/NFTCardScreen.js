import { ImageBackground, StyleSheet, View, Dimensions, Animated, Pressable, Text } from "react-native";
import HeaderBack from "../components/HeaderBack";
import NFTCard from "../components/NFTCard";
import { useRef, useEffect, useState } from "react";

export default function NFTCardScreen({route}) {
  const info = route.params.info;
  // const deviceWidth = Dimensions.get("window").width;
  // const deviceHeight = Dimensions.get("window").height;
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const dropAnimation = useRef(new Animated.Value(-Dimensions.get("window").height)).current; // 초기 위치를 화면 위로 설정
  const springAnimation = useRef(new Animated.Value(0)).current;
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const shakeInterpolate = shakeAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-1deg", "0deg", "5deg"],
  });

  const shakeStyle = {
    transform: [{rotate: shakeInterpolate}]
  };

  const shakeCard = () => {
    setTimeout(() => {
      setIsClicked(true);
    }, 700);
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: -1,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 500,
        delay: 100,
        useNativeDriver: true
      }),
    ]).start(() => {
      setIsClicked(false);
    });
  }

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  })

  const flipToFrontStyle = {
    transform: [{rotateY: frontInterpolate}]
  };

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  })

  const flipToBackStyle = {
    transform: [{rotateY: backInterpolate}]
  };

  // card flip animation
  const flipCard = () => {
    if(!isFlipped) {
      Animated.spring(flipAnimation, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver:  true
      }). start();
    } 
    setIsFlipped(true);
  }

  useEffect(() => {
    Animated.timing(dropAnimation, {
      toValue: 0, // 최종 위치를 현재 위치로 설정
      duration: 1000, 
      useNativeDriver: true,
    }).start(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(springAnimation, {
            toValue: -30,
            useNativeDriver: true,
            duration: 1000
            // speed: 5,
            // bounciness: 10,
            // friction: 5,
            // tension: 50
          }),
          Animated.timing(springAnimation, {
            toValue: 0,
            useNativeDriver: true,
            duration: 1000
            // speed: 5,
            // bounciness: 10,
            // friction: 5,
            // tension: 50
          })
        ])
      ).start();
    });
  }, [dropAnimation, springAnimation]);

  // const translateY = springAnimation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, -30],
  // });

  {/* transform 스타일을 병합해줘야 함! */}
  const combinedTransformStyle = {
    transform: [
      ...flipToBackStyle.transform,
      ...shakeStyle.transform,
    ]
  };
  
  return (
    <ImageBackground source={require("../assets/images/NFTBackground.png")} style={styles.screen}>
      <HeaderBack />
      <View style={styles.cardContainer}>
        <Pressable onPress={isFlipped ? shakeCard : flipCard}>
          {!isFlipped && (
            // <Pressable onPress={flipCard}>
            <Animated.View style={[styles.card, flipToFrontStyle,  { transform: [{ translateY: dropAnimation }, { translateY: springAnimation }] }]}>
              <NFTCard back />
            </Animated.View>
            // </Pressable>
          )}
          {isFlipped && (
            <>
            {/* <Pressable onPress={shakeCard} style={styles.pressable}> */}
            <Animated.View style={[styles.card, combinedTransformStyle]}> 
              <NFTCard front info={info} isClicked={isClicked} setIsClicked={setIsClicked} />
            </Animated.View>
            {/* </Pressable> */}
            </>
          )}
        </Pressable>
        {isFlipped && (
            <Text style={styles.touchText}>꽃피 NFT 카드<Text style={styles.touchText2}>를 터치해보세요</Text></Text>
        )}
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20
  },
  cardContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    // position: "absolute",
    // top: deviceHeight / 2,
    // left: deviceWidth / 2
    alignItems: "center",
    marginTop: 120,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    // backgroundColor: "blue",
    height: 390
  },
  card: {
    // position: "absolute",
    backfaceVisibility: "hidden",
  },
  touchText: {
    // marginTop: 150,
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
    letterSpacing: -0.375,
    textAlign: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: -150,
  },
  touchText2: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 22,
    letterSpacing: -0.375,
  }
})