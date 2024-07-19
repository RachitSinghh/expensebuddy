import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAwareScrollView,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors} from '../theme';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../components/loading';
import {setUserLoading} from '../redux/slices/user';

export default function SignInScreen() {
  const [email, setEmail] = useState(''); // this will give us the place and will also allow us to set place
  const [password, setPassword] = useState('');

  const {userLoading} = useSelector(state => state.user);
  // this gives us the root state and we can pick the user's loading from user slice

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    // method that will help us to add the trip
    // this will trigger when user clicks on add trip
    if (email && password) {
      //good to go
      // navigation.goBack();
      // navigation.navigate('Home');
      try {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false));
      } catch (e) {
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: e.message,
          backgroundColor: 'red',
        });
      }
    } else {
      //show error
      Snackbar.show({
        text: 'Email and Password are required',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full">
        <View behavior="padding" className=" flex">
          <View className="relative mt-1 ml-2">
            <View className="absolute top-0 left-0 z-10">
              <BackButton />
            </View>
            <Text
              className={`${colors.heading} text-xl font-bold text-center mr-2 text-black`}>
              {' '}
              Sign In
            </Text>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-80 w-80"
              source={require('../assets/images/login.png')}
            />
          </View>
          <View className="space-y-2 mx-4">
            <Text className={`${colors.heading} text-xl font-bold text-black`}>
              Sign In{' '}
            </Text>
            <TextInput
              value={email}
              onChangeText={value => setEmail(value)}
              className="p-4 bg-white text-black rounded-full mb-3"
            />
            {/* onChangeText will be triggered every time user adds a text in the input  */}
            <Text className={`${colors.heading} text-xl font-bold text-black`}>
              Password{' '}
            </Text>
            <TextInput
              value={password}
              onChangeText={value => setPassword(value)}
              secureTextEntry
              className="p-4 bg-white text-black rounded-full mb-3"
            />
          </View>
          <TouchableOpacity className="text-black flex-row justify-end">
            <Text className="text-black mx-6 mt-2">Forget password? </Text>
          </TouchableOpacity>
        </View>

        <View>
          {
            // this check if the user is signing in
            userLoading ? (
              <Loading />
            ) : (
              <TouchableOpacity
                onPress={handleSubmit}
                style={{backgroundColor: colors.button}}
                className="my-6 rounded-full p-3 shadow-sm mx-2">
                <Text className="text-center text-white text-lg font-bold">
                  Sign In{' '}
                </Text>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
    </ScreenWrapper>
  );
}
