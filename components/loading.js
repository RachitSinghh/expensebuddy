import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../theme'

export default function Loading() {
  return (
    <View className="flow-row justify-center py-8">
        <ActivityIndicator size="large" color={colors.button} />
    </View>
  )
}