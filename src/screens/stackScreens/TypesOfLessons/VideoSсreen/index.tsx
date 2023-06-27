import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { Button, Header, Space, Text } from '../../../../components'
import { s } from 'react-native-size-matters'
import Orientation, { OrientationType } from 'react-native-orientation-locker'
import { white } from '../../../../constants'
import { useTypedDispatch, useTypedSelector } from '../../../../store'
import { goPrevious, incrementSection, setSection } from '../../../../slices'
import { useTranslation } from 'react-i18next'

interface VideoSсreenT {}

export function VideoSсreen({}: VideoSсreenT) {
  const [isPortrait, setIsPortrait] = useState<boolean>(true)
  useEffect(() => {
    Orientation.unlockAllOrientations()
    Orientation.addOrientationListener(oLestener)
    return () => {
      Orientation.removeOrientationListener(oLestener)
      Orientation.lockToPortrait()
    }
  }, [])
  const { t } = useTranslation()
  const { currentLesson, sectionIndex, lessonData, lastIndex } = useTypedSelector(
    st => st.section
  )
  const dispatch = useTypedDispatch()
  if (!currentLesson) {
    return <Text title="error" h2 />
  }
  const { header } = currentLesson
  const oLestener = (orientation: OrientationType) => {
    const portrair = orientation === 'PORTRAIT' || orientation === 'PORTRAIT-UPSIDEDOWN'
    setIsPortrait(portrair)
  }

  const isLast = lastIndex - 1 === sectionIndex
  const handleBack = () => {
    dispatch(goPrevious())
  }
  const handleNext = () => {
    dispatch(incrementSection())
  }
  const learnId = lessonData?.findIndex(
    a => a.type === 'emojiLearn' || a.type === 'learn'
  )
  const hasLearn = learnId && learnId >= 0
  const handleLearn = () => {
    if (learnId) {
      dispatch(setSection(learnId))
    }
  }
  return (
    <View style={container}>
      <StatusBar hidden={!isPortrait} />
      {isPortrait && (
        <Header
          textColor={white}
          onPressL={handleBack}
          nameIconL=":back:"
          title={header}
        />
      )}
      <View style={container}>
        {/* <VideoPlayer
          source={{
            uri: contentUrl
          }}
          poster={poster}
          paused
          viewStyle={isPortrait && videoContainer}
        /> */}
        {isPortrait && (
          <View style={btnContainer}>
            {hasLearn && (
              <Button color={white} onPress={handleLearn} title={t('titles.learn')} />
            )}
            <Space height={20} />
            {!isLast && (
              <Button color={white} onPress={handleNext} title={t('titles.test')} />
            )}
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  videoContainer: {
    maxHeight: s(196)
  },
  btnContainer: {
    // flexDirection: 'row',

    justifyContent: 'space-around'
  }
})

const { container, btnContainer } = styles
