import CartItem from '@/components/CartItem'
import CustomButton from '@/components/CustomButton'
import CustomerHeader from '@/components/CustomHeader'
import { useCartStore } from '@/store/cart.store'
import { PaymentInfoStripeProps } from '@/type'
import cn from 'clsx'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const PaymentInfoStripe = ({
  label,
  value,
  labelStyle,
  valueStyle
}: PaymentInfoStripeProps) => (
  <View className='flex flex-row justify-between'>
    <Text
      className={cn('text-base font-quicksand-medium text-dark-100 mb-5 ', labelStyle)}
    >
      {label}
    </Text>
    <Text
      className={cn('text-lg font-quicksand-bold text-dark-100', valueStyle)}
    >
      {value}
    </Text>
  </View>
)
const Cart = () => {
  const { items, getTotalPrice, getTotalItems } = useCartStore()
  const totalItems: number = getTotalItems()
  const totalPrice: number = getTotalPrice()
  return (
    <SafeAreaView className='bg-white h-full'>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerClassName='pb-28 px-5 pt-5'
        ListHeaderComponent={() => <CustomerHeader title='Your Cart' />}
        ListEmptyComponent={() => (
          <Text className='text-center text-dark-100 font-quicksand-medium'>
            Your cart is empty
          </Text>
        )}
        ListFooterComponent={() =>
          totalItems > 0 && (
            <View className='gap-5'>
              <View className='mt-6 border border-gray-200 p-5 rounded-2xl'>
                <Text className='text-xl font-quicksand-bold text-dark-100 mb-5'>
                  Payment Summary
                </Text>
                <PaymentInfoStripe
                  label={`Total Items (${totalItems})`}
                  value={`$${totalPrice.toFixed(2)}`}
                />
                <PaymentInfoStripe label='Delivery Fee' value={`$5.00`} />
                <PaymentInfoStripe
                  label='Discount'
                  value={`-$1.00`}
                  valueStyle='!text-success'
                />
                <View className='border-t border-gray-300 my-2' />
                <PaymentInfoStripe
                  label='Total'
                  value={`$${(totalPrice + 4).toFixed(2)}`}
                  labelStyle='text-lg font-quicksand-bold !important !text-dark-100'
                  valueStyle='text-lg font-quicksand-bold !importan !text-dark-100 !text-right'
                />
              </View>
              <CustomButton title='Checkout' />
            </View>
          )
        }
      />
    </SafeAreaView>
  )
}

export default Cart
