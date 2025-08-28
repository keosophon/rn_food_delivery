import { MenuItem } from '@/type';
import React from 'react';
import { Image, Platform, Text, TouchableOpacity } from 'react-native';


const MenuCard = ({ item: { image_url, name, price } }: { item: MenuItem }) => {
 console.log(image_url);
  return (
    <TouchableOpacity className='relative py-9 px-3.5 pt-24 flex items-center justify-end bg-white shadow-md shadow-black/10 rounded-3xl' style={Platform.OS === 'ios' ? { } : { elevation:10, shadowColor: '##878787' }}    >
      <Image
        source={{ uri: image_url }}
        className='size-32 absolute -top-10'
        resizeMode='contain'
      />
      <Text
        className='text-center text-lg font-quicksand-bold !important text-dark-100 mb-2'
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text className='body-regular text-gray-800 mb-4'>From ${price}</Text>
      <TouchableOpacity
        onPress={() => {}}
        className='bg-gray-100 rounded-lg py-2 px-4'
      >
        <Text className='text-center text-base font-quicksand-bold text-primary'>
          Add to Cart +
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default MenuCard
