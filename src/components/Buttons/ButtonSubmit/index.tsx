import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { s, vs } from 'react-native-size-matters'
import { Button } from '../'
import { Text } from '../../'
import { green } from '../../../constants'
import { useTranslation } from 'react-i18next'

interface ButtonSubmitT {
  onSubmit: () => null | boolean
  onWin?: () => void
}

export function ButtonSubmit({ onSubmit, onWin }: ButtonSubmitT) {
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null)
  const { t } = useTranslation()
  const handlePress = () => {
    const isEqual = onSubmit()
    setIsCorrect(isEqual)
    setTimeout(() => {
      setIsCorrect(null)
      if (isEqual) {
        onWin && onWin()
      }
    }, 1500)
  }
  return (
    <View style={bottomView}>
      {isCorrect === null ? (
        <Button onPress={handlePress} title={t('check')} />
      ) : isCorrect === false ? (
        <Text h7 oneColor="red" title={t('wrong')} centerText />
      ) : (
        <Text h7 oneColor={green} title={t('right')} centerText />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  bottomView: {
    marginBottom: vs(30),
    height: s(70),
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const { bottomView } = styles
