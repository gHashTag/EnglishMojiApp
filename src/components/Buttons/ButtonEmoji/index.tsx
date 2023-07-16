import React, { memo } from 'react'
import { Platform, StyleProp, ViewStyle, View, TouchableOpacity } from 'react-native'
import { ScaledSheet, ms } from 'react-native-size-matters'
import Emoji from 'react-native-emoji'
import { useTheme } from '@react-navigation/native'
import { black, white } from '../../../constants'
import { Text } from '../../'

const diameter = ms(88, 0.8)

const circle = {
  width: diameter,
  height: diameter,
  borderRadius: diameter / 2
}

const styles = ScaledSheet.create({
  container: {
    alignSelf: 'center',
    padding: 1
  },
  blue: {
    ...circle,
    height: diameter,
    width: diameter
  },
  pink: {
    ...circle,
    top: 2,
    height: diameter
  },
  iconBg: {
    ...circle,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emoji: {
    left: Platform.OS === 'ios' ? 1 : 0,
    fontSize: Platform.OS === 'ios' ? '50@s' : '50@s'
  }
})

interface ButtonEmojiProps {
  textColor?: string
  name: string
  color?: string
  onPress?: () => void
  viewStyle?: StyleProp<ViewStyle>
}

const ButtonEmoji = memo<ButtonEmojiProps>(({ name, onPress, viewStyle, color }) => {
  const { container, pink, blue, iconBg, emoji } = styles
  const { dark } = useTheme()

  const backgroundColor = dark ? black : color

  return (
    <TouchableOpacity onPress={onPress} style={[container, viewStyle]}>
      <View style={[blue, { backgroundColor: white }]}>
        <View style={[pink, { backgroundColor: backgroundColor }]}>
          <View style={[iconBg, { backgroundColor }]}>
            {name.length > 3 ? (
              <Emoji name={name} style={emoji} />
            ) : (
              <Text h0 title={name} colors={white} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
})

export { ButtonEmoji }
