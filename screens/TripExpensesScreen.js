import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, { useState,useEffect } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors} from '../theme';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/EmptyList';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import BackButton from '../components/BackButton';
import ExpenseCard from '../components/ExpenseCard';
import { getDocs, query,where } from 'firebase/firestore';
import { expenseRef } from '../config/firebase';

var items = [
  // dumy data
  {
    id: 1,
    title: 'ate Sandwich',
    amount: 4,
    category: 'food'
  },

  {
    id: 2,
    title: 'bought a jacket',
    amount: 50,
    category:'shopping'
  },

  {
    id: 3,
    title: 'watched a movie',
    amount: 100,
    category:'entertainment'
  },
];

export default function TripExpensesScreen(props) {
    const {id,place,country} = props.route.params
    const navigation = useNavigation(); // allows us to navigate to different screens

    const [expenses,setExpenses] = useState([]);
    const isFocused = useIsFocused();

  const fetchExpenses = async () => {
    const q = query(expenseRef, where('tripId', '==', id)); //Where clause this is also method from fireStore let us make a condition so that we can get all the trips from the user
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      // console.log('document: ',doc.data());
      data.push({...doc.data(), id: doc.id});
    });
    setExpenses(data);
  };

    useEffect(() => {
      if(isFocused)
        fetchExpenses();
    }, [isFocused]);



  return (
    <ScreenWrapper className="flex-1 ">
      <View className="px-4">
        <View className="relative mt-1 ml-2">
          <View className="absolute top-2 left-0 z-10">
            <BackButton />
          </View>
          <View>
          <Text
            className={`${colors.heading} text-xl font-bold text-center mr-2 text-black`}>
            {place}
          </Text>
          <Text
            className={`${colors.heading} text-xs text-center mr-2 text-black`}>
           {country}
          </Text>
          </View>
        </View>

        <View className="flex-row justify-center item-center rounded-xl mb-1 ">
          <Image
            source={require('../assets/images/7.png')}
            className="w-80 h-80 "
          />
        </View>

        <View className="space-y-2">
          <View className="flex-row justify-between items-center">
            <Text className={`${colors.heading} font-bold text-black text-xl`}>
                Expenses 
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddExpense',{id, place, country})}>
              <Text className="p-2 px-3 bg-white border-gray-200 text-black rounded-full">
                Add Expense{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 430}}>
            <FlatList // flatlist is used for render the data
              data={expenses}
             
              ListEmptyComponent={
                <EmptyList message={"You haven't recorded any expense yet"} />
              }W
              keyExtractor={item => item.id} // all the trips have unique id and in react native when we loop through an array we need to specify the id a key for eacah item so we have this key extractor property on flastlist
              showsVerticalScrollIndicator={false}
              className="mx-1"
              renderItem={({item}) => {
                // we will recieve am item from array in this call back function
                return (
                  <ExpenseCard item={item}/>
                );
              }}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
