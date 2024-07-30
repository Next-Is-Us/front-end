import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import PurpleNav from './PurpleNav';
import Communication from '../screens/Communication';
import InfoWrite from '../screens/InfoWrite';
import BottomNav from './BottomNav';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('Communication');

  return (
    <View style={styles.navsafe}>
      <SafeAreaView>
        <PurpleNav activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'Communication' && <Communication />}
        {activeTab === 'InfoWrite' && <InfoWrite />}
      </SafeAreaView>
      <BottomNav community />
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
