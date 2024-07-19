import { View, Text, StatusBar } from 'react-native'
import React from 'react'

export default function ScreenWrapper({children}) {
    let statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight: 30;
  return (
   <View style={{paddingTop: statusBarHeight}}>
    {
    children // this act as a children
    }
   </View>
  )
}

// whenever we wrap a component it will receive a child prop 4
// children will represt all the children component