import React, { useState } from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { usePosts } from './PostContext';
import Commuflower from '../assets/images/commuflower.svg';
import AllowBottom from '../assets/images/big_bottom.svg';
import { Picker } from '@react-native-picker/picker';
import Plus from '../assets/images/plus.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Commucreate = () => {
  const [imageUri, setImageUri] = useState('');
  const navigation = useNavigation();
  const { addPost } = usePosts();
  const [titleText, setTitleText] = useState('');
  const [contentText, setContentText] = useState('');
  const [images, setImages] = useState([]);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [flowerCount, setFlowerCount] = useState('0개 (무료 입장)');

  const handleSelect = (count) => {
    setFlowerCount(count);
    setIsDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // const handleSubmit = () => {
  //   const newPost = {
  //     id: String(new Date().getTime()),
  //     title: titleText,
  //     content: contentText,
  //     imageUri: images[0] || null,
  //   };
  //   addPost(newPost);
  //   navigation.goBack();
  // };

  const handleTitleChange = (text) => {
    setTitleText(text);
  };

  const handleContentChange = (text) => {
    setContentText(text);
  };

  const maxLengthTitle = 20;
  const maxLengthContent = 500;

  const printFormData = (formData) => {
    for (let [key, value] of formData.entries()) {
      console.log(
        `${key}: ${value instanceof Blob ? `File: ${value.name}` : value}`
      );
    }
  };

  const handleSubmit = async () => {
    // const accessToken = await AsyncStorage.getItem('accessToken');

    const formData = new FormData();
    console.log('Current image URI:', imageUri);

    formData.append('name', titleText);
    formData.append('introduction', contentText);
    const flowerCountNumber = flowerCount.replace(/[^0-9]/g, '');
    formData.append('necessaryNftCount', flowerCountNumber);

    if (imageUri) {
      let uriParts = imageUri.split('.');
      let fileType = uriParts[uriParts.length - 1];

      formData.append('thumbnail', {
        uri: imageUri,
        name: `thumbnail.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      const response = await fetch(
        'https://15.164.134.131/api/doctor/createRoom',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiYXV0aCI6WyJST0xFX0FETUlOIl0sImlhdCI6MTcyMjI5OTg5NCwiZXhwIjoxNzI0ODkxODk0fQ.YJKYS0wRx2MxNNvAbIjvvg10Qtr08YM1W1hneZbCAq4`, // 하드코딩된 토큰 사용
            'Content-Type': 'multipart/form-data',
          }, //관리자 토큰임 나중에 바꿔야함. 테스트용
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log('Room created successfully', result);
        navigation.goBack();
      } else {
        console.error('Failed to create room', result);
      }
    } catch (error) {
      console.error('Error creating room', error);
    }
  };

  const pickImage = async () => {
    try {
      if (images.length >= 1) {
        alert('대표 이미지는 한 개만 업로드할 수 있습니다.');
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled && result.assets) {
        const firstAsset = result.assets[0];
        console.log('Selected image URI:', firstAsset.uri);
        setImageUri(firstAsset.uri);
        setImages([...images, firstAsset.uri]);
      }
    } catch (error) {
      console.error('Image Picker Error:', error);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.leftContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.headerLeft}
              >
                <Image
                  source={require('../assets/images/leftallow.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Text style={styles.title}>새 소통방 개설</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>개설하기</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container2}>
            <View
              style={[
                styles.textcontainer,
                { borderColor: isTitleFocused ? '#A30FFA' : '#e5e5ec' },
              ]}
            >
              <TextInput
                style={styles.input}
                onChangeText={handleTitleChange}
                value={titleText}
                maxLength={maxLengthTitle}
                placeholder="제목을 입력해주세요"
                onFocus={() => setIsTitleFocused(true)}
                onBlur={() => setIsTitleFocused(false)}
              />
              <Text
                style={styles.counterContent}
              >{`${titleText.length}/${maxLengthTitle}`}</Text>
            </View>

            <View
              style={[
                styles.textcontainer2,
                { borderColor: isContentFocused ? '#A30FFA' : '#e5e5ec' },
              ]}
            >
              <TextInput
                style={styles.inputContent}
                onChangeText={handleContentChange}
                value={contentText}
                maxLength={maxLengthContent}
                placeholder="내용을 입력해주세요"
                multiline
                onFocus={() => setIsContentFocused(true)}
                onBlur={() => setIsContentFocused(false)}
              />
              <View style={styles.counterWrapper}>
                <Text
                  style={styles.counterContent}
                >{`${contentText.length}/${maxLengthContent}`}</Text>
              </View>
            </View>

            <View style={styles.ImageContainer}>
              <View style={styles.TextContainer}>
                <Text style={styles.ImageP}>대표 이미지 업로드</Text>
              </View>

              {images.length > 0 ? (
                <View style={styles.plusButton}>
                  <Image
                    source={{ uri: images[0] }}
                    style={styles.imagePreview}
                  />
                </View>
              ) : (
                <TouchableOpacity onPress={pickImage} style={styles.plusButton}>
                  <Text style={styles.addImageText}>+</Text>
                </TouchableOpacity>
              )}

              <View style={[styles.TextContainer, { marginTop: 32 }]}>
                <Text style={styles.ImageP}>소통방 입장 조건</Text>
                <Text style={styles.select}>
                  입장할 회원의 꽃피 개수를 설정해주세요
                </Text>
                <View style={styles.rowcontainer}>
                  <Commuflower />
                  <TouchableOpacity
                    style={styles.flowercount}
                    onPress={toggleDropdown}
                  >
                    <Text style={styles.countenter}>{flowerCount}</Text>
                    <AllowBottom />
                  </TouchableOpacity>
                </View>
                {isDropdownVisible && (
                  <View style={styles.dropdown}>
                    <TouchableOpacity
                      onPress={() => handleSelect('0개 (무료 입장)')}
                    >
                      <Text style={styles.droptext}>0개 (무료 입장)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSelect('1개')}>
                      <Text style={styles.droptext}>1개</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSelect('2개')}>
                      <Text style={styles.droptext}>2개</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSelect('3개')}>
                      <Text style={styles.droptext}>3개</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSelect('4개')}>
                      <Text style={styles.droptext}>4개</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droptext: {
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
    letterSpacing: -0.325,
    color: '#111',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'column',
  },
  dropdown: {
    flexDirection: 'column',
    gap: 18,
    marginLeft: 60,
    height: 180,
    width: 200,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#A30FFA',
    backgroundColor: '#FFF',
    paddingLeft: 16,
    paddingTop: 9,
    paddingBottom: 9,
    paddingRight: 44,
  },
  countenter: {
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.325,
    color: '#111',
  },
  flowercount: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    height: 36,
    paddingTop: 9,
    paddingRight: 16,
    paddingBottom: 9,
    paddingLeft: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E5E5EC',
    backgroundColor: '#FFF',
  },
  rowcontainer: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
    gap: 8,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  addImageText: {
    fontSize: 24,
    color: '#ccc',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  plusButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EC',
    backgroundColor: '#F7F7FB',
    marginRight: 8,
  },
  //   BlankContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     marginBottom: 32,
  //   },
  TextContainer: {
    flexDirection: 'column',
    gap: 4,
    marginBottom: 12,
  },
  select: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.3,
    color: '#767676',
  },
  ImageP: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.35,
    color: '#111',
  },
  ImageContainer: {
    marginTop: 32,
  },
  textcontainer2: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5ec',
    backgroundColor: '#F7F7FB',
    height: 246,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 24,
  },
  counterWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  counterContent: {
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    color: '#767676',
  },
  input: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.35,
    flex: 1,
    textAlignVertical: 'top',
  },
  inputContent: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.35,
    flex: 1,
    textAlignVertical: 'top',
    paddingTop: 0,
  },
  textcontainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5ec',
    backgroundColor: '#F7F7FB',
    height: 48,
    paddingTop: 14,
    paddingRight: 16,
    paddingBottom: 14,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  container2: {
    flexDirection: 'column',
    marginTop: 12,
  },
  safeArea: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 14,
    paddingBottom: 14,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeft: {
    paddingRight: 8,
  },
  icon: {
    width: 25,
    height: 25,
  },
  title: {
    color: '#111',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.5,
  },
  button: {
    backgroundColor: '#A30FFA',
    paddingTop: 7,
    paddingRight: 16,
    paddingBottom: 7,
    paddingLeft: 16,
    borderRadius: 100,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.325,
  },
});

export default Commucreate;
