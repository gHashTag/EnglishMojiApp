import React, { useEffect, useState } from 'react'
import {
  ExamIndicator,
  LessonCard,
  Loading,
  ScrollContainer,
  Space,
  Text
} from '../components'
import { pink, en_gradient, openURL, white } from '../constants'

import { LessonData } from '../types/LessonTypes'
import { Button, useColorScheme } from 'react-native'
import { lessonData } from '../EnForKids/Main'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Navigation'
import { useDispatch } from 'react-redux'

const resExam: questionsT[] = require('../EnForKids/examData/examEn.json')

interface questionsT {
  type:
    | 'input'
    | 'oneChoice'
    | 'drag'
    | 'manySelect'
    | 'joinVariants'
    | 'supplement'
    | 'emoji'
  text: string
  options: string[]
  correctAnswer: string
}

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MAIN_SCREEN'
>

type MainSсreenT = {
  navigation: ProfileScreenNavigationProp
}

function MainScreen({ navigation }: MainSсreenT) {
  const [data, setData] = useState<LessonData[]>([])
  const [examData, setExamData] = useState<questionsT[]>([])
  const [load, setLoad] = useState(true)
  const isDark = useColorScheme() === 'dark'
  const dispatch = useDispatch()
  const fetchData = async () => {
    try {
      setLoad(true)
      setData(lessonData)
      setExamData(resExam)
    } catch (error) {
      console.log('error:', error)
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

  return load ? (
    <Loading color={pink} />
  ) : (
    <ScrollContainer bgColor={!isDark ? pink : undefined}>
      <Space height={50} />
      <ExamIndicator questions={examData} part="en" />
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

      <Button title="Privacy Policy" onPress={openURL} color={white} />
    </ScrollContainer>
  )
}

export { MainScreen }
