import React, { useEffect, useState } from 'react'
import {
  CenterView,
  ExamIndicator,
  LessonCard,
  Loading,
  ScrollContainer,
  Space
} from '../components'
import { pink, en_gradient, openURL, white, captureException } from '../constants'
import DeviceInfo from 'react-native-device-info'
import { LessonData } from '../types/LessonTypes'
import { Text, useColorScheme } from 'react-native'
import { lessonData } from '../data/Main'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Navigation'
import { persistor } from '../store'

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MAIN_SCREEN'
>

type MainSсreenT = {
  navigation: ProfileScreenNavigationProp
}

function MainScreen({ navigation }: MainSсreenT) {
  const [data, setData] = useState<LessonData[]>([])
  const [load, setLoad] = useState(true)
  const isDark = useColorScheme() === 'dark'
  const fetchData = async () => {
    try {
      await persistor.purge()
      setLoad(true)
      setData(lessonData)
    } catch (error) {
      captureException(error)
    } finally {
      setLoad(false)
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
  return load ? (
    <Loading color={pink} />
  ) : (
    <ScrollContainer bgColor={!isDark ? pink : undefined}>
      <Space height={50} />
      <ExamIndicator />
      {data.map((item: LessonData) => {
        return (
          <LessonCard
            border={!isDark}
            id={item.id}
            part={item.cardTitle}
            key={item.id}
            onPress={() => handleItem(item)}
            gradient={{ top: en_gradient, bottom: pink }}
            cardImage={item.cardImage}
          />
        )
      })}
      <CenterView>
        <Text onPress={openURL} style={{ color: white, fontSize: 19 }} testID="welcome">
          Privacy Policy
        </Text>
        <Space height={20} />
        <Text onPress={openURL} style={{ color: white, fontSize: 19 }}>
          ver: {bundleVersion}({buildVersion})
        </Text>
      </CenterView>
    </ScrollContainer>
  )
}

export { MainScreen }
