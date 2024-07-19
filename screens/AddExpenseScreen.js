import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors} from '../theme';
import BackButton from '../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import { categories } from '../constants';
import Snackbar from 'react-native-snackbar';
import { addDoc } from 'firebase/firestore';
import { expenseRef } from '../config/firebase';
import Loading from '../components/loading';

export default function AddExpenseScreen(props) {

  let {id} = props.route.params;
  const [title, setTitle] = useState(''); // this will give us the place and will also allow us to set place
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleAddExpense = async () => {
    // method that will help us to add the trip
    // this will trigger when user clicks on add trip
    if (title && amount && category) {
      //good to go
      // navigation.goBack();
      setLoading(true)
      let doc = await addDoc(expenseRef,{
        title,
        amount,
        category,
        tripId: id
      })
      setLoading(false)
      if(doc && doc.id) navigation.goBack();
    } else {
      //show error
      Snackbar.show({
        text:"Please all the field are required",
        backgroundColor:"red"
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
              Add Expense
            </Text>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-72 w-72"
              source={require('../assets/images/expenseBanner.png')}
            />
          </View>
          <View className="space-y-2 mx-4">
            <Text className={`${colors.heading} text-xl font-bold text-black`}>
              For What?{' '}
            </Text>
            <TextInput
              value={title}
              onChangeText={value => setTitle(value)}
              className="p-4 bg-white text-black rounded-full mb-3"
            />
            {/* onChangeText will be triggered every time user adds a text in the input  */}
            <Text className={`${colors.heading} text-xl font-bold text-black`}>
              How Much?{' '}
            </Text>
            <TextInput
              value={amount}
              onChangeText={value => setAmount(value)}
              className="p-4 bg-white text-black rounded-full mb-3"
            />
          </View>
          <View className="mx-2 space-x-2">
            <Text className="text-black text-lg font-semibold">Category</Text>
            <View className="flex-row flex-wrap items-center">
              {
                categories.map(cat =>{
                  let bgColor = 'bg-white';
                if (cat.value == category) bgColor = 'bg-green-200';
                return (
                  <TouchableOpacity
                    onPress={() => setCategory(cat.value)}
                    key={cat.value}
                    className={`rounded-full ${bgColor} px-4 p-3 mb-2 mr-2`}>
                    <Text className="text-black">{cat.title} </Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
        </View>

        <View>
          {
            loading ? (<Loading />
          ):(

          <TouchableOpacity
            onPress={handleAddExpense}
            style={{backgroundColor: colors.button}}
            className="my-6 rounded-full p-3 shadow-sm mx-2">
            <Text className="text-center text-white text-lg font-bold">
              Add Expense{' '}
            </Text>
          </TouchableOpacity>
          )
          }
        </View>
      </View>
    </ScreenWrapper>
  );
}
