import { Animated, Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NFTBackIcon from "../assets/images/NFTBack.svg";
import FlowerBadge from "../assets/images/flower6.svg";
import LittleShining from "../assets/images/littleShining.svg";
import LeftBigShining from "../assets/images/leftBigShining.svg";
import TopBigShining from "../assets/images/topBigShining.svg";
import { useState, useRef } from "react";

export default function NFTCard({back, front, info, isClicked, setIsClicked}) {
  const topShineAnimation = useRef(new Animated.Value(0)).current;
  const topRotationAnimation = useRef(new Animated.Value(0)).current;
  const leftShineAnimation = useRef(new Animated.Value(0)).current;
  const leftRotationAnimation = useRef(new Animated.Value(0)).current;
  const rightShineAnimation = useRef(new Animated.Value(0)).current;
  const rightRotationAnimation = useRef(new Animated.Value(0)).current;
  const shadowAnimation = useRef(new Animated.Value(0)).current;
  const borderAnimation = useRef(new Animated.Value(0)).current;

  const border = () => {
    Animated.sequence([
      Animated.timing(borderAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(borderAnimation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      })
    ]).start();
  }

  const borderColor = borderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
  });

  const borderStyle = {
    borderColor: borderColor,
    borderWidth: 2,
    borderRadius: 30,
  }

  const shadow = () => {
    Animated.sequence([
      Animated.timing(shadowAnimation, {
        toValue: 0.25,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(shadowAnimation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }

  const shadowStyle = {
    shadowOpacity: shadowAnimation,
    shadowRadius: 150,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 4 },
  };

  const topRotationInterpolate = topRotationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-90deg"],
  });

  const topRotationStyle = {
    transform: [{rotate: topRotationInterpolate}]
  };

  const leftRotationInterpolate = leftRotationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-90deg"],
  });

  const leftRotationStyle = {
    transform: [{rotate: leftRotationInterpolate}]
  };

  const rightRotationInterpolate = rightRotationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-90deg"],
  });

  const rightRotationStyle = {
    transform: [{rotate: rightRotationInterpolate}]
  };

  const topShining = () => {
    return Animated.parallel([
      Animated.sequence([
        Animated.timing(topShineAnimation, {
          toValue: 3,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(topShineAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]),
      Animated.sequence([
        Animated.timing(topRotationAnimation, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true
        }),
        // Animated.timing(rotationAnimation, {
        //   toValue: 0,
        //   duration: 300,
        //   useNativeDriver: true
        // }),
      ])
    ]).start(() => {
      topRotationAnimation.setValue(0);
    })
  };

  const leftShining = () => {
    return Animated.parallel([
      Animated.sequence([
        Animated.timing(leftShineAnimation, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(leftShineAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]),
      Animated.sequence([
        Animated.timing(leftRotationAnimation, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true
        }),
        Animated.timing(leftRotationAnimation, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true
        }),
      ])
    ]).start()
  };

  const rightShining = () => {
    return Animated.parallel([
      Animated.sequence([
        Animated.timing(rightShineAnimation, {
          toValue: 5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rightShineAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]),
      Animated.sequence([
        Animated.timing(rightRotationAnimation, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true
        }),
        Animated.timing(rightRotationAnimation, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true
        }),
      ])
    ]).start()
  };

  // if(isClicked) {
  //   Animated.parallel([
  //     topShining(),
  //     leftShining()
  //   ]).start(() => {
  //     setIsClicked(false);
  //   })
  // }

  if(isClicked) {
    topShining();
    leftShining();
    rightShining();
    shadow();
    border();
  }

  const topCombinedTransformStyle = {
    transform: [
      { translateX: topShineAnimation },
      ...topRotationStyle.transform
    ]
  };

  const leftCombinedTransformStyle = {
    transform: [
      { translateY: leftShineAnimation },
      ...leftRotationStyle.transform
    ]
  };

  const rightCombinedTransformStyle = {
    transform: [
      { translateY: rightShineAnimation },
      ...rightRotationStyle.transform
    ]
  };

  return (
      <>
        {/* <LinearGradient
          colors={["#BABABA", "#3E3E3E", "#111"]} 
          start={{x: 1, y: 0}}
          end={{x:0, y: 1}}
          locations={[0.0, 0.35, 0.8]}
          style={styles.cardContainer}
        > */}
          {back && <Image source={require("../assets/images/NFTBack.png")} style={styles.card} />}
          {front && (
            <>
              <Animated.View style={[styles.cardContainer, isClicked && styles.clickedCardContainer, shadowStyle, borderStyle]}>
                <ImageBackground source={require("../assets/images/NFTContainer.png")} style={styles.card}>
                  <Text style={styles.titleText}>꽃피 NFT</Text>
                  <Text style={styles.recordedNumberText}>#{info.healthRecordId}</Text>
                  <View style={styles.badgeContainer}>
                    <FlowerBadge width={146} height={146} />
                  </View>
                  <View style={styles.certifyTextContainer}>
                    <Text style={styles.certifyText}>본 NFT의 소유자는 총 9주 동안</Text>
                    <Text style={styles.certifyText}>자신의 건강을 기록하였음을 인증합니다</Text>
                  </View>
                  <Text style={styles.recordPeriodText}>기록 기간</Text>
                  <Text style={styles.recordedPeriod}>{info.startedDate} - {info.endedDate}</Text>
                </ImageBackground>
                {isClicked && (
                  <>
                    <Animated.View style={[styles.littleShining, rightCombinedTransformStyle]}>
                      <LittleShining />
                    </Animated.View>
                    <Animated.View style={[styles.leftBigShining, leftCombinedTransformStyle]}>
                      <LeftBigShining />
                    </Animated.View>
                    <Animated.View style={[styles.topBigShining, topCombinedTransformStyle]}>
                      <TopBigShining />
                    </Animated.View>
                  </>
                )}
              </Animated.View>
              {/* <Text style={styles.touchText}>꽃피 NFT 카드<Text style={styles.touchText2}>를 터치해보세요</Text></Text> */}
            </>
          )}
          {/* <NFTBackIcon />
        </LinearGradient> */}
      </>
  );
}

const styles = StyleSheet.create({
  // cardContainer: {
  //   width: 236,
  //   height: 390,
  //   borderRadius: 24,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderColor: "silver",
  //   borderWidth: "2",
  //   backgroundColor: "black"
  // },
  cardContainer: {
    // flex: 1,
    alignItems: "center",
    // width: 236,
    // height: 390,
    // justifyContent: "center",
  },
  clickedCardContainer: {
    // borderColor: "white",
    // borderWidth: 2,
    // borderRadius: 30,
    // borderStyle: "solid",
    // shadowColor: '#FFFFFF',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.25,
    // shadowRadius: 150,
    elevation: 5
  },
  card: {
    width: 236,
    height: 390,
    alignItems: "center",
    backfaceVisibility: "hidden",
  },
  titleText: {
    color: "#999",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
    letterSpacing: -0.3,
    marginTop: 32,
  },
  recordedNumberText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
    letterSpacing: -0.375,
  },
  badgeContainer: {
    marginTop: 12
  },
  certifyTextContainer: {
    marginTop: 24,
    alignItems: "center"
  },
  certifyText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: -0.3,
    textAlign: "center",
  },
  recordPeriodText: {
    color: "#999",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
    letterSpacing: -0.3,
    marginTop: 28,
  },
  recordedPeriod: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
    letterSpacing: -0.3,
    textAlign: "center",
  },
  touchText: {
    marginTop: 122,
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
    letterSpacing: -0.375,
    textAlign: "center",
  },
  touchText2: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 22,
    letterSpacing: -0.375,
  },
  littleShining: {
    position: "absolute",
    right: -19,
    top: 200
    // backgroundColor: "blue",
    // zIndex: 10,
    // width: 10,
    // height: 10
  },
  leftBigShining: {
    position: "absolute",
    left: -36,
    top: 260
  },
  topBigShining: {
    position: "absolute",
    right: -15,
    top: -36
  }
});
