import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'

const sign_in = () => {
  return (
    <View className='mt-5 p-5 gap-10 bg-white rounded-lg'>
      <CustomInput
        placeholder='Enter your email'
        value={''}
        onChangeText={text => {}}
        keyboardType='email-address'
        label='Email'
      />
      <CustomInput
        placeholder='Enter your password'
        label='Password'
        secureTextEntry={true}
        value={''}
        onChangeText={text => {}}
      />
      <CustomButton title='Sign In' />
      <View className='flex-row items-center justify-center'>
        <Text className='text-base font-quicksand-medium text-gray-500 pr-2'>
          {`Don't have an account?`}
        </Text>
        <Link href='/sign_up' className='text-base font-quicksand-bold text-primary'>
          Sign Up
        </Link>
      </View>
    </View>
  )
}

export default sign_in
