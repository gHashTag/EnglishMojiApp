import React, { useState } from 'react'
import { StyleSheet, Pressable, View, StyleProp, ViewStyle } from 'react-native'
import { en_color, W } from '../../../constants'
import Emoji from 'react-native-emoji'
import { Text } from '../../TextComponents'
import { vs } from 'react-native-size-matters'
import { useTypedSelector } from '../../../store'
import { useTheme } from '@react-navigation/native'

const size = W / 4.6
const fontSize = size / 1.75

export function ButtonEmoji({ name, viewStyle, onPress, textColor }: ButtonEmojiT) {
  const {
    dark,
    colors: { background }
  } = useTheme()
  const isSymbol = name.length === 1
  const { bgColor } = useTypedSelector(state => state.bgColor)
  const backgroundColor = dark ? background : bgColor

  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  const containerStyle = [
    styles.container,
    styles.shadow,
    { backgroundColor: 'white' },
    isPressed && styles.containerPressed
  ]

  const maskStyle = [styles.container, styles.mask, { backgroundColor }]

  const pressableStyle = [
    styles.container,
    { backgroundColor },
    isPressed && styles.containerPressed
  ]

  return (
    <View>
      <View style={containerStyle} />
      <View style={maskStyle} />
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={pressableStyle}
      >
        {isSymbol ? (
          <Text oneColor={textColor} textStyle={{ fontSize }} title={name} h7 />
        ) : (
          <Emoji name={name} style={{ fontSize }} />
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    borderRadius: size,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 3
  },
  containerPressed: {
    backgroundColor: 'lightgray'
  },
  shadow: {
    position: 'absolute',
    transform: [{ translateY: vs(-1.3) }],
    zIndex: 0
  },
  mask: {
    zIndex: 1,
    position: 'absolute'
  }
})

interface ButtonEmojiT {
  name: string
  viewStyle?: StyleProp<ViewStyle>
  onPress?: () => void
  textColor?: string
}
