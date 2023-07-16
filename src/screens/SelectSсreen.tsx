import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, View, useColorScheme } from 'react-native'
import { Background, Button, Header, ScrollContainer, Space, Text } from '../components'
import { s } from 'react-native-size-matters'
import { pink, goBack, white } from '../constants'
import { useTypedDispatch, useTypedSelector } from '../store'
import { goPrevious, incrementSection, setSection } from '../slices'
import { useTranslation } from 'react-i18next'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SELECT_SCREEN'
>

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'SELECT_SCREEN'>

type SelectSсreenT = {
  navigation: ProfileScreenNavigationProp
  route: ProfileScreenRouteProp
}

function SelectSсreen({ navigation, route }: SelectSсreenT) {
  const { t } = useTranslation()
  const lessonData = route.params.lessonData

  const handleLearn = () => {
    navigation.navigate('LEARN_SCREEN', { lessonData })
  }

  const handleTest = () => {
    navigation.navigate('TEST_SCREEN', { lessonData })
  }
  return (
    <Background>
      <StatusBar />
      <Header
        textColor={white}
        onPressL={() => goBack()}
        nameIconL=":back:"
        title={' '}
      />
      <View style={container}>
        <View style={btnContainer}>
          <Button color={white} onPress={handleLearn} title={t('titles.learn')} />
          <Space height={20} />
          <Button color={white} onPress={handleTest} title={t('titles.test')} />
        </View>
      </View>
    </Background>
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
    justifyContent: 'space-around'
  }
})

const { container, btnContainer } = styles

export { SelectSсreen }
