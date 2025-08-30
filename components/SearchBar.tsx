import { images } from '@/constants'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Image, TextInput, TouchableOpacity, View } from 'react-native'

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A search bar component that allows users to search for items.
 * The search query is stored in the URL query parameter as `query`.
 * When the user submits the form, the query is updated in the URL.
 * If the user clears the search query, the `query` parameter is removed.
 */
/*******  654d02b5-d33c-4465-a18f-70ffb3a6b5ae  *******/
const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string }>()
  const [query, setQuery] = useState(params.query)

  const handleChange = (text: string) => {
    setQuery(text)
    if (!text) {
      router.setParams({ query: undefined })
    }
  }

  const handleSubmit = () => {
    if (query?.trim()) {
      router.setParams({ query })
    }
  }
    return (
      <View className='relative flex flex-row items-center justify-center w-full bg-white shadow-md shadow-black/10 rounded-full  font-quicksand-medium text-dark-100 gap-5'>
        <TextInput
          className='flex-1 p-5'
          placeholder='Search for pizzas, burgers...'
          value={query}
          onChangeText={text => handleChange(text)}
          onSubmitEditing={handleSubmit}
          returnKeyType='search'
          placeholderTextColor={'#A0A0A0'}
        />

        <TouchableOpacity className='pr-5' onPress={() => {router.setParams({ query })}}>
          <Image
            source={images.search}
            className='size-6'
            resizeMode='contain'
            tintColor='#5D5F6D'
          />
        </TouchableOpacity>
      </View>
    )
  }


export default SearchBar
