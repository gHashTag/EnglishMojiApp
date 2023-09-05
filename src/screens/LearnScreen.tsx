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
import { captureException, goBack, shuffle, white, winSound } from '../constants'
import { emojiT } from '../types/LessonTypes'
import TrackPlayer from 'react-native-track-player'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Navigation'
import { RouteProp } from '@react-navigation/native'

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LEARN_SCREEN'
>

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'LEARN_SCREEN'>

type LearnScreenT = {
  navigation: ProfileScreenNavigationProp
  route: ProfileScreenRouteProp
}

export function LearnScreen({ navigation, route }: LearnScreenT) {
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

  // Using useEffect to handle logic after each render or when dependencies change
  useEffect(() => {
    // Check if we have emojiData
    if (emojiData) {
      // Create a timer to perform actions every (4500 - speed * 29) milliseconds
      const timerId = setInterval(async () => {
        // If the current index is not the last one in the emojiData array
        if (curIndex.current !== emojiData.length - 1) {
          // Set the current emoji
          setCurEmoji(emojiData[curIndex.current])

          // Reset the player to stop the previous track if it's playing
          await TrackPlayer.reset()

          // Add the new track and start playing it
          await TrackPlayer.add({
            id: curIndex.current.toString(),
            url: emojiData[curIndex.current].url
            // Additional fields like artist, title, etc. could be added here
          })
          await TrackPlayer.play().catch(error => {
            // Handle play errors
            captureException(`Failed to play the track: ${error}`)
          })

          // Increment the current index by 1
          curIndex.current = curIndex.current + 1
        } else {
          // If we've reached the last emoji, play the victory sound and navigate to the WIN_SCREEN
          winSound.play()
          navigation.navigate('WIN_SCREEN', { title: lessonData.cardTitle })
        }
      }, 4500 - speed * 29)

      // Reset the player when the component is unmounted
      return () => {
        clearInterval(timerId)
        TrackPlayer.reset()
      }
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
              <Text h10 title={curEmoji.title} />
            ) : (
              <Emoji name={curEmoji.name} style={emojiStyle} />
            )}
            <Space height={vs(30)} />
            {!isSymbol && <Text oneColor={white} h8 title={curEmoji?.title} />}
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
