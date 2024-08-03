import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import PurpleNav from './PurpleNav';
import Communication from '../screens/Communication';
import InfoWrite from '../screens/InfoWrite';
import BottomNav from './BottomNav';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('Communication');
  const [roleNames, setRoleNames] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchRoleNames = async () => {
      try {
        const storedRoleNames = await AsyncStorage.getItem('userRoles');
        const roles = storedRoleNames ? JSON.parse(storedRoleNames) : [];
        setRoleNames(roles);

        if (
          !roles.includes('ROLE_MOM') &&
          !roles.includes('ROLE_ADMIN') &&
          !roles.includes('ROLE_DOCTOR')
        ) {
          setActiveTab('InfoWrite');
        }
      } catch (error) {
        console.error('Failed to fetch role names from AsyncStorage', error);
      }
    };

    const getUserRole = async () => {
      try {
        const storedUserRole = await AsyncStorage.getItem('userRoles2');
        setUserRole(storedUserRole || '');
      } catch (error) {
        console.error('Failed to fetch user role from AsyncStorage', error);
      }
    };

    fetchRoleNames();
    getUserRole();
  }, []);

  return (
    <View style={styles.navsafe}>
      <SafeAreaView>
        <PurpleNav activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'Communication' && <Communication />}
        {activeTab === 'InfoWrite' && <InfoWrite />}
      </SafeAreaView>
      <BottomNav community userRole={userRole} />
    </View>
  );
};

const styles = StyleSheet.create({
  navsafe: {
    padding: 20,
    flex: 1,
  },
});

export default CommunityPage;
