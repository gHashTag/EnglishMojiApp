import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RootBottomTabParamList } from './types'
import { NavigatorScreenParams } from '@react-navigation/native'
import { black, darkTheme, gray, lightTheme, navRef, white } from './constants'
import { MainScreen, WinScreen, LearnScreen, SelectSсreen, TestScreen } from './screens'
// import { BottomTabBar } from './components'
import { StatusBar, useColorScheme } from 'react-native'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import Orientation from 'react-native-orientation-locker'
import { LessonData, ThemeT } from './types/LessonTypes'

export type RootStackParamList = {
  // BOTTOM_TABS?: NavigatorScreenParams<RootBottomTabParamList>

  MAIN_SCREEN: undefined
  SELECT_SCREEN: { lessonData: LessonData }
  LEARN_SCREEN: { lessonData: LessonData }
  TEST_SCREEN: { lessonData: LessonData }
  WIN_SCREEN: { title: string }
  EXAM_SCREEN: {
    part: ThemeT
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>()
// const BottomTab = createBottomTabNavigator<RootBottomTabParamList>()

export function Navigation() {
  const isDark = useColorScheme() === 'dark'

  const barStyle = isDark ? 'light-content' : 'dark-content'
  const bg = isDark ? black : white
  // SystemColors
  useEffect(() => {
    SystemNavigationBar.setNavigationColor(bg, !isDark ? false : true)
    SystemNavigationBar.setNavigationBarDividerColor(gray)
  }, [bg, isDark])
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
        initialRouteName="MAIN_SCREEN"
      >
        {/* <Stack.Screen name="BOTTOM_TABS" component={BottomTabNavigation} /> */}
        <Stack.Group
          screenOptions={{
            animation: 'slide_from_right'
          }}
        >
          <Stack.Screen name="MAIN_SCREEN" component={MainScreen} />
          <Stack.Screen name="SELECT_SCREEN" component={SelectSсreen} />
          <Stack.Screen name="LEARN_SCREEN" component={LearnScreen} />
          <Stack.Screen name="TEST_SCREEN" component={TestScreen} />
          <Stack.Screen name="WIN_SCREEN" component={WinScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// function BottomTabNavigation() {
//   return (
//     <BottomTab.Navigator
//       screenOptions={{
//         headerShown: false
//       }}
//       tabBar={props => <BottomTabBar {...props} />}
//     >
//       <BottomTab.Screen name="TOP_TABS" component={MainScreen} />
//       {/* <BottomTab.Screen name="AI_SCREEN" component={AiScreen} /> */}
//       {/* <BottomTab.Screen name="QR_SCREEN" component={UI} /> */}
//     </BottomTab.Navigator>
//   )
// }
