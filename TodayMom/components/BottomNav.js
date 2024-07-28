import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CommunityActiveImg from '../assets/images/community_active.svg';
import CommunityInactiveImg from '../assets/images/community_inactive.svg';
import FlowerActiveImg from '../assets/images/flower_active.svg';
import FlowerInactiveImg from '../assets/images/flower_inactive.svg';
import HomeActiveImg from '../assets/images/home_active.svg';
import HomeInactiveImg from '../assets/images/home_inactive.svg';
import { useNavigation } from '@react-navigation/native';

export default function BottomNav({ community, home, flower }) {
  const navigation = useNavigation();

  const homeHandler = () => {
    navigation.navigate('MomHome');
  };

  const flowerRecordHandler = () => {
    navigation.navigate('FlowerRecord');
  };

  const CommunityHandler = () => {
    navigation.navigate('InfoWrite');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.navContainer}>
        {community ? (
          <TouchableOpacity style={styles.itemContainer}>
            <CommunityActiveImg />
            <Text style={[styles.itemText, { color: '#A30FFA' }]}>
              커뮤니티
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={CommunityHandler}
          >
            <CommunityInactiveImg />
            <Text style={styles.itemText}>커뮤니티</Text>
          </TouchableOpacity>
        )}
        {home ? (
          <TouchableOpacity style={styles.itemContainer}>
            <HomeActiveImg />
            <Text style={[styles.itemText, { color: '#A30FFA' }]}>홈</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.itemContainer} onPress={homeHandler}>
            <HomeInactiveImg />
            <Text style={styles.itemText}>홈</Text>
          </TouchableOpacity>
        )}
        {flower ? (
          <TouchableOpacity style={styles.itemContainer}>
            <FlowerActiveImg />
            <Text style={[styles.itemText, { color: '#A30FFA' }]}>꽃피</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={flowerRecordHandler}
          >
            <FlowerInactiveImg />
            <Text style={styles.itemText}>꽃피</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    // flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
  },
  navContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 52,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  itemText: {
    color: '#767676',
    fontFamily: 'Pretendard',
    fontSize: 11,
    fontWeight: '400',
    textAlign: 'center',
  },
});
