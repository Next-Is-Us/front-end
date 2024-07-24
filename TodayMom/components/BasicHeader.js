import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BasicHeader = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.headerLeft}
    >
      <Image
        source={require('../assets/images/leftallow.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    paddingLeft: 20,
    paddingTop: 14,
    paddingBottom: 14,
    paddingRight: 20,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default BasicHeader;
