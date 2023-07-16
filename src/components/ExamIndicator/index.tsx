import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTypedDispatch, useTypedSelector } from '../../store'
import { ThemeT, questionsT } from '../../types/LessonTypes'
import CircularProgress from 'react-native-circular-progress-indicator'
import { s } from 'react-native-size-matters'
import { white } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { Text } from '../TextComponents'
import { ButtonVectorIcon } from '../Buttons'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'
import { RootStackParamList } from '../../Navigation'

export function ExamIndicator({ part, questions, dark = false }: ExamIndicatorT) {
  const { t } = useTranslation()
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const dispatch = useTypedDispatch()
  const { passed, exam, courseLength } = useTypedSelector(st => st.profile)
  const isCompleted = exam
  let percent = 0
  if (passed[part] && courseLength[part]) {
    percent = Math.ceil((passed[part].length / courseLength[part]) * 100)
  }

  const handlePress = () => {
    if (questions) {
      navigate('EXAM_SCREEN', { questions, part })
    }
  }
  return (
    <View style={container}>
      <CircularProgress
        value={isNaN(percent) ? 0 : percent > 100 ? 100 : percent}
        maxValue={100}
        radius={s(35)}
        progressFormatter={n => {
          'worklet'
          return `${Math.ceil(n)}%`
        }}
        progressValueStyle={{
          fontFamily: 'Avenir Next',
          fontWeight: 'normal'
        }}
        progressValueColor={white}
        activeStrokeColor={white}
        activeStrokeWidth={s(4)}
        inActiveStrokeWidth={s(1.5)}
        inActiveStrokeColor={white}
        inActiveStrokeOpacity={0.3}
      />
      {questions && (
        <>
          <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <Text oneColor={dark ? undefined : white} h9 title={t('exam')} />
          </TouchableOpacity>
          <ButtonVectorIcon
            onPress={handlePress}
            color={dark ? undefined : white}
            size={s(40)}
            name={isCompleted ? 'checkbox-outline' : 'checkbox-blank-outline'}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})

const { container } = styles

interface ExamIndicatorT {
  part: ThemeT
  questions?: questionsT[]
  dark?: boolean
}
