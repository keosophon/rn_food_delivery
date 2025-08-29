import { Category } from '@/type'
import cn from 'clsx'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, Platform, Text, TouchableOpacity } from 'react-native'


const Filter = ({ categories }: { categories: Category[] }) => {
  const router = useRouter()
  const searchParams = useLocalSearchParams()
  //console.log(searchParams.category)
  const [active, setActive] = useState(searchParams.category || '')

  const handlePress = (id: string) => {
    setActive(id)

    if (id==='all') router.setParams({category: undefined})
    else router.setParams({ category: id })
  }

  const filterData: (Category | { name: string; $id: string })[] = categories
    ? [{ name: 'All', $id: 'all' }, ...categories]
    : [{ name: 'All', $id: 'all' }]

  return (
    <FlatList
      data={filterData}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName='gap-x-2 pb-3'
      keyExtractor={item => item.$id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePress(item.$id)}
          key={item.$id}
          className={cn(
            'px-6 py-3 rounded-full mr-2 shadow-sm shadow-black/10',
            active === item.$id ? 'bg-primary' : 'bg-white'
          )}
          style={
            Platform.OS === 'android'
              ? { elevation: 5, shadowColor: '##878787' }
              : {}
          }
        >
          <Text
            className={cn(
              'text-lg font-quicksand-medium',
              active === item.$id ? 'text-white' : 'text-gray-600'
            )}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  )
}

export default Filter
