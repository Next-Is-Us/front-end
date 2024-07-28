import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PurpleNav = ({ activeTab, setActiveTab }) => {
  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => handleTabPress('Communication')}>
        <Text
          style={[
            styles.textStyle,
            activeTab === 'Communication' && styles.activeTextStyle,
          ]}
        >
          소통방
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('InfoWrite')}>
        <Text
          style={[
            styles.textStyle2,
            activeTab === 'InfoWrite' && styles.activeTextStyle,
          ]}
        >
          갱년기 건강 정보
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft: 6,
  },
  textStyle: {
    color: '#767676',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 28,
  },
  textStyle2: {
    color: '#767676',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 28,
  },
  activeTextStyle: {
    color: '#A30FFA',
    fontWeight: '600',
  },
});

export default PurpleNav;
