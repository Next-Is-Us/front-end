import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WeekCalendar } from 'react-native-calendars';

const Status = () => {
  const today = new Date().toISOString().split('T')[0]; // 오늘 날짜를 'YYYY-MM-DD' 형식으로 생성

  return (
    <View style={styles.imageContainer}>
      <Image
        source={require('../assets/images/StatusBack.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.centeredBox}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>엄마</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <WeekCalendar
            current={today} // 오늘 날짜 사용
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  centeredBox: {
    position: 'absolute',
    top: '8%',
    left: '50%',
    transform: [{ translateX: -62 }, { translateY: -31 }],
    width: 124,
    height: 48,
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A30FFA',
    borderRadius: 12,
    shadowColor: '#A30FFA',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  button: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.4,
  },
  calendarContainer: {
    marginTop: 20,
    width: '100%',
  },
  textSectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#b6c1cd',
    fontSize: 14,
  },
  day: {
    textAlign: 'center',
    color: '#2d4150',
    fontSize: 16,
  },

  image: {
    width: '100%',
    height: 56,
  },
});

export default Status;
