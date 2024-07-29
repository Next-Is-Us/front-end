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

const NewWrite = () => {
  const navigation = useNavigation();
  const { addPost } = usePosts();
  const [titleText, setTitleText] = useState('');
  const [contentText, setContentText] = useState('');
  const [images, setImages] = useState([]);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);

  const handleSubmit = () => {
    const newPost = {
      id: String(new Date().getTime()),
      title: titleText,
      content: contentText,
      imageUri: images[0] || null,
    };
    addPost(newPost);
    navigation.goBack();
  };

  const handleTitleChange = (text) => {
    setTitleText(text);
  };

  const handleContentChange = (text) => {
    setContentText(text);
  };

  const maxLengthTitle = 20;
  const maxLengthContent = 500;

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled && result.assets) {
        console.log('Selected image URI: ', result.assets[0].uri);

        setImages([...images, result.assets[0].uri]);
      }
    } catch (error) {
      console.error('Image Picker Error: ', error);
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
          showsHorizontalScrollIndicator={false}
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
              <Text style={styles.title}>새 글쓰기</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>작성하기</Text>
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
                <Text style={styles.ImageP}>이미지 업로드</Text>
                <Text style={styles.select}>
                  이미지는 최대 10장까지 업로드 가능합니다
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.BlankContainer}
              >
                <TouchableOpacity onPress={pickImage} style={styles.plusButton}>
                  <Text style={styles.addImageText}>+</Text>
                </TouchableOpacity>

                {images.map((uri, index) => (
                  <View key={index} style={styles.plusButton}>
                    <Image source={{ uri: uri }} style={styles.imagePreview} />
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EC',
    backgroundColor: '#F7F7FB',
    marginRight: 8,
  },
  BlankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextContainer: {
    flexDirection: 'column',
    gap: 4,
    marginBottom: 12,
  },
  select: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.35,
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
    height: 512,
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

export default NewWrite;
