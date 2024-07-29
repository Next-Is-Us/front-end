import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { usePosts } from './PostContext';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../components/BottomNav';
import PurpleNav from '../components/PurpleNav.js';
import { SafeAreaView } from 'react-native-safe-area-context';

const InfoWrite = () => {
  const { posts } = usePosts();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('InfoWrite');

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('ViewContent', { post: item })}
      >
        {item.imageUri ? (
          <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
        ) : null}
        <View style={styles.textContent}>
          <Text style={styles.mainText}>{item.title}</Text>
          <Text style={styles.subText} numberOfLines={2} ellipsizeMode="tail">
            {item.content}
          </Text>
        </View>
        <Image
          source={require('../assets/images/allowright.png')}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <PurpleNav activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'InfoWrite' && (
        <>
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
            contentContainerStyle={styles.listContent}
          />
          <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate('NewWrite')}
          >
            <Text style={styles.write}>글쓰기</Text>
            <Image
              source={require('../assets/images/pencil.png')}
              style={styles.fabIcon}
            />
          </TouchableOpacity>
        </>
      )}

      <BottomNav community />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    width: 68,
    height: 68,
    borderRadius: 12,
    marginRight: 16,
  },
  write: {
    color: '#FFF',
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.325,
  },
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: '#F1F1F5',
  },
  headerContainer: {
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 6,
  },
  textContent: {
    flex: 1,
  },
  fab: {
    flexDirection: 'row',
    position: 'absolute',
    right: 30,
    bottom: 100,
    width: 90,
    height: 40,
    backgroundColor: '#A30FFA',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    paddingTop: 9,
    paddingRight: 16,
    paddingBottom: 9,
    paddingLeft: 16,
  },
  fabIcon: {
    width: 16,
    height: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingTop: 19,
    paddingLeft: 16,
    paddingBottom: 19,
    paddingRight: 16,
    marginBottom: 10,
    width: '100%',
    height: 100,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 10,
  },
  textStyle: {
    color: '#767676',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 28,
  },
  textStyle2: {
    color: '#A30FFA',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  mainText: {
    color: '#111',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  subText: {
    color: '#767676',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    marginLeft: 12,
  },
});

export default InfoWrite;
