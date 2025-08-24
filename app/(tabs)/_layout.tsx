import { images } from '@/constants'
import useAuthStore from '@/store/auth.store'
import { TabBarIconProps } from '@/type'
import cn from 'clsx'
import { Redirect, Tabs } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'

const TabBarIcon = ({
  focused,
  icon,
  title
}:TabBarIconProps) => {
  return (
    <View className='flex min-w-20 items-center justify-center min-h-full gap-1 mt-10'>
      <Image
        source={icon}
        className='size-7'
        resizeMode='contain'
        tintColor={focused ? '#FEBC00' : '#5D5F6D'}
      />
      <Text
        className={cn(
          'text-sm font-quicksand-semibold',
          focused ? 'text-primary' : 'text-gray-400'
        )}
      >
        {title}
      </Text>
    </View>
  )
}

const TabLayout = () => {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Redirect href='/sign_in' />
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { 
          borderRadius: 50, 
          marginHorizontal: 20, 
          height: 80,
          position: 'absolute',
          bottom: 40,
          backgroundColor: '#fff',
          shadowColor: '#1a1a1a',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.home} title='Home' />
          )
        }}
      />
      <Tabs.Screen
        name='Search'
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.search} title='Search' />
          )
        }}
      />
      <Tabs.Screen
        name='Cart'
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.bag} title='Cart' />
          )
        }}
      />
      <Tabs.Screen
        name='Profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.person} title='Profile' />
          )
        }}
      />
    </Tabs>
  )
}

export default TabLayout
