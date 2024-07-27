import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';

import Checkbox from '../assets/images/checkbox.svg';
import PurpleCheckbox from '../assets/images/purple_check.svg';
import Allow from '../assets/images/rightallow.svg';

const screenHeight = Dimensions.get('window').height;

const TermsModal = ({ isVisible, onClose }) => {
  const [checkboxStates, setCheckboxStates] = useState({
    all: false,
    age: false,
    serviceTerms: false,
    privacyPolicy: false,
    sensitiveInfo: false,
    marketing: false,
  });

  const [buttonColor, setButtonColor] = useState('rgba(163, 15, 250, 0.15)'); // Default color

  // Toggle individual checkbox
  const toggleCheckbox = (key) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };

  // Toggle all checkboxes between checked and unchecked
  const handleAgreeAll = () => {
    const allChecked = Object.values(checkboxStates).every(Boolean);
    setCheckboxStates({
      all: !allChecked,
      age: !allChecked,
      serviceTerms: !allChecked,
      privacyPolicy: !allChecked,
      sensitiveInfo: !allChecked,
      marketing: !allChecked,
    });
  };

  // Check if all required checkboxes are checked
  const areRequiredCheckboxesChecked = () => {
    return (
      checkboxStates.age &&
      checkboxStates.serviceTerms &&
      checkboxStates.privacyPolicy &&
      checkboxStates.sensitiveInfo
    );
  };

  useEffect(() => {
    if (areRequiredCheckboxesChecked()) {
      setButtonColor('#a30ffa'); // Set color to purple when all required checkboxes are checked
    } else {
      setButtonColor('rgba(163, 15, 250, 0.15)'); // Default color
    }
  }, [checkboxStates]);

  const renderCheckbox = (key) => {
    const isChecked = checkboxStates[key];
    return isChecked ? <PurpleCheckbox /> : <Checkbox />;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.notice}>
            <Text style={styles.modalTitle}>약관에 동의해주세요</Text>
            <Text style={styles.protect}>
              여러분의 소중한 개인정보는 안전하게 지켜드립니다
            </Text>
          </View>

          <View style={styles.agree}>
            <View style={styles.row}>
              <TouchableOpacity onPress={handleAgreeAll}>
                {renderCheckbox('all')}
              </TouchableOpacity>
              <View style={styles.agreementTexts}>
                <Text style={styles.agreetext}>모두 동의</Text>
                <Text style={styles.agreedetail}>
                  서비스 이용을 위해 아래의 약관을 모두 동의합니다
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.line} />

          <View style={styles.agrees}>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => toggleCheckbox('age')}>
                {renderCheckbox('age')}
              </TouchableOpacity>
              <Text style={styles.agreetexts}>(필수) 만 14세 이상입니다.</Text>
              <View style={styles.iconContainer}>
                <Allow />
              </View>
            </View>
          </View>

          <View style={styles.agrees}>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => toggleCheckbox('serviceTerms')}>
                {renderCheckbox('serviceTerms')}
              </TouchableOpacity>
              <Text style={styles.agreetexts}>(필수) 서비스 이용약관 동의</Text>
              <View style={styles.iconContainer}>
                <Allow />
              </View>
            </View>
          </View>

          <View style={styles.agrees}>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => toggleCheckbox('privacyPolicy')}>
                {renderCheckbox('privacyPolicy')}
              </TouchableOpacity>
              <Text style={styles.agreetexts}>
                (필수) 개인정보 처리방침 동의
              </Text>
              <View style={styles.iconContainer}>
                <Allow />
              </View>
            </View>
          </View>

          <View style={styles.agrees}>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => toggleCheckbox('sensitiveInfo')}>
                {renderCheckbox('sensitiveInfo')}
              </TouchableOpacity>
              <Text style={styles.agreetexts}>
                (필수) 민감정보이용 및 약관 동의
              </Text>
              <View style={styles.iconContainer}>
                <Allow />
              </View>
            </View>
          </View>

          <View style={styles.agrees}>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => toggleCheckbox('marketing')}>
                {renderCheckbox('marketing')}
              </TouchableOpacity>
              <Text style={styles.agreetexts}>(선택) 마케팅 수신 동의</Text>
              <View style={styles.iconContainer}>
                <Allow />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonColor }]}
          >
            <Text style={styles.buttontext}>가입 완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
  buttontext: {
    fontSize: 16,
    fontStyle: 'normal',
    fontFamily: 'Pretendard',
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#FFF',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingTop: 14,
    paddingRight: 16,
    paddingBottom: 14,
    paddingLeft: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(163, 15, 250, 0.15)',
    height: 52,
    marginTop: 29,
  },
  agreetexts: {
    marginLeft: 12,
    fontSize: 16,
    fontStyle: 'normal',
    fontFamily: 'Pretendard',
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#000',
  },
  notice: {
    paddingTop: 27,
    paddingLeft: 16,
    paddingRight: 32,
  },
  agrees: {
    padding: 16,
  },
  line: {
    height: 1,
    alignSelf: 'stretch',
    borderRadius: 10,
    backgroundColor: '#F1F1F5',
    marginBottom: 8,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  agreementTexts: {
    flex: 1,
    marginLeft: 12,
    flexDirection: 'column',
  },
  agreedetail: {
    fontSize: 12,
    fontStyle: 'normal',
    fontFamily: 'Pretendard',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.3,
    color: '#767676',
  },
  agreetext: {
    fontSize: 16,
    fontStyle: 'normal',
    fontFamily: 'Pretendard',
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agree: {
    marginTop: 20,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 39,
    marginBottom: 8,
    paddingLeft: 16,
    flexDirection: 'column',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    height: 620,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontStyle: 'normal',
    fontFamily: 'Pretendard',
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.5,
    color: '#000',
  },
  protect: {
    fontSize: 14,
    fontStyle: 'normal',
    fontFamily: 'Pretendard',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.35,
    color: '#767676',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
});

export default TermsModal;
