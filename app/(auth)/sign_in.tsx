import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'

import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'

const SignIn = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting]= useState(false);
  const [form, setForm] = useState({email:'', password: ''});

  const submit = async ()=> {

    const {email, password} = form;
    if (!email || !password) {
      return Alert.alert('Error', 'Please fill in all fields');
    }
    setIsSubmitting(true);

    try {

      //Call appwrite sign in function
      

      Alert.alert('Success', 'User signed in successfully');
      router.replace('/');
    } catch(error:any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    } 
  }


  return (
    <View className='mt-5 p-5 gap-10 bg-white rounded-lg'>
      <CustomInput
        placeholder='Enter your email'
        value={form.email}
        onChangeText={(text) => {setForm({...form, email: text})}}
        keyboardType='email-address'
        label='Email'
      />
      <CustomInput
        placeholder='Enter your password'
        label='Password'
        secureTextEntry={true}
        value={form.password}
        onChangeText={text => {setForm({...form, password: text})}}
      />
      <CustomButton title='Sign In' isLoading={isSubmitting} onPress={submit}/>
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

export default SignIn
