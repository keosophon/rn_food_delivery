import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { images } from '../constants';

const CartButton = () => {
  const totalItems = 10;
  return (
    <TouchableOpacity className="flex items-center justify-center size-10 rounded-full bg-dark-100" onPress={() => {}}>
      <Image source={images.bag} className="size-5" resizeMode="contain" tintColor={'#000'}/>
      {totalItems > 0 && (
        <Text className="absolute -top-0 -right-1 size-5 bg-primary rounded-full">
          {totalItems}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default CartButton