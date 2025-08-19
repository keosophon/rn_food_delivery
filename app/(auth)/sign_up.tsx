
import { router } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

const sign_up = () => {
  return (
    <View>
      <Text>sign_up</Text>
      <Button title='sign_up' onPress={() => router.push('/sign_in')}/>
    </View>
  )
}

export default sign_up