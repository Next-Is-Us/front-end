import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Boy from '../assets/images/Boy.svg';
import Girl from '../assets/images/Girl.svg';
import { useUser } from '../context/UserContext';

const Choose = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const navigation = useNavigation();
  const { userDetails, setUserDetails } = useUser();

  // const handlePress = (buttonId) => {
  //   setSelectedButton(buttonId);
  // };

  const handlePress = (buttonId) => {
    setSelectedButton(buttonId);
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      userRoles: buttonId === 'mom' ? ['ROLE_DAUGHTER'] : ['ROLE_SON'],
    }));
  };

  const getButtonStyle = (buttonId) => {
    if (selectedButton === buttonId) {
      return [styles.button, styles.selectedButton];
    }
    return styles.button;
  };

  const getTextStyle = (buttonId) => {
    if (selectedButton === buttonId) {
      return [styles.buttonText, styles.selectedButtonText];
    }
    return styles.buttonText;
  };

  const getNextButtonStyle = () => {
    if (selectedButton) {
      return [styles.nextButton, styles.nextButtonActive];
    }
    return styles.nextButton;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subText}>사랑하는 엄마의</Text>
      <Text style={[styles.subText, { marginBottom: 32 }]}>
        어떤 자녀 분이실까요?
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={getButtonStyle('mom')}
          onPress={() => handlePress('mom')}
        >
          <Girl style={styles.image} resizeMode="contain" />
          <Text style={getTextStyle('mom')}>딸</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={getButtonStyle('daughter')}
          onPress={() => handlePress('daughter')}
        >
          <Boy style={styles.image} resizeMode="contain" />
          <Text style={getTextStyle('daughter')}>아들</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={getNextButtonStyle()}
        onPress={() => {
          if (selectedButton) {
            navigation.navigate('InviteLink');
          }
        }}
        disabled={!selectedButton}
      >
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  selectedButtonText: {
    color: '#A30FFA',
  },
  nextButtonActive: {
    backgroundColor: '#A30FFA',
  },
  headerText: {
    marginTop: 88,
    color: '#767676',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.35,
    marginBottom: 4,
  },
  subText: {
    color: '#111',
    fontFamily: 'Pretendard',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 34,
    letterSpacing: -0.35,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 296,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 165,
    height: 165,
    borderRadius: 24,
    backgroundColor: '#F7F7FB',
    padding: 10,
  },
  selectedButton: {
    borderColor: 'rgba(163, 15, 250, 0.50)',
    borderWidth: 1,
    backgroundColor: 'rgba(163, 15, 250, 0.15)',
  },
  image: {
    width: 56,
    height: 56,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 26,
    letterSpacing: -0.45,
  },
  nextButton: {
    backgroundColor: 'rgba(163, 15, 250, 0.15)',
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    borderRadius: 12,
  },
  nextButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.4,
  },
});

export default Choose;
