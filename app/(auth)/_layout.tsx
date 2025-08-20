
import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import React from 'react'
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'

const _layout = () => {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
          <View className="w-full relative" style={{height:Dimensions.get('screen').height/2.25}}>
            <ImageBackground source={images.loginGraphic} className="w-full h-full rounded-b-lg" resizeMode="stretch" />
            <Image source={images.logo} className="absolute size-48 self-center -bottom-10  z-10" />
          </View>
       
        </ScrollView>
        <CustomInput />
        <CustomButton />
        
      </KeyboardAvoidingView>      
    </SafeAreaView>
  )
}

export default _layout