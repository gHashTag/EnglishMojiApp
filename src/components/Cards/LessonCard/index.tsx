import React, { useState } from 'react'
import { Pressable, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import Gradient from 'react-native-linear-gradient'
import { s, vs } from 'react-native-size-matters'
import Spinner from 'react-native-spinkit'
import EntypoIcon from 'react-native-vector-icons/Entypo'

import { black, W, white } from '../../../constants'
import { useTypedSelector } from '../../../store'
import { ThemeT } from '../../../types/LessonTypes'

const fallbackImageSource: ImageSourcePropType = require('../../../data/img/alphabet.png')

interface LessonCardT {
  id: number
  part: ThemeT
  cardImage?: string
  title?: string
  gradient: {
    top: string
    bottom: string
  }
  darkText?: boolean
  onPress?: () => void
  border?: boolean
}

const widthCard = W - s(15) * 2
const borderRadius = s(10)

export function LessonCard({
  cardImage,
  id,
  part,
  gradient,
  darkText,
  onPress,
  border
}: LessonCardT) {
  const text = darkText ? black : white
  const [loadImg, setLoadImg] = useState<boolean>(true)
  const isComplete = useTypedSelector(st =>
    st.profile.passed.hasOwnProperty(part) ? st.profile.passed[part][0] === true : false
  )
  const { container, bordered, imgStyle, pressableContainer, checkStyle, emptyImg } =
    styles

  return (
    <Gradient
      colors={[gradient.top, gradient.bottom]}
      start={{ x: 0.25, y: 0.25 }}
      style={[container, border && bordered]}
    >
      <Pressable style={pressableContainer} onPress={onPress}>
        {loadImg && <Spinner type="FadingCircleAlt" color={text} size={s(50)} />}
        <Image
          borderRadius={borderRadius}
          style={!loadImg ? imgStyle : emptyImg}
          onLoadStart={() => setLoadImg(true)}
          onLoadEnd={() => setLoadImg(false)}
          resizeMode="stretch"
          source={
            typeof cardImage === 'string'
              ? { uri: cardImage }
              : cardImage || fallbackImageSource
          }
        />
        {isComplete && (
          <EntypoIcon style={checkStyle} color={text} name={'check'} size={s(35)} />
        )}
      </Pressable>
    </Gradient>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius,
    width: widthCard,
    height: widthCard,
    marginVertical: vs(15),
    alignSelf: 'center'
  },
  pressableContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bordered: {
    borderWidth: s(0.9),
    borderColor: white
  },
  checkStyle: {
    position: 'absolute',
    left: s(10),
    top: s(10)
  },
  imgStyle: {
    width: '100%',
    height: '100%'
  },
  emptyImg: {
    width: 1,
    height: 1
  }
})
