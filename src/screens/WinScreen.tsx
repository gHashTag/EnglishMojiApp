import React, { useCallback } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Background, CenterView, Header, Space, Text } from '../components'
// @ts-ignore
import Unicorn from '../../assets/gif/unicorn.gif'
import { s, vs } from 'react-native-size-matters'
import { W, white, winSound } from '../constants'

import { RouteProp, useFocusEffect } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Navigation'
import { ThemeT } from '../types/LessonTypes'

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TEST_SCREEN'
>

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'WIN_SCREEN'>

type WinScreenT = {
  navigation: ProfileScreenNavigationProp
  route: ProfileScreenRouteProp
}

function WinScreen({ navigation, route }: WinScreenT) {
  const title = route.params.title as ThemeT

  useFocusEffect(
    useCallback(() => {
      winSound.play()
    }, [])
  )
  const onExit = () => navigation.pop(3)

  const { gifStyle, gifContainer } = styles
  return (
    <Background>
      <Header onPressL={onExit} nameIconL=":back:" textColor="white" title="Win" />

      <CenterView>
        <Text h7 centerText oneColor={white} title={title} />
        <Space height={vs(30)} />
        <View style={gifContainer}>
          <Image style={gifStyle} source={Unicorn} />
        </View>
        <Space height={vs(90)} />
      </CenterView>
    </Background>
  )
}

const styles = StyleSheet.create({
  gifStyle: {
    width: '100%',
    height: '100%'
  },
  gifContainer: {
    width: W / 1.5,
    height: W / 1.5,
    borderRadius: s(5),
    overflow: 'hidden'
  },
  balloonContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  }
})

export { WinScreen }
