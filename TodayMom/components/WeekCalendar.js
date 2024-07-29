import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";

const getWeekDays = () => {
  const dates = [];
  const date = new Date(); // 현재 시간 정보
  const year = date.getFullYear(); // 현재 년도
  const month = date.getMonth(); // 현재 월 (+1 해야 함)
  const dayOfWeek = date.getDay(); // 현재 요일 (0~6, 일~토)
  const day = date.getDate(); // 현재 날짜
  const monday = new Date(year, month, day - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // 월요일 구하는 법

  for (let i = 0; i < 7; i++) {
    const weeks = new Date(monday);
    weeks.setDate(monday.getDate() + i);
    dates.push({
      day: weeks.getDate(),
      month: weeks.getMonth() + 1,
      year: weeks.getFullYear(),
      date: weeks.getDay(),
    });
  }

  return dates;
};

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const DayItem = ({ day, date, selected, relation, onPress }) => {
  return (
    <View style={styles.dayContainer}>
      <Text style={[styles.dateText, (selected && relation=="자녀" &&  styles.childrenSelectedDateText), (selected && relation=="엄마" &&  styles.momSelectedDateText)]}>{daysOfWeek[date]}</Text>
      <Pressable onPress={onPress} style={[styles.dayBox, (selected && relation=="자녀" &&  styles.childrenSelectedDayBox), (selected && relation=="엄마" &&  styles.momSelectedDayBox)]}>
        <Text style={[styles.dayText, selected && styles.selectedDayText]}>{day}</Text>
      </Pressable>
    </View>
  );
};

export default function WeekCalendar({relation}) {
  const [week, setWeek] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  useEffect(() => {
    const weekDays = getWeekDays();
    setWeek(weekDays);
  },[]);

  const selectDayHandler = (day) => {
    setSelectedDay(day);
  }

  return (
    <>
      <FlatList
        horizontal
        style={styles.calendarContainer}
        contentContainerStyle={styles.calenderInnerStyle}
        data={week}
        keyExtractor={(item) => item.day.toString()}
        renderItem={(itemData) => {
          return (
            <DayItem day={itemData.item.day} date={itemData.item.date} selected={itemData.item.day === selectedDay} relation={relation} onPress={() => {selectDayHandler(itemData.item.day)}} />
          )
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    // flex: 1,
    // width: "100%",
    // flexDirection: "row",
    // gap: 2,
    marginTop: 20,
    // backgroundColor: "blue",
  },
  calenderInnerStyle: {
    justifyContent: "space-between",
    width: "100%",
    gap: 2
  },
  dayContainer: {
    gap: 8,
    // width: 50,
    paddingHorizontal: 5,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "yellow"
  },
  dateText: {
    textAlign: "center",
    color: "#767676",
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "400",
  },
  dayBox: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10.5,
    height: 30,
    // width: 60,
  },
  dayText: {
    fontFamily: "Pretendard",
    fontSize: 14,
    fontWeight: "400",
    color: "#767676",
    textAlign: "center"
  },
  momSelectedDateText: {
    color: "#A30FFA"
  },
  childrenSelectedDateText: {
    color: "#39C3B6"
  },
  momSelectedDayBox: {
    backgroundColor: "#A30FFA"
  },
  childrenSelectedDayBox: {
    backgroundColor: "#39C3B6"
  },
  selectedDayText: {
    color: "white"
  }
});
