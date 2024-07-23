import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";

const hours = Array.from({ length: 24 }, (_, i) => i + 1);

export default function SelectSleepTime() {
  const [selectedHour, setSelectedHour] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.hourContainer,
        selectedHour === item && styles.selectedHourContainer
      ]}
      onPress={() => setSelectedHour(item)}
    >
      <Text style={[
        styles.hourText,
        selectedHour === item && styles.selectedHourText
      ]}>
        {item}시간
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>수면 시간</Text>
      <FlatList
        data={hours}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20
  },
  hourContainer: {
    padding: 20,
    borderRadius: 10,
    borderColor: "#CACAD7",
    borderWidth: 1,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  selectedHourContainer: {
    backgroundColor: "#f0f0f0"
  },
  hourText: {
    fontSize: 16,
    color: "#999"
  },
  selectedHourText: {
    color: "#333",
    fontWeight: "bold"
  }
});
