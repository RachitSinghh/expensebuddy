import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <View className="h-full flex justify-around">
        <View className="flex-row justify-center mt-10">
            <Image source={require("../assets/images/welcome.gif")}/>
        </View>
        <View className="mx-5 mb-20">
            <Text style={{fontSize:40,fontWeight:'condensedBold'}} className={`${colors.heading} text-center text-black  text-4xl mb-10`}>ExpenseBuddy </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} className="shadow p-4 rounded-full mb-5" style={{backgroundColor: colors.button}}>
                <Text style={{fontWeight:'bold'}} className="text-center text-white text-lg font-bold" >Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="shadow p-4 rounded-full" style={{backgroundColor: colors.button}}>
                <Text style={{fontWeight:'bold'}} className="text-center text-white text-lg font-bold" >Sign Up</Text>
            </TouchableOpacity>
        
        </View>
        

      </View>
    </ScreenWrapper>
  );
}
