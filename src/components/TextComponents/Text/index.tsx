import React from 'react'
import {
  StyleProp,
  TextStyle,
  Text as RNText,
  TextProps,
  StyleSheet,
  useColorScheme
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { s } from 'react-native-size-matters'
import { primary, secondary, Etna, KLMN, Narrow, white, black } from '../../../constants'
import { string } from 'yup'

const styles = StyleSheet.create({
  h0Style: {
    fontSize: s(12),
    fontFamily: KLMN
  },
  h1Style: {
    fontSize: s(15),
    fontFamily: KLMN,
    textShadowOffset: { width: s(1), height: s(1) },
    textShadowRadius: s(1)
  },
  h2Style: {
    fontSize: s(15),
    fontFamily: 'Avenir Next',
    textAlign: 'center'
  },
  h3Style: {
    fontSize: s(20),
    fontFamily: Narrow
  },
  h4Style: {
    fontSize: s(18.5),
    fontFamily: Etna
  },
  h5Style: {
    fontSize: s(23),
    fontFamily: 'Avenir Next',
    fontWeight: 'bold'
  },
  h6Style: {
    fontSize: s(30),
    fontFamily: Etna,
    textShadowOffset: { width: s(2), height: s(1) },
    textShadowRadius: s(1)
  },
  h7Style: {
    fontSize: s(30),
    fontFamily: 'Avenir Next',
    fontWeight: 'bold'
  },
  h8Style: {
    fontSize: s(30),
    fontFamily: 'Avenir Next',
    fontWeight: 'bold',
    textAlign: 'center',
    color: white
  },
  h9Style: {
    fontSize: s(35),
    fontFamily: Etna
  },
  h10Style: {
    fontSize: s(150),
    fontFamily: Etna,
    color: white
  },
  bodyStyle: {
    fontSize: s(13),
    fontFamily: KLMN
  }
})

interface TwoColorsT {
  dark: string
  light: string
  white: number
}

type FontTypeKeys =
  | 'h0'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'h7'
  | 'h8'
  | 'h9'
  | 'h10'
  | 'bodyH'
export type FontType = Partial<Record<FontTypeKeys, boolean>>

export interface TextT extends TextProps, FontType {
  title?: string
  colors?: TwoColorsT | string
  oneColor?: string
  textStyle?: StyleProp<TextStyle>
  centerText?: boolean
  fontSize?: number
}

export const Text = ({
  title,
  oneColor,
  colors,
  textStyle,
  centerText,
  fontSize,
  ...fontType
}: TextT) => {
  const {
    colors: { text }
  } = useTheme()
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  const textShadowColor = isDark ? primary : secondary

  const curColor = oneColor ? oneColor : colors ? (isDark ? black : white) : text

  const stylesArray = Object.keys(fontType)
    .filter(key => fontType[key as FontTypeKeys])
    .map(key => styles[`${key}Style` as keyof typeof styles])

  return (
    <RNText
      style={[
        { color: curColor, textShadowColor },
        centerText && { textAlign: 'center' },
        fontSize && fontSize > 0 ? { fontSize } : {},
        textStyle,
        ...stylesArray
      ]}
      {...fontType}
    >
      {title ? title : ' '}
    </RNText>
  )
}
