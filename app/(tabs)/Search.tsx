import { getCategories, getMenu } from '@/services/appwrite'
import useAppwrite from '@/services/useAppWrite'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const Search = () => {
  const {category,query}= useLocalSearchParams<{category:string,query:string}>()
  const {data, loading, refetch} = useAppwrite({
    fn: getMenu, params: {
      category,
      query,
      limit:6,
     
    },
  })

  const {data: categories} = useAppwrite({fn: getCategories})

  useEffect(() => {
    refetch({category, query, limit:6})
  }, [category, query])

  return (
    <SafeAreaView>
      <Text>Search</Text>
      
    </SafeAreaView>
  )
}

export default Search