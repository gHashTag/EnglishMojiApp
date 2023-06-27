import React, { useEffect, useState } from 'react'
import {
  ExamIndicator,
  LessonCard,
  Loading,
  ScrollContainer,
  Space
} from '../../../components'
import { en_color, en_gradient, handlePressCard } from '../../../constants'

import { LessonData } from '../../../types/LessonTypes'
import { useColorScheme } from 'react-native'
import { changeCourseLength } from '../../../slices'
import { useTypedDispatch } from '../../../store'
const res: LessonData[] = require('../../../EnForKids/Main.json')
const resExam: questionsT[] = require('../../../EnForKids/examData/examEn.json')

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

export function EnScreen() {
  const [data, setData] = useState<LessonData[]>([])
  const [examData, setExamData] = useState<questionsT[]>([])
  const [load, setLoad] = useState(true)
  const isDark = useColorScheme() === 'dark'
  const dispatch = useTypedDispatch()
  useEffect(() => {
    if (data.length > 0) {
      dispatch(changeCourseLength({ part: 'en', length: data.length }))
    }
  }, [data, dispatch])

  const fetchData = async () => {
    try {
      setLoad(true)
      setData(res)
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

  return load ? (
    <Loading color={en_color} />
  ) : (
    <ScrollContainer bgColor={!isDark ? en_color : undefined}>
      <Space height={50} />
      <ExamIndicator questions={examData} part="en" />
      {data.map((item: LessonData) => {
        return (
          <LessonCard
            border={!isDark}
            part="en"
            id={item.id}
            key={item.id}
            onPress={() => handlePressCard('en', item.sections, item.cardTitle, item.id)}
            gradient={{ top: en_gradient, bottom: en_color }}
            cardImage={item.cardImage}
            title={item.cardTitle}
          />
        )
      })}
    </ScrollContainer>
  )
}
