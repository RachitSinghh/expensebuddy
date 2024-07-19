import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors} from '../theme';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/loading';
import Snackbar from 'react-native-snackbar';
import { addDoc } from 'firebase/firestore';
import { tripsRef } from '../config/firebase';
import { useSelector } from 'react-redux';

export default function AddTripScreen() {
  const [place, setPlace] = useState(''); // this will give us the place and will also allow us to set place
  const [country, setCountry] = useState('');

  const [loading, setLoading] = useState(false);
  const {user} = useSelector(state => state.user)

  const navigation = useNavigation();

  const handleAddTrip = async() => {
    // method that will help us to add the trip
    // this will trigger when user clicks on add trip
    if (place && country) {
      //good to go
      // navigation.navigate('Home');
      setLoading(true);
      let doc = await addDoc(tripsRef,{
        place,
        country,
        userId: user.uid // a unique id that every user has
      })
      setLoading(false)
      if(doc && doc.id){ // now we have a document that is created and we need to check if document has an ID then 
        // we need to go back to the home screen 
          navigation.goBack();
      }

    } else {
      //show error
      Snackbar.show({
        text:'Place and country required',
        backgroundColor: 'red'
      })
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full">
        <View>
          <View className="relative mt-1 ml-2">
            <View className="absolute top-0 left-0 z-10">
              <BackButton />
            </View>
            <Text
              className={`${colors.heading} text-xl font-bold text-center mr-2 text-black`}>
              {' '}
              Add Trip
            </Text>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-72 w-72"
              source={require('../assets/images/4.png')}
            />
          </View>
          <View className="space-y-2 mx-4">
            <Text className={`${colors.heading} text-xl font-bold text-black`}>
              Where on earth?{' '}
            </Text>
            <TextInput
              value={place}
              onChangeText={value => setPlace(value)}
              className="p-4 bg-white text-black rounded-full mb-3"
            />
            {/* onChangeText will be triggered every time user adds a text in the input  */}
            <Text className={`${colors.heading} text-xl font-bold text-black`}>
              Which country?{' '}
            </Text>
            <TextInput
              value={country}
              onChangeText={value => setCountry(value)}
              className="p-4 bg-white text-black rounded-full mb-3"
            />
          </View>
        </View>

        <View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleAddTrip}
              style={{backgroundColor: colors.button}}
              className="my-6 rounded-full p-3 shadow-sm mx-2">
              <Text className="text-center text-white text-lg font-bold">
                Add Trip{' '}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
