import React, { useCallback } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Background, CenterView, Header, Space, Text } from '../components'
// @ts-ignore
import Unicorn from '../../assets/gif/unicorn.gif'
import { s, vs } from 'react-native-size-matters'
import { W, white, winSound } from '../constants'
import { useDispatch } from 'react-redux'
import { incrementSection, saveResult } from '../slices'
import { RouteProp, useFocusEffect } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../Navigation'

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
  const title = route.params.title
  const dispatch = useDispatch()
  useFocusEffect(
    useCallback(() => {
      // winSound.play()
    }, [])
  )
  const onExit = () => {
    navigation.pop(3)
    // dispatch(saveResult({ title }))
    // dispatch(incrementSection())
  }
  return (
    <Background>
      <Header onPressL={onExit} nameIconL=":back:" textColor="white" title="Победа" />

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
const { gifStyle, gifContainer } = styles

export { WinScreen }
