import { createNavigationContainerRef } from '@react-navigation/native'
import { Dimensions, Linking, Platform } from 'react-native'
import TrackPlayer from 'react-native-track-player';
import * as Sentry from '@sentry/react-native'
import { emojiT } from './types/LessonTypes'
import { ThemeT } from './types/LessonTypes'
import { RootStackParamList } from './Navigation'

// NAVIGATION
export const navRef = createNavigationContainerRef<RootStackParamList>()

export const goToUI = () => {
  if (navRef.isReady()) {
    navRef.navigate('UI')
  }
}

export const goBack = () => {
  if (navRef.isReady()) {
    navRef.goBack()
  }
}

// Dimensions
export const win = Dimensions.get('window')
export const W = win.width
export const H = win.height

// COLORS
export const primary = '#50E3C2'
export const secondary = '#ff06f4'
export const gray = '#949494'
export const white = '#ffffff'
export const black = '#17191A'
export const darkGray = '#3B3B3B'
export const lightGray = '#BFBFBF'
export const brightTurquoise = '#1EE4EC'
export const green = '#2ECC71'
export const red = 'rgb(255, 69, 58)'

export const en_gradient = '#FED2F1'
export const pink = '#FDBEEA'
export const js_gradient = '#F6E367'
export const js_color = '#F3DE50'
export const rn_gradient = '#D3FFEF'
export const rn_color = '#BEFCE5'
export const ts_gradient = '#178FE0'
export const ts_color = '#007ACD'
export const aws_gradient = '#333435'
export const aws_color = '#242526'

export const getColor = (id: number | ThemeT) => {
  if (typeof id === 'number') {
    return [pink, js_color, rn_color, ts_color, aws_color][id]
  } else if (typeof id === 'string') {
    return { en: pink, js: js_color, rn: rn_color, ts: ts_color, aws: aws_color }[id]
  }
}
// THEMES
export const lightTheme = {
  dark: false,
  colors: {
    primary: secondary,
    background: white,
    card: '#F6F8FA',
    text: black,
    border: darkGray,
    notification: 'rgb(255, 69, 58)'
  }
}
export const darkTheme = {
  dark: true,
  colors: {
    primary: primary,
    background: black,
    card: '#282A36',
    text: white,
    border: lightGray,
    notification: 'rgb(255, 69, 58)'
  }
}

// FONTS
export const KLMN = Platform.OS === 'ios' ? 'KLMN-Flash-Pix' : 'KLMN_Flash_Pix'
export const Dolbak = Platform.OS === 'ios' ? 'The Dolbak' : 'TheDolbak-Brush'
export const Etna = Platform.OS === 'ios' ? 'Etna' : 'etna-free-font'
export const Narrow = '3270Narrow'

// SOUNDS

const soundMap: { [key: string]: any } = {
  errorSound: 'error.wav',
  winSound: 'win.mp3',
  clapSound: 'clap.mp3',
};

export const initTracks = async () => {
  await TrackPlayer.add([
    { id: 'errorSound', url: soundMap['errorSound'], title: 'Error Sound', artist: 'App' },
    { id: 'winSound', url: soundMap['winSound'], title: 'Win Sound', artist: 'App' },
    { id: 'clapSound', url: soundMap['clapSound'], title: 'Clap Sound', artist: 'App' },
  ]);
};

export const playSoundById = async (id: string) => {
  await TrackPlayer.reset();
  await TrackPlayer.add({ id, url: soundMap[id], title: `${id} Sound`, artist: 'App' });
  await TrackPlayer.play();
};

export const errorSound = {
  play: async () => {
    await playSoundById('errorSound');
  },
};

export const winSound = {
  play: async () => {
    await playSoundById('winSound');
  },
};

export const clapSound = {
  play: async () => {
    await playSoundById('clapSound');
  },
};

// FUNCTIONS

export function shuffle(array: emojiT[]): emojiT[] {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export const randomProperty = (obj: any) => {
  var keys = Object.keys(obj)
  return obj[keys[(keys.length * Math.random()) << 0]]
}

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min
}

export function getRandomItem(arr: emojiT[]): emojiT {
  return arr[Math.floor(Math.random() * arr.length)]
}
export const openURL = () => {
  Linking.openURL(
    'https://raw.githubusercontent.com/gHashTag/PrivacyPolicy/master/EnglishMoji/en.md'
  ).catch(err => console.error('Failed to open the URL', err))
}

export const captureException = (error: any) => {
  if (!error) {
    console.log(
      '%c captureException called with messing or incorrect arguments',
      'background: #555; color: yellow'
    )
    return
  }
  console.error(`My Error: ${error}`)
  if (!__DEV__) {
    Sentry.captureException(error)
  }
}
