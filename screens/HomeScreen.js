import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors} from '../theme';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/EmptyList';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import {auth, tripsRef} from '../config/firebase';
import {useSelector} from 'react-redux';
import {getDocs, query, where} from 'firebase/firestore';

var items = [
  // dumy data
  {
    id: 1,
    place: 'Gujrat',
    country: 'India',
  },

  {
    id: 2,
    place: 'London Eye',
    country: 'England',
  },

  {
    id: 3,
    place: 'WashingTon Dc',
    country: 'America',
  },

  {
    id: 4,
    place: 'New york',
    country: 'America',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation(); // allows us to navigate to different screens

  const {user} = useSelector(state => state.user);
  const [trips, setTrips] = useState([]);

  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    const q = query(tripsRef, where('userId', '==', user.uid)); //Where clause this is also method from fireStore let us make a condition so that we can get all the trips from the user
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      // console.log('document: ',doc.data());
      data.push({...doc.data(), id: doc.id});
    });
    setTrips(data);
  };

    useEffect(() => {
      if(isFocused)
          fetchTrips();
    }, [isFocused]);


  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <ScreenWrapper className="flex-1 ">
      <View className="flex-row justify-between items-center p-4">
        <Text
          className={`${colors.heading} font-bold text-black text-3xl shadow-sm`}>
          Expense Buddy
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          className="p-2 px-3 bg-white  border-gray-200 rounded-full">
          <Text className={`${colors.heading} text-black`}>Logout </Text>
        </TouchableOpacity>
      </View>
      <View className="flex justify-content item-center bg-blue-200 rounded-xl mx-4 mb-4 ">
        <Image
          source={require('../assets/images/banner.png')}
          className="w-60 h-60"
        />
      </View>
      <View className="px-4 space-y-2">
        <View className="flex-row justify-between items-center">
          <Text className={`${colors.heading} font-bold text-black text-xl`}>
            Recent Trips
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddTrip')}>
            <Text className="p-2 px-3 bg-white border-gray-200 text-black rounded-full">
              Add Trip{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 430}}>
          <FlatList // flatlist is used for render the data
            data={trips}
            numColumns={2}
            ListEmptyComponent={
              <EmptyList message={"You haven't recorded any trips yet"} />
            }
            keyExtractor={item => item.id} // all the trips have unique id and in react native when we loop through an array we need to specify the id a key for eacah item so we have this key extractor property on flastlist
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            className="mx-1"
            renderItem={({item}) => {
              // we will recieve am item from array in this call back function
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('TripExpense', {...item})}
                  className="bg-white p-3 rounded-2xl mb-3 shadow-sm">
                  <View>
                    <Image source={randomImage()} className="w-36 h-36" />
                    <Text className={`${colors.heading} text-black font-bold`}>
                      {item.place}{' '}
                    </Text>
                    <Text className={`${colors.heading} text-black text-xs`}>
                      {item.country}{' '}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
