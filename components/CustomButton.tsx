import { CustomButtonProps } from '@/type'
import clsx from 'clsx'
import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

const CustomButton = ({
  onPress,
  title = 'Click Me',
  style,
  leftIcon,
  textStyle,
  isLoading = false
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={clsx(
        'bg-primary rounded-full p-3 w-full flex flex-row justify-center',
        style
      )}
      onPress={onPress}
    >
      {leftIcon}
      <View className='flex-row items-center justify-center'>
        {isLoading ? (
          <ActivityIndicator size='small' color='#fff' />
        ) : (
          <Text className={clsx('text-white text-base font-quicksand-semibold', textStyle)}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default CustomButton
