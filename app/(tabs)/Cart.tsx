import CustomerHeader from '@/components/CustomHeader'
import { useCartStore } from '@/store/cart.store'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Cart = () => {
  const { items, getTotalPrice, getTotalItems } = useCartStore()
  const totalItems: number = getTotalItems()
  const totalPrice: number = getTotalPrice()
  return (
    <SafeAreaView className='bg-white h-full'>
      <FlatList
        data={items}
        renderItem={({ item }) => <Text>Cart Item</Text>}
        keyExtractor={item => item.id}
        contentContainerClassName='pb-28 px-5 pt-5'
        ListHeaderComponent={() => <CustomerHeader title='Your Cart' />}
        ListEmptyComponent={() => <Text className='text-center text-dark-100 font-quicksand-medium'>Your cart is empty</Text>}
        ListFooterComponent={() => totalItems > 0 && (
          <View className='gap-5'>
            <View className='mt-6 border border-gray-200 p-5 rounded-2xl'>
              <Text className='h3-bold text-dark-100 mb-5'>Payment Summary</Text>
              <Text className='text-base font-quicksand-medium text-dark-100'>{totalItems}</Text>
            </View>
            <View className='flex flex-row justify-between'>
              <Text className='text-base font-quicksand-medium text-dark-100'>Total Price</Text>)}  
              <Text className='text-base font-quicksand-medium text-dark-100'>${totalPrice}</Text>  
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Cart
