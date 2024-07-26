import IntroCompo from '../components/IntroCompo';
import RecordPhoneShadow from '../assets/images/recordphoneshadow.png';
import { useNavigation } from '@react-navigation/native';

const IntroRecord = () => {
  const navigation = useNavigation();

  return (
    <>
      <IntroCompo
        title="매일의 기록"
        details={[
          '엄마는 매일의 상태를 기록하고,',
          '자녀는 엄마의 상태를 확인해요',
        ]}
        image={RecordPhoneShadow}
        onPress={() => navigation.navigate('DailyRecord')}
      />
    </>
  );
};

export default IntroRecord;
