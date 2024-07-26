import IntroCompo from '../components/IntroCompo';
import { useNavigation } from '@react-navigation/native';
import IntroImage from '../assets/images/Introcom.png';

const Introcom = () => {
  const navigation = useNavigation();

  return (
    <>
      <IntroCompo
        title="커뮤니티"
        details={['전문가의 큐레이션이 담긴', '갱년기 시기 영양/건강 정보']}
        image={IntroImage}
        onPress={() => navigation.navigate('DailyRecord')}
      />
    </>
  );
};

export default Introcom;
