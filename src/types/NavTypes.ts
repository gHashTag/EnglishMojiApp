import { NavigatorScreenParams } from '@react-navigation/native'
import { SectionT } from './LessonTypes'

export interface lessonDetail extends SectionT {
  header: string
}

export type RootBottomTabParamList = {
  TOP_TABS?: NavigatorScreenParams<RootTopTabParamList>
  QR_SCREEN: undefined
  AI_SCREEN: undefined
}

export type RootTopTabParamList = {
  EN_SCREEN: undefined
}
