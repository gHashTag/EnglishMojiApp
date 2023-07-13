import { useFocusEffect } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, Appearance } from 'react-native'
import { schemeToggle } from '../../../slices'
import { useTypedDispatch, useTypedSelector } from '../../../store'
import {
  EmojiLearnScreen,
  MarkdownScreen,
  QuestScreen,
  VideoSсreen,
  WinScreen
} from '../TypesOfLessons'

export function LessonScreen() {
  const sectionState = useTypedSelector(state => state.section)
  const type = sectionState.currentLesson?.type
  console.log('type', type)
  const bg = useTypedSelector(st => st.bgColor.bgWithScheme)
  const dispatch = useTypedDispatch()

  useFocusEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      dispatch(schemeToggle(colorScheme === 'dark'))
    })
    return () => sub.remove()
  })

  const renderLessonScreen = () => {
    switch (type) {
      case 'video':
        return <VideoSсreen />
      case 'markdown':
      case 'learn':
        return <MarkdownScreen />
      case 'emojiLearn':
        return <EmojiLearnScreen />
      case 'quest':
        return <QuestScreen />
      case 'win':
        return <WinScreen />
      default:
        return null
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      {renderLessonScreen()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
