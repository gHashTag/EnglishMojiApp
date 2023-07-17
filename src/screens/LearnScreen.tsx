import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Background,
  CenterView,
  EmojiSlider,
  Header,
  Loading,
  Space,
  Text
} from '../components'
import Emoji from 'react-native-emoji'
import { s, vs } from 'react-native-size-matters'
import { goBack, shuffle, white, winSound } from '../constants'
import { emojiT } from '../types/LessonTypes'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Navigation'
import { RouteProp } from '@react-navigation/native'

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LEARN_SCREEN'
>

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'LEARN_SCREEN'>

type LearnScreenT = {
  route: ProfileScreenRouteProp
}

export function LearnScreen({ route }: LearnScreenT) {
  const lessonData = route.params.lessonData
  const contentUrl = lessonData.sections[0].contentUrl

  const [emojiData, setEmojiData] = useState<emojiT[]>()
  const [curEmoji, setCurEmoji] = useState<emojiT>()
  const [speed, setSpeed] = useState<number>(35)
  const curIndex = useRef<number>(0)

  const fetchEmojiData = useCallback(async () => {
    if (contentUrl) {
      setEmojiData(shuffle(contentUrl))
    }
  }, [contentUrl])

  useEffect(() => {
    fetchEmojiData()
  }, [fetchEmojiData])

  useEffect(() => {
    if (emojiData) {
      const timerId = setInterval(() => {
        if (curIndex.current !== emojiData.length - 1) {
          setCurEmoji(emojiData[curIndex.current])
          curIndex.current = curIndex.current + 1
        } else {
          winSound.play()
          goBack()
        }
      }, 4500 - speed * 29)
      return () => clearInterval(timerId)
    }
  }, [emojiData, speed])

  const isSymbol = curEmoji?.name?.length === 1
  const title = curEmoji?.title

  const { container, emojiStyle } = styles

  return (
    <Background>
      <Header
        textColor={white}
        onPressL={() => goBack()}
        nameIconL=":back:"
        title={title}
      />
      {emojiData && curEmoji ? (
        <>
          <CenterView>
            <Space height={vs(30)} />
            {isSymbol ? (
              <Text h1 title={curEmoji.title} />
            ) : (
              <Emoji name={curEmoji.name} style={emojiStyle} />
            )}
            <Space height={vs(30)} />
            <Text oneColor={white} h8 title={curEmoji?.title} />
          </CenterView>
          <EmojiSlider
            initPercent={speed}
            onChange={e => setSpeed(e)}
            emojiR=":tiger:"
            emojiL=":turtle:"
          />

          <Space height={vs(45)} />
        </>
      ) : (
        <View style={container}>
          <Loading color={white} />
        </View>
      )}
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  emojiStyle: {
    fontSize: s(120)
  }
})
