import {
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from 'react-native';
import { Buffer } from 'buffer';
import WebView from 'react-native-webview';
import HeaderBack from '../components/HeaderBack';
import Loading from '../assets/images/loading.svg';
import { useEffect, useRef, useState, useCallback } from 'react';
import BottomButton from '../components/BottomButton';
import PDFLogo from '../assets/images/pdfImg.svg';
import InactiveExportIcon from '../assets/images/export_inactive.svg';
import ActiveExportIcon from '../assets/images/export_active.svg';
import jsPDF from 'jspdf';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createPDFDocument } from '../components/createPDFDocument';
// import RNFS from 'react-native-fs';
// import FileViewer from 'react-native-file-viewer';

export default function RecordChangeScreen({ navigation, route }) {
  const [complete, setComplete] = useState(true);
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const [userMail, setUserMail] = useState('');
  const [validType, setValidType] = useState(false);
  const emailRegEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const pdfData = route.params.pdfData;
  const [pdfBase64, setPdfBase64] = useState('');
  const [pdfUri, setPdfUri] = useState('');
  const [pdfCreated, setPdfCreated] = useState(false);
  const [pdfError, setPdfError] = useState('');

  const createPDFDocument = (data) => {
    const doc = new jsPDF();
    const headers = [
      '연도',
      '월',
      '일',
      '수면 시간',
      '홍조 여부',
      '두통 여부',
      '복통 여부',
      '변비 여부',
      '근육통 여부',
      '피부 문제',
      '감각 이상',
      '오한',
      '우울증',
      '기록',
    ];

    // 제목과 헤더 추가
    doc.setFontSize(18);
    doc.text('건강 기록', 14, 22);
    doc.setFontSize(12);
    headers.forEach((header, index) => {
      doc.text(header, 14 + index * 12, 40);
    });

    // 데이터 추가
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        const startY = 50 + index * 10;
        doc.text(item.year.toString(), 14, startY);
        doc.text(item.month.toString(), 26, startY);
        doc.text(item.day.toString(), 38, startY);
        doc.text(item.sleepTime, 50, startY);
        doc.text(item.isBlushing ? '예' : '아니오', 62, startY);
        doc.text(item.isHeadache ? '예' : '아니오', 74, startY);
        doc.text(item.isStomachache ? '예' : '아니오', 86, startY);
        doc.text(item.isConstipated ? '예' : '아니오', 98, startY);
        doc.text(item.isMusclePainful ? '예' : '아니오', 110, startY);
        doc.text(item.isSkinTroubled ? '예' : '아니오', 122, startY);
        doc.text(item.isNumbness ? '예' : '아니오', 134, startY);
        doc.text(item.isChilled ? '예' : '아니오', 146, startY);
        doc.text(item.isDepressed ? '예' : '아니오', 158, startY);
        doc.text(item.record, 170, startY, { maxWidth: 180 });
      });
    } else {
      const startY = 50;
      doc.text('데이터가 없습니다.', 14, startY);
    }

    // Base64 인코딩된 PDF 데이터 반환
    return doc.output('datauristring');
  };

  // PDF 생성 및 전송 함수
  const createAndSendPDF = async (pdfData) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const pdfBase64 = createPDFDocument(pdfData);

    const base64Data = pdfBase64.split(',')[1];
    console.log('Generated PDF Base64:', base64Data);

    const formData = new FormData();
    formData.append('pdfFile', {
      uri: `data:application/pdf;base64,${base64Data}`,
      name: 'report.pdf',
      type: 'application/pdf',
    });

    console.log('FormData:', formData);

    const url = 'https://15.164.134.131/api/healthRecord/savePdf';

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('PDF successfully uploaded:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Config:', error.config);
    }
  };

  useEffect(() => {
    console.log(pdfData.length);
    console.log('new Page');
  }, []);

  // useEffect(() => {
  //   if (route.params?.pdfData) {
  //     const generatedPDF = createPDFDocument(route.params.pdfData);
  //     // Base64 데이터만 추출하여 형식을 확인합니다.
  //     const base64String = generatedPDF.split('base64,')[1];
  //     if (base64String) {
  //       setPdfUri(`data:application/pdf;base64,${base64String.trim()}`);
  //     } else {
  //       console.error('PDF 생성 실패: 유효한 Base64 데이터가 없습니다.');
  //     }
  //   }
  // }, [route.params?.pdfData]);

  const userInputHandler = (enteredText) => {
    setUserMail(enteredText);
    if (emailRegEx.test(enteredText)) {
      setValidType(true);
    } else {
      setValidType(false);
    }
  };

  let detailText;
  if (!validType && userMail.length > 0) {
    detailText = (
      <Text style={styles.errorText}>올바르지 않은 이메일입니다.</Text>
    );
  } else {
    detailText = (
      <Text style={styles.userInputDetailText}>
        꽃피 의료기록을 보낼 이메일을 입력해주세요!
      </Text>
    );
  }

  const homeHandler = () => {
    complete && navigation.navigate('MomHome');
  };

  useEffect(() => {
    !complete &&
      Animated.loop(
        Animated.timing(rotateAnimation, {
          toValue: 1,
          duration: 2500,
          delay: 100,
          useNativeDriver: true,
        })
      ).start();
  }, [complete]);

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return complete ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <HeaderBack />
        <KeyboardAvoidingView behavior="position" style={styles.testContainer}>
          <Text style={[styles.changingText, styles.completeText]}>
            꽃피 의료 기록 변환 완료
          </Text>
          <View style={styles.loadingContainer}>
            <PDFLogo />
          </View>
          <View style={styles.userInputTextContainer}>
            <View style={styles.userInputContainer}>
              {userMail.length > 0 ? (
                <ActiveExportIcon />
              ) : (
                <InactiveExportIcon />
              )}
              <TextInput
                style={styles.userInput}
                placeholder="today_mom@naver.com"
                autoCapitalize="none"
                onChangeText={userInputHandler}
                keyboardType="email-address"
                value={userMail}
              />
            </View>
            {detailText}
          </View>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              validType && { backgroundColor: '#E25959' },
            ]}
            onPress={createAndSendPDF}
          >
            <Text style={styles.buttonText}>PDF로 보내기</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        {/* </KeyboardAvoidingView> */}
        <BottomButton text="완료" selected handler={homeHandler} />
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <View style={styles.screen}>
      <HeaderBack />
      <Text style={styles.changingText}>꽃피 의료 기록 변환 중</Text>
      <Text style={styles.waitingText}>잠시만 기다려 주세요!</Text>
      <View style={styles.loadingContainer}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Loading />
        </Animated.View>
      </View>
      <BottomButton text="완료" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successText: {
    marginTop: 20,
    color: 'green',
  },
  errorText: {
    marginTop: 20,
    color: 'red',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  completeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  waitingText: {
    fontSize: 16,
    color: 'gray',
  },
  screen: {
    flex: 1,
    paddingHorizontal: 20,
  },
  changingText: {
    color: 'black',
    fontFamily: 'Prentendard',
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 38,
    letterSpacing: -0.7,
    textAlign: 'center',
    marginTop: 100,
  },
  completeText: {
    marginTop: 40,
  },
  waitingText: {
    color: '#767676',
    fontFamily: 'Prentendard',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: -0.4,
    textAlign: 'center',
    marginTop: 12,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 19,
    // backgroundColor: "pink",
    marginLeft: 100,
    marginRight: 60,
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  userInputTextContainer: {
    marginTop: 10,
    gap: 8,
    paddingHorizontal: 18,
  },
  userInputContainer: {
    flexDirection: 'row',
    paddingVertical: 9,
    borderBottomColor: '#E5E5EC',
    borderBottomWidth: 1,
    gap: 4,
  },
  userInput: {
    color: 'black',
  },
  userInputDetailText: {
    color: '#505050',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.3,
  },
  testContainer: {},
  buttonContainer: {
    marginTop: 28,
    borderRadius: 100,
    padding: 18,
    backgroundColor: 'rgba(226, 89, 89, 0.20)',
    alignSelf: 'center',
  },
  buttonText: {
    width: 122,
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: -0.375,
    textAlign: 'center',
  },
  errorText: {
    color: '#DC0000',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.3,
  },
});
