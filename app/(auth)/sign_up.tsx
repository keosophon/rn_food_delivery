import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'

import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { CreateUser } from '@/services/appwrite'

const SignUp = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting]= useState(false);
  const [form, setForm] = useState({name: '', email:'', password: ''});

  const submit = async ()=> {
    const {name, email, password} = form;
    if (!name|| !email || !password) {
      return Alert.alert('Error', 'Please fill in all fields');
    }
    setIsSubmitting(true);

    try {
      Alert.alert('sign up', email);
      //Call appwrite sign up function
      await CreateUser({name, email, password});
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
        placeholder='Enter your fullname'
        value={form.name}
        onChangeText={(text) => {setForm(prev=>({...prev, name: text}))}}
        label='Full Name'
      />

      <CustomInput
        placeholder='Enter your email'
        value={form.email}
        onChangeText={(text) => {setForm(prev=>({...prev, email: text}))}}
        keyboardType='email-address'
        label='Email'
      />
      <CustomInput
        placeholder='Enter your password'
        label='Password'
        secureTextEntry={true}
        value={form.password}
        onChangeText={text => {setForm(prev=>({...prev, password: text}))}}
      />
      <CustomButton title='Sign Up' isLoading={isSubmitting} onPress={submit}/>
      <View className='flex-row items-center justify-center'>
        <Text className='text-base font-quicksand-medium text-gray-500 pr-2'>
          {`Already have an account?`}
        </Text>
        <Link href='/sign_in' className='text-base font-quicksand-bold text-primary'>
          Sign In
        </Link>
      </View>
    </View>
  )
}

export default SignUp
