import { useTheme } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Markdown, { MarkdownProps } from 'react-native-markdown-display'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ms, s, vs } from 'react-native-size-matters'
import { useDispatch } from 'react-redux'
import { Button, LoadFailed, Loading, Space } from '../../../../components'
import { fetchText, white } from '../../../../constants'
import { getMarkdownStyle } from '../../../../markdownStyle'
import { goPrevious, incrementSection } from '../../../../slices'
import { useTypedSelector } from '../../../../store'

export function MarkdownScreen() {
  const [markdown, setMarkdown] = useState('')
  const [loading, setLoading] = useState(true)
  const { currentLesson } = useTypedSelector(st => st.section)

  const fetchMD = useCallback(async () => {
    if (currentLesson && currentLesson.contentUrl) {
      setLoading(true)
      const res = await fetchText(currentLesson.contentUrl)
      setMarkdown(res)
      setLoading(false)
    }
  }, [currentLesson])

  useEffect(() => {
    fetchMD()
  }, [fetchMD])

  const theme = useTheme()
  const dispatch = useDispatch()
  const { top, bottom } = useSafeAreaInsets()
  const { rules, styles } = getMarkdownStyle(theme)

  if (!currentLesson) {
    return null
  }

  const handleBack = () => {
    dispatch(goPrevious())
  }

  const handleNext = () => {
    dispatch(incrementSection())
  }

  if (!loading && markdown === '') {
    return <LoadFailed />
  }

  if (loading) {
    return <Loading color={white} />
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={screenStyle.container}>
      <Space height={top} />
      <Markdown style={styles} rules={rules} source={{ content: markdown }} />
      <Space height={vs(20)} />
      <View style={screenStyle.btnContainer}>
        <Button onPress={handleBack} title="Назад" />
        <Space width={s(10)} />
        <Button onPress={handleNext} title="Далее" />
      </View>
      <Space height={bottom + vs(30)} />
    </ScrollView>
  )
}

const screenStyle = StyleSheet.create({
  container: {
    paddingHorizontal: ms(10, 0.25)
  },
  btnContainer: {
    flexDirection: 'row'
  }
})
