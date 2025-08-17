import { offers } from '@/constants'
import { Fragment } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function App () {
  console.log(offers)
  return (
    <SafeAreaView>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <View>
              <Pressable className='bg-amber-600'>
                {({pressed}) => (
                  <Fragment>
                    <View className={"h-full w-1/2"}>
                      
                    </View>
                    <View></View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}
