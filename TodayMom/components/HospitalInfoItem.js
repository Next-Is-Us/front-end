import { StyleSheet, Text, View } from "react-native";
import HospitalLocationIcon from "../assets/images/location.svg";
import HospitalCallIcon from "../assets/images/call.svg";

export default function HospitalInfoItem({info}) {
  return (
    <View style={styles.hospitalInfoContainer}>
      <Text style={styles.hospitalName}>{info.name}</Text>
      <View style={styles.locationContainer}>
        <HospitalLocationIcon />
        <Text style={styles.locationText}>{info.location}</Text>
      </View>
      <View style={styles.numberContainer}>
        <HospitalCallIcon />
        <Text style={styles.numberText}>{info.number}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  hospitalInfoContainer: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#E2F6F4"
  },
  hospitalName: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -0.4,
    lineHeight: 24
  },
  locationContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginTop: 4
  },
  locationText: {
    color: "black",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: -0.3,
    lineHeight: 18
  },
  numberContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginTop: 16
  },
  numberText: {
    color: "black",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: -0.3,
    lineHeight: 18
  },
})