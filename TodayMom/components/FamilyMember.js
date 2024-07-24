import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function FamilyMember({memberName}) {
  return (
    <View style={styles.familyMemberContainer}>
      <TouchableOpacity>
        <Image />
        <Text style={styles.memberNameText}>{memberName}<Text style={styles.memberText}>님</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  familyMemberContainer: {
    paddingVertical: 9
  },
  memberNameText: {
    color: "black",
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "600",
  },
  memberText: {
    color: "black",
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "400",
  }
})
