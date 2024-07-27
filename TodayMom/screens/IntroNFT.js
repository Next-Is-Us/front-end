import IntroCompo from '../components/IntroCompo';
import { useNavigation } from '@react-navigation/native';
import IntroImage from '../assets/images/intronft.png';

const IntroNFT = () => {
  const navigation = useNavigation();

  return (
    <>
      <IntroCompo
        title="꽃피 NFT"
        details={['갱년기 시기 기록을', '디지털 의료 보증서로 변환']}
        image={IntroImage}
        onPress={() => navigation.navigate('Introcom')}
        indicatorOrder={['one', 'purple', 'one']}
      />
    </>
  );
};

export default IntroNFT;
