import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Start = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>오늘의 맘에 오신 것을 환영해요!</Text>
      <Text style={styles.subText}>어떤 사용자로 활동할<br/>
      예정이신가요?</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Image
            source={{ uri: 'https://your-image-url.com/image1.png' }}
            style={styles.image}
          />
          <Text style={styles.buttonText}>엄마</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Image
            source={{ uri: 'https://your-image-url.com/image2.png' }}
            style={styles.image}
          />
          <Text style={styles.buttonText}>자녀</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  headerText: {
   
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 18,
  },
  nextButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '100%',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Start;
