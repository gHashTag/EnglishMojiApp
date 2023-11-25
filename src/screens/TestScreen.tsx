import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import * as Progress from 'react-native-progress'
import TrackPlayer from 'react-native-track-player'
import { pink, green, shuffle, W, white, goBack, captureException } from '../constants'
import { emojiT } from '../types/LessonTypes'
import { ButtonEmoji, Text, Space, Header, Loading, Background } from '../components'
import { s, vs } from 'react-native-size-matters'
import { RouteProp, useTheme } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Navigation'
import { saveResult } from '../slices/profileSlice'

const lineW = W / 1.85

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TEST_SCREEN'
>

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'TEST_SCREEN'>

type TestScreenT = {
  navigation: ProfileScreenNavigationProp
  route: ProfileScreenRouteProp
}

const defautState = {
  id: 0,
  name: '  ',
  title: ' ',
  url: 'empty.mp3'
}

export function TestScreen({ navigation, route }: TestScreenT) {
  const lessonData = route.params.lessonData
  const cardTitle = route.params.lessonData.cardTitle
  const dispatch = useDispatch()
  const contentUrl = lessonData.sections[0].contentUrl

  // STATES
  const [bool, setBool] = useState<boolean>(true)
  const [load, setLoad] = useState(true)
  const [pastCorrectAnswers, setPastCorrectAnswers] = useState<emojiT[]>([])
  const [randomData, updateData] = useState<emojiT[]>([defautState])
  const [displayName, setDisplayName] = useState<emojiT | null>(defautState)
  const [count, setCount] = useState<number>(0)
  const [answer, setAnswer] = useState<number>(0)
  const [voice, setVoice] = useState<number | null>(null)
  const [trackQueue, setTrackQueue] = useState([])

  const { bottom } = useSafeAreaInsets()
  const { dark } = useTheme()

  const remainingEmojis = useMemo(() => contentUrl, [contentUrl])
  const shuffledEmojis = useMemo(() => shuffle(remainingEmojis), [remainingEmojis])

  const pastEmojis = useRef<emojiT[]>([])

  const shake = useRef(() => {
    const arrayWithoutPastEmojis: emojiT[] = shuffledEmojis.filter(
      emoji => !pastEmojis.current.includes(emoji)
    )

    const trueAnswerArray: emojiT[] = arrayWithoutPastEmojis.slice(0, 9)
    const shuffleArray = shuffle(trueAnswerArray)
    const trueAnswer: emojiT = shuffle(trueAnswerArray)[0]

    pastEmojis.current.push(trueAnswer)
    return { trueAnswer, shuffleArray }
  })

  useEffect(() => {
    const soundUrl = displayName?.url ? displayName.url : 'empty.mp3'

    const playSound = async () => {
      await TrackPlayer.add({
        id: 'trackId',
        url: soundUrl
      })
      setVoice(1)
      await TrackPlayer.play()
    }

    if (displayName) {
      playSound()
    }

    return () => {
      TrackPlayer.reset()
    }
  }, [displayName])

  useEffect(() => {
    const listener = TrackPlayer.addEventListener('playback-queue-ended', async () => {
      const newQueue = await TrackPlayer.getQueue()
      console.log('Queue ended. New queue:', newQueue)
    })

    return () => {
      listener.remove()
    }
  }, [])

  const handlePlay = useCallback(async () => {
    const queue = await TrackPlayer.getQueue()
    console.log('Current queue:', queue)

    const lastPlayedTrack = queue[queue.length - 1]

    if (lastPlayedTrack && lastPlayedTrack.url === 'error.wav' && queue.length > 1) {
      const soundUrl = queue[queue.length - 2].url

      const playSound = async () => {
        await TrackPlayer.add({
          id: 'trackId',
          url: soundUrl
        })
        setVoice(1)
        await TrackPlayer.play()
      }

      if (soundUrl) {
        playSound()
      }
    } else {
      const soundUrl = lastPlayedTrack ? lastPlayedTrack.url : null

      const playSound = async () => {
        if (soundUrl) {
          await TrackPlayer.add({
            id: 'trackId',
            url: soundUrl
          })
          setVoice(1)
          await TrackPlayer.play()
        }
      }

      if (soundUrl) {
        playSound()
      }
    }
  }, [])

  useEffect(() => {
    const { trueAnswer, shuffleArray } = shake.current()
    setDisplayName(trueAnswer)
    updateData(shuffleArray)
    setLoad(false)
    return () => {
      setAnswer(0)
    }
  }, [navigation])

  const onChoice = (name: string) => {
    const { trueAnswer, shuffleArray } = shake.current()
    if (name === displayName?.title) {
      const newAnswerCount = answer + 1
      setAnswer(newAnswerCount)
      setPastCorrectAnswers([...pastCorrectAnswers, displayName])

      if (contentUrl && newAnswerCount === contentUrl.length) {
        dispatch(saveResult({ part: cardTitle }))
        navigation.navigate('WIN_SCREEN', { title: cardTitle })
        return
      }

      setBool(true)
      updateData(shuffleArray)
      setDisplayName(trueAnswer)
    } else {
      pastEmojis.current = []
      setAnswer(0)
      setBool(false)
      setCount(count + 1)
      updateData(shuffle(randomData))
      // Play error sound
      TrackPlayer.add({
        id: 'errorSoundId',
        url: 'error.wav'
      })
      TrackPlayer.play()
    }
  }

  const keyExtractor = (item: emojiT): string => item.id.toString()
  const displayTitle = displayName
    ? displayName.title.length > 1
      ? displayName.title
      : ' '
    : '...'

  const progress = contentUrl ? answer / contentUrl.length : 0

  const combinedData = [...new Set([...randomData, ...pastCorrectAnswers])].slice(0, 9)

  return (
    <Background>
      {load ? (
        <Loading color={white} />
      ) : (
        <View style={styles.flexOne}>
          <Header
            textColor={dark ? pink : white}
            nameIconL=":back:"
            onPressL={() => goBack()}
            onPressR={handlePlay}
            nameIconR=":loud_sound:"
            title="Test"
          />
          <View>
            <Space height={vs(90)} />
            <View style={styles.sub}>
              <Text oneColor={white} h8 title={displayTitle} />
            </View>
            <View style={styles.progressStyle}>
              <Progress.Bar
                progress={progress}
                width={W - s(150)}
                color={white}
                height={s(6)}
              />
            </View>

            <Space height={vs(15)} />
            <Text
              centerText
              oneColor={bool ? green : 'red'}
              h3
              fontSize={s(20)}
              title={bool ? 'true' : 'false'}
            />
            <Space height={vs(35)} />
            <FlatList
              numColumns={3}
              style={styles.flatStyle}
              data={combinedData}
              renderItem={({ item }) => (
                <View style={styles.emojiStyle}>
                  <ButtonEmoji
                    textColor={dark ? undefined : white}
                    onPress={() => onChoice(item.title)}
                    name={item.name}
                    color={pink}
                  />
                </View>
              )}
              keyExtractor={keyExtractor}
            />
            <Space height={bottom + vs(40)} />
          </View>
        </View>
      )}
    </Background>
  )
}

const styles = StyleSheet.create({
  emojiStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: vs(5)
  },
  flexOne: {
    flex: 1,
    justifyContent: 'space-between'
  },
  sub: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: 30
  },
  flatStyle: { marginHorizontal: s(30) },
  progressStyle: { alignSelf: 'center' }
})
