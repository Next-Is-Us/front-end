import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PurpleNav = ({ activeTab, setActiveTab }) => {
  const [roleNames, setRoleNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setAdminRole = async () => {
      try {
        await AsyncStorage.setItem('userRoles', JSON.stringify(['ROLE_ADMIN']));
        console.log('User roles set to ROLE_ADMIN');
      } catch (error) {
        console.error('Failed to set user roles', error);
      }
    };

    setAdminRole();
  }, []);

  useEffect(() => {
    const fetchRoleNames = async () => {
      try {
        const storedRoleNames = await AsyncStorage.getItem('userRoles');
        console.log('userRoles:', storedRoleNames);
        setRoleNames(storedRoleNames ? JSON.parse(storedRoleNames) : []);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch role names from AsyncStorage', error);
        setIsLoading(false);
      }
    };

    fetchRoleNames();
  }, []);

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
  };

  if (isLoading) {
    return null;
  }

  const canAccessCommunication =
    roleNames.includes('ROLE_MOM') ||
    roleNames.includes('ROLE_ADMIN') ||
    roleNames.includes('ROLE_DOCTOR');

  return (
    <View style={styles.headerContainer}>
      {canAccessCommunication && (
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
      )}
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
    // paddingTop: 20,
    paddingBottom: 20,
    marginLeft: 6,
    // paddingLeft: 20,
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
