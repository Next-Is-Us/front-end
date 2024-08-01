import { Animated, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import PurpleFlowerBadge from "../assets/images/flower6.svg";
import YellowFlowerBadge from "../assets/images/yellowFlowerBadge.svg";
import GreenFlowerBadge from "../assets/images/greenFlowerBadge.svg";
import BasicFlowerBadge from "../assets/images/basicFlowerBadge.svg";
import FlowerGrid from "../assets/images/flowerGrid.svg";
import CheckedRecord from "../assets/images/checkedRecord.svg";
import { BlurView } from "expo-blur";

const backgroundColors = ["#E2F6F4", "#F1DBFE", "#FFF0D9"];

const FlowerBadgeGrid = ({recordItem}) => {
  const totalBadges = 6;

  // const backgroundColor = backgroundColors[recordItem.recordedNumber % 3];

  const badges = Array.from({length: recordItem.nftCount} ,(_, index) => {
    return (
      <>
        {recordItem.isComplete == true && (
          <>
          {recordItem.healthRecordId % 3 == 1 && <PurpleFlowerBadge key={`badge-${index}`} width={24} height={24} />}
          {recordItem.healthRecordId % 3 == 2 && <YellowFlowerBadge key={`badge-${index}`} width={24} height={24} />}
          {recordItem.healthRecordId % 3 == 0 && <GreenFlowerBadge key={`badge-${index}`} width={24} height={24} />}
          </>
        )}
        {recordItem.isComplete == false && <BasicFlowerBadge key={`badge-${index}`} />}
      </>
    )
  })
  if(recordItem.isComplete) {
    return badges;
  } else {
    const grids = Array.from({length: totalBadges - recordItem.nftCount}, (_, index) => {
      return <FlowerGrid key={`grid-${index}`} width={24} height={24} />
    })
    return [...badges, ...grids];
  }
}

export default function ConditionRecordedItem({recordItem, selected}) {
  return (
    <View style={recordItem.isComplete ? [styles.completedConditionRecordedItemContainer, { backgroundColor: backgroundColors[recordItem.healthRecordId % 3] }] : styles.incompletedConditoinRecordedItemContainer}>
      <View style={styles.recordedItemTopContainer}>
        <View style={styles.recordedTextContainer}>
          <Text style={styles.recordedNumberText}>건강 기록 {recordItem.isComplete && `#`}{recordItem.healthRecordId}</Text>
          {recordItem.isComplete ? <Text style={styles.recordedSubText}>{recordItem.recordPeriod}</Text> : <Text style={styles.recordedSubText}>꽃피 모으는 중</Text>}
        </View>
        {recordItem.isComplete && (
          <>
            {recordItem.healthRecordId % 3 == 1 && <PurpleFlowerBadge width={90} height={90} />}
            {recordItem.healthRecordId % 3 == 2 && <YellowFlowerBadge width={90} height={90} />}
            {recordItem.healthRecordId % 3 == 0 && <GreenFlowerBadge width={90} height={90} />}
          </>
        )}
      </View>
      <View style={styles.recordedFlowerGridContainer}>
        {/* {recordItem.complete && Array.from({length: recordItem.recordCount}, (_, index) => {
          return <FlowerBadge key={index} width={24} height={24} />
        })}
        {recordItem.complete == false && Array.from({length: recordItem.recordCount}, (_, index) => {
          return <FlowerBadge key={index} width={24} height={24} />
        })}
        {recordItem.complete == false && Array.from({length: 6 - recordItem.recordCount}, (_, index) => {
          return <FlowerGrid key={index} width={24} height={24} />
        })} */}
        <FlowerBadgeGrid recordItem={recordItem} />
      </View>
      {selected && (
        <View style={styles.blur}>
          <BlurView intensity={50} />
          <CheckedRecord />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  completedConditionRecordedItemContainer: {
    padding: 20,
    backgroundColor: "#F1DBFE",
    borderRadius: 12,
    gap: 24,
  },
  incompletedConditoinRecordedItemContainer: {
    padding: 20,
    backgroundColor: "#F1F1F5",
    borderRadius: 12,
    gap: 24
  },
  recordedItemTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  recordedTextContainer: {
    gap: 4
  },
  recordedNumberText: {
    color: "black",
    fontFamily: "Pretendard",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: -0.4,
  },
  recordedSubText: {
    color: "#767676",
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: -0.3,
  },
  recordedFlowerGridContainer: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(17, 17, 17, 0.50)",
    borderRadius: 12
  },
})