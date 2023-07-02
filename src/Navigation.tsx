import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { UI } from './UI'
import { RootBottomTabParamList, RootStackParamList } from './types'
import { black, darkTheme, gray, lightTheme, navRef, white } from './constants'
import { EnScreen, LessonScreen, ExamScreen } from './screens'
import { BottomTabBar } from './components'
import { StatusBar, useColorScheme } from 'react-native'
import { useTypedSelector } from './store'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import Orientation from 'react-native-orientation-locker'

const Stack = createNativeStackNavigator<RootStackParamList>()
const BottomTab = createBottomTabNavigator<RootBottomTabParamList>()

export function Navigation() {
  const isDark = useColorScheme() === 'dark'
  const bgState = useTypedSelector(state => state.bgColor.bgWithScheme)
  const barStyle = isDark ? 'light-content' : 'dark-content'
  const bg = bgState ? bgState : isDark ? black : white
  // SystemColors
  useEffect(() => {
    SystemNavigationBar.setNavigationColor(bg, !isDark ? false : true)
    SystemNavigationBar.setNavigationBarDividerColor(gray)
  }, [bg, bgState, isDark])
  useEffect(() => {
    Orientation.lockToPortrait()
  }, [])
  const theme = isDark ? darkTheme : lightTheme
  return (
    <NavigationContainer theme={theme} ref={navRef}>
      <StatusBar barStyle={barStyle} backgroundColor={bg} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="BOTTOM_TABS"
      >
        <Stack.Screen name="UI" component={UI} />
        <Stack.Screen name="BOTTOM_TABS" component={BottomTabNavigation} />
        <Stack.Group
          screenOptions={{
            animation: 'slide_from_right'
          }}
        >
          <Stack.Screen name="LESSON_SCREEN" component={LessonScreen} />
          <Stack.Screen name="EXAM_SCREEN" component={ExamScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function BottomTabNavigation() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false
      }}
      tabBar={props => <BottomTabBar {...props} />}
    >
      <BottomTab.Screen name="TOP_TABS" component={EnScreen} />
      {/* <BottomTab.Screen name="AI_SCREEN" component={AiScreen} /> */}
      {/* <BottomTab.Screen name="QR_SCREEN" component={UI} /> */}
    </BottomTab.Navigator>
  )
}
