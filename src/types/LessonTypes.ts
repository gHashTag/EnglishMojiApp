export type allPartsT = 'en' | 'rn' | 'aws' | 'ts' | 'js'

export type themeT =
  | 'alphabet'
  | 'numbers'
  | 'foodanddrinks'
  | 'animals'
  | 'activities'
  | 'clothes'
  | 'smiles'
  | 'symbols'
  | 'objects'
  | 'travel'
  | 'time'
  | 'people'
  | 'nature'

export interface LessonData {
  id: number
  cardTitle: themeT
  cardImage: any
  sections: SectionT[]
}

export type SectionT = {
  type: 'video' | 'markdown' | 'quest' | 'emojiLearn' | 'learn' | 'win'
  poster?: string // if "video"
  contentUrl?: EmojiDataArray // if "video" or "markdown" or "emojiLearn" or 'learn'
  question?: questionsT // if  any
  header?: string
}

export interface Question {
  type: string
  emoji: {
    dataUrl: EmojiDataArray
  }
}

export type questionsT = {
  // выборать одно, ввести текст ответа, перенести в области кубики, выборка,
  // соединить варианты между собой, дополнить текст
  type:
    | 'oneChoice'
    | 'input'
    | 'drag'
    | 'manySelect'
    | 'joinVariants'
    | 'supplement'
    | 'emoji'
  oneChoice?: oneSelectT
  input?: inputAnswerT
  drag?: DragVariantT
  manySelect?: manySelectT
  joinVariants?: joinVariantsT
  supplement?: supplementT
  emoji?: emojiTestT
}

export type oneSelectT = {
  questionText: string
  variants: string[]
  correctAnswer: string
}

export type inputAnswerT = {
  questionText: string
  correctAnswer: string
}

export type DragVariantT = {
  questionText: string // с помощью regExp можно вырезать слова,
  // заключеные в какой либо символ и по порядку занести в массив,
  // а затем сравнить порядок слов которые ввел пользователь
  fakeWords: string[]
}

export type manySelectT = {
  questionText: string
  correctAnswers: string[]
  variants: string[]
}

export type emojiTestT = {
  dataUrl: EmojiDataArray
}

export type emojiT = {
  id: number
  name: string
  title: string
  url: string
  ru?: string
}

export type joinVariantsT = {
  questionText: string
  left: string[]
  right: string[]
  correctCouples: string[][]
}

export type supplementT = {
  questionText: string
}

export type EmojiData = {
  id: number
  name: string
  title: string
  url: string
}

export type EmojiDataArray = EmojiData[]
