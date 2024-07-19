import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
// import LoginScreen from '../screens/LoginScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../redux/slices/user';
import { auth } from '../config/firebase';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {

  /**
   * we need to use the user value here and to use that we will need to use the selector
   * hook basically give us the root state of the store and using that we can get any value from any reducer we want
   * 
   */

  const user = useSelector(state => state.user.user) 
  // we can use the user slice object and we can get user value from the the user.js reducer

  const dispatch = useDispatch() // this will set the user in redux store
  
  onAuthStateChanged(auth , u=>{
    if(user !== null){
      console.log('got user: ', u);
      dispatch(setUser(u))
    }
  })

  // const unsubcribe = onAuthStateChanged(auth , u=>{
  //   console.log('got user: ', u);
  //   dispatch(setUser(u))
  // }).catch((error) =>{
  //   console.log("Error with onAuthStateChanged: ",error);
  // }) ;

  // return() => unsubcribe()

  
  
  // this will set the user into our redux state and whenever that happens we will be navigated to the home screen


  if(user){
    // if the user is present it means user is logged in then we don't need the sign in and sign up screen
    return (
      <NavigationContainer>
        
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="AddTrip"
            component={AddTripScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="AddExpense"
            component={AddExpenseScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="TripExpense"
            component={TripExpensesScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  
  }else{
    return (
      <NavigationContainer>
        
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen options={{headerShown: false}}
            name="SignIn"
            component={SignInScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="SignUp"
            component={SignUpScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Welcome"
            component={WelcomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  
  }

}
