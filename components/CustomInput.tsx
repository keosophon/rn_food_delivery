import { CustomInputProps } from '@/type';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';


const CustomInput = ({
  placeholder = 'Enter text',
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = 'default'
}: CustomInputProps) => {

  const [isFocused, setIsFocused] = useState(false);

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
        placeholderTextColor={'#000'}
        keyboardType={keyboardType}
        autoCapitalize='none'
        autoCorrect={false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className = {clsx(
          'rounded-lg p-3 w-full text-base font-quicksand-semibold text-dark-100 border-b leading-5',
          isFocused ? 'border-primary' : 'border-gray-300',
        )}
      />
    </View>
  )
}

export default CustomInput
