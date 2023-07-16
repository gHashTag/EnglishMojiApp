import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import * as Progress from 'react-native-progress'
import Sound from 'react-native-sound'
import { pink, errorSound, green, shuffle, W, white, goBack } from '../constants'
import { emojiT } from '../types/LessonTypes'
import { ButtonEmoji, Text, Space, Header, Loading, Background } from '../components'
import { s, vs } from 'react-native-size-matters'
import { RouteProp, useTheme } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Navigation'

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
  name: '',
  title: ' ',
  url: ''
}

export function TestScreen({ navigation, route }: TestScreenT) {
  const lessonData = route.params.lessonData
  const cardTitle = route.params.lessonData.cardTitle
  console.log('cardTitle', cardTitle)
  const title = route.params.lessonData.cardTitle
  const contentUrl = lessonData.sections[0].contentUrl

  // STATES
  const [bool, setBool] = useState<boolean>(true)
  const [load, setLoad] = useState(true)

  const [randomData, updateData] = useState<emojiT[]>([defautState])
  const [displayName, setDisplayName] = useState<emojiT>(defautState)
  const [count, setCount] = useState<number>(0)
  const [answer, setAnswer] = useState<number>(0)
  const [voice, setVoice] = useState<Sound | null>(null)

  // OTHER HOOKS
  const { bottom } = useSafeAreaInsets()

  const { dark } = useTheme()

  const shake = useRef(() => {
    const shuff = contentUrl ? shuffle(contentUrl) : []
    const sliceArray = shuff.splice(0, 9)
    let random = shuffle(sliceArray)[0]
    if (random === displayName) {
      random = shuffle(sliceArray)[1]
    }
    return { random, sliceArray }
  })
  useEffect(() => {
    if (!displayName.url) return

    const sound = new Sound(displayName.url, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error)
        return
      }

      // Воспроизведение звука
      sound.play(success => {
        if (!success) {
          console.log('Sound did not play successfully')
        }
      })
    })
    setVoice(sound)

    return () => {
      sound.release()
    }
  }, [displayName])

  useEffect(() => {
    const { random, sliceArray } = shake.current()
    setDisplayName(random)
    updateData(sliceArray)
    setLoad(false)
    return () => {
      setAnswer(0)
    }
  }, [navigation])

  const handlePlay = useCallback(() => {
    if (voice) {
      voice.play(success => {
        if (!success) {
          console.log('Sound did not play successfully')
        }
      })
    }
  }, [voice])

  const onChoice = (title: string) => {
    const { random, sliceArray } = shake.current()
    if (title === displayName.title) {
      const newAnswerCount = answer + 1
      setAnswer(newAnswerCount)

      // Check if we've answered all the questions correctly
      if (contentUrl && newAnswerCount === contentUrl.length) {
        navigation.navigate('WIN_SCREEN', { title: cardTitle })
        return // Exit the function early so the rest of the code isn't executed
      }

      setBool(true)
      updateData(sliceArray)
      setDisplayName(random)

      var whoosh = new Sound(random.url, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error)
          return
        }
        whoosh.play()
      })
    } else {
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
            title={displayTitle}
          />
          <View>
            <Space height={vs(120)} />
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
              data={randomData}
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
