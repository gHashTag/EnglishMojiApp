import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View, FlatList, Button } from 'react-native'
import * as Progress from 'react-native-progress'
import Sound from 'react-native-sound'
import {
  pink,
  errorSound,
  green,
  shuffle,
  W,
  white,
  goBack,
  captureException
} from '../constants'
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
  // Add this line near your other state definitions
  const [pastCorrectAnswers, setPastCorrectAnswers] = useState<emojiT[]>([])
  const [randomData, updateData] = useState<emojiT[]>([defautState])
  const [displayName, setDisplayName] = useState<emojiT | null>(defautState)
  const [count, setCount] = useState<number>(0)
  const [answer, setAnswer] = useState<number>(0)
  const [voice, setVoice] = useState<Sound | null>(null)

  // OTHER HOOKS
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
    try {
      const soundUrl = displayName?.url ? displayName.url : 'empty.mp3'
      const sound = new Sound(soundUrl, Sound.MAIN_BUNDLE, () => {
        sound.play()
      })
      sound.play()
      setVoice(sound)
      return () => {
        sound.release()
      }
    } catch (error) {
      captureException(error)
    }
  }, [displayName])

  useEffect(() => {
    const { trueAnswer, shuffleArray } = shake.current()
    setDisplayName(trueAnswer)
    updateData(shuffleArray)
    setLoad(false)
    return () => {
      setAnswer(0)
    }
  }, [navigation])

  const handlePlay = useCallback(() => {
    if (voice) {
      voice.play(success => {
        if (!success) {
          captureException('Sound did not play successfully')
        }
      })
    }
  }, [voice])

  const onChoice = (name: string) => {
    const { trueAnswer, shuffleArray } = shake.current()
    if (name === displayName?.title) {
      const newAnswerCount = answer + 1
      setAnswer(newAnswerCount)
      setPastCorrectAnswers([...pastCorrectAnswers, displayName])
      // Check if we've answered all the questions correctly
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
      errorSound.play()
    }
  }

  const keyExtractor = (item: emojiT): string => item.id.toString()
  const displayTitle = displayName
    ? displayName.title.length > 1
      ? displayName.title
      : ' '
    : '...'

  const progress = contentUrl ? answer / contentUrl.length : 0

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
              data={[...randomData, ...pastCorrectAnswers].slice(0, 9)}
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
  line: {
    height: vs(7),
    backgroundColor: white
  },
  lineContainer: {
    width: lineW + vs(2),
    alignSelf: 'center',
    height: vs(9),
    borderRadius: vs(9),
    overflow: 'hidden',
    borderWidth: vs(1),
    borderColor: white
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
