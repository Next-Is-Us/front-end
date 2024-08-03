import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import HeaderBack from '../components/HeaderBack';
import { useEffect, useState } from 'react';
import FamilyMember from '../components/FamilyMember';
// import Footer from '../assets/images/footers.svg';
import Footers from '../assets/images/footerpng.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Clipboard } from 'react-native';

const familyMemberDummyData = [{ name: '김지은' }, { name: '박제준' }];

export default function MyPageScreen({ route }) {
  const name = route.params.userName;
  const [familyCount, setFamilyCount] = useState();
  const [familyList, setFamilyList] = useState([]);
  // const [token, setToken] = useState("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImF1dGgiOlsiUk9MRV9NT00iXSwiaWF0IjoxNzIyNDE0MTQzLCJleHAiOjE3MjUwMDYxNDN9.5zi_P7WsX7GYY5o6pXqxvbV5V_j8F80e-1vtl1Ny3eE"); // 엄마 더미데이터임
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMSIsImF1dGgiOlsiUk9MRV9TT04iXSwiaWF0IjoxNzIyNTc0NzczLCJleHAiOjE3MjUxNjY3NzN9.iTe1AfZp7C4PmZu-9bwdT9qWicgujP3pQo_LZ8BeEYk'); // 자식 더미데이터임 
  const [link, setLink] = useState('www.todays.mom');

  const getToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if(accessToken) {
        setToken(accessToken);
      } else {
        console.log("Not found");
      }
    } catch(e) {
      console.error(e);
    }
  }

  const getLink = async () => {
    try {
      const response = await axios.get("https://15.164.134.131/api/myPage/link", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(response.data);
      setLink(response.data.data.link);
    } catch(e) {
      console.error(e);
    }
  }

  const getFamilyInfo = async () => {
    try {
      const response  = await axios.get("https://15.164.134.131/api/myPage/familyInformation", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(response.data);
      setFamilyCount(response.data.data.length);
      setFamilyList(response.data.data);
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    // getToken();
    if(token) {
      getLink();
      getFamilyInfo();
    }
  }, [token]);

  // const copyHandler = async () => {
  //   try {
  //     await Clipboard.writeText(link);
  //   } catch(e) {
  //     console.error(e);
  //   }
  // }

  return (
    <View style={styles.rootScreen}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.screen}>
          <HeaderBack white />
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeText}>
              <Text style={styles.nameText}>{name}</Text>님
            </Text>
            <Text style={styles.welcomeText}>오늘도 좋은 하루 보내세요!</Text>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.connectedFamilyContainer}>
              <View style={styles.connectedFamilyTextContainer}>
                <Text style={styles.connectedFamilyText}>나와 연결된 가족</Text>
                <Text style={styles.familyCountText}>{familyCount}명</Text>
              </View>
              {familyList.map((member, index) => {
                return <FamilyMember memberName={member.nickname} key={index} />;
              })}
            </View>
            <View style={styles.inviteTextContainer}>
              <Text style={styles.inviteLinkText}>초대 링크</Text>
              <Text style={styles.inviteDetailText}>
                추가하고 싶은 자녀분에게 링크를 전달해보세요!
              </Text>
            </View>
          </View>
          <View style={styles.inviteLinkContainer}>
            <View style={styles.inviteLinkTextContainer}>
              <Text style={styles.inviteLink} numberOfLines={1}>{link}</Text>
              <TouchableOpacity style={styles.copyButton}>
                <Text style={styles.copyButtonText}>복사</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.imagecon}>
            <Image
              source={require('../assets/images/footerpng.png')}
              style={styles.footers}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  imagecon: {
    marginTop: 216,
  },
  footers: {
    width: 360,
    height: 330,
  },
  rootScreen: {
    flex: 1,
  },
  // safe: {
  //   flex: 1,
  // },
  screen: {
    backgroundColor: '#A30FFA',
    paddingHorizontal: 20,
    height: 214,
  },
  welcomeTextContainer: {
    marginTop: 12,
  },
  welcomeText: {
    color: 'white',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 28,
  },
  nameText: {
    color: 'white',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '600',
  },
  contentContainer: {
    gap: 32,
  },
  connectedFamilyContainer: {
    borderRadius: 24,
    padding: 20,
    marginTop: 32,
    backgroundColor: 'white',
    gap: 20,
  },
  connectedFamilyTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  connectedFamilyText: {
    color: '#767676',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  familyCountText: {
    color: '#A30FFA',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  inviteTextContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginLeft: 4,
  },
  inviteLinkText: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  inviteDetailText: {
    color: '#767676',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  inviteLinkContainer: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    marginTop: 9,
  },
  inviteLinkTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: "100%"
  },
  inviteLink: {
    color: 'black',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    // backgroundColor: "blue",
    overflow: "scroll",
    flex: 1
  },
  copyButton: {
    backgroundColor: '#A30FFA',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  copyButtonText: {
    color: 'white',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
  },
});
