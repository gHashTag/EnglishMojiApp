import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTypedSelector } from '../../store'
import { ThemeT } from '../../types/LessonTypes'
import CircularProgress from 'react-native-circular-progress-indicator'
import { s } from 'react-native-size-matters'
import { white } from '../../constants'

import { Text } from '../TextComponents'
import { ButtonVectorIcon } from '../Buttons'

import { useTranslation } from 'react-i18next'

export function ExamIndicator({ dark = false }: ExamIndicatorT) {
  const { t } = useTranslation()
  const { passed } = useTypedSelector(st => st.profile)

  let totalPassed = 0

  const totalThemes = Object.keys(passed).length

  Object.keys(passed).forEach(key => {
    const part = key as ThemeT
    totalPassed += passed[part].filter(lesson => lesson === true).length
  })

  const percent = Math.round((totalPassed / totalThemes) * 100)
  const isCompleted = percent === 100 ? true : false
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

      <Text oneColor={dark ? undefined : white} h9 title={t('exam')} />

      <ButtonVectorIcon
        color={dark ? undefined : white}
        size={s(40)}
        name={isCompleted ? 'checkbox-outline' : 'checkbox-blank-outline'}
      />
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
  dark?: boolean
}
