import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, useColorScheme } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Navigation'
import { persistor } from '../store'
import { CenterView, ExamIndicator, LessonCard, Space } from '../components'
import { pink, en_gradient, openURL, white, captureException } from '../constants'
import { LessonData } from '../types/LessonTypes'
import { lessonData } from '../data/Main'

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MAIN_SCREEN'
>

type MainScreenProps = {
  navigation: ProfileScreenNavigationProp
}

function MainScreen({ navigation }: MainScreenProps) {
  const [data, setData] = useState<LessonData[]>([])
  const isDark = useColorScheme() === 'dark'

  const fetchData = async () => {
    try {
      await persistor.purge()
      setData(lessonData)
    } catch (error) {
      captureException(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleItem = (lessonData: LessonData) => {
    navigation.navigate('SELECT_SCREEN', { lessonData })
  }

  const bundleVersion = DeviceInfo.getVersion()
  const buildVersion = DeviceInfo.getBuildNumber()
  const backgroundColor = !isDark ? pink : undefined

  return (
    <View style={{ backgroundColor }}>
      <FlatList
        ListHeaderComponent={
          <>
            <Space height={50} />
            <ExamIndicator />
          </>
        }
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <LessonCard
            border={!isDark}
            id={item.id}
            part={item.cardTitle}
            onPress={() => handleItem(item)}
            gradient={{ top: en_gradient, bottom: pink }}
            cardImage={item.cardImage}
          />
        )}
        ListFooterComponent={
          <CenterView>
            <Text
              onPress={openURL}
              style={{ color: white, fontSize: 19 }}
              testID="welcome"
            >
              Privacy Policy
            </Text>
            <Space height={10} />
            <Text onPress={openURL} style={{ color: white, fontSize: 19 }}>
              ver: {bundleVersion}({buildVersion})
            </Text>
            <Space height={20} />
          </CenterView>
        }
      />
    </View>
  )
}

export { MainScreen }
