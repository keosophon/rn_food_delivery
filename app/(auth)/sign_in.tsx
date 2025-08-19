import React from 'react'
import { Button, Text, View } from 'react-native'

import { router } from 'expo-router'

const sign_in = () => {
  return (
    <View>
      <Text>sign_in</Text>
      <Button title='sign_in' onPress={() => router.push('/sign_up')}/>
    </View>
  )
}

export default sign_in