import { offers } from '@/constants';
import cn from 'clsx';
import { Fragment } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App () {
  console.log(offers)
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <FlatList
          data={offers}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => {
            const isEven: boolean = index % 2 === 0
            return (
              <View>
                <Pressable
                  className={cn(
                    'offer-card',
                    isEven ? 'flex-row-reverse' : 'flex-row'
                  )}
                  style={{ backgroundColor: item.color }}
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
                      <View className='offer-card__info'>{item.title}</View>
                    </Fragment>
                  )}
                </Pressable>
              </View>
            )
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
