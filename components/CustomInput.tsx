import { CustomInputProps } from '@/type'
import React from 'react'
import { Text, TextInput, View } from 'react-native'

const CustomInput = ({
  placeholder = 'Enter text',
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = 'default'
}: CustomInputProps) => {
  return (
    <View>
      <Text className='text-base text-start w-full font-quicksand-medium text-gray-500 pl-2'>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        className='w-full p-2 border border-gray-300 rounded-md'
        placeholderTextColor={'#000'}
        keyboardType={keyboardType}
        autoCapitalize='none'
        autoCorrect={false}
      />
    </View>
  )
}

export default CustomInput
