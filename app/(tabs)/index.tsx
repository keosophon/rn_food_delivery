import CartButton from '@/components/CartButton'
import { images, offers } from '@/constants'
import cn from 'clsx'
import { Fragment } from 'react'
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function App () {
  return (
    <SafeAreaProvider>
      <SafeAreaView className='flex-1 bg-white'>
        <FlatList
          data={offers}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => {
            const isEven: boolean = index % 2 === 0
            return (
              <View>
                <Pressable
                  className={cn(
                    'w-full h-48 my-3 rounded-xl overflow-hidden shadow-lg flex items-center gap-5',
                    isEven ? 'flex-row-reverse' : 'flex-row'
                  )}
                  style={{ backgroundColor: item.color }}
                  android_ripple={{ color: '#ffff22' }}
                >
                  {({ pressed }) => (
                    <Fragment>
                      <View className='h-full w-1/2'>
                        <Image
                          source={item.image}
                          className='size-full'
                          resizeMode='contain'
                        />
                      </View>
                      <View
                        className={cn(
                          'flex-1 h-full flex flex-col justify-center items-start gap-4',
                          isEven ? 'pl-5' : 'pr-5'
                        )}
                      >
                        <Text
                          className='text-3xl font-quicksand-bold text-white'
                          leading-tight
                        >
                          {item.title}
                        </Text>
                        <Image
                          source={images.arrowRight}
                          className='size-10'
                          resizeMode='contain'
                          tintColor='#ffffff'
                        />
                      </View>
                    </Fragment>
                  )}
                </Pressable>
              </View>
            )
          }}
          contentContainerClassName='px-5 pb-20'
          ListHeaderComponent={() => (
            <View className='justify-between items-center flex-row w-full my-5'>
          <View>
            <Text className='text-sm font-quicksand-bold text-primary'>
              DELIVER TO
            </Text>
            <TouchableOpacity className='flex-row gap-x-1 mt-0.5 items-center'>
              <Text className='text-base font-quicksand-bold text-black-100'>New Zealand</Text>
              <Image
              source={images.arrowDown}
              className='size-2'
              resizeMode='contain'
            />
            </TouchableOpacity>            
          </View>
          <CartButton />
        </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
