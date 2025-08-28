import CartButton from '@/components/CartButton'
import Filter from '@/components/Filter'
import MenuCard from '@/components/MenuCard'
import SearchBar from '@/components/SearchBar'
import { getCategories, getMenu } from '@/services/appwrite'
import useAppwrite from '@/services/useAppWrite'
import { MenuItem } from '@/type'
import cn from 'clsx'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = () => {
  const { category, query } = useLocalSearchParams<{
    category: string
    query: string
  }>()
  const { data, loading, refetch } = useAppwrite({
    fn: getMenu,
    params: {
      category,
      query,
      limit: 6
    }
  })

  const { data: categories } = useAppwrite({ fn: getCategories })
 
  useEffect(() => {
    refetch({ category, query, limit: 6 })
  }, [category, query])

  return (
    <SafeAreaView className='bg-white h-full'>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstInRow = index % 2 === 0;
          return (
          <View className={cn('flex-1 max-w-[48%]', isFirstInRow ? 'mt-0' : 'mt-10')}>
            <MenuCard item={item as unknown as MenuItem} />
          </View>
        )}}
        
        keyExtractor={item => item.$id}
        numColumns={2}
        columnWrapperClassName={'gap-6'}
        contentContainerClassName={'gap-6 px-5 pb-32'}
        ListHeaderComponent={() => (
          <View className='my-5 gap-5'>
            <View className='flex-row justify-between w-full'>
              <View className='flex items-start justify-center'>
                <Text className='small-bold uppercase text-primary'>
                  search
                </Text>
                <View className='flex-row items-start justify-center gap-x-1 mt-0.5'>
                  <Text className='paragraph-semibold text-dark-100'>
                    Find your favorite food
                  </Text>
                </View>
              </View>
              <View className='self-end'>
                <CartButton />
              </View>
            </View>
            <SearchBar />
            <Filter />
          </View>
        )}
        ListEmptyComponent={() =>
          !loading ? (
            <View className='flex-1 items-center justify-center mt-10'>
              <Text className='text-3xl paragraph text-dark-100'>
                No items found!
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  )
}

export default Search
