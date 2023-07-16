import React from 'react'
import { View, StyleSheet, useColorScheme } from 'react-native'
import { pink } from '../../constants'

interface BackgroundProps {
  children: React.ReactNode
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  }
})

const Background = ({ children }: BackgroundProps) => {
  const isDark = useColorScheme() === 'dark'
  return (
    <View style={[styles.container, { backgroundColor: !isDark ? pink : undefined }]}>
      {children}
    </View>
  )
}

export { Background }
