import React from 'react'
import { Button, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import seed from '../../services/seed'

const Search = () => {
  return (
    <SafeAreaView>
      <Text>Search</Text>
      <Button title='Seed' onPress={() => seed().then(() => console.log('seeded')).catch(console.error)} />
    </SafeAreaView>
  )
}

export default Search